import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../breadcrumb/breadcrumb.service";
import { DashboardService } from "../../dashboard/dashboard.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	dashboard: any[] = [];
	dashboardCategoriaPaiMes: any[] = [];
	total: any = {};
	totalCategoriaPai: any = {};
	dashboardCategoriaPaiAno: any[] = [];
	totalCategoriaPaiAno: any = {};
	amigosPagar: any = {};
	movimentacaoEscolhida: any = {};
	dataFiltro: any = {};
	dateObj = new Date();

	// options
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = false;
	showXAxisLabel = true;
	xAxisLabel = "Categorias";
	showYAxisLabel = true;
	yAxisLabel = "Reais";

	colorScheme = {
		domain: ["#5AA454", "#4e73df", "#f79e1b", "#AAAAAA"],
	};

	months = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	constructor(
		private breadcrumbService: BreadcrumbService,
		private dashboardService: DashboardService
	) {}

	ngOnInit() {
		this.refresh();
		this.breadcrumbService.chosenPagina([
			{ no_rotina: "Dashboard", ds_url: "", active: "" },
			{ no_rotina: "Listar", ds_url: "funcionario", active: "active" },
		]);
		this.configureDate("");
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

	Detdashboard() {
		this.dashboardService.getDashboard(this.dataFiltro).subscribe((res) => {
			this.dashboard = res["despesasDoMesCategoria"]["data"];
			this.total = res["despesasDoMesCategoria"]["total"];
			this.dashboardCategoriaPaiMes =
				res["despesasDoMesCategoriaPai"]["data"];
			this.totalCategoriaPai = res["despesasDoMesCategoriaPai"]["total"];
			this.dashboardCategoriaPaiAno =
				res["despesasDoAnoCategoriaPai"]["data"];
			this.totalCategoriaPaiAno =
				res["despesasDoAnoCategoriaPai"]["total"];
		});
	}

	configureDate(maisOuMenos) {
		if (maisOuMenos == "+") {
			this.dateObj.setMonth(this.dateObj.getMonth() + 1);
		} else if (maisOuMenos == "-") {
			this.dateObj.setMonth(this.dateObj.getMonth() - 1);
		}

		var month = this.dateObj.getUTCMonth() + 1; //months from 1-12
		var year = this.dateObj.getUTCFullYear();

		this.dataFiltro.mes = month;
		this.dataFiltro.mesNome = this.months[month - 1];
		this.dataFiltro.ano = year;
		this.Detdashboard();
	}

	movimentacaoSelecionada(mov) {
		this.movimentacaoEscolhida = mov;
	}
}
