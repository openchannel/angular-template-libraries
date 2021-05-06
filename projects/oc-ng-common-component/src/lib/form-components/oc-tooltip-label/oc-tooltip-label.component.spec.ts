import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OcTooltipLabelComponent} from 'oc-ng-common-component/src/lib/form-components';
import {MockSvgIconComponent} from 'oc-ng-common-component/src/mock/mock';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('OcTooltipLabelComponent', () => {
  let component: OcTooltipLabelComponent;
  let fixture: ComponentFixture<OcTooltipLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcTooltipLabelComponent, MockSvgIconComponent ],
      imports: [NgbModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTooltipLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
