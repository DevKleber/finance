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
	urlImgBin: string = "/assets/img/card/bin";
	bandeira: string = "";

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
			bandeira: this.formBuilder.control(""),
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
		this.bandeira = this.helper.detectCard(number);
		this.form.controls["bandeira"].setValue(this.bandeira);
		this.imgBin = `${this.urlImgBin}/${this.bandeira}.png`;
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

	inativar(cartaoCredito) {
		Swal.fire({
			title: `Remover ${cartaoCredito.no_cartao_credito}?`,
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `Sim, remover!`,
		}).then((result) => {
			if (result.value) {
				this.cartaoCreditoService
					.inativar(cartaoCredito.id_cartao_credito)
					.subscribe((data) => {
						if (data["response"]) {
							cartaoCredito.bo_ativo = 0;
							this.cartoes.splice(
								this.cartoes.indexOf(cartaoCredito),
								1
							);
							this.notificationService.notifySweet(`Excluido!`);
						}
					});
			}
		});
	}
}
