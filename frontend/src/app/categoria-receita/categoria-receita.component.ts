import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	Validators,
	FormGroup,
} from "@angular/forms";
import { NotificationService } from "../shared/messages/notification.service";
import { CategoriaReceita } from "./categoria-receita.model";
import { CategoriaReceitaService } from "./categoria-receita.service";
import { Helper } from "../helper";
import { BreadcrumbService } from "../layout/breadcrumb/breadcrumb.service";
import Swal from "sweetalert2";
import { hits } from "./../../assets/jsons/fontawesome.json";

import { Observable } from "rxjs";

@Component({
	selector: "app-categoria-receita",
	templateUrl: "./categoria-receita.component.html",
	styleUrls: ["./categoria-receita.component.css"],
})
export class CategoriaReceitaComponent implements OnInit {
	categoriaReceitas: CategoriaReceita[];
	form: FormGroup;
	loader: boolean = true;
	categoriaSelecionada: any = {};

	fontawesome = hits;
	fontawesomeIconesPorMenu: any = [];
	iconeSelecionado: string = "";

	@ViewChild("closeModalIcon") closeModalIcon: ElementRef;

	constructor(
		private categoriaReceitaService: CategoriaReceitaService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.getCategoriaReceitas();
		this.breadCrumb();
		this.initializeFormEmpty();
	}
	breadCrumb() {
		this.breadcrumbService.chosenPagina([
			{
				no_rotina: "Categorias receitas",
				ds_url: "categoria",
				active: "",
			},
			{ no_rotina: "Inserir", ds_url: "mudar-texto", active: "active" },
		]);
	}
	initializeFormEmpty() {
		this.form = this.formBuilder.group({
			id_categoria_receita_pai: this.formBuilder.control(""),
			icon: this.formBuilder.control(""),
			no_categoria_receita: this.formBuilder.control("", [
				Validators.required,
			]),
		});
	}
	novaFilha(pai) {
		this.categoriaSelecionada = pai;
		this.form.controls["id_categoria_receita_pai"].setValue(
			pai.id_categoria_receita
		);
		console.log(pai);
	}

	save(form) {
		this.categoriaReceitaService.save(form).subscribe((data) => {
			this.notificationService.notifySweet("Registro inserido!");
			this.getCategoriaReceitas();
			this.iconeSelecionado = "";
			this.form.controls["icon"].setValue("");
			this.form.controls["no_categoria_receita"].setValue("");
		});
	}
	savePai(form) {
		delete form.id_categoria_receita_pai;
		// this.form.controls[""].setValue("");
		this.save(form);
	}
	removerCategoriaFilha(filha) {
		Swal.fire({
			title: `Remover ${filha.no_categoria_receita}?`,
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `Sim, remover!`,
		}).then((result) => {
			if (result.value) {
				this.categoriaReceitaService
					.inativar(filha.id_categoria_receita)
					.subscribe((data) => {
						this.notificationService.notifySweet(`Excluido!`);
						this.getCategoriaReceitas();
					});
			}
		});
	}

	getCategoriaReceitas() {
		this.categoriaReceitaService
			.getCategoriaReceitas()
			.subscribe((CategoriaReceita) => {
				this.categoriaReceitas = CategoriaReceita;
				this.loader = false;
			});
	}

	update(form) {
		this.categoriaReceitaService.update(form, form.id);
	}

	menuIcon(menu) {
		this.fontawesomeIconesPorMenu = menu;
	}
	escolherOutroGrupoIcone() {
		this.fontawesomeIconesPorMenu = [];
	}
	selectIcon(icon) {
		this.form.controls["icon"].setValue("fa fa-" + icon);
		this.iconeSelecionado = "fa fa-" + icon;
		this.closeModalIcon.nativeElement.click();
	}
}
