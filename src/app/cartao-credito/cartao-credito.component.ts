import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { NotificationService } from "../shared/messages/notification.service";
import { CartaoCredito } from "./cartao-credito.model";
import { CartaoCreditoService } from "./cartao-credito.service";
import { Helper } from "../helper";
import { BreadcrumbService } from "../layout/breadcrumb/breadcrumb.service";

import { Observable } from "rxjs";

@Component({
	selector: "app-cartao-credito",
	templateUrl: "./cartao-credito.component.html",
	styleUrls: ["./cartao-credito.component.css"],
})
export class CartaoCreditoComponent implements OnInit {
	cartoes: CartaoCredito[];
	form: FormGroup;
	loader: boolean = true;
	imgBin: string = "";

	order: any = {};
	columns: any;

	constructor(
		private cartaoCreditoService: CartaoCreditoService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.breadCrumb();
		this.initializeFormEmpty();
		this.getCartoes();
	}

	breadCrumb() {
		this.breadcrumbService.chosenPagina([
			{
				no_rotina: "Cartão de Crédito",
				ds_url: "cartao-credito",
				active: "",
			},
			{ no_rotina: "Inserir", ds_url: "mudar-texto", active: "active" },
		]);
	}

	initializeFormEmpty() {
		this.form = this.formBuilder.group({
			no_cartao_credito: this.formBuilder.control("", [
				Validators.required,
			]),
			numero: this.formBuilder.control("", [Validators.required]),
			vl_limite: this.formBuilder.control("", [Validators.required]),
			dia_vencimento: this.formBuilder.control("", [Validators.required]),
			dt_primeira_fatura: this.formBuilder.control(""),
			dia_fechamento_fatura: this.formBuilder.control("", [
				Validators.required,
			]),
			no_titular: this.formBuilder.control("", [Validators.required]),
		});
	}
	getBinCard() {
		const number = this.form.get("numero").value;
		this.imgBin = `/assets/img/card/bin/${this.helper.detectCard(
			number
		)}.png`;
	}

	save(form) {
		this.cartaoCreditoService.save(form).subscribe((data) => {
			this.notificationService.notifySweet(
				"Registro inserido com sucesso!"
			);
			this.cartoes.push(data);
		});
	}

	getCartoes() {
		this.cartaoCreditoService.getCartoes().subscribe((res) => {
			this.cartoes = res;
			this.loader = false;
		});
	}

	inativar(mudarTexto) {
		Swal.fire({
			title: `Remover ${mudarTexto.frase}?`,
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `Sim, remover!`,
		}).then((result) => {
			if (result.value) {
				this.cartaoCreditoService
					.inativar(mudarTexto.id_mudartexto)
					.subscribe((data) => {
						if (data["response"]) {
							mudarTexto.bo_ativo = 0;
							this.cartoes.splice(
								this.cartoes.indexOf(mudarTexto),
								1
							);
							this.notificationService.notifySweet(`Excluido!`);
						}
					});
			}
		});
	}
}
