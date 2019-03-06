export interface IFileStreamer {
    new(file: File): IFileStreamer
    rewind(): void;
    isEndOfFile(): boolean;
    readAsArray(length: number): Promise<Array<number>>;
}