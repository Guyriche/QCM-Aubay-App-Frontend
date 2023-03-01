import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './Layout/full/full.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Route Par defaut
  {
    path: 'aubaytest',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/aubaytest/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material-component.module').then(m => m.MaterialComponentModule),
        canActivate:[RouteGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[RouteGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }
      }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
