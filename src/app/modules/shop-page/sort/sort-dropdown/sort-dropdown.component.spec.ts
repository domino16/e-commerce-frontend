import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortDropdownComponent } from './sort-dropdown.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

describe('SortDropdownComponent', () => {
  let component: SortDropdownComponent;
  let fixture: ComponentFixture<SortDropdownComponent>;
  let router:Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SortDropdownComponent, RouterTestingModule]
    });
    fixture = TestBed.createComponent(SortDropdownComponent);
    router = TestBed.inject(Router)
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
});
