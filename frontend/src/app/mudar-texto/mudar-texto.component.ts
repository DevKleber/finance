import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { NotificationService } from '../shared/messages/notification.service';
import { MudarTexto } from './mudar-texto.model';
import { MudarTextoService } from './mudar-texto.service';
import { Helper } from '../helper';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';

import { Observable } from 'rxjs';

@Component({
	selector: 'app-mudar-texto',
	templateUrl: './mudar-texto.component.html',
	styleUrls: ['./mudar-texto.component.css'],
})
export class MudarTextoComponent implements OnInit {
	mudarTextos: MudarTexto[];
	form: FormGroup;
	loader: boolean = true;

	order: any = {};
	columns: any;

	constructor(
		private mudarTextoService: MudarTextoService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.breadCrumb();
		this.initializeFormEmpty();
		this.getMudarTextos();
	}

	breadCrumb() {
		this.breadcrumbService.chosenPagina([
			{ no_rotina: 'Frases', ds_url: 'mudar-texto', active: '' },
			{ no_rotina: 'Inserir', ds_url: 'mudar-texto', active: 'active' },
		]);
	}

	initializeFormEmpty() {
		this.form = this.formBuilder.group({
			frase: this.formBuilder.control('', [Validators.required]),
			apelido: this.formBuilder.control('', [Validators.required]),
		});
	}
	save(form) {
		this.mudarTextoService.save(form).subscribe((data) => {
			this.notificationService.notifySweet(
				'Registro inserido com sucesso!'
			);
			this.mudarTextos.push(data);
		});
	}

	getMudarTextos() {
		this.mudarTextoService.getMudarTextos().subscribe((res) => {
			this.mudarTextos = res;
			this.loader = false;
		});
	}

	inativar(mudarTexto) {
		swal.fire({
			icon: 'error',
			title: `Remover ${mudarTexto.frase}?`,
		}).then((result) => {
			if (result.value) {
				this.mudarTextoService
					.inativar(mudarTexto.id_mudartexto)
					.subscribe((data) => {
						if (data['response']) {
							mudarTexto.bo_ativo = 0;
							this.mudarTextos.splice(
								this.mudarTextos.indexOf(mudarTexto),
								1
							);
							this.notificationService.notifySweet(`Excluido!`);
						}
					});
			}
		});
	}
}
