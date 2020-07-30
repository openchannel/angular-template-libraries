import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FileDetails } from 'oc-ng-common-service';
import { OCComponentConstants } from '../model/oc-constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageTransform, ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'oc-file-upload',
  templateUrl: './oc-file-upload.component.html',
  styleUrls: ['./oc-file-upload.component.scss']
})
export class OcFileUploadComponent implements OnInit,OnDestroy {
  
  @ViewChild('fileDropRef', { static: false })
  fileInputVar: ElementRef<any>;
  cropperModalRef: any;

  @Input() files: FileDetails[] = [];

  @Input() fileUploadText = "Drag & drop file here";

  @Input() isMultiFile=false;

  @Output() fileUpload = new EventEmitter<any>();

  @Input() defaultFileIcon = '';

  @Input() fileType: string;

/////////////////Image
isImageCropped = false;
croppedImage: any = '';
imageLoadErrorMessage = 'Please provide valid image';
hasImageLoadError = false;
croppedFileObj: any;
transform: ImageTransform = {};
uploadImageInProcess = false;
uploadImageResponse : any;
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
  isMultiImage: boolean;

  @Input()
  imageFileObj: any;

  @Input()
  imageFileUrl: any;

  @Output()
  imageFileObjChange = new EventEmitter<any>();

  @Output()
  imageFileUrlChange = new EventEmitter<any>();


//////////////////


  constructor(private modalService: NgbModal){}

  ngOnInit(): void {
  }


  getAcceptTypes(){
    return this.acceptType? this.acceptType : (this.isFileTypeImage()? 'image/*' :'*/*');
  }
  
  /**
   * on file drop handler
   */
  onFileDropped($event, content?) {
    // this.fileUpload.emit($event);
    // this.fileBrowseHandler($event, content)
    
    
    this.fileInputVar.nativeElement.files = $event.dataTransfer.files;
    this.fileInputVar.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
    // this.fileInputVar.nativeElement.change();
  }

  uploadFile(files){
    this.fileUpload.emit(files);
  }
  /**
   * handle file from browsing
   */
  fileBrowseHandler(event, content?) {
    if(this.isFileTypeImage()){
      this.browsedFileEvent = event;
      this.fileName = event?.target?.files[0]?.name;
      this.fileName = this.fileName?this.fileName:event?.dataTransfer?.files[0]?.name;

      this.isImageCropped = true;
      this.cropperModalRef = this.modalService
            .open(content, {
              centered: true,
              backdrop: 'static',
              keyboard: false,
              size:'lg'
            })
            .result.then(
              () => {
                // Do Nothing
              },
              () => {
                this.resetSelection();
              }
            );
    }else{
      this.uploadFile(event.target.files[0])
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].fileUploadProgress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].fileUploadProgress += 10;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    // this.uploadFilesSimulator(0);
  }

  getFileIcon(file){
    if(file?.fileIconUrl){
      return file.fileIconUrl;
    }else{
      return this.defaultFileIcon
    }
  }

  ngOnDestroy() {
    this.resetSelection();
  }
  
  resetSelection() {
    if (this.fileInputVar) {
      this.fileInputVar.nativeElement.value = '';
    }
  }

  isFileTypeImage(){
    if(this.fileType === OCComponentConstants.FILE_TYPES.SINGLE_PRIVATE_IMAGE ||
      this.fileType === OCComponentConstants.FILE_TYPES.SINGLE_PUBLIC_IMAGE ||
      this.fileType === OCComponentConstants.FILE_TYPES.MULTI_PRIVATE_IMAGE ||
      this.fileType === OCComponentConstants.FILE_TYPES.MULTI_PUBLIC_IMAGE){
        return true;
      }
    return false;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedFileObj = base64ToFile(event.base64);
  }

  loadImageFailed() {
    this.hasImageLoadError = true;
  }

  imageLoaded(){

  }

  cropperReady(){

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
     if (this.resizeToWidth) {
        this.resizeToWidth = this.resizeToWidth;
      }
  
      if (this.resizeToWidth && this.resizeToHeight) {
        this.aspectRatio = this.resizeToWidth / this.resizeToHeight;
        this.maintainAspectRatio = true;
      } else {
        this.aspectRatio = 1;
      }
    }

    resetZoom(){
      this.scale = 1;
      this.transform = {};
    }

    uploadImageFile(){
      this.fileUpload.emit();
    }
}
