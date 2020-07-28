import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileDetails } from 'oc-ng-common-service';

@Component({
  selector: 'oc-file-upload',
  templateUrl: './oc-file-upload.component.html',
  styleUrls: ['./oc-file-upload.component.scss']
})
export class OcFileUploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() files: FileDetails[] = [];

  @Input() fileUploadText = "Drag & drop file here";

  @Input() isMultiFile=false;

  @Output() fileUpload = new EventEmitter<any>();

  @Input() defaultFileIcon = '';
  
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    // this.prepareFilesList($event);
    this.fileUpload.emit();
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    // this.prepareFilesList(files);
    this.fileUpload.emit();
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
}
