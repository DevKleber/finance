(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"1U23":function(e,o,t){"use strict";t.r(o),t.d(o,"CategoriaReceitaModule",(function(){return P}));var i=t("PCNd"),n=t("tyNb"),a=t("3Pt+"),c=t("OaAl"),r=t("nWBu"),l=t("fXoL"),b=t("tk/3"),d=function(){function e(e,o,t){this.http=e,this.notificationService=o,this.router=t}return e.prototype.getCategoriaReceitas=function(e){return this.http.get(r.a+"/categoria-receita")},e.prototype.getcategoriaReceitaById=function(e){return this.http.get(r.a+"/categoria-receita/"+e)},e.prototype.save=function(e){return this.http.post(r.a+"/categoria-receita",e)},e.prototype.update=function(e,o){return this.http.put(r.a+"/categoria-receita/"+o,e)},e.prototype.inativar=function(e){return this.http.delete(r.a+"/categoria-receita/"+e)},e.prototype.notify=function(e){this.notificationService.notifySweet(e)},e.prototype.goTo=function(e){void 0===e&&(e="depoimento"),this.router.navigate(["/"+e])},e.\u0275fac=function(o){return new(o||e)(l.Wb(b.b),l.Wb(c.a),l.Wb(n.c))},e.\u0275prov=l.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e}(),s=t("/D8a"),u=t("pnVv"),f=t("PSD3"),m=t.n(f),p=t("7R0K"),g=t("ofXK"),v=t("9odQ"),h=["closeModalIcon"];function S(e,o){if(1&e){var t=l.Tb();l.Sb(0,"div",39),l.Sb(1,"i",40),l.Zb("click",(function(){l.yc(t);var e=o.$implicit;return l.dc(2).removerCategoriaFilha(e.value)})),l.Rb(),l.Nb(2,"i"),l.Jc(3),l.Rb()}if(2&e){var i=o.$implicit;l.Ab(2),l.Db("",i.value.icon," iconList"),l.Ab(1),l.Lc(" ",i.value.no_categoria_receita," ")}}function R(e,o){if(1&e){var t=l.Tb();l.Sb(0,"div",32),l.Sb(1,"p",2),l.Sb(2,"i",33),l.Zb("click",(function(){l.yc(t);var e=o.$implicit;return l.dc().removerCategoriaFilha(e.value)})),l.Rb(),l.Nb(3,"i",34),l.Jc(4),l.Rb(),l.Sb(5,"div",35),l.Sb(6,"div",36),l.Zb("click",(function(){l.yc(t);var e=o.$implicit;return l.dc().novaFilha(e.value)})),l.Nb(7,"i",37),l.Rb(),l.Rb(),l.Hc(8,S,4,4,"div",38),l.ec(9,"keyvalue"),l.Rb()}if(2&e){var i=o.$implicit;l.Ab(3),l.Db("",i.value.icon," iconList"),l.Ab(1),l.Lc(" ",i.value.no_categoria_receita," "),l.Ab(4),l.lc("ngForOf",l.fc(9,5,i.value.children))}}function y(e,o){if(1&e){var t=l.Tb();l.Sb(0,"div",42),l.Zb("click",(function(){l.yc(t);var e=o.$implicit;return l.dc(2).menuIcon(e)})),l.Nb(1,"br"),l.Sb(2,"span"),l.Jc(3),l.Rb(),l.Rb()}if(2&e){var i=o.$implicit;l.Ab(3),l.Kc(null==i?null:i.label)}}function _(e,o){if(1&e&&(l.Sb(0,"div",0),l.Hc(1,y,4,1,"div",41),l.Rb()),2&e){var t=l.dc();l.Ab(1),l.lc("ngForOf",t.fontawesome)}}function C(e,o){if(1&e){var t=l.Tb();l.Sb(0,"a",43),l.Zb("click",(function(){return l.yc(t),l.dc().escolherOutroGrupoIcone()})),l.Sb(1,"span",19),l.Jc(2),l.Rb(),l.Rb()}if(2&e){var i=l.dc();l.Ab(2),l.Lc("",null==i.fontawesomeIconesPorMenu?null:i.fontawesomeIconesPorMenu.label," \xd7")}}function M(e,o){if(1&e){var t=l.Tb();l.Sb(0,"div",44),l.Sb(1,"i",45),l.Zb("click",(function(){l.yc(t);var e=o.$implicit;return l.dc().selectIcon(e)})),l.Rb(),l.Rb()}if(2&e){var i=o.$implicit;l.Ab(1),l.Db("fa fa-",i," cursor-pointer")}}var w=[{path:"",component:function(){function e(e,o,t,i,n){this.categoriaReceitaService=e,this.formBuilder=o,this.notificationService=t,this.helper=i,this.breadcrumbService=n,this.loader=!0,this.categoriaSelecionada={},this.fontawesome=p.a,this.fontawesomeIconesPorMenu=[],this.iconeSelecionado=""}return e.prototype.ngOnInit=function(){this.getCategoriaReceitas(),this.breadCrumb(),this.initializeFormEmpty()},e.prototype.breadCrumb=function(){this.breadcrumbService.chosenPagina([{no_rotina:"Categorias",ds_url:"categoria",active:""},{no_rotina:"Inserir",ds_url:"mudar-texto",active:"active"}])},e.prototype.initializeFormEmpty=function(){this.form=this.formBuilder.group({id_categoria_receita_pai:this.formBuilder.control(""),icon:this.formBuilder.control(""),no_categoria_receita:this.formBuilder.control("",[a.q.required])})},e.prototype.novaFilha=function(e){this.categoriaSelecionada=e,this.form.controls.id_categoria_receita_pai.setValue(e.id_categoria_receita),console.log(e)},e.prototype.save=function(e){var o=this;this.categoriaReceitaService.save(e).subscribe((function(e){o.notificationService.notifySweet("Registro inserido!"),o.getCategoriaReceitas(),o.iconeSelecionado="",o.form.controls.icon.setValue(""),o.form.controls.no_categoria_receita.setValue("")}))},e.prototype.savePai=function(e){delete e.id_categoria_receita_pai,this.save(e)},e.prototype.removerCategoriaFilha=function(e){var o=this;m.a.fire({title:"Remover "+e.no_categoria_receita+"?",type:"info",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Sim, remover!"}).then((function(t){t.value&&o.categoriaReceitaService.inativar(e.id_categoria_receita).subscribe((function(e){o.notificationService.notifySweet("Excluido!"),o.getCategoriaReceitas()}))}))},e.prototype.getCategoriaReceitas=function(){var e=this;this.categoriaReceitaService.getCategoriaReceitas().subscribe((function(o){e.categoriaReceitas=o,e.loader=!1}))},e.prototype.update=function(e){this.categoriaReceitaService.update(e,e.id)},e.prototype.menuIcon=function(e){this.fontawesomeIconesPorMenu=e},e.prototype.escolherOutroGrupoIcone=function(){this.fontawesomeIconesPorMenu=[]},e.prototype.selectIcon=function(e){this.form.controls.icon.setValue("fa fa-"+e),this.iconeSelecionado="fa fa-"+e,this.closeModalIcon.nativeElement.click()},e.\u0275fac=function(o){return new(o||e)(l.Mb(d),l.Mb(a.d),l.Mb(c.a),l.Mb(s.a),l.Mb(u.a))},e.\u0275cmp=l.Gb({type:e,selectors:[["app-categoria-receita"]],viewQuery:function(e,o){var t;1&e&&l.Nc(h,!0),2&e&&l.uc(t=l.ac())&&(o.closeModalIcon=t.first)},decls:64,vars:18,consts:[[1,"row"],[1,"card","shadow","h-100","margin-15","padding-15"],[1,"catPai"],["novalidate","",3,"formGroup"],[1,"box-body"],[1,"form-group","is-empty","col-md-12"],["for",""],[1,"fa","fa-arrow-alt-square-left"],["formControlName","no_categoria_receita","placeholder","",1,"form-control"],["data-toggle","modal","data-target","#modalIcones",1,"btn","btn-light"],[1,"modal-footer"],[1,"btn","btn-primary","text-white",3,"disabled","click"],["class","card shadow margin-15 padding-30 hover",4,"ngFor","ngForOf"],["id","filhoModal","tabindex","-1","role","dialog","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalLabel",1,"modal-title"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],[1,"modal-body"],[1,"padding-bottom-15","margin-top-15"],["errorMessage","Campo obrigat\xf3rio","label","Nome subcategoria"],["type","button","data-dismiss","modal",1,"btn","btn-secondary"],["id","modalIcones","tabindex","-1","role","dialog","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],["role","document",1,"modal-dialog","modal-lg"],[1,"modal-content","modal-lg"],["closeModalIcon",""],["class","row",4,"ngIf"],[1,"row","margin-bottom-15"],["class","close w-100 cursor-pointer text-center",3,"click",4,"ngIf"],["class","padding-5",4,"ngFor","ngForOf"],[1,"card","shadow","margin-15","padding-30","hover"],[1,"fas","fa-minus-circle","iconeRemoverFilha",2,"font-size","0.7em",3,"click"],[2,"font-size","0.7em"],[1,"action"],["data-toggle","modal","data-target","#filhoModal",1,"item","itemAdd",3,"click"],[1,"fas","fa-plus"],["class","catFilhas hover","style","margin-left: 42px",4,"ngFor","ngForOf"],[1,"catFilhas","hover",2,"margin-left","42px"],[1,"fas","fa-minus-circle","iconeRemoverFilha",3,"click"],["style","margin: 0 auto","class","card cursor-pointer","style","padding: 1px; margin: 4px",3,"click",4,"ngFor","ngForOf"],[1,"card","cursor-pointer",2,"padding","1px","margin","4px",3,"click"],[1,"close","w-100","cursor-pointer","text-center",3,"click"],[1,"padding-5"],[2,"font-size","3em",3,"click"]],template:function(e,o){1&e&&(l.Sb(0,"div",0),l.Sb(1,"div",1),l.Sb(2,"div",2),l.Sb(3,"form",3),l.Sb(4,"div",4),l.Sb(5,"div",5),l.Sb(6,"label",6),l.Jc(7,"Nova categoria "),l.Nb(8,"i",7),l.Rb(),l.Nb(9,"input",8),l.Sb(10,"button",9),l.Jc(11," ICONE "),l.Nb(12,"i"),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Sb(13,"div",10),l.Sb(14,"button",11),l.Zb("click",(function(){return o.savePai(o.form.value)})),l.Jc(15," Salvar "),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Hc(16,R,10,7,"div",12),l.ec(17,"keyvalue"),l.Rb(),l.Sb(18,"div",13),l.Sb(19,"div",14),l.Sb(20,"div",15),l.Sb(21,"div",16),l.Sb(22,"h5",17),l.Jc(23),l.Rb(),l.Sb(24,"button",18),l.Sb(25,"span",19),l.Jc(26,"\xd7"),l.Rb(),l.Rb(),l.Rb(),l.Sb(27,"div",20),l.Sb(28,"div",21),l.Sb(29,"form",3),l.Sb(30,"div",4),l.Sb(31,"div",5),l.Sb(32,"app-input-container",22),l.Nb(33,"input",8),l.Rb(),l.Rb(),l.Sb(34,"button",9),l.Jc(35," ICONE "),l.Nb(36,"i"),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Sb(37,"div",10),l.Sb(38,"button",23),l.Jc(39," Cancelar "),l.Rb(),l.Sb(40,"button",11),l.Zb("click",(function(){return o.save(o.form.value)})),l.Jc(41," Salvar "),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Sb(42,"div",24),l.Sb(43,"div",25),l.Sb(44,"div",26),l.Sb(45,"div",16),l.Sb(46,"h5",17),l.Jc(47,"ICONES"),l.Rb(),l.Sb(48,"button",18,27),l.Sb(50,"span",19),l.Jc(51,"\xd7"),l.Rb(),l.Rb(),l.Rb(),l.Sb(52,"div",20),l.Sb(53,"div",21),l.Hc(54,_,2,1,"div",28),l.Sb(55,"div",29),l.Hc(56,C,3,1,"a",30),l.Rb(),l.Sb(57,"div",0),l.Hc(58,M,2,3,"div",31),l.Rb(),l.Rb(),l.Rb(),l.Sb(59,"div",10),l.Sb(60,"button",23),l.Jc(61," Cancelar "),l.Rb(),l.Sb(62,"button",11),l.Zb("click",(function(){return o.save(o.form.value)})),l.Jc(63," Salvar "),l.Rb(),l.Rb(),l.Rb(),l.Rb(),l.Rb()),2&e&&(l.Ab(3),l.lc("formGroup",o.form),l.Ab(9),l.Cb(o.iconeSelecionado),l.Ab(2),l.lc("disabled",!o.form.valid),l.Ab(2),l.lc("ngForOf",l.fc(17,16,o.categoriaReceitas)),l.Ab(7),l.Lc(" ",null==o.categoriaSelecionada?null:o.categoriaSelecionada.no_categoria_receita," "),l.Ab(6),l.lc("formGroup",o.form),l.Ab(7),l.Cb(o.iconeSelecionado),l.Ab(4),l.lc("disabled",!o.form.valid),l.Ab(14),l.lc("ngIf",!(null!=o.fontawesomeIconesPorMenu&&o.fontawesomeIconesPorMenu.icons)),l.Ab(2),l.lc("ngIf",null==o.fontawesomeIconesPorMenu?null:o.fontawesomeIconesPorMenu.icons),l.Ab(2),l.lc("ngForOf",null==o.fontawesomeIconesPorMenu?null:o.fontawesomeIconesPorMenu.icons),l.Ab(4),l.lc("disabled",!o.form.valid))},directives:[a.r,a.l,a.f,a.c,a.k,a.e,g.m,v.a,g.n],pipes:[g.h],styles:[".action[_ngcontent-%COMP%]{position:absolute;top:0;right:0;width:100%;text-align:right;display:flex;flex-direction:row-reverse}.action[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{display:flex;align-content:center;width:30px;height:30px;cursor:pointer}.action[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{flex:1;display:flex;align-self:center;align-items:center;justify-content:center}.itemRemove[_ngcontent-%COMP%]{color:#fff;background:#e74a3b}.itemAdd[_ngcontent-%COMP%], .itemRemove[_ngcontent-%COMP%]{border-radius:0 4px 0 0}.itemAdd[_ngcontent-%COMP%]{color:#fff;color:#1ad274}.itemRemove[_ngcontent-%COMP%]:hover{color:#fff;background:#cf3021}.itemAdd[_ngcontent-%COMP%]:hover{color:#fff;background:#07c060}.catPai[_ngcontent-%COMP%]{font-size:2em;margin-bottom:0}.catFilhas[_ngcontent-%COMP%]{font-size:1.3em}.iconeRemoverFilha[_ngcontent-%COMP%]{font-size:.8em;color:#e7e7e7;cursor:pointer;transition:.1s}.iconeRemoverFilha[_ngcontent-%COMP%]:hover{font-size:.85em;color:#f73b29;cursor:pointer}div.form-group.is-empty.col-md-12[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:.6em;font-weight:700}.iconList[_ngcontent-%COMP%]{margin-left:5px}"]}),e}()}],P=function(){function e(){}return e.\u0275mod=l.Kb({type:e}),e.\u0275inj=l.Jb({factory:function(o){return new(o||e)},imports:[[i.a,n.g.forChild(w)]]}),e}()}}]);