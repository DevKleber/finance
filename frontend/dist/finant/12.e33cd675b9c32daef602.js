(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{fHMt:function(e,i,t){"use strict";t.r(i),t.d(i,"AmigosModule",(function(){return y}));var a=t("PCNd"),o=t("tyNb"),n=t("OaAl"),r=t("IchE"),c=t("/D8a"),s=t("pnVv"),b=t("nWBu"),l=t("fXoL"),d=t("3Pt+"),u=t("ofXK"),m=function(){function e(){}return e.prototype.transform=function(e,i,t){return this.oquefazer(e,i,t)},e.prototype.oquefazer=function(e,i,t){switch(i){case"formatDate2BR":return this.formatDate2BR(e,t);case"random":return this.random(e,t);case"statusMeusAmigos":return this.statusMeusAmigos(e,t);case"getFileExtension":return this.getFileExtension(e,t);case"ifTimeIsNull":return this.ifTimeIsNull(e,t);case"checkVencimento":return this.checkVencimento(e,t);case"imgIsDevMode":return this.imgIsDevMode(e,t)}return""},e.prototype.random=function(e,i){var t=16,a=1;return null!=e.sexo?(t=5,a=1,e.sexo+"-"+Math.floor(Math.random()*(t-a+1)+a)+".png"):"animals/"+Math.floor(Math.random()*(t-a+1)+a)+".png"},e.prototype.statusMeusAmigos=function(e,i){switch(e){case"a":return'<div class="text-xs text-uppercase">Desfazer amizade</div>';case"p":return'<div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Aguardando aprova\xe7\xe3o</div>'}},e.prototype.formatDate2BR=function(e,i){if(e){var t=e.split("-");if(3==t.length)return t[2]+"/"+t[1]+"/"+t[0]}return""},e.prototype.imgIsDevMode=function(e,i){return e.replace(/public\//g,"")},e.prototype.checkSorteado=function(e,i){var t=e;10==e.length&&(t=e+" 23:59:59");var a=new Date,o=null;return new Date(t).getTime()<a.getTime()&&(o="<div class='label label-table label-info'>Sorteado</div>"),o},e.prototype.checkVencimento=function(e,i){var t=e;10==e.length&&(t=e+" 23:59:59");var a=new Date,o=null;return new Date(t).getTime()<a.getTime()&&(o="<div class='label label-table label-danger'>Sorteado</div>"),o},e.prototype.ifTimeIsNull=function(e,i){return e||"--:--"},e.prototype.getFileExtension=function(e,i){return e?e.split(".").pop()+".svg":"file.svg"},e.\u0275fac=function(i){return new(i||e)},e.\u0275pipe=l.Lb({name:"helpers",type:e,pure:!0}),e}(),p=function(e){return{"border-left-warning":e}};function g(e,i){if(1&e&&(l.Sb(0,"div",27),l.Sb(1,"div",28),l.Sb(2,"div",6),l.Sb(3,"div",29),l.Sb(4,"div",30),l.Nb(5,"img",31),l.Rb(),l.Rb(),l.Sb(6,"div",32),l.Gc(7),l.Nb(8,"br"),l.Gc(9),l.Nb(10,"br"),l.Gc(11),l.dc(12,"date"),l.Rb(),l.Sb(13,"div",29),l.Nb(14,"button",33),l.dc(15,"helpers"),l.Rb(),l.Rb(),l.Rb(),l.Rb()),2&e){var t=i.$implicit,a=l.cc();l.Ab(5),l.mc("src","",a.PATHAPI,"/",null==t?null:t.img_perfil,"",l.xc),l.Ab(2),l.Ic(" ",t.no_pessoa," "),l.Ab(2),l.Ic(" ",t.no_email," "),l.Ab(2),l.Ic(" Amigo desde ",l.fc(12,7,t.created_at,"dd/MM/yyyy")," "),l.Ab(3),l.jc("ngClass",l.oc(13,p,"p"==t.situacao))("innerHtml",l.fc(15,10,t.situacao,"statusMeusAmigos"),l.wc)}}function f(e,i){if(1&e&&(l.Sb(0,"h3"),l.Gc(1," Resultados "),l.Sb(2,"a",25),l.Gc(3),l.Rb(),l.Rb()),2&e){var t=l.cc();l.Ab(3),l.Ic(" ",null==t.pessoas?null:t.pessoas.length," ")}}function v(e,i){if(1&e&&(l.Sb(0,"div"),l.Gc(1),l.Sb(2,"b"),l.Gc(3),l.Rb(),l.Rb()),2&e){var t=l.cc();l.Ab(1),l.Ic(" ",t.fimCarregamentoProcurarPessoa,": "),l.Ab(2),l.Hc(t.nomePessoaModel)}}function h(e,i){if(1&e){var t=l.Tb();l.Sb(0,"div",34),l.Sb(1,"div",35),l.Sb(2,"div",6),l.Sb(3,"div",29),l.Sb(4,"div",30),l.Nb(5,"img",31),l.Rb(),l.Rb(),l.Sb(6,"div",32),l.Gc(7),l.Nb(8,"br"),l.Gc(9),l.Nb(10,"br"),l.Rb(),l.Sb(11,"div",29),l.Sb(12,"button",36),l.Zb("click",(function(){l.vc(t);var e=i.$implicit;return l.cc().solicitarAmizade(e)})),l.Gc(13," Solicitar amizade "),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Rb()}if(2&e){var a=i.$implicit,o=l.cc();l.Ab(5),l.mc("src","",o.PATHAPI,"/",null==a?null:a.img_perfil,"",l.xc),l.Ab(2),l.Ic(" ",a.no_pessoa," "),l.Ab(2),l.Ic(" ",a.no_email," ")}}function S(e,i){1&e&&(l.Sb(0,"div",37),l.Gc(1," Voc\xea n\xe3o tem solicita\xe7\xf5es pendentes! "),l.Rb())}function R(e,i){if(1&e){var t=l.Tb();l.Sb(0,"div",34),l.Sb(1,"div",35),l.Sb(2,"div",6),l.Sb(3,"div",29),l.Sb(4,"div",30),l.Nb(5,"img",31),l.Rb(),l.Rb(),l.Sb(6,"div",38),l.Sb(7,"span",39),l.Gc(8),l.Rb(),l.Gc(9),l.Nb(10,"br"),l.Gc(11),l.Sb(12,"div",6),l.Sb(13,"div",32),l.Sb(14,"a",40),l.Zb("click",(function(){l.vc(t);var e=i.$implicit;return l.cc().aceitarOuRecusar(e,"a")})),l.Sb(15,"span",1),l.Nb(16,"i",41),l.Rb(),l.Sb(17,"span",42),l.Gc(18,"Aceitar"),l.Rb(),l.Rb(),l.Rb(),l.Sb(19,"div",43),l.Sb(20,"a",44),l.Zb("click",(function(){l.vc(t);var e=i.$implicit;return l.cc().aceitarOuRecusar(e,"r")})),l.Sb(21,"span",1),l.Nb(22,"i",45),l.Rb(),l.Sb(23,"span",42),l.Gc(24,"Recusar"),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Rb()}if(2&e){var a=i.$implicit,o=l.cc();l.Ab(5),l.mc("src","",o.PATHAPI,"/",null==a?null:a.img_perfil,"",l.xc),l.Ab(3),l.Hc(a.no_pessoa),l.Ab(1),l.Ic(" ",a.no_email," "),l.Ab(2),l.Ic(" Solicitado em ",a.created_at," ")}}var A=[{path:"",component:function(){function e(e,i,t,a,o){this.amigosService=e,this.fb=i,this.notificationService=t,this.helper=a,this.breadcrumbService=o,this.solicitacoesAmizade=[],this.loader=!0,this.page=1,this.itensPorPagina=10,this.order={},this.PATHAPI=b.b,this.fimCarregamentoProcurarPessoa=null,this.nomePessoaModel="",this.pessoas=[]}return e.prototype.ngOnInit=function(){this.breadCrumb(),this.getAmigos()},e.prototype.breadCrumb=function(){this.breadcrumbService.chosenPagina([{no_rotina:"Amigos",ds_url:"amigos",active:""},{no_rotina:"Inserir",ds_url:"mudar-texto",active:"active"}])},e.prototype.procurarPessoa=function(){var e=this;if(!this.nomePessoaModel.length)return!1;this.amigosService.procurarPessoa(this.nomePessoaModel).subscribe((function(i){e.fimCarregamentoProcurarPessoa=i.length?null:"Nenhuma registro encontrado",e.pessoas=i}))},e.prototype.getAmigos=function(){var e=this;this.amigosService.getAmigos().subscribe((function(i){e.amigos=i.tudo,e.loader=!1}))},e.prototype.getSolicitacoesAmizade=function(){var e=this;this.amigosService.getSolicitacoesAmizade().subscribe((function(i){e.solicitacoesAmizade=i,e.loader=!1}))},e.prototype.solicitarAmizade=function(e){var i=this;this.amigosService.solicitarAmizade(e.id_pessoa).subscribe((function(e){i.amigos.push(e.dados),i.notificationService.notifySweet("Solicita\xe7\xe3o de amizade enviada"),i.loader=!1}))},e.prototype.aceitarOuRecusar=function(e,i){var t=this;this.amigosService.aceitarOuRecusar(e.id_amigos,i).subscribe((function(a){var o="Amizade feita!";"r"==i&&(o="recusado!"),t.notificationService.notifySweet(o),t.solicitacoesAmizade.splice(t.solicitacoesAmizade.indexOf(e),1)}))},e.prototype.inativar=function(e){var i=this;confirm("Voc\xea tem certeza que deseja remover o (a)  AmigosComponent ")&&(this.loader=!0,this.amigosService.inativar(e.id_amigos).subscribe((function(t){t.response&&(e.bo_ativo=0,i.notificationService.notifySweet("amigo inativado")),i.loader=!1})))},e.prototype.update=function(e){this.amigosService.update(e,e.id)},e.\u0275fac=function(i){return new(i||e)(l.Mb(r.a),l.Mb(d.d),l.Mb(n.a),l.Mb(c.a),l.Mb(s.a))},e.\u0275cmp=l.Gb({type:e,selectors:[["app-amigos"]],decls:50,vars:8,consts:[["href","#","data-toggle","modal","data-target","#logoutModal",1,"btn","btn-primary","btn-icon-split","btn-lg","margin-bottom-15"],[1,"icon","text-white-50"],[1,"fas","fa-search","fa-sm"],[1,"text"],["href","#","data-toggle","modal","data-target","#solicitacaoAmizadeModal",1,"btn","btn-primary","btn-icon-split","btn-lg","margin-bottom-15","margin-left-15",3,"click"],[1,"fas","fa-user-friends","fa-sm"],[1,"row"],["class","col-md-4","style","padding-bottom: 1.5rem",4,"ngFor","ngForOf"],["id","logoutModal","tabindex","-1","role","dialog","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalLabel",1,"modal-title"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],[1,"modal-body"],[1,"input-group"],["type","text","placeholder","Nome","aria-label","Search","aria-describedby","basic-addon2",1,"form-control","bg-light","border-0","small",3,"ngModel","ngModelChange"],[1,"input-group-append"],["type","button",1,"btn","btn-primary",3,"click"],[1,"resultados","padding-bottom-15","margin-top-15"],[4,"ngIf"],["class","col-md-12","style","padding-bottom: 1.5rem",4,"ngFor","ngForOf"],[1,"modal-footer"],["id","solicitacaoAmizadeModal","tabindex","-1","role","dialog","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],["href","#",1,"btn","btn-primary","btn-circle","btn-sm"],["class","alert alert-warning w-100 text-center","role","alert",4,"ngIf"],[1,"col-md-4",2,"padding-bottom","1.5rem"],[1,"card","card","shadow","padding-15"],[1,"col-md-3"],[1,"imgPerfil"],["alt","","srcset","",3,"src"],[1,"col-md-6"],[1,"btn","h-100","border",3,"ngClass","innerHtml"],[1,"col-md-12",2,"padding-bottom","1.5rem"],[1,"card","shadow","padding-15"],[1,"btn","h-100","border",3,"click"],["role","alert",1,"alert","alert-warning","w-100","text-center"],[1,"col-md-9"],[2,"font-size","1.4em"],[1,"btn","btn-success","btn-icon-split","w-100","text-white",3,"click"],[1,"fas","fa-check"],[1,"text","w-100"],[1,"col-md-6",2,"padding-left","0"],[1,"btn","btn-danger","btn-icon-split","w-100","text-white",3,"click"],[1,"fas","fa-trash"]],template:function(e,i){1&e&&(l.Sb(0,"a",0),l.Sb(1,"span",1),l.Nb(2,"i",2),l.Rb(),l.Sb(3,"span",3),l.Gc(4,"Encontrar amigo"),l.Rb(),l.Rb(),l.Sb(5,"a",4),l.Zb("click",(function(){return i.getSolicitacoesAmizade()})),l.Sb(6,"span",1),l.Nb(7,"i",5),l.Rb(),l.Sb(8,"span",3),l.Gc(9,"Solicita\xe7\xf5es de amizade"),l.Rb(),l.Rb(),l.Sb(10,"div",6),l.Ec(11,g,16,15,"div",7),l.Rb(),l.Sb(12,"div",8),l.Sb(13,"div",9),l.Sb(14,"div",10),l.Sb(15,"div",11),l.Sb(16,"h5",12),l.Gc(17," Encontrar amigos "),l.Rb(),l.Sb(18,"button",13),l.Sb(19,"span",14),l.Gc(20,"\xd7"),l.Rb(),l.Rb(),l.Rb(),l.Sb(21,"div",15),l.Sb(22,"div",16),l.Sb(23,"input",17),l.Zb("ngModelChange",(function(e){return i.nomePessoaModel=e})),l.Rb(),l.Sb(24,"div",18),l.Sb(25,"button",19),l.Zb("click",(function(){return i.procurarPessoa()})),l.Nb(26,"i",2),l.Rb(),l.Rb(),l.Rb(),l.Sb(27,"div",20),l.Ec(28,f,4,1,"h3",21),l.Ec(29,v,4,2,"div",21),l.Sb(30,"div",6),l.Ec(31,h,14,4,"div",22),l.Rb(),l.Rb(),l.Rb(),l.Nb(32,"div",23),l.Rb(),l.Rb(),l.Rb(),l.Sb(33,"div",24),l.Sb(34,"div",9),l.Sb(35,"div",10),l.Sb(36,"div",11),l.Sb(37,"h5",12),l.Gc(38," Solicita\xe7\xf5es aguardando sua aprova\xe7\xe3o "),l.Sb(39,"a",25),l.Gc(40),l.Rb(),l.Rb(),l.Sb(41,"button",13),l.Sb(42,"span",14),l.Gc(43,"\xd7"),l.Rb(),l.Rb(),l.Rb(),l.Sb(44,"div",15),l.Sb(45,"div",20),l.Sb(46,"div",6),l.Ec(47,S,2,0,"div",26),l.Ec(48,R,25,5,"div",22),l.Rb(),l.Rb(),l.Rb(),l.Nb(49,"div",23),l.Rb(),l.Rb(),l.Rb()),2&e&&(l.Ab(11),l.jc("ngForOf",i.amigos),l.Ab(12),l.jc("ngModel",i.nomePessoaModel),l.Ab(5),l.jc("ngIf",null==i.pessoas?null:i.pessoas.length),l.Ab(1),l.jc("ngIf",i.fimCarregamentoProcurarPessoa),l.Ab(2),l.jc("ngForOf",i.pessoas),l.Ab(9),l.Ic(" ",null==i.solicitacoesAmizade?null:i.solicitacoesAmizade.length," "),l.Ab(7),l.jc("ngIf",!i.solicitacoesAmizade.length),l.Ab(1),l.jc("ngForOf",i.solicitacoesAmizade))},directives:[u.m,d.c,d.k,d.n,u.n,u.l],pipes:[u.f,m],styles:[".imgPerfil[_ngcontent-%COMP%]{display:flex;align-items:center;align-content:center;justify-content:center}.imgPerfil[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px;height:80px;border-radius:40px}"]}),e}()}],y=function(){function e(){}return e.\u0275mod=l.Kb({type:e}),e.\u0275inj=l.Jb({factory:function(i){return new(i||e)},imports:[[a.a,o.g.forChild(A)]]}),e}()}}]);