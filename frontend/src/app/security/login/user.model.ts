class User {
	constructor(
		public token: string,
		public no_funcionario: string,
		public img: string,
		public user: Logado[] = [],
		public empresa: Empresa[] = [],
		public pessoa: Pessoa[] = []
	) {}
}
class Logado {
	constructor(
		public id: number,
		public login: string,
		public id_pessoa: number,
		public no_funcionario: string
	) {}
}
class Empresa {
	constructor(
		public id: number,
		public no_fantasia: string,
		public nu_cnpj: string,
		public no_razao_social: string,
		public nu_inscricao_estadual: string,
		public nu_inscricao_municipal: string,
		public id_empresa_dados_fiscais: number,
		public img: string
	) {}
}
class Pessoa {
	constructor(
		public id: number,
		public no_pessoa: string,
		public sexo: string,
		public dt_nascimento: string,
		public no_email: string,
		public nu_cpfcnpj: string,
		public bo_ativo: string,
		public img_perfil: string
	) {}
}

export { User, Logado, Empresa, Pessoa };
