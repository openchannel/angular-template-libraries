import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { OcEmbedVideoService } from './oc-embed-video.service';

@Component({
    selector: 'oc-video',
    templateUrl: './oc-video.component.html',
    styleUrls: ['./oc-video.component.css'],
})
export class OcVideoComponent {
    /**
     * The video url setter. Defines video source and calls loadVideo() method.
     * Default: empty
     */
    @Input() set videoUrl(videoUrl: string) {
        this.url = videoUrl;
        this.loadVideo();
    }

    /**
     * URL variable of the component. Defines through `videoUrl` Input.
     */
    url: string;
    /**
     * Flag that indicates that the video should load in a frame
     */
    loadInIframe: boolean = true;
    /**
     * Flag that indicates that the video should load in a video tag
     */
    loadInVideo: boolean = false;
    /**
     * Flag for the video loader spinner.
     */
    showVideoLoader: boolean = false;
    /**
     * Preview data for the video url
     */
    previewData: SafeHtml;

    constructor(private embedService: OcEmbedVideoService, private spinner: NgxSpinnerService) {}

    /**
     * Loads video. Checks preview data and video format. Shows and hides spinner.
     */
    loadVideo(): void {
        this.spinner.show();
        this.showVideoLoader = true;
        const options = {
            attr: { width: '100%', height: '100%' },
        };

        this.previewData = this.embedService.embed(this.url, options);

        if (this.previewData) {
            this.loadInIframe = true;
        } else if (this.url.endsWith('.mp4') || this.url.endsWith('.webm') || this.url.endsWith('.ogv')) {
            this.loadInIframe = false;
            this.loadInVideo = true;
        } else {
            this.loadInIframe = false;
            this.loadInVideo = false;
        }

        this.spinner.hide();
        this.showVideoLoader = false;
    }
}
