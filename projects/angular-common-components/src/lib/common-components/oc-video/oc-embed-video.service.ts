import { Injectable } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class OcEmbedVideoService extends EmbedVideoService {
    constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) {
        super(httpClient, domSanitizer);
    }

    embed(url: any, options?: any): any {
        if (this.defineProvider(url, 'wistia')) {
            return this.prepareIframe(`https://fast.wistia.com/embed/iframe/${this.getVideoId(url)}`);
        } else if (this.defineProvider(url, 'vidyard')) {
            return this.prepareIframe(`//play.vidyard.com/${this.getVideoId(url)}`);
        } else if (this.defineProvider(url, 'brightcove')) {
            return this.prepareIframe(url);
        } else if (this.defineProvider(url, 'youtube.com/embed/')) {
            return this.prepareIframe(url);
        }
        return super.embed(url, options);
    }

    private defineProvider(url: string, providerName: string): boolean {
        return url.includes(providerName);
    }

    private getVideoId(url: string): string {
        return url.split('/').pop();
    }

    private prepareIframe(src: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(
            `<iframe src="${src}" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen
                    width="100%" height="100%"></iframe>`,
        );
    }
}
