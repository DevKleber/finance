import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { NotificationService } from "../shared/messages/notification.service";
import { Despesa } from "./despesa.model";
import { DespesaService } from "./despesa.service";
import { Helper } from "../helper";
import { BreadcrumbService } from "../layout/breadcrumb/breadcrumb.service";
import { CartaoCreditoService } from "../cartao-credito/cartao-credito.service";
import { TipoDespesaService } from "../tipo-despesa/tipo-despesa.service";
import { CategoriaDespesaService } from "../categoria-despesa/categoria-despesa.service";
import { AmigosService } from "../amigos/amigos.service";

import { Observable } from "rxjs";

@Component({
	selector: "app-despesa",
	templateUrl: "./despesa.component.html",
	styleUrls: ["./despesa.component.css"],
})
export class DespesaComponent implements OnInit {
	despesas: Despesa;
	loader: boolean = true;
	formCartaoCredito: FormGroup;

	nomePessoaModel: string = "";

	cartoes: any[] = [];
	tiposDespesa: any[] = [];
	categorias: any[] = [];
	amigos: any[] = [];
	pessoas: any[] = [];

	despesaConta: boolean = false;
	despesaCompartilhada: boolean = false;
	despesaCartaoCredito: boolean = false;

	constructor(
		private despesaService: DespesaService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		private cartaoCreditoService: CartaoCreditoService,
		private tipoDespesaService: TipoDespesaService,
		private categoriaDespesaService: CategoriaDespesaService,
		private amigosService: AmigosService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.initializeFormEmpty();
		this.getCartoes();
		this.getTipoDespesas();
		this.getCategorias();
		this.getAmigos();
		this.breadCrumb();
	}
	breadCrumb(nome = "Despesas") {
		this.breadcrumbService.chosenPagina([
			{ no_rotina: nome, ds_url: "categoria", active: "" },
			{ no_rotina: "Inserir", ds_url: "mudar-texto", active: "active" },
		]);
	}
	getCartoes() {
		this.cartaoCreditoService.getCartoes().subscribe((res) => {
			this.cartoes = res;
		});
	}
	getTipoDespesas() {
		this.tipoDespesaService.getTipoDespesas().subscribe((res) => {
			this.tiposDespesa = res;
		});
	}
	getCategorias() {
		this.categoriaDespesaService
			.getCategoriaDespesasSelect()
			.subscribe((res) => {
				this.categorias = res;
			});
	}
	procurarPessoa() {
		if (!this.formCartaoCredito.value.nomePessoaSearch.length) return false;

		this.amigosService
			.procurarPessoa(this.formCartaoCredito.value.nomePessoaSearch)
			.subscribe((res) => {
				this.pessoas = res;
			});
	}
	getAmigos() {
		this.amigosService.getAmigos().subscribe((res) => {
			this.amigos = res["tudo"];
			this.loader = false;
		});
	}

	initializeFormEmpty() {
		this.formCartaoCredito = this.formBuilder.group({
			nomePessoaSearch: this.formBuilder.control(""),
			vl_despesac: this.formBuilder.control("", [Validators.required]),
			ds_despesa: this.formBuilder.control("", [Validators.required]),
			dt_despesa: this.formBuilder.control("", [Validators.required]),
			bo_dividir_amigos: this.formBuilder.control(false),
			id_tipo_despesa: this.formBuilder.control("", [
				Validators.required,
			]),
			id_categoria_despesa: this.formBuilder.control("", [
				Validators.required,
			]),
			id_cartao_credito: this.formBuilder.control("", [
				Validators.required,
			]),
			qtd_parcelas: this.formBuilder.control("1"),

			// vl_despesac
			// ds_despesa
			// id_tipo_despesa
			// id_categoria_despesa
			// dt_vencimento
			// qtd_parcelas
			// id_pessoa
			// vl_conta_compartilhada_porcentagem
		});
	}
	save(form) {
		this.despesaService.save(form);
	}

	oqueLancar(frase, qualLancar) {
		this.despesaCompartilhada = false;
		this.despesaCartaoCredito = false;
		this.despesaConta = false;

		switch (qualLancar) {
			case "dc":
				this.despesaCompartilhada = true;
				break;
			case "dcc":
				this.despesaCartaoCredito = true;
				break;
			case "dct":
				this.despesaConta = true;
				break;
		}
		this.breadCrumb(frase);
	}
}
