import { Component, OnInit } from "@angular/core";
import { MovimentacoesService } from "./movimentacoes.service";
import { Helper } from "../helper";
import { APIDominio } from "../app.api";
@Component({
	selector: "app-movimentacoes",
	templateUrl: "./movimentacoes.component.html",
	styleUrls: ["./movimentacoes.component.css"],
})
export class MovimentacoesComponent implements OnInit {
	movimentacoes: any[] = [];
	resumo: any = {};
	amigosPagar: any = {};
	movimentacaoEscolhida: any = {};
	dataFiltro: any = {};
	dateObj = new Date();
	img: any = "assets/img/system/recibo3.png";
	imgApi: string = APIDominio;
	comprovante: any;
	selectedFile: File;
	imagem: any;

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
		private movimentacoesService: MovimentacoesService,
		private helper: Helper
	) {}

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
	movimentacaoSelecionada(mov) {
		this.movimentacaoEscolhida = mov;
	}
	pagarDespesa() {
		if (!this.movimentacaoEscolhida.id_despesa_item) {
			alert("Escolha uma despesa");
			return;
		}

		const uploadData = new FormData();
		if (this.selectedFile) {
			uploadData.append(
				"recibo",
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
				this.getMovimentacoes();
			});
	}

	onFileChanged(event) {
		const file: any = this.helper.onFileChanged(event);
		if (!file) {
			alert("Arquivo não permitido");
			return;
		}
		this.img = file.img;
		this.selectedFile = file.selectedFile;
	}
}
