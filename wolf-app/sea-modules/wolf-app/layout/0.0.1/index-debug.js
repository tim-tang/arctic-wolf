define("wolf-app/layout/0.0.1/index-debug", [ "./layout-app-debug", "nanoscroller-debug", "sparkline-debug", "gritter-debug", "bootstrap-debug", "$-debug", "underscore-debug", "backbone-debug", "app-common-debug", "app-core-debug", "./view/layout-logo-debug", "./view/layout-user-debug", "./view/layout-menu-debug", "./behavior/layout-behavior-debug", "./view/layout-profile-debug", "app-security-debug" ], function(require, exports, module) {
    module.exports.LayoutApp = require("./layout-app-debug");
});

define("wolf-app/layout/0.0.1/layout-app-debug", [ "nanoscroller-debug", "sparkline-debug", "gritter-debug", "bootstrap-debug", "$-debug", "underscore-debug", "backbone-debug", "app-common-debug", "app-core-debug", "wolf-app/layout/0.0.1/view/layout-logo-debug", "wolf-app/layout/0.0.1/view/layout-user-debug", "wolf-app/layout/0.0.1/view/layout-menu-debug", "wolf-app/layout/0.0.1/behavior/layout-behavior-debug", "wolf-app/layout/0.0.1/view/layout-profile-debug", "app-security-debug" ], function(require, exports, module) {
    //- Import dependency js
    require("nanoscroller-debug");
    require("sparkline-debug");
    require("gritter-debug");
    require("bootstrap-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var appCommon = require("app-common-debug");
    var commonUtils = appCommon.CommonUtils;
    var appCore = require("app-core-debug");
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    var layoutLogo = require("wolf-app/layout/0.0.1/view/layout-logo-debug");
    var layoutUser = require("wolf-app/layout/0.0.1/view/layout-user-debug");
    var layoutMenu = require("wolf-app/layout/0.0.1/view/layout-menu-debug");
    var layoutProfile = require("wolf-app/layout/0.0.1/view/layout-profile-debug");
    var layoutApp = new Backbone.Layout({
        retain: true,
        prefix: "layout/src/tpl/",
        template: "layout.html",
        initialize: function() {},
        beforeRender: function() {
            $("#main-body").removeClass("texture");
        },
        afterRender: function() {
            // -- insert layout logo view
            var layoutLogoView = new layoutLogo();
            this.insertView("#layout-logo-user-menu", layoutLogoView).render();
            // -- insert layout user view
            var self = this;
            var layoutUserView = new layoutUser();
            this.insertView("#layout-logo-user-menu", layoutUserView).render().promise().done(function() {
                // -- insert layout menu view
                var layoutMenuView = new layoutMenu();
                self.insertView("#layout-logo-user-menu", layoutMenuView).render();
            });
            // -- insert layout profile view
            var layoutProfileView = new layoutProfile();
            this.insertView("#layout-profile", layoutProfileView).render();
        }
    });
    module.exports = layoutApp;
});

define("wolf-app/layout/0.0.1/view/layout-logo-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var layoutLogo = Backbone.View.extend({
        manage: true,
        prefix: "layout/src/tpl/",
        template: "layout-logo.html"
    });
    module.exports = layoutLogo;
});

define("wolf-app/layout/0.0.1/view/layout-user-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var layoutUser = Backbone.View.extend({
        manage: true,
        prefix: "layout/src/tpl/",
        template: "layout-user.html"
    });
    module.exports = layoutUser;
});

define("wolf-app/layout/0.0.1/view/layout-menu-debug", [ "$-debug", "backbone-debug", "app-core-debug", "wolf-app/layout/0.0.1/behavior/layout-behavior-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var layoutMenu = Backbone.View.extend({
        manage: true,
        prefix: "layout/src/tpl/",
        template: "layout-menu.html",
        initialize: function() {
            eventBus.on("layout:active-menu-item", this.active_menu_item, this);
        },
        events: {
            "click ul.cl-vnavigation li": "active_menu_item"
        },
        afterRender: function() {
            //add layout behavior after loaded complete.
            var layoutBehavior = require("wolf-app/layout/0.0.1/behavior/layout-behavior-debug");
            layoutBehavior.init();
            this.active_menu_item();
        },
        active_menu_item: function(event) {
            if (event) {
                event.preventDefault();
            }
            $("ul.cl-vnavigation li").each(function(index, li) {
                var $clink = li.children[0];
                if ($clink.href == String(window.location)) {
                    $(this).addClass("active");
                } else {
                    $(this).removeClass("active");
                }
            });
        }
    });
    module.exports = layoutMenu;
});

define("wolf-app/layout/0.0.1/behavior/layout-behavior-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var layoutBehavior = {
        init: function() {
            this.init_navigation_menu();
            this.init_small_device_toggle();
            this.init_collapse_sidebar();
            this.init_layout_wrapper();
            this.init_submenu_hover();
            this.init_layout_misc();
        },
        init_navigation_menu: function() {
            /*NAVIGATION MENU*/
            $(".cl-vnavigation li ul").each(function() {
                $(this).parent().addClass("parent");
            });
            $(".cl-vnavigation li ul li.active").each(function() {
                $(this).parent().css({
                    display: "block"
                });
                $(this).parent().parent().addClass("open");
            });
            $(".cl-vnavigation").delegate(".parent > a", "click", function(e) {
                $(".cl-vnavigation .parent.open > ul").not($(this).parent().find("ul")).slideUp(300, "swing", function() {
                    $(this).parent().removeClass("open");
                });
                var ul = $(this).parent().find("ul");
                ul.slideToggle(300, "swing", function() {
                    var p = $(this).parent();
                    if (p.hasClass("open")) {
                        p.removeClass("open");
                    } else {
                        p.addClass("open");
                    }
                    $("#cl-wrapper .nscroller").nanoScroller({
                        preventPageScrolling: true
                    });
                });
                e.preventDefault();
            });
        },
        init_small_device_toggle: function() {
            /*Small devices toggle*/
            $(".cl-toggle").click(function(e) {
                var ul = $(".cl-vnavigation");
                ul.slideToggle(300, "swing", function() {});
                e.preventDefault();
            });
        },
        init_collapse_sidebar: function() {
            /*Collapse sidebar*/
            var self = this;
            $("#sidebar-collapse").click(function() {
                self.toggleSideBar(this);
            });
        },
        init_layout_wrapper: function() {
            if ($("#cl-wrapper").hasClass("fixed-menu")) {
                var scroll = $("#cl-wrapper .menu-space");
                scroll.addClass("nano nscroller");
                function update_height() {
                    var button = $("#cl-wrapper .collapse-button");
                    var collapseH = button.outerHeight();
                    var navH = $("#head-nav").height();
                    var height = $(window).height() - (button.is(":visible") ? collapseH : 0);
                    scroll.css("height", height);
                    $("#cl-wrapper .nscroller").nanoScroller({
                        preventPageScrolling: true
                    });
                }
                $(window).resize(function() {
                    update_height();
                });
                update_height();
                $("#cl-wrapper .nscroller").nanoScroller({
                    preventPageScrolling: true
                });
            }
        },
        init_submenu_hover: function() {
            /*SubMenu hover */
            var tool = $("<div id='sub-menu-nav' style='position:fixed;z-index:9999;'></div>");
            function showMenu(_this, e) {
                if (($("#cl-wrapper").hasClass("sb-collapsed") || $(window).width() > 755 && $(window).width() < 963) && $("ul", _this).length > 0) {
                    $(_this).removeClass("ocult");
                    var menu = $("ul", _this);
                    if (!$(".dropdown-header", _this).length) {
                        var head = '<li class="dropdown-header">' + $(_this).children().html() + "</li>";
                        menu.prepend(head);
                    }
                    tool.appendTo("body");
                    var top = $(_this).offset().top + 8 - $(window).scrollTop();
                    var left = $(_this).width();
                    tool.css({
                        top: top,
                        left: left + 8
                    });
                    tool.html('<ul class="sub-menu">' + menu.html() + "</ul>");
                    tool.show();
                    menu.css("top", top);
                } else {
                    tool.hide();
                }
            }
            $(".cl-vnavigation li").hover(function(e) {
                showMenu(this, e);
            }, function(e) {
                tool.removeClass("over");
                setTimeout(function() {
                    if (!tool.hasClass("over") && !$(".cl-vnavigation li:hover").length > 0) {
                        tool.hide();
                    }
                }, 500);
            });
            tool.hover(function(e) {
                $(this).addClass("over");
            }, function() {
                $(this).removeClass("over");
                tool.fadeOut("fast");
            });
            $(document).click(function() {
                tool.hide();
            });
            $(document).on("touchstart click", function(e) {
                tool.fadeOut("fast");
            });
            tool.click(function(e) {
                e.stopPropagation();
            });
            $(".cl-vnavigation li").click(function(e) {
                if (($("#cl-wrapper").hasClass("sb-collapsed") || $(window).width() > 755 && $(window).width() < 963) && $("ul", this).length > 0 && !($(window).width() < 755)) {
                    showMenu(this, e);
                    e.stopPropagation();
                    e.preventDefault();
                }
            });
        },
        init_layout_misc: function() {
            /*Return to top*/
            var offset = 220;
            var duration = 500;
            var button = $('<a href="#" class="back-to-top"><i class="fa fa-angle-up"></i></a>');
            button.appendTo("body");
            jQuery(window).scroll(function() {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery(".back-to-top").fadeIn(duration);
                } else {
                    jQuery(".back-to-top").fadeOut(duration);
                }
            });
            jQuery(".back-to-top").click(function(event) {
                event.preventDefault();
                jQuery("html, body").animate({
                    scrollTop: 0
                }, duration);
                return false;
            });
            /*Datepicker UI*/
            //$(".ui-datepicker").datepicker();
            /*Tooltips*/
            $('.ttip, [data-toggle="tooltip"]').tooltip();
            /*Popover*/
            $('[data-popover="popover"]').popover();
            /*NanoScroller*/
            $(".nscroller").nanoScroller();
            /*Bind plugins on hidden elements*/
            /*Dropdown shown event*/
            $(".dropdown").on("shown.bs.dropdown", function() {
                $(".nscroller").nanoScroller();
            });
            /*Tabs refresh hidden elements*/
            $(".nav-tabs").on("shown.bs.tab", function(e) {
                $(".nscroller").nanoScroller();
            });
        },
        //Functions
        toggleSideBar: function(_this) {
            var b = $("#sidebar-collapse")[0];
            var w = $("#cl-wrapper");
            var s = $(".cl-sidebar");
            if (w.hasClass("sb-collapsed")) {
                $(".fa", b).addClass("fa-angle-left").removeClass("fa-angle-right");
                w.removeClass("sb-collapsed");
            } else {
                $(".fa", b).removeClass("fa-angle-left").addClass("fa-angle-right");
                w.addClass("sb-collapsed");
            }
        }
    };
    module.exports = layoutBehavior;
});

define("wolf-app/layout/0.0.1/view/layout-profile-debug", [ "backbone-debug", "app-core-debug", "app-security-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var authenticationProvider = require("app-security-debug").AuthenticationProvider;
    var layoutProfile = Backbone.View.extend({
        manage: true,
        prefix: "layout/src/tpl/",
        template: "layout-profile.html",
        events: {
            "click #sign-out": "sign_out"
        },
        sign_out: function(e) {
            e.preventDefault();
            authenticationProvider.signout(function() {
                eventBus.trigger("layout:discard-layout-action");
                Backbone.history.navigate("security/login", true);
            });
        }
    });
    module.exports = layoutProfile;
});
