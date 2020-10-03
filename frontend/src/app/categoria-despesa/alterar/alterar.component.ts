
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/messages/notification.service';
import { CategoriaDespesa } from './../categoria-despesa.model'
import { CategoriaDespesaService } from './../categoria-despesa.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css']
})
export class AlterarComponent implements OnInit {
  categoriaDespesa: CategoriaDespesa;
  loader: boolean = true;
  form: FormGroup;
  

  constructor(private categoriaDespesaService: CategoriaDespesaService, private formBuilder: FormBuilder, private notificationService: NotificationService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.initializeFormEmpty();
    this.getCategoriaDespesa();
  }
  getCategoriaDespesa() {
    this.categoriaDespesaService.getcategoriaDespesaById(this.router.snapshot.params['id']).subscribe(categoriaDespesa => {
      this.categoriaDespesa = categoriaDespesa
      
      this.initializeForm(this.categoriaDespesa)
      this.loader = false
    });
  }
  initializeForm(categoriaDespesa) {
    this.form = this.formBuilder.group({
      id_categoria_despesa_pai: this.formBuilder.control(categoriaDespesa.id_categoria_despesa_pai, [Validators.required]),
      no_categoria_despesa: this.formBuilder.control(categoriaDespesa.no_categoria_despesa, [Validators.required]),
      id_usuario: this.formBuilder.control(categoriaDespesa.id_usuario, [Validators.required]),
      bo_ativo: this.formBuilder.control(categoriaDespesa.bo_ativo, [Validators.required])
    })
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
    this.categoriaDespesaService.update(form,this.categoriaDespesa.id_categoria_despesa)
  }
  
}

