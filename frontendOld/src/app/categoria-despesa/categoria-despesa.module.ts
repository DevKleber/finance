import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaDespesaComponent } from './categoria-despesa.component';

const ROUTES: Routes = [
  { path: '', component: CategoriaDespesaComponent }
];
@NgModule({
  declarations: [
    CategoriaDespesaComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class CategoriaDespesaModule { }