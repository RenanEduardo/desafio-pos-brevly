import type { GetLinkRepository } from "../../infra/get-link-repository-http";
import type { GetLinkResponse } from "../interfaces";


export class GetLinkUseCase {
 private readonly getLinkRepository: GetLinkRepository;

 constructor(getLinkRepository: GetLinkRepository) {
  this.getLinkRepository = getLinkRepository;
 }

 async execute(alias: string): Promise<GetLinkResponse | Error> {
   const response = await this.getLinkRepository.get(alias);
   return response;
 }
}