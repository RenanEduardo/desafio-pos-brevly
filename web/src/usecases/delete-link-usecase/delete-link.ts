/** biome-ignore-all lint/suspicious/noConfusingVoidType: <explicitly setting void> */

import type { DeleteLinkRepositoryHttp } from "../../infra/delete-link-repository-http";
import { LinkError } from "../error";


export class DeleteLinkUseCase {
 private readonly deleteLinkRepository: DeleteLinkRepositoryHttp;

 constructor(deleteLinkRepository: DeleteLinkRepositoryHttp) {
  this.deleteLinkRepository = deleteLinkRepository;
 }

 async execute(alias: string): Promise<void | Error> {
   const response = await this.deleteLinkRepository.delete(alias);
   if (response instanceof LinkError) {
    return response
   }
   return response;
 }
}