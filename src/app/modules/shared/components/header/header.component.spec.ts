import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {  provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutService } from '../../../../core/services/layout.service';
import { LOCALE_ID } from '@angular/core';
import { of } from 'rxjs';

// eslint-disable-next-line max-lines-per-function
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let layoutServiceStub: Partial<LayoutService>;

  const createComponent = async (locale: string) => {
    layoutServiceStub = {
      openCart: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: LayoutService, useValue: layoutServiceStub },
        {
          provide: LOCALE_ID,
          useValue: locale,
        },
        provideMockStore({
          initialState: {
            router: {
              state: {
                root: {
                  routeConfig: { path: 'sample-path' },
                },
              },
            },
          },
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create', async () => {
    await createComponent('pl');
    expect(component).toBeTruthy();
  });

  it('#getDataToSetHeaderTextColor should set header text color based on route', async () => {
    await createComponent('pl');
    component.isMobile$ = of(true);
    component.isMenuOpen$ = of(true);
    const setHeaderTextColorSpy = jest.spyOn(component, 'setHeaderTextColor');
    component.ngOnInit();
    expect(setHeaderTextColorSpy).toHaveBeenCalledTimes(1);
  });

  it('#openCart should  openCart', async () => {
    await createComponent('en');
    const openCartSpy = jest.spyOn(layoutServiceStub, 'openCart');
    component.openCart();
    expect(openCartSpy).toHaveBeenCalled();
  });

  it('#setHeaderTextColor should set header text color to #fff and isMenuTextWhite to true when sticky header, menu open, and not mobile', async () => {
    await createComponent('en');

    component.isStickyHeader = true;
    component.setHeaderTextColor('your-route', false, true);

    expect(component.headerTextColor).toBe('#fff');
    expect(component.isMenuTextWhite).toBe(true);
  });

  it('#setHeaderTextColor should set header text color to #000 and isMenuTextWhite to false when sticky header and menu closed or mobile', async () => {
    await createComponent('en');
    component.isStickyHeader = true;

    component.setHeaderTextColor('some-route', true, false);
    expect(component.headerTextColor).toBe('#000');
    expect(component.isMenuTextWhite).toBe(false);

    component.setHeaderTextColor('some-route', true, true);
    expect(component.headerTextColor).toBe('#000');
    expect(component.isMenuTextWhite).toBe(false);
  });

  it('#setHeaderTextColor should set header text color to #fff and isMenuTextWhite to true when not sticky header and route matches whiteRoutes', async () => {
    await createComponent('en');
    component.isStickyHeader = false;
    component.whiteRoutes = ['route'];

    component.setHeaderTextColor('route', true, true);

    expect(component.headerTextColor).toBe('#fff');
    expect(component.isMenuTextWhite).toBe(true);
  });

  it('#setHeaderTextColor should set header text color to #000 and isMenuTextWhite to false when not sticky header and route does not match whiteRoutes', async () => {
    await createComponent('en');
    component.isStickyHeader = false;
    component.whiteRoutes = ['another-route'];

    component.setHeaderTextColor('route', true, true);

    expect(component.headerTextColor).toBe('#000');
    expect(component.isMenuTextWhite).toBe(false);
  });
});
