import { Component, EventEmitter, Input, Output } from '@angular/core';
import {EmbedVideoService} from 'ngx-embed-video';
import {SafeHtml} from '@angular/platform-browser';

@Component({
    selector: 'oc-video',
    templateUrl: './oc-video.component.html',
    styleUrls: ['./oc-video.component.scss']
})
export class OcVideoComponent {

    @Input()
    set videoUrl(videoUrl: string) {
        this.url = videoUrl;
        this.loadVideo();
    }

    url: string;
    loadInIframe = true;
    loadInVideo = false;
    showVideoLoader = false;
    previewData: SafeHtml;

    constructor(private embedService: EmbedVideoService) {
    }

    loadVideo() {
        this.showVideoLoader = true;

        this.previewData = this.embedService.embed(this.url);

        if (this.previewData) {
            this.loadInIframe = true;
        } else if (this.url.endsWith('.mp4') || this.url.endsWith('.webm') || this.url.endsWith('.ogv')) {
            this.loadInIframe = false;
            this.loadInVideo = true;
        } else {
            this.loadInIframe = false;
            this.loadInVideo = false;
        }
        this.showVideoLoader = false;
    }
}
