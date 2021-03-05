import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {FileDetails, FileUploadDownloadService} from 'oc-ng-common-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {base64ToFile, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {of, Subject, Subscription} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';

export type FileType = ('singleFile' | 'singleImage' | 'privateSingleFile' | 'multiFile' | 'multiImage' | 'multiPrivateFile');

@Component({
  selector: 'oc-file-upload',
  templateUrl: './oc-file-upload.component.html',
  styleUrls: ['./oc-file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcFileUploadComponent),
    multi: true
  }],
})
export class OcFileUploadComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @ViewChild('fileDropRef', {static: false})
  fileInputVar: ElementRef<any>;
  cropperModalRef: any;

  isUploadInProcess = false;

  fileDetailArr: FileDetails[] = [];

  @Input() fileUploadText = 'Drag & drop file here';

  @Input() isMultiFile = false;

  @Output() fileUpload = new EventEmitter<any>();

  @Input() defaultFileIcon = 'assets/oc-ng-common-component/file_icon.svg';

  @Input() fileType: FileType;
  @Input() uploadIconUrl = 'assets/oc-ng-common-component/upload_icon.svg';

  @Output() fileReset = new EventEmitter<any>();

  @Input() customMsg;

  @Output() customMsgChange = new EventEmitter<boolean>();

  @Input() iconMsg;
  @Output() iconMsgChange = new EventEmitter<boolean>();

  @Input()
  set value(val) {
    this.initValues(val);
  }

  isImageCropped = false;
  croppedImage: any = '';
  imageLoadErrorMessage = 'Please provide valid image';
  hasImageLoadError = false;
  croppedFileObj: any;
  transform: ImageTransform = {};
  uploadImageInProcess = false;
  uploadImageResponse: any;
  browsedFileEvent: any;
  fileName = '';

  maintainAspectRatio = false;
  aspectRatio: any;
  scale = 1;
  loaderValue = 0;

  @Input()
  acceptType;

  @Input()
  resizeToWidth = 0;

  @Input()
  resizeToHeight = 0;

  @Output()
  cancelPopup = new EventEmitter<any>();

  @Input()
  imageFileObj: any;

  @Input()
  imageFileUrl: any;

  @Output()
  imageFileObjChange = new EventEmitter<any>();

  @Output()
  imageFileUrlChange = new EventEmitter<any>();

  uploadFileReq: Subscription = null;


  @Input() completeIconUrl;

  @Input() uploadingIconUrl;

  @Input() closeIconUrl = 'assets/img/close-icon.svg';
  @Input() zoomInIconUrl = 'assets/img/zoom-in.svg';
  @Input() zoomOutIconUrl = 'assets/img/zoom-out.svg';

  @Input() hash: string[] = [];

  private destroy$ = new Subject<void>();

  croppedImageWidth: number;
  croppedImageHeight: number;


  constructor(private modalService: NgbModal,
              private uploadFileService: FileUploadDownloadService) {
  }

  ngOnInit(): void {
    this.calculateAspectRatio();
  }

  ngOnDestroy() {
    this.resetSelection();
    this.destroy$.next();
    this.destroy$.complete();
    if (this.uploadFileReq) {
      this.uploadFileReq.unsubscribe();
    }
  }

  getAcceptTypes() {
    return this.acceptType ? this.acceptType : (this.isFileTypeImage() ? 'image/*' : '*/*');
  }

  /**
   * on file drop handler
   */
  onFileDropped($event, content?) {
    this.fileInputVar.nativeElement.files = $event.dataTransfer.files;
    this.fileInputVar.nativeElement.dispatchEvent(new Event('change', {bubbles: true}));
  }

  uploadFile(file) {
    this.isUploadInProcess = true;
    let lastFileDetail = new FileDetails();
    lastFileDetail.name = this.fileName;
    if (!this.fileDetailArr) {
      this.fileDetailArr = [];
    }
    this.fileDetailArr.push(lastFileDetail);
    const formData: FormData = new FormData();
    formData.append('file', file, this.fileName);
    this.uploadFileReq = this.uploadFileService.uploadToOpenChannel(formData, this.isFileTypePrivate(), this.hash)
      .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            lastFileDetail.fileUploadProgress = Math.round((100 * event.loaded) / event.total) - 5;
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
        (err) => {
          this.isUploadInProcess = false;
          this.resetSelection();
        },
        () => {
          this.isUploadInProcess = false;
          this.resetSelection();
        });

    this.modalService.dismissAll();
  }

  /**
   * This method is used to convert uploaded file response to fileDetails.
   */
  convertFileUploadResToFileDetails(fileUploadRes) {
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
   * handle file from browsing
   */
  fileBrowseHandler(event, content?) {
    this.onTouched();

    if (!event?.target?.files[0]?.name) {
      return;
    }

    if (this.isFileTypeImage()) {
      this.browsedFileEvent = event;
      this.fileName = event?.target?.files[0]?.name;

      this.fileName = this.fileName ? this.fileName : event?.dataTransfer?.files[0]?.name;

      this.isImageCropped = true;
      this.customMsg = false;
      this.customMsgChange.emit(this.customMsg);
      this.cropperModalRef = this.modalService
        .open(content, {
          centered: true,
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        })
        .result.then(
          () => {
            // Do Nothing
          },
          () => {
            this.resetSelection();
          }
        );
    } else {
      this.fileName = event?.target?.files[0]?.name;
      this.fileName = this.fileName ? this.fileName : event?.dataTransfer?.files[0]?.name;
      this.uploadFile(event.target.files[0]);
    }
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.fileDetailArr.push(item);
    }
  }

  getFileIcon(file) {
    if (file?.fileIconUrl) {
      return file.fileIconUrl;
    } else {
      return this.defaultFileIcon;
    }
  }

  resetSelection() {
    if (this.fileInputVar) {
      this.fileInputVar.nativeElement.value = '';
    }
    this.imageLoadErrorMessage = '';
    this.hasImageLoadError = false;
    if (this.fileDetailArr && this.fileDetailArr.length < 1) {
      this.customMsg = true;
      this.customMsgChange.emit(this.customMsg);
    }

  }

  isFileTypeImage() {
      return this.fileType === 'singleImage' || this.fileType === 'multiImage';
  }

  isFileTypePrivate() {
    return this.fileType === 'multiPrivateFile' || this.fileType === 'privateSingleFile';
  }

  isMultiFileSupport() {
    return this.fileType === 'multiPrivateFile' || this.fileType ==='multiFile' || this.fileType === 'multiImage';
  }

  isFileTypeNotImage() {
    return this.fileType === 'singleFile' || this.fileType === 'privateSingleFile' ||
        this.fileType === 'multiFile' || this.fileType === 'multiPrivateFile';
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageWidth = event.width;
    this.croppedImageHeight = event.height;
    this.croppedImage = event.base64;
    this.croppedFileObj = base64ToFile(event.base64);
  }

  loadImageFailed() {
    this.hasImageLoadError = true;
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  calculateAspectRatio() {
    if (this.resizeToWidth && this.resizeToHeight) {
      this.aspectRatio = this.resizeToWidth / this.resizeToHeight;
      this.maintainAspectRatio = true;
    } else {
      this.aspectRatio = 1;
    }
  }

  resetZoom() {
    this.scale = 1;
    this.transform = {};
  }

  uploadImageFile() {
    const fileToUpload = this.croppedFileObj;
    this.uploadFile(fileToUpload);
  }

  cancelUploading(idx) {
    this.onTouched();

    if (this.isUploadInProcess && this.uploadFileReq) {
      this.uploadFileReq.unsubscribe();
    }
    this.uploadFileReq = null;
    this.fileDetailArr.splice(idx, 1);
    this.emitChanges();
    if (this.fileDetailArr.length < 1) {
      this.customMsg = true;
      this.customMsgChange.emit(this.customMsg);
    }

  }

  getUrl(file) {
    // for non image file upload always show default file upload icon
    if (this.isFileTypeNotImage()) {
      return this.defaultFileIcon;
    }
    if (file.fileUploadProgress === 100) {
      return file.fileUrl;
    } else {
      return this.defaultFileIcon;
    }
  }

  getFileIconClass(file) {
    if (this.isFileTypeNotImage()) {
      return 'default-icon';
    }
    return file?.fileUploadProgress === 100 ? 'app-icon' : 'default-icon';
  }

  downloadFile(file: FileDetails) {
    if (file && file.fileUploadProgress && file.fileUploadProgress === 100) {
      if (this.isFileTypePrivate()) {
        this.uploadFileService.downloadFileDetails(file.fileId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
          if (res && res.fileUrl) {
            window.open(res.fileUrl, '_blank');
          }
        });
      } else {
        if (file && file.fileUrl) {
          window.open(file.fileUrl, '_blank');
        }
      }
    }
  }

  emitChanges(): void {
    if (this.isMultiFileSupport()) {
      this.onChange(this.fileDetailArr.map(file => file.fileUrl));
    } else {
      this.onChange(this.fileDetailArr && this.fileDetailArr.length > 0 ? this.fileDetailArr[0].fileUrl : null);
    }
  }

  onTouched = () => {};
  onChange: (value: any) => void = () => {};

  writeValue(obj: any): void {
    this.initValues(obj);
  }

  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  private initValues(url) {
    if (url) {
      if (this.isMultiFileSupport()) {
        this.loadDetails(url);
      } else {
        this.uploadFileService.downloadFileDetails(url)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            this.fileDetailArr = res ? [{...res, fileUploadProgress: 100}] : [];
            this.emitChanges();
          });
      }
    }
  }

  private loadDetails(urls: string[]): void {
    of(...urls)
      .pipe(mergeMap(fileUrl => this.uploadFileService.downloadFileDetails(fileUrl)))
      .subscribe(
        detail => this.fileDetailArr.push({...detail, fileUploadProgress: 100}),
        () => {},
        () => this.emitChanges());
  }
}
