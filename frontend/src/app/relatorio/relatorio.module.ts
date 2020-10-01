import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioComponent } from './relatorio.component';

const ROUTES: Routes = [
  { path: '', component: RelatorioComponent }
];
@NgModule({
  declarations: [
    RelatorioComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class RelatorioModule { }