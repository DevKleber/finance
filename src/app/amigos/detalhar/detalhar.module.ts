import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DetalharComponent } from './detalhar.component';

const ROUTES: Routes = [
  { path: '', component: DetalharComponent }
];
@NgModule({
  declarations: [
    DetalharComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class DetalharModule { }