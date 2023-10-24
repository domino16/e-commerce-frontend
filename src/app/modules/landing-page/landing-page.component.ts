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
      title: 'passion',
      subTitle: 'new and improved recipe',
      image: '',
    },
    { title: 'original', subTitle: '', image: '' },
    {
      title: 'rose & hibiscus',
      subTitle: '',
      image: '',
    },
    { title: 'mint & lime', subTitle: '', image: '' },
    {
      title: 'ginger',
      subTitle: 'zero sugar',
      image: '',
    },
    { title: 'mate & vodka', subTitle: '', image: '' },
  ];

  tilesTrackBy(index: number, item: tiles) {
    return item;
  }
}
