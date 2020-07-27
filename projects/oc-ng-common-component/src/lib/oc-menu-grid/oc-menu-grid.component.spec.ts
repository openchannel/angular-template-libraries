import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OcMenuGridComponent } from './oc-menu-grid.component';


describe('OcMenuGridComponent', () => {
  let component: OcMenuGridComponent;
  let fixture: ComponentFixture<OcMenuGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcMenuGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcMenuGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
