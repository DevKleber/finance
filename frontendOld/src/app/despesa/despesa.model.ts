export class Despesa{
    constructor(
        public id_despesa: number,
        public vl_despesac: number,
        public dt_despesa: string,
        public ds_despesa: string,
        public bo_dividir_amigos: boolean,
        public id_tipo_despesa: number,
        public id_categoria_despesa: number,
        public id_usuario: number
    ){}
}