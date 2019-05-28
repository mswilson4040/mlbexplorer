import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreComponent } from './areas/explore/explore/explore.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'explore',
  },
  {
    path: 'explore',
    component: ExploreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
