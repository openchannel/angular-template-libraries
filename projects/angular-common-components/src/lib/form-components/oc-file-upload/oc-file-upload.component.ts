import { Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { base64ToFile, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FileDetails, FileType, FileUploaderService } from '../model/file.model';

export interface ImageCropperOptions {
    headerText: string;
    cancelText: string;
    confirmText: string;
}

/**
 * File upload component. Represents template and logic for upload and download files.
 *
 * @example <oc-file-upload [(ngModel)]="fileModel"
 *                          fileType="singleImage"
 *                          [isMultiFile]="false"
 *                          fileUploadText="Throw file here"
 *                          fileUploadButtonText="Browse file"
 *                          imageUploadButtonText="Browse file"
 *                          defaultFileIcon="/fIcon.png"
 *                          uploadIconUrl="/uIcon.png"
 *                          closeIconUrl="/close.png"
 *                          zoomInIconUrl="/zoomIn.png"
 *                          zoomOutIconUrl="/zoomOut.png"
 *                          imageWidth="1024"
 *                          imageHeight="768"
 *                          [hash]="['a87sh098a7shd098ahs0d97has09dha09sdh9a07shd09ahs90dhas09d7h9a0s7hd09ahsd097has9d7ha9sd7ha09s7dh']"
 *                          acceptType="image/*"
 *                          (customMsgChange)="onMsgChange()"
 * >
 */
@Component({
    selector: 'oc-file-upload',
    templateUrl: './oc-file-upload.component.html',
    styleUrls: ['./oc-file-upload.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcFileUploadComponent),
            multi: true,
        },
    ],
})
export class OcFileUploadComponent implements OnInit, OnDestroy, ControlValueAccessor {
    /**
     * File input template reference
     */
    @ViewChild('fileDropRef', { static: false }) fileInputVar: ElementRef;

    /**
     * Set model value
     */
    @Input() set value(val: string) {
        this.initValues(val);
    }

    /**
     * Text for file upload block
     */
    @Input() fileUploadText: string = 'Drag & drop file here or';

    /**
     * Text for file upload button
     */
    @Input() fileUploadButtonText: string = 'Browse File';

    /**
     * Text for image upload button
     */
    @Input() imageUploadButtonText: string = 'Browse File';

    /**
     * Options for image cropper modal.
     * You can change text of the buttons, for example.
     */
    @Input() imageCropperOptions: ImageCropperOptions = {
        headerText: 'Edit Image',
        cancelText: 'Cancel',
        confirmText: 'Confirm',
    };

    /**
     * Flag for download multiple files allowed or not
     */
    @Input() isMultiFile: boolean = false;

    /**
     * URL for default file icon.
     */
    @Input() defaultFileIcon: string = 'assets/angular-common-components/file_icon.svg';

    /**
     * Supported file type ( "singleFile", "singleImage", "privateSingleFile", "multiFile", "multiImage", "multiPrivateFile" )
     */
    @Input() fileType: FileType;

    /**
     * Icon for upload button
     */
    @Input() uploadIconUrl: string = 'assets/angular-common-components/upload_icon.svg';

    /**
     * Icon URL value for buttons that close container window and stop uploading file
     */
    @Input() closeIconUrl: string = 'assets/angular-common-components/close-icon.svg';

    /**
     * Icon URL value for button that active zoomIn feature
     */
    @Input() zoomInIconUrl: string = 'assets/angular-common-components/zoom-in.svg';

    /**
     * Icon URL value for button that active zoomOut feature
     */
    @Input() zoomOutIconUrl: string = 'assets/angular-common-components/zoom-out.svg';

    /**
     * Variable for width of image
     */
    @Input() imageWidth: number;

    /**
     * Variable for height of image
     */
    @Input() imageHeight: number;

    /**
     * File hash
     */
    @Input() hash: string[] = [];

    /**
     * File type (MIME) allowed to use
     */
    @Input() acceptType: string;

    /**
     * Output emits after change custom message
     */
    @Output() readonly customMsgChange = new EventEmitter<boolean>();

    /**
     * Subscription to upload file from server
     */
    uploadFileReq: Subscription = null;

    /**
     * Flag to know is upload in process or not
     */
    isUploadInProcess: boolean = false;

    /**
     * Array of objects with file data
     */
    fileDetailArr: FileDetails[] = [];

    /**
     * Text that shows up when image load throw error
     */
    imageLoadErrorMessage: string = 'Please provide valid image';

    /**
     * Flag that shows existence of image load error
     */
    hasImageLoadError: boolean = false;

    /**
     * Object of cropped file
     */
    croppedFileObj: any;

    /**
     * Image transform data
     */
    transform: ImageTransform = {};

    /**
     * Flag that shows that upload image in process
     */
    uploadImageInProcess: boolean = false;

    /**
     * Event that triggers when file browsed
     */
    browsedFileEvent: any;

    /**
     * Name of valid file
     */
    fileName: string = '';
    /**
     * Name of invalid file
     */
    invalidFileName: string;

    /**
     * Flag that shows existence of invalid file
     */
    containsInvalidFile = false;

    /**
     * Flag that allow maintain aspect ratio logic or not
     */
    maintainAspectRatio = false;

    /**
     * Aspect ratio value
     */
    aspectRatio: number;

    /**
     * Scale value
     */
    scale = 1;

    /**
     * Percent progress showed up in loader
     */
    loaderValue = 0;

    /**
     * Width of cropped image value
     */
    croppedImageWidth: number;

    /**
     * Height of cropped image value
     */
    croppedImageHeight: number;

    /**
     * Width value to resize
     */
    resizeToWidth = 0;

    /**
     * Height value to resize
     */
    resizeToHeight = 0;

    /**
     * Upload button text
     */
    uploadButtonText: string = 'Browse file';

    /**
     * @private Subject to clear all subscriptions
     */
    private destroy$ = new Subject<void>();

    constructor(private modalService: NgbModal, private fileUploaderService: FileUploaderService) {}

    ngOnInit(): void {
        this.setUploadButtonText();

        if (this.isFileTypeImage) {
            this.calculateAspectRatio();
        }
    }

    ngOnDestroy(): void {
        this.resetSelection();
        this.destroy$.next();
        this.destroy$.complete();
        if (this.uploadFileReq) {
            this.uploadFileReq.unsubscribe();
        }
    }

    /**
     * Return allowed default or provided MIME type for file input
     */
    getAcceptedMIMEType(): string {
        const setTypeIfImage = this.isFileTypeImage() ? 'image/*' : '*/*';
        return this.acceptType ? this.acceptType : setTypeIfImage;
    }

    /**
     * On file drop handler
     */
    onFileDropped($event: any): void {
        if (this.validMimeTypeCheck($event.dataTransfer.files[0].type) && (this.isMultiFileSupport() || this.fileDetailArr.length === 0)) {
            this.fileInputVar.nativeElement.files = $event.dataTransfer.files;
            this.fileInputVar.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    /**
     * Compare file type with allowed type list
     * @param fileType - string MIME type ex.: 'image/jpg'
     * @return boolean - result of validation
     */
    validMimeTypeCheck(fileType: string): boolean {
        const typeArr: string[] = this.getAcceptedMIMEType().split(',');
        for (const validType of typeArr) {
            const validTypeArr: string[] = validType.split('/');
            const fileTypeSplitArr: string[] = fileType.split('/');
            const acceptedWildCardType = validTypeArr[1] === '*' && validTypeArr[0] === fileTypeSplitArr[0];
            return validTypeArr[0] === '*' || fileType === validType || acceptedWildCardType;
        }
        return false;
    }

    /**
     * Function for upload file
     * @param {File} file
     */
    uploadFile(file: File): void {
        if (!this.fileUploaderService.fileUploadRequest || this.hasImageLoadError) {
            // tslint:disable-next-line:no-console
            console.error('Please, set the fileUploadRequest function');
            this.resetSelection();
        } else {
            this.isUploadInProcess = true;
            let lastFileDetail = new FileDetails();
            lastFileDetail.name = this.fileName;
            if (!this.fileDetailArr) {
                this.fileDetailArr = [];
            }
            this.fileDetailArr.push(lastFileDetail);
            const formData: FormData = new FormData();
            formData.append('file', file, this.fileName);
            this.uploadFileReq = this.fileUploaderService.fileUploadRequest(formData, this.isFileTypePrivate(), this.hash).subscribe(
                (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        lastFileDetail.fileUploadProgress = Math.round((event.loaded * 100) / event.total) - 5;
                    } else if (event.type === HttpEventType.ResponseHeader) {
                        lastFileDetail.fileUploadProgress = 97;
                    } else if (event.type === HttpEventType.DownloadProgress) {
                        lastFileDetail.fileUploadProgress = 99;
                    } else if (event instanceof HttpResponse) {
                        lastFileDetail = this.convertFileUploadResToFileDetails(event);
                        lastFileDetail.fileUploadProgress = 100;
                        lastFileDetail.fileIconUrl = this.defaultFileIcon;
                        this.fileDetailArr[this.fileDetailArr.length - 1] = lastFileDetail;
                        this.isUploadInProcess = false;
                        this.uploadFileReq = null;
                        this.emitChanges();
                        this.resetSelection();
                    }
                },
                () => {
                    this.isUploadInProcess = false;
                    this.resetSelection();
                },
                () => {
                    this.isUploadInProcess = false;
                    this.resetSelection();
                },
            );
        }
    }

    /**
     * This method is used to convert uploaded file response to fileDetails.
     */
    convertFileUploadResToFileDetails(fileUploadRes: HttpResponse<FileDetails>): FileDetails {
        const fileDetails = new FileDetails();
        fileDetails.uploadDate = fileUploadRes.body.uploadDate;
        fileDetails.fileId = fileUploadRes.body.fileId;
        fileDetails.name = fileUploadRes.body.name;
        fileDetails.contentType = fileUploadRes.body.contentType;
        fileDetails.size = fileUploadRes.body.size;
        fileDetails.isPrivate = fileUploadRes.body.isPrivate;
        fileDetails.mimeCheck = fileUploadRes.body.mimeCheck;
        fileDetails.fileUrl = fileUploadRes.body.fileUrl;
        fileDetails.isError = fileUploadRes.body.isError;
        return fileDetails;
    }

    /**
     * Handle file on browsing
     */
    fileBrowseHandler(event: any, content?: any): void {
        this.onTouched();

        if (!event?.target?.files[0]?.name) {
            return;
        }

        if (this.isFileTypeImage()) {
            this.browsedFileEvent = event;
            this.fileName = event?.target?.files[0]?.name;
            this.fileName = this.fileName ? this.fileName : event?.dataTransfer?.files[0]?.name;
            this.customMsgChange.emit(false);
            this.modalService
                .open(content, {
                    centered: true,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'lg',
                })
                .result.then(
                    () => {
                        // Do Nothing
                    },
                    () => {
                        this.resetSelection();
                    },
                );
        } else {
            this.fileName = event?.target?.files[0]?.name;
            this.fileName = this.fileName ? this.fileName : event?.dataTransfer?.files[0]?.name;
            this.uploadFile(event.target.files[0]);
        }
    }

    /**
     * Function to reset selection in case if previous one didnt die by itself
     */
    resetSelection(): void {
        if (this.fileInputVar) {
            this.fileInputVar.nativeElement.value = '';
        }
        this.imageLoadErrorMessage = '';
        this.hasImageLoadError = false;
        if (this.fileDetailArr && this.fileDetailArr.length < 1) {
            this.customMsgChange.emit(true);
        }
    }

    /**
     * Function check if file type related to image types
     * @returns `boolean`
     */
    isFileTypeImage(): boolean {
        return this.fileType === 'singleImage' || this.fileType === 'multiImage';
    }

    /**
     * Function check if file type related to private types
     * @returns `boolean`
     */
    isFileTypePrivate(): boolean {
        return this.fileType === 'multiPrivateFile' || this.fileType === 'privateSingleFile';
    }

    /**
     * Function check if file type related to types with multiple files support
     * @returns `boolean`
     */
    isMultiFileSupport(): boolean {
        return this.fileType === 'multiPrivateFile' || this.fileType === 'multiFile' || this.fileType === 'multiImage';
    }

    /**
     * Function check if file type NOT related to image types
     * @returns `boolean`
     */
    isFileTypeNotImage(): boolean {
        return (
            this.fileType === 'singleFile' ||
            this.fileType === 'privateSingleFile' ||
            this.fileType === 'multiFile' ||
            this.fileType === 'multiPrivateFile'
        );
    }

    /**
     * Function that executes after image cropping
     * @param {ImageCroppedEvent} event - Crop event object
     */
    imageCropped(event: ImageCroppedEvent): void {
        this.croppedImageWidth = event.width;
        this.croppedImageHeight = event.height;
        this.croppedFileObj = base64ToFile(event.base64);
    }

    /**
     * Function that executes after image load failed
     */
    loadImageFailed(): void {
        this.hasImageLoadError = true;
    }

    /**
     * Function that subtract from scale 0.1 and save it
     */
    zoomOut(): void {
        this.scale -= 0.1;
        this.transform = {
            ...this.transform,
            scale: this.scale,
        };
    }

    /**
     * Function that add to scale 0.1 and save it
     */
    zoomIn(): void {
        this.scale += 0.1;
        this.transform = {
            ...this.transform,
            scale: this.scale,
        };
    }

    /**
     * Set resize width and height, also aspect ratio
     */
    calculateAspectRatio(): void {
        if (this.imageWidth) {
            this.resizeToWidth = this.imageWidth;
        }
        if (this.imageHeight) {
            this.resizeToHeight = this.imageHeight;
        }
        if (this.imageWidth && this.imageHeight) {
            this.aspectRatio = this.imageWidth / this.imageHeight;
            this.maintainAspectRatio = true;
        } else {
            this.aspectRatio = 1;
        }
    }

    /**
     * Function to stop upload. Close subscription if active and reset all related data.
     * @param {number} idx - Index of file in details
     */
    cancelUploading(idx: number): void {
        this.onTouched();

        if (this.isUploadInProcess && this.uploadFileReq) {
            this.uploadFileReq.unsubscribe();
        }
        this.uploadFileReq = null;
        this.fileDetailArr.splice(idx, 1);
        this.emitChanges();
        if (this.fileDetailArr.length < 1) {
            this.customMsgChange.emit(true);
        }
    }

    /**
     * Function get file details and returns file url
     * @param {FileDetails} file
     * @returns `string`
     */
    getUrl(file: FileDetails): string {
        // NOTE: for non image file upload always show default file upload icon
        if (this.isFileTypeNotImage()) {
            return this.defaultFileIcon;
        }
        if (file.fileUploadProgress === 100) {
            return file.fileUrl;
        } else {
            return this.defaultFileIcon;
        }
    }

    /**
     * Function get file details and returns CSS class for file icon
     * @param {FileDetails} file
     * @returns `string`
     */
    getFileIconClass(file: FileDetails): string {
        if (this.isFileTypeNotImage()) {
            return 'default-icon';
        }
        return file?.fileUploadProgress === 100 ? 'app-icon' : 'default-icon';
    }

    /**
     * Function for download file. If file is private then it opens link in new window and download file. If not call service method to start downloading process.
     * @param {FileDetails} file
     */
    // prettier-ignore
    downloadFile(file: FileDetails): void { // NOSONAR
        if (file && file.fileUploadProgress && file.fileUploadProgress === 100) {
            if (this.isFileTypePrivate()) {
                if (!this.fileUploaderService.fileDetailsRequest) {
                    // tslint:disable-next-line:no-console
                    console.error('Please, set the FileDetailsRequest function');
                } else {
                    this.fileUploaderService
                        .fileDetailsRequest(file.fileId)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(res => {
                            if (res && res.fileUrl) {
                                window.open(res.fileUrl, '_blank');
                            }
                        });
                }
            } else {
                if (file.fileUrl) {
                    window.open(file.fileUrl, '_blank');
                }
            }
        }
    }

    /**
     * Function that called on main model change and emits value
     */
    emitChanges(): void {
        if (this.isMultiFileSupport()) {
            this.onChange(this.getFileUrlOrFileId(this.fileDetailArr));
        } else {
            this.onChange(this.fileDetailArr?.length > 0 ? this.getFileUrlOrFileId(this.fileDetailArr)[0] : null);
        }
    }

    onTouched = () => {
        // nothing to do
    };

    onChange: (value: any) => void = () => {
        // nothing to do
    };

    writeValue(obj: any): void {
        this.initValues(obj);
    }

    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    // prettier-ignore
    setDisabledState?(isDisabled: boolean): void { // NOSONAR
    }

    /**
     * @private Sets the text for the upload button based on the file type
     */
    private setUploadButtonText(): void {
        this.uploadButtonText = this.isFileTypeImage() ? this.imageUploadButtonText : this.fileUploadButtonText;
    }

    /**
     * @private Initialization of value for component
     * @param {string | string[]} urlData
     */
    private initValues(urlData: string | string[]): void {
        if (!this.fileUploaderService.fileDetailsRequest) {
            console.error('Please, set the FileDetailsRequest function');
        } else if (urlData) {
            this.fileDetailArr = [];
            if (this.isMultiFileSupport() && typeof urlData !== 'string') {
                urlData.forEach(fileUrl => {
                    this.getFileDetails(fileUrl);
                });
            } else if (typeof urlData === 'string') {
                this.getFileDetails(urlData);
            } else {
                console.error('initValues function error: something wrong with provided data');
            }
        }
    }

    /**
     * @private Uses fileUploadService to get file details.
     * @param {string} urlData
     */
    private getFileDetails(urlData: string): void {
        this.fileUploaderService
            .fileDetailsRequest(urlData)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                res => {
                    this.fileDetailArr.push({ ...res, fileUploadProgress: 100 });
                    this.emitChanges();
                },
                error => {
                    if (error.error.code === 404) {
                        this.fileDetailArr.push(this.externallyHostedImageHandler(urlData));
                        this.emitChanges();
                    }
                },
            );
    }

    /**
     * @private Creates an object when the image is externally hosted
     * @returns {FileDetails}
     */
    private externallyHostedImageHandler(urlData: string): FileDetails {
        const fileDetails = new FileDetails();
        fileDetails.name = urlData;
        fileDetails.fileUrl = urlData;
        return { ...fileDetails, fileUploadProgress: 100 };
    }

    /**
     * @private Returns array with file ids and URLs
     * @param {FileDetails[]} files
     * @returns {string[]} `string[]`
     */
    private getFileUrlOrFileId(files: FileDetails[]): string[] {
        if (files?.length > 0) {
            return files.map(file => (file?.isPrivate ? file.fileId : file.fileUrl));
        }
        return null;
    }
}
