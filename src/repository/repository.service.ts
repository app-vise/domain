export abstract class RepositoryService {
  abstract getRepository<TRepository>(
    repositoryClass: TRepository
  ): Promise<any>;
}
