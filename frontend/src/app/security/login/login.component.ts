import { Component, OnInit, AfterContentInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "./login.service";
import { User } from "./user.model";
import { NotificationService } from "../../shared/messages/notification.service";
import { Helper } from "./../../helper";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, AfterContentInit {
	loginForm: FormGroup;
	navigateTo: string;

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
			login: this.fb.control("start107", [Validators.required]),
			password: this.fb.control("3ptp3tc", [Validators.required]),
		});
		//btoa é para criptografar com javascript puro
		this.navigateTo =
			this.activatedRoute.snapshot.params["to"] || btoa("/");
		// console.log(atob(this.navigateTo));
	}
	ngAfterContentInit(): void {
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
			"bglogin"
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

	login() {
		this.loginService
			.login(this.loginForm.value.login, this.loginForm.value.password)
			.subscribe(
				(user) => {
					//enviando para ultima rota.
					// location.replace("/#" + atob(this.navigateTo))
					location.replace("#/dashboard");

					// this.notificationService.notifySweet(`Bem vindo, ${user.user["no_funcionario"]}`),

					//atob é para decodificar
					// this.router.navigate(['/']);
					// location.reload();
					// console.log("/#"+atob(this.navigateTo))
					// this.router.navigate([atob(this.navigateTo)])
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
