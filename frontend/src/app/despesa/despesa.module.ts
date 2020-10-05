import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DespesaComponent } from './despesa.component';

const ROUTES: Routes = [
  { path: '', component: DespesaComponent }
];
@NgModule({
  declarations: [
    DespesaComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class DespesaModule { }