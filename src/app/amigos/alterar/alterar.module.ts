import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AlterarComponent } from './alterar.component';

const ROUTES: Routes = [
  { path: '', component: AlterarComponent }
];
@NgModule({
  declarations: [
    AlterarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class AlterarModule { }