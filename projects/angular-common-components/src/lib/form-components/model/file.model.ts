import { Observable } from 'rxjs';
import { HttpResponse, HttpUploadProgressEvent } from '@angular/common/http';

export class FileDetails {
    fileId: string;
    fileUrl: string;
    name: string;
    size: number;
    uploadDate: number;
    fileUploadProgress: number;
    fileIconUrl: string;
    contentType: string;
    isPrivate: boolean;
    mimeCheck: string;
    virusScan: any;
    isError: boolean;
}

export type FileType = 'singleFile' | 'singleImage' | 'privateSingleFile' | 'multiFile' | 'multiImage' | 'multiPrivateFile';

export abstract class FileUploaderService {
    abstract fileUploadRequest(file: FormData, isPrivate: boolean, hash?: string[]): Observable<HttpResponse<FileDetails> | HttpUploadProgressEvent>;
    abstract fileDetailsRequest(fileId: string): Observable<FileDetails>;
}
