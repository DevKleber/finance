import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { CartaoCredito } from "./cartao-credito.model";

import { NotificationService } from "../shared/messages/notification.service";
import { API } from "../app.api";

@Injectable({
	providedIn: "root",
})
export class CartaoCreditoService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getFatura(id): Observable<any[]> {
		return this.http.get<any[]>(`${API}/cartao-credito/fatura/${id}`);
	}
	getCartoes(search?: string): Observable<CartaoCredito[]> {
		return this.http.get<CartaoCredito[]>(`${API}/cartao-credito`);
	}

	getmudarTextoById(id: string): Observable<CartaoCredito> {
		return this.http.get<CartaoCredito>(`${API}/cartao-credito/${id}`);
	}

	save(form) {
		return this.http.post<any>(`${API}/cartao-credito`, form);
	}

	update(form, id) {
		return this.http.put(`${API}/cartao-credito/${id}`, form).subscribe(
			(data) => {
				if (data["response"]) {
					this.notify("Registro Alterado Com Sucesso!");
					this.router.navigate(["/cartao-credito"]);
				}
				console.log(data);
			},
			(error) => {
				this.notify(`Error: ${error}`);
			}
		);
	}
	inativar(id: string) {
		return this.http.delete(`${API}/cartao-credito/${id}`);
	}

	notify(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = "depoimento") {
		this.router.navigate([`/${path}`]);
	}
}
