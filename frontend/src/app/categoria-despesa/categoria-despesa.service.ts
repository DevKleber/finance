import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap, filter } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Router, NavigationEnd } from '@angular/router'

import { CategoriaDespesa } from './categoria-despesa.model'


import { NotificationService } from '../shared/messages/notification.service';
import { API } from '../app.api'

@Injectable({
  providedIn: 'root'
})

export class CategoriaDespesaService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  getCategoriaDespesas(search?: string): Observable<CategoriaDespesa[]> {

    return this.http.get<CategoriaDespesa[]>(`${API}/categoria-despesa`)
  }


  getcategoriaDespesaById(id: string): Observable<CategoriaDespesa> {
    return this.http.get<CategoriaDespesa>(`${API}/categoria-despesa/${id}`)

  }

  save(form) {
    return this.http.post<any>(`${API}/categoria-despesa`, form)
    .subscribe((data) => {
        if (data['dados']) {
          this.notify('Registro Inserido Com Sucesso!');
          this.router.navigate(['/categoria-despesa'])
        }
        console.log(data);
      }, (error) => {
        this.notify(`Error: ${error}`);
      });
    }

  update(form,id) {
    return this.http.put(`${API}/categoria-despesa/${id}`, form)
    .subscribe((data) => {
      if (data['response']) {
        this.notify('Registro Alterado Com Sucesso!');
        this.router.navigate(['/categoria-despesa'])
      }
      console.log(data);
    }, (error) => {
      this.notify(`Error: ${error}`);
    });
  }
  inativar(id: string) {
    return this.http.delete(`${API}/categoria-despesa/${id}`)

  }

  notify(msg) {
    this.notificationService.notify(msg);
  }
  goTo(path: string = 'depoimento') {
    this.router.navigate([`/${path}`])
  }
}
