/* eslint-disable max-lines-per-function */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortMobileComponent } from './sort-mobile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutService } from '../../../../core/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('SortMobileComponent', () => {
  let component: SortMobileComponent;
  let fixture: ComponentFixture<SortMobileComponent>;
  let layoutService: LayoutService;
  let router: Router;
  let route:ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SortMobileComponent, RouterTestingModule],
      providers: [{provide:LayoutService, useValue: {addOverflowHidden: jest.fn(), removeOverflowHidden: jest.fn()}}]
    });
    fixture = TestBed.createComponent(SortMobileComponent);
    layoutService = TestBed.inject(LayoutService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should subscribe sortForm valueChanges', ()=>{
    const sortSpy = jest.spyOn(component, 'sort');
    component.ngOnInit();
    expect(sortSpy).toHaveBeenCalled();
  })

  it('#loadCurrentSetting should load current setting', ()=>{
     jest.spyOn(route.snapshot.queryParamMap, 'get').mockReturnValue('test')
     component.loadCurrentSettings()
    expect(component.sortForm.get('sort')?.value).toEqual('test')
  })

  it('#sort should navigate and close sort menu', ()=>{
    const routerSpy = jest.spyOn(router, 'navigate');
    component.sort();
    expect(routerSpy).toHaveBeenCalledTimes(1)

    component.sortForm.get('sort')?.setValue('test')
    expect(routerSpy).toHaveBeenCalledTimes(2)
  })

  it('#openSortMenu should close menu', ()=>{
    const  addOverflowHiddenSpy = jest.spyOn(layoutService, 'addOverflowHidden');
   component.openSortMenu();
   expect(addOverflowHiddenSpy).toHaveBeenCalled();
   expect(component.isOpen).toBeTruthy();
  })

  it('#closeSortMenu should close menu', ()=>{
    const  removeOverflowHiddenSpy = jest.spyOn(layoutService, 'removeOverflowHidden');
   component.closeSortMenu();
   expect(removeOverflowHiddenSpy).toHaveBeenCalled();
   expect(component.isOpen).toBeFalsy();
  })
  
});
