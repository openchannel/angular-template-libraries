import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcVideoComponent } from './oc-video.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmbedVideoService } from 'ngx-embed-video';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

describe('OcVideoComponent', () => {
    let component: OcVideoComponent;
    let fixture: ComponentFixture<OcVideoComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcVideoComponent],
                imports: [HttpClientTestingModule, NgxSpinnerModule],
                providers: [EmbedVideoService, NgxSpinnerService],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcVideoComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.videoUrl = 'https://www.youtube.com/watch?v=DGQwd1_dpuc';

        expect(component).toBeTruthy();
    });

    it('should load video', () => {
        component.videoUrl = 'https://www.youtube.com/watch?v=DGQwd1_dpuc';
        fixture.detectChanges();

        const videoFrame = fixture.nativeElement.querySelector('iframe');

        expect(videoFrame).toBeTruthy();
    });

    it('should mp4 video', () => {
        component.videoUrl = 'http://techslides.com/demos/sample-videos/small.mp4';
        fixture.detectChanges();

        const videoFrame = fixture.nativeElement.querySelector('video');

        expect(videoFrame).toBeTruthy();
    });
});
