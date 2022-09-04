import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AmigosComponent } from './amigos.component';

const ROUTES: Routes = [{ path: '', component: AmigosComponent }];
@NgModule({
	declarations: [AmigosComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class AmigosModule {}
