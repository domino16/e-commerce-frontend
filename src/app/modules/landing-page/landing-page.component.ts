import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideUpDirective } from '../shared/directives/animations/gsap/landing-page/slide-up.directive';
import { TilesAnimationDirective } from '../shared/directives/animations/gsap/landing-page/tiles-animation.directive';

interface tiles {
  title: string;
  subTitle: string;
  image: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, SlideUpDirective, TilesAnimationDirective],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations:[
    
  ]
})
export class LandingPageComponent {
  tilesArray: Array<tiles> = [
    {
      title: 'coffee beans',
      subTitle: 'new and improved recipe',
      image: '../../../assets/landing_tiles_image/coffee-package.png',
    },
    { title: 'ice coffee', subTitle: 'zero sugar', image: '../../../assets/landing_tiles_image/ice-latte.png' },
    {
      title: 'coffee capsule',
      subTitle: '',
      image: '../../../assets/landing_tiles_image/kapsułka.png',
    },
    { title: 'mugs', subTitle: '', image: '../../../assets/landing_tiles_image/kubek.png' },
    {
      title: 'yerba mate',
      subTitle: 'zero sugar',
      image: '../../../assets/landing_tiles_image/yerba.png',
    },
    { title: 'clothes', subTitle: '', image: '../../../assets/landing_tiles_image/koszulka biała.png' },
  ];

  tilesTrackBy(index: number, item: tiles) {
    return item;
  }
}
