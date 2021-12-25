import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MudarTextoComponent } from './mudar-texto.component';

const ROUTES: Routes = [
  { path: '', component: MudarTextoComponent }
];
@NgModule({
  declarations: [
    MudarTextoComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MudarTextoModule { }