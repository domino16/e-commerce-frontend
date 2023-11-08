import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStickyReactiveHeader]',
  standalone: true,
})
export class StickyReactiveHeaderDirective {
  private lastScrollPosition = 0;
  private isMenuvisible = false;
  @Input() isMenuOpen = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > 80)
      if (currentScrollPosition < this.lastScrollPosition) {
        // Scroll down
        if (!this.isMenuvisible) {
          this.renderer.addClass(this.el.nativeElement, 'visible');
          this.isMenuvisible = true;
        }
      } else {
        // Scroll up
        if (this.isMenuvisible && !this.isMenuOpen) {
          this.renderer.removeClass(this.el.nativeElement, 'visible');
          this.isMenuvisible = false;
        }
      }
    else {
      if (this.isMenuvisible ) {
        this.renderer.removeClass(this.el.nativeElement, 'visible');
        this.isMenuvisible = false;

      }
    }

    this.lastScrollPosition = currentScrollPosition;
  }
}
