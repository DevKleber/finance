
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/messages/notification.service';
import { Amigos } from './../amigos.model'
import { AmigosService } from './../amigos.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css']
})
export class AlterarComponent implements OnInit {
  amigos: Amigos;
  loader: boolean = true;
  form: FormGroup;
  

  constructor(private amigosService: AmigosService, private formBuilder: FormBuilder, private notificationService: NotificationService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.initializeFormEmpty();
    this.getAmigos();
  }
  getAmigos() {
    this.amigosService.getamigosById(this.router.snapshot.params['id']).subscribe(amigos => {
      this.amigos = amigos
      
      this.initializeForm(this.amigos)
      this.loader = false
    });
  }
  initializeForm(amigos) {
    this.form = this.formBuilder.group({
      id_usuario: this.formBuilder.control(amigos.id_usuario, [Validators.required]),
      id_pessoa: this.formBuilder.control(amigos.id_pessoa, [Validators.required]),
      situacao: this.formBuilder.control(amigos.situacao, [Validators.required])
    })
  }
  initializeFormEmpty() {
    this.form = this.formBuilder.group({
      id_usuario: this.formBuilder.control('', [Validators.required]),
      id_pessoa: this.formBuilder.control('', [Validators.required]),
      situacao: this.formBuilder.control('', [Validators.required])
    })
  }
  save(form) {
    this.amigosService.update(form,this.amigos.id_amigos)
  }
  
}

