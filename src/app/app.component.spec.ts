import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LayoutService } from './core/services/layout.service';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {  NoopAnimationsModule } from '@angular/platform-browser/animations';


    describe('LandingPageComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let layoutService: LayoutService;
    

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [AppComponent,RouterTestingModule, NoopAnimationsModule], 
        providers: [{ provide: LayoutService, useValue: { closeCart: jest.fn() } }, provideMockStore()],
        declarations: [],
        }).compileComponents();
        layoutService = TestBed.inject(LayoutService);
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('#closeCart should close cart', () => {
        const closeCartSpy = jest.spyOn(layoutService, 'closeCart');
        component.closeCart();
        expect(closeCartSpy).toHaveBeenCalled();
    });
    });
