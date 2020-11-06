import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcVideoComponent } from './oc-video.component';
import { SafehtmlPipe } from '../pipe/safehtml.pipe';
import { AppIconsModule } from '../app-icon-module/app-icons.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { FileUploadDownloadService } from 'oc-ng-common-service';
import { FormsModule } from '@angular/forms';

describe('OcVideoComponent', () => {
  let component: OcVideoComponent;
  let fixture: ComponentFixture<OcVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcVideoComponent, SafehtmlPipe ],
      imports: [AppIconsModule, HttpClientTestingModule, FormsModule],
      providers: [{provide: FileUploadDownloadService, useClass: MockFleService}]
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


class MockFleService {
  public getVideoMetaData(videoUrl): Observable<any> {
    if (videoUrl && !videoUrl.endsWith('.mp4')) {
      return of({
        html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">' +
          '<iframe ' +
          'src="https://cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fyoutu.be%2FDGQwd1_dpuc&amp;key=37e96b37fac1aa5b67e77eb5142641c6" ' +
          'style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" ' +
          'allowfullscreen scrolling="no" allow="encrypted-media *; accelerometer; gyroscope; picture-in-picture"></iframe>' +
          '</div></div>',
      });
    } else {
      return of({
        error: true
      });
    }
  }
}
