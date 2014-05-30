define("wolf-app/user-mgmt/0.0.1/index",["./user-app","$","underscore","backbone","app-common","app-core","./view/user-mgmt","./collection/user-coll","./model/user-model","./view/user-new-modal","modalEffects","quicksearch","./router/user-router","subroute"],function(a,b,c){c.exports.UserMgmtApp=a("./user-app"),c.exports.UserColl=a("./collection/user-coll"),c.exports.UserModel=a("./model/user-model")}),define("wolf-app/user-mgmt/0.0.1/user-app",["$","underscore","backbone","app-common","app-core","wolf-app/user-mgmt/0.0.1/view/user-mgmt","wolf-app/user-mgmt/0.0.1/collection/user-coll","wolf-app/user-mgmt/0.0.1/model/user-model","wolf-app/user-mgmt/0.0.1/view/user-new-modal","modalEffects","quicksearch","wolf-app/user-mgmt/0.0.1/router/user-router","subroute"],function(a,b,c){a("$"),a("underscore");var d=a("backbone"),e=a("app-common"),f=e.CommonLoading,g=a("app-core").Eventbus,h=a("wolf-app/user-mgmt/0.0.1/view/user-mgmt"),i=a("wolf-app/user-mgmt/0.0.1/view/user-new-modal"),j=new d.Layout({manage:!0,prefix:"user-mgmt/src/tpl/",template:"user-container.html",initialize:function(){g.on("show-loading",this.show_loading,this),g.on("hide-loading",this.hide_loading,this)},afterRender:function(){var a=new h;this.insertView("#user-home",a).render();var b=new i;this.insertView("#user-home",b).render()},show_loading:function(){f.init("#main-content")},hide_loading:function(){f.destroy()}});c.exports={run:function(a){a.show("#main-content",j)},invokeUserRouter:function(){var b=a("wolf-app/user-mgmt/0.0.1/router/user-router");return new b("user-mgmt/",{createTrailingSlashRoutes:!0})}}}),define("wolf-app/user-mgmt/0.0.1/view/user-mgmt",["$","underscore","app-common","app-core","wolf-app/user-mgmt/0.0.1/collection/user-coll","backbone","wolf-app/user-mgmt/0.0.1/model/user-model"],function(a,b,c){a("$"),a("underscore");var d=a("app-common"),e=d.BaseView,f=d.GenericMgmtViewMixin;d.CommonUtils,d.ComponentFacade,a("app-core").Eventbus;var g=a("wolf-app/user-mgmt/0.0.1/collection/user-coll");a("wolf-app/user-mgmt/0.0.1/model/user-model");var h=e.extend({prefix:"user-mgmt/src/tpl/",template:"user-mgmt.html",datatable_id:"user-mgmt-datatable",collection:g,afterRender:function(){g.fetch()}});h.mixin(f),c.exports=h}),define("wolf-app/user-mgmt/0.0.1/collection/user-coll",["$","underscore","backbone","wolf-app/user-mgmt/0.0.1/model/user-model"],function(a,b,c){a("$");var d=a("underscore"),e=a("backbone"),f=a("wolf-app/user-mgmt/0.0.1/model/user-model"),g=e.Collection.extend({model:f,url:"/users",columns:[],data:[],parse:function(a){this.columns=a.aoColumns;for(var b=d.pluck(this.columns,"mData"),c=a.aaData,e=0;e<c.length;e++){var f=new this.model;d.each(b,function(a){f.set(a,c[e][a])}),this.push(f)}return this.models},selected:function(){return this.filter(function(a){return a.get("is_selected")===!0})}});c.exports=new g}),define("wolf-app/user-mgmt/0.0.1/model/user-model",["backbone"],function(a,b,c){var d=a("backbone"),e=d.Model.extend({urlRoot:"/users",defaults:{ug_name:"",ug_desc:"",users:"",enabled:""},toggle_select:function(){this.set({is_selected:!this.get("is_selected")})}});c.exports=e}),define("wolf-app/user-mgmt/0.0.1/view/user-new-modal",["modalEffects","quicksearch","$","underscore","backbone","app-common","wolf-app/user-mgmt/0.0.1/collection/user-coll","wolf-app/user-mgmt/0.0.1/model/user-model"],function(a,b,c){a("modalEffects"),a("quicksearch"),a("$"),a("underscore");var d=a("backbone"),e=a("app-common"),f=e.CommonUtils,g=a("wolf-app/user-mgmt/0.0.1/collection/user-coll"),h=a("wolf-app/user-mgmt/0.0.1/model/user-model"),i=d.View.extend({manage:!0,model:new h,prefix:"user-mgmt/src/tpl/",template:"user-new-modal.html",events:{"click #user-create-action":"create_user"},initialize:function(){},afterRender:function(){f.init_switch(),f.init_multi_select()},new_attributes:function(){return{ug_name:this.$("#ug-name").val().trim(),ug_desc:this.$("#ug-desc").val().trim(),users:this.$("#users").val(),enabled:"on"===this.$("#enabled").val().trim()?"Yes":"No"}},create_user:function(){g.create(this.new_attributes())}});c.exports=i}),define("wolf-app/user-mgmt/0.0.1/router/user-router",["backbone","app-core","subroute"],function(a,b,c){var d=a("backbone"),e=a("app-core").Eventbus;a("subroute");var f=d.SubRoute.extend({initialize:function(){},routes:{"":"home"},home:function(){e.trigger("layout:switch-module-action")}});c.exports=f});
