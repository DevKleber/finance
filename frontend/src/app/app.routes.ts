import { Routes } from "@angular/router";

import { LoginComponent } from "./security/login/login.component";

import { LoggedInGuard } from "./security/loggedin.guard";

export const ROUTES: Routes = [
	// { path: '', component: HomeComponent ,canLoad:[LoggedInGuard]},
	{ path: "login/:to", component: LoginComponent },
	{ path: "login", component: LoginComponent },

	{ path: "", redirectTo: "dashboard", pathMatch: "full" },
	{
		path: "dashboard",
		loadChildren: () =>
			import("./layout/home/home.module").then((m) => m.HomeModule),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},
	{
		path: "mudar-texto",
		loadChildren: () =>
			import("./mudar-texto/mudar-texto.module").then(
				(m) => m.MudarTextoModule
			),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},
	{
		path: "cartao-credito",
		loadChildren: () =>
			import("./cartao-credito/cartao-credito.module").then(
				(m) => m.CartaoCreditoModule
			),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},
	{
		path: "mudar-texto",
		loadChildren: () =>
			import("./mudar-texto/mudar-texto.module").then(
				(m) => m.MudarTextoModule
			),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},

	{
		path: "not-found",
		loadChildren: () =>
			import("./not-found/not-found.module").then(
				(m) => m.NotFoundModule
			),
		canActivate: [LoggedInGuard],
		canLoad: [LoggedInGuard],
	},

	{
		path: "amigos",
		loadChildren: () =>
			import("./amigos/amigos.module").then((m) => m.AmigosModule),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},
	{
		path: "amigos/incluir",
		loadChildren: () =>
			import("./amigos/incluir/incluir.module").then(
				(m) => m.IncluirModule
			),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},
	{
		path: "amigos/alterar/:id",
		loadChildren: () =>
			import("./amigos/alterar/alterar.module").then(
				(m) => m.AlterarModule
			),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},
	{
		path: "amigos/detalhar/:id",
		loadChildren: () =>
			import("./amigos/detalhar/detalhar.module").then(
				(m) => m.DetalharModule
			),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},

	{
		path: "categoria-despesa",
		loadChildren: () =>
			import("./categoria-despesa/categoria-despesa.module").then(
				(m) => m.CategoriaDespesaModule
			),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},
	{
		path: "categoria-receita",
		loadChildren: () =>
			import("./categoria-receita/categoria-receita.module").then(
				(m) => m.CategoriaReceitaModule
			),
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
	},

	{ path: "**", redirectTo: "not-found", pathMatch: "full" },
];
