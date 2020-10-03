
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

import { NotificationService } from '../../shared/messages/notification.service';
import { CategoriaDespesa } from './../categoria-despesa.model'
import { CategoriaDespesaService } from './../categoria-despesa.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class IncluirComponent implements OnInit {
  categoriaDespesas: CategoriaDespesa;
  loader: boolean = true;
  form: FormGroup;
  

  constructor(private categoriaDespesaService: CategoriaDespesaService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit() {
    this.initializeFormEmpty();
  }
  
  initializeFormEmpty() {
    this.form = this.formBuilder.group({
      id_categoria_despesa_pai: this.formBuilder.control('', [Validators.required]),
      no_categoria_despesa: this.formBuilder.control('', [Validators.required]),
      id_usuario: this.formBuilder.control('', [Validators.required]),
      bo_ativo: this.formBuilder.control('', [Validators.required])
    })
  }
  save(form) {
    this.categoriaDespesaService.save(form)
  }
  
}

