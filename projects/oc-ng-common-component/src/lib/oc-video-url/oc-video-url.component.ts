import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {FileUploadDownloadService} from 'oc-ng-common-service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'oc-video-url',
  templateUrl: './oc-video-url.component.html',
  styleUrls: ['./oc-video-url.component.scss']
})
export class OcVideoUrlComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() modelName;
  @Input() autoFocus;
  /** Placeholder text for input */
  @Input() placeholder: string = '';
  /**
   * List of classes which can be
   * attached to the current list
   */
  @Input() class: string = '';
  /** Set 'disable' state for input */
  @Input() disabled: boolean = false;
  /** Type of the input. Can be 'text' or 'email' */
  @Input() inputType: string = 'text';
  @Input()
  set value(val) {
    this.videoUrl = val;
    this.onChange(this.videoUrl);
  }

  public videoUrl: string;

  loadInIframe = true;
  loadInVideo = false;
  showVideoLoader = false;
  isValidUrl: boolean = false;

  previewData: string;

  private videoUrlRegexp = /((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i;

  private destroy$: Subject<any> = new Subject<any>();

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  constructor(private fileService: FileUploadDownloadService) {

  }

  ngOnInit(): void {
    if(this.videoUrl) {
      this.verifyVideoUrl();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  verifyVideoUrl(): void {
    this.onChange(this.videoUrl);
    this.previewData = '';

    this.isValidUrl = this.videoUrlRegexp.test(this.videoUrl);

    if (this.isValidUrl) {
      this.showVideoLoader = true;
      this.fileService.getVideoData(this.videoUrl)
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

  /**
   * Register touch action
   */
  onFocus(): void {
    this.onTouched();
  }
  /**
   * Calls this function with new value. When user wrote something in the component
   * It needs to know that new data has been entered in the control.
   */
  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }
  /**
   * Calls this function when user left chosen component.
   * It needs for validation
   */
  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }
  /**
   * (Optional)
   * the method will be called by the control when the [disabled] state changes.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  /**
   * this method will be called by the control to pass the value to our component.
   * It is used if the value is changed through the code outside
   * (setValue or changing the variable that ngModel is tied to),
   * as well as to set the initial value.
   */
  writeValue(obj: any): void {
    this.videoUrl = obj;
  }
}
