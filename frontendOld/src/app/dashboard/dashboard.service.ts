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
export class DashboardService {
	constructor(private http: HttpClient) {}

	getDashboard(form): Observable<any[]> {
		return this.http.post<any[]>(`${API}/dashboard`, form);
	}
}
