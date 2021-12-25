import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';

import { NotificationService } from '../../shared/messages/notification.service';
import { Despesa } from './../despesa.model';
import { DespesaService } from './../despesa.service';
import { APIDominio } from './../../app.api';
import { BreadcrumbService } from '../../layout/breadcrumb/breadcrumb.service';

import { Observable } from 'rxjs';

@Component({
	selector: 'app-aprovar',
	templateUrl: './aprovar.component.html',
	styleUrls: ['./aprovar.component.css'],
})
export class AprovarComponent implements OnInit {
	despesas: any[] = [];
	loader: boolean = true;
	form: FormGroup;
	PATHAPI = APIDominio;

	constructor(
		private despesaService: DespesaService,
		private notificationService: NotificationService,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.getDespesasAguardandoAprovacao();
		this.breadCrumb();
	}
	breadCrumb(nome = 'Aprovar despesa') {
		this.breadcrumbService.chosenPagina([
			{ no_rotina: nome, ds_url: 'movimentacoes', active: '' },
			{ no_rotina: 'Inserir', ds_url: 'movimentacoes', active: 'active' },
		]);
	}
	getDespesasAguardandoAprovacao() {
		this.despesaService
			.getDespesasAguardandoAprovacao()
			.subscribe((res) => {
				this.despesas = res;
			});
	}
	aprovarOuRecusar(situacao, id_conta_compartilhada) {
		Swal.fire({
			title: `${situacao == 1 ? 'Aprovar' : 'Recusar'} despesa?`,
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: `Sim, ${situacao == 1 ? 'aprovar' : 'recusar'}!`,
		}).then((result) => {
			if (result.value) {
				this.despesaService
					.despesasAguardandoAprovacao({
						bo_aprovado: situacao,
						id_conta_compartilhada: id_conta_compartilhada,
					})
					.subscribe((res) => {
						this.getDespesasAguardandoAprovacao();
						this.notificationService.notifySweet(
							`${
								situacao == 1 ? 'Aprovado' : 'Recusado'
							} com sucesso!`
						);
					});
			}
		});
	}
}
