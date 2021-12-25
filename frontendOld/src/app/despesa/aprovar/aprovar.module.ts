import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AprovarComponent } from "./aprovar.component";

const ROUTES: Routes = [{ path: "", component: AprovarComponent }];
@NgModule({
	declarations: [AprovarComponent],
	imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class AprovarModule {}
