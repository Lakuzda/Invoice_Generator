import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list-of-articles',
    loadChildren: () =>
      import('./modules/list-of-articles/list-of-articles.module').then(
        (m) => m.ListOfArticlesModule
      ),
  },
  {
    path: 'summary',
    loadChildren: () =>
      import('./modules/info-and-summary/info-and-summary.module').then(
        (m) => m.InfoAndSummaryModule
      ),
  },

  { path: '', redirectTo: '/list-of-articles', pathMatch: 'full' },
  { path: '**', redirectTo: '/list-of-articles' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
