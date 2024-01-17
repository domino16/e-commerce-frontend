import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent, RouterTestingModule],
    });
    fixture = TestBed.createComponent(PaginationComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update pageNumbers on ngOnChanges', () => {
component.pageData = {size:5, totalElements:30, totalPages:6, number:2}

    component.ngOnChanges({pageData: {previousValue:1, currentValue:2, isFirstChange:()=> false, firstChange:false }});

    expect(component.pageNumbers).toEqual([0, 1, 2, 3, 4, 5]);
  });
  
  it('#setPage should set default page', () => {
    const windowSpy = jest.spyOn(window, 'scrollTo');

    component.setPage(0);
    expect(windowSpy).toHaveBeenCalled();
  });

  it('#setPage should set page', () => {
    const windowSpy = jest.spyOn(window, 'scrollTo');

    component.setPage(1);
    expect(windowSpy).toHaveBeenCalled();
  });
});
