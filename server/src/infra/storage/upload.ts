import { Readable } from "node:stream";
import { z } from "zod";
import { Upload } from '@aws-sdk/lib-storage'
import { r2Client } from "./client";
import { basename, extname } from "node:path";
import { uuidv7 } from "uuidv7";
import { R2_EXPORT_FOLDER } from "@/constants";
import { env } from "@/env";
const uploadDocInput = z.object({
 fileName: z.string(),
 contentType: z.string(),
 contentStream: z.instanceof(Readable),
})

type UploadDocInput = z.input<typeof uploadDocInput>;

export async function uploadDoc(input: UploadDocInput){
 const { fileName, contentType, contentStream } = uploadDocInput.parse(input);

const fileExtension = extname(fileName)
const fileNameWithoutExtension = basename(fileName)

const sanitizedFileName = fileNameWithoutExtension.replace(
 /[^a-zA-Z0-9]/g,
 ''
)
const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension)
const uniqueFilename = `${R2_EXPORT_FOLDER}/${uuidv7()}-${sanitizedFileNameWithExtension}`

const upload = new Upload({
 client: r2Client,
 params: {
   Key: uniqueFilename,
   Bucket: env.CLOUDFARE_BUCKET,
   Body: contentStream,
   ContentType: contentType,
 },
})

await upload.done()
return {
 key: uniqueFilename,
 url: new URL(uniqueFilename, env.CLOUDFARE_PUBLIC_URL).toString(),
}

}