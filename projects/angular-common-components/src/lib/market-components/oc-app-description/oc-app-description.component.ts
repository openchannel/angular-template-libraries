import { Component, Input, OnInit, SimpleChanges, ViewChild, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'oc-app-description',
    templateUrl: './oc-app-description.component.html',
    styleUrls: ['./oc-app-description.component.scss'],
})
export class OcAppDescriptionComponent implements OnInit, OnChanges {
    @ViewChild('description', { static: true }) description: HTMLParagraphElement;

<<<<<<< HEAD
  @ViewChild('description', { static: true }) description: HTMLParagraphElement;
  _appDescription: string
  /** App Description text */
  @Input() set appDescription(value: string){
    this._appDescription = value || '';
  }
  get appDescription(){
    return this._appDescription;
  }
  /** Header of the App Description section */
  _header : string = '';
  @Input() set header(header: string) {
    if (header) {
      this._header = header;
=======
    /** App Description text */
    @Input() appDescription: string = '';
    /** Header of the App Description section */
    @Input() set header(header: string) {
        if (header) {
            this.headerText = header;
        }
>>>>>>> 5341905580375927066ad1a64f9154cafc965873
    }

    /** Show full description always. Text for expand description will not be shown */
    @Input() showFullDescription: boolean = false;
    /** String with classes that will be applied to the header */
    @Input() headerClass: string;
    /** Threshold number to truncate text if 'show more' logic available */
    @Input() threshold: number;
    /** Boolean variable to allow 'show more' logic */
    @Input() allowTruncateLogic = true;

<<<<<<< HEAD
  cutAppDescription: SafeHtml = ""

  constructor(private sanitizer: DomSanitizer) {}
=======
    headerText: string = '';

    cutAppDescription: SafeHtml;
>>>>>>> 5341905580375927066ad1a64f9154cafc965873

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.rerenderDescription();
    }

<<<<<<< HEAD
  rerenderDescription(): void {
    if(this._appDescription && this._appDescription.length){
      if(this.allowTruncateLogic && this.threshold){
        let indexBrakeWord: number;
        let sizeBrakeWord: number;
        let tagsRegExp = /<[^>]+>/gi;
        let tagsArray = this._appDescription.match(tagsRegExp);
        let textArray = this._appDescription.split(tagsRegExp);
        textArray.pop();
        textArray.shift();
        textArray.reduce((acc, cur, i)=>{
          if(!indexBrakeWord && !sizeBrakeWord && (acc+cur).length>=this.threshold){
            indexBrakeWord = i;
            sizeBrakeWord = this.threshold - acc.length;
          }
          return acc+cur;
        })
        textArray.length = indexBrakeWord+1;
        textArray[indexBrakeWord] = textArray[indexBrakeWord].slice(0, sizeBrakeWord);
        this.cutAppDescription = this.sanitizer.bypassSecurityTrustHtml(tagsArray.reduce((acc, curr, i)=>acc+(i-1<=textArray.length-1 ? textArray[i-1] : '')+curr));
      }
      if (this.threshold && this._appDescription.length < this.threshold) {
        this.showFullDescription = true;
      }
    } else {
      this.cutAppDescription = "";
=======
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.appDescription.currentValue !== changes.appDescription.previousValue) {
            this.rerenderDescription();
        }
    }

    rerenderDescription(): void {
        if (this.allowTruncateLogic && this.threshold) {
            let indexBrakeWord: number;
            let sizeBrakeWord: number;
            const tagsRegExp = /<[^>]+>/gi;
            const tagsArray = this.appDescription.match(tagsRegExp);
            const textArray = this.appDescription.split(tagsRegExp);
            textArray.pop();
            textArray.shift();
            textArray.reduce((acc, cur, i) => {
                if (!indexBrakeWord && !sizeBrakeWord && (acc + cur).length >= this.threshold) {
                    indexBrakeWord = i;
                    sizeBrakeWord = this.threshold - acc.length;
                }
                return acc + cur;
            });
            textArray.length = indexBrakeWord + 1;
            textArray[indexBrakeWord] = textArray[indexBrakeWord].slice(0, sizeBrakeWord);
            this.cutAppDescription = this.sanitizer.bypassSecurityTrustHtml(
                tagsArray.reduce((acc, curr, i) => acc + (i - 1 <= textArray.length - 1 ? textArray[i - 1] : '') + curr),
            );
        }
        if (this.threshold && this.appDescription.length < this.threshold) {
            this.showFullDescription = true;
        }
>>>>>>> 5341905580375927066ad1a64f9154cafc965873
    }
}
