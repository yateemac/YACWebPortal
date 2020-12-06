import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { EmptyLayoutComponent } from './core/layouts/empty/empty-layout.component';
import { DynamicLayoutComponent } from './core/layouts/dynamic/dynamic-layout.component';

const routes: Routes = [
  //Default route
  //{ path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
  //Auth routes + layout
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  /*
    Main routes + dynamic layouts
  */
  {
    path: '',
    component: DynamicLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'mmp',
        loadChildren: () => import('./modules/mmp/mmp.module').then(m => m.MmpModule)
      },
      {
        path: 'hrms',
        loadChildren: () => import('./modules/hrms/hrms.module').then(m => m.HrmsModule)
      },
      {
        path: 'ecommerce',
        loadChildren: () => import('./modules/ecommerce/ecommerce.module').then(m => m.EcommerceModule)
      },
      {
        path: 'mis',
        loadChildren: () => import('./modules/mis/mis.module').then(m => m.MisModule)
      },
      {
        path: 'wms',
        loadChildren: () => import('./modules/wms/wms.module').then(m => m.WmsModule)
      }
    ]
  },
  //Undefined routes (should redirect to a 404 page)
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  // Only call RouterModule.forRoot() in the root AppRoutingModule (or the AppModule if that's where you register
  // top level application routes). In any other module, you must call the RouterModule.forChild method to register additional routes.
  imports: [
    RouterModule.forRoot(routes, {
      // If you want to preload all lazy routes when the app loads, uncomment the following line
      // preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
      // This value is required for server-side rendering to work.
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
