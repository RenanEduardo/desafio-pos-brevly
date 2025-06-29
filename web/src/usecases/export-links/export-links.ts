import type { ExportLinksRepository } from "../../infra/export-links-repository-http";
import { LinkError } from "../error";
import type { ExportLinksResponse } from "../interfaces";


export class ExportLinksUseCase {
 private readonly exportLinksRepository: ExportLinksRepository;

 constructor(exportLinksRepository: ExportLinksRepository) {
  this.exportLinksRepository = exportLinksRepository;
 }

 async execute(): Promise<ExportLinksResponse | Error> {
   const response = await this.exportLinksRepository.export();
   if (response instanceof LinkError) {
    return response
   }
   return response;
 }
}