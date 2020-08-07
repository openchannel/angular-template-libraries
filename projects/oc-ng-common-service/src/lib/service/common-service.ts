import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploadDownloadService } from './file-upload-download.service';

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    constructor(public fileDownoladService: FileUploadDownloadService) {

    }

    scrollToFormInvalidField({ form, adjustSize }: { form: NgForm; adjustSize: number; }) {

        if (form === null) {
            // const docs = document.getElementsByName(name);
            const documentYAxis = document.body.getBoundingClientRect().y;
            // const invalidElementYAxis = docs.item(0).getBoundingClientRect().y;
            const yAxisDifference = documentYAxis;
            window.scroll({
                top: (yAxisDifference - adjustSize),
                left: 0,
                behavior: 'smooth'
            });
            return;
        }

        if (!form.valid) {
            // Dont use foreach loop because you cant break it.
            for (const key in form.controls) {
                if (form.controls.hasOwnProperty(key)) {
                    if (!form.controls[key].valid) {
                        const docs = document.getElementsByName(key);
                        const documentYAxis = document.body.getBoundingClientRect().y;
                        const invalidElementYAxis = docs.item(0).getBoundingClientRect().y;
                        const yAxisDifference = invalidElementYAxis - documentYAxis;
                        // window.scrollTo(0, (yAxisDifference-adjustSize));
                        window.scroll({
                            top: (yAxisDifference - adjustSize),
                            left: 0,
                            behavior: 'smooth'
                        });
                        break;
                    }
                }
            }
        }
    }

    /**
     * This method is responsible for copy the text to clipboard as per param.
     * @param textToCopy 
     */
    textCopyToClipboard(textToCopy: string) {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = textToCopy;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    downloadFile(fileObj) {
        this.downloadUploadedFiles(fileObj);

    }
    downloadUploadedFiles(fileId) {
        this.fileDownoladService.downloadFileDetails(fileId).subscribe((res) => {
            if (res && res.fileUrl) {
                window.open(res.fileUrl, "_blank");
                // this.downloadFileService.downloadFileFromUrl(res.fileUrl).subscribe();
            }
        },
            (res) => {
                console.error("Error in downloadUploadedFiles");
            });
    }

    getMapKeys(map): string[] {
        return Array.from(map.keys());
    }

}
