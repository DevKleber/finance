import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../breadcrumb/breadcrumb.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	constructor(private breadcrumbService: BreadcrumbService) {}

	ngOnInit() {
		this.refresh();
		this.breadcrumbService.chosenPagina([
			{ no_rotina: "Dashboard", ds_url: "", active: "" },
			{ no_rotina: "Listar", ds_url: "funcionario", active: "active" },
		]);
	}
	refresh() {}
	configureDate(op) {
		return true;
	}
}
