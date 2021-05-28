import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcAppDescriptionComponent } from './oc-app-description.component';
import { FormsModule } from '@angular/forms';
import { OcCommonLibModule } from '../../common-components/';
import { By } from '@angular/platform-browser';

describe('OcAppDescriptionComponent', () => {
<<<<<<< HEAD
    let component: OcAppDescriptionComponent;
    let fixture: ComponentFixture<OcAppDescriptionComponent>;
    let descriptionElement: Element;
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcAppDescriptionComponent],
                imports: [FormsModule, OcCommonLibModule],
            }).compileComponents();
        }),
    );
=======
  let component: OcAppDescriptionComponent;
  let fixture: ComponentFixture<OcAppDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppDescriptionComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));
>>>>>>> 5341905580375927066ad1a64f9154cafc965873

    beforeEach(() => {
        fixture = TestBed.createComponent(OcAppDescriptionComponent);
        component = fixture.componentInstance;
<<<<<<< HEAD
        descriptionElement = fixture.debugElement.query(By.css('.description__text')).nativeElement;
=======
>>>>>>> 5341905580375927066ad1a64f9154cafc965873
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('header normal value', () => {
        const header = 'Header';
        setHeaderText(header);
        expect(getHeaderText()).toEqual(header);
    });

    it('header non null', () => {
        const header = null;
        setHeaderText(header);
        expect(getHeaderText()).toEqual('');
    });

    it('header non undefined', () => {
        const header = undefined;
        setHeaderText(header);
        expect(getHeaderText()).toEqual('');
    });

    it('description normal value', () => {
        const description = 'Description';
        setDescriptionText(description);
        expect(getDescriptionText()).toEqual(description);
    });

    it('description non null', () => {
        const description = null;
        setDescriptionText(description);
        expect(getDescriptionText()).toEqual('');
    });

    it('description non undefined', () => {
        const description = undefined;
        setDescriptionText(description);
        expect(getDescriptionText()).toEqual('');
    });

<<<<<<< HEAD
    it('switch full description by click', () => {
        setDescriptionText('lorem ipsum');
        setThreshold(800);
        fixture.detectChanges();
        expect(component.showFullDescription).toBeFalsy();
        expect(descriptionElement.textContent).toEqual(component.cutAppDescription as string);
        fixture.nativeElement.querySelector('span').click();
        fixture.detectChanges();
        expect(component.showFullDescription).toBeTruthy();
        expect(descriptionElement.textContent).toEqual(component._appDescription);
    });

=======
  it('switch full description by click', () => {
    fixture.detectChanges();
    expect(component.showFullDescription).toBeFalsy();
    fixture.nativeElement.querySelector('span').click();
    fixture.detectChanges();
    expect(component.showFullDescription).toBeTruthy();
    expect(fixture.nativeElement.querySelector('span')).toBeNull();
    });


>>>>>>> 5341905580375927066ad1a64f9154cafc965873
    function setHeaderText(header: string): void {
        component.header = header;
        fixture.detectChanges();
    }

<<<<<<< HEAD
    function setThreshold(threshold: number): void {
        component.threshold = threshold;
        fixture.detectChanges();
    }

=======
>>>>>>> 5341905580375927066ad1a64f9154cafc965873
    function getHeaderText(): string {
        return fixture.nativeElement.querySelector('h4').innerHTML;
    }

    function setDescriptionText(description: string): void {
        component.appDescription = description;
        fixture.detectChanges();
    }

    function getDescriptionText(): string {
        return fixture.nativeElement.querySelector('p').innerHTML;
    }
});
<<<<<<< HEAD

=======
>>>>>>> 5341905580375927066ad1a64f9154cafc965873
