import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { CategoriaReceita } from "./categoria-receita.model";

import { NotificationService } from "../shared/messages/notification.service";
import { API } from "../app.api";

@Injectable({
	providedIn: "root",
})
export class CategoriaReceitaService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getCategoriaReceitas(search?: string): Observable<CategoriaReceita[]> {
		return this.http.get<CategoriaReceita[]>(`${API}/categoria-receita`);
	}

	getcategoriaReceitaById(id: string): Observable<CategoriaReceita> {
		return this.http.get<CategoriaReceita>(
			`${API}/categoria-receita/${id}`
		);
	}

	save(form) {
		return this.http.post<any>(`${API}/categoria-receita`, form);
	}

	update(form, id) {
		return this.http.put(`${API}/categoria-receita/${id}`, form);
	}
	inativar(id: string) {
		return this.http.delete(`${API}/categoria-receita/${id}`);
	}

	notify(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = "depoimento") {
		this.router.navigate([`/${path}`]);
	}
}
