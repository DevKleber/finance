import { Component, OnInit } from "@angular/core";
import { MovimentacoesService } from "./movimentacoes.service";
@Component({
	selector: "app-movimentacoes",
	templateUrl: "./movimentacoes.component.html",
	styleUrls: ["./movimentacoes.component.css"],
})
export class MovimentacoesComponent implements OnInit {
	movimentacoes: any[] = [];
	resumo: any = {};
	amigosPagar: any = {};
	constructor(private movimentacoesService: MovimentacoesService) {}

	ngOnInit(): void {
		this.movimentacoesService.getMovimentacoes().subscribe((res) => {
			this.movimentacoes = res["tudo"];
			this.resumo = res["resumo"];
			this.amigosPagar = res["amigosPagar"];
			console.log(res);
		});
	}
}
