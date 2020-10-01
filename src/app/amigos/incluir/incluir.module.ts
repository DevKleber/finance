import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'
import { RouterModule, Routes } from '@angular/router'
import { IncluirComponent } from './incluir.component';

const ROUTES: Routes = [
  { path: '', component: IncluirComponent }
];
@NgModule({
  declarations: [
    IncluirComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class IncluirModule { }