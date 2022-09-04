import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TipoDespesaComponent } from './tipo-despesa.component';

const ROUTES: Routes = [
  { path: '', component: TipoDespesaComponent }
];
@NgModule({
  declarations: [
    TipoDespesaComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class TipoDespesaModule { }