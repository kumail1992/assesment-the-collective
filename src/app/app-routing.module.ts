import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gist-list',
    loadChildren: () =>
      import('./gist-list/gist-list.module').then((m) => m.GistListModule),
  },
  {
    path: '**',
    redirectTo: 'gist-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
