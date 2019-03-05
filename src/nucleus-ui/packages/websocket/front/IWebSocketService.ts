import { sendQuery } from "shadow-nucleus/dist/core/BaseComponent";

export interface IWebSocketService {
    message(message: any): {};
    coreMessage<T>(eventName: string, data: sendQuery<T>): {};
    coreReceive<T>(eventName: string, handler: (data: sendQuery<T>) => void): {};
    onUpdate<T>(handler: (message: sendQuery<T>) => void): {};
}