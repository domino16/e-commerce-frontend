import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutService } from '../../../core/services/layout.service';
import { Router } from '@angular/router';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let store: MockStore;
  let layoutService: LayoutService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FilterComponent, RouterTestingModule],
      providers: [
        provideMockStore(),
        { provide: LayoutService, useValue: { removeOverflowHidden: jest.fn() } },
      ],
    });
    fixture = TestBed.createComponent(FilterComponent);
    layoutService = TestBed.inject(LayoutService);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#closeFilterMenu should dispatch action and  call removeOverflowHidden from layotService', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const removeOverflowHiddenSpy = jest.spyOn(layoutService, 'removeOverflowHidden');

    component.closeFilterMenu();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(removeOverflowHiddenSpy).toHaveBeenCalled();
  });

  it('#filter should call router.navigate and closeFilterMenu', () => {
    const closeFilterMenuSpy = jest.spyOn(component, 'closeFilterMenu');
    component.filter();
    expect(closeFilterMenuSpy).toHaveBeenCalled();

    component.categoryForm.get('category')?.setValue('');
    const routerSpy = jest.spyOn(router, 'navigate');
    component.filter();
    expect(routerSpy).toHaveBeenCalled();
  });
});
