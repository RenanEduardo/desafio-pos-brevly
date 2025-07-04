/** biome-ignore-all lint/suspicious/noConfusingVoidType: <explicitly setting void> */

import type { DeleteLinkRepositoryHttp } from "../../infra/delete-link-repository-http";


export class DeleteLinkUseCase {
 private readonly deleteLinkRepository: DeleteLinkRepositoryHttp;

 constructor(deleteLinkRepository: DeleteLinkRepositoryHttp) {
  this.deleteLinkRepository = deleteLinkRepository;
 }

 async execute(id: string): Promise<void> {
   await this.deleteLinkRepository.delete(id);
 }
}