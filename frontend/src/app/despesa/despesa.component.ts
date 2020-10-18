import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
	FormArray,
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
import { APIDominio } from "../app.api";

import { Observable } from "rxjs";
import { LoginService } from "../security/login/login.service";

@Component({
	selector: "app-despesa",
	templateUrl: "./despesa.component.html",
	styleUrls: ["./despesa.component.css"],
})
export class DespesaComponent implements OnInit {
	despesas: Despesa;
	loader: boolean = true;
	formCartaoCredito: FormGroup;
	items: FormArray;
	usuarioLogado: any = {};
	cartaoEscolhidoParaLancamento: any = {};
	PATHAPI = APIDominio;

	vencimento: any = "";

	nomePessoaModel: string = "";
	novaPessoaModel: string = "";

	cartoes: any[] = [];
	tiposDespesa: any[] = [];
	tiposCartao: any[] = [];
	tiposConta: any[] = [];
	categorias: any[] = [];
	amigosForaSistema: any[] = [];
	amigos: any[] = [];
	amigosFiltrado: any[] = [];
	pessoas: any[] = [];
	amigosParaDividir: any[] = [];

	despesaConta: boolean = false;
	despesaCartaoCredito: boolean = false;
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

	valorRemanescente = 0;

	constructor(
		private despesaService: DespesaService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		private cartaoCreditoService: CartaoCreditoService,
		private tipoDespesaService: TipoDespesaService,
		private categoriaDespesaService: CategoriaDespesaService,
		private amigosService: AmigosService,
		private loginService: LoginService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.usuarioLogado = this.loginService.getUser();
		this.initializeFormEmpty();
		this.getCartoes();
		this.getTipoDespesas();
		this.getCategorias();
		this.getAmigos();
		this.getAmigosForaSistema();
		this.breadCrumb();
	}
	breadCrumb(nome = "Despesas") {
		this.breadcrumbService.chosenPagina([
			{ no_rotina: nome, ds_url: "categoria", active: "" },
			{ no_rotina: "Inserir", ds_url: "mudar-texto", active: "active" },
		]);
	}
	cartaoEscolhido() {
		const id_cartao = this.formCartaoCredito.value.id_cartao_credito;
		let cartao = this.cartoes.filter((item) => {
			if (item.id_cartao_credito == id_cartao) return item;
		});
		let meuCartao = cartao[0];
		this.cartaoEscolhidoParaLancamento = meuCartao;

		let dt_despesa = this.formCartaoCredito.get("dt_despesa").value;
		var dt_despesaArray = dt_despesa.split("/");

		var currentDate = new Date();
		var hoje = new Date();

		let diaVencimentoCartao = parseInt(
			("0" + meuCartao.dia_fechamento_fatura).slice(-2)
		);

		var dataCompra = new Date(
			dt_despesaArray[2],
			dt_despesaArray[1] - 1,
			dt_despesaArray[0]
		);
		var dataVencimentoCartao = new Date(
			hoje.getUTCFullYear(),
			hoje.getUTCMonth(),
			diaVencimentoCartao
		);
		if (dataCompra >= dataVencimentoCartao) {
			currentDate.setMonth(currentDate.getMonth() + 1);
		}

		var month = currentDate.getUTCMonth() + 1;

		this.vencimento = this.months[month - 1];
	}

	getCartoes() {
		this.cartaoCreditoService.getCartoes().subscribe((res) => {
			this.cartoes = res;
		});
	}
	getTipoDespesas() {
		this.tipoDespesaService.getTipoDespesas().subscribe((res) => {
			this.tiposDespesa = res;
			this.separandoTiposDespesa(this.tiposDespesa);
		});
	}

	separandoTiposDespesa(tipos) {
		tipos.forEach((element) => {
			if (element.id_tipo_despesa == 1 || element.id_tipo_despesa == 2) {
				this.tiposCartao.push(element);
			}
			if (element.id_tipo_despesa == 1 || element.id_tipo_despesa == 2) {
				this.tiposConta.push(element);
			}
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
		if (!this.nomePessoaModel.length) {
			this.amigosFiltrado = this.amigos;
			return false;
		}

		let search = this.amigos.filter((el) => {
			// whereLike
			if (
				el.no_pessoa
					.toUpperCase()
					.indexOf(this.nomePessoaModel.toUpperCase()) > -1
			) {
				return el;
			}
		});

		this.amigosFiltrado = search;
		// this.amigosService
		// 	.procurarPessoa(this.nomePessoaModel)
		// 	.subscribe((res) => {
		// 		this.pessoas = res;
		// 	});
	}
	getAmigosForaSistema() {
		this.amigosService.getAmigosForaSistema().subscribe((res) => {
			this.amigosForaSistema = res;
		});
	}
	getAmigos() {
		this.amigosService.getAmigos().subscribe((res) => {
			this.amigos = res["tudo"];
			this.amigosFiltrado = this.amigos;
			this.loader = false;
		});
	}
	configureDia(maisOuMenos) {
		let dt_despesa = this.formCartaoCredito.get("dt_despesa").value;
		var dt_despesaArray = dt_despesa.split("/");

		var dateObj = new Date(
			parseInt(dt_despesaArray[2]),
			parseInt(dt_despesaArray[1]),
			parseInt(dt_despesaArray[0])
		);

		var MyDateString;
		if (maisOuMenos == "+") {
			dateObj.setDate(dateObj.getDate() + 1);
		} else {
			dateObj.setDate(dateObj.getDate() - 1);
		}

		MyDateString =
			("0" + dateObj.getDate()).slice(-2) +
			"/" +
			("0" + dateObj.getMonth()).slice(-2) +
			"/" +
			dateObj.getFullYear();

		this.formCartaoCredito.controls["dt_despesa"].setValue(MyDateString);
		this.cartaoEscolhido();
	}

	configureDiaVencimento(maisOuMenos) {
		let dt_despesaVencimento = this.formCartaoCredito.get("dt_vencimento")
			.value;
		var dt_despesaVencimentoArray = dt_despesaVencimento.split("/");

		var dateObj = new Date(
			parseInt(dt_despesaVencimentoArray[2]),
			parseInt(dt_despesaVencimentoArray[1]),
			parseInt(dt_despesaVencimentoArray[0])
		);

		var MyDateString;
		if (maisOuMenos == "+") {
			dateObj.setDate(dateObj.getDate() + 1);
		} else {
			dateObj.setDate(dateObj.getDate() - 1);
		}

		MyDateString =
			("0" + dateObj.getDate()).slice(-2) +
			"/" +
			("0" + dateObj.getMonth()).slice(-2) +
			"/" +
			dateObj.getFullYear();

		this.formCartaoCredito.controls["dt_vencimento"].setValue(MyDateString);
	}
	getDate() {
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();

		let date =
			("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;

		return date;
	}

	initializeFormEmpty() {
		this.formCartaoCredito = this.formBuilder.group({
			nomePessoaSearch: this.formBuilder.control(""),
			vl_despesac: this.formBuilder.control("", [Validators.required]),
			ds_despesa: this.formBuilder.control("", [Validators.required]),
			dt_despesa: this.formBuilder.control(this.getDate(), [
				Validators.required,
			]),
			bo_dividir_amigos: this.formBuilder.control(false),
			id_tipo_despesa: this.formBuilder.control("", [
				Validators.required,
			]),
			id_categoria_despesa: this.formBuilder.control("", [
				Validators.required,
			]),
			id_cartao_credito: this.formBuilder.control(""),
			qtd_parcelas: this.formBuilder.control("1"),
			dt_vencimento: this.formBuilder.control(this.getDate()),
			dividirPessoas: this.formBuilder.array([
				this.pessoaItem(
					this.usuarioLogado.id_pessoa,
					"VOCÊ",
					"",
					this.usuarioLogado.img_perfil
				),
			]),

			// vl_despesac
			// ds_despesa
			// id_tipo_despesa
			// id_categoria_despesa
			// dt_vencimento
			// qtd_parcelas
			// id_pessoa
			// vl_conta_compartilhada_porcentagem
		});
		this.setValorRemanescente(0);
	}
	mudandoValorParaCada(item, indexPessoa) {
		let total = 0;
		const control = <FormArray>(
			this.formCartaoCredito.controls["dividirPessoas"]
		);

		control.value.forEach((element) => {
			total += parseFloat(element.valor);
			this.setValorRemanescente(total);

			if (this.valorRemanescente < -0) {
				total = total - parseFloat(element.valor);
				this.setValorRemanescente(total);
				let valorRem = this.valorRemanescente;
				const formPessoa = (<FormArray>(
					this.formCartaoCredito.get("dividirPessoas")
				)).at(indexPessoa);
				formPessoa.patchValue({
					valor: this.valorRemanescente,
				});
				// zerando valor remanescente
				this.setValorRemanescente(
					this.formCartaoCredito.get("vl_despesac").value
				);
			}
		});
	}
	setValorRemanescente(total) {
		let valorCompra = this.formCartaoCredito.get("vl_despesac").value;
		this.valorRemanescente = valorCompra - total;
		console.log(valorCompra - total);
	}
	pessoaItem(
		id_pessoa = "",
		no_pessoa = "",
		email = "",
		img_perfil = "",
		valor = "0"
	): FormGroup {
		if (id_pessoa != "") {
			return this.formBuilder.group({
				id_pessoa: this.formBuilder.control(id_pessoa),
				no_pessoa: this.formBuilder.control(no_pessoa),
				email: this.formBuilder.control(email),
				valor: this.formBuilder.control(valor),
				img_perfil: this.formBuilder.control(img_perfil),
			});
		}
	}

	addPessoas(pessoa) {
		this.items = this.formCartaoCredito.get("dividirPessoas") as FormArray;
		this.items.push(
			this.pessoaItem(
				pessoa.id_pessoa_amigo ?? pessoa.id_pessoa,
				pessoa.no_pessoa,
				pessoa.email,
				pessoa.img_perfil
			)
		);
		// this.closeBtn.nativeElement.click();
		// this.nu_telefone='';
	}

	// deleteTelefone(i: number) {
	// 	const control = <FormArray>this.form.controls["telefones"];
	// 	control.removeAt(i);
	// }

	cadastrarNovaPessoaForaAmigo() {
		if (!this.novaPessoaModel.length) return;
		this.amigosService
			.salvarAmigosForaSistema(this.novaPessoaModel)
			.subscribe((res) => {
				this.getAmigosForaSistema();
				this.dividirComAmigo(res);
			});
	}

	salvarCartaoCredito(form) {
		this.despesaService.salvarCartaoCredito(form).subscribe((res) => {
			this.notificationService.notifySweet("Salvo com sucesso!");
			this.limparCamposAoSalvar();
		});
	}
	salvarConta(form) {
		this.despesaService.salvarConta(form).subscribe((res) => {
			this.notificationService.notifySweet("Salvo com sucesso!");
			this.limparCamposAoSalvar();
		});
	}
	limparCamposAoSalvar() {
		this.formCartaoCredito.controls["nomePessoaSearch"].setValue("");
		this.formCartaoCredito.controls["vl_despesac"].setValue("");
		this.formCartaoCredito.controls["ds_despesa"].setValue("");
		this.formCartaoCredito.controls["bo_dividir_amigos"].setValue(false);
		this.formCartaoCredito.controls["id_tipo_despesa"].setValue("");
		this.formCartaoCredito.controls["id_categoria_despesa"].setValue("");
		this.formCartaoCredito.controls["qtd_parcelas"].setValue("1");
		this.formCartaoCredito.controls["dt_vencimento"].setValue("");
	}

	oqueLancar(frase, qualLancar) {
		this.despesaCartaoCredito = false;
		this.despesaConta = false;

		switch (qualLancar) {
			case "dcc":
				this.despesaCartaoCredito = true;
				break;
			case "dct":
				this.despesaConta = true;
				break;
		}
		this.breadCrumb(frase);
	}
	dividirComAmigo(amigo) {
		console.log(amigo);
		// this.amigosParaDividir.push(amigo);
		this.notificationService.notifySweet("Adicionado");
		this.amigosFiltrado.splice(this.amigosFiltrado.indexOf(amigo), 1);
		this.amigos.splice(this.amigos.indexOf(amigo), 1);
		this.addPessoas(amigo);
	}
}
