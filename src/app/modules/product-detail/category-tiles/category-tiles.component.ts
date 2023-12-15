import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tiles } from '../../landing-page/landing-page.component';
import { tileCarouselAnimationTrigger } from 'src/app/animations/product-detail-animations';
import { RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-category-tiles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-tiles.component.html',
  styleUrls: ['./category-tiles.component.scss'],
  animations:[tileCarouselAnimationTrigger]
})
export class CategoryTilesComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event){
const width = (event.target as Window).innerWidth;

if (width >= 1024) {
this.currentTile = 1
} 
  }

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

  currentTile = 1

slideRight(){
  if(this.currentTile === 6) return
this.currentTile += 1
console.log(this.currentTile);
}

slideLeft(){
  if(this.currentTile === 1) return
  this.currentTile -= 1
  
  console.log(this.currentTile);
}

}
