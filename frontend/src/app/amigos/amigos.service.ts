import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { Amigos } from "./amigos.model";

import { NotificationService } from "../shared/messages/notification.service";
import { API } from "../app.api";

@Injectable({
	providedIn: "root",
})
export class AmigosService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getAmigos(search?: string): Observable<Amigos[]> {
		return this.http.get<Amigos[]>(`${API}/amigo`);
	}
	getSolicitacoesAmizade(search?: string): Observable<Amigos[]> {
		return this.http.get<Amigos[]>(`${API}/solicitacao-amizade`);
	}
	solicitarAmizade(id_pessoa): Observable<Amigos[]> {
		return this.http.post<Amigos[]>(`${API}/amigo/`, {
			id_pessoa: id_pessoa,
		});
	}

	aceitarOuRecusar(id, situacao) {
		return this.http.put(
			`${API}/aceitar-solicitacao/${id}/${situacao}`,
			null
		);
	}

	procurarPessoa(nome: string): Observable<any[]> {
		return this.http.get<any[]>(`${API}/pessoa/${nome}`);
	}
	getamigosById(id: string): Observable<Amigos> {
		return this.http.get<Amigos>(`${API}/amigo/${id}`);
	}

	save(form) {
		return this.http.post<any>(`${API}/amigo`, form).subscribe(
			(data) => {
				if (data["dados"]) {
					this.notifySweet("Registro Inserido Com Sucesso!");
					this.router.navigate(["/amigo"]);
				}
			},
			(error) => {
				this.notifySweet(`Error: ${error}`);
			}
		);
	}

	update(form, id) {
		return this.http.put(`${API}/amigo/${id}`, form).subscribe(
			(data) => {
				if (data["response"]) {
					this.notifySweet("Registro Alterado Com Sucesso!");
					this.router.navigate(["/amigo"]);
				}
				console.log(data);
			},
			(error) => {
				this.notifySweet(`Error: ${error}`);
			}
		);
	}
	inativar(id: string) {
		return this.http.delete(`${API}/amigo/${id}`);
	}

	notifySweet(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = "depoimento") {
		this.router.navigate([`/${path}`]);
	}
}
