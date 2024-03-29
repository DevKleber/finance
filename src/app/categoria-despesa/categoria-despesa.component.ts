import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	Validators,
	FormGroup,
} from '@angular/forms';
import { NotificationService } from '../shared/messages/notification.service';
import { CategoriaDespesa } from './categoria-despesa.model';
import { CategoriaDespesaService } from './categoria-despesa.service';
import { Helper } from '../helper';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';
import Swal from 'sweetalert2';
import * as hits from './../../assets/jsons/fontawesome.json';

import { Observable } from 'rxjs';

@Component({
	selector: 'app-categoria-despesa',
	templateUrl: './categoria-despesa.component.html',
	styleUrls: ['./categoria-despesa.component.css'],
})
export class CategoriaDespesaComponent implements OnInit {
	categoriaDespesas: CategoriaDespesa[];
	form: FormGroup;
	loader: boolean = true;
	categoriaSelecionada: any = {};

	fontawesome = hits;
	fontawesomeIconesPorMenu: any = [];
	iconeSelecionado: string = '';

	@ViewChild('closeModalIcon') closeModalIcon: ElementRef;

	constructor(
		private categoriaDespesaService: CategoriaDespesaService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.getCategoriaDespesas();
		this.breadCrumb();
		this.initializeFormEmpty();
	}
	breadCrumb() {
		this.breadcrumbService.chosenPagina([
			{
				no_rotina: 'Categorias despesas',
				ds_url: 'categoria',
				active: '',
			},
			{ no_rotina: 'Inserir', ds_url: 'mudar-texto', active: 'active' },
		]);
	}
	initializeFormEmpty() {
		this.form = this.formBuilder.group({
			id_categoria_despesa_pai: this.formBuilder.control(''),
			icon: this.formBuilder.control(''),
			no_categoria_despesa: this.formBuilder.control('', [
				Validators.required,
			]),
		});
	}
	novaFilha(pai) {
		this.categoriaSelecionada = pai;
		this.form.controls['id_categoria_despesa_pai'].setValue(
			pai.id_categoria_despesa
		);
		console.log(pai);
	}

	save(form) {
		this.categoriaDespesaService.save(form).subscribe((data) => {
			this.notificationService.notifySweet('Registro inserido!');
			this.getCategoriaDespesas();
			this.iconeSelecionado = '';
			this.form.controls['icon'].setValue('');
			this.form.controls['no_categoria_receita'].setValue('');
		});
	}
	savePai(form) {
		delete form.id_categoria_despesa_pai;
		// this.form.controls[""].setValue("");
		this.save(form);
	}
	removerCategoriaFilha(filha) {
		Swal.fire({
			title: `Remover ${filha.no_categoria_despesa}?`,
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: `Sim, remover!`,
		}).then((result) => {
			if (result.value) {
				this.categoriaDespesaService
					.inativar(filha.id_categoria_despesa)
					.subscribe((data) => {
						this.notificationService.notifySweet(`Excluido!`);
						this.getCategoriaDespesas();
					});
			}
		});
	}

	getCategoriaDespesas() {
		this.categoriaDespesaService
			.getCategoriaDespesas()
			.subscribe((CategoriaDespesa) => {
				this.categoriaDespesas = CategoriaDespesa;
				this.loader = false;
			});
	}

	update(form) {
		this.categoriaDespesaService.update(form, form.id);
	}

	menuIcon(menu) {
		this.fontawesomeIconesPorMenu = menu;
	}
	escolherOutroGrupoIcone() {
		this.fontawesomeIconesPorMenu = [];
	}
	selectIcon(icon) {
		this.form.controls['icon'].setValue('fa fa-' + icon);
		this.iconeSelecionado = 'fa fa-' + icon;
		this.closeModalIcon.nativeElement.click();
	}
}
