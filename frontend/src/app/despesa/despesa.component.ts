import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
	FormArray,
} from '@angular/forms';
import { NotificationService } from '../shared/messages/notification.service';
import { Despesa } from './despesa.model';
import { DespesaService } from './despesa.service';
import { Helper } from '../helper';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';
import { CartaoCreditoService } from '../cartao-credito/cartao-credito.service';
import { TipoDespesaService } from '../tipo-despesa/tipo-despesa.service';
import { CategoriaDespesaService } from '../categoria-despesa/categoria-despesa.service';
import { AmigosService } from '../amigos/amigos.service';
import { APIDominio } from '../app.api';

import { Observable } from 'rxjs';
import { LoginService } from '../security/login/login.service';

@Component({
	selector: 'app-despesa',
	templateUrl: './despesa.component.html',
	styleUrls: ['./despesa.component.css'],
})
export class DespesaComponent implements OnInit {
	enviarExtrato: Boolean = false;
	selectedFile: File;
	img: any = 'assets/img/system/recibo3.png';
	imagem: any;
	anexoBanco: any;
	extrato: any[] = [];
	itemExtratoSelected: any;
	categoriasEncontrada: any[] = [];

	despesas: Despesa;
	loader: boolean = true;
	formCartaoCredito: FormGroup;
	items: FormArray;
	usuarioLogado: any = {};
	cartaoEscolhidoParaLancamento: any = {};
	PATHAPI = APIDominio;

	vencimento: any = '';

	nomePessoaModel: string = '';
	novaPessoaModel: string = '';

	cartoes: any[] = [];
	ajudas: any[] = [];
	ajudasFiltro: any[] = [];

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
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
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
		this.ajuda();
		this.breadCrumb();
	}
	breadCrumb(nome = 'Lançar despesa') {
		this.breadcrumbService.chosenPagina([
			{ no_rotina: nome, ds_url: 'categoria', active: '' },
			{ no_rotina: 'Inserir', ds_url: 'mudar-texto', active: 'active' },
		]);
	}
	cartaoEscolhido() {
		const id_cartao = this.formCartaoCredito.value.id_cartao_credito;
		let cartao = this.cartoes.filter((item) => {
			if (item.id_cartao_credito == id_cartao) return item;
		});
		let meuCartao = cartao[0];
		this.cartaoEscolhidoParaLancamento = meuCartao;

		let dt_despesa = this.formCartaoCredito.get('dt_despesa').value;
		var dt_despesaArray = dt_despesa.split('/');

		var currentDate = new Date();
		var hoje = new Date();

		let diaVencimentoCartao = parseInt(
			('0' + meuCartao.dia_fechamento_fatura).slice(-2)
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
	setEnviarExtratos() {
		this.enviarExtrato = this.enviarExtrato ? false : true;
	}
	selectItemExtrato(item, status = 'Selected') {
		this.itemExtratoSelected = item;
		const ultimo = item.length - 1;
		if (item[ultimo] == 'Existe' || item[ultimo] == 'Lancado') {
			return true;
		}

		if (status != 'Lancado') {
			this.extrato.filter((item, index) => {
				if (item[ultimo] == 'Selected') {
					this.extrato[index][ultimo] = '';
					return item;
				}
			});
			const parcelas = item[2].split('/')[1];
			const qtd_parcelas = parcelas !== undefined ? Number(parcelas) : '';
			const id_tipo_despesa = parcelas !== undefined ? 2 : 1;
			const dataCompra = this.helper.formateDateDB2BR(item[0]);

			let valor = new Intl.NumberFormat('pt-BR', {
				currency: 'BRL',
			}).format(item[3]);

			// valor = item[3];

			this.procurarNomeCategoria(item[1]);
			const idCategoria =
				this.categoriasEncontrada.length > 0
					? this.categoriasEncontrada[0].id_categoria_despesa
					: '';

			const referenciaExtrato = item[2] + item[1] + item[0] + item[3];
			this.setCamposAoSelecionarExtrato(
				'',
				valor,
				item[2],
				false,
				id_tipo_despesa,
				idCategoria,
				qtd_parcelas,
				dataCompra,
				referenciaExtrato
			);
		}

		item[ultimo] = status;
	}

	onFileChanged(event) {
		const file: any = this.helper.onFileChanged(event);
		if (!file) {
			alert('Arquivo não permitido');
			return;
		}
		this.img = file.img;
		this.selectedFile = file.selectedFile;

		const uploadData = new FormData();
		if (this.selectedFile) {
			uploadData.append(
				'recibo',
				this.selectedFile,
				this.selectedFile.name
			);
		}

		this.despesaService
			.uploadeFile(
				uploadData,
				this.cartaoEscolhidoParaLancamento.id_cartao_credito
			)
			.subscribe((data) => {
				this.extrato = data;
			});
	}

	ajuda() {
		this.despesaService.ajuda().subscribe((res) => {
			this.ajudas = res;
		});
	}
	procurarNomeCategoria(categoria) {
		const caracteres = 4;

		if (categoria.length < caracteres) {
			this.categoriasEncontrada = [];
			return false;
		}

		this.categoriasEncontrada = this.categorias.filter((el) => {
			const noCategoriaDb = el.no_categoria_despesa.toUpperCase();
			const categoriaExtrato = categoria.toUpperCase();

			if (noCategoriaDb.indexOf(categoriaExtrato) > -1) {
				return el;
			}
		});
	}
	procurarNomeDespesa(busca) {
		const caracteres = 3;

		if (busca.length < caracteres) {
			this.ajudasFiltro = [];
			return false;
		}

		this.ajudasFiltro = this.ajudas.filter((el) => {
			// whereLike
			if (el.ds_despesa.toUpperCase().indexOf(busca.toUpperCase()) > -1) {
				return el;
			}
		});
	}
	escolherFiltro(item) {
		if (!item.id_categoria_despesa) {
			return false;
		}
		this.formCartaoCredito.controls['ds_despesa'].setValue(item.ds_despesa);
		this.formCartaoCredito.controls['id_categoria_despesa'].setValue(
			item.id_categoria_despesa
		);
		this.ajudasFiltro = [];
	}

	getCartoes() {
		this.cartaoCreditoService.getCartoes().subscribe((res) => {
			this.cartoes = res;
		});
	}
	getTipoDespesas() {
		this.tipoDespesaService.getTipoDespesas().subscribe((res) => {
			this.tiposDespesa = res;
			console.log(res);

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
			console.log(this.tiposCartao);
			console.log(this.tiposConta);
		});
	}
	getCategorias() {
		this.categoriaDespesaService
			.getCategoriaDespesasSelect()
			.subscribe((res) => {
				this.categorias = res;
				console.log(res);
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
			this.amigos = res['tudo'];
			this.amigosFiltrado = this.amigos;
			this.loader = false;
		});
	}
	configureDia(maisOuMenos) {
		let dt_despesa = this.formCartaoCredito.get('dt_despesa').value;
		var dt_despesaArray = dt_despesa.split('/');

		var dateObj = new Date(
			parseInt(dt_despesaArray[2]),
			parseInt(dt_despesaArray[1]),
			parseInt(dt_despesaArray[0])
		);

		var MyDateString;
		if (maisOuMenos == '+') {
			dateObj.setDate(dateObj.getDate() + 1);
		} else {
			dateObj.setDate(dateObj.getDate() - 1);
		}

		MyDateString =
			('0' + dateObj.getDate()).slice(-2) +
			'/' +
			('0' + dateObj.getMonth()).slice(-2) +
			'/' +
			dateObj.getFullYear();

		this.formCartaoCredito.controls['dt_despesa'].setValue(MyDateString);
		this.cartaoEscolhido();
	}

	configureDiaVencimento(maisOuMenos) {
		let dt_despesaVencimento =
			this.formCartaoCredito.get('dt_vencimento').value;
		var dt_despesaVencimentoArray = dt_despesaVencimento.split('/');

		var dateObj = new Date(
			parseInt(dt_despesaVencimentoArray[2]),
			parseInt(dt_despesaVencimentoArray[1]),
			parseInt(dt_despesaVencimentoArray[0])
		);

		var MyDateString;
		if (maisOuMenos == '+') {
			dateObj.setDate(dateObj.getDate() + 1);
		} else {
			dateObj.setDate(dateObj.getDate() - 1);
		}

		MyDateString =
			('0' + dateObj.getDate()).slice(-2) +
			'/' +
			('0' + dateObj.getMonth()).slice(-2) +
			'/' +
			dateObj.getFullYear();

		this.formCartaoCredito.controls['dt_vencimento'].setValue(MyDateString);
	}
	getDate() {
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();

		let date =
			('0' + day).slice(-2) + '/' + ('0' + month).slice(-2) + '/' + year;

		return date;
	}

	initializeFormEmpty() {
		this.formCartaoCredito = this.formBuilder.group({
			nomePessoaSearch: this.formBuilder.control(''),
			vl_despesac: this.formBuilder.control('', [Validators.required]),
			ds_despesa: this.formBuilder.control('', [Validators.required]),
			produto: this.formBuilder.control(''),
			dt_despesa: this.formBuilder.control(this.getDate(), [
				Validators.required,
			]),
			bo_dividir_amigos: this.formBuilder.control(false),
			id_tipo_despesa: this.formBuilder.control('', [
				Validators.required,
			]),
			id_categoria_despesa: this.formBuilder.control('', [
				Validators.required,
			]),
			id_cartao_credito: this.formBuilder.control(''),
			qtd_parcelas: this.formBuilder.control('1'),
			dt_vencimento: this.formBuilder.control(this.getDate()),
			referenciaExtrato: this.formBuilder.control(''),
			dividirPessoas: this.formBuilder.array([
				this.pessoaItem(
					this.usuarioLogado.id_pessoa,
					'VOCÊ',
					'',
					this.usuarioLogado.img_perfil
				),
			]),
		});
		this.setValorRemanescente(
			Number(this.formCartaoCredito.get('vl_despesac').value)
		);
	}
	copyValue() {
		const control = <FormArray>(
			this.formCartaoCredito.controls['dividirPessoas']
		);
		let valorDaDespesa = this.formCartaoCredito.value.vl_despesac;
		const valorTemVirgula = valorDaDespesa.toString().split(',');
		if (valorTemVirgula.length > 1) {
			valorDaDespesa = valorDaDespesa.replace('.', '').replace(',', '.');
		}

		const value = valorDaDespesa / control.value.length;

		for (let index = 0; index < control.value.length; index++) {
			let formPessoa = (<FormArray>(
				this.formCartaoCredito.get('dividirPessoas')
			)).at(index);
			formPessoa.patchValue({
				valor: value,
			});
		}
		this.setValorRemanescente(
			this.formCartaoCredito.get('vl_despesac').value
		);
	}
	mudandoValorParaCada(item, indexPessoa) {
		let total = 0;
		const control = <FormArray>(
			this.formCartaoCredito.controls['dividirPessoas']
		);

		control.value.forEach((element) => {
			total += parseFloat(element.valor);
			this.setValorRemanescente(total);

			if (this.valorRemanescente < -0) {
				total = total - parseFloat(element.valor);
				this.setValorRemanescente(total);
				let valorRem = this.valorRemanescente;
				const formPessoa = (<FormArray>(
					this.formCartaoCredito.get('dividirPessoas')
				)).at(indexPessoa);
				formPessoa.patchValue({
					valor: this.valorRemanescente,
				});
				// zerando valor remanescente
				this.setValorRemanescente(
					this.formCartaoCredito.get('vl_despesac').value
				);
			}
		});
	}
	setValorRemanescente(total) {
		let valorDaDespesa = this.formCartaoCredito.get('vl_despesac').value;
		const valorTemVirgula = valorDaDespesa.toString().split(',');
		if (valorTemVirgula.length > 1) {
			valorDaDespesa = valorDaDespesa.replace('.', '').replace(',', '.');
		}

		let valorTotal = total;
		const totalTemVirgula = total.toString().split(',');
		if (totalTemVirgula.length > 1) {
			valorTotal = valorTotal.replace('.', '').replace(',', '.');
		}

		const valorDespesaNumber = Number(valorDaDespesa) ?? 0;
		const totalNumber = Number(valorTotal) ?? 0;
		this.valorRemanescente = valorDespesaNumber - totalNumber;
	}
	pessoaItem(
		id_pessoa = '',
		no_pessoa = '',
		email = '',
		img_perfil = '',
		valor = '0'
	): FormGroup {
		if (id_pessoa != '') {
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
		this.items = this.formCartaoCredito.get('dividirPessoas') as FormArray;
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
		let valorDaDespesa = form.vl_despesac;
		const valorTemVirgula = valorDaDespesa.toString().split(',');
		if (valorTemVirgula.length > 1) {
			valorDaDespesa = valorDaDespesa.replace('.', '').replace(',', '.');
		}
		form.vl_despesac = valorDaDespesa;
		this.despesaService.salvarCartaoCredito(form).subscribe((res) => {
			this.notificationService.notifySweet('Salvo com sucesso!');
			this.limparCamposAoSalvar();
			this.selectItemExtrato(this.itemExtratoSelected, 'Lancado');
		});
	}
	salvarConta(form) {
		this.despesaService.salvarConta(form).subscribe((res) => {
			this.notificationService.notifySweet('Salvo com sucesso!');
			this.limparCamposAoSalvar();
		});
	}
	limparCamposAoSalvar() {
		this.formCartaoCredito.controls['nomePessoaSearch'].setValue('');
		this.formCartaoCredito.controls['vl_despesac'].setValue('');
		this.formCartaoCredito.controls['ds_despesa'].setValue('');
		this.formCartaoCredito.controls['bo_dividir_amigos'].setValue(false);
		this.formCartaoCredito.controls['id_tipo_despesa'].setValue('');
		this.formCartaoCredito.controls['id_categoria_despesa'].setValue('');
		this.formCartaoCredito.controls['qtd_parcelas'].setValue('1');
		this.formCartaoCredito.controls['referenciaExtrato'].setValue('');
		// this.formCartaoCredito.controls["dt_vencimento"].setValue("");
	}
	setCamposAoSelecionarExtrato(
		nomePessoaSearch,
		vl_despesac,
		ds_despesa,
		bo_dividir_amigos,
		id_tipo_despesa,
		id_categoria_despesa,
		qtd_parcelas,
		dtDespesa,
		referenciaExtrato
	) {
		this.formCartaoCredito.controls['nomePessoaSearch'].setValue(
			nomePessoaSearch
		);
		this.formCartaoCredito.controls['vl_despesac'].setValue(vl_despesac);
		this.formCartaoCredito.controls['ds_despesa'].setValue(ds_despesa);
		this.formCartaoCredito.controls['bo_dividir_amigos'].setValue(
			bo_dividir_amigos
		);
		this.formCartaoCredito.controls['id_tipo_despesa'].setValue(
			id_tipo_despesa
		);
		this.formCartaoCredito.controls['id_categoria_despesa'].setValue(
			id_categoria_despesa
		);
		this.formCartaoCredito.controls['qtd_parcelas'].setValue(qtd_parcelas);
		this.formCartaoCredito.controls['dt_despesa'].setValue(dtDespesa);

		this.formCartaoCredito.controls['referenciaExtrato'].setValue(
			referenciaExtrato
		);

		// this.formCartaoCredito.controls["dt_vencimento"].setValue("");

		this.setValorRemanescente(0);
	}

	oqueLancar(frase, qualLancar) {
		this.despesaCartaoCredito = false;
		this.despesaConta = false;

		switch (qualLancar) {
			case 'dcc':
				this.despesaCartaoCredito = true;
				break;
			case 'dct':
				this.despesaConta = true;
				break;
		}
		this.breadCrumb(frase);
	}
	dividirComAmigo(amigo) {
		console.log(amigo);
		// this.amigosParaDividir.push(amigo);
		this.notificationService.notifySweet('Adicionado');
		// this.amigosFiltrado.splice(this.amigosFiltrado.indexOf(amigo), 1);
		// this.amigos.splice(this.amigos.indexOf(amigo), 1);
		this.addPessoas(amigo);
	}
}
