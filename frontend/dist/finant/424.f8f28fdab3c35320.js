"use strict";(self.webpackChunkfinant=self.webpackChunkfinant||[]).push([[424],{424:(M,l,i)=>{i.r(l),i.d(l,{FaturasModule:()=>U});var d=i(5718),c=i(0),p=i(4635),g=i(7892),m=i(7854),h=i(970),t=i(5e3),f=i(3075),x=i(7729),s=i(9808),Z=i(439),A=i(1656);function _(o,n){if(1&o&&(t.TgZ(0,"a",33),t._UZ(1,"i",34),t.qZA()),2&o){const e=t.oxw(2).$implicit,a=t.oxw();t.hYB("href","",a.imgApi,"/",e.pagamento.comprovante,"",t.LSH)}}function v(o,n){if(1&o&&(t.TgZ(0,"span",31),t._uU(1," Pago "),t.YNc(2,_,2,2,"a",32),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(2),t.Q6J("ngIf",e.pagamento.comprovante)}}function b(o,n){if(1&o&&(t.TgZ(0,"a",33),t._UZ(1,"i",34),t.qZA()),2&o){const e=t.oxw(2).$implicit,a=t.oxw(2);t.hYB("href","",a.imgApi,"/",null==e||null==e.pagamento?null:e.pagamento.comprovante,"",t.LSH)}}function T(o,n){if(1&o&&(t.TgZ(0,"span",31),t._uU(1," Pago "),t.YNc(2,b,2,2,"a",32),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(2),t.Q6J("ngIf",e.pagamento.comprovante)}}function C(o,n){if(1&o&&(t.TgZ(0,"tr"),t.TgZ(1,"div"),t._UZ(2,"i",35),t._uU(3),t.ALo(4,"currency"),t.YNc(5,T,3,1,"span",30),t.qZA(),t.qZA()),2&o){const e=n.$implicit,a=t.oxw().$implicit;t.xp6(3),t.AsE(" ",e.no_pessoa,": ",t.Dn7(4,3,a.vl_despesa*e.vl_conta_compartilhada_porcentagem/100,"BRL",!0)," "),t.xp6(2),t.Q6J("ngIf",e.pago)}}function F(o,n){if(1&o&&(t.TgZ(0,"tr"),t.TgZ(1,"td"),t._uU(2),t.ALo(3,"date"),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.YNc(6,v,3,1,"span",30),t.YNc(7,C,6,7,"tr",12),t.qZA(),t.TgZ(8,"td"),t._UZ(9,"i"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.ALo(13,"currency"),t.qZA(),t.TgZ(14,"td"),t._uU(15),t.qZA(),t.TgZ(16,"td"),t._uU(17),t.ALo(18,"currency"),t.qZA(),t.qZA()),2&o){const e=n.$implicit;t.xp6(2),t.hij(" ",t.xi3(3,12,e.dt_vencimento,"dd/MM/yyyy")," "),t.xp6(3),t.hij(" ",e.ds_despesa," "),t.xp6(1),t.Q6J("ngIf",e.pago),t.xp6(1),t.Q6J("ngForOf",null==e?null:e.pessoas),t.xp6(2),t.Tol(null==e?null:e.icon),t.xp6(1),t.hij(" ",e.no_categoria_despesa," "),t.xp6(2),t.hij(" ",t.Dn7(13,15,e.vl_despesac,"BRL",!0)," "),t.xp6(3),t.AsE(" ",e.nu_parcela_atual," / ",e.nu_parcela," "),t.xp6(2),t.hij(" ",t.Dn7(18,19,e.vl_despesa,"BRL",!0)," ")}}function q(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"div",36),t._UZ(1,"i",37),t._UZ(2,"i",38),t._UZ(3,"i",39),t.TgZ(4,"span",40),t._uU(5),t.qZA(),t.TgZ(6,"p",28),t._uU(7),t.ALo(8,"currency"),t.qZA(),t.TgZ(9,"div",41),t.TgZ(10,"ngx-charts-bar-vertical",42),t.NdJ("select",function(r){return t.CHM(e),t.oxw().onSelect(r)}),t.qZA(),t.qZA(),t.qZA()}if(2&o){const e=n.$implicit,a=t.oxw();t.xp6(5),t.Oqu(null==e?null:e.value.nome),t.xp6(2),t.hij(" ",t.Dn7(8,12,null==e?null:e.value.valor,"BRL",!0)," "),t.xp6(3),t.Q6J("scheme",a.colorScheme)("results",null==e?null:e.value.grafico)("gradient",a.gradient)("xAxis",a.showXAxis)("yAxis",a.showYAxis)("legend",a.showLegend)("showXAxisLabel",a.showXAxisLabel)("showYAxisLabel",a.showYAxisLabel)("xAxisLabel",a.xAxisLabel)("yAxisLabel",a.yAxisLabel)}}const w=[{path:"",component:(()=>{class o{constructor(e,a,r,u,y,L){this.cartaoCreditoService=e,this.formBuilder=a,this.notificationService=r,this.helper=u,this.router=y,this.breadcrumbService=L,this.cartoes={},this.minhasDespesasComCartao=[],this.faturasCartao=[],this.dividaAmigos=[],this.resumo={},this.loader=!0,this.imgBin="",this.urlImgBin="/assets/img/card/bin",this.bandeira="",this.imgApi=h.pz,this.dataFiltro={},this.dateObj=new Date,this.months=["Janeiro","Fevereiro","Mar\xe7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],this.view=[null,400],this.showXAxis=!0,this.showYAxis=!0,this.gradient=!1,this.showLegend=!1,this.showXAxisLabel=!0,this.xAxisLabel="Categorias",this.showYAxisLabel=!0,this.yAxisLabel="Reais",this.colorScheme={domain:["#5AA454","#4e73df","#f79e1b","#AAAAAA"]}}ngOnInit(){this.configureDate(""),this.getFatura()}breadCrumb(){this.breadcrumbService.chosenPagina([{no_rotina:"Fatura",ds_url:"cartao-credito",active:""},{no_rotina:"Inserir",ds_url:"mudar-texto",active:"active"}])}getFatura(){this.cartaoCreditoService.getFatura(this.dataFiltro).subscribe(e=>{this.cartoes=e.cartao,this.minhasDespesasComCartao=e.tudo,this.faturasCartao=e.faturasCartao,this.resumo=e.resumo,this.dividaAmigos=e.dividaAmigos,this.loader=!1})}configureDate(e){"+"==e?this.dateObj.setMonth(this.dateObj.getMonth()+1):"-"==e&&this.dateObj.setMonth(this.dateObj.getMonth()-1);var a=this.dateObj.getUTCMonth()+1,r=this.dateObj.getUTCFullYear();this.dataFiltro.mes=a,this.dataFiltro.mesNome=this.months[a-1],this.dataFiltro.ano=r,this.dataFiltro.id=this.router.snapshot.params.id,this.getFatura()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(g.l),t.Y36(f.qu),t.Y36(p.g),t.Y36(m.W),t.Y36(c.gz),t.Y36(x.p))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-faturas"]],decls:60,vars:26,consts:[[1,"row"],[1,"col-md-8"],[1,"card","shadow","padding-15"],[1,"row","margin-bottom-15"],[1,"data"],[1,"cursor-pointer","iconSubMonth",3,"click"],[1,"fas","fa-minus-circle"],[1,"cursor-pointer","iconAddMonth",3,"click"],[1,"fas","fa-plus-circle"],[1,"row","margin-top-15"],[1,"table","table-hover"],["scope","col"],[4,"ngFor","ngForOf"],[1,"col-md-4"],[1,"credCard","card-1","bg-gradient-dark","text-white"],[1,"displayFlexColumn"],[1,"displayFlexRow"],[1,"titulo"],[1,"empresa","text-empresa","text-center"],[1,"bandeira"],[1,"numero","text-numero","text-center",2,"width","100%"],[1,"titular","text-titular",2,"width","100%"],[1,"limite","text-limite","text-center"],[1,"diaVencimento","text-diaVencimento","text-center"],[1,"diaFechamento","text-diaFechamento","text-center"],[1,"card","shadow","border-left-primary","padding-15","margin-bottom-20"],[1,"iconResumo","fa","fa-credit-card","text-primary"],[1,"text","text-primary"],[1,"valorResumo"],["class","card shadow border-left-info padding-15 margin-bottom-20",4,"ngFor","ngForOf"],["class","mov-pg",4,"ngIf"],[1,"mov-pg"],["target","_BLANK",3,"href",4,"ngIf"],["target","_BLANK",3,"href"],[1,"fa","fa-receipt"],[1,"fa","fa-users",2,"margin-left","5px","color","#cbccce"],[1,"card","shadow","border-left-info","padding-15","margin-bottom-20"],[1,"iconResumo","fa","fa-credit-card","text-info"],[1,"iconResumo2","fa","fa-users","text-info",2,"opacity","0.2"],[1,"iconShared","fa","fa-share-square"],[1,"text-info",2,"text-transform","capitalize","font-weight","bold"],[1,"row",2,"display","grid","align-content","center","justify-content","center","height","250px"],[3,"scheme","results","gradient","xAxis","yAxis","legend","showXAxisLabel","showYAxisLabel","xAxisLabel","yAxisLabel","select"]],template:function(e,a){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"div",4),t.TgZ(5,"span",5),t.NdJ("click",function(){return a.configureDate("-")}),t._UZ(6,"i",6),t.qZA(),t._uU(7),t.TgZ(8,"span",7),t.NdJ("click",function(){return a.configureDate("+")}),t._UZ(9,"i",8),t.qZA(),t.qZA(),t.qZA(),t.TgZ(10,"div",9),t.TgZ(11,"table",10),t.TgZ(12,"thead"),t.TgZ(13,"tr"),t.TgZ(14,"th",11),t._uU(15,"Vencimento"),t.qZA(),t.TgZ(16,"th",11),t._uU(17,"Descri\xe7\xe3o"),t.qZA(),t.TgZ(18,"th",11),t._uU(19,"Categoria"),t.qZA(),t.TgZ(20,"th",11),t._uU(21,"Valor compra"),t.qZA(),t.TgZ(22,"th",11),t._uU(23,"Parcelas"),t.qZA(),t.TgZ(24,"th",11),t._uU(25,"Valor a pagar"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(26,"tbody"),t.YNc(27,F,19,23,"tr",12),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(28,"div",13),t.TgZ(29,"div",14),t.TgZ(30,"div",15),t.TgZ(31,"div",16),t._UZ(32,"div",17),t.TgZ(33,"div",18),t._uU(34),t.qZA(),t.TgZ(35,"div",19),t.ALo(36,"safeHtml"),t.qZA(),t.qZA(),t.TgZ(37,"div",16),t.TgZ(38,"div",20),t._uU(39),t.qZA(),t.qZA(),t.TgZ(40,"div",16),t.TgZ(41,"div",21),t._uU(42),t.qZA(),t.qZA(),t.TgZ(43,"div",16),t.TgZ(44,"div",22),t._uU(45),t.ALo(46,"currency"),t.qZA(),t.TgZ(47,"div",23),t._uU(48),t.qZA(),t.TgZ(49,"div",24),t._uU(50),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(51,"div",25),t._UZ(52,"i",26),t.TgZ(53,"span",27),t._uU(54,"Valor da fatura"),t.qZA(),t.TgZ(55,"p",28),t._uU(56),t.ALo(57,"currency"),t.qZA(),t.qZA(),t.YNc(58,q,11,16,"div",29),t.ALo(59,"keyvalue"),t.qZA(),t.qZA()),2&e&&(t.xp6(7),t.AsE(" ",null==a.dataFiltro?null:a.dataFiltro.mesNome," ",null==a.dataFiltro?null:a.dataFiltro.ano," "),t.xp6(20),t.Q6J("ngForOf",a.faturasCartao),t.xp6(7),t.hij(" ",null==a.cartoes?null:a.cartoes.no_cartao_credito," "),t.xp6(1),t.Udp("background-image",t.xi3(36,13,"url("+a.urlImgBin+"/"+(null==a.cartoes?null:a.cartoes.bandeira)+".png )","style")),t.xp6(4),t.hij(" ",null==a.cartoes?null:a.cartoes.numero," "),t.xp6(3),t.hij(" ",null==a.cartoes?null:a.cartoes.no_titular," "),t.xp6(3),t.hij(" Limite: ",t.Dn7(46,16,null==a.cartoes?null:a.cartoes.vl_limite,"BRL",!0)," "),t.xp6(3),t.hij(" Venc: ",null==a.cartoes?null:a.cartoes.dia_vencimento," "),t.xp6(2),t.hij(" Fechamento: ",null==a.cartoes?null:a.cartoes.dia_fechamento_fatura," "),t.xp6(6),t.hij(" ",t.Dn7(57,20,null==a.resumo?null:a.resumo.totalAPagarCartao,"BRL",!0)," "),t.xp6(2),t.Q6J("ngForOf",t.lcZ(59,24,a.dividaAmigos)))},directives:[s.sg,s.O5,Z.K$],pipes:[A.T,s.H9,s.Nd,s.uU],styles:[".data[_ngcontent-%COMP%]{padding:15px 55px;border-radius:20px;border:2px solid #4e73df;color:#4e73df;font-weight:700;margin:0 auto;position:relative}.valorResumo[_ngcontent-%COMP%]{font-size:2em;text-align:right}.iconResumo[_ngcontent-%COMP%]{font-size:2em;position:absolute;top:-17px}.iconResumo2[_ngcontent-%COMP%]{font-size:2em;position:absolute;top:-17px;left:-2px}.iconShared[_ngcontent-%COMP%]{font-size:4em;position:absolute;top:40px;left:6px;opacity:.07}.credCard[_ngcontent-%COMP%]{display:flex;position:relative;width:100%;height:300px;margin-bottom:25px;border-radius:8px}.linha[_ngcontent-%COMP%]{position:absolute;width:100%}.displayFlexColumn[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column}.displayFlexRow[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex:1;justify-content:space-between}.text-empresa[_ngcontent-%COMP%]{font-size:1.5em;font-weight:700}.titulo[_ngcontent-%COMP%]{align-items:center;width:60px;height:60px;border-radius:8px}.empresa[_ngcontent-%COMP%]{align-items:center;width:230px;height:60px;border-radius:8px}.bandeira[_ngcontent-%COMP%]{align-items:center;width:60px;height:60px;border-radius:8px;margin:0 5px;background-repeat:no-repeat;background-size:100%;background-position:center}input[_ngcontent-%COMP%]{background:transparent;border-top-width:0px;border-left-width:0px;border-right-width:0px}.text-numero[_ngcontent-%COMP%]{font-size:2em}.text-titular[_ngcontent-%COMP%]{font-size:1.5em;text-align:left}.iconSubMonth[_ngcontent-%COMP%]{cursor:pointer;position:absolute;left:8px;font-size:1.5em;top:8px}.iconAddMonth[_ngcontent-%COMP%]{cursor:pointer;position:absolute;right:8px;font-size:1.5em;top:8px}"]}),o})()}];let U=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[d.m,c.Bz.forChild(w)]]}),o})()}}]);