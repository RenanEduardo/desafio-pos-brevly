import type {  UpdateAccessCountRepository } from "../../infra/update-access-count-repository-http";


export class UpdateAccessCountUseCase {
 private readonly updateAccessCountRepository: UpdateAccessCountRepository;

 constructor(updateAccessCountRepository: UpdateAccessCountRepository) {
  this.updateAccessCountRepository = updateAccessCountRepository;
 }

 async execute(id: string): Promise<void> {
   await this.updateAccessCountRepository.update(id);
 }
}