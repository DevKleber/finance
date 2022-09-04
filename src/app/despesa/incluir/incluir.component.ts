
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

import { NotificationService } from '../../shared/messages/notification.service';
import { Despesa } from './../despesa.model'
import { DespesaService } from './../despesa.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class IncluirComponent implements OnInit {
  despesas: Despesa;
  loader: boolean = true;
  form: FormGroup;
  

  constructor(private despesaService: DespesaService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit() {
    this.initializeFormEmpty();
  }
  
  initializeFormEmpty() {
    this.form = this.formBuilder.group({
      vl_despesac: this.formBuilder.control('', [Validators.required]),
      dt_despesa: this.formBuilder.control('', [Validators.required]),
      ds_despesa: this.formBuilder.control('', [Validators.required]),
      bo_dividir_amigos: this.formBuilder.control('', [Validators.required]),
      id_tipo_despesa: this.formBuilder.control('', [Validators.required]),
      id_categoria_despesa: this.formBuilder.control('', [Validators.required]),
      id_usuario: this.formBuilder.control('', [Validators.required])
    })
  }
  save(form) {
    this.despesaService.save(form)
  }
  
}

