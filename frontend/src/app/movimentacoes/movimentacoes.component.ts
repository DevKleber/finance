import { Component, OnInit } from "@angular/core";
import { MovimentacoesService } from "./movimentacoes.service";
@Component({
	selector: "app-movimentacoes",
	templateUrl: "./movimentacoes.component.html",
	styleUrls: ["./movimentacoes.component.css"],
})
export class MovimentacoesComponent implements OnInit {
	movimentacoes: any[] = [];
	resumo: any = {};
	amigosPagar: any = {};
	dataFiltro: any = {};
	dateObj = new Date();
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
	constructor(private movimentacoesService: MovimentacoesService) {}

	ngOnInit(): void {
		this.configureDate("");
		this.getMovimentacoes();
	}
	getMovimentacoes() {
		this.movimentacoesService
			.getMovimentacoes(this.dataFiltro)
			.subscribe((res) => {
				this.movimentacoes = res["tudo"];
				this.resumo = res["resumo"];
				this.amigosPagar = res["amigosPagar"];
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
		this.getMovimentacoes();
	}
}
