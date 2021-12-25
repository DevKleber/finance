export class CategoriaDespesa{
    constructor(
        public id_categoria_despesa: number,
        public id_categoria_despesa_pai: number,
        public no_categoria_despesa: string,
        public id_usuario: number,
        public bo_ativo: boolean
    ){}
}