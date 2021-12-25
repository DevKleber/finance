import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovimentacoesService } from './movimentacoes.service';
import { Helper } from '../helper';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';
import { APIDominio } from '../app.api';
import { NotificationService } from '../shared/messages/notification.service';
@Component({
	selector: 'app-movimentacoes',
	templateUrl: './movimentacoes.component.html',
	styleUrls: ['./movimentacoes.component.css'],
})
export class MovimentacoesComponent implements OnInit {
	detalhesDespesa: any[] = [];
	detalhesDespesaDespesaVlDespesac: number = null;

	movimentacoes: any[] = [];
	resumo: any = {};
	amigosPagar: any = {};
	movimentacaoEscolhida: any = {};
	dataFiltro: any = {};
	dateObj = new Date();
	img: any = 'assets/img/system/recibo3.png';
	imgApi: string = APIDominio;
	comprovante: any;
	selectedFile: File;
	imagem: any;

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
	@ViewChild('closeModalPagamento', { static: true })
	closeModalPagamento: ElementRef;

	@ViewChild('closeModalAlterarDespesa', { static: true })
	closeModalAlterarDespesa: ElementRef;
	constructor(
		private movimentacoesService: MovimentacoesService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.configureDate('');
		this.getMovimentacoes();
		this.breadCrumb();
	}
	breadCrumb(nome = 'Movimentações') {
		this.breadcrumbService.chosenPagina([
			{ no_rotina: nome, ds_url: 'movimentacoes', active: '' },
			{ no_rotina: 'Inserir', ds_url: 'movimentacoes', active: 'active' },
		]);
	}
	getMovimentacoes() {
		this.movimentacoesService
			.getMovimentacoes(this.dataFiltro)
			.subscribe((res) => {
				this.movimentacoes = res['tudo'];
				this.resumo = res['resumo'];
				this.amigosPagar = res['amigosPagar'];
			});
	}
	configureDate(maisOuMenos) {
		if (maisOuMenos == '+') {
			this.dateObj.setMonth(this.dateObj.getMonth() + 1);
		} else if (maisOuMenos == '-') {
			this.dateObj.setMonth(this.dateObj.getMonth() - 1);
		}

		var month = this.dateObj.getUTCMonth() + 1; //months from 1-12
		var year = this.dateObj.getUTCFullYear();

		this.dataFiltro.mes = month;
		this.dataFiltro.mesNome = this.months[month - 1];
		this.dataFiltro.ano = year;
		this.getMovimentacoes();
	}
	movimentacaoSelecionada(mov) {
		this.movimentacaoEscolhida = mov;
	}
	movimentacaoSelecionadaAlterar(mov) {
		this.movimentacaoEscolhida = mov;
		this.movimentacoesService
			.detalharDespesa(mov.id_despesa)
			.subscribe((res) => {
				this.detalhesDespesa = res;
				this.detalhesDespesaDespesaVlDespesac = Number(
					this.detalhesDespesa?.['despesa']?.vl_despesac
				);
			});
	}
	deletarDespesa(idDespesa) {
		this.movimentacoesService.deletarDespesa(idDespesa).subscribe((res) => {
			this.getMovimentacoes();
			this.notificationService.notifySweet('Deletado com sucesso!');
			this.closeModalAlterarDespesa.nativeElement.click();
		});
	}
	update(item) {
		item.despesa.vl_despesac = this.detalhesDespesaDespesaVlDespesac;
		console.log(item);

		this.movimentacoesService.alterarDespesa(item).subscribe((res) => {
			this.detalhesDespesa = res;
		});
	}
	alterarDespesa() {}
	pagarDespesa() {
		if (!this.movimentacaoEscolhida.id_despesa_item) {
			alert('Escolha uma despesa');
			return;
		}

		const uploadData = new FormData();
		if (this.selectedFile) {
			uploadData.append(
				'recibo',
				this.selectedFile,
				this.selectedFile.name
			);
		}

		this.movimentacoesService
			.pagarDespesa(
				uploadData,
				this.movimentacaoEscolhida.id_despesa_item
			)
			.subscribe((data) => {
				this.closeModalPagamento.nativeElement.click();
				this.getMovimentacoes();
			});
	}

	onFileChanged(event) {
		const file: any = this.helper.onFileChanged(event);
		if (!file) {
			alert('Arquivo não permitido');
			return;
		}
		this.img = file.img;
		this.selectedFile = file.selectedFile;
	}
}
