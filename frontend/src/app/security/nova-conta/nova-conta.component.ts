import { Component, OnInit, AfterContentInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "./../login/login.service";
import { User } from "./user.model";
import { NotificationService } from "../../shared/messages/notification.service";
import { Helper } from "./../../helper";

@Component({
	selector: "app-nova-conta",
	templateUrl: "./nova-conta.component.html",
	styleUrls: ["./nova-conta.component.css"],
})
export class NovaContaComponent implements OnInit, AfterContentInit {
	loginForm: FormGroup;
	novaContaForm: FormGroup;
	navigateTo: string;
	sexo: any[] = [
		{ id: "m", nome: "Masculino" },
		{ id: "f", nome: "Feminino" },
	];

	constructor(
		private fb: FormBuilder,
		private loginService: LoginService,
		private notificationService: NotificationService,
		private activatedRoute: ActivatedRoute,
		private helper: Helper,
		private router: Router
	) {}

	ngOnInit() {
		this.loginForm = this.fb.group({
			login: this.fb.control("", [Validators.required]),
			password: this.fb.control("", [Validators.required]),
		});

		this.novaContaForm = this.fb.group({
			no_pessoa: this.fb.control("", [Validators.required]),
			sexo: this.fb.control([Validators.required]),
			dt_nascimento: this.fb.control(""),
			no_email: this.fb.control("", [Validators.required]),
			nu_cpfcnpj: this.fb.control(""),
			login: this.fb.control(""),
			password: this.fb.control("", [Validators.required]),
		});
		this.personalizarLogin();
	}
	ngAfterContentInit(): void {
		this.personalizarLogin();
	}
	personalizarLogin() {
		this.imgProfileLogin();
		this.backgroundLogin();
		this.cssPersonalizadoLogin();
	}

	imgProfileLogin() {
		const totalImg = 19;
		const valueMin = 1;
		const img = Math.floor(
			Math.random() * (totalImg - valueMin + 1) + valueMin
		);
		document.getElementById(
			"bgNovaConta"
		).style.backgroundImage = `url('/assets/img/bg-img/profileLogin/${img}.jpg')`;
	}
	backgroundLogin() {
		document.body.style.backgroundImage =
			"url('assets/img/bg-img/snowy-peak-flat-mountains-minimal.jpg')";
		document.body.style.backgroundRepeat = "no-repeat ";
		document.body.style.backgroundSize = "cover ";
		document.body.style.backgroundPosition = "center ";
	}
	cssPersonalizadoLogin() {
		document.getElementById("content-wrapper").style.backgroundColor =
			"transparent";
		this.helper.findAndRemoveClassByName("shadow");
		this.helper.findAndRemoveClassByName("card");
		this.helper.findAndRemoveClassByName("bg-white");
	}

	criarConta() {
		this.loginService
			.criarConta(this.novaContaForm.value)
			.subscribe((user) => {
				this.loginForm.controls["login"].setValue(user.login);
				this.loginForm.controls["password"].setValue(
					this.novaContaForm.value.password
				);
				this.notificationService.notifyAlert("login criado");
				this.login();
			});
	}

	login() {
		this.loginService
			.login(this.loginForm.value.login, this.loginForm.value.password)
			.subscribe(
				(user) => {
					location.replace("/#/dashboard");
				},

				(response) => {
					if (response.status === 401) {
						this.notificationService.notifyAlert(
							"Usuário ou senha inválida"
						);
					}
					if (response.status === 0) {
						this.notificationService.notifyError(
							"SERVIDOR OFFILINE"
						);
					}
				} //httpErrorResponse
				// () => {}
			);
	}
}
