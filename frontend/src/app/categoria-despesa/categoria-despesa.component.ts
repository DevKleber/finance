import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { NotificationService } from "../shared/messages/notification.service";
import { CategoriaDespesa } from "./categoria-despesa.model";
import { CategoriaDespesaService } from "./categoria-despesa.service";
import { Helper } from "../helper";
import { BreadcrumbService } from "../layout/breadcrumb/breadcrumb.service";

import { Observable } from "rxjs";

@Component({
	selector: "app-categoria-despesa",
	templateUrl: "./categoria-despesa.component.html",
	styleUrls: ["./categoria-despesa.component.css"],
})
export class CategoriaDespesaComponent implements OnInit {
	categoriaDespesas: CategoriaDespesa[];
	searchForm: FormGroup;
	searchControl: FormControl;
	loader: boolean = true;
	page: number = 1;
	itensPorPagina = 10;
	order: any = {};
	columns: any;

	constructor(
		private categoriaDespesaService: CategoriaDespesaService,
		private fb: FormBuilder,
		private notificationService: NotificationService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.getCategoriaDespesas();
		this.breadCrumb();
	}
	breadCrumb() {
		this.breadcrumbService.chosenPagina([
			{ no_rotina: "Categorias", ds_url: "categoria", active: "" },
			{ no_rotina: "Inserir", ds_url: "mudar-texto", active: "active" },
		]);
	}

	getCategoriaDespesas() {
		this.categoriaDespesaService
			.getCategoriaDespesas()
			.subscribe((CategoriaDespesa) => {
				this.categoriaDespesas = CategoriaDespesa;
				this.loader = false;
			});
	}

	inativar(categoriaDespesa) {
		if (
			confirm(
				"Você tem certeza que deseja remover o (a)  Categoria-despesaComponent "
			)
		) {
			this.loader = true;
			this.categoriaDespesaService
				.inativar(categoriaDespesa.id_categoria_despesa)
				.subscribe((data) => {
					if (data["response"]) {
						categoriaDespesa.bo_ativo = 0;
						// this.categoriaDespesas.splice(this.categoriaDespesas.indexOf(categoriaDespesa),1)
						this.notificationService.notifySweet(
							`categoriaDespesa inativado`
						);
					}
					this.loader = false;
				});
		}
	}

	update(form) {
		this.categoriaDespesaService.update(form, form.id);
	}
}
