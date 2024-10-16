import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOfArticlesRoutingModule } from './list-of-articles-routing.module';
import { ListOfArticlesComponent } from './list-of-articles.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ListOfArticlesComponent],
  imports: [
    CommonModule,
    ListOfArticlesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class ListOfArticlesModule {}
