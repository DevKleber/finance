
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../shared/messages/notification.service';
import { TipoDespesa } from './tipo-despesa.model'
import { TipoDespesaService } from './tipo-despesa.service';
import { Helper } from '../helper';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-tipo-despesa',
  templateUrl: './tipo-despesa.component.html',
  styleUrls: ['./tipo-despesa.component.css']
})
export class TipoDespesaComponent implements OnInit {
  tipoDespesas: TipoDespesa[];
  searchForm: FormGroup
  searchControl: FormControl
  loader: boolean = true;
  page: number = 1;
  itensPorPagina = 10;
  order: any = {}
  columns: any

  constructor(private tipoDespesaService: TipoDespesaService, private fb: FormBuilder, private notificationService: NotificationService, private helper: Helper, private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
    this.breadcrumbService.chosenPagina("TipoDespesa")
    this.getTipoDespesas();
    this.order = this.helper.getColumnsByArray(clienteFornecedor['dados'][0])
		this.getColumnsShow(clienteFornecedor['dados'][0]);

  }
  getColumnsShow(ar) {

		let columns = {}
		columns['id_tipo_despesa'] = { name: 'id_tipo_despesa', show: true }
  columns['no_tipo_despesa'] = { name: 'no_tipo_despesa', show: true }
  columns['created_at'] = { name: 'created_at', show: true }
  columns['updated_at'] = { name: 'updated_at', show: true }
  
		
		this.columns = columns;
	}

  getTipoDespesas() {
    this.tipoDespesaService.getTipoDespesas().subscribe(TipoDespesa => {
      this.tipoDespesas = TipoDespesa['dados']
      this.loader = false
    });
  }

  inativar(tipoDespesa) {

    if (confirm('Você tem certeza que deseja remover o (a)  Tipo-despesaComponent ')) {
      this.loader = true
      this.tipoDespesaService.inativar(tipoDespesa.id_tipo_despesa).subscribe((data) => {
        if (data['response']) {
          tipoDespesa.bo_ativo = 0;
          // this.tipoDespesas.splice(this.tipoDespesas.indexOf(tipoDespesa),1)
          this.notificationService.notify(`tipoDespesa inativado`)
        }
        this.loader = false
      });
    }

  }

  
  update(form) {
    this.tipoDespesaService.update(form, form.id)
  }
  orderby(column) {
    this.tipoDespesas = this.helper.orderby(column, this.tipoDespesas, this.order);
	}
	hideshowColumns(column) {
		this.columns[column].show = this.columns[column].show ? false : true
	}
}

