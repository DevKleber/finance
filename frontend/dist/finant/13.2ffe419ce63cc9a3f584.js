(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"1sla":function(o,t,i){"use strict";i.r(t),i.d(t,"DetalharModule",(function(){return r}));var a=i("PCNd"),n=i("tyNb"),b=i("IchE"),d=i("fXoL"),e=i("ofXK");function s(o,t){1&o&&d.Nb(0,"div",8)}var c=[{path:"",component:function(){function o(o,t){this.amigosService=o,this.router=t,this.loader=!0}return o.prototype.ngOnInit=function(){this.getAmigos()},o.prototype.getAmigos=function(){var o=this;this.amigosService.getamigosById(this.router.snapshot.params.id).subscribe((function(t){o.amigos=t,o.loader=!1}))},o.\u0275fac=function(t){return new(t||o)(d.Mb(b.a),d.Mb(n.a))},o.\u0275cmp=d.Gb({type:o,selectors:[["app-detalhar"]],decls:29,vars:6,consts:[[1,"row"],[1,"col-md-12"],[1,"box","box-primary"],[1,"box-header","with-border"],[1,"box-title"],["data-example-id","horizontal-dl",1,"bs-example"],[1,"dl-horizontal"],["class","loader",4,"ngIf"],[1,"loader"]],template:function(o,t){1&o&&(d.Sb(0,"div",0),d.Sb(1,"div",1),d.Sb(2,"div",2),d.Sb(3,"div",3),d.Sb(4,"h3",4),d.Gc(5,"Amigos"),d.Rb(),d.Rb(),d.Sb(6,"div",5),d.Sb(7,"dl",6),d.Sb(8,"dt"),d.Gc(9,"id_usuario"),d.Rb(),d.Sb(10,"dd"),d.Gc(11),d.Rb(),d.Sb(12,"dt"),d.Gc(13,"id_pessoa"),d.Rb(),d.Sb(14,"dd"),d.Gc(15),d.Rb(),d.Sb(16,"dt"),d.Gc(17,"created_at"),d.Rb(),d.Sb(18,"dd"),d.Gc(19),d.Rb(),d.Sb(20,"dt"),d.Gc(21,"updated_at"),d.Rb(),d.Sb(22,"dd"),d.Gc(23),d.Rb(),d.Sb(24,"dt"),d.Gc(25,"situacao"),d.Rb(),d.Sb(26,"dd"),d.Gc(27),d.Rb(),d.Rb(),d.Rb(),d.Ec(28,s,1,0,"div",7),d.Rb(),d.Rb(),d.Rb()),2&o&&(d.Ab(11),d.Hc(null==t.amigos?null:t.amigos.id_usuario),d.Ab(4),d.Hc(null==t.amigos?null:t.amigos.id_pessoa),d.Ab(4),d.Hc(null==t.amigos?null:t.amigos.created_at),d.Ab(4),d.Hc(null==t.amigos?null:t.amigos.updated_at),d.Ab(4),d.Hc(null==t.amigos?null:t.amigos.situacao),d.Ab(1),d.jc("ngIf",t.loader))},directives:[e.n],styles:[""]}),o}()}],r=function(){function o(){}return o.\u0275mod=d.Kb({type:o}),o.\u0275inj=d.Jb({factory:function(t){return new(t||o)},imports:[[a.a,n.g.forChild(c)]]}),o}()}}]);