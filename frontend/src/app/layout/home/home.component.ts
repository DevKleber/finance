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
	refresh() {
		// ?refresh=true
		const queryString = window.location.hash;
		var vars = queryString.split("?");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (decodeURIComponent(pair[0]) == "refresh") {
				document.body.style.backgroundImage = "none";
				document.body.style.backgroundRepeat = "none";
				document.body.style.backgroundSize = "none";
				document.body.style.backgroundPosition = "none ";
			}
		}
	}
	configureDate(op) {
		return true;
	}
}
