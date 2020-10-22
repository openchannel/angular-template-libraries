import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {FileUploadDownloadService} from 'oc-ng-common-service';
import {Subject} from 'rxjs';

@Component({
    selector: 'oc-video',
    templateUrl: './oc-video.component.html',
    styleUrls: ['./oc-video.component.scss']
})
export class OcVideoComponent implements AfterViewInit, OnDestroy {

    @Input() videoUrl: string;

    loadInIframe = true;
    loadInVideo = false;
    showVideoLoader = false;
    previewData: string;

    private destroy$: Subject<any> = new Subject<any>();

    constructor(private fileService: FileUploadDownloadService) {
    }

    ngAfterViewInit(): void {
        this.loadVideoFrame();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadVideoFrame() {
        this.showVideoLoader = true;
        this.fileService.getVideoMetaData(this.videoUrl)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (data: any) => {
                    this.showVideoLoader = false;

                    if (data && data.html) {
                        this.loadInIframe = true;
                        this.previewData = data.html;
                    } else if (this.videoUrl.endsWith('.mp4') || this.videoUrl.endsWith('.webm') || this.videoUrl.endsWith('.ogv')) {
                        this.loadInIframe = false;
                        this.loadInVideo = true;
                    } else {
                        this.loadInIframe = false;
                        this.loadInVideo = false;
                    }
                },
                error => {
                    this.loadInIframe = false;
                    this.loadInVideo = false;
                    this.showVideoLoader = false;
                    // showing video url in case of error
                }
            );
    }

}
