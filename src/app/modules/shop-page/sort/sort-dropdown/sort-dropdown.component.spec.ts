import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortDropdownComponent } from './sort-dropdown.component';

describe('SortDropdownComponent', () => {
  let component: SortDropdownComponent;
  let fixture: ComponentFixture<SortDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SortDropdownComponent]
    });
    fixture = TestBed.createComponent(SortDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
