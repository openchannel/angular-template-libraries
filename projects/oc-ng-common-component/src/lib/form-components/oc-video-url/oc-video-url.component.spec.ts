import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcVideoUrlComponent} from './oc-video-url.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {EmbedVideoService} from 'ngx-embed-video';
import {OcVideoComponent} from 'oc-ng-common-component/src/lib/common-components';
import {NgxSpinnerModule} from 'ngx-spinner';

describe('OcVideoUrlComponent', () => {
  let component: OcVideoUrlComponent;
  let fixture: ComponentFixture<OcVideoUrlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcVideoUrlComponent, OcVideoComponent],
      imports: [FormsModule, HttpClientTestingModule, NgxSpinnerModule],
      providers: [EmbedVideoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcVideoUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain value in input', async () => {
    component.writeValue('https://www.youtube.com/watch?v=DGQwd1_dpuc');

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(component.videoUrl).toEqual('https://www.youtube.com/watch?v=DGQwd1_dpuc');
      expect(input.value).toContain('https://www.youtube.com/watch?v=DGQwd1_dpuc');
    });
  });

  it('input should contain placeholder', () => {
    component.placeholder = 'test input';

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();

    expect(input.placeholder).toEqual('test input');
  });

  it('input should be disabled', async () => {
    component.setDisabledState(true);

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(input.disabled).toBeTruthy();
    });
  });

  it('should call onChange with value', async () => {
    const onChangeFunc = jest.fn();
    component.registerOnChange(onChangeFunc);

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'test on change';
    input.dispatchEvent(new Event('input'));

    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toBe('test on change');
  });

  it('should call onTouch', async () => {
    const onTouchedFunc = jest.fn();
    component.registerOnTouched(onTouchedFunc);

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'test on change';
    input.dispatchEvent(new Event('focus'));

    expect(onTouchedFunc).toHaveBeenCalled();
  });

  it('should load video', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'https://www.youtube.com/watch?v=DGQwd1_dpuc';

    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const videoFrame = fixture.nativeElement.querySelector('iframe');
    expect(videoFrame).toBeTruthy();
  });

  it('should mp4 video', () => {
    component.videoUrl = 'https://techslides.com/demos/sample-videos/small.mp4';
    component.emitChanges();
    fixture.detectChanges();

    const videoFrame = fixture.nativeElement.querySelector('video');
    expect(videoFrame).toBeTruthy();
  });

  it('should not load video ', () => {
    component.videoUrl = 'some text';
    fixture.detectChanges();

    const video = fixture.nativeElement.querySelector('video');
    const videoFrame = fixture.nativeElement.querySelector('iframe');

    expect(video).toBeFalsy();
    expect(videoFrame).toBeFalsy();
  });
});


class MockFleService {
  public getVideoData(videoUrl): Observable<any> {
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
