
export class FileDetailsResponse {
    fileId: string;
    fileUrl: string;
    name: string;
    size: number;
    uploadDate: number;
    fileUploadProgress: number;
    fileIconUrl: string;
    contentType: string;
    isPrivate: boolean;
    mimeCheck: 'PASSED' | 'FAILED';
    virusScan: VirusScanResultResponse;
    isError: boolean;
}

export interface VirusScanResultResponse {
    started: number;
    finished: number;
    status: 'CLEAN' | 'NOT_SCANNED' | 'DIRTY';
    foundViruses: FoundVirusResponse[];
}

export interface FoundVirusResponse {
    fileName: string;
    virusName: string;
}
