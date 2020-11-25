import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NotificationService } from "../../shared/messages/notification.service";
import { CartaoCredito } from "../cartao-credito.model";
import { CartaoCreditoService } from "../cartao-credito.service";
import { Helper } from "../../helper";
import { BreadcrumbService } from "../../layout/breadcrumb/breadcrumb.service";
import { APIDominio } from "../../app.api";

import { Observable } from "rxjs";

@Component({
	selector: "app-faturas",
	templateUrl: "./faturas.component.html",
	styleUrls: ["./faturas.component.css"],
})
export class FaturasComponent implements OnInit {
	cartoes: any = {};
	minhasDespesasComCartao: any[] = [];
	faturasCartao: any[] = [];
	dividaAmigos: any[] = [];
	resumo: any = {};
	form: FormGroup;
	loader: boolean = true;
	imgBin: string = "";
	urlImgBin: string = "/assets/img/card/bin";
	bandeira: string = "";
	imgApi: string = APIDominio;

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

	multi: any[];

	view: any[] = [null, 400];

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

	constructor(
		private cartaoCreditoService: CartaoCreditoService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		private helper: Helper,
		private router: ActivatedRoute,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		// this.breadCrumb();
		this.configureDate("");
		this.getFatura();
	}

	breadCrumb() {
		this.breadcrumbService.chosenPagina([
			{
				no_rotina: "Fatura",
				ds_url: "cartao-credito",
				active: "",
			},
			{ no_rotina: "Inserir", ds_url: "mudar-texto", active: "active" },
		]);
	}
	getFatura() {
		this.cartaoCreditoService
			.getFatura(this.dataFiltro)
			.subscribe((res) => {
				this.cartoes = res["cartao"];
				this.minhasDespesasComCartao = res["tudo"];
				this.faturasCartao = res["faturasCartao"];
				this.resumo = res["resumo"];
				this.dividaAmigos = res["dividaAmigos"];
				this.loader = false;
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
		this.dataFiltro.id = this.router.snapshot.params["id"];
		this.getFatura();
	}
}
