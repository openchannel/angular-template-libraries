import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcMenuUserGridComponent} from './oc-menu-user-grid.component';
import {MockSvgIconComponent} from 'oc-ng-common-component/src/mock/mock';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

describe('OcMenuUserGridComponent', () => {
  let component: OcMenuUserGridComponent;
  let fixture: ComponentFixture<OcMenuUserGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OcMenuUserGridComponent, MockSvgIconComponent ],
      imports: [InfiniteScrollModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcMenuUserGridComponent);
    component = fixture.componentInstance;
    component.properties = {data: {count: 0, list: [], pageNumber: 0, pages: 0}, layout: 'table', options: []} ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
