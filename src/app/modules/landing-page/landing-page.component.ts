import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideUpDirective } from '../shared/directives/animations/gsap/landing-page/slide-up.directive';
import { TilesAnimationDirective } from '../shared/directives/animations/gsap/landing-page/tiles-animation.directive';
import { RouterModule } from '@angular/router';

export interface tiles {
  id:number;
  title: string;
  subTitle: string;
  image: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, SlideUpDirective, TilesAnimationDirective, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations:[
    
  ]
})
export class LandingPageComponent implements OnInit {
  tilesArray: Array<tiles> = [
    { id: 1,
      title: 'coffee beans',
      subTitle: 'new and improved recipe',
      image: '../../../assets/landing_tiles_image/coffee-package.png',
    },
    { id: 2,title: 'ice coffee', subTitle: 'zero sugar', image: '../../../assets/landing_tiles_image/ice-latte.png' },
    {id: 3,
      title: 'coffee capsule',
      subTitle: '',
      image: '../../../assets/landing_tiles_image/kapsułka.png',
    },
    { id: 4,title: 'mugs', subTitle: '', image: '../../../assets/landing_tiles_image/kubek.png' },
    {
      id:5, title: 'yerba mate',
      subTitle: 'zero sugar',
      image: '../../../assets/landing_tiles_image/yerba.png',
    },
    { id: 6 ,title: 'clothes', subTitle: '', image: '../../../assets/landing_tiles_image/koszulka biała.png' },
  ];


  ngOnInit(): void {
    this.scrollTop()
    
  }
  
  scrollTop(){
    window.scrollTo({top:0})
  }
}
