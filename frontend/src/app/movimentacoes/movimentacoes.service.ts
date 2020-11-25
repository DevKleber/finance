import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { NotificationService } from "../shared/messages/notification.service";
import { API } from "../app.api";

@Injectable({
	providedIn: "root",
})
export class MovimentacoesService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getMovimentacoes(form): Observable<any[]> {
		return this.http.post<any[]>(`${API}/movimentacoes`, form);
	}
	getMovimentacoesOr(search?: string): Observable<any[]> {
		return this.http.get<any[]>(`${API}/movimentacoes`);
	}

	notify(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = "depoimento") {
		this.router.navigate([`/${path}`]);
	}
	pagarDespesa(form, id) {
		return this.http.post<any>(`${API}/pagarDespesa/${id}`, form);
	}
}
