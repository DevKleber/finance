import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../shared/messages/notification.service";
import { Amigos } from "./../amigos.model";
import { AmigosService } from "./../amigos.service";

@Component({
	selector: "app-detalhar",
	templateUrl: "./detalhar.component.html",
	styleUrls: ["./detalhar.component.css"],
})
export class DetalharComponent implements OnInit {
	amigos: Amigos;
	loader: boolean = true;

	constructor(
		private amigosService: AmigosService,
		private router: ActivatedRoute
	) {}

	ngOnInit() {
		this.getAmigos();
	}
	getAmigos() {
		this.amigosService
			.getamigosById(this.router.snapshot.params["id"])
			.subscribe((amigos) => {
				this.amigos = amigos;

				this.loader = false;
			});
	}
}
