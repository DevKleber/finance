import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NotificationService } from "../../shared/messages/notification.service";
import { CartaoCredito } from "../cartao-credito.model";
import { CartaoCreditoService } from "../cartao-credito.service";
import { Helper } from "../../helper";
import { BreadcrumbService } from "../../layout/breadcrumb/breadcrumb.service";

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

	order: any = {};
	columns: any;

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
			.getFatura(this.router.snapshot.params["id"])
			.subscribe((res) => {
				this.cartoes = res["cartao"];
				this.minhasDespesasComCartao = res["tudo"];
				this.faturasCartao = res["faturasCartao"];
				this.resumo = res["resumo"];
				this.dividaAmigos = res["dividaAmigos"];
				this.loader = false;
			});
	}
}
