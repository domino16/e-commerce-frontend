import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appReplaceImage]',
  standalone: true,
})
export class ReplaceImageDirective {
  @Input() imageUrl: string = '';
  @Input() secondImageUrl: string = '';

  @HostListener('mouseover', ['$event'])
  changeImageOnMouseover(event: Event) {
    const target = event.target as HTMLImageElement;
    target.style.opacity = '0';
    setTimeout(() => {
      target.src = this.secondImageUrl;
      target.style.opacity = '1';
    }, 250);
  }

  @HostListener('mouseout', ['$event'])
  changeImageOnMouseOut(event: Event) {
    const target = event.target as HTMLImageElement;
    target.style.opacity = '0';
    setTimeout(() => {
      target.src = this.imageUrl;
      target.style.opacity = '1';
    }, 250);
  }
}
