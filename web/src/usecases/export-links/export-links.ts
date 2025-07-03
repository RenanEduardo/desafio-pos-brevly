import type { ExportLinksRepository } from "../../infra/export-links-repository-http";
import type { ExportLinksResponse } from "../interfaces";


export class ExportLinksUseCase {
 private readonly exportLinksRepository: ExportLinksRepository;

 constructor(exportLinksRepository: ExportLinksRepository) {
  this.exportLinksRepository = exportLinksRepository;
 }

 async execute(): Promise<ExportLinksResponse> {
   const response = await this.exportLinksRepository.export();
   return response;
 }
}