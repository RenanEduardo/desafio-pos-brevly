import { PassThrough, Transform } from 'node:stream'
import { pipeline } from "node:stream/promises"
import { stringify } from "csv-stringify"
import { db, pg } from "@/infra/db"
import { schema } from "@/infra/db/schema"
import { uploadDoc } from '@/infra/storage/upload'




export async function exportLinks(): Promise<string> {

  const { sql, params } = db
    .select({
      id: schema.shortlinks.id,
      originalUrl: schema.shortlinks.originalUrl,
      shortenedUrl: schema.shortlinks.shortenedUrl,
      accessCount: schema.shortlinks.accessCount,
      createdAt: schema.shortlinks.createdAt,
    })
    .from(schema.shortlinks)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'shortened_url', header: 'Short Link' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Uploaded at' },
    ],
  })

  const uploadDocStream = new PassThrough()

  //READABLE / TRANSFORM / ... / => WRITABLE
  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          //salvando uma entrada de cada vez para que eu tenha cada record individualmente
          this.push(chunk)
        }
        callback()
      },
    }),
    csv,
    uploadDocStream
    //stream de escrita no cloudfare R2
  )

  const upload = uploadDoc({
    contentType: 'text/csv',
    fileName: `${new Date().toISOString()}-link.csv`,
    contentStream: uploadDocStream,
  })

  const [{ url }] = await Promise.all([upload, convertToCSVPipeline])

  return url
}
