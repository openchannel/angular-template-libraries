import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcVideoComponent } from './oc-video.component';
import { SafehtmlPipe } from '../pipe/safehtml.pipe';
import { AppIconsModule } from '../app-icon-module/app-icons.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { FileUploadDownloadService } from 'oc-ng-common-service';
import { FormsModule } from '@angular/forms';
import {EmbedVideo, EmbedVideoService} from 'ngx-embed-video';

describe('OcVideoComponent', () => {
  let component: OcVideoComponent;
  let fixture: ComponentFixture<OcVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcVideoComponent ],
      imports: [AppIconsModule, HttpClientTestingModule],
      providers: [EmbedVideoService]
    })
    .compileComponents();
  }));

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
