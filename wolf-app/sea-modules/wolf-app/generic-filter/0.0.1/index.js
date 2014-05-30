define("wolf-app/generic-filter/0.0.1/index",["./generic-filter-app","backbone","app-common","app-core","./view/generic-filter","$","./collection/generic-filter-coll","underscore","./collection/generic-record-coll","./model/generic-record-model","./view/generic-record-container","./view/generic-records","./router/generic-filter-router","subroute"],function(a,b,c){c.exports.GenericFilterApp=a("./generic-filter-app")}),define("wolf-app/generic-filter/0.0.1/generic-filter-app",["backbone","app-common","app-core","wolf-app/generic-filter/0.0.1/view/generic-filter","$","wolf-app/generic-filter/0.0.1/collection/generic-filter-coll","underscore","wolf-app/generic-filter/0.0.1/collection/generic-record-coll","wolf-app/generic-filter/0.0.1/model/generic-record-model","wolf-app/generic-filter/0.0.1/view/generic-record-container","wolf-app/generic-filter/0.0.1/view/generic-records","wolf-app/generic-filter/0.0.1/router/generic-filter-router","subroute"],function(a,b,c){var d=a("backbone"),e=a("app-common"),f=e.CommonLoading,g=a("app-core").Eventbus,h=a("wolf-app/generic-filter/0.0.1/view/generic-filter"),i=a("wolf-app/generic-filter/0.0.1/view/generic-record-container");a("underscore");var j=new d.Layout({manage:!0,prefix:"generic-filter/src/tpl/",template:"generic-filter-container.html",initialize:function(){g.on("generic-filter:show-loading",this.show_loading,this),g.on("generic-filter:hide-loading",this.hide_loading,this)},afterRender:function(){var a=new h({el:"#generic-filter-home"});this.insertView(a).render();var b=new i({el:"#generic-records-home"});this.insertView(b).render()},show_loading:function(a){f.init(a)},hide_loading:function(){f.destroy()}});c.exports={run:function(a){a.show("#main-content",j)},invokeGenericFilterRouter:function(){var b=a("wolf-app/generic-filter/0.0.1/router/generic-filter-router");return new b("generic-filter/",{createTrailingSlashRoutes:!0})}}}),define("wolf-app/generic-filter/0.0.1/view/generic-filter",["$","backbone","app-core","wolf-app/generic-filter/0.0.1/collection/generic-filter-coll","underscore","app-common","wolf-app/generic-filter/0.0.1/collection/generic-record-coll","wolf-app/generic-filter/0.0.1/model/generic-record-model"],function(a,b,c){var d=a("$"),e=a("backbone"),f=a("app-core").Eventbus,g=a("wolf-app/generic-filter/0.0.1/collection/generic-filter-coll"),h=a("wolf-app/generic-filter/0.0.1/collection/generic-record-coll"),i=e.View.extend({manage:!0,prefix:"generic-filter/src/tpl/",template:"generic-filter.html",events:{"click #generic-filter-btn":"filter_records"},initialize:function(a){this.selector=a.el,this.listenTo(g,"request",this.show_loading),this.listenTo(g,"sync",this.hide_loading)},show_loading:function(){f.trigger("generic-filter:show-loading",this.selector)},hide_loading:function(){f.trigger("generic-filter:hide-loading")},afterRender:function(){g.fetch()},filter_records:function(a){a.preventDefault(),h.fetch({data:d.param({q:"audi"})})}});c.exports=i}),define("wolf-app/generic-filter/0.0.1/collection/generic-filter-coll",["backbone","underscore","app-common"],function(a,b,c){var d=a("backbone");a("underscore");var e=a("app-common").ComponentFacade,f=d.Collection.extend({url:"/generic-filter",parse:function(a){e.init_by_component_settings(a.component_settings)}});c.exports=new f}),define("wolf-app/generic-filter/0.0.1/collection/generic-record-coll",["backbone","underscore","wolf-app/generic-filter/0.0.1/model/generic-record-model"],function(a,b,c){var d=a("backbone");a("underscore");var e=a("wolf-app/generic-filter/0.0.1/model/generic-record-model"),f=d.Collection.extend({url:"/generic-records/filter",model:e});c.exports=new f}),define("wolf-app/generic-filter/0.0.1/model/generic-record-model",["backbone"],function(a,b,c){var d=a("backbone"),e=d.Model.extend({url:"/generic-records",defaults:{name:"",image:"",price:"",desc:""}});c.exports=e}),define("wolf-app/generic-filter/0.0.1/view/generic-record-container",["$","underscore","backbone","app-core","wolf-app/generic-filter/0.0.1/collection/generic-record-coll","wolf-app/generic-filter/0.0.1/model/generic-record-model","wolf-app/generic-filter/0.0.1/view/generic-records"],function(a,b,c){var d=a("$");a("underscore");var e,f=a("backbone"),g=a("app-core").Eventbus,h=a("wolf-app/generic-filter/0.0.1/collection/generic-record-coll"),i=a("wolf-app/generic-filter/0.0.1/view/generic-records"),j=f.View.extend({manage:!0,prefix:"generic-filter/src/tpl/",template:"generic-record-container.html",initialize:function(a){this.selector=a.el,this.listenTo(h,"request",this.show_loading),this.listenTo(h,"sync",this.filter_complete)},afterRender:function(){h.fetch({data:d.param({q:"audi"})})},filter_complete:function(){e=new i({el:"#generic-filter-records",records:h.models}),this.insertView(e).render(),g.trigger("generic-filter:hide-loading")},show_loading:function(){g.trigger("generic-filter:show-loading",this.selector)},cleanup:function(){this.undelegateEvents(),e.remove()}});c.exports=j}),define("wolf-app/generic-filter/0.0.1/view/generic-records",["$","backbone","underscore","app-core"],function(a,b,c){a("$");var d=a("backbone"),e=a("underscore");a("app-core").Eventbus;var f=d.View.extend({manage:!0,prefix:"generic-filter/src/tpl/",template:"generic-records.html",initialize:function(a){this.records=a.records},afterRender:function(){},serialize:function(){return{records:e.chain(this.records)}}});c.exports=f}),define("wolf-app/generic-filter/0.0.1/router/generic-filter-router",["backbone","app-core","subroute"],function(a,b,c){var d=a("backbone"),e=a("app-core").Eventbus;a("subroute");var f=d.SubRoute.extend({initialize:function(){},routes:{"":"home"},home:function(){e.trigger("layout:switch-module-action")}});c.exports=f});
