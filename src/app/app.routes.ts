import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { ShopPageComponent } from './modules/shop-page/shop-page.component';
import { ProductDetailComponent } from './modules/product-detail/product-detail.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'shop',
    component: ShopPageComponent,
  },
  {
    path: 'shop/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
];

// export const appPaths = {
//   home: '',
//   error404: '404',
// };

// export const routes = {
//   home: `/${appPaths.home}`,
//   error404: `/${appPaths.error404}`,
// };
