import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BurgerBtnComponent } from './burger-btn.component';
import { LayoutService } from '../../../../../core/services/layout.service';
import { of } from 'rxjs';

describe('BurgerBtnComponent', () => {
  let component: BurgerBtnComponent;
  let fixture: ComponentFixture<BurgerBtnComponent>;
  let layoutService: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerBtnComponent],
      providers: [{provide: LayoutService, useValue:{openMenu: jest.fn(), closeMenu: jest.fn()}}]
    }).compileComponents();

    fixture = TestBed.createComponent(BurgerBtnComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService)
    fixture.detectChanges();
  });

  it('#toggleMenu should open menu', ()=> {
    component.isMenuOpen$ = of(false)
    const openMenuSpy = jest.spyOn(layoutService, 'openMenu');

    component.toggleMenu();
    
    expect(openMenuSpy).toHaveBeenCalledTimes(1);
  })

  it('#toggleMenu should close menu', ()=> {
    component.isMenuOpen$ = of(true)
    const closeMenuSpy = jest.spyOn(layoutService, 'closeMenu');

    component.toggleMenu();
    
    expect(closeMenuSpy).toHaveBeenCalledTimes(1);
  })
});
