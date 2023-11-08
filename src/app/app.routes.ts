import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { ShopPageComponent } from './modules/shop-page/shop-page.component';

export const routes: Routes= [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'shop',
    component:ShopPageComponent,
  }
  // {
  //   path: 'todos',
  //   loadComponent: () => import('./todos/todos.component'),
  // },
];

// export const appPaths = {
//   home: '',
//   error404: '404',
// };

// export const routes = {
//   home: `/${appPaths.home}`,
//   error404: `/${appPaths.error404}`,
// };