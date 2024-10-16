import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfArticlesComponent } from './list-of-articles.component';

const routes: Routes = [{ path: '', component: ListOfArticlesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOfArticlesRoutingModule { }
