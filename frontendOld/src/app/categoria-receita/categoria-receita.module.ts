import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { CategoriaReceitaComponent } from "./categoria-receita.component";

const ROUTES: Routes = [{ path: "", component: CategoriaReceitaComponent }];
@NgModule({
	declarations: [CategoriaReceitaComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class CategoriaReceitaModule {}
