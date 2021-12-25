import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { NotificationService } from "../shared/messages/notification.service";
import { Amigos } from "./amigos.model";
import { AmigosService } from "./amigos.service";
import { Helper } from "../helper";
import { BreadcrumbService } from "../layout/breadcrumb/breadcrumb.service";
import { APIDominio } from "../app.api";

import { Observable } from "rxjs";

@Component({
	selector: "app-amigos",
	templateUrl: "./amigos.component.html",
	styleUrls: ["./amigos.component.css"],
})
export class AmigosComponent implements OnInit {
	amigos: Amigos[];
	solicitacoesAmizade: Amigos[] = [];
	searchForm: FormGroup;
	searchControl: FormControl;
	loader: boolean = true;
	page: number = 1;
	itensPorPagina = 10;
	order: any = {};
	columns: any;
	PATHAPI = APIDominio;

	// loaders
	fimCarregamentoProcurarPessoa: string = null;

	nomePessoaModel: string = "";
	pessoas: any[] = [];

	constructor(
		private amigosService: AmigosService,
		private fb: FormBuilder,
		private notificationService: NotificationService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.breadCrumb();
		this.getAmigos();
	}
	breadCrumb() {
		this.breadcrumbService.chosenPagina([
			{ no_rotina: "Amigos", ds_url: "amigos", active: "" },
			{ no_rotina: "Inserir", ds_url: "mudar-texto", active: "active" },
		]);
	}
	procurarPessoa() {
		if (!this.nomePessoaModel.length) return false;
		this.amigosService
			.procurarPessoa(this.nomePessoaModel)
			.subscribe((res) => {
				this.fimCarregamentoProcurarPessoa = !res.length
					? "Nenhuma registro encontrado"
					: null;
				this.pessoas = res;
			});
	}
	getAmigos() {
		this.amigosService.getAmigos().subscribe((res) => {
			this.amigos = res["tudo"];
			this.loader = false;
		});
	}

	getSolicitacoesAmizade() {
		this.amigosService.getSolicitacoesAmizade().subscribe((res) => {
			this.solicitacoesAmizade = res;
			this.loader = false;
		});
	}
	solicitarAmizade(pessoa) {
		this.amigosService
			.solicitarAmizade(pessoa.id_pessoa)
			.subscribe((res) => {
				this.amigos.push(res["dados"]);
				this.notificationService.notifySweet(
					"Solicitação de amizade enviada"
				);
				this.loader = false;
			});
	}
	aceitarOuRecusar(solicitacao, situacao) {
		this.amigosService
			.aceitarOuRecusar(solicitacao.id_amigos, situacao)
			.subscribe((res) => {
				let msg = "Amizade feita!";
				if (situacao == "r") {
					msg = "recusado!";
				}
				this.notificationService.notifySweet(msg);
				this.solicitacoesAmizade.splice(
					this.solicitacoesAmizade.indexOf(solicitacao),
					1
				);
			});
	}

	inativar(amigo) {
		if (
			confirm(
				"Você tem certeza que deseja remover o (a)  AmigosComponent "
			)
		) {
			this.loader = true;
			this.amigosService.inativar(amigo.id_amigos).subscribe((data) => {
				if (data["response"]) {
					amigo.bo_ativo = 0;
					// this.amigos.splice(this.amigos.indexOf(amigo),1)
					this.notificationService.notifySweet(`amigo inativado`);
				}
				this.loader = false;
			});
		}
	}

	update(form) {
		this.amigosService.update(form, form.id);
	}
}
