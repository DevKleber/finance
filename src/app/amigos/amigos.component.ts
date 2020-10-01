import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { NotificationService } from "../shared/messages/notification.service";
import { Amigos } from "./amigos.model";
import { AmigosService } from "./amigos.service";
import { Helper } from "../helper";
import { BreadcrumbService } from "../layout/breadcrumb/breadcrumb.service";

import { Observable } from "rxjs";

@Component({
	selector: "app-amigos",
	templateUrl: "./amigos.component.html",
	styleUrls: ["./amigos.component.css"],
})
export class AmigosComponent implements OnInit {
	amigos: Amigos[];
	searchForm: FormGroup;
	searchControl: FormControl;
	loader: boolean = true;
	page: number = 1;
	itensPorPagina = 10;
	order: any = {};
	columns: any;

	constructor(
		private amigosService: AmigosService,
		private fb: FormBuilder,
		private notificationService: NotificationService,
		private helper: Helper,
		private breadcrumbService: BreadcrumbService
	) {}

	ngOnInit() {
		this.searchControl = this.fb.control("");
		this.searchForm = this.fb.group({
			searchControl: this.searchControl,
		});
		this.breadcrumbService.chosenPagina([]);
		this.getAmigos();
	}

	getAmigos() {
		this.amigosService.getAmigos().subscribe((Amigo) => {
			this.amigos = Amigo["dados"];
			this.loader = false;
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
