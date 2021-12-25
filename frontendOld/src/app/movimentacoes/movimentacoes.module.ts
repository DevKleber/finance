import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { MovimentacoesComponent } from "./movimentacoes.component";

const ROUTES: Routes = [{ path: "", component: MovimentacoesComponent }];
@NgModule({
	declarations: [MovimentacoesComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class MovimentacoesModule {}
