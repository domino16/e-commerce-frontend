import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTilesComponent } from './category-tiles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('CategoryTilesComponent', () => {
  let component: CategoryTilesComponent;
  let fixture: ComponentFixture<CategoryTilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryTilesComponent, BrowserAnimationsModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(CategoryTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call hostListener windwo.resize', () => {
    const spyOnResize = jest.spyOn(component, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize).toHaveBeenCalled();
  })

  it('#slideRight should increment currentTile when slideRight is called', () => {
    component.currentTile = 3;
    component.slideRight();
    expect(component.currentTile).toBe(4);
  });

  it('#slideRight should decrement currentTile when slideLeft is called', () => {
    component.currentTile = 3;
    component.slideLeft();
    expect(component.currentTile).toBe(2);
  });

  it('#slideRight should not increment currentTile beyond 6', () => {
    component.currentTile = 6;
    component.slideRight();
    expect(component.currentTile).toBe(6);
  });

  it('#slideRight should not decrement currentTile beyond 1', () => {
    component.currentTile = 1;
    component.slideLeft();
    expect(component.currentTile).toBe(1);
  });
});
