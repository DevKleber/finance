import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { CartaoCreditoComponent } from "./cartao-credito.component";

const ROUTES: Routes = [{ path: "", component: CartaoCreditoComponent }];
@NgModule({
	declarations: [CartaoCreditoComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class CartaoCreditoModule {}
