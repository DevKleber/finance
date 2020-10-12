import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { FaturasComponent } from "../faturas/faturas.component";

const ROUTES: Routes = [{ path: "", component: FaturasComponent }];
@NgModule({
	declarations: [FaturasComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class FaturasModule {}
