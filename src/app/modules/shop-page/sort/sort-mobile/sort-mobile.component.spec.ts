import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortMobileComponent } from './sort-mobile.component';

describe('SortMobileComponent', () => {
  let component: SortMobileComponent;
  let fixture: ComponentFixture<SortMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SortMobileComponent]
    });
    fixture = TestBed.createComponent(SortMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
