
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

import { NotificationService } from '../../shared/messages/notification.service';
import { Amigos } from './../amigos.model'
import { AmigosService } from './../amigos.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class IncluirComponent implements OnInit {
  amigos: Amigos;
  loader: boolean = true;
  form: FormGroup;
  

  constructor(private amigosService: AmigosService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit() {
    this.initializeFormEmpty();
  }
  
  initializeFormEmpty() {
    this.form = this.formBuilder.group({
      id_usuario: this.formBuilder.control('', [Validators.required]),
      id_pessoa: this.formBuilder.control('', [Validators.required]),
      situacao: this.formBuilder.control('', [Validators.required])
    })
  }
  save(form) {
    this.amigosService.save(form)
  }
  
}

