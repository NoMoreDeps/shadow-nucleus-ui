export interface IUploadService {
    openSession(manifest: { name: string, size: number}): Promise<string>;
    closeSession(sessionGuid: string): Promise<void>;
    sendChunk(sessionGuid: string, chunk: Array<number>): Promise<void>;
}