(function($) {
    'use strict';

    /**
    * Pages.
     * @constructor
     * @property {string}  VERSION      - Build Version.
     * @property {string}  AUTHOR       - Author.
     * @property {string}  SUPPORT      - Support Email.
     * @property {string}  pageScrollElement  - Scroll Element in Page.
     * @property {object}  $body - Cache Body.
     */
    var Pages = function() {
        this.VERSION = "3.0.0";
        this.AUTHOR = "Revox";
        this.SUPPORT = "support@revox.io";

        this.pageScrollElement = 'html, body';
        this.$body = $('body');

        this.setUserOS();
        this.setUserAgent();
    }

    /** @function setUserOS
    * @description SET User Operating System eg: mac,windows,etc
    * @returns {string} - Appends OSName to Pages.$body
    */
    Pages.prototype.setUserOS = function() {
        var OSName = "";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
        if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
        if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";

        this.$body.addClass(OSName);
    }

    /** @function setUserAgent
    * @description SET User Device Name to mobile | desktop
    * @returns {string} - Appends Device to Pages.$body
    */
    Pages.prototype.setUserAgent = function() {
        if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
            this.$body.addClass('mobile');
        } else {
            this.$body.addClass('desktop');
            if (navigator.userAgent.match(/MSIE 9.0/)) {
                this.$body.addClass('ie9');
            }
        }
    }

    /** @function isVisibleXs
    * @description Checks if the screen size is XS - Extra Small i.e below W480px
    * @returns {$Element} - Appends $('#pg-visible-xs') to Body
    */
    Pages.prototype.isVisibleXs = function() {
        (!$('#pg-visible-xs').length) && this.$body.append('<div id="pg-visible-xs" class="visible-xs" />');
        return $('#pg-visible-xs').is(':visible');
    }

    /** @function isVisibleSm
    * @description Checks if the screen size is SM - Small Screen i.e Above W480px
    * @returns {$Element} - Appends $('#pg-visible-sm') to Body
    */
    Pages.prototype.isVisibleSm = function() {
        (!$('#pg-visible-sm').length) && this.$body.append('<div id="pg-visible-sm" class="visible-sm" />');
        return $('#pg-visible-sm').is(':visible');
    }

    /** @function isVisibleMd
    * @description Checks if the screen size is MD - Medium Screen i.e Above W1024px
    * @returns {$Element} - Appends $('#pg-visible-md') to Body
    */
    Pages.prototype.isVisibleMd = function() {
        (!$('#pg-visible-md').length) && this.$body.append('<div id="pg-visible-md" class="visible-md" />');
        return $('#pg-visible-md').is(':visible');
    }

    /** @function isVisibleLg
    * @description Checks if the screen size is LG - Large Screen i.e Above W1200px
    * @returns {$Element} - Appends $('#pg-visible-lg') to Body
    */
    Pages.prototype.isVisibleLg = function() {
        (!$('#pg-visible-lg').length) && this.$body.append('<div id="pg-visible-lg" class="visible-lg" />');
        return $('#pg-visible-lg').is(':visible');
    }

    /** @function getUserAgent
    * @description Get Current User Agent.
    * @returns {string} - mobile | desktop
    */
    Pages.prototype.getUserAgent = function() {
        return $('body').hasClass('mobile') ? "mobile" : "desktop";
    }

    /** @function setFullScreen
    * @description Make Browser fullscreen.
    */
    Pages.prototype.setFullScreen = function(element) {
        // Supports most browsers and their versions.
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

        if (requestMethod) { // Native full screen.
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    /** @function getColor
    * @description Get Color from CSS
    * @param {string} color - pages color class eg: primary,master,master-light etc.
    * @param {int} opacity
    * @returns {rgba}
    */
    Pages.prototype.getColor = function(color, opacity) {
        opacity = parseFloat(opacity) || 1;

        var elem = $('.pg-colors').length ? $('.pg-colors') : $('<div class="pg-colors"></div>').appendTo('body');

        var colorElem = elem.find('[data-color="' + color + '"]').length ? elem.find('[data-color="' + color + '"]') : $('<div class="bg-' + color + '" data-color="' + color + '"></div>').appendTo(elem);

        var color = colorElem.css('background-color');

        var rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        var rgba = "rgba(" + rgb[1] + ", " + rgb[2] + ", " + rgb[3] + ', ' + opacity + ')';

        return rgba;
    }

    /** @function initSidebar
    * @description Initialize side bar to open and close
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    * @requires ui/sidebar.js
    */
    Pages.prototype.initSidebar = function(context) {
        $('[data-pages="sidebar"]', context).each(function() {
            var $sidebar = $(this)
            $sidebar.sidebar($sidebar.data())
        })
    }

    /** @function initDropDown
    * @description Initialize Boot-Strap dropdown Menue
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    * @requires bootstrap.js
    */
    Pages.prototype.initDropDown = function(context) {
        // adjust width of each dropdown to match content width
        $('.dropdown-default', context).each(function() {
            var btn = $(this).find('.dropdown-menu').siblings('.dropdown-toggle');
            var offset = 0;

            var menuWidth = $(this).find('.dropdown-menu').actual('outerWidth');

            if (btn.actual('outerWidth') < menuWidth) {
                btn.width(menuWidth - offset);
                $(this).find('.dropdown-menu').width(btn.actual('outerWidth'));
            } else {
                $(this).find('.dropdown-menu').width(btn.actual('outerWidth'));
            }
        });
    }

    /** @function initFormGroupDefault
    * @description Initialize Pages form group input
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    */
    Pages.prototype.initFormGroupDefault = function(context) {
        $('.form-group.form-group-default', context).click(function() {
            $(this).find('input').focus();
        });

        if (!this.initFormGroupDefaultRun) {
            $('body').on('focus', '.form-group.form-group-default :input', function() {
                $('.form-group.form-group-default').removeClass('focused');
                $(this).parents('.form-group').addClass('focused');
            });

            $('body').on('blur', '.form-group.form-group-default :input', function() {
                $(this).parents('.form-group').removeClass('focused');
                if ($(this).val()) {
                    $(this).closest('.form-group').find('label').addClass('fade');
                } else {
                    $(this).closest('.form-group').find('label').removeClass('fade');
                }
            });

            // Only run the above code once.
            this.initFormGroupDefaultRun = true;
        }

        $('.form-group.form-group-default .checkbox, .form-group.form-group-default .radio', context).hover(function() {
            $(this).parents('.form-group').addClass('focused');
        }, function() {
            $(this).parents('.form-group').removeClass('focused');
        });
    }

    /** @function initSlidingTabs
    * @description Initialize Bootstrap Custom Sliding Tabs
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    * @requires bootstrap.js
    */
    Pages.prototype.initSlidingTabs = function(context) {
        $('a[data-toggle="tab"]', context).on('show.bs.tab', function(e) {
            e = $(e.target).parent().find('a[data-toggle=tab]');

            var hrefCurrent = e.data('target');
            if(hrefCurrent === undefined){
                hrefCurrent = e.attr('href');
            }

            if (!$(hrefCurrent).is('.slide-left, .slide-right')) return;
            $(hrefCurrent).addClass('sliding');

            setTimeout(function() {
                $(hrefCurrent).removeClass('sliding');
            }, 100);
        });
    }
    /** @function reponsiveTabs
    * @description Responsive handlers for Bootstrap Tabs
    */
   Pages.prototype.reponsiveTabs = function() {
        //Dropdown FX
        $('[data-init-reponsive-tabs="dropdownfx"]').each(function() {
        var drop = $(this);
        drop.addClass("d-none d-md-flex d-lg-flex d-xl-flex");
        var content = '<select class="cs-select cs-skin-slide full-width" data-init-plugin="cs-select">'
        for(var i = 1; i <= drop.children("li").length; i++){
            var li = drop.children("li:nth-child("+i+")");
            var selected ="";
            if(li.children('a').hasClass("active")){
                selected="selected";
            }
            var tabRef = li.children('a').attr('href');
            if(tabRef == "#" || ""){
                tabRef = li.children('a').attr('data-target')
            }
            content +='<option value="'+ tabRef+'" '+selected+'>';
            content += li.children('a').text();
            content += '</option>';
        }
        content +='</select>'
        drop.after(content);
        var select = drop.next()[0];
        $(select).on('change', function (e) {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;
            var tabLink = drop.find('a[data-target="'+valueSelected+'"]');
            if(tabLink.length == 0){
                tabLink = drop.find('a[data-target="'+valueSelected+'"]')
            }
            tabLink.tab('show')
        })
        $(select).wrap('<div class="nav-tab-dropdown cs-wrapper full-width d-lg-none d-xl-none d-md-none"></div>');
        new SelectFx(select);
        });
    }
    /** @function initNotificationCenter
    * @description Initialize Pages Header Notifcation Dropdown
    */
    Pages.prototype.initNotificationCenter = function() {
        $('body').on('click', '.notification-list .dropdown-menu', function(event) {
            event.stopPropagation();
        });
        $('body').on('click', '.toggle-more-details', function(event) {
            var p = $(this).closest('.heading');
            p.closest('.heading').children('.more-details').stop().slideToggle('fast', function() {
                p.toggleClass('open');
            });
        });
    }

    /** @function initProgressBars
    * @description Initialize Pages ProgressBars
    */
    Pages.prototype.initProgressBars = function() {
        $(window).on('load', function() {
            // Hack: FF doesn't play SVG animations set as background-image
            $('.progress-bar-indeterminate, .progress-circle-indeterminate, .mapplic-pin').hide().show(0);
        });
    }

    /** @function initInputFile
    * @description Initialize File Input for Bootstrap Buttons and Input groups
    */
    Pages.prototype.initInputFile = function() {
        $(document).on('change', '.btn-file :file', function() {
            var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });

        $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;
            if( input.length ) {
                input.val(log);
            } else {
                $(this).parent().html(log);
            }
        });
    }
    /** @function initHorizontalMenu
    * @description Initialize Horizontal Dropdown Menu
    */
    Pages.prototype.initHorizontalMenu = function(){
        var animationTimer;

        var hMenu = $("[data-pages-init='horizontal-menu']");
        autoHideLi();
        $(document).on('click', '.menu-bar > ul > li', function(){
            if($(this).children("ul").length == 0){
                return;
            }
            if($(window).width() < 992) {
              var menubar = $('.menu-bar');
              var el = $(this);
              var li = menubar.find('li');
              var sub = $(this).children('ul');

              if(el.hasClass("open active")){
                 el.find('.arrow').removeClass("open active");
                 sub.slideUp(200, function() {
                     el.removeClass("open active");
                 });

              }else{
                 menubar.find('li.open').find('ul').slideUp(200);
                 menubar.find('li.open').find('a').find('.arrow').removeClass('open active');
                 menubar.find('li.open').removeClass("open active");
                 el.find('.arrow').addClass("open active");
                 sub.slideDown(200, function() {
                     el.addClass("open active");
                 });
              }
            } else {
              if($(this).hasClass('opening')){
                   _hideMenu($(this));
              }
              else{
                  _showMenu($(this));
              }
            }

        });

        var resizeTimer;
        $(window).on('resize', function(e) {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            autoHideLi();
          }, 250);
        });

        $('.content').on('click', function () {
            $('.horizontal-menu .bar-inner > ul > li').removeClass('open');
            $('.menu-bar > ul > li').removeClass('open opening').children("ul").removeAttr("style");
            $("body").find(".ghost-nav-dropdown").remove();
        });

        $('[data-toggle="horizontal-menu"]').on('click touchstart', function(e) {
            e.preventDefault();
            $('body').toggleClass('horizontal-menu-open');
            if(!$('.horizontal-menu-backdrop').length){
              $('.header').append('<div class="horizontal-menu-backdrop"/>');
              $('.horizontal-menu-backdrop').fadeToggle('fast');
            } else {
              $('.horizontal-menu-backdrop').fadeToggle('fast', function(){
                $(this).remove();
              });
            }

            $('.menu-bar').toggleClass('open');
        });

        function autoHideLi(){
            var hMenu  = $("[data-pages-init='horizontal-menu']");
            var extraLiHide = parseInt(hMenu.data("hideExtraLi")) || 0
            if(hMenu.length == 0){
                return
            }
            var hMenuRect = hMenu[0].getBoundingClientRect();
            var liTotalWidth = 0;
            var liCount = 0;
            hMenu.children('ul').children('li.more').remove();
            hMenu.children('ul').children('li').each(function( index ) {
                $(this).removeAttr("style");
                liTotalWidth = liTotalWidth + $(this).outerWidth(true);
                liCount++;
            });

            if($(window).width() < 992) {
              return;
            }

            var possibleLi = parseInt(hMenuRect.width / (liTotalWidth / liCount)) - 1;
            possibleLi = possibleLi - extraLiHide;

            if(liCount > possibleLi){
                var wrapper = createWrapperLI(hMenu);
                for(var i = possibleLi; i < liCount; i++){
                    var currentLi = hMenu.children('ul').children('li').eq(i);
                    var clone = currentLi.clone();
                    clone.children("ul").addClass("sub-menu");
                    wrapper.children("ul").append(clone);
                    currentLi.hide();
                }
            }

        }

        function createWrapperLI(hMenu){
            var li =hMenu.children('ul').append("<li class='more'><a href='javascript:;'><span class='title'><i class='pg pg-more'></i></span></a><ul></ul></li>");
            li = hMenu.children('ul').children('li.more');
            return li;
        }

        function _hideMenu($el){
            var ul  = $($el.children("ul")[0]);
            var ghost = $("<div class='ghost-nav-dropdown'></div>");
            if(ul.length == 0){
                return;
            }
            var rect = ul[0].getBoundingClientRect();
            ghost.css({
                "width":rect.width+"px",
                "height":rect.height+"px",
                "z-index":"auto"
            })
            $el.append(ghost);
            var timingSpeed = ul.children("li").css('transition-duration');

            timingSpeed = parseInt(parseFloat(timingSpeed) * 1000);
            $el.addClass('closing');
            window.clearTimeout(animationTimer);
            animationTimer = window.setTimeout(function(){
                ghost.height(0);
                $el.removeClass('open opening closing');
            },timingSpeed - 80);
        }
        function _showMenu($el){

            var ul  = $($el.children("ul")[0]);
            var ghost = $("<div class='ghost-nav-dropdown'></div>");
            $el.children(".ghost-nav-dropdown").remove();
            $el.addClass('open').siblings().removeClass('open opening');
            if(ul.length == 0){
                return;
            }
            var rect = ul[0].getBoundingClientRect();
            ghost.css({
                "width":rect.width+"px",
                "height":"0px"
            });
            $el.append(ghost);
            ghost.height(rect.height);
            var timingSpeed = ghost.css('transition-duration');

            timingSpeed = parseInt(parseFloat(timingSpeed) * 1000)
            window.clearTimeout(animationTimer);
            animationTimer = window.setTimeout(function(){
                $el.addClass('opening');
                ghost.remove()
            },timingSpeed);
        }
    }
    /** @function initTooltipPlugin
    * @description Initialize Bootstrap tooltip
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    * @requires bootstrap.js
    */
    Pages.prototype.initTooltipPlugin = function(context) {
        $.fn.tooltip && $('[data-toggle="tooltip"]', context).tooltip();
    }
    /** @function initSelect2Plugin
    * @description Initialize select2 dropdown
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    * @requires select2.js version 4.0.x
    */
    Pages.prototype.initSelect2Plugin = function(context) {
        $.fn.select2 && $('[data-init-plugin="select2"]', context).each(function() {
            $(this).select2({
                minimumResultsForSearch: ($(this).attr('data-disable-search') == 'true' ? -1 : 1)
            }).on('select2:open', function() {
                $.fn.scrollbar && $('.select2-results__options').scrollbar({
                    ignoreMobile: false
                })
            });
        });
    }
    /** @function initScrollBarPlugin
    * @description Initialize Global Scroller
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    * @requires jquery-scrollbar.js
    */
    Pages.prototype.initScrollBarPlugin = function(context) {
        $.fn.scrollbar && $('.scrollable', context).scrollbar({
            ignoreOverlay: false
        });
    }
    /** @function initListView
    * @description Initialize iOS like List view plugin
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    * @example <caption>data-init-list-view="ioslist"</caption>
    * @requires jquery-ioslist.js
    */
    Pages.prototype.initListView = function(context) {
        $.fn.ioslist && $('[data-init-list-view="ioslist"]', context).ioslist();
        $.fn.scrollbar && $('.list-view-wrapper', context).scrollbar({
            ignoreOverlay: false
        });
    }

    /** @function initSwitcheryPlugin
    * @description Initialize iOS like List view plugin
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    * @example <caption>data-init-plugin="switchery"</caption>
    * @requires Switchery.js
    */
    Pages.prototype.initSwitcheryPlugin = function(context) {
        // Switchery - ios7 switch
        window.Switchery && $('[data-init-plugin="switchery"]', context).each(function() {
            var el = $(this);
            new Switchery(el.get(0), {
                color: (el.data("color") != null ?  $.Pages.getColor(el.data("color")) : $.Pages.getColor('success')),
                size : (el.data("size") != null ?  el.data("size") : "default")
            });
        });
    }

    /** @function initSelectFxPlugin
    * @description Initialize iOS like List view plugin
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    * @example <caption>select[data-init-plugin="cs-select"]</caption>
    */
    Pages.prototype.initSelectFxPlugin = function(context) {
        window.SelectFx && $('select[data-init-plugin="cs-select"]', context).each(function() {
            var el = $(this).get(0);
            $(el).wrap('<div class="cs-wrapper"></div>');
            new SelectFx(el);
        });
    }
    /** @function initUnveilPlugin
    * @description To load retina images to img tag
    * @param {(Element|JQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
    */
    Pages.prototype.initUnveilPlugin = function(context) {
        // lazy load retina images
        $.fn.unveil && $("img", context).unveil();
    }

    /** @function initValidatorPlugin
    * @description Inintialize and Overide exsisting jquery-validate methods.
    * @requires jquery-validate.js
    */
    Pages.prototype.initValidatorPlugin = function() {
        /**
         * Open the socket.
         * @override
         */
        $.validator && $.validator.setDefaults({
            ignore: "", // validate hidden fields, required for cs-select
            showErrors: function(errorMap, errorList) {
                var $this = this;
                $.each(this.successList, function(index, value) {
                    var parent = $(this).closest('.form-group-attached');
                    if (parent.length) return $(value).popover("hide");
                });
                return $.each(errorList, function(index, value) {

                    var parent = $(value.element).closest('.form-group-attached');
                    if (!parent.length) {
                        return $this.defaultShowErrors();
                    }
                    var _popover;
                    _popover = $(value.element).popover({
                        trigger: "manual",
                        placement: "top",
                        html: true,
                        container: parent.closest('form'),
                        content: value.message
                    });
                    var parent = $(value.element).closest('.form-group');
                    parent.addClass('has-error');
                    $(value.element).popover("show");
                });
            },
            onfocusout: function(element) {
                var parent = $(element).closest('.form-group');
                if ($(element).valid()) {
                    parent.removeClass('has-error');
                    parent.next('.error').remove();
                }
            },
            onkeyup: function(element) {
                var parent = $(element).closest('.form-group');
                if ($(element).valid()) {
                    $(element).removeClass('error');
                    parent.removeClass('has-error');
                    parent.next('label.error').remove();
                    parent.find('label.error').remove();
                } else {
                    parent.addClass('has-error');
                }
            },
            errorPlacement: function(error, element) {
                var parent = $(element).closest('.form-group');
                if (parent.hasClass('form-group-default')) {
                    parent.addClass('has-error');
                    error.insertAfter(parent);
                } else if(element.parent().hasClass('checkbox')) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });
    }

    /** @function setBackgroundImage
    * @description load images to div using data API
    */
    Pages.prototype.setBackgroundImage = function() {
        $('[data-pages-bg-image]').each(function() {
            var _elem = $(this)
            var defaults = {
                pagesBgImage: "",
                lazyLoad: 'true',
                progressType: '',
                progressColor:'',
                bgOverlay:'',
                bgOverlayClass:'',
                overlayOpacity:0,
            }
            var data = _elem.data();
            $.extend( defaults, data );
            var url = defaults.pagesBgImage;
            var color = defaults.bgOverlay;
            var opacity = defaults.overlayOpacity;

            var overlay = $('<div class="bg-overlay"></div>');
            overlay.addClass(defaults.bgOverlayClass);
            overlay.css({
                'background-color': color,
                'opacity': 1
            });
            _elem.append(overlay);

            var img = new Image();
            img.src = url;
            img.onload = function(){
                _elem.css({
                    'background-image': 'url(' + url + ')'
                });
                _elem.children('.bg-overlay').css({'opacity': opacity});
            }

        })
    }
    /** @function secondarySidebar
    * @description dropdown Toggle and responive toggle for secondary sidebar
    */
    Pages.prototype.secondarySidebar =function(){
        $('[data-init="secondary-sidebar"]').each(function() {
            $(this).on('click', '.main-menu li a', function(e) {

             if ($(this).parent().children('.sub-menu') === false) {
                 return;
             }
             var el = $(this);
             var parent = $(this).parent().parent();
             var li = $(this).parent();
             var sub = $(this).parent().children('.sub-menu');

             if(li.hasClass("open active")){
                el.children('.arrow').removeClass("open active");
                sub.slideUp(200, function() {
                    li.removeClass("open active");
                });

             }else{
                parent.children('li.open').children('.sub-menu').slideUp(200);
                parent.children('li.open').children('a').children('.arrow').removeClass('open active');
                parent.children('li.open').removeClass("open active");
                el.children('.arrow').addClass("open active");
                sub.slideDown(200, function() {
                    li.addClass("open active");

                });
             }
             //e.preventDefault();
            });

        });

        $('[data-init="secondary-sidebar-toggle"]').each(function() {
            $(this).on("click", function(e) {
                var toggleRect = $(this).get(0).getBoundingClientRect();
                var menu  = $('[data-init="secondary-sidebar"]');
                if(menu.hasClass("open")){
                    menu.removeClass("open");
                    menu.removeAttr("style");
                }
                else{
                    menu.addClass("open")
                    var menuRect = menu.get(0).getBoundingClientRect();
                    menu.css({
                        top : toggleRect.bottom,
                        'max-height':  ($(window).height() - toggleRect.bottom),
                        left: $(window).width() / 2 - menuRect.width/ 2,
                        'visibility': 'visible'
                    });

                }
            })

        });

    }
    /** @function init
    * @description Inintialize all core components.
    */
    Pages.prototype.init = function() {
        // init layout
        this.initSidebar();
        this.setBackgroundImage();
        this.initDropDown();
        this.initFormGroupDefault();
        this.initSlidingTabs();
        this.initNotificationCenter();
        this.initProgressBars();
        this.initHorizontalMenu();
        // init plugins
        this.initTooltipPlugin();
        this.initSelect2Plugin();
        this.initScrollBarPlugin();
        this.initSwitcheryPlugin();
        this.initSelectFxPlugin();
        this.initUnveilPlugin();
        this.initValidatorPlugin();
        this.initListView();
        this.initInputFile();
        this.reponsiveTabs();
        this.secondarySidebar();
    }

    $.Pages = new Pages();
    $.Pages.Constructor = Pages;

})(window.jQuery);

/**
 * selectFx.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;
(function(window) {

    'use strict';

    /**
     * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
     */
    function hasParent(e, p) {
        if (!e) return false;
        var el = e.target || e.srcElement || e || false;
        while (el && el != p) {
            el = el.parentNode || false;
        }
        return (el !== false);
    };

    /**
     * extend obj function
     */
    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
     * SelectFx function
     */
    function SelectFx(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    /**
     * Pure-JS alternative to jQuery closest()
     */
    function closest(elem, selector) {
        var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
        while (elem) {
            if (matchesSelector.bind(elem)(selector)) {
                return elem;
            } else {
                elem = elem.parentElement;
            }
        }
        return false;
    }

    /**
     * jQuery offset() in pure JS
     */
    function offset(el) {
        return {
            left: el.getBoundingClientRect().left + window.pageXOffset - el.ownerDocument.documentElement.clientLeft,
            top: el.getBoundingClientRect().top + window.pageYOffset - el.ownerDocument.documentElement.clientTop
        }

    }

    /**
     * jQuery after() in pure JS
     */
    function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
        /**
         * SelectFx options
         */
    SelectFx.prototype.options = {
        // if true all the links will open in a new tab.
        // if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
        newTab: true,
        // when opening the select element, the default placeholder (if any) is shown
        stickyPlaceholder: true,
        // default container is body
        container: 'body',
        // callback when changing the value
        onChange: function(el) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            el.dispatchEvent(event);
        }
    }

    /**
     * init function
     * initialize and cache some vars
     */
    SelectFx.prototype._init = function() {
        // check if we are using a placeholder for the native select box
        // we assume the placeholder is disabled and selected by default
        var selectedOpt = document.querySelector('option[selected]');
        this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

        // get selected option (either the first option with attr selected or just the first option)
        this.selectedOpt = selectedOpt || this.el.querySelector('option');

        // create structure
        this._createSelectEl();

        // all options
        this.selOpts = [].slice.call(this.selEl.querySelectorAll('li[data-option]'));

        // total options
        this.selOptsCount = this.selOpts.length;

        // current index
        this.current = this.selOpts.indexOf(this.selEl.querySelector('li.cs-selected')) || -1;

        // placeholder elem
        this.selPlaceholder = this.selEl.querySelector('span.cs-placeholder');

        // init events
        this._initEvents();

        this.el.onchange = function() {
            var index = this.selectedIndex;
            var inputText = this.children[index].innerHTML.trim();
        }

    }

    /**
     * creates the structure for the select element
     */
    SelectFx.prototype._createSelectEl = function() {
        var self = this,
            options = '',
            createOptionHTML = function(el) {
                var optclass = '',
                    classes = '',
                    link = '';

                if (el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder) {
                    classes += 'cs-selected ';
                    this.foundSelected = true;
                }
                // extra classes
                if (el.getAttribute('data-class')) {
                    classes += el.getAttribute('data-class');
                }
                // link options
                if (el.getAttribute('data-link')) {
                    link = 'data-link=' + el.getAttribute('data-link');
                }

                if (classes !== '') {
                    optclass = 'class="' + classes + '" ';
                }

                return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent + '</span></li>';
            };

        [].slice.call(this.el.children).forEach(function(el) {
            if (el.disabled) {
                return;
            }

            var tag = el.tagName.toLowerCase();

            if (tag === 'option') {
                options += createOptionHTML(el);
            } else if (tag === 'optgroup') {
                options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
                [].slice.call(el.children).forEach(function(opt) {
                    options += createOptionHTML(opt);
                })
                options += '</ul></li>';
            }
        });

        var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
        this.selEl = document.createElement('div');
        this.selEl.className = this.el.className;
        this.selEl.tabIndex = this.el.tabIndex;
        this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
        this.el.parentNode.appendChild(this.selEl);
        this.selEl.appendChild(this.el);

        // backdrop to support dynamic heights of the dropdown
        var backdrop = document.createElement('div');
        backdrop.className = 'cs-backdrop';
        this.selEl.appendChild(backdrop);
    }

    /**
     * initialize the events
     */
    SelectFx.prototype._initEvents = function() {
        var self = this;

        // open/close select
        this.selPlaceholder.addEventListener('click', function() {
            self._toggleSelect();
        });

        // clicking the options
        this.selOpts.forEach(function(opt, idx) {
            opt.addEventListener('click', function() {
                self.current = idx;
                self._changeOption();
                // close select elem
                self._toggleSelect();
            });
        });

        // close the select element if the target it´s not the select element or one of its descendants..
        document.addEventListener('click', function(ev) {
            var target = ev.target;
            if (self._isOpen() && target !== self.selEl && !hasParent(target, self.selEl)) {
                self._toggleSelect();
            }
        });

        // keyboard navigation events
        this.selEl.addEventListener('keydown', function(ev) {
            var keyCode = ev.keyCode || ev.which;

            switch (keyCode) {
                // up key
                case 38:
                    ev.preventDefault();
                    self._navigateOpts('prev');
                    break;
                    // down key
                case 40:
                    ev.preventDefault();
                    self._navigateOpts('next');
                    break;
                    // space key
                case 32:
                    ev.preventDefault();
                    if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
                        self._changeOption();
                    }
                    self._toggleSelect();
                    break;
                    // enter key
                case 13:
                    ev.preventDefault();
                    if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
                        self._changeOption();
                        self._toggleSelect();
                    }
                    break;
                    // esc key
                case 27:
                    ev.preventDefault();
                    if (self._isOpen()) {
                        self._toggleSelect();
                    }
                    break;
            }
        });
    }

    /**
     * navigate with up/dpwn keys
     */
    SelectFx.prototype._navigateOpts = function(dir) {
        if (!this._isOpen()) {
            this._toggleSelect();
        }

        var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;

        if (dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1) {
            // save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
            this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
            // remove focus class if any..
            this._removeFocus();
            // add class focus - track which option we are navigating
            classie.add(this.selOpts[this.preSelCurrent], 'cs-focus');
        }
    }

    /**
     * open/close select
     * when opened show the default placeholder if any
     */
    SelectFx.prototype._toggleSelect = function() {
        var backdrop = this.selEl.querySelector('.cs-backdrop');
        var container = document.querySelector(this.options.container);
        var mask = container.querySelector('.dropdown-mask');
        var csOptions = this.selEl.querySelector('.cs-options');
        var csPlaceholder = this.selEl.querySelector('.cs-placeholder');

        var csPlaceholderWidth = csPlaceholder.offsetWidth;
        var csPlaceholderHeight = csPlaceholder.offsetHeight;
        var csOptionsWidth = csOptions.scrollWidth;

        if (this._isOpen()) {
            if (this.current !== -1) {
                // update placeholder text
                this.selPlaceholder.textContent = this.selOpts[this.current].textContent;
            }

            var dummy = this.selEl.data;

            var parent = dummy.parentNode;
            //parent.appendChild(this.selEl);
            insertAfter(this.selEl, dummy);
            this.selEl.removeAttribute('style');

            parent.removeChild(dummy);

            // Hack for FF
            // http://stackoverflow.com/questions/12088819/css-transitions-on-new-elements
            var x = this.selEl.clientHeight;

            // reset backdrop
            backdrop.style.transform = backdrop.style.webkitTransform = backdrop.style.MozTransform = backdrop.style.msTransform = backdrop.style.OTransform = 'scale3d(1,1,1)';
            classie.remove(this.selEl, 'cs-active');

            mask.style.display = 'none';
            csOptions.style.overflowY = 'hidden';
            csOptions.style.width = 'auto';

            var parentFormGroup = closest(this.selEl, '.form-group');
            parentFormGroup && classie.removeClass(parentFormGroup, 'focused');

        } else {
            if (this.hasDefaultPlaceholder && this.options.stickyPlaceholder) {
                // everytime we open we wanna see the default placeholder text
                this.selPlaceholder.textContent = this.selectedOpt.textContent;
            }

            var dummy;
            if (this.selEl.parentNode.querySelector('.dropdown-placeholder')) {
                dummy = this.selEl.parentNode.querySelector('.dropdown-placeholder');
            } else {
                dummy = document.createElement('div');
                classie.add(dummy, 'dropdown-placeholder');
                //this.selEl.parentNode.appendChild(dummy);
                insertAfter(dummy, this.selEl);

            }


            dummy.style.height = csPlaceholderHeight + 'px';
            dummy.style.width = this.selEl.offsetWidth + 'px';

            this.selEl.data = dummy;



            this.selEl.style.position = 'absolute';
            var offsetselEl = offset(this.selEl);

            this.selEl.style.left = offsetselEl.left + 'px';
            this.selEl.style.top = offsetselEl.top + 'px';

            container.appendChild(this.selEl);

            // decide backdrop's scale factor depending on the content height
            var contentHeight = csOptions.offsetHeight;
            var originalHeight = csPlaceholder.offsetHeight;

            var contentWidth = csOptions.offsetWidth;
            var originalWidth = csPlaceholder.offsetWidth;

            var scaleV = contentHeight / originalHeight;
            var scaleH = (contentWidth > originalWidth) ? contentWidth / originalWidth : 1.05;
            //backdrop.style.transform = backdrop.style.webkitTransform = backdrop.style.MozTransform = backdrop.style.msTransform = backdrop.style.OTransform = 'scale3d(' + scaleH + ', ' + scaleV + ', 1)';
            backdrop.style.transform = backdrop.style.webkitTransform = backdrop.style.MozTransform = backdrop.style.msTransform = backdrop.style.OTransform = 'scale3d(' + 1 + ', ' + scaleV + ', 1)';

            if (!mask) {
                mask = document.createElement('div');
                classie.add(mask, 'dropdown-mask');
                container.appendChild(mask);
            }

            mask.style.display = 'block';

            classie.add(this.selEl, 'cs-active');

            var resizedWidth = (csPlaceholderWidth < csOptionsWidth) ? csOptionsWidth : csPlaceholderWidth;

            this.selEl.style.width = resizedWidth + 'px';
            this.selEl.style.height = originalHeight + 'px';
            csOptions.style.width = '100%';

            setTimeout(function() {
                csOptions.style.overflowY = 'auto';
            }, 300);

        }
    }

    /**
     * change option - the new value is set
     */
    SelectFx.prototype._changeOption = function() {
        // if pre selected current (if we navigate with the keyboard)...
        if (typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1) {
            this.current = this.preSelCurrent;
            this.preSelCurrent = -1;
        }

        // current option
        var opt = this.selOpts[this.current];

        // update current selected value
        this.selPlaceholder.textContent = opt.textContent;

        // change native select element´s value
        this.el.value = opt.getAttribute('data-value');

        // remove class cs-selected from old selected option and add it to current selected option
        var oldOpt = this.selEl.querySelector('li.cs-selected');
        if (oldOpt) {
            classie.remove(oldOpt, 'cs-selected');
        }
        classie.add(opt, 'cs-selected');

        // if there´s a link defined
        if (opt.getAttribute('data-link')) {
            // open in new tab?
            if (this.options.newTab) {
                window.open(opt.getAttribute('data-link'), '_blank');
            } else {
                window.location = opt.getAttribute('data-link');
            }
        }

        // callback
        this.options.onChange(this.el);
    }

    /**
     * returns true if select element is opened
     */
    SelectFx.prototype._isOpen = function(opt) {
        return classie.has(this.selEl, 'cs-active');
    }

    /**
     * removes the focus class from the option
     */
    SelectFx.prototype._removeFocus = function(opt) {
        var focusEl = this.selEl.querySelector('li.cs-focus')
        if (focusEl) {
            classie.remove(focusEl, 'cs-focus');
        }
    }

    /**
     * add to global namespace
     */
    window.SelectFx = SelectFx;

})(window);
/* ============================================================
 * Pages Chat
 * ============================================================ */

(function($) {
  'use strict';
  //To Open Chat When Clicked
  $('[data-chat-input]').on('keypress',function(e){
    if(e.which == 13) {
       var el = $(this).attr('data-chat-conversation');
       $(el).append('<div class="message clearfix">'+
        '<div class="chat-bubble from-me">'+$(this).val()+
        '</div></div>');
       $(this).val('');
    }
  });

})(window.jQuery);
/* ============================================================
 * Pages Circular Progress
 * ============================================================ */

(function($) {
    'use strict';
    // CIRCULAR PROGRESS CLASS DEFINITION
    // ======================

    var Progress = function(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.circularProgress.defaults, options);


        // start adding to to DOM
        this.$container = $('<div class="progress-circle"></div>');

        this.$element.attr('data-color') && this.$container.addClass('progress-circle-' + this.$element.attr('data-color'));
        this.$element.attr('data-thick') && this.$container.addClass('progress-circle-thick');

        this.$pie = $('<div class="pie"></div>');

        this.$pie.$left = $('<div class="left-side half-circle"></div>');
        this.$pie.$right = $('<div class="right-side half-circle"></div>');

        this.$pie.append(this.$pie.$left).append(this.$pie.$right);

        this.$container.append(this.$pie).append('<div class="shadow"></div>');

        this.$element.after(this.$container);
        // end DOM adding

        this.val = this.$element.val();
        var deg = perc2deg(this.val);


        if (this.val <= 50) {
            this.$pie.$right.css('transform', 'rotate(' + deg + 'deg)');
        } else {
            this.$pie.css('clip', 'rect(auto, auto, auto, auto)');
            this.$pie.$right.css('transform', 'rotate(180deg)');
            this.$pie.$left.css('transform', 'rotate(' + deg + 'deg)');
        }

    }
    Progress.VERSION = "1.0.0";

    Progress.prototype.value = function(val) {
        if (typeof val == 'undefined') return;

        var deg = perc2deg(val);

        this.$pie.removeAttr('style');

        this.$pie.$right.removeAttr('style');
        this.$pie.$left.removeAttr('style');

        if (val <= 50) {
            this.$pie.$right.css('transform', 'rotate(' + deg + 'deg)');
        } else {
            this.$pie.css('clip', 'rect(auto, auto, auto, auto)');
            this.$pie.$right.css('transform', 'rotate(180deg)');
            this.$pie.$left.css('transform', 'rotate(' + deg + 'deg)');
        }

    }

    // CIRCULAR PROGRESS PLUGIN DEFINITION
    // =======================
    function Plugin(option) {
        return this.filter(':input').each(function() {
            var $this = $(this);
            var data = $this.data('pg.circularProgress');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('pg.circularProgress', (data = new Progress(this, options)));
            if (typeof option == 'string') data[option]();
            else if (options.hasOwnProperty('value')) data.value(options.value);
        })
    }

    var old = $.fn.circularProgress

    $.fn.circularProgress = Plugin
    $.fn.circularProgress.Constructor = Progress


    $.fn.circularProgress.defaults = {
        value: 0
    }

    // CIRCULAR PROGRESS NO CONFLICT
    // ====================

    $.fn.circularProgress.noConflict = function() {
        $.fn.circularProgress = old;
        return this;
    }

    // CIRCULAR PROGRESS DATA API
    //===================

    $(window).on('load', function() {
        $('[data-pages-progress="circle"]').each(function() {
            var $progress = $(this)
            $progress.circularProgress($progress.data())
        })
    })

    function perc2deg(p) {
        return parseInt(p / 100 * 360);
    }

    // TODO: Add API to change size, stroke width, color

})(window.jQuery);

/* ============================================================
 * Pages Notifications
 * ============================================================ */

(function($) {

    'use strict';

    var Notification = function(container, options) {

        var self = this;

        // Element collection
        self.container = $(container); // 'body' recommended
        self.notification = $('<div class="pgn push-on-sidebar-open"></div>');
        self.options = $.extend(true, {}, $.fn.pgNotification.defaults, options);

        if (!self.container.find('.pgn-wrapper[data-position=' + this.options.position + ']').length) {
            self.wrapper = $('<div class="pgn-wrapper" data-position="' + this.options.position + '"></div>');
            self.container.append(self.wrapper);
        } else {
            self.wrapper = $('.pgn-wrapper[data-position=' + this.options.position + ']');
        }

        self.alert = $('<div class="alert"></div>');
        self.alert.addClass('alert-' + self.options.type);

        if (self.options.style == 'bar') {
            new BarNotification();
        } else if (self.options.style == 'flip') {
            new FlipNotification();
        } else if (self.options.style == 'circle') {
            new CircleNotification();
        } else if (self.options.style == 'simple') {
            new SimpleNotification();
        } else { // default = 'simple'
            new SimpleNotification();
        }

        // Notification styles
        function SimpleNotification() {

            self.notification.addClass('pgn-simple');

            self.alert.append(self.options.message);
            if (self.options.showClose) {
                var close = $('<button type="button" class="close" data-dismiss="alert"></button>')
                    .append('<span aria-hidden="true">&times;</span>')
                    .append('<span class="sr-only">Close</span>');

                self.alert.prepend(close);
            }

        }

        function BarNotification() {

            self.notification.addClass('pgn-bar');
            self.alert.addClass('alert-' + self.options.type);
            var close = '';
            if (self.options.showClose) {
                close = $('<button type="button" class="close" data-dismiss="alert"></button>')
                    .append('<span aria-hidden="true">&times;</span>')
                    .append('<span class="sr-only">Close</span>');
                
            }

            if($('body').hasClass("horizontal-app-menu")){
                var container = $('<div class="container"/>');
                container.append('<span>' + self.options.message + '</span>');
                container.append(close);
                self.alert.append(container);
            }
            else{
                self.alert.append(self.options.message);
                self.alert.prepend(close);
            }

        }

        function CircleNotification() {

            self.notification.addClass('pgn-circle');

            var table = '<div>';
            if (self.options.thumbnail) {
                table += '<div class="pgn-thumbnail"><div>' + self.options.thumbnail + '</div></div>';
            }

            table += '<div class="pgn-message"><div>';

            if (self.options.title) {
                table += '<p class="bold">' + self.options.title + '</p>';
            }
            table += '<p>' + self.options.message + '</p></div></div>';
            table += '</div>';

            if (self.options.showClose) {
                table += '<button type="button" class="close" data-dismiss="alert">';
                table += '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>';
                table += '</button>';
            }


            self.alert.append(table);
            self.alert.after('<div class="clearfix"></div>');

        }

        function FlipNotification() {

            self.notification.addClass('pgn-flip');
            self.alert.append("<span>" + self.options.message + "</span>");
            if (self.options.showClose) {
                var close = $('<button type="button" class="close" data-dismiss="alert"></button>')
                    .append('<span aria-hidden="true">&times;</span>')
                    .append('<span class="sr-only">Close</span>');

                self.alert.prepend(close);
            }

        }

        self.notification.append(self.alert);

        function alignWrapperToContainer(){
            var containerPosition = $(".header").get(0);
            var containerHeight = $(containerPosition).height();
  
            if(/top/.test(self.options.position)){
              self.wrapper.css('top', containerHeight)
            }
        }

        alignWrapperToContainer()
        $(window).on('resize', alignWrapperToContainer)


        // bind to Bootstrap closed event for alerts
        self.alert.on('closed.bs.alert', function() {
            self.notification.remove();
            self.options.onClosed();
            // refresh layout after removal
        });

        return this; // enable chaining
    };

    Notification.VERSION = "1.0.0";

    Notification.prototype.show = function() {

        // TODO: add fadeOut animation on show as option
        this.wrapper.prepend(this.notification);

        this.options.onShown();

        if (this.options.timeout != 0) {
            var _this = this;
            // settimeout removes scope. use .bind(this)
            setTimeout(function() {
                this.notification.fadeOut("slow", function() {
                    $(this).remove();
                    _this.options.onClosed();
                });
            }.bind(this), this.options.timeout);
        }

    };

    $.fn.pgNotification = function(options) {
        return new Notification(this, options);
    };

    $.fn.pgNotification.defaults = {
        style: 'simple',
        message: null,
        position: 'top-right',
        type: 'info',
        showClose: true,
        timeout: 4000,
        onShown: function() {},
        onClosed: function() {}
    }
})(window.jQuery);

/* ============================================================
 * Pages Cards
 * ============================================================ */

(function($) {
    'use strict';
    // CARDS CLASS DEFINITION
    // ======================

    var Card = function(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.card.defaults, options);
        this.$loader = null;
        this.$body = this.$element.find('.card-body');
    }
    Card.VERSION = "1.0.0";
    // Button actions
    Card.prototype.collapse = function() {
        var icon = this.$element.find(this.options.collapseButton + ' > i');
        var heading = this.$element.find('.card-header');

        this.$body.stop().slideToggle("fast");

        if (this.$element.hasClass('card-collapsed')) {
            this.$element.removeClass('card-collapsed');
            icon.removeClass().addClass('pg-arrow_maximize');
            $.isFunction(this.options.onExpand) && this.options.onExpand(this);
            return
        }
        this.$element.addClass('card-collapsed');
        icon.removeClass().addClass('pg-arrow_minimize');
        $.isFunction(this.options.onCollapse) && this.options.onCollapse(this);
    }

    Card.prototype.close = function() {
        this.$element.remove();
        $.isFunction(this.options.onClose) && this.options.onClose(this);
    }

    Card.prototype.maximize = function() {
        var icon = this.$element.find(this.options.maximizeButton + ' > i');

        if (this.$element.hasClass('card-maximized')) {
            this.$element.removeClass('card-maximized');
            this.$element.attr('style','');
            icon.removeClass('pg-fullscreen_restore').addClass('pg-fullscreen');
            $.isFunction(this.options.onRestore) && this.options.onRestore(this);
        } else {
            var contentEl = $('.page-content-wrapper > .content');
            var header = $('.header');
            var left = 0;
            if(contentEl){
                left = contentEl[0].getBoundingClientRect().left;
                var style = window.getComputedStyle(contentEl[0]);
                left = left + (parseFloat(style["marginLeft"])+parseFloat(style["paddingLeft"]));
            }
            var headerHeight = header.height();

            this.$element.addClass('card-maximized');
            this.$element.css('left', left);
            this.$element.css('top', headerHeight);

            icon.removeClass('pg-fullscreen').addClass('pg-fullscreen_restore');
            $.isFunction(this.options.onMaximize) && this.options.onMaximize(this);
        }
    }

    // Options
    Card.prototype.refresh = function(refresh) {
        var toggle = this.$element.find(this.options.refreshButton);

        if (refresh) {
            if (this.$loader && this.$loader.is(':visible')) return;
            if (!$.isFunction(this.options.onRefresh)) return; // onRefresh() not set
            this.$loader = $('<div class="card-progress"></div>');
            this.$loader.css({
                'background-color': 'rgba(' + this.options.overlayColor + ',' + this.options.overlayOpacity + ')'

            });

            var elem = '';
            if (this.options.progress == 'circle') {
                elem += '<div class="progress-circle-indeterminate progress-circle-' + this.options.progressColor + '"></div>';
            } else if (this.options.progress == 'bar') {

                elem += '<div class="progress progress-small">';
                elem += '    <div class="progress-bar-indeterminate progress-bar-' + this.options.progressColor + '"></div>';
                elem += '</div>';
            } else if (this.options.progress == 'circle-lg') {
                toggle.addClass('refreshing');
                var iconOld = toggle.find('> i').first();
                var iconNew;
                if (!toggle.find('[class$="-animated"]').length) {
                    iconNew = $('<i/>');
                    iconNew.css({
                        'position': 'absolute',
                        'top': iconOld.position().top,
                        'left': iconOld.position().left
                    });
                    iconNew.addClass('card-icon-refresh-lg-' + this.options.progressColor + '-animated');
                    toggle.append(iconNew);
                } else {
                    iconNew = toggle.find('[class$="-animated"]');
                }

                iconOld.addClass('fade');
                iconNew.addClass('active');


            } else {
                elem += '<div class="progress progress-small">';
                elem += '    <div class="progress-bar-indeterminate progress-bar-' + this.options.progressColor + '"></div>';
                elem += '</div>';
            }

            this.$loader.append(elem);
            this.$element.append(this.$loader);

            // Start Fix for FF: pre-loading animated to SVGs
            var _loader = this.$loader;
            setTimeout(function() {
                this.$loader.remove();
                this.$element.append(_loader);
            }.bind(this), 300);
            // End fix
            this.$loader.fadeIn();

            $.isFunction(this.options.onRefresh) && this.options.onRefresh(this);

        } else {
            var _this = this;
            this.$loader.fadeOut(function() {
                $(this).remove();
                if (_this.options.progress == 'circle-lg') {
                    var iconNew = toggle.find('.active');
                    var iconOld = toggle.find('.fade');
                    iconNew.removeClass('active');
                    iconOld.removeClass('fade');
                    toggle.removeClass('refreshing');

                }
                _this.options.refresh = false;
            });
        }
    }

    Card.prototype.error = function(error) {
        if (error) {
            var _this = this;
            this.$element.pgNotification({
                style: 'bar',
                message: error,
                position: 'top',
                timeout: 0,
                type: 'danger',
                onShown: function() {
                    _this.$loader.find('> div').fadeOut()
                },
                onClosed: function() {
                    _this.refresh(false)
                }
            }).show();
        }
    }

    // CARD PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('pg.card');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('pg.card', (data = new Card(this, options)));
            if (typeof option == 'string') data[option]();
            else if (options.hasOwnProperty('refresh')) data.refresh(options.refresh);
            else if (options.hasOwnProperty('error')) data.error(options.error);
        })
    }

    var old = $.fn.card

    $.fn.card = Plugin
    $.fn.card.Constructor = Card


    $.fn.card.defaults = {
        progress: 'circle',
        progressColor: 'master',
        refresh: false,
        error: null,
        overlayColor: '255,255,255',
        overlayOpacity: 0.8,
        refreshButton: '[data-toggle="refresh"]',
        maximizeButton: '[data-toggle="maximize"]',
        collapseButton: '[data-toggle="collapse"]',
        closeButton: '[data-toggle="close"]'

        // onRefresh: function(portlet) {},
        // onCollapse: function(portlet) {},
        // onExpand: function(portlet) {},
        // onMaximize: function(portlet) {},
        // onRestore: function(portlet) {},
        // onClose: function(portlet) {}
    }

    // CARD NO CONFLICT
    // ====================

    $.fn.card.noConflict = function() {
        $.fn.card = old;
        return this;
    }

    // CARD DATA API
    //===================

    $(document).on('click.pg.card.data-api', '[data-toggle="collapse"]', function(e) {
        var $this = $(this);
        var $target = $this.closest('.card');
        if ($this.is('a')) e.preventDefault();
        $target.data('pg.card') && $target.card('collapse');
    })

    $(document).on('click.pg.card.data-api', '[data-toggle="close"]', function(e) {
        var $this = $(this);
        var $target = $this.closest('.card');
        if ($this.is('a')) e.preventDefault();
        $target.data('pg.card') && $target.card('close');
    })

    $(document).on('click.pg.card.data-api', '[data-toggle="refresh"]', function(e) {
        var $this = $(this);
        var $target = $this.closest('.card');
        if ($this.is('a')) e.preventDefault();
        $target.data('pg.card') && $target.card({
            refresh: true
        })
    })

    $(document).on('click.pg.card.data-api', '[data-toggle="maximize"]', function(e) {
        var $this = $(this);
        var $target = $this.closest('.card');
        if ($this.is('a')) e.preventDefault();
        $target.data('pg.card') && $target.card('maximize');
    })

    $(window).on('load', function() {
        $('[data-pages="card"]').each(function() {
            var $card = $(this)
            $card.card($card.data())
        })
    })

})(window.jQuery);

/* ============================================================
 * Pages Mobile View
 * ============================================================ */
(function($) {
    'use strict';

    var MobileView = function(element, options) {
        var self = this;
        self.options = $.extend(true, {}, $.fn.pgMobileViews.defaults, options);
        self.element = $(element);
        self.element.on('click', function(e) {
            e.preventDefault();
            var data = self.element.data();
            var el = $(data.viewPort);
            var toView = data.toggleView;
            if (data.toggleView != null) {
                el.children().last().children('.view').hide();
                $(data.toggleView).show();
            }
            else{
                 toView = el.last();
            }
            el.toggleClass(data.viewAnimation);
            self.options.onNavigate(toView, data.viewAnimation);
            return false;
        })
        return this; // enable chaining
    };
    $.fn.pgMobileViews = function(options) {
        return new MobileView(this, options);
    };

    $.fn.pgMobileViews.defaults = {
        //Returns Target View & Animation Type
        onNavigate: function(view, animation) {}
    }
    // MOBILE VIEW DATA API
    //===================

    $(window).on('load', function() {
        $('[data-navigate="view"]').each(function() {
            var $mobileView = $(this)
            $mobileView.pgMobileViews();
        })
    });
})(window.jQuery);
/* ============================================================
 * Pages Quickview Plugin
 * ============================================================ */

(function($) {
    'use strict';
    // QUICKVIEW CLASS DEFINITION
    // ======================

    var Quickview = function(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.quickview.defaults, options);
        this.bezierEasing = [.05, .74, .27, .99];
        var _this = this;

        $(this.options.notes).on('click', '.list > ul > li', function(e) {
            var note = $(this).find('.note-preview');
            var note = $(this).find('.note-preview');
            $(_this.options.noteEditor).html(note.html());
            $(_this.options.notes).toggleClass('push');
        });
        $(this.options.notes).on('click', '.list > ul > li .checkbox', function(e) {
            e.stopPropagation();
        });
        $(this.options.notes).on('click', _this.options.backButton, function(e) {
            $(_this.options.notes).find('.toolbar > li > a').removeClass('active');
            $(_this.options.notes).toggleClass('push');
        });
        $(this.options.deleteNoteButton).click(function(e) {
            e.preventDefault();
            $(this).toggleClass('selected');
            $(_this.options.notes).find('.list > ul > li .checkbox').fadeToggle("fast");
            $(_this.options.deleteNoteConfirmButton).fadeToggle("fast").removeClass('hide');
        });
        $(this.options.newNoteButton).click(function(e) {
            e.preventDefault();
            $(_this.options.noteEditor).html('');
        });

        $(this.options.deleteNoteConfirmButton).click(function() {
            var checked = $(_this.options.notes).find('input[type=checkbox]:checked');
            checked.each(function() {
                $(this).parents('li').remove();
            });
        });
        $(this.options.notes).on('click', '.toolbar > li > a', function(e) {
            //e.preventDefault();
            var command = $(this).attr('data-action');
            document.execCommand(command, false, null);
            $(this).toggleClass('active');
        });

    }
    Quickview.VERSION = "1.0.0";

    // QUICKVIEW PLUGIN DEFINITION
    // =======================
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('pg.quickview');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('pg.quickview', (data = new Quickview(this, options)));
            if (typeof option == 'string') data[option]();
        })
    }

    var old = $.fn.quickview

    $.fn.quickview = Plugin
    $.fn.quickview.Constructor = Quickview


    $.fn.quickview.defaults = {
        notes: '#note-views',
        alerts: '#alerts',
        chat: '#chat',
        notesList: '.list',
        noteEditor: '.quick-note-editor',
        deleteNoteButton: '.delete-note-link',
        deleteNoteConfirmButton: '.btn-remove-notes',
        newNoteButton: '.new-note-link',
        backButton: '.close-note-link'
    }

    // QUICKVIEW NO CONFLICT
    // ====================

    $.fn.quickview.noConflict = function() {
        $.fn.quickview = old;
        return this;
    }

    // QUICKVIEW DATA API
    //===================

    $(window).on('load', function() {

        $('[data-pages="quickview"]').each(function() {
            var $quickview = $(this)
            $quickview.quickview($quickview.data())
        })
    });


    $(document).on('click.pg.quickview.data-api', '[data-toggle="quickview"]', function(e) {
        var elem = $(this).attr('data-toggle-element');
        $(elem).toggleClass('open');
        e.preventDefault();
    })

})(window.jQuery);
/* ============================================================
 * Pages Parallax Plugin
 * ============================================================ */

(function($) {
    'use strict';
    // PARALLAX CLASS DEFINITION
    // ======================

    var Parallax = function(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.parallax.defaults, options);
        this.$coverPhoto = this.$element.find('.cover-photo');
        // TODO: rename .inner to .page-cover-content
        this.$content = this.$element.find('.inner');

        // if cover photo img is found make it a background-image
        if (this.$coverPhoto.find('> img').length) {
            var img = this.$coverPhoto.find('> img');
            this.$coverPhoto.css('background-image', 'url(' + img.attr('src') + ')');
            img.remove();
        }

        if(this.options.scrollElement !== window) {
            $(this.options.scrollElement).on('scroll', function() {
                $(element).parallax('animate');
            });
        }

    }
    Parallax.VERSION = "1.0.0";

    Parallax.prototype.animate = function() {

        var scrollPos;
        var pagecoverWidth = this.$element.height();
        //opactiy to text starts at 50% scroll length
        var opacityKeyFrame = pagecoverWidth * 50 / 100;
        var direction = 'translateX';

        scrollPos = $(this.options.scrollElement).scrollTop();
        direction = 'translateY';


        this.$coverPhoto.css({
            'transform': direction + '(' + scrollPos * this.options.speed.coverPhoto + 'px)'
        });

        this.$content.css({
            'transform': direction + '(' + scrollPos * this.options.speed.content + 'px)',
        });

        if (scrollPos > opacityKeyFrame) {
            this.$content.css({
                'opacity': 1 - scrollPos / 1200
            });
        } else {
            this.$content.css({
                'opacity': 1
            });
        }

    }

    // PARALLAX PLUGIN DEFINITION
    // =======================
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('pg.parallax');
            var options = $.extend(true, {}, typeof option == 'object' ? option : {}, $this.data());
            
            if (!data) $this.data('pg.parallax', (data = new Parallax(this, options)));
            if (typeof option == 'string') data[option]();
        })
    }

    var old = $.fn.parallax

    $.fn.parallax = Plugin
    $.fn.parallax.Constructor = Parallax


    $.fn.parallax.defaults = {
        speed: {
            coverPhoto: 0.3,
            content: 0.17
        },
        scrollElement: window
    }

    // PARALLAX NO CONFLICT
    // ====================

    $.fn.parallax.noConflict = function() {
        $.fn.parallax = old;
        return this;
    }

    // PARALLAX DATA API
    //===================

    $(window).on('load', function() {

        $('[data-pages="parallax"]').each(function() {
            var $parallax = $(this)
            $parallax.parallax($parallax.data())
        })
    });

    $(window).on('scroll', function() {
        // Disable parallax for Touch devices
        if (Modernizr.touch) {
            return;
        }
        $('[data-pages="parallax"]').parallax('animate');
    });

})(window.jQuery);

 /* ============================================================
  * Pages Sidebar
  * ============================================================ */

 (function($) {
    'use strict';
     // SIDEBAR CLASS DEFINITION
     // ======================

    var Sidebar = function(element, options) {
         this.$element = $(element);
         this.$body = $('body');
         this.options = $.extend(true, {}, $.fn.sidebar.defaults, options);

         this.bezierEasing = [.05, .74, .27, .99];
         this.cssAnimation = true;
         this.css3d = true;

         this.sideBarWidth = 280;
         this.sideBarWidthCondensed = 280 - 70;



         this.$sidebarMenu = this.$element.find('.sidebar-menu > ul');
         this.$pageContainer = $(this.options.pageContainer);


         if (!this.$sidebarMenu.length) return;

         // apply perfectScrollbar plugin only for desktops
         ($.Pages.getUserAgent() == 'desktop') && this.$sidebarMenu.scrollbar({
             ignoreOverlay: false,
             disableBodyScroll :(this.$element.data("disableBodyScroll") == true)? true : false
         });


         if (!Modernizr.csstransitions)
             this.cssAnimation = false;
         if (!Modernizr.csstransforms3d)
             this.css3d = false;

         // Bind events
         // Toggle sub menus
         // In Angular Binding is done using a pg-sidebar directive
         (typeof angular === 'undefined') && $(document).on('click', '.sidebar-menu a', function(e) {

             if ($(this).parent().children('.sub-menu') === false) {
                 return;
             }
             var el = $(this);
             var parent = $(this).parent().parent();
             var li = $(this).parent();
             var sub = $(this).parent().children('.sub-menu');

             if(li.hasClass("open active")){
                el.children('.arrow').removeClass("open active");
                sub.slideUp(200, function() {
                    li.removeClass("open active");
                });

             }else{
                parent.children('li.open').children('.sub-menu').slideUp(200);
                parent.children('li.open').children('a').children('.arrow').removeClass('open active');
                parent.children('li.open').removeClass("open active");
                el.children('.arrow').addClass("open active");
                sub.slideDown(200, function() {
                    li.addClass("open active");

                });
             }
             //e.preventDefault();
         });

         // Toggle sidebar
         $('.sidebar-slide-toggle').on('click touchend', function(e) {
             e.preventDefault();
             $(this).toggleClass('active');
             var el = $(this).attr('data-pages-toggle');
             if (el != null) {
                 $(el).toggleClass('show');
             }
         });

         var _this = this;

         function sidebarMouseEnter(e) {
            var _sideBarWidthCondensed = _this.$body.hasClass("rtl") ? -_this.sideBarWidthCondensed : _this.sideBarWidthCondensed;

             var menuOpenCSS = (this.css3d == true ? 'translate3d(' + _sideBarWidthCondensed + 'px, 0,0)' : 'translate(' + _sideBarWidthCondensed + 'px, 0)');

             if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                 return false
             }
             if ($('.close-sidebar').data('clicked')) {
                 return;
             }
             if (_this.$body.hasClass('menu-pin'))
                 return;

             _this.$element.css({
                 'transform': menuOpenCSS
             });
             _this.$body.addClass('sidebar-visible');
         }

         function sidebarMouseLeave(e) {
            var menuClosedCSS = (_this.css3d == true ? 'translate3d(0, 0,0)' : 'translate(0, 0)');

             if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                 return false
             }
             if (typeof e != 'undefined') {
                 var target = $(e.target);
                 if (target.parent('.page-sidebar').length) {
                     return;
                 }
             }
             if (_this.$body.hasClass('menu-pin'))
                 return;

             if ($('.sidebar-overlay-slide').hasClass('show')) {
                 $('.sidebar-overlay-slide').removeClass('show')
                 $("[data-pages-toggle']").removeClass('active')

             }

             _this.$element.css({
                 'transform': menuClosedCSS
             });
             _this.$body.removeClass('sidebar-visible');
         }


         this.$element.bind('mouseenter mouseleave', sidebarMouseEnter);
         this.$pageContainer.bind('mouseover', sidebarMouseLeave);

         function toggleMenuPin(){
           var width = $(window).width();
           if(width < 1200){
             if($('body').hasClass('menu-pin')){
               $('body').removeClass('menu-pin')
               $('body').addClass('menu-unpinned')
             }
           } else {
             if($('body').hasClass('menu-unpinned')){
               $('body').addClass('menu-pin')
             }
           }
         }
         toggleMenuPin();
         $(document).bind('ready', toggleMenuPin);
         $(window).bind('resize', toggleMenuPin);

     }


     // Toggle sidebar for mobile view
     Sidebar.prototype.toggleSidebar = function(toggle) {
         var timer;
         var bodyColor = $('body').css('background-color');
         $('.page-container').css('background-color', bodyColor);
         if (this.$body.hasClass('sidebar-open')) {
             this.$body.removeClass('sidebar-open');
             timer = setTimeout(function() {
                 this.$element.removeClass('visible');
             }.bind(this), 400);
         } else {
             clearTimeout(timer);
             this.$element.addClass('visible');
             setTimeout(function() {
                 this.$body.addClass('sidebar-open');
             }.bind(this), 10);
             setTimeout(function(){
                // remove background color
                $('.page-container').css({'background-color': ''});
             },1000);

         }

     }

     Sidebar.prototype.togglePinSidebar = function(toggle) {
         if (toggle == 'hide') {
             this.$body.removeClass('menu-pin');
         } else if (toggle == 'show') {
             this.$body.addClass('menu-pin');
         } else {
             this.$body.toggleClass('menu-pin');
         }

     }


     // SIDEBAR PLUGIN DEFINITION
     // =======================
     function Plugin(option) {
         return this.each(function() {
             var $this = $(this);
             var data = $this.data('pg.sidebar');
             var options = typeof option == 'object' && option;

             if (!data) $this.data('pg.sidebar', (data = new Sidebar(this, options)));
             if (typeof option == 'string') data[option]();
         })
     }

     var old = $.fn.sidebar;

     $.fn.sidebar = Plugin;
     $.fn.sidebar.Constructor = Sidebar;


     $.fn.sidebar.defaults = {
         pageContainer: '.page-container'
     }

     // SIDEBAR PROGRESS NO CONFLICT
     // ====================

     $.fn.sidebar.noConflict = function() {
         $.fn.sidebar = old;
         return this;
     }

     // SIDEBAR PROGRESS DATA API
     //===================

     $(document).on('click.pg.sidebar.data-api', '[data-toggle-pin="sidebar"]', function(e) {
         var $this = $(this);
         var $target = $('[data-pages="sidebar"]');
         $target.data('pg.sidebar').togglePinSidebar();
         return false;
     })
     $(document).on('click.pg.sidebar.data-api', '[data-toggle="sidebar"]', function(e) {
        console.log("menu open");
        var $this = $(this);
        var $target = $('[data-pages="sidebar"]');
        $target.data('pg.sidebar').toggleSidebar();
        return false
    })

 })(window.jQuery);

/* ============================================================
 * Pages Search overlay
 * ============================================================ */

(function($) {

    'use strict';

    // SEARCH CLASS DEFINITION
    // ======================

    var Search = function(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.search.defaults, options);
        this.init();
    }
    Search.VERSION = "1.0.0";

    Search.prototype.init = function() {
        var _this = this;
        this.pressedKeys = [];
        this.ignoredKeys = [];

        //Cache elements
        this.$searchField = this.$element.find(this.options.searchField);
        this.$closeButton = this.$element.find(this.options.closeButton);
        this.$suggestions = this.$element.find(this.options.suggestions);
        this.$brand = this.$element.find(this.options.brand);

        this.$searchField.on('keyup', function(e) {
            _this.$suggestions && _this.$suggestions.html($(this).val());
        });

        this.$searchField.on('keyup', function(e) {
            _this.options.onKeyEnter && _this.options.onKeyEnter(_this.$searchField.val());
            if (e.keyCode == 13) { //Enter pressed
                e.preventDefault();
                _this.options.onSearchSubmit && _this.options.onSearchSubmit(_this.$searchField.val());
            }
            if ($('body').hasClass('overlay-disabled')) {
                return 0;
            }

        });

        this.$closeButton.on('click', function() {
            _this.toggleOverlay('hide');
        });

        this.$element.on('click', function(e) {
            if ($(e.target).data('pages') == 'search') {
                _this.toggleOverlay('hide');
            }
        });

        $(document).on('keypress.pg.search', function(e) {
            _this.keypress(e);
        });

        $(document).on('keyup', function(e) {
            // Dismiss overlay on ESC is pressed
            if (_this.$element.is(':visible') && e.keyCode == 27) {
                _this.toggleOverlay('hide');
            }
        });

    }


    Search.prototype.keypress = function(e) {

        e = e || event; // to deal with IE
        var nodeName = e.target.nodeName;
        if ($('body').hasClass('overlay-disabled') ||
            $(e.target).hasClass('js-input') ||
            nodeName == 'INPUT' ||
            nodeName == 'TEXTAREA') {
            return;
        }

        if (e.which !== 0 && e.charCode !== 0 && !e.ctrlKey && !e.metaKey && !e.altKey && e.keyCode != 27) {
            this.toggleOverlay('show', String.fromCharCode(e.keyCode | e.charCode));
        }
    }


    Search.prototype.toggleOverlay = function(action, key) {
        var _this = this;
        if (action == 'show') {
            this.$element.removeClass("hide");
            this.$element.fadeIn("fast");
            if (!this.$searchField.is(':focus')) {
                this.$searchField.val(key);
                setTimeout(function() {
                    this.$searchField.focus();
                    var tmpStr = this.$searchField.val();
                    this.$searchField.val('');
                    this.$searchField.val(tmpStr);
                }.bind(this), 10);
            }

            this.$element.removeClass("closed");
            this.$brand.toggleClass('invisible');
            $(document).off('keypress.pg.search');
        } else {
            this.$element.fadeOut("fast").addClass("closed");
            this.$searchField.val('').blur();
            setTimeout(function() {
                if ((this.$element).is(':visible')) {
                    this.$brand.toggleClass('invisible');
                }
                $(document).on('keypress.pg.search', function(e) {
                    _this.keypress(e);
                });
            }.bind(this), 10);
        }
    };

    // SEARCH PLUGIN DEFINITION
    // =======================


    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('pg.search');
            var options = typeof option == 'object' && option;

            if (!data) {
                $this.data('pg.search', (data = new Search(this, options)));

            }
            if (typeof option == 'string') data[option]();
        })
    }

    var old = $.fn.search

    $.fn.search = Plugin
    $.fn.search.Constructor = Search

    $.fn.search.defaults = {
        searchField: '[data-search="searchField"]',
        closeButton: '[data-search="closeButton"]',
        suggestions: '[data-search="suggestions"]',
        brand: '[data-search="brand"]'
    }

    // SEARCH NO CONFLICT
    // ====================

    $.fn.search.noConflict = function() {
        $.fn.search = old;
        return this;
    }

    $(document).on('click.pg.search.data-api', '[data-toggle="search"]', function(e) {
        var $this = $(this);
        var $target = $('[data-pages="search"]');
        if ($this.is('a')) e.preventDefault();
        $target.data('pg.search').toggleOverlay('show');
    })


})(window.jQuery);
(function($) {
    'use strict';
    // Initialize layouts and plugins
    (typeof angular === 'undefined') && $.Pages.init();
})(window.jQuery);

function(t){function e(t,e,n,r){var o,i,a,u,f,s,h,p=e&&e.ownerDocument,d=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==d&&9!==d&&11!==d)return n;if(!r&&((e?e.ownerDocument||e:O)!==N&&S(e),e=e||N,R)){if(11!==d&&(f=gt.exec(t)))if(o=f[1]){if(9===d){if(!(a=e.getElementById(o)))return n;if(a.id===o)return n.push(a),n}else if(p&&(a=p.getElementById(o))&&B(e,a)&&a.id===o)return n.push(a),n}else{if(f[2])return J.apply(n,e.getElementsByTagName(t)),n;if((o=f[3])&&_.getElementsByClassName&&e.getElementsByClassName)return J.apply(n,e.getElementsByClassName(o)),n}if(_.qsa&&!Y[t+" "]&&(!P||!P.test(t))){if(1!==d)p=e,h=t;else if("object"!==e.nodeName.toLowerCase()){for((u=e.getAttribute("id"))?u=u.replace(mt,_t):e.setAttribute("id",u=j),s=M(t),i=s.length;i--;)s[i]="#"+u+" "+l(s[i]);h=s.join(","),p=vt.test(t)&&c(e.parentNode)||e}if(h)try{return J.apply(n,p.querySelectorAll(h)),n}catch(t){}finally{u===j&&e.removeAttribute("id")}}}return E(t.replace(it,"$1"),e,n,r)}function n(){function t(n,r){return e.push(n+" ")>x.cacheLength&&delete t[e.shift()],t[n+" "]=r}var e=[];return t}function r(t){return t[j]=!0,t}function o(t){var e=N.createElement("fieldset");try{return!!t(e)}catch(t){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function i(t,e){for(var n=t.split("|"),r=n.length;r--;)x.attrHandle[n[r]]=e}function a(t,e){var n=e&&t,r=n&&1===t.nodeType&&1===e.nodeType&&t.sourceIndex-e.sourceIndex;if(r)return r;if(n)for(;n=n.nextSibling;)if(n===e)return-1;return t?1:-1}function u(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&wt(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function f(t){return r(function(e){return e=+e,r(function(n,r){for(var o,i=t([],n.length,e),a=i.length;a--;)n[o=i[a]]&&(n[o]=!(r[o]=n[o]))})})}function c(t){return t&&void 0!==t.getElementsByTagName&&t}function s(){}function l(t){for(var e=0,n=t.length,r="";e<n;e++)r+=t[e].value;return r}function h(t,e,n){var r=e.dir,o=e.next,i=o||r,a=n&&"parentNode"===i,u=U++;return e.first?function(e,n,o){for(;e=e[r];)if(1===e.nodeType||a)return t(e,n,o);return!1}:function(e,n,f){var c,s,l,h=[I,u];if(f){for(;e=e[r];)if((1===e.nodeType||a)&&t(e,n,f))return!0}else for(;e=e[r];)if(1===e.nodeType||a)if(l=e[j]||(e[j]={}),s=l[e.uniqueID]||(l[e.uniqueID]={}),o&&o===e.nodeName.toLowerCase())e=e[r]||e;else{if((c=s[i])&&c[0]===I&&c[1]===u)return h[2]=c[2];if(s[i]=h,h[2]=t(e,n,f))return!0}return!1}}function p(t){return t.length>1?function(e,n,r){for(var o=t.length;o--;)if(!t[o](e,n,r))return!1;return!0}:t[0]}function d(t,n,r){for(var o=0,i=n.length;o<i;o++)e(t,n[o],r);return r}function g(t,e,n,r,o){for(var i,a=[],u=0,f=t.length,c=null!=e;u<f;u++)(i=t[u])&&(n&&!n(i,r,o)||(a.push(i),c&&e.push(u)));return a}function v(t,e,n,o,i,a){return o&&!o[j]&&(o=v(o)),i&&!i[j]&&(i=v(i,a)),r(function(r,a,u,f){var c,s,l,h=[],p=[],v=a.length,b=r||d(e||"*",u.nodeType?[u]:u,[]),y=!t||!r&&e?b:g(b,h,t,u,f),m=n?i||(r?t:v||o)?[]:a:y;if(n&&n(y,m,u,f),o)for(c=g(m,p),o(c,[],u,f),s=c.length;s--;)(l=c[s])&&(m[p[s]]=!(y[p[s]]=l));if(r){if(i||t){if(i){for(c=[],s=m.length;s--;)(l=m[s])&&c.push(y[s]=l);i(null,m=[],c,f)}for(s=m.length;s--;)(l=m[s])&&(c=i?Q(r,l):h[s])>-1&&(r[c]=!(a[c]=l))}}else m=g(m===a?m.splice(v,m.length):m),i?i(null,a,m,f):J.apply(a,m)})}function b(t){for(var e,n,r,o=t.length,i=x.relative[t[0].type],a=i||x.relative[" "],u=i?1:0,f=h(function(t){return t===e},a,!0),c=h(function(t){return Q(e,t)>-1},a,!0),s=[function(t,n,r){var o=!i&&(r||n!==T)||((e=n).nodeType?f(t,n,r):c(t,n,r));return e=null,o}];u<o;u++)if(n=x.relative[t[u].type])s=[h(p(s),n)];else{if(n=x.filter[t[u].type].apply(null,t[u].matches),n[j]){for(r=++u;r<o&&!x.relative[t[r].type];r++);return v(u>1&&p(s),u>1&&l(t.slice(0,u-1).concat({value:" "===t[u-2].type?"*":""})).replace(it,"$1"),n,u<r&&b(t.slice(u,r)),r<o&&b(t=t.slice(r)),r<o&&l(t))}s.push(n)}return p(s)}function y(t,n){var o=n.length>0,i=t.length>0,a=function(r,a,u,f,c){var s,l,h,p=0,d="0",v=r&&[],b=[],y=T,m=r||i&&x.find.TAG("*",c),_=I+=null==y?1:Math.random()||.1,w=m.length;for(c&&(T=a===N||a||c);d!==w&&null!=(s=m[d]);d++){if(i&&s){for(l=0,a||s.ownerDocument===N||(S(s),u=!R);h=t[l++];)if(h(s,a||N,u)){f.push(s);break}c&&(I=_)}o&&((s=!h&&s)&&p--,r&&v.push(s))}if(p+=d,o&&d!==p){for(l=0;h=n[l++];)h(v,b,a,u);if(r){if(p>0)for(;d--;)v[d]||b[d]||(b[d]=V.call(f));b=g(b)}J.apply(f,b),c&&!r&&b.length>0&&p+n.length>1&&e.uniqueSort(f)}return c&&(I=_,T=y),v};return o?r(a):a}var m,_,x,w,F,M,A,E,T,C,k,S,N,D,R,P,q,L,B,j="sizzle"+1*new Date,O=t.document,I=0,U=0,z=n(),H=n(),Y=n(),$=function(t,e){return t===e&&(k=!0),0},W={}.hasOwnProperty,X=[],V=X.pop,G=X.push,J=X.push,Z=X.slice,Q=function(t,e){for(var n=0,r=t.length;n<r;n++)if(t[n]===e)return n;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",tt="[\\x20\\t\\r\\n\\f]",et="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",nt="\\["+tt+"*("+et+")(?:"+tt+"*([*^$|!~]?=)"+tt+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+et+"))|)"+tt+"*\\]",rt=":("+et+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+nt+")*)|.*)\\)|)",ot=new RegExp(tt+"+","g"),it=new RegExp("^"+tt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+tt+"+$","g"),at=new RegExp("^"+tt+"*,"+tt+"*"),ut=new RegExp("^"+tt+"*([>+~]|"+tt+")"+tt+"*"),ft=new RegExp("="+tt+"*([^\\]'\"]*?)"+tt+"*\\]","g"),ct=new RegExp(rt),st=new RegExp("^"+et+"$"),lt={ID:new RegExp("^#("+et+")"),CLASS:new RegExp("^\\.("+et+")"),TAG:new RegExp("^("+et+"|[*])"),ATTR:new RegExp("^"+nt),PSEUDO:new RegExp("^"+rt),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+tt+"*(even|odd|(([+-]|)(\\d*)n|)"+tt+"*(?:([+-]|)"+tt+"*(\\d+)|))"+tt+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+tt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+tt+"*((?:-\\d)?\\d*)"+tt+"*\\)|)(?=[^-]|$)","i")},ht=/^(?:input|select|textarea|button)$/i,pt=/^h\d$/i,dt=/^[^{]+\{\s*\[native \w/,gt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,vt=/[+~]/,bt=new RegExp("\\\\([\\da-f]{1,6}"+tt+"?|("+tt+")|.)","ig"),yt=function(t,e,n){var r="0x"+e-65536;return r!==r||n?e:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},mt=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,_t=function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t},xt=function(){S()},wt=h(function(t){return!0===t.disabled&&("form"in t||"label"in t)},{dir:"parentNode",next:"legend"});try{J.apply(X=Z.call(O.childNodes),O.childNodes),X[O.childNodes.length].nodeType}catch(t){J={apply:X.length?function(t,e){G.apply(t,Z.call(e))}:function(t,e){for(var n=t.length,r=0;t[n++]=e[r++];);t.length=n-1}}}_=e.support={},F=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return!!e&&"HTML"!==e.nodeName},S=e.setDocument=function(t){var e,n,r=t?t.ownerDocument||t:O;return r!==N&&9===r.nodeType&&r.documentElement?(N=r,D=N.documentElement,R=!F(N),O!==N&&(n=N.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",xt,!1):n.attachEvent&&n.attachEvent("onunload",xt)),_.attributes=o(function(t){return t.className="i",!t.getAttribute("className")}),_.getElementsByTagName=o(function(t){return t.appendChild(N.createComment("")),!t.getElementsByTagName("*").length}),_.getElementsByClassName=dt.test(N.getElementsByClassName),_.getById=o(function(t){return D.appendChild(t).id=j,!N.getElementsByName||!N.getElementsByName(j).length}),_.getById?(x.filter.ID=function(t){var e=t.replace(bt,yt);return function(t){return t.getAttribute("id")===e}},x.find.ID=function(t,e){if(void 0!==e.getElementById&&R){var n=e.getElementById(t);return n?[n]:[]}}):(x.filter.ID=function(t){var e=t.replace(bt,yt);return function(t){var n=void 0!==t.getAttributeNode&&t.getAttributeNode("id");return n&&n.value===e}},x.find.ID=function(t,e){if(void 0!==e.getElementById&&R){var n,r,o,i=e.getElementById(t);if(i){if((n=i.getAttributeNode("id"))&&n.value===t)return[i];for(o=e.getElementsByName(t),r=0;i=o[r++];)if((n=i.getAttributeNode("id"))&&n.value===t)return[i]}return[]}}),x.find.TAG=_.getElementsByTagName?function(t,e){return void 0!==e.getElementsByTagName?e.getElementsByTagName(t):_.qsa?e.querySelectorAll(t):void 0}:function(t,e){var n,r=[],o=0,i=e.getElementsByTagName(t);if("*"===t){for(;n=i[o++];)1===n.nodeType&&r.push(n);return r}return i},x.find.CLASS=_.getElementsByClassName&&function(t,e){if(void 0!==e.getElementsByClassName&&R)return e.getElementsByClassName(t)},q=[],P=[],(_.qsa=dt.test(N.querySelectorAll))&&(o(function(t){D.appendChild(t).innerHTML="<a id='"+j+"'></a><select id='"+j+"-\r\\' msallowcapture=''><option selected=''></option></select>",t.querySelectorAll("[msallowcapture^='']").length&&P.push("[*^$]="+tt+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||P.push("\\["+tt+"*(?:value|"+K+")"),t.querySelectorAll("[id~="+j+"-]").length||P.push("~="),t.querySelectorAll(":checked").length||P.push(":checked"),t.querySelectorAll("a#"+j+"+*").length||P.push(".#.+[+~]")}),o(function(t){t.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var e=N.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&P.push("name"+tt+"*[*^$|!~]?="),2!==t.querySelectorAll(":enabled").length&&P.push(":enabled",":disabled"),D.appendChild(t).disabled=!0,2!==t.querySelectorAll(":disabled").length&&P.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),P.push(",.*:")})),(_.matchesSelector=dt.test(L=D.matches||D.webkitMatchesSelector||D.mozMatchesSelector||D.oMatchesSelector||D.msMatchesSelector))&&o(function(t){_.disconnectedMatch=L.call(t,"*"),L.call(t,"[s!='']:x"),q.push("!=",rt)}),P=P.length&&new RegExp(P.join("|")),q=q.length&&new RegExp(q.join("|")),e=dt.test(D.compareDocumentPosition),B=e||dt.test(D.contains)?function(t,e){var n=9===t.nodeType?t.documentElement:t,r=e&&e.parentNode;return t===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):t.compareDocumentPosition&&16&t.compareDocumentPosition(r)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},$=e?function(t,e){if(t===e)return k=!0,0;var n=!t.compareDocumentPosition-!e.compareDocumentPosition;return n||(n=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1,1&n||!_.sortDetached&&e.compareDocumentPosition(t)===n?t===N||t.ownerDocument===O&&B(O,t)?-1:e===N||e.ownerDocument===O&&B(O,e)?1:C?Q(C,t)-Q(C,e):0:4&n?-1:1)}:function(t,e){if(t===e)return k=!0,0;var n,r=0,o=t.parentNode,i=e.parentNode,u=[t],f=[e];if(!o||!i)return t===N?-1:e===N?1:o?-1:i?1:C?Q(C,t)-Q(C,e):0;if(o===i)return a(t,e);for(n=t;n=n.parentNode;)u.unshift(n);for(n=e;n=n.parentNode;)f.unshift(n);for(;u[r]===f[r];)r++;return r?a(u[r],f[r]):u[r]===O?-1:f[r]===O?1:0},N):N},e.matches=function(t,n){return e(t,null,null,n)},e.matchesSelector=function(t,n){if((t.ownerDocument||t)!==N&&S(t),n=n.replace(ft,"='$1']"),_.matchesSelector&&R&&!Y[n+" "]&&(!q||!q.test(n))&&(!P||!P.test(n)))try{var r=L.call(t,n);if(r||_.disconnectedMatch||t.document&&11!==t.document.nodeType)return r}catch(t){}return e(n,N,null,[t]).length>0},e.contains=function(t,e){return(t.ownerDocument||t)!==N&&S(t),B(t,e)},e.attr=function(t,e){(t.ownerDocument||t)!==N&&S(t);var n=x.attrHandle[e.toLowerCase()],r=n&&W.call(x.attrHandle,e.toLowerCase())?n(t,e,!R):void 0;return void 0!==r?r:_.attributes||!R?t.getAttribute(e):(r=t.getAttributeNode(e))&&r.specified?r.value:null},e.escape=function(t){return(t+"").replace(mt,_t)},e.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t)},e.uniqueSort=function(t){var e,n=[],r=0,o=0;if(k=!_.detectDuplicates,C=!_.sortStable&&t.slice(0),t.sort($),k){for(;e=t[o++];)e===t[o]&&(r=n.push(o));for(;r--;)t.splice(n[r],1)}return C=null,t},w=e.getText=function(t){var e,n="",r=0,o=t.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)n+=w(t)}else if(3===o||4===o)return t.nodeValue}else for(;e=t[r++];)n+=w(e);return n},x=e.selectors={cacheLength:50,createPseudo:r,match:lt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(bt,yt),t[3]=(t[3]||t[4]||t[5]||"").replace(bt,yt),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(t){var e,n=!t[6]&&t[2];return lt.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":n&&ct.test(n)&&(e=M(n,!0))&&(e=n.indexOf(")",n.length-e)-n.length)&&(t[0]=t[0].slice(0,e),t[2]=n.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(bt,yt).toLowerCase();return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}},CLASS:function(t){var e=z[t+" "];return e||(e=new RegExp("(^|"+tt+")"+t+"("+tt+"|$)"))&&z(t,function(t){return e.test("string"==typeof t.className&&t.className||void 0!==t.getAttribute&&t.getAttribute("class")||"")})},ATTR:function(t,n,r){return function(o){var i=e.attr(o,t);return null==i?"!="===n:!n||(i+="","="===n?i===r:"!="===n?i!==r:"^="===n?r&&0===i.indexOf(r):"*="===n?r&&i.indexOf(r)>-1:"$="===n?r&&i.slice(-r.length)===r:"~="===n?(" "+i.replace(ot," ")+" ").indexOf(r)>-1:"|="===n&&(i===r||i.slice(0,r.length+1)===r+"-"))}},CHILD:function(t,e,n,r,o){var i="nth"!==t.slice(0,3),a="last"!==t.slice(-4),u="of-type"===e;return 1===r&&0===o?function(t){return!!t.parentNode}:function(e,n,f){var c,s,l,h,p,d,g=i!==a?"nextSibling":"previousSibling",v=e.parentNode,b=u&&e.nodeName.toLowerCase(),y=!f&&!u,m=!1;if(v){if(i){for(;g;){for(h=e;h=h[g];)if(u?h.nodeName.toLowerCase()===b:1===h.nodeType)return!1;d=g="only"===t&&!d&&"nextSibling"}return!0}if(d=[a?v.firstChild:v.lastChild],a&&y){for(h=v,l=h[j]||(h[j]={}),s=l[h.uniqueID]||(l[h.uniqueID]={}),c=s[t]||[],p=c[0]===I&&c[1],m=p&&c[2],h=p&&v.childNodes[p];h=++p&&h&&h[g]||(m=p=0)||d.pop();)if(1===h.nodeType&&++m&&h===e){s[t]=[I,p,m];break}}else if(y&&(h=e,l=h[j]||(h[j]={}),s=l[h.uniqueID]||(l[h.uniqueID]={}),c=s[t]||[],p=c[0]===I&&c[1],m=p),!1===m)for(;(h=++p&&h&&h[g]||(m=p=0)||d.pop())&&((u?h.nodeName.toLowerCase()!==b:1!==h.nodeType)||!++m||(y&&(l=h[j]||(h[j]={}),s=l[h.uniqueID]||(l[h.uniqueID]={}),s[t]=[I,m]),h!==e)););return(m-=o)===r||m%r==0&&m/r>=0}}},PSEUDO:function(t,n){var o,i=x.pseudos[t]||x.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return i[j]?i(n):i.length>1?(o=[t,t,"",n],x.setFilters.hasOwnProperty(t.toLowerCase())?r(function(t,e){for(var r,o=i(t,n),a=o.length;a--;)r=Q(t,o[a]),t[r]=!(e[r]=o[a])}):function(t){return i(t,0,o)}):i}},pseudos:{not:r(function(t){var e=[],n=[],o=A(t.replace(it,"$1"));return o[j]?r(function(t,e,n,r){for(var i,a=o(t,null,r,[]),u=t.length;u--;)(i=a[u])&&(t[u]=!(e[u]=i))}):function(t,r,i){return e[0]=t,o(e,null,i,n),e[0]=null,!n.pop()}}),has:r(function(t){return function(n){return e(t,n).length>0}}),contains:r(function(t){return t=t.replace(bt,yt),function(e){return(e.textContent||e.innerText||w(e)).indexOf(t)>-1}}),lang:r(function(t){return st.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(bt,yt).toLowerCase(),function(e){var n;do{if(n=R?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(n=n.toLowerCase())===t||0===n.indexOf(t+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var n=t.location&&t.location.hash;return n&&n.slice(1)===e.id},root:function(t){return t===D},focus:function(t){return t===N.activeElement&&(!N.hasFocus||N.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},enabled:u(!1),disabled:u(!0),checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,!0===t.selected},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;return!0},parent:function(t){return!x.pseudos.empty(t)},header:function(t){return pt.test(t.nodeName)},input:function(t){return ht.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())},first:f(function(){return[0]}),last:f(function(t,e){return[e-1]}),eq:f(function(t,e,n){return[n<0?n+e:n]}),even:f(function(t,e){for(var n=0;n<e;n+=2)t.push(n);return t}),odd:f(function(t,e){for(var n=1;n<e;n+=2)t.push(n);return t}),lt:f(function(t,e,n){for(var r=n<0?n+e:n;--r>=0;)t.push(r);return t}),gt:f(function(t,e,n){for(var r=n<0?n+e:n;++r<e;)t.push(r);return t})}},x.pseudos.nth=x.pseudos.eq;for(m in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})x.pseudos[m]=function(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}(m);for(m in{submit:!0,reset:!0})x.pseudos[m]=function(t){return function(e){var n=e.nodeName.toLowerCase();return("input"===n||"button"===n)&&e.type===t}}(m);return s.prototype=x.filters=x.pseudos,x.setFilters=new s,M=e.tokenize=function(t,n){var r,o,i,a,u,f,c,s=H[t+" "];if(s)return n?0:s.slice(0);for(u=t,f=[],c=x.preFilter;u;){r&&!(o=at.exec(u))||(o&&(u=u.slice(o[0].length)||u),f.push(i=[])),r=!1,(o=ut.exec(u))&&(r=o.shift(),i.push({value:r,type:o[0].replace(it," ")}),u=u.slice(r.length));for(a in x.filter)!(o=lt[a].exec(u))||c[a]&&!(o=c[a](o))||(r=o.shift(),i.push({value:r,type:a,matches:o}),u=u.slice(r.length));if(!r)break}return n?u.length:u?e.error(t):H(t,f).slice(0)},A=e.compile=function(t,e){var n,r=[],o=[],i=Y[t+" "];if(!i){for(e||(e=M(t)),n=e.length;n--;)i=b(e[n]),i[j]?r.push(i):o.push(i);i=Y(t,y(o,r)),i.selector=t}return i},E=e.select=function(t,e,n,r){var o,i,a,u,f,s="function"==typeof t&&t,h=!r&&M(t=s.selector||t);if(n=n||[],1===h.length){if(i=h[0]=h[0].slice(0),i.length>2&&"ID"===(a=i[0]).type&&9===e.nodeType&&R&&x.relative[i[1].type]){if(!(e=(x.find.ID(a.matches[0].replace(bt,yt),e)||[])[0]))return n;s&&(e=e.parentNode),t=t.slice(i.shift().value.length)}for(o=lt.needsContext.test(t)?0:i.length;o--&&(a=i[o],!x.relative[u=a.type]);)if((f=x.find[u])&&(r=f(a.matches[0].replace(bt,yt),vt.test(i[0].type)&&c(e.parentNode)||e))){if(i.splice(o,1),!(t=r.length&&l(i)))return J.apply(n,r),n;break}}return(s||A(t,h))(r,e,!R,n,!e||vt.test(t)&&c(e.parentNode)||e),n},_.sortStable=j.split("").sort($).join("")===j,_.detectDuplicates=!!k,S(),_.sortDetached=o(function(t){return 1&t.compareDocumentPosition(N.createElement("fieldset"))}),o(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||i("type|href|height|width",function(t,e,n){if(!n)return t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),_.attributes&&o(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||i("value",function(t,e,n){if(!n&&"input"===t.nodeName.toLowerCase())return t.defaultValue}),o(function(t){return null==t.getAttribute("disabled")})||i(K,function(t,e,n){var r;if(!n)return!0===t[e]?e.toLowerCase():(r=t.getAttributeNode(e))&&r.specified?r.value:null}),e}(n);yt.find=_t,yt.expr=_t.selectors,yt.expr[":"]=yt.expr.pseudos,yt.uniqueSort=yt.unique=_t.uniqueSort,yt.text=_t.getText,yt.isXMLDoc=_t.isXML,yt.contains=_t.contains,yt.escapeSelector=_t.escape;var xt=function(t,e,n){for(var r=[],o=void 0!==n;(t=t[e])&&9!==t.nodeType;)if(1===t.nodeType){if(o&&yt(t).is(n))break;r.push(t)}return r},wt=function(t,e){for(var n=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&n.push(t);return n},Ft=yt.expr.match.needsContext,Mt=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,At=/^.[^:#\[\.,]*$/;yt.filter=function(t,e,n){var r=e[0];return n&&(t=":not("+t+")"),1===e.length&&1===r.nodeType?yt.find.matchesSelector(r,t)?[r]:[]:yt.find.matches(t,yt.grep(e,function(t){return 1===t.nodeType}))},yt.fn.extend({find:function(t){var e,n,r=this.length,o=this;if("string"!=typeof t)return this.pushStack(yt(t).filter(function(){for(e=0;e<r;e++)if(yt.contains(o[e],this))return!0}));for(n=this.pushStack([]),e=0;e<r;e++)yt.find(t,o[e],n);return r>1?yt.uniqueSort(n):n},filter:function(t){return this.pushStack(c(this,t||[],!1))},not:function(t){return this.pushStack(c(this,t||[],!0))},is:function(t){return!!c(this,"string"==typeof t&&Ft.test(t)?yt(t):t||[],!1).length}});var Et,Tt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(yt.fn.init=function(t,e,n){var r,o;if(!t)return this;if(n=n||Et,"string"==typeof t){if(!(r="<"===t[0]&&">"===t[t.length-1]&&t.length>=3?[null,t,null]:Tt.exec(t))||!r[1]&&e)return!e||e.jquery?(e||n).find(t):this.constructor(e).find(t);if(r[1]){if(e=e instanceof yt?e[0]:e,yt.merge(this,yt.parseHTML(r[1],e&&e.nodeType?e.ownerDocument||e:at,!0)),Mt.test(r[1])&&yt.isPlainObject(e))for(r in e)yt.isFunction(this[r])?this[r](e[r]):this.attr(r,e[r]);return this}return o=at.getElementById(r[2]),o&&(this[0]=o,this.length=1),this}return t.nodeType?(this[0]=t,this.length=1,this):yt.isFunction(t)?void 0!==n.ready?n.ready(t):t(yt):yt.makeArray(t,this)}).prototype=yt.fn,Et=yt(at);var Ct=/^(?:parents|prev(?:Until|All))/,kt={children:!0,contents:!0,next:!0,prev:!0};yt.fn.extend({has:function(t){var e=yt(t,this),n=e.length;return this.filter(function(){for(var t=0;t<n;t++)if(yt.contains(this,e[t]))return!0})},closest:function(t,e){var n,r=0,o=this.length,i=[],a="string"!=typeof t&&yt(t);if(!Ft.test(t))for(;r<o;r++)for(n=this[r];n&&n!==e;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&yt.find.matchesSelector(n,t))){i.push(n);break}return this.pushStack(i.length>1?yt.uniqueSort(i):i)},index:function(t){return t?"string"==typeof t?lt.call(yt(t),this[0]):lt.call(this,t.jquery?t[0]:t):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,e){return this.pushStack(yt.uniqueSort(yt.merge(this.get(),yt(t,e))))},addBack:function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}}),yt.each({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},parents:function(t){return xt(t,"parentNode")},parentsUntil:function(t,e,n){return xt(t,"parentNode",n)},next:function(t){return s(t,"nextSibling")},prev:function(t){return s(t,"previousSibling")},nextAll:function(t){return xt(t,"nextSibling")},prevAll:function(t){return xt(t,"previousSibling")},nextUntil:function(t,e,n){return xt(t,"nextSibling",n)},prevUntil:function(t,e,n){return xt(t,"previousSibling",n)},siblings:function(t){return wt((t.parentNode||{}).firstChild,t)},children:function(t){return wt(t.firstChild)},contents:function(t){return f(t,"iframe")?t.contentDocument:(f(t,"template")&&(t=t.content||t),yt.merge([],t.childNodes))}},function(t,e){yt.fn[t]=function(n,r){var o=yt.map(this,e,n);return"Until"!==t.slice(-5)&&(r=n),r&&"string"==typeof r&&(o=yt.filter(r,o)),this.length>1&&(kt[t]||yt.uniqueSort(o),Ct.test(t)&&o.reverse()),this.pushStack(o)}});var St=/[^\x20\t\r\n\f]+/g;yt.Callbacks=function(t){t="string"==typeof t?l(t):yt.extend({},t);var e,n,r,o,i=[],a=[],u=-1,f=function(){for(o=o||t.once,r=e=!0;a.length;u=-1)for(n=a.shift();++u<i.length;)!1===i[u].apply(n[0],n[1])&&t.stopOnFalse&&(u=i.length,n=!1);t.memory||(n=!1),e=!1,o&&(i=n?[]:"")},c={add:function(){return i&&(n&&!e&&(u=i.length-1,a.push(n)),function e(n){yt.each(n,function(n,r){yt.isFunction(r)?t.unique&&c.has(r)||i.push(r):r&&r.length&&"string"!==yt.type(r)&&e(r)})}(arguments),n&&!e&&f()),this},remove:function(){return yt.each(arguments,function(t,e){for(var n;(n=yt.inArray(e,i,n))>-1;)i.splice(n,1),n<=u&&u--}),this},has:function(t){return t?yt.inArray(t,i)>-1:i.length>0},empty:function(){return i&&(i=[]),this},disable:function(){return o=a=[],i=n="",this},disabled:function(){return!i},lock:function(){return o=a=[],n||e||(i=n=""),this},locked:function(){return!!o},fireWith:function(t,n){return o||(n=n||[],n=[t,n.slice?n.slice():n],a.push(n),e||f()),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},yt.extend({Deferred:function(t){var e=[["notify","progress",yt.Callbacks("memory"),yt.Callbacks("memory"),2],["resolve","done",yt.Callbacks("once memory"),yt.Callbacks("once memory"),0,"resolved"],["reject","fail",yt.Callbacks("once memory"),yt.Callbacks("once memory"),1,"rejected"]],r="pending",o={state:function(){return r},always:function(){return i.done(arguments).fail(arguments),this},catch:function(t){return o.then(null,t)},pipe:function(){var t=arguments;return yt.Deferred(function(n){yt.each(e,function(e,r){var o=yt.isFunction(t[r[4]])&&t[r[4]];i[r[1]](function(){var t=o&&o.apply(this,arguments);t&&yt.isFunction(t.promise)?t.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[r[0]+"With"](this,o?[t]:arguments)})}),t=null}).promise()},then:function(t,r,o){function i(t,e,r,o){return function(){var u=this,f=arguments,c=function(){var n,c;if(!(t<a)){if((n=r.apply(u,f))===e.promise())throw new TypeError("Thenable self-resolution");c=n&&("object"==typeof n||"function"==typeof n)&&n.then,yt.isFunction(c)?o?c.call(n,i(a,e,h,o),i(a,e,p,o)):(a++,c.call(n,i(a,e,h,o),i(a,e,p,o),i(a,e,h,e.notifyWith))):(r!==h&&(u=void 0,f=[n]),(o||e.resolveWith)(u,f))}},s=o?c:function(){try{c()}catch(n){yt.Deferred.exceptionHook&&yt.Deferred.exceptionHook(n,s.stackTrace),t+1>=a&&(r!==p&&(u=void 0,f=[n]),e.rejectWith(u,f))}};t?s():(yt.Deferred.getStackHook&&(s.stackTrace=yt.Deferred.getStackHook()),n.setTimeout(s))}}var a=0;return yt.Deferred(function(n){e[0][3].add(i(0,n,yt.isFunction(o)?o:h,n.notifyWith)),e[1][3].add(i(0,n,yt.isFunction(t)?t:h)),e[2][3].add(i(0,n,yt.isFunction(r)?r:p))}).promise()},promise:function(t){return null!=t?yt.extend(t,o):o}},i={};return yt.each(e,function(t,n){var a=n[2],u=n[5];o[n[1]]=a.add,u&&a.add(function(){r=u},e[3-t][2].disable,e[0][2].lock),a.add(n[3].fire),i[n[0]]=function(){return i[n[0]+"With"](this===i?void 0:this,arguments),this},i[n[0]+"With"]=a.fireWith}),o.promise(i),t&&t.call(i,i),i},when:function(t){var e=arguments.length,n=e,r=Array(n),o=ft.call(arguments),i=yt.Deferred(),a=function(t){return function(n){r[t]=this,o[t]=arguments.length>1?ft.call(arguments):n,--e||i.resolveWith(r,o)}};if(e<=1&&(d(t,i.done(a(n)).resolve,i.reject,!e),"pending"===i.state()||yt.isFunction(o[n]&&o[n].then)))return i.then();for(;n--;)d(o[n],a(n),i.reject);return i.promise()}});var Nt=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;yt.Deferred.exceptionHook=function(t,e){n.console&&n.console.warn&&t&&Nt.test(t.name)&&n.console.warn("jQuery.Deferred exception: "+t.message,t.stack,e)},yt.readyException=function(t){n.setTimeout(function(){throw t})};var Dt=yt.Deferred();yt.fn.ready=function(t){return Dt.then(t).catch(function(t){yt.readyException(t)}),this},yt.extend({isReady:!1,readyWait:1,ready:function(t){(!0===t?--yt.readyWait:yt.isReady)||(yt.isReady=!0,!0!==t&&--yt.readyWait>0||Dt.resolveWith(at,[yt]))}}),yt.ready.then=Dt.then,"complete"===at.readyState||"loading"!==at.readyState&&!at.documentElement.doScroll?n.setTimeout(yt.ready):(at.addEventListener("DOMContentLoaded",g),n.addEventListener("load",g));var Rt=function(t,e,n,r,o,i,a){var u=0,f=t.length,c=null==n;if("object"===yt.type(n)){o=!0;for(u in n)Rt(t,e,u,n[u],!0,i,a)}else if(void 0!==r&&(o=!0,yt.isFunction(r)||(a=!0),c&&(a?(e.call(t,r),e=null):(c=e,e=function(t,e,n){return c.call(yt(t),n)})),e))for(;u<f;u++)e(t[u],n,a?r:r.call(t[u],u,e(t[u],n)));return o?t:c?e.call(t):f?e(t[0],n):i},Pt=function(t){return 1===t.nodeType||9===t.nodeType||!+t.nodeType};v.uid=1,v.prototype={cache:function(t){var e=t[this.expando];return e||(e={},Pt(t)&&(t.nodeType?t[this.expando]=e:Object.defineProperty(t,this.expando,{value:e,configurable:!0}))),e},set:function(t,e,n){var r,o=this.cache(t);if("string"==typeof e)o[yt.camelCase(e)]=n;else for(r in e)o[yt.camelCase(r)]=e[r];return o},get:function(t,e){return void 0===e?this.cache(t):t[this.expando]&&t[this.expando][yt.camelCase(e)]},access:function(t,e,n){return void 0===e||e&&"string"==typeof e&&void 0===n?this.get(t,e):(this.set(t,e,n),void 0!==n?n:e)},remove:function(t,e){var n,r=t[this.expando];if(void 0!==r){if(void 0!==e){Array.isArray(e)?e=e.map(yt.camelCase):(e=yt.camelCase(e),e=e in r?[e]:e.match(St)||[]),n=e.length;for(;n--;)delete r[e[n]]}(void 0===e||yt.isEmptyObject(r))&&(t.nodeType?t[this.expando]=void 0:delete t[this.expando])}},hasData:function(t){var e=t[this.expando];return void 0!==e&&!yt.isEmptyObject(e)}};var qt=new v,Lt=new v,Bt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,jt=/[A-Z]/g;yt.extend({hasData:function(t){return Lt.hasData(t)||qt.hasData(t)},data:function(t,e,n){return Lt.access(t,e,n)},removeData:function(t,e){Lt.remove(t,e)},_data:function(t,e,n){return qt.access(t,e,n)},_removeData:function(t,e){qt.remove(t,e)}}),yt.fn.extend({data:function(t,e){var n,r,o,i=this[0],a=i&&i.attributes;if(void 0===t){if(this.length&&(o=Lt.get(i),1===i.nodeType&&!qt.get(i,"hasDataAttrs"))){for(n=a.length;n--;)a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=yt.camelCase(r.slice(5)),y(i,r,o[r])));qt.set(i,"hasDataAttrs",!0)}return o}return"object"==typeof t?this.each(function(){Lt.set(this,t)}):Rt(this,function(e){var n;if(i&&void 0===e){if(void 0!==(n=Lt.get(i,t)))return n;if(void 0!==(n=y(i,t)))return n}else this.each(function(){Lt.set(this,t,e)})},null,e,arguments.length>1,null,!0)},removeData:function(t){return this.each(function(){Lt.remove(this,t)})}}),yt.extend({queue:function(t,e,n){var r;if(t)return e=(e||"fx")+"queue",r=qt.get(t,e),n&&(!r||Array.isArray(n)?r=qt.access(t,e,yt.makeArray(n)):r.push(n)),r||[]},dequeue:function(t,e){e=e||"fx";var n=yt.queue(t,e),r=n.length,o=n.shift(),i=yt._queueHooks(t,e),a=function(){yt.dequeue(t,e)};"inprogress"===o&&(o=n.shift(),r--),o&&("fx"===e&&n.unshift("inprogress"),delete i.stop,o.call(t,a,i)),!r&&i&&i.empty.fire()},_queueHooks:function(t,e){var n=e+"queueHooks";return qt.get(t,n)||qt.access(t,n,{empty:yt.Callbacks("once memory").add(function(){qt.remove(t,[e+"queue",n])})})}}),yt.fn.extend({queue:function(t,e){var n=2;return"string"!=typeof t&&(e=t,t="fx",n--),arguments.length<n?yt.queue(this[0],t):void 0===e?this:this.each(function(){var n=yt.queue(this,t,e);yt._queueHooks(this,t),"fx"===t&&"inprogress"!==n[0]&&yt.dequeue(this,t)})},dequeue:function(t){return this.each(function(){yt.dequeue(this,t)})},clearQueue:function(t){return this.queue(t||"fx",[])},promise:function(t,e){var n,r=1,o=yt.Deferred(),i=this,a=this.length,u=function(){--r||o.resolveWith(i,[i])};for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";a--;)(n=qt.get(i[a],t+"queueHooks"))&&n.empty&&(r++,n.empty.add(u));return u(),o.promise(e)}});var Ot=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,It=new RegExp("^(?:([+-])=|)("+Ot+")([a-z%]*)$","i"),Ut=["Top","Right","Bottom","Left"],zt=function(t,e){return t=e||t,"none"===t.style.display||""===t.style.display&&yt.contains(t.ownerDocument,t)&&"none"===yt.css(t,"display")},Ht=function(t,e,n,r){var o,i,a={};for(i in e)a[i]=t.style[i],t.style[i]=e[i];o=n.apply(t,r||[]);for(i in e)t.style[i]=a[i];return o},Yt={};yt.fn.extend({show:function(){return x(this,!0)},hide:function(){return x(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){zt(this)?yt(this).show():yt(this).hide()})}});var $t=/^(?:checkbox|radio)$/i,Wt=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,Xt=/^$|\/(?:java|ecma)script/i,Vt={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Vt.optgroup=Vt.option,Vt.tbody=Vt.tfoot=Vt.colgroup=Vt.caption=Vt.thead,Vt.th=Vt.td;var Gt=/<|&#?\w+;/;!function(){var t=at.createDocumentFragment(),e=t.appendChild(at.createElement("div")),n=at.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),e.appendChild(n),bt.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",bt.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var Jt=at.documentElement,Zt=/^key/,Qt=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Kt=/^([^.]*)(?:\.(.+)|)/;yt.event={global:{},add:function(t,e,n,r,o){var i,a,u,f,c,s,l,h,p,d,g,v=qt.get(t);if(v)for(n.handler&&(i=n,n=i.handler,o=i.selector),o&&yt.find.matchesSelector(Jt,o),n.guid||(n.guid=yt.guid++),(f=v.events)||(f=v.events={}),(a=v.handle)||(a=v.handle=function(e){return void 0!==yt&&yt.event.triggered!==e.type?yt.event.dispatch.apply(t,arguments):void 0}),e=(e||"").match(St)||[""],c=e.length;c--;)u=Kt.exec(e[c])||[],p=g=u[1],d=(u[2]||"").split(".").sort(),p&&(l=yt.event.special[p]||{},p=(o?l.delegateType:l.bindType)||p,l=yt.event.special[p]||{},s=yt.extend({type:p,origType:g,data:r,handler:n,guid:n.guid,selector:o,needsContext:o&&yt.expr.match.needsContext.test(o),namespace:d.join(".")},i),(h=f[p])||(h=f[p]=[],h.delegateCount=0,l.setup&&!1!==l.setup.call(t,r,d,a)||t.addEventListener&&t.addEventListener(p,a)),l.add&&(l.add.call(t,s),s.handler.guid||(s.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,s):h.push(s),yt.event.global[p]=!0)},remove:function(t,e,n,r,o){var i,a,u,f,c,s,l,h,p,d,g,v=qt.hasData(t)&&qt.get(t);if(v&&(f=v.events)){for(e=(e||"").match(St)||[""],c=e.length;c--;)if(u=Kt.exec(e[c])||[],p=g=u[1],d=(u[2]||"").split(".").sort(),p){for(l=yt.event.special[p]||{},p=(r?l.delegateType:l.bindType)||p,h=f[p]||[],u=u[2]&&new RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=i=h.length;i--;)s=h[i],!o&&g!==s.origType||n&&n.guid!==s.guid||u&&!u.test(s.namespace)||r&&r!==s.selector&&("**"!==r||!s.selector)||(h.splice(i,1),s.selector&&h.delegateCount--,l.remove&&l.remove.call(t,s));a&&!h.length&&(l.teardown&&!1!==l.teardown.call(t,d,v.handle)||yt.removeEvent(t,p,v.handle),delete f[p])}else for(p in f)yt.event.remove(t,p+e[c],n,r,!0);yt.isEmptyObject(f)&&qt.remove(t,"handle events")}},dispatch:function(t){var e,n,r,o,i,a,u=yt.event.fix(t),f=new Array(arguments.length),c=(qt.get(this,"events")||{})[u.type]||[],s=yt.event.special[u.type]||{};for(f[0]=u,e=1;e<arguments.length;e++)f[e]=arguments[e];if(u.delegateTarget=this,!s.preDispatch||!1!==s.preDispatch.call(this,u)){for(a=yt.event.handlers.call(this,u,c),e=0;(o=a[e++])&&!u.isPropagationStopped();)for(u.currentTarget=o.elem,n=0;(i=o.handlers[n++])&&!u.isImmediatePropagationStopped();)u.rnamespace&&!u.rnamespace.test(i.namespace)||(u.handleObj=i,u.data=i.data,void 0!==(r=((yt.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,f))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()));return s.postDispatch&&s.postDispatch.call(this,u),u.result}},handlers:function(t,e){var n,r,o,i,a,u=[],f=e.delegateCount,c=t.target;if(f&&c.nodeType&&!("click"===t.type&&t.button>=1))for(;c!==this;c=c.parentNode||this)if(1===c.nodeType&&("click"!==t.type||!0!==c.disabled)){for(i=[],a={},n=0;n<f;n++)r=e[n],o=r.selector+" ",void 0===a[o]&&(a[o]=r.needsContext?yt(o,this).index(c)>-1:yt.find(o,this,null,[c]).length),a[o]&&i.push(r);i.length&&u.push({elem:c,handlers:i})}return c=this,f<e.length&&u.push({elem:c,handlers:e.slice(f)}),u},addProp:function(t,e){Object.defineProperty(yt.Event.prototype,t,{enumerable:!0,configurable:!0,get:yt.isFunction(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(t){return t[yt.expando]?t:new yt.Event(t)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==T()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===T()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&f(this,"input"))return this.click(),!1},_default:function(t){return f(t.target,"a")}},beforeunload:{postDispatch:function(t){void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result)}}}},yt.removeEvent=function(t,e,n){t.removeEventListener&&t.removeEventListener(e,n)},yt.Event=function(t,e){if(!(this instanceof yt.Event))return new yt.Event(t,e);t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&!1===t.returnValue?A:E,this.target=t.target&&3===t.target.nodeType?t.target.parentNode:t.target,this.currentTarget=t.currentTarget,this.relatedTarget=t.relatedTarget):this.type=t,e&&yt.extend(this,e),this.timeStamp=t&&t.timeStamp||yt.now(),this[yt.expando]=!0},yt.Event.prototype={constructor:yt.Event,isDefaultPrevented:E,isPropagationStopped:E,isImmediatePropagationStopped:E,isSimulated:!1,preventDefault:function(){var t=this.originalEvent;this.isDefaultPrevented=A,t&&!this.isSimulated&&t.preventDefault()},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=A,t&&!this.isSimulated&&t.stopPropagation()},stopImmediatePropagation:function(){var t=this.originalEvent;this.isImmediatePropagationStopped=A,t&&!this.isSimulated&&t.stopImmediatePropagation(),this.stopPropagation()}},yt.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(t){var e=t.button;return null==t.which&&Zt.test(t.type)?null!=t.charCode?t.charCode:t.keyCode:!t.which&&void 0!==e&&Qt.test(t.type)?1&e?1:2&e?3:4&e?2:0:t.which}},yt.event.addProp),yt.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,e){yt.event.special[t]={delegateType:e,bindType:e,handle:function(t){var n,r=this,o=t.relatedTarget,i=t.handleObj;return o&&(o===r||yt.contains(r,o))||(t.type=i.origType,n=i.handler.apply(this,arguments),t.type=e),n}}}),yt.fn.extend({on:function(t,e,n,r){return C(this,t,e,n,r)},one:function(t,e,n,r){return C(this,t,e,n,r,1)},off:function(t,e,n){var r,o;if(t&&t.preventDefault&&t.handleObj)return r=t.handleObj,yt(t.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof t){for(o in t)this.off(o,e,t[o]);return this}return!1!==e&&"function"!=typeof e||(n=e,e=void 0),!1===n&&(n=E),this.each(function(){yt.event.remove(this,t,n,e)})}});var te=/<script|<style|<link/i,ee=/checked\s*(?:[^=]|=\s*.checked.)/i,ne=/^true\/(.*)/,re=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;yt.extend({htmlPrefilter:function(t){return t.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,"<$1></$2>")},clone:function(t,e,n){var r,o,i,a,u=t.cloneNode(!0),f=yt.contains(t.ownerDocument,t);if(!(bt.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||yt.isXMLDoc(t)))for(a=w(u),i=w(t),r=0,o=i.length;r<o;r++)R(i[r],a[r]);if(e)if(n)for(i=i||w(t),a=a||w(u),r=0,o=i.length;r<o;r++)D(i[r],a[r]);else D(t,u);return a=w(u,"script"),a.length>0&&F(a,!f&&w(t,"script")),u},cleanData:function(t){for(var e,n,r,o=yt.event.special,i=0;void 0!==(n=t[i]);i++)if(Pt(n)){if(e=n[qt.expando]){if(e.events)for(r in e.events)o[r]?yt.event.remove(n,r):yt.removeEvent(n,r,e.handle);n[qt.expando]=void 0}n[Lt.expando]&&(n[Lt.expando]=void 0)}}}),yt.fn.extend({detach:function(t){return q(this,t,!0)},remove:function(t){return q(this,t)},text:function(t){return Rt(this,function(t){return void 0===t?yt.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=t)})},null,t,arguments.length)},append:function(){return P(this,arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){k(this,t).appendChild(t)}})},prepend:function(){return P(this,arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=k(this,t);e.insertBefore(t,e.firstChild)}})},before:function(){return P(this,arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return P(this,arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},empty:function(){for(var t,e=0;null!=(t=this[e]);e++)1===t.nodeType&&(yt.cleanData(w(t,!1)),t.textContent="");return this},clone:function(t,e){return t=null!=t&&t,e=null==e?t:e,this.map(function(){return yt.clone(this,t,e)})},html:function(t){return Rt(this,function(t){var e=this[0]||{},n=0,r=this.length;if(void 0===t&&1===e.nodeType)return e.innerHTML;if("string"==typeof t&&!te.test(t)&&!Vt[(Wt.exec(t)||["",""])[1].toLowerCase()]){t=yt.htmlPrefilter(t);try{for(;n<r;n++)e=this[n]||{},1===e.nodeType&&(yt.cleanData(w(e,!1)),e.innerHTML=t);e=0}catch(t){}}e&&this.empty().append(t)},null,t,arguments.length)},replaceWith:function(){var t=[];return P(this,arguments,function(e){var n=this.parentNode;yt.inArray(this,t)<0&&(yt.cleanData(w(this)),n&&n.replaceChild(e,this))},t)}}),yt.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(t,e){yt.fn[t]=function(t){for(var n,r=[],o=yt(t),i=o.length-1,a=0;a<=i;a++)n=a===i?this:this.clone(!0),yt(o[a])[e](n),st.apply(r,n.get());return this.pushStack(r)}});var oe=/^margin/,ie=new RegExp("^("+Ot+")(?!px)[a-z%]+$","i"),ae=function(t){var e=t.ownerDocument.defaultView;return e&&e.opener||(e=n),e.getComputedStyle(t)};!function(){function t(){if(u){u.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",u.innerHTML="",Jt.appendChild(a);var t=n.getComputedStyle(u);e="1%"!==t.top,i="2px"===t.marginLeft,r="4px"===t.width,u.style.marginRight="50%",o="4px"===t.marginRight,Jt.removeChild(a),u=null}}var e,r,o,i,a=at.createElement("div"),u=at.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",bt.clearCloneStyle="content-box"===u.style.backgroundClip,a.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",a.appendChild(u),yt.extend(bt,{pixelPosition:function(){return t(),e},boxSizingReliable:function(){return t(),r},pixelMarginRight:function(){return t(),o},reliableMarginLeft:function(){return t(),i}}))}();var ue=/^(none|table(?!-c[ea]).+)/,fe=/^--/,ce={position:"absolute",visibility:"hidden",display:"block"},se={letterSpacing:"0",fontWeight:"400"},le=["Webkit","Moz","ms"],he=at.createElement("div").style;yt.extend({cssHooks:{opacity:{get:function(t,e){if(e){var n=L(t,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:"cssFloat"},style:function(t,e,n,r){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var o,i,a,u=yt.camelCase(e),f=fe.test(e),c=t.style;if(f||(e=O(u)),a=yt.cssHooks[e]||yt.cssHooks[u],void 0===n)return a&&"get"in a&&void 0!==(o=a.get(t,!1,r))?o:c[e];i=typeof n,"string"===i&&(o=It.exec(n))&&o[1]&&(n=m(t,e,o),i="number"),null!=n&&n===n&&("number"===i&&(n+=o&&o[3]||(yt.cssNumber[u]?"":"px")),bt.clearCloneStyle||""!==n||0!==e.indexOf("background")||(c[e]="inherit"),a&&"set"in a&&void 0===(n=a.set(t,n,r))||(f?c.setProperty(e,n):c[e]=n))}},css:function(t,e,n,r){var o,i,a,u=yt.camelCase(e);return fe.test(e)||(e=O(u)),a=yt.cssHooks[e]||yt.cssHooks[u],a&&"get"in a&&(o=a.get(t,!0,n)),void 0===o&&(o=L(t,e,r)),"normal"===o&&e in se&&(o=se[e]),""===n||n?(i=parseFloat(o),!0===n||isFinite(i)?i||0:o):o}}),yt.each(["height","width"],function(t,e){yt.cssHooks[e]={get:function(t,n,r){if(n)return!ue.test(yt.css(t,"display"))||t.getClientRects().length&&t.getBoundingClientRect().width?z(t,e,r):Ht(t,ce,function(){return z(t,e,r)})},set:function(t,n,r){var o,i=r&&ae(t),a=r&&U(t,e,r,"border-box"===yt.css(t,"boxSizing",!1,i),i);return a&&(o=It.exec(n))&&"px"!==(o[3]||"px")&&(t.style[e]=n,n=yt.css(t,e)),I(t,n,a)}}}),yt.cssHooks.marginLeft=B(bt.reliableMarginLeft,function(t,e){if(e)return(parseFloat(L(t,"marginLeft"))||t.getBoundingClientRect().left-Ht(t,{marginLeft:0},function(){return t.getBoundingClientRect().left}))+"px"}),yt.each({margin:"",padding:"",border:"Width"},function(t,e){yt.cssHooks[t+e]={expand:function(n){for(var r=0,o={},i="string"==typeof n?n.split(" "):[n];r<4;r++)o[t+Ut[r]+e]=i[r]||i[r-2]||i[0];return o}},oe.test(t)||(yt.cssHooks[t+e].set=I)}),yt.fn.extend({css:function(t,e){return Rt(this,function(t,e,n){var r,o,i={},a=0;if(Array.isArray(e)){for(r=ae(t),o=e.length;a<o;a++)i[e[a]]=yt.css(t,e[a],!1,r);return i}return void 0!==n?yt.style(t,e,n):yt.css(t,e)},t,e,arguments.length>1)}}),yt.Tween=H,H.prototype={constructor:H,init:function(t,e,n,r,o,i){this.elem=t,this.prop=n,this.easing=o||yt.easing._default,this.options=e,this.start=this.now=this.cur(),this.end=r,this.unit=i||(yt.cssNumber[n]?"":"px")},cur:function(){var t=H.propHooks[this.prop];return t&&t.get?t.get(this):H.propHooks._default.get(this)},run:function(t){var e,n=H.propHooks[this.prop];return this.options.duration?this.pos=e=yt.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):this.pos=e=t,this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):H.propHooks._default.set(this),this}},H.prototype.init.prototype=H.prototype,H.propHooks={_default:{get:function(t){var e;return 1!==t.elem.nodeType||null!=t.elem[t.prop]&&null==t.elem.style[t.prop]?t.elem[t.prop]:(e=yt.css(t.elem,t.prop,""),e&&"auto"!==e?e:0)},set:function(t){yt.fx.step[t.prop]?yt.fx.step[t.prop](t):1!==t.elem.nodeType||null==t.elem.style[yt.cssProps[t.prop]]&&!yt.cssHooks[t.prop]?t.elem[t.prop]=t.now:yt.style(t.elem,t.prop,t.now+t.unit)}}},H.propHooks.scrollTop=H.propHooks.scrollLeft={set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)}},yt.easing={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2},_default:"swing"},yt.fx=H.prototype.init,yt.fx.step={};var pe,de,ge=/^(?:toggle|show|hide)$/,ve=/queueHooks$/;yt.Animation=yt.extend(J,{tweeners:{"*":[function(t,e){var n=this.createTween(t,e);return m(n.elem,t,It.exec(e),n),n}]},tweener:function(t,e){yt.isFunction(t)?(e=t,t=["*"]):t=t.match(St);for(var n,r=0,o=t.length;r<o;r++)n=t[r],J.tweeners[n]=J.tweeners[n]||[],J.tweeners[n].unshift(e)},prefilters:[V],prefilter:function(t,e){e?J.prefilters.unshift(t):J.prefilters.push(t)}}),yt.speed=function(t,e,n){var r=t&&"object"==typeof t?yt.extend({},t):{complete:n||!n&&e||yt.isFunction(t)&&t,duration:t,easing:n&&e||e&&!yt.isFunction(e)&&e};return yt.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in yt.fx.speeds?r.duration=yt.fx.speeds[r.duration]:r.duration=yt.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){yt.isFunction(r.old)&&r.old.call(this),r.queue&&yt.dequeue(this,r.queue)},r},yt.fn.extend({fadeTo:function(t,e,n,r){return this.filter(zt).css("opacity",0).show().end().animate({opacity:e},t,n,r)},animate:function(t,e,n,r){var o=yt.isEmptyObject(t),i=yt.speed(e,n,r),a=function(){var e=J(this,yt.extend({},t),i);(o||qt.get(this,"finish"))&&e.stop(!0)};return a.finish=a,o||!1===i.queue?this.each(a):this.queue(i.queue,a)},stop:function(t,e,n){var r=function(t){var e=t.stop;delete t.stop,e(n)};return"string"!=typeof t&&(n=e,e=t,t=void 0),e&&!1!==t&&this.queue(t||"fx",[]),this.each(function(){var e=!0,o=null!=t&&t+"queueHooks",i=yt.timers,a=qt.get(this);if(o)a[o]&&a[o].stop&&r(a[o]);else for(o in a)a[o]&&a[o].stop&&ve.test(o)&&r(a[o]);for(o=i.length;o--;)i[o].elem!==this||null!=t&&i[o].queue!==t||(i[o].anim.stop(n),e=!1,i.splice(o,1));!e&&n||yt.dequeue(this,t)})},finish:function(t){return!1!==t&&(t=t||"fx"),this.each(function(){var e,n=qt.get(this),r=n[t+"queue"],o=n[t+"queueHooks"],i=yt.timers,a=r?r.length:0;for(n.finish=!0,yt.queue(this,t,[]),o&&o.stop&&o.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===t&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<a;e++)r[e]&&r[e].finish&&r[e].finish.call(this);delete n.finish})}}),yt.each(["toggle","show","hide"],function(t,e){var n=yt.fn[e];yt.fn[e]=function(t,r,o){return null==t||"boolean"==typeof t?n.apply(this,arguments):this.animate(W(e,!0),t,r,o)}}),yt.each({slideDown:W("show"),slideUp:W("hide"),slideToggle:W("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,e){yt.fn[t]=function(t,n,r){return this.animate(e,t,n,r)}}),yt.timers=[],yt.fx.tick=function(){var t,e=0,n=yt.timers;for(pe=yt.now();e<n.length;e++)(t=n[e])()||n[e]!==t||n.splice(e--,1);n.length||yt.fx.stop(),pe=void 0},yt.fx.timer=function(t){yt.timers.push(t),yt.fx.start()},yt.fx.interval=13,yt.fx.start=function(){de||(de=!0,Y())},yt.fx.stop=function(){de=null},yt.fx.speeds={slow:600,fast:200,_default:400},yt.fn.delay=function(t,e){return t=yt.fx?yt.fx.speeds[t]||t:t,e=e||"fx",this.queue(e,function(e,r){var o=n.setTimeout(e,t);r.stop=function(){n.clearTimeout(o)}})},function(){var t=at.createElement("input"),e=at.createElement("select"),n=e.appendChild(at.createElement("option"));t.type="checkbox",bt.checkOn=""!==t.value,bt.optSelected=n.selected,t=at.createElement("input"),t.value="t",t.type="radio",bt.radioValue="t"===t.value}();var be,ye=yt.expr.attrHandle;yt.fn.extend({attr:function(t,e){return Rt(this,yt.attr,t,e,arguments.length>1)},removeAttr:function(t){return this.each(function(){yt.removeAttr(this,t)})}}),yt.extend({attr:function(t,e,n){var r,o,i=t.nodeType;if(3!==i&&8!==i&&2!==i)return void 0===t.getAttribute?yt.prop(t,e,n):(1===i&&yt.isXMLDoc(t)||(o=yt.attrHooks[e.toLowerCase()]||(yt.expr.match.bool.test(e)?be:void 0)),void 0!==n?null===n?void yt.removeAttr(t,e):o&&"set"in o&&void 0!==(r=o.set(t,n,e))?r:(t.setAttribute(e,n+""),n):o&&"get"in o&&null!==(r=o.get(t,e))?r:(r=yt.find.attr(t,e),null==r?void 0:r))},attrHooks:{type:{set:function(t,e){if(!bt.radioValue&&"radio"===e&&f(t,"input")){var n=t.value;return t.setAttribute("type",e),n&&(t.value=n),e}}}},removeAttr:function(t,e){var n,r=0,o=e&&e.match(St);if(o&&1===t.nodeType)for(;n=o[r++];)t.removeAttribute(n)}}),be={set:function(t,e,n){return!1===e?yt.removeAttr(t,n):t.setAttribute(n,n),n}},yt.each(yt.expr.match.bool.source.match(/\w+/g),function(t,e){var n=ye[e]||yt.find.attr;ye[e]=function(t,e,r){var o,i,a=e.toLowerCase();return r||(i=ye[a],ye[a]=o,o=null!=n(t,e,r)?a:null,ye[a]=i),o}});var me=/^(?:input|select|textarea|button)$/i,_e=/^(?:a|area)$/i;yt.fn.extend({prop:function(t,e){return Rt(this,yt.prop,t,e,arguments.length>1)},removeProp:function(t){return this.each(function(){delete this[yt.propFix[t]||t]})}}),yt.extend({prop:function(t,e,n){var r,o,i=t.nodeType;if(3!==i&&8!==i&&2!==i)return 1===i&&yt.isXMLDoc(t)||(e=yt.propFix[e]||e,o=yt.propHooks[e]),void 0!==n?o&&"set"in o&&void 0!==(r=o.set(t,n,e))?r:t[e]=n:o&&"get"in o&&null!==(r=o.get(t,e))?r:t[e]},propHooks:{tabIndex:{get:function(t){var e=yt.find.attr(t,"tabindex");return e?parseInt(e,10):me.test(t.nodeName)||_e.test(t.nodeName)&&t.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),bt.optSelected||(yt.propHooks.selected={get:function(t){var e=t.parentNode;return e&&e.parentNode&&e.parentNode.selectedIndex,null},set:function(t){var e=t.parentNode;e&&(e.selectedIndex,e.parentNode&&e.parentNode.selectedIndex)}}),yt.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){yt.propFix[this.toLowerCase()]=this}),yt.fn.extend({addClass:function(t){var e,n,r,o,i,a,u,f=0;if(yt.isFunction(t))return this.each(function(e){yt(this).addClass(t.call(this,e,Q(this)))});if("string"==typeof t&&t)for(e=t.match(St)||[];n=this[f++];)if(o=Q(n),r=1===n.nodeType&&" "+Z(o)+" "){for(a=0;i=e[a++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");u=Z(r),o!==u&&n.setAttribute("class",u)}return this},removeClass:function(t){var e,n,r,o,i,a,u,f=0;if(yt.isFunction(t))return this.each(function(e){yt(this).removeClass(t.call(this,e,Q(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof t&&t)for(e=t.match(St)||[];n=this[f++];)if(o=Q(n),r=1===n.nodeType&&" "+Z(o)+" "){for(a=0;i=e[a++];)for(;r.indexOf(" "+i+" ")>-1;)r=r.replace(" "+i+" "," ");u=Z(r),o!==u&&n.setAttribute("class",u)}return this},toggleClass:function(t,e){var n=typeof t;return"boolean"==typeof e&&"string"===n?e?this.addClass(t):this.removeClass(t):yt.isFunction(t)?this.each(function(n){yt(this).toggleClass(t.call(this,n,Q(this),e),e)}):this.each(function(){var e,r,o,i;if("string"===n)for(r=0,o=yt(this),i=t.match(St)||[];e=i[r++];)o.hasClass(e)?o.removeClass(e):o.addClass(e);else void 0!==t&&"boolean"!==n||(e=Q(this),e&&qt.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===t?"":qt.get(this,"__className__")||""))})},hasClass:function(t){var e,n,r=0;for(e=" "+t+" ";n=this[r++];)if(1===n.nodeType&&(" "+Z(Q(n))+" ").indexOf(e)>-1)return!0;return!1}});yt.fn.extend({val:function(t){var e,n,r,o=this[0];{if(arguments.length)return r=yt.isFunction(t),this.each(function(n){var o;1===this.nodeType&&(o=r?t.call(this,n,yt(this).val()):t,null==o?o="":"number"==typeof o?o+="":Array.isArray(o)&&(o=yt.map(o,function(t){return null==t?"":t+""})),(e=yt.valHooks[this.type]||yt.valHooks[this.nodeName.toLowerCase()])&&"set"in e&&void 0!==e.set(this,o,"value")||(this.value=o))});if(o)return(e=yt.valHooks[o.type]||yt.valHooks[o.nodeName.toLowerCase()])&&"get"in e&&void 0!==(n=e.get(o,"value"))?n:(n=o.value,"string"==typeof n?n.replace(/\r/g,""):null==n?"":n)}}}),yt.extend({valHooks:{option:{get:function(t){var e=yt.find.attr(t,"value");return null!=e?e:Z(yt.text(t))}},select:{get:function(t){var e,n,r,o=t.options,i=t.selectedIndex,a="select-one"===t.type,u=a?null:[],c=a?i+1:o.length;for(r=i<0?c:a?i:0;r<c;r++)if(n=o[r],(n.selected||r===i)&&!n.disabled&&(!n.parentNode.disabled||!f(n.parentNode,"optgroup"))){if(e=yt(n).val(),a)return e;u.push(e)}return u},set:function(t,e){for(var n,r,o=t.options,i=yt.makeArray(e),a=o.length;a--;)r=o[a],(r.selected=yt.inArray(yt.valHooks.option.get(r),i)>-1)&&(n=!0);return n||(t.selectedIndex=-1),i}}}}),yt.each(["radio","checkbox"],function(){yt.valHooks[this]={set:function(t,e){if(Array.isArray(e))return t.checked=yt.inArray(yt(t).val(),e)>-1}},bt.checkOn||(yt.valHooks[this].get=function(t){return null===t.getAttribute("value")?"on":t.value})});var xe=/^(?:focusinfocus|focusoutblur)$/;yt.extend(yt.event,{trigger:function(t,e,r,o){var i,a,u,f,c,s,l,h=[r||at],p=dt.call(t,"type")?t.type:t,d=dt.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||at,3!==r.nodeType&&8!==r.nodeType&&!xe.test(p+yt.event.triggered)&&(p.indexOf(".")>-1&&(d=p.split("."),p=d.shift(),d.sort()),c=p.indexOf(":")<0&&"on"+p,t=t[yt.expando]?t:new yt.Event(p,"object"==typeof t&&t),t.isTrigger=o?2:3,t.namespace=d.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),e=null==e?[t]:yt.makeArray(e,[t]),l=yt.event.special[p]||{},o||!l.trigger||!1!==l.trigger.apply(r,e))){if(!o&&!l.noBubble&&!yt.isWindow(r)){for(f=l.delegateType||p,xe.test(f+p)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||at)&&h.push(u.defaultView||u.parentWindow||n)}for(i=0;(a=h[i++])&&!t.isPropagationStopped();)t.type=i>1?f:l.bindType||p,s=(qt.get(a,"events")||{})[t.type]&&qt.get(a,"handle"),s&&s.apply(a,e),(s=c&&a[c])&&s.apply&&Pt(a)&&(t.result=s.apply(a,e),!1===t.result&&t.preventDefault());return t.type=p,o||t.isDefaultPrevented()||l._default&&!1!==l._default.apply(h.pop(),e)||!Pt(r)||c&&yt.isFunction(r[p])&&!yt.isWindow(r)&&(u=r[c],u&&(r[c]=null),yt.event.triggered=p,r[p](),yt.event.triggered=void 0,u&&(r[c]=u)),t.result}},simulate:function(t,e,n){var r=yt.extend(new yt.Event,n,{type:t,isSimulated:!0});yt.event.trigger(r,null,e)}}),yt.fn.extend({trigger:function(t,e){return this.each(function(){yt.event.trigger(t,e,this)})},triggerHandler:function(t,e){var n=this[0];if(n)return yt.event.trigger(t,e,n,!0)}}),yt.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(t,e){yt.fn[e]=function(t,n){return arguments.length>0?this.on(e,null,t,n):this.trigger(e)}}),yt.fn.extend({hover:function(t,e){return this.mouseenter(t).mouseleave(e||t)}}),bt.focusin="onfocusin"in n,bt.focusin||yt.each({focus:"focusin",blur:"focusout"},function(t,e){var n=function(t){yt.event.simulate(e,t.target,yt.event.fix(t))};yt.event.special[e]={setup:function(){var r=this.ownerDocument||this,o=qt.access(r,e);o||r.addEventListener(t,n,!0),qt.access(r,e,(o||0)+1)},teardown:function(){var r=this.ownerDocument||this,o=qt.access(r,e)-1;o?qt.access(r,e,o):(r.removeEventListener(t,n,!0),qt.remove(r,e))}}});var we=n.location,Fe=yt.now(),Me=/\?/;yt.parseXML=function(t){var e;if(!t||"string"!=typeof t)return null;try{e=(new n.DOMParser).parseFromString(t,"text/xml")}catch(t){e=void 0}return e&&!e.getElementsByTagName("parsererror").length||yt.error("Invalid XML: "+t),e};var Ae=/\[\]$/,Ee=/^(?:submit|button|image|reset|file)$/i,Te=/^(?:input|select|textarea|keygen)/i;yt.param=function(t,e){var n,r=[],o=function(t,e){var n=yt.isFunction(e)?e():e;r[r.length]=encodeURIComponent(t)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(t)||t.jquery&&!yt.isPlainObject(t))yt.each(t,function(){o(this.name,this.value)});else for(n in t)K(n,t[n],e,o);return r.join("&")},yt.fn.extend({serialize:function(){return yt.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=yt.prop(this,"elements");return t?yt.makeArray(t):this}).filter(function(){var t=this.type;return this.name&&!yt(this).is(":disabled")&&Te.test(this.nodeName)&&!Ee.test(t)&&(this.checked||!$t.test(t))}).map(function(t,e){var n=yt(this).val();return null==n?null:Array.isArray(n)?yt.map(n,function(t){return{name:e.name,value:t.replace(/\r?\n/g,"\r\n")}}):{name:e.name,value:n.replace(/\r?\n/g,"\r\n")}}).get()}});var Ce=/^(.*?):[ \t]*([^\r\n]*)$/gm,ke=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Se=/^(?:GET|HEAD)$/,Ne={},De={},Re="*/".concat("*"),Pe=at.createElement("a");Pe.href=we.href,yt.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:we.href,type:"GET",isLocal:ke.test(we.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Re,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":yt.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,e){return e?nt(nt(t,yt.ajaxSettings),e):nt(yt.ajaxSettings,t)},ajaxPrefilter:tt(Ne),ajaxTransport:tt(De),ajax:function(t,e){function r(t,e,r,u){var c,h,p,_,x,w=e;s||(s=!0,f&&n.clearTimeout(f),o=void 0,a=u||"",F.readyState=t>0?4:0,c=t>=200&&t<300||304===t,r&&(_=rt(d,F,r)),_=ot(d,_,F,c),c?(d.ifModified&&(x=F.getResponseHeader("Last-Modified"),x&&(yt.lastModified[i]=x),(x=F.getResponseHeader("etag"))&&(yt.etag[i]=x)),204===t||"HEAD"===d.type?w="nocontent":304===t?w="notmodified":(w=_.state,h=_.data,p=_.error,c=!p)):(p=w,!t&&w||(w="error",t<0&&(t=0))),F.status=t,F.statusText=(e||w)+"",c?b.resolveWith(g,[h,w,F]):b.rejectWith(g,[F,w,p]),F.statusCode(m),m=void 0,l&&v.trigger(c?"ajaxSuccess":"ajaxError",[F,d,c?h:p]),y.fireWith(g,[F,w]),l&&(v.trigger("ajaxComplete",[F,d]),--yt.active||yt.event.trigger("ajaxStop")))}"object"==typeof t&&(e=t,t=void 0),e=e||{};var o,i,a,u,f,c,s,l,h,p,d=yt.ajaxSetup({},e),g=d.context||d,v=d.context&&(g.nodeType||g.jquery)?yt(g):yt.event,b=yt.Deferred(),y=yt.Callbacks("once memory"),m=d.statusCode||{},_={},x={},w="canceled",F={readyState:0,getResponseHeader:function(t){var e;if(s){if(!u)for(u={};e=Ce.exec(a);)u[e[1].toLowerCase()]=e[2];e=u[t.toLowerCase()]}return null==e?null:e},getAllResponseHeaders:function(){return s?a:null},setRequestHeader:function(t,e){return null==s&&(t=x[t.toLowerCase()]=x[t.toLowerCase()]||t,_[t]=e),this},overrideMimeType:function(t){return null==s&&(d.mimeType=t),this},statusCode:function(t){var e;if(t)if(s)F.always(t[F.status]);else for(e in t)m[e]=[m[e],t[e]];return this},abort:function(t){var e=t||w;return o&&o.abort(e),r(0,e),this}};if(b.promise(F),d.url=((t||d.url||we.href)+"").replace(/^\/\//,we.protocol+"//"),d.type=e.method||e.type||d.method||d.type,d.dataTypes=(d.dataType||"*").toLowerCase().match(St)||[""],null==d.crossDomain){c=at.createElement("a");try{c.href=d.url,c.href=c.href,d.crossDomain=Pe.protocol+"//"+Pe.host!=c.protocol+"//"+c.host}catch(t){d.crossDomain=!0}}if(d.data&&d.processData&&"string"!=typeof d.data&&(d.data=yt.param(d.data,d.traditional)),et(Ne,d,e,F),s)return F;l=yt.event&&d.global,l&&0==yt.active++&&yt.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!Se.test(d.type),i=d.url.replace(/#.*$/,""),d.hasContent?d.data&&d.processData&&0===(d.contentType||"").indexOf("application/x-www-form-urlencoded")&&(d.data=d.data.replace(/%20/g,"+")):(p=d.url.slice(i.length),d.data&&(i+=(Me.test(i)?"&":"?")+d.data,delete d.data),!1===d.cache&&(i=i.replace(/([?&])_=[^&]*/,"$1"),p=(Me.test(i)?"&":"?")+"_="+Fe+++p),d.url=i+p),d.ifModified&&(yt.lastModified[i]&&F.setRequestHeader("If-Modified-Since",yt.lastModified[i]),yt.etag[i]&&F.setRequestHeader("If-None-Match",yt.etag[i])),(d.data&&d.hasContent&&!1!==d.contentType||e.contentType)&&F.setRequestHeader("Content-Type",d.contentType),F.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+Re+"; q=0.01":""):d.accepts["*"]);for(h in d.headers)F.setRequestHeader(h,d.headers[h]);if(d.beforeSend&&(!1===d.beforeSend.call(g,F,d)||s))return F.abort();if(w="abort",y.add(d.complete),F.done(d.success),F.fail(d.error),o=et(De,d,e,F)){if(F.readyState=1,l&&v.trigger("ajaxSend",[F,d]),s)return F;d.async&&d.timeout>0&&(f=n.setTimeout(function(){F.abort("timeout")},d.timeout));try{s=!1,o.send(_,r)}catch(t){if(s)throw t;r(-1,t)}}else r(-1,"No Transport");return F},getJSON:function(t,e,n){return yt.get(t,e,n,"json")},getScript:function(t,e){return yt.get(t,void 0,e,"script")}}),yt.each(["get","post"],function(t,e){yt[e]=function(t,n,r,o){return yt.isFunction(n)&&(o=o||r,r=n,n=void 0),yt.ajax(yt.extend({url:t,type:e,dataType:o,data:n,success:r},yt.isPlainObject(t)&&t))}}),yt._evalUrl=function(t){return yt.ajax({url:t,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,throws:!0})},yt.fn.extend({wrapAll:function(t){var e;return this[0]&&(yt.isFunction(t)&&(t=t.call(this[0])),e=yt(t,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var t=this;t.firstElementChild;)t=t.firstElementChild;return t}).append(this)),this},wrapInner:function(t){return yt.isFunction(t)?this.each(function(e){yt(this).wrapInner(t.call(this,e))}):this.each(function(){var e=yt(this),n=e.contents();n.length?n.wrapAll(t):e.append(t)})},wrap:function(t){var e=yt.isFunction(t);return this.each(function(n){yt(this).wrapAll(e?t.call(this,n):t)})},unwrap:function(t){return this.parent(t).not("body").each(function(){yt(this).replaceWith(this.childNodes)}),this}}),yt.expr.pseudos.hidden=function(t){return!yt.expr.pseudos.visible(t)},yt.expr.pseudos.visible=function(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)},yt.ajaxSettings.xhr=function(){try{return new n.XMLHttpRequest}catch(t){}};var qe={0:200,1223:204},Le=yt.ajaxSettings.xhr();bt.cors=!!Le&&"withCredentials"in Le,bt.ajax=Le=!!Le,yt.ajaxTransport(function(t){var e,r;if(bt.cors||Le&&!t.crossDomain)return{send:function(o,i){var a,u=t.xhr();if(u.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)u[a]=t.xhrFields[a];t.mimeType&&u.overrideMimeType&&u.overrideMimeType(t.mimeType),t.crossDomain||o["X-Requested-With"]||(o["X-Requested-With"]="XMLHttpRequest");for(a in o)u.setRequestHeader(a,o[a]);e=function(t){return function(){e&&(e=r=u.onload=u.onerror=u.onabort=u.onreadystatechange=null,"abort"===t?u.abort():"error"===t?"number"!=typeof u.status?i(0,"error"):i(u.status,u.statusText):i(qe[u.status]||u.status,u.statusText,"text"!==(u.responseType||"text")||"string"!=typeof u.responseText?{binary:u.response}:{text:u.responseText},u.getAllResponseHeaders()))}},u.onload=e(),r=u.onerror=e("error"),void 0!==u.onabort?u.onabort=r:u.onreadystatechange=function(){4===u.readyState&&n.setTimeout(function(){e&&r()})},e=e("abort");try{u.send(t.hasContent&&t.data||null)}catch(t){if(e)throw t}},abort:function(){e&&e()}}}),yt.ajaxPrefilter(function(t){t.crossDomain&&(t.contents.script=!1)}),yt.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(t){return yt.globalEval(t),t}}}),yt.ajaxPrefilter("script",function(t){void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET")}),yt.ajaxTransport("script",function(t){if(t.crossDomain){var e,n;return{send:function(r,o){e=yt("<script>").prop({charset:t.scriptCharset,src:t.url}).on("load error",n=function(t){e.remove(),n=null,t&&o("error"===t.type?404:200,t.type)}),at.head.appendChild(e[0])},abort:function(){n&&n()}}}});var Be=[],je=/(=)\?(?=&|$)|\?\?/;yt.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var t=Be.pop()||yt.expando+"_"+Fe++;return this[t]=!0,t}}),yt.ajaxPrefilter("json jsonp",function(t,e,r){var o,i,a,u=!1!==t.jsonp&&(je.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&je.test(t.data)&&"data");if(u||"jsonp"===t.dataTypes[0])return o=t.jsonpCallback=yt.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,u?t[u]=t[u].replace(je,"$1"+o):!1!==t.jsonp&&(t.url+=(Me.test(t.url)?"&":"?")+t.jsonp+"="+o),t.converters["script json"]=function(){return a||yt.error(o+" was not called"),a[0]},t.dataTypes[0]="json",i=n[o],n[o]=function(){a=arguments},r.always(function(){void 0===i?yt(n).removeProp(o):n[o]=i,t[o]&&(t.jsonpCallback=e.jsonpCallback,Be.push(o)),a&&yt.isFunction(i)&&i(a[0]),a=i=void 0}),"script"}),bt.createHTMLDocument=function(){var t=at.implementation.createHTMLDocument("").body;return t.innerHTML="<form></form><form></form>",2===t.childNodes.length}(),yt.parseHTML=function(t,e,n){if("string"!=typeof t)return[];"boolean"==typeof e&&(n=e,e=!1);var r,o,i;return e||(bt.createHTMLDocument?(e=at.implementation.createHTMLDocument(""),r=e.createElement("base"),r.href=at.location.href,e.head.appendChild(r)):e=at),o=Mt.exec(t),i=!n&&[],o?[e.createElement(o[1])]:(o=M([t],e,i),i&&i.length&&yt(i).remove(),yt.merge([],o.childNodes))},yt.fn.load=function(t,e,n){var r,o,i,a=this,u=t.indexOf(" ");return u>-1&&(r=Z(t.slice(u)),t=t.slice(0,u)),yt.isFunction(e)?(n=e,e=void 0):e&&"object"==typeof e&&(o="POST"),a.length>0&&yt.ajax({url:t,type:o||"GET",dataType:"html",data:e}).done(function(t){i=arguments,a.html(r?yt("<div>").append(yt.parseHTML(t)).find(r):t)}).always(n&&function(t,e){a.each(function(){n.apply(this,i||[t.responseText,e,t])})}),this},yt.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){yt.fn[e]=function(t){return this.on(e,t)}}),yt.expr.pseudos.animated=function(t){return yt.grep(yt.timers,function(e){return t===e.elem}).length},yt.offset={setOffset:function(t,e,n){var r,o,i,a,u,f,c,s=yt.css(t,"position"),l=yt(t),h={};"static"===s&&(t.style.position="relative"),u=l.offset(),i=yt.css(t,"top"),f=yt.css(t,"left"),c=("absolute"===s||"fixed"===s)&&(i+f).indexOf("auto")>-1,c?(r=l.position(),a=r.top,o=r.left):(a=parseFloat(i)||0,o=parseFloat(f)||0),yt.isFunction(e)&&(e=e.call(t,n,yt.extend({},u))),null!=e.top&&(h.top=e.top-u.top+a),null!=e.left&&(h.left=e.left-u.left+o),"using"in e?e.using.call(t,h):l.css(h)}},yt.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){yt.offset.setOffset(this,t,e)});var e,n,r,o,i=this[0];if(i)return i.getClientRects().length?(r=i.getBoundingClientRect(),e=i.ownerDocument,n=e.documentElement,o=e.defaultView,{top:r.top+o.pageYOffset-n.clientTop,left:r.left+o.pageXOffset-n.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var t,e,n=this[0],r={top:0,left:0};return"fixed"===yt.css(n,"position")?e=n.getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),f(t[0],"html")||(r=t.offset()),r={top:r.top+yt.css(t[0],"borderTopWidth",!0),left:r.left+yt.css(t[0],"borderLeftWidth",!0)}),{top:e.top-r.top-yt.css(n,"marginTop",!0),left:e.left-r.left-yt.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent;t&&"static"===yt.css(t,"position");)t=t.offsetParent;return t||Jt})}}),yt.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,e){var n="pageYOffset"===e;yt.fn[t]=function(r){return Rt(this,function(t,r,o){var i;if(yt.isWindow(t)?i=t:9===t.nodeType&&(i=t.defaultView),void 0===o)return i?i[e]:t[r];i?i.scrollTo(n?i.pageXOffset:o,n?o:i.pageYOffset):t[r]=o},t,r,arguments.length)}}),yt.each(["top","left"],function(t,e){yt.cssHooks[e]=B(bt.pixelPosition,function(t,n){if(n)return n=L(t,e),ie.test(n)?yt(t).position()[e]+"px":n})}),yt.each({Height:"height",Width:"width"},function(t,e){yt.each({padding:"inner"+t,content:e,"":"outer"+t},function(n,r){yt.fn[r]=function(o,i){var a=arguments.length&&(n||"boolean"!=typeof o),u=n||(!0===o||!0===i?"margin":"border");return Rt(this,function(e,n,o){var i;return yt.isWindow(e)?0===r.indexOf("outer")?e["inner"+t]:e.document.documentElement["client"+t]:9===e.nodeType?(i=e.documentElement,Math.max(e.body["scroll"+t],i["scroll"+t],e.body["offset"+t],i["offset"+t],i["client"+t])):void 0===o?yt.css(e,n,u):yt.style(e,n,o,u)},e,a?o:void 0,a)}})}),yt.fn.extend({bind:function(t,e,n){return this.on(t,null,e,n)},unbind:function(t,e){return this.off(t,null,e)},delegate:function(t,e,n,r){return this.on(e,t,n,r)},undelegate:function(t,e,n){return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",n)}}),yt.holdReady=function(t){t?yt.readyWait++:yt.ready(!0)},yt.isArray=Array.isArray,yt.parseJSON=JSON.parse,yt.nodeName=f,r=[],void 0!==(o=function(){return yt}.apply(e,r))&&(t.exports=o);var Oe=n.jQuery,Ie=n.$;return yt.noConflict=function(t){return n.$===yt&&(n.$=Ie),t&&n.jQuery===yt&&(n.jQuery=Oe),yt},i||(n.jQuery=n.$=yt),yt})},function(t,e,n){function r(t){return n(o(t))}function o(t){var e=i[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var i={"./atripla.png":29,"./avastin.png":30,"./baraclude.png":31,"./enbrel.png":32,"./evoltra.png":33,"./glivec.png":34,"./herceptin.png":35,"./isentress.png":36,"./kaletra.png":37,"./lilly.png":38,"./reyataz.png":39,"./sovaldi.png":40};r.keys=function(){return Object.keys(i)},r.resolve=o,t.exports=r,r.id=1},function(t,e){},function(t,e,n){t.exports=n.p+"images/atripla.jpg"},function(t,e,n){t.exports=n.p+"images/avastin.jpg"},function(t,e,n){t.exports=n.p+"images/baraclude.jpg"},function(t,e,n){t.exports=n.p+"images/cover.jpg"},function(t,e,n){t.exports=n.p+"images/enbrel.jpg"},function(t,e,n){t.exports=n.p+"images/evoltra.jpg"},function(t,e,n){t.exports=n.p+"images/glivec.jpg"},function(t,e,n){t.exports=n.p+"images/herceptin.jpg"},function(t,e,n){t.exports=n.p+"images/humalog.jpg"},function(t,e,n){t.exports=n.p+"images/isentress.jpg"},function(t,e,n){t.exports=n.p+"images/kaletra.jpg"},function(t,e,n){t.exports=n.p+"images/reyataz.jpg"},function(t,e,n){t.exports=n.p+"images/sovaldi.jpg"},function(t,e,n){n(47)},function(t,e,n){(function(t){var e=n(28),o=n(52),i={},a={},u=0,f=function(t,e){return(Array(e).join("0")+t).slice(-e)},c=function(t){var e,n,r=decodeURIComponent(window.location.search.substring(1)),o=r.split("&");for(n=0;n<o.length;n++)if(e=o[n].split("="),e[0]===t)return void 0===e[1]||e[1]},s=function(){var e=t(window).width(),n=t(window).height(),r=t(".cover").height();if(e>n){t("#main").css("height",r),t("#main-wrap").css("height",r);var o=t("#boxes").height(),i=.75*o/3,a=8*o/760,u=i+a;t(".box .logo").css("height",i),t(".box .logo").css("margin-bottom",a),t(".box").css("margin-top",0),t("#boxes").css("width",1e3*o/740),t(".level").each(function(){var e=parseInt(t(this).attr("level")),n=t(this);switch(e){case 0:n.css("top","calc(34.80% - "+u+"px )");break;case 1:n.css("top","calc(61.75% - "+u+"px )");break;case 2:n.css("top","calc(89.90% - "+u+"px )")}})}else{r=1350*e/600,t("#main").css("height",n-50),t("#main-wrap").css("height",r);var i=.85*r/6,a=4*r/1350,u=i+a;t(".box .logo").css("height",i),t(".box .logo").css("margin-bottom",a),t("#boxes").css("width",.8*e),t(".level").each(function(){var e=parseInt(t(this).attr("level")),n=t(this);switch(e){case 0:n.css("top","calc(18.70% - "+u+"px )");break;case 1:n.css("top","calc(49.65% - "+u+"px )");break;case 2:n.css("top","calc(80.40% - "+u+"px )")}}),t(".box2").css("margin-top",0*r/1350),t(".box3").css("margin-top",0*r/1350),t(".box6").css("margin-top",6*r/1350),t(".box7").css("margin-top",6*r/1350),t(".box10").css("margin-top",12*r/1350),t(".box11").css("margin-top",12*r/1350)}},l=function(e,r,o){t("#icon").attr("src",n(1)("./"+e.imagen)),"lilly.png"==e.imagen?t("#icon").addClass("lilly"):t("#icon").removeClass("lilly"),t("#card .btn-twitter").attr("href","https://twitter.com/intent/tweet?url=https://bigpharma.ojo-publico.com/apps/comparadordeprecios/?q="+e.id+"&text="+e.texto_twitter),t("#card .btn-facebook").attr("href","https://www.facebook.com/share.php?u=https://bigpharma.ojo-publico.com/apps/comparadordeprecios/?q="+e.id),t("#nombre_comercial").text(e.nombre_comercial),t("#phrase").html('<span class="hyphen">&#8213;</span> '+e.frase+' <span class="hyphen">&#8213;</span>'),t("#nombre_generico").text(e.nombre_generico),t("#presentacion").text(e.presentacion),t("#area_terapeutica").html('<span class="highlighted">'+e.area_terapeutica+"</span>"),t("#fabricantes").text(e.fabricantes),t("#efecto").text(e.efecto),t("#anio_salida").text(e.anio_salida),null==e.cubierto?t("#cubierto").parent().hide():(t("#cubierto").parent().show(),t("#cubierto").text(e.cubierto)),null==e.no_cubierto?t("#no_cubierto").parent().hide():(t("#no_cubierto").parent().show(),t("#no_cubierto").text(e.no_cubierto)),t("#dosis_promedio").text(e.dosis_promedio),t("#tratamiento").html(e.tratamiento+'<br> <p class="alert">La información de esta ficha es referencial. Para iniciar tratamiento consulte obligatoriamente a su médico.</p>'),"sovaldi"==e.id?(t(".ppa.todos").hide(),t(".ppa.sovaldi").show()):(t(".ppa.todos").show(),t(".ppa.sovaldi").hide())},h=function(e,n,r){t("#section-tab2 .countries").html(""),t("#section-tab2 .countries").append(t("<li></li>",{cid:"todos"}).text("Comparar")),t.each(n,function(e,n){n.data[r].costo_anio_dolares_pariado&&""!==n.data[r].costo_anio_dolares_pariado&&t("#section-tab2 .countries").append(t("<li></li>",{cid:e}).text(n.nombre))}),t("#section-tab2 .countries li").click(function(){var o=t(this).attr("cid");"todos"==o?(t("#section-tab2 .by_country").hide(),t("#section-tab2 .chart-wrap").show()):(t("#section-tab2 .by_country").show(),t("#section-tab2 .chart-wrap").hide(),t("#costo_presentacion").text(e.presentacion.toLowerCase()),t("#costo_unitario").text(n[o].data[r].precio_dolares),t("#costo_anual").text((n[o].data[r].costo_anio_dolares+"").split(",")[0]),t("#comparacion_sueldo .phrase").text(n[o].data[r].comparacion_sueldo_dolares),t("#comparacion_auto .phrase").text(n[o].data[r].comparacion_auto),t("#comparacion_presidente .phrase").text(n[o].data[r].comparacion_sueldo_presidente),"0"==n[o].data[r].comparacion_auto[0]?t("#comparacion_auto").hide():t("#comparacion_auto").show(),t("#sueldo_minimo").text(n[o].data[r].sueldo_dolares),t("#sueldo_presidente").text(n[o].data[r].sueldo_presidente),t(".guatemala").hide(),t(".colombia").hide(),"enbrel"==e.id&&t(".colombia").show(),"peru"==o?t("#banco").text("* Fuente: Banco Central de Reserva (Perú)"):"argentina"==o?t("#banco").text("* Fuente: Banco de la Nación (Argentina)"):"colombia"==o?t("#banco").text("* Fuente: Banco de la República (Colombia)"):"mexico"==o?t("#banco").text("* Fuente: Banco de México"):"guatemala"==o&&(t("#banco").text("* Fuente: Banco de Guatemala"),t(".guatemala").show())),t("#section-tab2 .countries li").removeClass("active"),t(this).addClass("active")})},p=function(t){r=Math.ceil(t%1*100),t=parseInt(t);var e=t;return t>999&&(e=Math.floor(t/1e3)+"."+f(t%1e3,3)),r>0&&(e+=","+f(r,2)),e},d=function(e,n){var r=o.select("#bar-chart svg").html(""),i={top:40,right:10,bottom:40,left:60},a=t("#bar-chart svg").width()-i.left-i.right,u=t("#bar-chart svg").height()-i.top-i.bottom,f=o.scaleBand().rangeRound([0,a]).padding(.25),c=o.scaleLinear().rangeRound([u,0]),s=r.append("g").attr("transform","translate("+i.left+","+i.top+")"),l=[];t.each(e,function(t,e){e.data[n].precio_dolares_pariado&&""!==e.data[n].precio_dolares_pariado&&l.push({name:e.nombre,value:parseFloat((""+e.data[n].precio_dolares_pariado).replace(".","").replace(",",".")),valor:e.data[n].precio_dolares_pariado})});var h=o.max(l,function(t){return t.value});f.domain(l.map(function(t){return t.name})),c.domain([0,1.09*h]),s.append("g").attr("class","axis axis--x").attr("transform","translate(0,"+u+")").call(o.axisBottom(f)),s.append("g").attr("class","axis axis--y").call(o.axisLeft(c).ticks(6).tickFormat(p)).append("text").attr("fill","rgb(127, 127, 127)").attr("transform","rotate(-90)").attr("y",8).attr("dy","0.71em").attr("text-anchor","end").style("font-size","14px").text("Precio US$(PPA)"),s.selectAll(".back").data(l).enter().append("rect").attr("class","back").attr("x",function(t){return f(t.name)}).attr("y",function(t){return 0}).attr("width",f.bandwidth()).attr("fill","#e2d2d2").attr("height",function(t){return u}),s.selectAll(".bar").data(l).enter().append("rect").attr("class","bar").attr("x",function(t){return f(t.name)}).attr("y",function(t){return c(t.value)}).attr("width",f.bandwidth()).attr("fill",function(t){return t.value==h?"#af3d3d":"#9a6c6c"}).attr("height",function(t){return u-c(t.value)}),s.selectAll(".text").data(l).enter().append("text").attr("class","value").attr("x",function(t){return f(t.name)+f.bandwidth()/2}).attr("y",function(t){return c(t.value)-7}).text(function(t){return"US$ "+t.valor}).attr("text-anchor","middle").attr("width",f.bandwidth()).attr("fill",function(t){return t.value==h?"#af3d3d":"#9a6c6c"})},g=function(e,n,r){t("#table-countries tbody").html(""),t.each(n,function(e,n){-1!==t.inArray(e,["peru","colombia","mexico"])&&t("#table-countries tbody").append(t("<tr></tr>").append(t("<td></td>").html(n.nombre)).append(t("<td></td>").html(b(n.data[r].existen_genericos))).append(t("<td></td>").html(b(n.data[r].existen_procesos))).append(t("<td></td>").html(b(n.data[r].cuentan_autorizacion))).append(t("<td></td>").html(b(n.data[r].producto_patentado))).append(t("<td></td>").html(b(n.data[r].protection_datos_prueba))))}),-1!=t.inArray(e.id,["baraclude","evoltra","humalog","kaletra"])?t("#tab3").hide():t("#tab3").show()},v=function(e){t(".section").hide(),t("#section-"+e).show(),t("#tabs .tab").removeClass("selected"),t("#"+e).addClass("selected"),"tab2"==e&&(t("#section-tab2 .countries li").removeClass("active"),t("#section-tab2 .countries li:nth-child(1)").addClass("active"),t("#section-tab2 .by_country").hide(),t("#section-tab2 .chart-wrap").show(),d(a,u))},b=function(t){return"Sí"==t?'<img class="icon" src="'+n(43)+'" />':"No"==t?'<img class="icon" src="'+n(41)+'" />':'<img class="icon" src="'+n(42)+'" />'};t("#tabs .tab").click(function(){var e=t(this).attr("id");v(e)}),t("#btn-info").click(function(){t("#about").show(),t("#card").hide(),t(".modal").fadeIn("fast"),t(".modal").scrollTop(0)}),t(".btn-close").click(function(){t(".modal").fadeOut("fast")}),t(".modal").click(function(){t(this).fadeOut("fast")}).children().click(function(t){return!1}),t(window).keydown(function(e){27!=e.which&&13!=e.which&&32!=e.which||(t("#cover").fadeOut(300),t(".title").fadeIn(300),t(".modal").fadeOut("fast"))}),t("#cover").click(function(){t(this).fadeOut(300),t(".title").fadeIn(300)}),t(window).resize(s),"embeded"==c("version")&&t(".navbar").addClass("embeded"),t.getJSON(e,function(e){var r=null,o=100;i={},t.each(e.medicamentos,function(e,a){var u=Math.floor(e/4),f="Artritis reumatoide"==a.area_terapeutica?"Artritis":a.area_terapeutica,c=f.toLowerCase().split(" ")[0].replace("á","a");i[e]=a,i[e].cronologia=[],e%4==0&&(r=t("<div></div>",{class:"level",level:u}),t("#boxes").append(r),t(r).css("z-index",o),o-=1),r.append(t("<div></div>",{class:"box box"+e,id:a.nombre,bid:e}).append(t("<div></div>",{class:"wrap"}).append(t("<img/>",{class:"logo",src:n(1)("./"+a.imagen)})).append(t("<div></div>",{class:"name"}).text(a.nombre_comercial).append(t("<div></div>",{class:"label "+c}).text(f)))))}),a.peru={nombre:"Perú",data:e.peru},a.colombia={nombre:"Colombia",data:e.colombia},a.mexico={nombre:"México",data:e.mexico},a.argentina={nombre:"Argentina",data:e.argentina},a.guatemala={nombre:"Guatemala",data:e.guatemala},t(".box").click(function(){var e=t(this).attr("bid");u=e;var n=i[u];l(n),h(n,a,u),g(n,a,u),t(".modal").fadeIn("fast"),t(".modal").scrollTop(0),t("#about").hide(),t("#card").show(),v("tab2")}),s();var f=c("q"),p=t.inArray(f,["herceptin","sovaldi","reyataz","isentress","baraclude","humalog","evoltra","enbrel","atripla","avastin","glivec","kaletra"]);if(-1!=p){u=p;var d=i[u];l(d),h(d,a,u),g(d,a,u),t(".modal").fadeIn("fast"),t(".modal").scrollTop(0),t("#about").hide(),t("#card").show(),t("#cover").fadeOut(300),t(".title").fadeIn(300),v("tab2")}})}).call(e,n(0))},function(t,e,n){(function(t){t(".popup").click(function(e){var n=(t(window).width()-575)/2,r=(t(window).height()-400)/2,o=this.href.replace(/#/g,"%23"),i="status=1,width=575,height=400,top="+r+",left="+n;return window.open(o,"popup",i),!1}),t(".link").click(function(){var e=t(this).attr("href");window.open(e,"_blank")}),t(".counter").each(function(){var e=t(this),n=e.attr("url"),r="https://graph.facebook.com/?access_token=1501553810140130|FZfZzc8CSIWFR-rPJUCWJnG4cdE&id="+n;t.getJSON(r,function(t){if(void 0!==t.share){var n=t.share.share_count,r=""+n%1e3,o="000",i=o.substring(0,o.length-r.length)+r;n=n>999?parseInt(n/1e3)+"."+i:n,e.html(n)}})})}).call(e,n(0))},function(t,e,n){"use strict";function r(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===t[e-2]?2:"="===t[e-1]?1:0}function o(t){return 3*t.length/4-r(t)}function i(t){var e,n,o,i,a,u,f=t.length;a=r(t),u=new l(3*f/4-a),o=a>0?f-4:f;var c=0;for(e=0,n=0;e<o;e+=4,n+=3)i=s[t.charCodeAt(e)]<<18|s[t.charCodeAt(e+1)]<<12|s[t.charCodeAt(e+2)]<<6|s[t.charCodeAt(e+3)],u[c++]=i>>16&255,u[c++]=i>>8&255,u[c++]=255&i;return 2===a?(i=s[t.charCodeAt(e)]<<2|s[t.charCodeAt(e+1)]>>4,u[c++]=255&i):1===a&&(i=s[t.charCodeAt(e)]<<10|s[t.charCodeAt(e+1)]<<4|s[t.charCodeAt(e+2)]>>2,u[c++]=i>>8&255,u[c++]=255&i),u}function a(t){return c[t>>18&63]+c[t>>12&63]+c[t>>6&63]+c[63&t]}function u(t,e,n){for(var r,o=[],i=e;i<n;i+=3)r=(t[i]<<16)+(t[i+1]<<8)+t[i+2],o.push(a(r));return o.join("")}function f(t){for(var e,n=t.length,r=n%3,o="",i=[],a=0,f=n-r;a<f;a+=16383)i.push(u(t,a,a+16383>f?f:a+16383));return 1===r?(e=t[n-1],o+=c[e>>2],o+=c[e<<4&63],o+="=="):2===r&&(e=(t[n-2]<<8)+t[n-1],o+=c[e>>10],o+=c[e>>4&63],o+=c[e<<2&63],o+="="),i.push(o),i.join("")}e.byteLength=o,e.toByteArray=i,e.fromByteArray=f;for(var c=[],s=[],l="undefined"!=typeof Uint8Array?Uint8Array:Array,h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=0,d=h.length;p<d;++p)c[p]=h[p],s[h.charCodeAt(p)]=p;s["-".charCodeAt(0)]=62,s["_".charCodeAt(0)]=63},function(t,e,n){"use strict";(function(t){function r(){return i.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function o(t,e){if(r()<e)throw new RangeError("Invalid typed array length");return i.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e),t.__proto__=i.prototype):(null===t&&(t=new i(e)),t.length=e),t}function i(t,e,n){if(!(i.TYPED_ARRAY_SUPPORT||this instanceof i))return new i(t,e,n);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return c(this,t)}return a(this,t,e,n)}function a(t,e,n,r){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?h(t,e,n,r):"string"==typeof e?s(t,e,n):p(t,e)}function u(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function f(t,e,n,r){return u(e),e<=0?o(t,e):void 0!==n?"string"==typeof r?o(t,e).fill(n,r):o(t,e).fill(n):o(t,e)}function c(t,e){if(u(e),t=o(t,e<0?0:0|d(e)),!i.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)t[n]=0;return t}function s(t,e,n){if("string"==typeof n&&""!==n||(n="utf8"),!i.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|v(e,n);t=o(t,r);var a=t.write(e,n);return a!==r&&(t=t.slice(0,a)),t}function l(t,e){var n=e.length<0?0:0|d(e.length);t=o(t,n);for(var r=0;r<n;r+=1)t[r]=255&e[r];return t}function h(t,e,n,r){if(e.byteLength,n<0||e.byteLength<n)throw new RangeError("'offset' is out of bounds");if(e.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");return e=void 0===n&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,n):new Uint8Array(e,n,r),i.TYPED_ARRAY_SUPPORT?(t=e,t.__proto__=i.prototype):t=l(t,e),t}function p(t,e){if(i.isBuffer(e)){var n=0|d(e.length);return t=o(t,n),0===t.length?t:(e.copy(t,0,0,n),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||G(e.length)?o(t,0):l(t,e);if("Buffer"===e.type&&Q(e.data))return l(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function d(t){if(t>=r())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+r().toString(16)+" bytes");return 0|t}function g(t){return+t!=t&&(t=0),i.alloc(+t)}function v(t,e){if(i.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var r=!1;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return Y(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return X(t).length;default:if(r)return Y(t).length;e=(""+e).toLowerCase(),r=!0}}function b(t,e,n){var r=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if(n>>>=0,e>>>=0,n<=e)return"";for(t||(t="utf8");;)switch(t){case"hex":return D(this,e,n);case"utf8":case"utf-8":return C(this,e,n);case"ascii":return S(this,e,n);case"latin1":case"binary":return N(this,e,n);case"base64":return T(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return R(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}function y(t,e,n){var r=t[e];t[e]=t[n],t[n]=r}function m(t,e,n,r,o){if(0===t.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=o?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(o)return-1;n=t.length-1}else if(n<0){if(!o)return-1;n=0}if("string"==typeof e&&(e=i.from(e,r)),i.isBuffer(e))return 0===e.length?-1:_(t,e,n,r,o);if("number"==typeof e)return e&=255,i.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):_(t,[e],n,r,o);throw new TypeError("val must be string, number or Buffer")}function _(t,e,n,r,o){function i(t,e){return 1===a?t[e]:t.readUInt16BE(e*a)}var a=1,u=t.length,f=e.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(t.length<2||e.length<2)return-1;a=2,u/=2,f/=2,n/=2}var c;if(o){var s=-1;for(c=n;c<u;c++)if(i(t,c)===i(e,-1===s?0:c-s)){if(-1===s&&(s=c),c-s+1===f)return s*a}else-1!==s&&(c-=c-s),s=-1}else for(n+f>u&&(n=u-f),c=n;c>=0;c--){for(var l=!0,h=0;h<f;h++)if(i(t,c+h)!==i(e,h)){l=!1;break}if(l)return c}return-1}function x(t,e,n,r){n=Number(n)||0;var o=t.length-n;r?(r=Number(r))>o&&(r=o):r=o;var i=e.length;if(i%2!=0)throw new TypeError("Invalid hex string");r>i/2&&(r=i/2);for(var a=0;a<r;++a){var u=parseInt(e.substr(2*a,2),16);if(isNaN(u))return a;t[n+a]=u}return a}function w(t,e,n,r){return V(Y(e,t.length-n),t,n,r)}function F(t,e,n,r){return V($(e),t,n,r)}function M(t,e,n,r){return F(t,e,n,r)}function A(t,e,n,r){return V(X(e),t,n,r)}function E(t,e,n,r){return V(W(e,t.length-n),t,n,r)}function T(t,e,n){return 0===e&&n===t.length?J.fromByteArray(t):J.fromByteArray(t.slice(e,n))}function C(t,e,n){n=Math.min(t.length,n);for(var r=[],o=e;o<n;){var i=t[o],a=null,u=i>239?4:i>223?3:i>191?2:1;if(o+u<=n){var f,c,s,l;switch(u){case 1:i<128&&(a=i);break;case 2:f=t[o+1],128==(192&f)&&(l=(31&i)<<6|63&f)>127&&(a=l);break;case 3:f=t[o+1],c=t[o+2],128==(192&f)&&128==(192&c)&&(l=(15&i)<<12|(63&f)<<6|63&c)>2047&&(l<55296||l>57343)&&(a=l);break;case 4:f=t[o+1],c=t[o+2],s=t[o+3],128==(192&f)&&128==(192&c)&&128==(192&s)&&(l=(15&i)<<18|(63&f)<<12|(63&c)<<6|63&s)>65535&&l<1114112&&(a=l)}}null===a?(a=65533,u=1):a>65535&&(a-=65536,r.push(a>>>10&1023|55296),a=56320|1023&a),r.push(a),o+=u}return k(r)}function k(t){var e=t.length;if(e<=K)return String.fromCharCode.apply(String,t);for(var n="",r=0;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=K));return n}function S(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(127&t[o]);return r}function N(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(t[o]);return r}function D(t,e,n){var r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=e;i<n;++i)o+=H(t[i]);return o}function R(t,e,n){for(var r=t.slice(e,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function P(t,e,n){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function q(t,e,n,r,o,a){if(!i.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<a)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}function L(t,e,n,r){e<0&&(e=65535+e+1);for(var o=0,i=Math.min(t.length-n,2);o<i;++o)t[n+o]=(e&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function B(t,e,n,r){e<0&&(e=4294967295+e+1);for(var o=0,i=Math.min(t.length-n,4);o<i;++o)t[n+o]=e>>>8*(r?o:3-o)&255}function j(t,e,n,r,o,i){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function O(t,e,n,r,o){return o||j(t,e,n,4,3.4028234663852886e38,-3.4028234663852886e38),Z.write(t,e,n,r,23,4),n+4}function I(t,e,n,r,o){return o||j(t,e,n,8,1.7976931348623157e308,-1.7976931348623157e308),Z.write(t,e,n,r,52,8),n+8}function U(t){if(t=z(t).replace(tt,""),t.length<2)return"";for(;t.length%4!=0;)t+="=";return t}function z(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function H(t){return t<16?"0"+t.toString(16):t.toString(16)}function Y(t,e){e=e||1/0;for(var n,r=t.length,o=null,i=[],a=0;a<r;++a){if((n=t.charCodeAt(a))>55295&&n<57344){if(!o){if(n>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(a+1===r){(e-=3)>-1&&i.push(239,191,189);continue}o=n;continue}if(n<56320){(e-=3)>-1&&i.push(239,191,189),o=n;continue}n=65536+(o-55296<<10|n-56320)}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,n<128){if((e-=1)<0)break;i.push(n)}else if(n<2048){if((e-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((e-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function $(t){for(var e=[],n=0;n<t.length;++n)e.push(255&t.charCodeAt(n));return e}function W(t,e){for(var n,r,o,i=[],a=0;a<t.length&&!((e-=2)<0);++a)n=t.charCodeAt(a),r=n>>8,o=n%256,i.push(o),i.push(r);return i}function X(t){return J.toByteArray(U(t))}function V(t,e,n,r){for(var o=0;o<r&&!(o+n>=e.length||o>=t.length);++o)e[o+n]=t[o];return o}function G(t){return t!==t}/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var J=n(19),Z=n(44),Q=n(21);e.Buffer=i,e.SlowBuffer=g,e.INSPECT_MAX_BYTES=50,i.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),e.kMaxLength=r(),i.poolSize=8192,i._augment=function(t){return t.__proto__=i.prototype,t},i.from=function(t,e,n){return a(null,t,e,n)},i.TYPED_ARRAY_SUPPORT&&(i.prototype.__proto__=Uint8Array.prototype,i.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&i[Symbol.species]===i&&Object.defineProperty(i,Symbol.species,{value:null,configurable:!0})),i.alloc=function(t,e,n){return f(null,t,e,n)},i.allocUnsafe=function(t){return c(null,t)},i.allocUnsafeSlow=function(t){return c(null,t)},i.isBuffer=function(t){return!(null==t||!t._isBuffer)},i.compare=function(t,e){if(!i.isBuffer(t)||!i.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var n=t.length,r=e.length,o=0,a=Math.min(n,r);o<a;++o)if(t[o]!==e[o]){n=t[o],r=e[o];break}return n<r?-1:r<n?1:0},i.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},i.concat=function(t,e){if(!Q(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return i.alloc(0);var n;if(void 0===e)for(e=0,n=0;n<t.length;++n)e+=t[n].length;var r=i.allocUnsafe(e),o=0;for(n=0;n<t.length;++n){var a=t[n];if(!i.isBuffer(a))throw new TypeError('"list" argument must be an Array of Buffers');a.copy(r,o),o+=a.length}return r},i.byteLength=v,i.prototype._isBuffer=!0,i.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)y(this,e,e+1);return this},i.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},i.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},i.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?C(this,0,t):b.apply(this,arguments)},i.prototype.equals=function(t){if(!i.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===i.compare(this,t)},i.prototype.inspect=function(){var t="",n=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(t+=" ... ")),"<Buffer "+t+">"},i.prototype.compare=function(t,e,n,r,o){if(!i.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===r&&(r=0),void 0===o&&(o=this.length),e<0||n>t.length||r<0||o>this.length)throw new RangeError("out of range index");if(r>=o&&e>=n)return 0;if(r>=o)return-1;if(e>=n)return 1;if(e>>>=0,n>>>=0,r>>>=0,o>>>=0,this===t)return 0;for(var a=o-r,u=n-e,f=Math.min(a,u),c=this.slice(r,o),s=t.slice(e,n),l=0;l<f;++l)if(c[l]!==s[l]){a=c[l],u=s[l];break}return a<u?-1:u<a?1:0},i.prototype.includes=function(t,e,n){return-1!==this.indexOf(t,e,n)},i.prototype.indexOf=function(t,e,n){return m(this,t,e,n,!0)},i.prototype.lastIndexOf=function(t,e,n){return m(this,t,e,n,!1)},i.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var o=this.length-e;if((void 0===n||n>o)&&(n=o),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var i=!1;;)switch(r){case"hex":return x(this,t,e,n);case"utf8":case"utf-8":return w(this,t,e,n);case"ascii":return F(this,t,e,n);case"latin1":case"binary":return M(this,t,e,n);case"base64":return A(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,t,e,n);default:if(i)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),i=!0}},i.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var K=4096;i.prototype.slice=function(t,e){var n=this.length;t=~~t,e=void 0===e?n:~~e,t<0?(t+=n)<0&&(t=0):t>n&&(t=n),e<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t);var r;if(i.TYPED_ARRAY_SUPPORT)r=this.subarray(t,e),r.__proto__=i.prototype;else{var o=e-t;r=new i(o,void 0);for(var a=0;a<o;++a)r[a]=this[a+t]}return r},i.prototype.readUIntLE=function(t,e,n){t|=0,e|=0,n||P(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return r},i.prototype.readUIntBE=function(t,e,n){t|=0,e|=0,n||P(t,e,this.length);for(var r=this[t+--e],o=1;e>0&&(o*=256);)r+=this[t+--e]*o;return r},i.prototype.readUInt8=function(t,e){return e||P(t,1,this.length),this[t]},i.prototype.readUInt16LE=function(t,e){return e||P(t,2,this.length),this[t]|this[t+1]<<8},i.prototype.readUInt16BE=function(t,e){return e||P(t,2,this.length),this[t]<<8|this[t+1]},i.prototype.readUInt32LE=function(t,e){return e||P(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},i.prototype.readUInt32BE=function(t,e){return e||P(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},i.prototype.readIntLE=function(t,e,n){t|=0,e|=0,n||P(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return o*=128,r>=o&&(r-=Math.pow(2,8*e)),r},i.prototype.readIntBE=function(t,e,n){t|=0,e|=0,n||P(t,e,this.length);for(var r=e,o=1,i=this[t+--r];r>0&&(o*=256);)i+=this[t+--r]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*e)),i},i.prototype.readInt8=function(t,e){return e||P(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},i.prototype.readInt16LE=function(t,e){e||P(t,2,this.length);var n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},i.prototype.readInt16BE=function(t,e){e||P(t,2,this.length);var n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},i.prototype.readInt32LE=function(t,e){return e||P(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},i.prototype.readInt32BE=function(t,e){return e||P(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},i.prototype.readFloatLE=function(t,e){return e||P(t,4,this.length),Z.read(this,t,!0,23,4)},i.prototype.readFloatBE=function(t,e){return e||P(t,4,this.length),Z.read(this,t,!1,23,4)},i.prototype.readDoubleLE=function(t,e){return e||P(t,8,this.length),Z.read(this,t,!0,52,8)},i.prototype.readDoubleBE=function(t,e){return e||P(t,8,this.length),Z.read(this,t,!1,52,8)},i.prototype.writeUIntLE=function(t,e,n,r){if(t=+t,e|=0,n|=0,!r){q(this,t,e,n,Math.pow(2,8*n)-1,0)}var o=1,i=0;for(this[e]=255&t;++i<n&&(o*=256);)this[e+i]=t/o&255;return e+n},i.prototype.writeUIntBE=function(t,e,n,r){if(t=+t,e|=0,n|=0,!r){q(this,t,e,n,Math.pow(2,8*n)-1,0)}var o=n-1,i=1;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=t/i&255;return e+n},i.prototype.writeUInt8=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,1,255,0),i.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},i.prototype.writeUInt16LE=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,2,65535,0),i.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):L(this,t,e,!0),e+2},i.prototype.writeUInt16BE=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,2,65535,0),i.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):L(this,t,e,!1),e+2},i.prototype.writeUInt32LE=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,4,4294967295,0),i.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):B(this,t,e,!0),e+4},i.prototype.writeUInt32BE=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,4,4294967295,0),i.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):B(this,t,e,!1),e+4},i.prototype.writeIntLE=function(t,e,n,r){if(t=+t,e|=0,!r){var o=Math.pow(2,8*n-1);q(this,t,e,n,o-1,-o)}var i=0,a=1,u=0;for(this[e]=255&t;++i<n&&(a*=256);)t<0&&0===u&&0!==this[e+i-1]&&(u=1),this[e+i]=(t/a>>0)-u&255;return e+n},i.prototype.writeIntBE=function(t,e,n,r){if(t=+t,e|=0,!r){var o=Math.pow(2,8*n-1);q(this,t,e,n,o-1,-o)}var i=n-1,a=1,u=0;for(this[e+i]=255&t;--i>=0&&(a*=256);)t<0&&0===u&&0!==this[e+i+1]&&(u=1),this[e+i]=(t/a>>0)-u&255;return e+n},i.prototype.writeInt8=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,1,127,-128),i.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},i.prototype.writeInt16LE=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,2,32767,-32768),i.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):L(this,t,e,!0),e+2},i.prototype.writeInt16BE=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,2,32767,-32768),i.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):L(this,t,e,!1),e+2},i.prototype.writeInt32LE=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,4,2147483647,-2147483648),i.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):B(this,t,e,!0),e+4},i.prototype.writeInt32BE=function(t,e,n){return t=+t,e|=0,n||q(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),i.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):B(this,t,e,!1),e+4},i.prototype.writeFloatLE=function(t,e,n){return O(this,t,e,!0,n)},i.prototype.writeFloatBE=function(t,e,n){return O(this,t,e,!1,n)},i.prototype.writeDoubleLE=function(t,e,n){return I(this,t,e,!0,n)},i.prototype.writeDoubleBE=function(t,e,n){return I(this,t,e,!1,n)},i.prototype.copy=function(t,e,n,r){if(n||(n=0),r||0===r||(r=this.length),e>=t.length&&(e=t.length),e||(e=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),t.length-e<r-n&&(r=t.length-e+n);var o,a=r-n;if(this===t&&n<e&&e<r)for(o=a-1;o>=0;--o)t[o+e]=this[o+n];else if(a<1e3||!i.TYPED_ARRAY_SUPPORT)for(o=0;o<a;++o)t[o+e]=this[o+n];else Uint8Array.prototype.set.call(t,this.subarray(n,n+a),e);return a},i.prototype.fill=function(t,e,n,r){if("string"==typeof t){if("string"==typeof e?(r=e,e=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===t.length){var o=t.charCodeAt(0);o<256&&(t=o)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!i.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;e>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0);var a;if("number"==typeof t)for(a=e;a<n;++a)this[a]=t;else{var u=i.isBuffer(t)?t:Y(new i(t,r).toString()),f=u.length;for(a=0;a<n-e;++a)this[a+e]=u[a%f]}return this};var tt=/[^+\/0-9A-Za-z-_]/g}).call(e,n(50))},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e,n){e=t.exports=n(23)(void 0),e.push([t.i,"@font-face{font-family:FontAwesome;src:url("+n(26)+");src:url("+n(25)+'?#iefix&v=4.7.0) format("embedded-opentype"),url('+n(48)+') format("woff2"),url('+n(49)+') format("woff"),url('+n(27)+') format("truetype"),url('+n(24)+'#fontawesomeregular) format("svg");font-weight:400;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14286em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14286em;width:2.14286em;top:.14286em;text-align:center}.fa-li.fa-lg{left:-1.85714em}.fa-border{padding:.2em .25em .15em;border:.08em solid #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";-webkit-transform:scaleX(-1);-ms-transform:scaleX(-1);transform:scaleX(-1)}.fa-flip-vertical{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";-webkit-transform:scaleY(-1);-ms-transform:scaleY(-1);transform:scaleY(-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:"\\F000"}.fa-music:before{content:"\\F001"}.fa-search:before{content:"\\F002"}.fa-envelope-o:before{content:"\\F003"}.fa-heart:before{content:"\\F004"}.fa-star:before{content:"\\F005"}.fa-star-o:before{content:"\\F006"}.fa-user:before{content:"\\F007"}.fa-film:before{content:"\\F008"}.fa-th-large:before{content:"\\F009"}.fa-th:before{content:"\\F00A"}.fa-th-list:before{content:"\\F00B"}.fa-check:before{content:"\\F00C"}.fa-close:before,.fa-remove:before,.fa-times:before{content:"\\F00D"}.fa-search-plus:before{content:"\\F00E"}.fa-search-minus:before{content:"\\F010"}.fa-power-off:before{content:"\\F011"}.fa-signal:before{content:"\\F012"}.fa-cog:before,.fa-gear:before{content:"\\F013"}.fa-trash-o:before{content:"\\F014"}.fa-home:before{content:"\\F015"}.fa-file-o:before{content:"\\F016"}.fa-clock-o:before{content:"\\F017"}.fa-road:before{content:"\\F018"}.fa-download:before{content:"\\F019"}.fa-arrow-circle-o-down:before{content:"\\F01A"}.fa-arrow-circle-o-up:before{content:"\\F01B"}.fa-inbox:before{content:"\\F01C"}.fa-play-circle-o:before{content:"\\F01D"}.fa-repeat:before,.fa-rotate-right:before{content:"\\F01E"}.fa-refresh:before{content:"\\F021"}.fa-list-alt:before{content:"\\F022"}.fa-lock:before{content:"\\F023"}.fa-flag:before{content:"\\F024"}.fa-headphones:before{content:"\\F025"}.fa-volume-off:before{content:"\\F026"}.fa-volume-down:before{content:"\\F027"}.fa-volume-up:before{content:"\\F028"}.fa-qrcode:before{content:"\\F029"}.fa-barcode:before{content:"\\F02A"}.fa-tag:before{content:"\\F02B"}.fa-tags:before{content:"\\F02C"}.fa-book:before{content:"\\F02D"}.fa-bookmark:before{content:"\\F02E"}.fa-print:before{content:"\\F02F"}.fa-camera:before{content:"\\F030"}.fa-font:before{content:"\\F031"}.fa-bold:before{content:"\\F032"}.fa-italic:before{content:"\\F033"}.fa-text-height:before{content:"\\F034"}.fa-text-width:before{content:"\\F035"}.fa-align-left:before{content:"\\F036"}.fa-align-center:before{content:"\\F037"}.fa-align-right:before{content:"\\F038"}.fa-align-justify:before{content:"\\F039"}.fa-list:before{content:"\\F03A"}.fa-dedent:before,.fa-outdent:before{content:"\\F03B"}.fa-indent:before{content:"\\F03C"}.fa-video-camera:before{content:"\\F03D"}.fa-image:before,.fa-photo:before,.fa-picture-o:before{content:"\\F03E"}.fa-pencil:before{content:"\\F040"}.fa-map-marker:before{content:"\\F041"}.fa-adjust:before{content:"\\F042"}.fa-tint:before{content:"\\F043"}.fa-edit:before,.fa-pencil-square-o:before{content:"\\F044"}.fa-share-square-o:before{content:"\\F045"}.fa-check-square-o:before{content:"\\F046"}.fa-arrows:before{content:"\\F047"}.fa-step-backward:before{content:"\\F048"}.fa-fast-backward:before{content:"\\F049"}.fa-backward:before{content:"\\F04A"}.fa-play:before{content:"\\F04B"}.fa-pause:before{content:"\\F04C"}.fa-stop:before{content:"\\F04D"}.fa-forward:before{content:"\\F04E"}.fa-fast-forward:before{content:"\\F050"}.fa-step-forward:before{content:"\\F051"}.fa-eject:before{content:"\\F052"}.fa-chevron-left:before{content:"\\F053"}.fa-chevron-right:before{content:"\\F054"}.fa-plus-circle:before{content:"\\F055"}.fa-minus-circle:before{content:"\\F056"}.fa-times-circle:before{content:"\\F057"}.fa-check-circle:before{content:"\\F058"}.fa-question-circle:before{content:"\\F059"}.fa-info-circle:before{content:"\\F05A"}.fa-crosshairs:before{content:"\\F05B"}.fa-times-circle-o:before{content:"\\F05C"}.fa-check-circle-o:before{content:"\\F05D"}.fa-ban:before{content:"\\F05E"}.fa-arrow-left:before{content:"\\F060"}.fa-arrow-right:before{content:"\\F061"}.fa-arrow-up:before{content:"\\F062"}.fa-arrow-down:before{content:"\\F063"}.fa-mail-forward:before,.fa-share:before{content:"\\F064"}.fa-expand:before{content:"\\F065"}.fa-compress:before{content:"\\F066"}.fa-plus:before{content:"\\F067"}.fa-minus:before{content:"\\F068"}.fa-asterisk:before{content:"\\F069"}.fa-exclamation-circle:before{content:"\\F06A"}.fa-gift:before{content:"\\F06B"}.fa-leaf:before{content:"\\F06C"}.fa-fire:before{content:"\\F06D"}.fa-eye:before{content:"\\F06E"}.fa-eye-slash:before{content:"\\F070"}.fa-exclamation-triangle:before,.fa-warning:before{content:"\\F071"}.fa-plane:before{content:"\\F072"}.fa-calendar:before{content:"\\F073"}.fa-random:before{content:"\\F074"}.fa-comment:before{content:"\\F075"}.fa-magnet:before{content:"\\F076"}.fa-chevron-up:before{content:"\\F077"}.fa-chevron-down:before{content:"\\F078"}.fa-retweet:before{content:"\\F079"}.fa-shopping-cart:before{content:"\\F07A"}.fa-folder:before{content:"\\F07B"}.fa-folder-open:before{content:"\\F07C"}.fa-arrows-v:before{content:"\\F07D"}.fa-arrows-h:before{content:"\\F07E"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:"\\F080"}.fa-twitter-square:before{content:"\\F081"}.fa-facebook-square:before{content:"\\F082"}.fa-camera-retro:before{content:"\\F083"}.fa-key:before{content:"\\F084"}.fa-cogs:before,.fa-gears:before{content:"\\F085"}.fa-comments:before{content:"\\F086"}.fa-thumbs-o-up:before{content:"\\F087"}.fa-thumbs-o-down:before{content:"\\F088"}.fa-star-half:before{content:"\\F089"}.fa-heart-o:before{content:"\\F08A"}.fa-sign-out:before{content:"\\F08B"}.fa-linkedin-square:before{content:"\\F08C"}.fa-thumb-tack:before{content:"\\F08D"}.fa-external-link:before{content:"\\F08E"}.fa-sign-in:before{content:"\\F090"}.fa-trophy:before{content:"\\F091"}.fa-github-square:before{content:"\\F092"}.fa-upload:before{content:"\\F093"}.fa-lemon-o:before{content:"\\F094"}.fa-phone:before{content:"\\F095"}.fa-square-o:before{content:"\\F096"}.fa-bookmark-o:before{content:"\\F097"}.fa-phone-square:before{content:"\\F098"}.fa-twitter:before{content:"\\F099"}.fa-facebook-f:before,.fa-facebook:before{content:"\\F09A"}.fa-github:before{content:"\\F09B"}.fa-unlock:before{content:"\\F09C"}.fa-credit-card:before{content:"\\F09D"}.fa-feed:before,.fa-rss:before{content:"\\F09E"}.fa-hdd-o:before{content:"\\F0A0"}.fa-bullhorn:before{content:"\\F0A1"}.fa-bell:before{content:"\\F0F3"}.fa-certificate:before{content:"\\F0A3"}.fa-hand-o-right:before{content:"\\F0A4"}.fa-hand-o-left:before{content:"\\F0A5"}.fa-hand-o-up:before{content:"\\F0A6"}.fa-hand-o-down:before{content:"\\F0A7"}.fa-arrow-circle-left:before{content:"\\F0A8"}.fa-arrow-circle-right:before{content:"\\F0A9"}.fa-arrow-circle-up:before{content:"\\F0AA"}.fa-arrow-circle-down:before{content:"\\F0AB"}.fa-globe:before{content:"\\F0AC"}.fa-wrench:before{content:"\\F0AD"}.fa-tasks:before{content:"\\F0AE"}.fa-filter:before{content:"\\F0B0"}.fa-briefcase:before{content:"\\F0B1"}.fa-arrows-alt:before{content:"\\F0B2"}.fa-group:before,.fa-users:before{content:"\\F0C0"}.fa-chain:before,.fa-link:before{content:"\\F0C1"}.fa-cloud:before{content:"\\F0C2"}.fa-flask:before{content:"\\F0C3"}.fa-cut:before,.fa-scissors:before{content:"\\F0C4"}.fa-copy:before,.fa-files-o:before{content:"\\F0C5"}.fa-paperclip:before{content:"\\F0C6"}.fa-floppy-o:before,.fa-save:before{content:"\\F0C7"}.fa-square:before{content:"\\F0C8"}.fa-bars:before,.fa-navicon:before,.fa-reorder:before{content:"\\F0C9"}.fa-list-ul:before{content:"\\F0CA"}.fa-list-ol:before{content:"\\F0CB"}.fa-strikethrough:before{content:"\\F0CC"}.fa-underline:before{content:"\\F0CD"}.fa-table:before{content:"\\F0CE"}.fa-magic:before{content:"\\F0D0"}.fa-truck:before{content:"\\F0D1"}.fa-pinterest:before{content:"\\F0D2"}.fa-pinterest-square:before{content:"\\F0D3"}.fa-google-plus-square:before{content:"\\F0D4"}.fa-google-plus:before{content:"\\F0D5"}.fa-money:before{content:"\\F0D6"}.fa-caret-down:before{content:"\\F0D7"}.fa-caret-up:before{content:"\\F0D8"}.fa-caret-left:before{content:"\\F0D9"}.fa-caret-right:before{content:"\\F0DA"}.fa-columns:before{content:"\\F0DB"}.fa-sort:before,.fa-unsorted:before{content:"\\F0DC"}.fa-sort-desc:before,.fa-sort-down:before{content:"\\F0DD"}.fa-sort-asc:before,.fa-sort-up:before{content:"\\F0DE"}.fa-envelope:before{content:"\\F0E0"}.fa-linkedin:before{content:"\\F0E1"}.fa-rotate-left:before,.fa-undo:before{content:"\\F0E2"}.fa-gavel:before,.fa-legal:before{content:"\\F0E3"}.fa-dashboard:before,.fa-tachometer:before{content:"\\F0E4"}.fa-comment-o:before{content:"\\F0E5"}.fa-comments-o:before{content:"\\F0E6"}.fa-bolt:before,.fa-flash:before{content:"\\F0E7"}.fa-sitemap:before{content:"\\F0E8"}.fa-umbrella:before{content:"\\F0E9"}.fa-clipboard:before,.fa-paste:before{content:"\\F0EA"}.fa-lightbulb-o:before{content:"\\F0EB"}.fa-exchange:before{content:"\\F0EC"}.fa-cloud-download:before{content:"\\F0ED"}.fa-cloud-upload:before{content:"\\F0EE"}.fa-user-md:before{content:"\\F0F0"}.fa-stethoscope:before{content:"\\F0F1"}.fa-suitcase:before{content:"\\F0F2"}.fa-bell-o:before{content:"\\F0A2"}.fa-coffee:before{content:"\\F0F4"}.fa-cutlery:before{content:"\\F0F5"}.fa-file-text-o:before{content:"\\F0F6"}.fa-building-o:before{content:"\\F0F7"}.fa-hospital-o:before{content:"\\F0F8"}.fa-ambulance:before{content:"\\F0F9"}.fa-medkit:before{content:"\\F0FA"}.fa-fighter-jet:before{content:"\\F0FB"}.fa-beer:before{content:"\\F0FC"}.fa-h-square:before{content:"\\F0FD"}.fa-plus-square:before{content:"\\F0FE"}.fa-angle-double-left:before{content:"\\F100"}.fa-angle-double-right:before{content:"\\F101"}.fa-angle-double-up:before{content:"\\F102"}.fa-angle-double-down:before{content:"\\F103"}.fa-angle-left:before{content:"\\F104"}.fa-angle-right:before{content:"\\F105"}.fa-angle-up:before{content:"\\F106"}.fa-angle-down:before{content:"\\F107"}.fa-desktop:before{content:"\\F108"}.fa-laptop:before{content:"\\F109"}.fa-tablet:before{content:"\\F10A"}.fa-mobile-phone:before,.fa-mobile:before{content:"\\F10B"}.fa-circle-o:before{content:"\\F10C"}.fa-quote-left:before{content:"\\F10D"}.fa-quote-right:before{content:"\\F10E"}.fa-spinner:before{content:"\\F110"}.fa-circle:before{content:"\\F111"}.fa-mail-reply:before,.fa-reply:before{content:"\\F112"}.fa-github-alt:before{content:"\\F113"}.fa-folder-o:before{content:"\\F114"}.fa-folder-open-o:before{content:"\\F115"}.fa-smile-o:before{content:"\\F118"}.fa-frown-o:before{content:"\\F119"}.fa-meh-o:before{content:"\\F11A"}.fa-gamepad:before{content:"\\F11B"}.fa-keyboard-o:before{content:"\\F11C"}.fa-flag-o:before{content:"\\F11D"}.fa-flag-checkered:before{content:"\\F11E"}.fa-terminal:before{content:"\\F120"}.fa-code:before{content:"\\F121"}.fa-mail-reply-all:before,.fa-reply-all:before{content:"\\F122"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:"\\F123"}.fa-location-arrow:before{content:"\\F124"}.fa-crop:before{content:"\\F125"}.fa-code-fork:before{content:"\\F126"}.fa-chain-broken:before,.fa-unlink:before{content:"\\F127"}.fa-question:before{content:"\\F128"}.fa-info:before{content:"\\F129"}.fa-exclamation:before{content:"\\F12A"}.fa-superscript:before{content:"\\F12B"}.fa-subscript:before{content:"\\F12C"}.fa-eraser:before{content:"\\F12D"}.fa-puzzle-piece:before{content:"\\F12E"}.fa-microphone:before{content:"\\F130"}.fa-microphone-slash:before{content:"\\F131"}.fa-shield:before{content:"\\F132"}.fa-calendar-o:before{content:"\\F133"}.fa-fire-extinguisher:before{content:"\\F134"}.fa-rocket:before{content:"\\F135"}.fa-maxcdn:before{content:"\\F136"}.fa-chevron-circle-left:before{content:"\\F137"}.fa-chevron-circle-right:before{content:"\\F138"}.fa-chevron-circle-up:before{content:"\\F139"}.fa-chevron-circle-down:before{content:"\\F13A"}.fa-html5:before{content:"\\F13B"}.fa-css3:before{content:"\\F13C"}.fa-anchor:before{content:"\\F13D"}.fa-unlock-alt:before{content:"\\F13E"}.fa-bullseye:before{content:"\\F140"}.fa-ellipsis-h:before{content:"\\F141"}.fa-ellipsis-v:before{content:"\\F142"}.fa-rss-square:before{content:"\\F143"}.fa-play-circle:before{content:"\\F144"}.fa-ticket:before{content:"\\F145"}.fa-minus-square:before{content:"\\F146"}.fa-minus-square-o:before{content:"\\F147"}.fa-level-up:before{content:"\\F148"}.fa-level-down:before{content:"\\F149"}.fa-check-square:before{content:"\\F14A"}.fa-pencil-square:before{content:"\\F14B"}.fa-external-link-square:before{content:"\\F14C"}.fa-share-square:before{content:"\\F14D"}.fa-compass:before{content:"\\F14E"}.fa-caret-square-o-down:before,.fa-toggle-down:before{content:"\\F150"}.fa-caret-square-o-up:before,.fa-toggle-up:before{content:"\\F151"}.fa-caret-square-o-right:before,.fa-toggle-right:before{content:"\\F152"}.fa-eur:before,.fa-euro:before{content:"\\F153"}.fa-gbp:before{content:"\\F154"}.fa-dollar:before,.fa-usd:before{content:"\\F155"}.fa-inr:before,.fa-rupee:before{content:"\\F156"}.fa-cny:before,.fa-jpy:before,.fa-rmb:before,.fa-yen:before{content:"\\F157"}.fa-rouble:before,.fa-rub:before,.fa-ruble:before{content:"\\F158"}.fa-krw:before,.fa-won:before{content:"\\F159"}.fa-bitcoin:before,.fa-btc:before{content:"\\F15A"}.fa-file:before{content:"\\F15B"}.fa-file-text:before{content:"\\F15C"}.fa-sort-alpha-asc:before{content:"\\F15D"}.fa-sort-alpha-desc:before{content:"\\F15E"}.fa-sort-amount-asc:before{content:"\\F160"}.fa-sort-amount-desc:before{content:"\\F161"}.fa-sort-numeric-asc:before{content:"\\F162"}.fa-sort-numeric-desc:before{content:"\\F163"}.fa-thumbs-up:before{content:"\\F164"}.fa-thumbs-down:before{content:"\\F165"}.fa-youtube-square:before{content:"\\F166"}.fa-youtube:before{content:"\\F167"}.fa-xing:before{content:"\\F168"}.fa-xing-square:before{content:"\\F169"}.fa-youtube-play:before{content:"\\F16A"}.fa-dropbox:before{content:"\\F16B"}.fa-stack-overflow:before{content:"\\F16C"}.fa-instagram:before{content:"\\F16D"}.fa-flickr:before{content:"\\F16E"}.fa-adn:before{content:"\\F170"}.fa-bitbucket:before{content:"\\F171"}.fa-bitbucket-square:before{content:"\\F172"}.fa-tumblr:before{content:"\\F173"}.fa-tumblr-square:before{content:"\\F174"}.fa-long-arrow-down:before{content:"\\F175"}.fa-long-arrow-up:before{content:"\\F176"}.fa-long-arrow-left:before{content:"\\F177"}.fa-long-arrow-right:before{content:"\\F178"}.fa-apple:before{content:"\\F179"}.fa-windows:before{content:"\\F17A"}.fa-android:before{content:"\\F17B"}.fa-linux:before{content:"\\F17C"}.fa-dribbble:before{content:"\\F17D"}.fa-skype:before{content:"\\F17E"}.fa-foursquare:before{content:"\\F180"}.fa-trello:before{content:"\\F181"}.fa-female:before{content:"\\F182"}.fa-male:before{content:"\\F183"}.fa-gittip:before,.fa-gratipay:before{content:"\\F184"}.fa-sun-o:before{content:"\\F185"}.fa-moon-o:before{content:"\\F186"}.fa-archive:before{content:"\\F187"}.fa-bug:before{content:"\\F188"}.fa-vk:before{content:"\\F189"}.fa-weibo:before{content:"\\F18A"}.fa-renren:before{content:"\\F18B"}.fa-pagelines:before{content:"\\F18C"}.fa-stack-exchange:before{content:"\\F18D"}.fa-arrow-circle-o-right:before{content:"\\F18E"}.fa-arrow-circle-o-left:before{content:"\\F190"}.fa-caret-square-o-left:before,.fa-toggle-left:before{content:"\\F191"}.fa-dot-circle-o:before{content:"\\F192"}.fa-wheelchair:before{content:"\\F193"}.fa-vimeo-square:before{content:"\\F194"}.fa-try:before,.fa-turkish-lira:before{content:"\\F195"}.fa-plus-square-o:before{content:"\\F196"}.fa-space-shuttle:before{content:"\\F197"}.fa-slack:before{content:"\\F198"}.fa-envelope-square:before{content:"\\F199"}.fa-wordpress:before{content:"\\F19A"}.fa-openid:before{content:"\\F19B"}.fa-bank:before,.fa-institution:before,.fa-university:before{content:"\\F19C"}.fa-graduation-cap:before,.fa-mortar-board:before{content:"\\F19D"}.fa-yahoo:before{content:"\\F19E"}.fa-google:before{content:"\\F1A0"}.fa-reddit:before{content:"\\F1A1"}.fa-reddit-square:before{content:"\\F1A2"}.fa-stumbleupon-circle:before{content:"\\F1A3"}.fa-stumbleupon:before{content:"\\F1A4"}.fa-delicious:before{content:"\\F1A5"}.fa-digg:before{content:"\\F1A6"}.fa-pied-piper-pp:before{content:"\\F1A7"}.fa-pied-piper-alt:before{content:"\\F1A8"}.fa-drupal:before{content:"\\F1A9"}.fa-joomla:before{content:"\\F1AA"}.fa-language:before{content:"\\F1AB"}.fa-fax:before{content:"\\F1AC"}.fa-building:before{content:"\\F1AD"}.fa-child:before{content:"\\F1AE"}.fa-paw:before{content:"\\F1B0"}.fa-spoon:before{content:"\\F1B1"}.fa-cube:before{content:"\\F1B2"}.fa-cubes:before{content:"\\F1B3"}.fa-behance:before{content:"\\F1B4"}.fa-behance-square:before{content:"\\F1B5"}.fa-steam:before{content:"\\F1B6"}.fa-steam-square:before{content:"\\F1B7"}.fa-recycle:before{content:"\\F1B8"}.fa-automobile:before,.fa-car:before{content:"\\F1B9"}.fa-cab:before,.fa-taxi:before{content:"\\F1BA"}.fa-tree:before{content:"\\F1BB"}.fa-spotify:before{content:"\\F1BC"}.fa-deviantart:before{content:"\\F1BD"}.fa-soundcloud:before{content:"\\F1BE"}.fa-database:before{content:"\\F1C0"}.fa-file-pdf-o:before{content:"\\F1C1"}.fa-file-word-o:before{content:"\\F1C2"}.fa-file-excel-o:before{content:"\\F1C3"}.fa-file-powerpoint-o:before{content:"\\F1C4"}.fa-file-image-o:before,.fa-file-photo-o:before,.fa-file-picture-o:before{content:"\\F1C5"}.fa-file-archive-o:before,.fa-file-zip-o:before{content:"\\F1C6"}.fa-file-audio-o:before,.fa-file-sound-o:before{content:"\\F1C7"}.fa-file-movie-o:before,.fa-file-video-o:before{content:"\\F1C8"}.fa-file-code-o:before{content:"\\F1C9"}.fa-vine:before{content:"\\F1CA"}.fa-codepen:before{content:"\\F1CB"}.fa-jsfiddle:before{content:"\\F1CC"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-ring:before,.fa-life-saver:before,.fa-support:before{content:"\\F1CD"}.fa-circle-o-notch:before{content:"\\F1CE"}.fa-ra:before,.fa-rebel:before,.fa-resistance:before{content:"\\F1D0"}.fa-empire:before,.fa-ge:before{content:"\\F1D1"}.fa-git-square:before{content:"\\F1D2"}.fa-git:before{content:"\\F1D3"}.fa-hacker-news:before,.fa-y-combinator-square:before,.fa-yc-square:before{content:"\\F1D4"}.fa-tencent-weibo:before{content:"\\F1D5"}.fa-qq:before{content:"\\F1D6"}.fa-wechat:before,.fa-weixin:before{content:"\\F1D7"}.fa-paper-plane:before,.fa-send:before{content:"\\F1D8"}.fa-paper-plane-o:before,.fa-send-o:before{content:"\\F1D9"}.fa-history:before{content:"\\F1DA"}.fa-circle-thin:before{content:"\\F1DB"}.fa-header:before{content:"\\F1DC"}.fa-paragraph:before{content:"\\F1DD"}.fa-sliders:before{content:"\\F1DE"}.fa-share-alt:before{content:"\\F1E0"}.fa-share-alt-square:before{content:"\\F1E1"}.fa-bomb:before{content:"\\F1E2"}.fa-futbol-o:before,.fa-soccer-ball-o:before{content:"\\F1E3"}.fa-tty:before{content:"\\F1E4"}.fa-binoculars:before{content:"\\F1E5"}.fa-plug:before{content:"\\F1E6"}.fa-slideshare:before{content:"\\F1E7"}.fa-twitch:before{content:"\\F1E8"}.fa-yelp:before{content:"\\F1E9"}.fa-newspaper-o:before{content:"\\F1EA"}.fa-wifi:before{content:"\\F1EB"}.fa-calculator:before{content:"\\F1EC"}.fa-paypal:before{content:"\\F1ED"}.fa-google-wallet:before{content:"\\F1EE"}.fa-cc-visa:before{content:"\\F1F0"}.fa-cc-mastercard:before{content:"\\F1F1"}.fa-cc-discover:before{content:"\\F1F2"}.fa-cc-amex:before{content:"\\F1F3"}.fa-cc-paypal:before{content:"\\F1F4"}.fa-cc-stripe:before{content:"\\F1F5"}.fa-bell-slash:before{content:"\\F1F6"}.fa-bell-slash-o:before{content:"\\F1F7"}.fa-trash:before{content:"\\F1F8"}.fa-copyright:before{content:"\\F1F9"}.fa-at:before{content:"\\F1FA"}.fa-eyedropper:before{content:"\\F1FB"}.fa-paint-brush:before{content:"\\F1FC"}.fa-birthday-cake:before{content:"\\F1FD"}.fa-area-chart:before{content:"\\F1FE"}.fa-pie-chart:before{content:"\\F200"}.fa-line-chart:before{content:"\\F201"}.fa-lastfm:before{content:"\\F202"}.fa-lastfm-square:before{content:"\\F203"}.fa-toggle-off:before{content:"\\F204"}.fa-toggle-on:before{content:"\\F205"}.fa-bicycle:before{content:"\\F206"}.fa-bus:before{content:"\\F207"}.fa-ioxhost:before{content:"\\F208"}.fa-angellist:before{content:"\\F209"}.fa-cc:before{content:"\\F20A"}.fa-ils:before,.fa-shekel:before,.fa-sheqel:before{content:"\\F20B"}.fa-meanpath:before{content:"\\F20C"}.fa-buysellads:before{content:"\\F20D"}.fa-connectdevelop:before{content:"\\F20E"}.fa-dashcube:before{content:"\\F210"}.fa-forumbee:before{content:"\\F211"}.fa-leanpub:before{content:"\\F212"}.fa-sellsy:before{content:"\\F213"}.fa-shirtsinbulk:before{content:"\\F214"}.fa-simplybuilt:before{content:"\\F215"}.fa-skyatlas:before{content:"\\F216"}.fa-cart-plus:before{content:"\\F217"}.fa-cart-arrow-down:before{content:"\\F218"}.fa-diamond:before{content:"\\F219"}.fa-ship:before{content:"\\F21A"}.fa-user-secret:before{content:"\\F21B"}.fa-motorcycle:before{content:"\\F21C"}.fa-street-view:before{content:"\\F21D"}.fa-heartbeat:before{content:"\\F21E"}.fa-venus:before{content:"\\F221"}.fa-mars:before{content:"\\F222"}.fa-mercury:before{content:"\\F223"}.fa-intersex:before,.fa-transgender:before{content:"\\F224"}.fa-transgender-alt:before{content:"\\F225"}.fa-venus-double:before{content:"\\F226"}.fa-mars-double:before{content:"\\F227"}.fa-venus-mars:before{content:"\\F228"}.fa-mars-stroke:before{content:"\\F229"}.fa-mars-stroke-v:before{content:"\\F22A"}.fa-mars-stroke-h:before{content:"\\F22B"}.fa-neuter:before{content:"\\F22C"}.fa-genderless:before{content:"\\F22D"}.fa-facebook-official:before{content:"\\F230"}.fa-pinterest-p:before{content:"\\F231"}.fa-whatsapp:before{content:"\\F232"}.fa-server:before{content:"\\F233"}.fa-user-plus:before{content:"\\F234"}.fa-user-times:before{content:"\\F235"}.fa-bed:before,.fa-hotel:before{content:"\\F236"}.fa-viacoin:before{content:"\\F237"}.fa-train:before{content:"\\F238"}.fa-subway:before{content:"\\F239"}.fa-medium:before{content:"\\F23A"}.fa-y-combinator:before,.fa-yc:before{content:"\\F23B"}.fa-optin-monster:before{content:"\\F23C"}.fa-opencart:before{content:"\\F23D"}.fa-expeditedssl:before{content:"\\F23E"}.fa-battery-4:before,.fa-battery-full:before,.fa-battery:before{content:"\\F240"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:"\\F241"}.fa-battery-2:before,.fa-battery-half:before{content:"\\F242"}.fa-battery-1:before,.fa-battery-quarter:before{content:"\\F243"}.fa-battery-0:before,.fa-battery-empty:before{content:"\\F244"}.fa-mouse-pointer:before{content:"\\F245"}.fa-i-cursor:before{content:"\\F246"}.fa-object-group:before{content:"\\F247"}.fa-object-ungroup:before{content:"\\F248"}.fa-sticky-note:before{content:"\\F249"}.fa-sticky-note-o:before{content:"\\F24A"}.fa-cc-jcb:before{content:"\\F24B"}.fa-cc-diners-club:before{content:"\\F24C"}.fa-clone:before{content:"\\F24D"}.fa-balance-scale:before{content:"\\F24E"}.fa-hourglass-o:before{content:"\\F250"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:"\\F251"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:"\\F252"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:"\\F253"}.fa-hourglass:before{content:"\\F254"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:"\\F255"}.fa-hand-paper-o:before,.fa-hand-stop-o:before{content:"\\F256"}.fa-hand-scissors-o:before{content:"\\F257"}.fa-hand-lizard-o:before{content:"\\F258"}.fa-hand-spock-o:before{content:"\\F259"}.fa-hand-pointer-o:before{content:"\\F25A"}.fa-hand-peace-o:before{content:"\\F25B"}.fa-trademark:before{content:"\\F25C"}.fa-registered:before{content:"\\F25D"}.fa-creative-commons:before{content:"\\F25E"}.fa-gg:before{content:"\\F260"}.fa-gg-circle:before{content:"\\F261"}.fa-tripadvisor:before{content:"\\F262"}.fa-odnoklassniki:before{content:"\\F263"}.fa-odnoklassniki-square:before{content:"\\F264"}.fa-get-pocket:before{content:"\\F265"}.fa-wikipedia-w:before{content:"\\F266"}.fa-safari:before{content:"\\F267"}.fa-chrome:before{content:"\\F268"}.fa-firefox:before{content:"\\F269"}.fa-opera:before{content:"\\F26A"}.fa-internet-explorer:before{content:"\\F26B"}.fa-television:before,.fa-tv:before{content:"\\F26C"}.fa-contao:before{content:"\\F26D"}.fa-500px:before{content:"\\F26E"}.fa-amazon:before{content:"\\F270"}.fa-calendar-plus-o:before{content:"\\F271"}.fa-calendar-minus-o:before{content:"\\F272"}.fa-calendar-times-o:before{content:"\\F273"}.fa-calendar-check-o:before{content:"\\F274"}.fa-industry:before{content:"\\F275"}.fa-map-pin:before{content:"\\F276"}.fa-map-signs:before{content:"\\F277"}.fa-map-o:before{content:"\\F278"}.fa-map:before{content:"\\F279"}.fa-commenting:before{content:"\\F27A"}.fa-commenting-o:before{content:"\\F27B"}.fa-houzz:before{content:"\\F27C"}.fa-vimeo:before{content:"\\F27D"}.fa-black-tie:before{content:"\\F27E"}.fa-fonticons:before{content:"\\F280"}.fa-reddit-alien:before{content:"\\F281"}.fa-edge:before{content:"\\F282"}.fa-credit-card-alt:before{content:"\\F283"}.fa-codiepie:before{content:"\\F284"}.fa-modx:before{content:"\\F285"}.fa-fort-awesome:before{content:"\\F286"}.fa-usb:before{content:"\\F287"}.fa-product-hunt:before{content:"\\F288"}.fa-mixcloud:before{content:"\\F289"}.fa-scribd:before{content:"\\F28A"}.fa-pause-circle:before{content:"\\F28B"}.fa-pause-circle-o:before{content:"\\F28C"}.fa-stop-circle:before{content:"\\F28D"}.fa-stop-circle-o:before{content:"\\F28E"}.fa-shopping-bag:before{content:"\\F290"}.fa-shopping-basket:before{content:"\\F291"}.fa-hashtag:before{content:"\\F292"}.fa-bluetooth:before{content:"\\F293"}.fa-bluetooth-b:before{content:"\\F294"}.fa-percent:before{content:"\\F295"}.fa-gitlab:before{content:"\\F296"}.fa-wpbeginner:before{content:"\\F297"}.fa-wpforms:before{content:"\\F298"}.fa-envira:before{content:"\\F299"}.fa-universal-access:before{content:"\\F29A"}.fa-wheelchair-alt:before{content:"\\F29B"}.fa-question-circle-o:before{content:"\\F29C"}.fa-blind:before{content:"\\F29D"}.fa-audio-description:before{content:"\\F29E"}.fa-volume-control-phone:before{content:"\\F2A0"}.fa-braille:before{content:"\\F2A1"}.fa-assistive-listening-systems:before{content:"\\F2A2"}.fa-american-sign-language-interpreting:before,.fa-asl-interpreting:before{content:"\\F2A3"}.fa-deaf:before,.fa-deafness:before,.fa-hard-of-hearing:before{content:"\\F2A4"}.fa-glide:before{content:"\\F2A5"}.fa-glide-g:before{content:"\\F2A6"}.fa-sign-language:before,.fa-signing:before{content:"\\F2A7"}.fa-low-vision:before{content:"\\F2A8"}.fa-viadeo:before{content:"\\F2A9"}.fa-viadeo-square:before{content:"\\F2AA"}.fa-snapchat:before{content:"\\F2AB"}.fa-snapchat-ghost:before{content:"\\F2AC"}.fa-snapchat-square:before{content:"\\F2AD"}.fa-pied-piper:before{content:"\\F2AE"}.fa-first-order:before{content:"\\F2B0"}.fa-yoast:before{content:"\\F2B1"}.fa-themeisle:before{content:"\\F2B2"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:"\\F2B3"}.fa-fa:before,.fa-font-awesome:before{content:"\\F2B4"}.fa-handshake-o:before{content:"\\F2B5"}.fa-envelope-open:before{content:"\\F2B6"}.fa-envelope-open-o:before{content:"\\F2B7"}.fa-linode:before{content:"\\F2B8"}.fa-address-book:before{content:"\\F2B9"}.fa-address-book-o:before{content:"\\F2BA"}.fa-address-card:before,.fa-vcard:before{content:"\\F2BB"}.fa-address-card-o:before,.fa-vcard-o:before{content:"\\F2BC"}.fa-user-circle:before{content:"\\F2BD"}.fa-user-circle-o:before{content:"\\F2BE"}.fa-user-o:before{content:"\\F2C0"}.fa-id-badge:before{content:"\\F2C1"}.fa-drivers-license:before,.fa-id-card:before{content:"\\F2C2"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:"\\F2C3"}.fa-quora:before{content:"\\F2C4"}.fa-free-code-camp:before{content:"\\F2C5"}.fa-telegram:before{content:"\\F2C6"}.fa-thermometer-4:before,.fa-thermometer-full:before,.fa-thermometer:before{content:"\\F2C7"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:"\\F2C8"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:"\\F2C9"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:"\\F2CA"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:"\\F2CB"}.fa-shower:before{content:"\\F2CC"}.fa-bath:before,.fa-bathtub:before,.fa-s15:before{content:"\\F2CD"}.fa-podcast:before{content:"\\F2CE"}.fa-window-maximize:before{content:"\\F2D0"}.fa-window-minimize:before{content:"\\F2D1"}.fa-window-restore:before{content:"\\F2D2"}.fa-times-rectangle:before,.fa-window-close:before{content:"\\F2D3"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:"\\F2D4"}.fa-bandcamp:before{content:"\\F2D5"}.fa-grav:before{content:"\\F2D6"}.fa-etsy:before{content:"\\F2D7"}.fa-imdb:before{content:"\\F2D8"}.fa-ravelry:before{content:"\\F2D9"}.fa-eercast:before{content:"\\F2DA"}.fa-microchip:before{content:"\\F2DB"}.fa-snowflake-o:before{content:"\\F2DC"}.fa-superpowers:before{content:"\\F2DD"}.fa-wpexplorer:before{content:"\\F2DE"}.fa-meetup:before{content:"\\F2E0"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}',""])},function(t,e,n){(function(e){function n(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e){var i=r(o);return[n].concat(o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function r(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+new e(JSON.stringify(t)).toString("base64")+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=n(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var a=t[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}}).call(e,n(20).Buffer)},function(t,e,n){t.exports=n.p+"32d728baac11f913509767b6d5c01750.svg"},function(t,e,n){t.exports=n.p+"674f50d287a8c48dc19ba404d20fe713.eot"},function(t,e,n){t.exports=n.p+"674f50d287a8c48dc19ba404d20fe713.eot"},function(t,e,n){t.exports=n.p+"b06871f281fee6b241d60582ae9369b9.ttf"},function(t,e,n){t.exports=n.p+"data/74df251ceefde6543a39cd9a322f5d3e.json"},function(t,e,n){t.exports=n.p+"images/atripla.png"},function(t,e,n){t.exports=n.p+"images/avastin.png"},function(t,e,n){t.exports=n.p+"images/baraclude.png"},function(t,e,n){t.exports=n.p+"images/enbrel.png"},function(t,e,n){t.exports=n.p+"images/evoltra.png"},function(t,e,n){t.exports=n.p+"images/glivec.png"},function(t,e,n){t.exports=n.p+"images/herceptin.png"},function(t,e,n){t.exports=n.p+"images/isentress.png"},function(t,e,n){t.exports=n.p+"images/kaletra.png"},function(t,e,n){t.exports=n.p+"images/lilly.png"},function(t,e,n){t.exports=n.p+"images/reyataz.png"},function(t,e,n){t.exports=n.p+"images/sovaldi.png"},function(t,e,n){t.exports=n.p+"images/no.png"},function(t,e,n){t.exports=n.p+"images/none.png"},function(t,e,n){t.exports=n.p+"images/yes.png"},function(t,e){e.read=function(t,e,n,r,o){var i,a,u=8*o-r-1,f=(1<<u)-1,c=f>>1,s=-7,l=n?o-1:0,h=n?-1:1,p=t[e+l];for(l+=h,i=p&(1<<-s)-1,p>>=-s,s+=u;s>0;i=256*i+t[e+l],l+=h,s-=8);for(a=i&(1<<-s)-1,i>>=-s,s+=r;s>0;a=256*a+t[e+l],l+=h,s-=8);if(0===i)i=1-c;else{if(i===f)return a?NaN:1/0*(p?-1:1);a+=Math.pow(2,r),i-=c}return(p?-1:1)*a*Math.pow(2,i-r)},e.write=function(t,e,n,r,o,i){var a,u,f,c=8*i-o-1,s=(1<<c)-1,l=s>>1,h=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,p=r?0:i-1,d=r?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(u=isNaN(e)?1:0,a=s):(a=Math.floor(Math.log(e)/Math.LN2),e*(f=Math.pow(2,-a))<1&&(a--,f*=2),e+=a+l>=1?h/f:h*Math.pow(2,1-l),e*f>=2&&(a++,f/=2),a+l>=s?(u=0,a=s):a+l>=1?(u=(e*f-1)*Math.pow(2,o),a+=l):(u=e*Math.pow(2,l-1)*Math.pow(2,o),a=0));o>=8;t[n+p]=255&u,p+=d,u/=256,o-=8);for(a=a<<o|u,c+=o;c>0;t[n+p]=255&a,p+=d,a/=256,c-=8);t[n+p-d]|=128*g}},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=d[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(s(r.parts[i],e))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(s(r.parts[i],e));d[r.id]={id:r.id,refs:1,parts:a}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],i=o[0],a=o[1],u=o[2],f=o[3],c={css:a,media:u,sourceMap:f};n[i]?n[i].parts.push(c):e.push(n[i]={id:i,parts:[c]})}return e}function i(t,e){var n=v(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=m[m.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),m.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=m.indexOf(t);e>=0&&m.splice(e,1)}function u(t){var e=document.createElement("style");return t.attrs.type="text/css",c(e,t.attrs),i(t,e),e}function f(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",c(e,t.attrs),i(t,e),e}function c(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function s(t,e){var n,r,o;if(e.singleton){var i=y++;n=b||(b=u(e)),r=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=f(e),r=p.bind(null,n,e),o=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=u(e),r=h.bind(null,n),o=function(){a(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}function l(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=x(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function h(t,e){var n=e.css,r=e.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var r=n.css,o=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=_(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),u=t.href;t.href=URL.createObjectURL(a),u&&URL.revokeObjectURL(u)}var d={},g=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),b=null,y=0,m=[],_=n(46);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},void 0===e.singleton&&(e.singleton=g()),void 0===e.insertInto&&(e.insertInto="head"),void 0===e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var u=n[a],f=d[u.id];f.refs--,i.push(f)}if(t){r(o(t),e)}for(var a=0;a<i.length;a++){var f=i[a];if(0===f.refs){for(var c=0;c<f.parts.length;c++)f.parts[c]();delete d[f.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o))return t;var i;return i=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(t,e,n){var r=n(22);"string"==typeof r&&(r=[[t.i,r,""]]);n(45)(r,{});r.locals&&(t.exports=r.locals)},function(t,e,n){t.exports=n.p+"af7ae505a9eed503f8b8e6982036873e.woff2"},function(t,e,n){t.exports=n.p+"fee66e712a8a08eef5805a46892932ad.woff"},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){n(16),n(2),n(18),n(17),n(6),n(10),n(15),n(14),n(12),n(5),n(11),n(8),n(7),n(3),n(4),n(9),n(13)},function(t,e,n){!function(t,n){n(e)}(0,function(t){"use strict";function e(t){return function(e,n){return qc(t(e),n)}}function n(t,e){return[t,e]}function r(t,e,n){var r=(e-t)/Math.max(0,n),o=Math.floor(Math.log(r)/Math.LN10),i=r/Math.pow(10,o);return o>=0?(i>=Kc?10:i>=ts?5:i>=es?2:1)*Math.pow(10,o):-Math.pow(10,-o)/(i>=Kc?10:i>=ts?5:i>=es?2:1)}function o(t,e,n){var r=Math.abs(e-t)/Math.max(0,n),o=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),i=r/o;return i>=Kc?o*=10:i>=ts?o*=5:i>=es&&(o*=2),e<t?-o:o}function i(t){return t.length}function a(t){return"translate("+t+",0)"}function u(t){return"translate(0,"+t+")"}function f(t){var e=t.bandwidth()/2;return t.round()&&(e=Math.round(e)),function(n){return t(n)+e}}function c(){return!this.__axis}function s(t,e){function n(n){var a=null==i?e.ticks?e.ticks.apply(e,o):e.domain():i,u=null==s?e.tickFormat?e.tickFormat.apply(e,o):_s:s,b=Math.max(l,0)+p,y=e.range(),m=y[0]+.5,_=y[y.length-1]+.5,x=(e.bandwidth?f:_s)(e.copy()),w=n.selection?n.selection():n,F=w.selectAll(".domain").data([null]),M=w.selectAll(".tick").data(a,e).order(),A=M.exit(),E=M.enter().append("g").attr("class","tick"),T=M.select("line"),C=M.select("text");F=F.merge(F.enter().insert("path",".tick").attr("class","domain").attr("stroke","#000")),M=M.merge(E),T=T.merge(E.append("line").attr("stroke","#000").attr(r+"2",d*l).attr(g+"1",.5).attr(g+"2",.5)),C=C.merge(E.append("text").attr("fill","#000").attr(r,d*b).attr(g,.5).attr("dy",t===xs?"0em":t===Fs?"0.71em":"0.32em")),n!==w&&(F=F.transition(n),M=M.transition(n),T=T.transition(n),C=C.transition(n),A=A.transition(n).attr("opacity",As).attr("transform",function(t){return isFinite(t=x(t))?v(t):this.getAttribute("transform")}),E.attr("opacity",As).attr("transform",function(t){var e=this.parentNode.__axis;return v(e&&isFinite(e=e(t))?e:x(t))})),A.remove(),F.attr("d",t===Ms||t==ws?"M"+d*h+","+m+"H0.5V"+_+"H"+d*h:"M"+m+","+d*h+"V0.5H"+_+"V"+d*h),M.attr("opacity",1).attr("transform",function(t){return v(x(t))}),T.attr(r+"2",d*l),C.attr(r,d*b).text(u),w.filter(c).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===ws?"start":t===Ms?"end":"middle"),w.each(function(){this.__axis=x})}var r,o=[],i=null,s=null,l=6,h=6,p=3,d=t===xs||t===Ms?-1:1,g=t===Ms||t===ws?(r="x","y"):(r="y","x"),v=t===xs||t===Fs?a:u;return n.scale=function(t){return arguments.length?(e=t,n):e},n.ticks=function(){return o=ms.call(arguments),n},n.tickArguments=function(t){return arguments.length?(o=null==t?[]:ms.call(t),n):o.slice()},n.tickValues=function(t){return arguments.length?(i=null==t?null:ms.call(t),n):i&&i.slice()},n.tickFormat=function(t){return arguments.length?(s=t,n):s},n.tickSize=function(t){return arguments.length?(l=h=+t,n):l},n.tickSizeInner=function(t){return arguments.length?(l=+t,n):l},n.tickSizeOuter=function(t){return arguments.length?(h=+t,n):h},n.tickPadding=function(t){return arguments.length?(p=+t,n):p},n}function l(t){return s(xs,t)}function h(t){return s(ws,t)}function p(t){return s(Fs,t)}function d(t){return s(Ms,t)}function g(){for(var t,e=0,n=arguments.length,r={};e<n;++e){if(!(t=arguments[e]+"")||t in r)throw new Error("illegal type: "+t);r[t]=[]}return new v(r)}function v(t){this._=t}function b(t,e){return t.trim().split(/^|\s+/).map(function(t){var n="",r=t.indexOf(".");if(r>=0&&(n=t.slice(r+1),t=t.slice(0,r)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:n}})}function y(t,e){for(var n,r=0,o=t.length;r<o;++r)if((n=t[r]).name===e)return n.value}function m(t,e,n){for(var r=0,o=t.length;r<o;++r)if(t[r].name===e){t[r]=Es,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=n&&t.push({name:e,value:n}),t}function _(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===Ts&&e.documentElement.namespaceURI===Ts?e.createElement(t):e.createElementNS(n,t)}}function x(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function w(){return new F}function F(){this._="@"+(++Ns).toString(36)}function M(t,e,n){return t=A(t,e,n),function(e){var n=e.relatedTarget;n&&(n===this||8&n.compareDocumentPosition(this))||t.call(this,e)}}function A(e,n,r){return function(o){var i=t.event;t.event=o;try{e.call(this,this.__data__,n,r)}finally{t.event=i}}}function E(t){return t.trim().split(/^|\s+/).map(function(t){var e="",n=t.indexOf(".");return n>=0&&(e=t.slice(n+1),t=t.slice(0,n)),{type:t,name:e}})}function T(t){return function(){var e=this.__on;if(e){for(var n,r=0,o=-1,i=e.length;r<i;++r)n=e[r],t.type&&n.type!==t.type||n.name!==t.name?e[++o]=n:this.removeEventListener(n.type,n.listener,n.capture);++o?e.length=o:delete this.__on}}}function C(t,e,n){var r=Ls.hasOwnProperty(t.type)?M:A;return function(o,i,a){var u,f=this.__on,c=r(e,i,a);if(f)for(var s=0,l=f.length;s<l;++s)if((u=f[s]).type===t.type&&u.name===t.name)return this.removeEventListener(u.type,u.listener,u.capture),this.addEventListener(u.type,u.listener=c,u.capture=n),void(u.value=e);this.addEventListener(t.type,c,n),u={type:t.type,name:t.name,value:e,listener:c,capture:n},f?f.push(u):this.__on=[u]}}function k(e,n,r,o){var i=t.event;e.sourceEvent=t.event,t.event=e;try{return n.apply(r,o)}finally{t.event=i}}function S(){}function N(){return[]}function D(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}function R(t,e,n,r,o,i){for(var a,u=0,f=e.length,c=i.length;u<c;++u)(a=e[u])?(a.__data__=i[u],r[u]=a):n[u]=new D(t,i[u]);for(;u<f;++u)(a=e[u])&&(o[u]=a)}function P(t,e,n,r,o,i,a){var u,f,c,s={},l=e.length,h=i.length,p=new Array(l);for(u=0;u<l;++u)(f=e[u])&&(p[u]=c=Gs+a.call(f,f.__data__,u,e),c in s?o[u]=f:s[c]=f);for(u=0;u<h;++u)c=Gs+a.call(t,i[u],u,i),(f=s[c])?(r[u]=f,f.__data__=i[u],s[c]=null):n[u]=new D(t,i[u]);for(u=0;u<l;++u)(f=e[u])&&s[p[u]]===f&&(o[u]=f)}function q(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function L(t){return function(){this.removeAttribute(t)}}function B(t){return function(){this.removeAttributeNS(t.space,t.local)}}function j(t,e){return function(){this.setAttribute(t,e)}}function O(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function I(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttribute(t):this.setAttribute(t,n)}}function U(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function z(t){return function(){this.style.removeProperty(t)}}function H(t,e,n){return function(){this.style.setProperty(t,e,n)}}function Y(t,e,n){return function(){var r=e.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,n)}}function $(t){return function(){delete this[t]}}function W(t,e){return function(){this[t]=e}}function X(t,e){return function(){var n=e.apply(this,arguments);null==n?delete this[t]:this[t]=n}}function V(t){return t.trim().split(/^|\s+/)}function G(t){return t.classList||new J(t)}function J(t){this._node=t,this._names=V(t.getAttribute("class")||"")}function Z(t,e){for(var n=G(t),r=-1,o=e.length;++r<o;)n.add(e[r])}function Q(t,e){for(var n=G(t),r=-1,o=e.length;++r<o;)n.remove(e[r])}function K(t){return function(){Z(this,t)}}function tt(t){return function(){Q(this,t)}}function et(t,e){return function(){(e.apply(this,arguments)?Z:Q)(this,t)}}function nt(){this.textContent=""}function rt(t){return function(){this.textContent=t}}function ot(t){return function(){var e=t.apply(this,arguments);this.textContent=null==e?"":e}}function it(){this.innerHTML=""}function at(t){return function(){this.innerHTML=t}}function ut(t){return function(){var e=t.apply(this,arguments);this.innerHTML=null==e?"":e}}function ft(){this.nextSibling&&this.parentNode.appendChild(this)}function ct(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function st(){return null}function lt(){var t=this.parentNode;t&&t.removeChild(this)}function ht(t,e,n){var r=fl(t),o=r.CustomEvent;o?o=new o(e,n):(o=r.document.createEvent("Event"),n?(o.initEvent(e,n.bubbles,n.cancelable),o.detail=n.detail):o.initEvent(e,!1,!1)),t.dispatchEvent(o)}function pt(t,e){return function(){return ht(this,t,e)}}function dt(t,e){return function(){return ht(this,t,e.apply(this,arguments))}}function gt(t,e){this._groups=t,this._parents=e}function vt(){return new gt([[document.documentElement]],xl)}function bt(){t.event.stopImmediatePropagation()}function yt(t,e){var n=t.document.documentElement,r=wl(t).on("dragstart.drag",null);e&&(r.on("click.drag",El,!0),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in n?r.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}function mt(t,e,n,r,o,i,a,u,f,c){this.target=t,this.type=e,this.subject=n,this.identifier=r,this.active=o,this.x=i,this.y=a,this.dx=u,this.dy=f,this._=c}function _t(){return!t.event.button}function xt(){return this.parentNode}function wt(e){return null==e?{x:t.event.x,y:t.event.y}:e}function Ft(t,e){var n=Object.create(t.prototype);for(var r in e)n[r]=e[r];return n}function Mt(){}function At(t){var e;return t=(t+"").trim().toLowerCase(),(e=Pl.exec(t))?(e=parseInt(e[1],16),new St(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1)):(e=ql.exec(t))?Et(parseInt(e[1],16)):(e=Ll.exec(t))?new St(e[1],e[2],e[3],1):(e=Bl.exec(t))?new St(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=jl.exec(t))?Tt(e[1],e[2],e[3],e[4]):(e=Ol.exec(t))?Tt(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=Il.exec(t))?Nt(e[1],e[2]/100,e[3]/100,1):(e=Ul.exec(t))?Nt(e[1],e[2]/100,e[3]/100,e[4]):zl.hasOwnProperty(t)?Et(zl[t]):"transparent"===t?new St(NaN,NaN,NaN,0):null}function Et(t){return new St(t>>16&255,t>>8&255,255&t,1)}function Tt(t,e,n,r){return r<=0&&(t=e=n=NaN),new St(t,e,n,r)}function Ct(t){return t instanceof Mt||(t=At(t)),t?(t=t.rgb(),new St(t.r,t.g,t.b,t.opacity)):new St}function kt(t,e,n,r){return 1===arguments.length?Ct(t):new St(t,e,n,null==r?1:r)}function St(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r}function Nt(t,e,n,r){return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new Pt(t,e,n,r)}function Dt(t){if(t instanceof Pt)return new Pt(t.h,t.s,t.l,t.opacity);if(t instanceof Mt||(t=At(t)),!t)return new Pt;if(t instanceof Pt)return t;t=t.rgb();var e=t.r/255,n=t.g/255,r=t.b/255,o=Math.min(e,n,r),i=Math.max(e,n,r),a=NaN,u=i-o,f=(i+o)/2;return u?(a=e===i?(n-r)/u+6*(n<r):n===i?(r-e)/u+2:(e-n)/u+4,u/=f<.5?i+o:2-i-o,a*=60):u=f>0&&f<1?0:a,new Pt(a,u,f,t.opacity)}function Rt(t,e,n,r){return 1===arguments.length?Dt(t):new Pt(t,e,n,null==r?1:r)}function Pt(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}function qt(t,e,n){return 255*(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)}function Lt(t){if(t instanceof jt)return new jt(t.l,t.a,t.b,t.opacity);if(t instanceof $t){var e=t.h*Hl;return new jt(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}t instanceof St||(t=Ct(t));var n=zt(t.r),r=zt(t.g),o=zt(t.b),i=Ot((.4124564*n+.3575761*r+.1804375*o)/$l),a=Ot((.2126729*n+.7151522*r+.072175*o)/Wl);return new jt(116*a-16,500*(i-a),200*(a-Ot((.0193339*n+.119192*r+.9503041*o)/Xl)),t.opacity)}function Bt(t,e,n,r){return 1===arguments.length?Lt(t):new jt(t,e,n,null==r?1:r)}function jt(t,e,n,r){this.l=+t,this.a=+e,this.b=+n,this.opacity=+r}function Ot(t){return t>Zl?Math.pow(t,1/3):t/Jl+Vl}function It(t){return t>Gl?t*t*t:Jl*(t-Vl)}function Ut(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function zt(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function Ht(t){if(t instanceof $t)return new $t(t.h,t.c,t.l,t.opacity);t instanceof jt||(t=Lt(t));var e=Math.atan2(t.b,t.a)*Yl;return new $t(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function Yt(t,e,n,r){return 1===arguments.length?Ht(t):new $t(t,e,n,null==r?1:r)}function $t(t,e,n,r){this.h=+t,this.c=+e,this.l=+n,this.opacity=+r}function Wt(t){if(t instanceof Vt)return new Vt(t.h,t.s,t.l,t.opacity);t instanceof St||(t=Ct(t));var e=t.r/255,n=t.g/255,r=t.b/255,o=(oh*r+nh*e-rh*n)/(oh+nh-rh),i=r-o,a=(eh*(n-o)-Kl*i)/th,u=Math.sqrt(a*a+i*i)/(eh*o*(1-o)),f=u?Math.atan2(a,i)*Yl-120:NaN;return new Vt(f<0?f+360:f,u,o,t.opacity)}function Xt(t,e,n,r){return 1===arguments.length?Wt(t):new Vt(t,e,n,null==r?1:r)}function Vt(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}function Gt(t,e,n,r,o){var i=t*t,a=i*t;return((1-3*t+3*i-a)*e+(4-6*i+3*a)*n+(1+3*t+3*i-3*a)*r+a*o)/6}function Jt(t,e){return function(n){return t+n*e}}function Zt(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(r){return Math.pow(t+r*e,n)}}function Qt(t,e){var n=e-t;return n?Jt(t,n>180||n<-180?n-360*Math.round(n/360):n):ph(isNaN(t)?e:t)}function Kt(t){return 1==(t=+t)?te:function(e,n){return n-e?Zt(e,n,t):ph(isNaN(e)?n:e)}}function te(t,e){var n=e-t;return n?Jt(t,n):ph(isNaN(t)?e:t)}function ee(t){return function(e){var n,r,o=e.length,i=new Array(o),a=new Array(o),u=new Array(o);for(n=0;n<o;++n)r=kt(e[n]),i[n]=r.r||0,a[n]=r.g||0,u[n]=r.b||0;return i=t(i),a=t(a),u=t(u),r.opacity=1,function(t){return r.r=i(t),r.g=a(t),r.b=u(t),r+""}}}function ne(t){return function(){return t}}function re(t){return function(e){return t(e)+""}}function oe(t){return"none"===t?Th:(ih||(ih=document.createElement("DIV"),ah=document.documentElement,uh=document.defaultView),ih.style.transform=t,t=uh.getComputedStyle(ah.appendChild(ih),null).getPropertyValue("transform"),ah.removeChild(ih),t=t.slice(7,-1).split(","),Ch(+t[0],+t[1],+t[2],+t[3],+t[4],+t[5]))}function ie(t){return null==t?Th:(fh||(fh=document.createElementNS("http://www.w3.org/2000/svg","g")),fh.setAttribute("transform",t),(t=fh.transform.baseVal.consolidate())?(t=t.matrix,Ch(t.a,t.b,t.c,t.d,t.e,t.f)):Th)}function ae(t,e,n,r){function o(t){return t.length?t.pop()+" ":""}function i(t,r,o,i,a,u){if(t!==o||r!==i){var f=a.push("translate(",null,e,null,n);u.push({i:f-4,x:mh(t,o)},{i:f-2,x:mh(r,i)})}else(o||i)&&a.push("translate("+o+e+i+n)}function a(t,e,n,i){t!==e?(t-e>180?e+=360:e-t>180&&(t+=360),i.push({i:n.push(o(n)+"rotate(",null,r)-2,x:mh(t,e)})):e&&n.push(o(n)+"rotate("+e+r)}function u(t,e,n,i){t!==e?i.push({i:n.push(o(n)+"skewX(",null,r)-2,x:mh(t,e)}):e&&n.push(o(n)+"skewX("+e+r)}function f(t,e,n,r,i,a){if(t!==n||e!==r){var u=i.push(o(i)+"scale(",null,",",null,")");a.push({i:u-4,x:mh(t,n)},{i:u-2,x:mh(e,r)})}else 1===n&&1===r||i.push(o(i)+"scale("+n+","+r+")")}return function(e,n){var r=[],o=[];return e=t(e),n=t(n),i(e.translateX,e.translateY,n.translateX,n.translateY,r,o),a(e.rotate,n.rotate,r,o),u(e.skewX,n.skewX,r,o),f(e.scaleX,e.scaleY,n.scaleX,n.scaleY,r,o),e=n=null,function(t){for(var e,n=-1,i=o.length;++n<i;)r[(e=o[n]).i]=e.x(t);return r.join("")}}}function ue(t){return((t=Math.exp(t))+1/t)/2}function fe(t){return((t=Math.exp(t))-1/t)/2}function ce(t){return((t=Math.exp(2*t))-1)/(t+1)}function se(t){return function(e,n){var r=t((e=Rt(e)).h,(n=Rt(n)).h),o=te(e.s,n.s),i=te(e.l,n.l),a=te(e.opacity,n.opacity);return function(t){return e.h=r(t),e.s=o(t),e.l=i(t),e.opacity=a(t),e+""}}}function le(t,e){var n=te((t=Bt(t)).l,(e=Bt(e)).l),r=te(t.a,e.a),o=te(t.b,e.b),i=te(t.opacity,e.opacity);return function(e){return t.l=n(e),t.a=r(e),t.b=o(e),t.opacity=i(e),t+""}}function he(t){return function(e,n){var r=t((e=Yt(e)).h,(n=Yt(n)).h),o=te(e.c,n.c),i=te(e.l,n.l),a=te(e.opacity,n.opacity);return function(t){return e.h=r(t),e.c=o(t),e.l=i(t),e.opacity=a(t),e+""}}}function pe(t){return function e(n){function r(e,r){var o=t((e=Xt(e)).h,(r=Xt(r)).h),i=te(e.s,r.s),a=te(e.l,r.l),u=te(e.opacity,r.opacity);return function(t){return e.h=o(t),e.s=i(t),e.l=a(Math.pow(t,n)),e.opacity=u(t),e+""}}return n=+n,r.gamma=e,r}(1)}function de(){return $h||(Vh(ge),$h=Xh.now()+Wh)}function ge(){$h=0}function ve(){this._call=this._time=this._next=null}function be(t,e,n){var r=new ve;return r.restart(t,e,n),r}function ye(){de(),++Ih;for(var t,e=ch;e;)(t=$h-e._time)>=0&&e._call.call(null,t),e=e._next;--Ih}function me(){$h=(Yh=Xh.now())+Wh,Ih=Uh=0;try{ye()}finally{Ih=0,xe(),$h=0}}function _e(){var t=Xh.now(),e=t-Yh;e>Hh&&(Wh-=e,Yh=t)}function xe(){for(var t,e,n=ch,r=1/0;n;)n._call?(r>n._time&&(r=n._time),t=n,n=n._next):(e=n._next,n._next=null,n=t?t._next=e:ch=e);sh=t,we(r)}function we(t){if(!Ih){Uh&&(Uh=clearTimeout(Uh));var e=t-$h;e>24?(t<1/0&&(Uh=setTimeout(me,e)),zh&&(zh=clearInterval(zh))):(zh||(Yh=$h,zh=setInterval(_e,Hh)),Ih=1,Vh(me))}}function Fe(t,e){var n=t.__transition;if(!n||!(n=n[e])||n.state>Kh)throw new Error("too late");return n}function Me(t,e){var n=t.__transition;if(!n||!(n=n[e])||n.state>ep)throw new Error("too late");return n}function Ae(t,e){var n=t.__transition;if(!n||!(n=n[e]))throw new Error("too late");return n}function Ee(t,e,n){function r(t){n.state=tp,n.timer.restart(o,n.delay,n.time),n.delay<=t&&o(t-n.delay)}function o(r){var c,s,l,h;if(n.state!==tp)return a();for(c in f)if(h=f[c],h.name===n.name){if(h.state===np)return Gh(o);h.state===rp?(h.state=ip,h.timer.stop(),h.on.call("interrupt",t,t.__data__,h.index,h.group),delete f[c]):+c<e&&(h.state=ip,h.timer.stop(),delete f[c])}if(Gh(function(){n.state===np&&(n.state=rp,n.timer.restart(i,n.delay,n.time),i(r))}),n.state=ep,n.on.call("start",t,t.__data__,n.index,n.group),n.state===ep){for(n.state=np,u=new Array(l=n.tween.length),c=0,s=-1;c<l;++c)(h=n.tween[c].value.call(t,t.__data__,n.index,n.group))&&(u[++s]=h);u.length=s+1}}function i(e){for(var r=e<n.duration?n.ease.call(null,e/n.duration):(n.timer.restart(a),n.state=op,1),o=-1,i=u.length;++o<i;)u[o].call(null,r);n.state===op&&(n.on.call("end",t,t.__data__,n.index,n.group),a())}function a(){n.state=ip,n.timer.stop(),delete f[e];for(var r in f)return;delete t.__transition}var u,f=t.__transition;f[e]=n,n.timer=be(r,0,n.time)}function Te(t,e){var n,r;return function(){var o=Me(this,t),i=o.tween;if(i!==n){r=n=i;for(var a=0,u=r.length;a<u;++a)if(r[a].name===e){r=r.slice(),r.splice(a,1);break}}o.tween=r}}function Ce(t,e,n){var r,o;if("function"!=typeof n)throw new Error;return function(){var i=Me(this,t),a=i.tween;if(a!==r){o=(r=a).slice();for(var u={name:e,value:n},f=0,c=o.length;f<c;++f)if(o[f].name===e){o[f]=u;break}f===c&&o.push(u)}i.tween=o}}function ke(t,e,n){var r=t._id;return t.each(function(){var t=Me(this,r);(t.value||(t.value={}))[e]=n.apply(this,arguments)}),function(t){return Ae(t,r).value[e]}}function Se(t){return function(){this.removeAttribute(t)}}function Ne(t){return function(){this.removeAttributeNS(t.space,t.local)}}function De(t,e,n){var r,o;return function(){var i=this.getAttribute(t);return i===n?null:i===r?o:o=e(r=i,n)}}function Re(t,e,n){var r,o;return function(){var i=this.getAttributeNS(t.space,t.local);return i===n?null:i===r?o:o=e(r=i,n)}}function Pe(t,e,n){var r,o,i;return function(){var a,u=n(this);return null==u?void this.removeAttribute(t):(a=this.getAttribute(t),a===u?null:a===r&&u===o?i:i=e(r=a,o=u))}}function qe(t,e,n){var r,o,i;return function(){var a,u=n(this);return null==u?void this.removeAttributeNS(t.space,t.local):(a=this.getAttributeNS(t.space,t.local),a===u?null:a===r&&u===o?i:i=e(r=a,o=u))}}function Le(t,e){function n(){var n=this,r=e.apply(n,arguments);return r&&function(e){n.setAttributeNS(t.space,t.local,r(e))}}return n._value=e,n}function Be(t,e){function n(){var n=this,r=e.apply(n,arguments);return r&&function(e){n.setAttribute(t,r(e))}}return n._value=e,n}function je(t,e){return function(){Fe(this,t).delay=+e.apply(this,arguments)}}function Oe(t,e){return e=+e,function(){Fe(this,t).delay=e}}function Ie(t,e){return function(){Me(this,t).duration=+e.apply(this,arguments)}}function Ue(t,e){return e=+e,function(){Me(this,t).duration=e}}function ze(t,e){if("function"!=typeof e)throw new Error;return function(){Me(this,t).ease=e}}function He(t){return(t+"").trim().split(/^|\s+/).every(function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||"start"===t})}function Ye(t,e,n){var r,o,i=He(e)?Fe:Me;return function(){var a=i(this,t),u=a.on;u!==r&&(o=(r=u).copy()).on(e,n),a.on=o}}function $e(t){return function(){var e=this.parentNode;for(var n in this.__transition)if(+n!==t)return;e&&e.removeChild(this)}}function We(t,e){var n,r,o;return function(){var i=fl(this).getComputedStyle(this,null),a=i.getPropertyValue(t),u=(this.style.removeProperty(t),i.getPropertyValue(t));return a===u?null:a===n&&u===r?o:o=e(n=a,r=u)}}function Xe(t){return function(){this.style.removeProperty(t)}}function Ve(t,e,n){var r,o;return function(){var i=fl(this).getComputedStyle(this,null).getPropertyValue(t);return i===n?null:i===r?o:o=e(r=i,n)}}function Ge(t,e,n){var r,o,i;return function(){var a=fl(this).getComputedStyle(this,null),u=a.getPropertyValue(t),f=n(this);return null==f&&(this.style.removeProperty(t),f=a.getPropertyValue(t)),u===f?null:u===r&&f===o?i:i=e(r=u,o=f)}}function Je(t,e,n){function r(){var r=this,o=e.apply(r,arguments);return o&&function(e){r.style.setProperty(t,o(e),n)}}return r._value=e,r}function Ze(t){return function(){this.textContent=t}}function Qe(t){return function(){var e=t(this);this.textContent=null==e?"":e}}function Ke(t,e,n,r){this._groups=t,this._parents=e,this._name=n,this._id=r}function tn(t){return vt().transition(t)}function en(){return++Cp}function nn(t){return+t}function rn(t){return t*t}function on(t){return t*(2-t)}function an(t){return((t*=2)<=1?t*t:--t*(2-t)+1)/2}function un(t){return t*t*t}function fn(t){return--t*t*t+1}function cn(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}function sn(t){return 1-Math.cos(t*Pp)}function ln(t){return Math.sin(t*Pp)}function hn(t){return(1-Math.cos(Rp*t))/2}function pn(t){return Math.pow(2,10*t-10)}function dn(t){return 1-Math.pow(2,-10*t)}function gn(t){return((t*=2)<=1?Math.pow(2,10*t-10):2-Math.pow(2,10-10*t))/2}function vn(t){return 1-Math.sqrt(1-t*t)}function bn(t){return Math.sqrt(1- --t*t)}function yn(t){return((t*=2)<=1?1-Math.sqrt(1-t*t):Math.sqrt(1-(t-=2)*t)+1)/2}function mn(t){return 1-_n(1-t)}function _n(t){return(t=+t)<qp?Yp*t*t:t<Bp?Yp*(t-=Lp)*t+jp:t<Ip?Yp*(t-=Op)*t+Up:Yp*(t-=zp)*t+Hp}function xn(t){return((t*=2)<=1?1-_n(1-t):_n(t-1)+1)/2}function wn(t,e){for(var n;!(n=t.__transition)||!(n=n[e]);)if(!(t=t.parentNode))return Qp.time=de(),Qp;return n}function Fn(){t.event.stopImmediatePropagation()}function Mn(t){return{type:t}}function An(){return!t.event.button}function En(){var t=this.ownerSVGElement||this;return[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function Tn(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function Cn(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function kn(t){var e=t.__brush;return e?e.dim.output(e.selection):null}function Sn(){return Dn(cd)}function Nn(){return Dn(sd)}function Dn(e){function n(t){var n=t.property("__brush",u).selectAll(".overlay").data([Mn("overlay")]);n.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",hd.overlay).merge(n).each(function(){var t=Tn(this).extent;wl(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])}),t.selectAll(".selection").data([Mn("selection")]).enter().append("rect").attr("class","selection").attr("cursor",hd.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var o=t.selectAll(".handle").data(e.handles,function(t){return t.type});o.exit().remove(),o.enter().append("rect").attr("class",function(t){return"handle handle--"+t.type}).attr("cursor",function(t){return hd[t.type]}),t.each(r).attr("fill","none").attr("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush touchstart.brush",a)}function r(){var t=wl(this),e=Tn(this).selection;e?(t.selectAll(".selection").style("display",null).attr("x",e[0][0]).attr("y",e[0][1]).attr("width",e[1][0]-e[0][0]).attr("height",e[1][1]-e[0][1]),t.selectAll(".handle").style("display",null).attr("x",function(t){return"e"===t.type[t.type.length-1]?e[1][0]-h/2:e[0][0]-h/2}).attr("y",function(t){return"s"===t.type[0]?e[1][1]-h/2:e[0][1]-h/2}).attr("width",function(t){return"n"===t.type||"s"===t.type?e[1][0]-e[0][0]+h:h}).attr("height",function(t){return"e"===t.type||"w"===t.type?e[1][1]-e[0][1]+h:h})):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function o(t,e){return t.__brush.emitter||new i(t,e)}function i(t,e){this.that=t,this.args=e,this.state=t.__brush,this.active=0}function a(){function n(){var t=Is(M);!L||w||F||(Math.abs(t[0]-j[0])>Math.abs(t[1]-j[1])?F=!0:w=!0),j=t,x=!0,od(),i()}function i(){var t;switch(m=j[0]-B[0],_=j[1]-B[1],E){case ad:case id:T&&(m=Math.max(D-l,Math.min(P-g,m)),h=l+m,v=g+m),C&&(_=Math.max(R-p,Math.min(q-b,_)),d=p+_,y=b+_);break;case ud:T<0?(m=Math.max(D-l,Math.min(P-l,m)),h=l+m,v=g):T>0&&(m=Math.max(D-g,Math.min(P-g,m)),h=l,v=g+m),C<0?(_=Math.max(R-p,Math.min(q-p,_)),d=p+_,y=b):C>0&&(_=Math.max(R-b,Math.min(q-b,_)),d=p,y=b+_);break;case fd:T&&(h=Math.max(D,Math.min(P,l-m*T)),v=Math.max(D,Math.min(P,g+m*T))),C&&(d=Math.max(R,Math.min(q,p-_*C)),y=Math.max(R,Math.min(q,b+_*C)))}v<h&&(T*=-1,t=l,l=g,g=t,t=h,h=v,v=t,A in pd&&U.attr("cursor",hd[A=pd[A]])),y<d&&(C*=-1,t=p,p=b,b=t,t=d,d=y,y=t,A in dd&&U.attr("cursor",hd[A=dd[A]])),k.selection&&(N=k.selection),w&&(h=N[0][0],v=N[1][0]),F&&(d=N[0][1],y=N[1][1]),N[0][0]===h&&N[0][1]===d&&N[1][0]===v&&N[1][1]===y||(k.selection=[[h,d],[v,y]],r.call(M),O.brush())}function a(){if(Fn(),t.event.touches){if(t.event.touches.length)return;f&&clearTimeout(f),f=setTimeout(function(){f=null},500),I.on("touchmove.brush touchend.brush touchcancel.brush",null)}else yt(t.event.view,x),z.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);I.attr("pointer-events","all"),U.attr("cursor",hd.overlay),k.selection&&(N=k.selection),Cn(N)&&(k.selection=null,r.call(M)),O.end()}function u(){switch(t.event.keyCode){case 16:L=T&&C;break;case 18:E===ud&&(T&&(g=v-m*T,l=h+m*T),C&&(b=y-_*C,p=d+_*C),E=fd,i());break;case 32:E!==ud&&E!==fd||(T<0?g=v-m:T>0&&(l=h-m),C<0?b=y-_:C>0&&(p=d-_),E=ad,U.attr("cursor",hd.selection),i());break;default:return}od()}function c(){switch(t.event.keyCode){case 16:L&&(w=F=L=!1,i());break;case 18:E===fd&&(T<0?g=v:T>0&&(l=h),C<0?b=y:C>0&&(p=d),E=ud,i());break;case 32:E===ad&&(t.event.altKey?(T&&(g=v-m*T,l=h+m*T),C&&(b=y-_*C,p=d+_*C),E=fd):(T<0?g=v:T>0&&(l=h),C<0?b=y:C>0&&(p=d),E=ud),U.attr("cursor",hd[A]),i());break;default:return}od()}if(t.event.touches){if(t.event.changedTouches.length<t.event.touches.length)return od()}else if(f)return;if(s.apply(this,arguments)){var l,h,p,d,g,v,b,y,m,_,x,w,F,M=this,A=t.event.target.__data__.type,E="selection"===(t.event.metaKey?A="overlay":A)?id:t.event.altKey?fd:ud,T=e===sd?null:gd[A],C=e===cd?null:vd[A],k=Tn(M),S=k.extent,N=k.selection,D=S[0][0],R=S[0][1],P=S[1][0],q=S[1][1],L=T&&C&&t.event.shiftKey,B=Is(M),j=B,O=o(M,arguments).beforestart();"overlay"===A?k.selection=N=[[l=e===sd?D:B[0],p=e===cd?R:B[1]],[g=e===sd?P:l,b=e===cd?q:p]]:(l=N[0][0],p=N[0][1],g=N[1][0],b=N[1][1]),h=l,d=p,v=g,y=b;var I=wl(M).attr("pointer-events","none"),U=I.selectAll(".overlay").attr("cursor",hd[A]);if(t.event.touches)I.on("touchmove.brush",n,!0).on("touchend.brush touchcancel.brush",a,!0);else{var z=wl(t.event.view).on("keydown.brush",u,!0).on("keyup.brush",c,!0).on("mousemove.brush",n,!0).on("mouseup.brush",a,!0);Tl(t.event.view)}Fn(),up(M),r.call(M),O.start()}}function u(){var t=this.__brush||{selection:null};return t.extent=c.apply(this,arguments),t.dim=e,t}var f,c=En,s=An,l=g(n,"start","brush","end"),h=6;return n.move=function(t,n){t.selection?t.on("start.brush",function(){o(this,arguments).beforestart().start()}).on("interrupt.brush end.brush",function(){o(this,arguments).end()}).tween("brush",function(){function t(t){a.selection=1===t&&Cn(c)?null:s(t),r.call(i),u.brush()}var i=this,a=i.__brush,u=o(i,arguments),f=a.selection,c=e.input("function"==typeof n?n.apply(this,arguments):n,a.extent),s=Mh(f,c);return f&&c?t:t(1)}):t.each(function(){var t=this,i=arguments,a=t.__brush,u=e.input("function"==typeof n?n.apply(t,i):n,a.extent),f=o(t,i).beforestart();up(t),a.selection=null==u||Cn(u)?null:u,r.call(t),f.start().brush().end()})},i.prototype={beforestart:function(){return 1==++this.active&&(this.state.emitter=this,this.starting=!0),this},start:function(){return this.starting&&(this.starting=!1,this.emit("start")),this},brush:function(){return this.emit("brush"),this},end:function(){return 0==--this.active&&(delete this.state.emitter,this.emit("end")),this},emit:function(t){k(new rd(n,t,e.output(this.state.selection)),l.apply,l,[t,this.that,this.args])}},n.extent=function(t){return arguments.length?(c="function"==typeof t?t:nd([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),n):c},n.filter=function(t){return arguments.length?(s="function"==typeof t?t:nd(!!t),n):s},n.handleSize=function(t){return arguments.length?(h=+t,n):h},n.on=function(){var t=l.on.apply(l,arguments);return t===l?n:t},n}function Rn(t){return function(e,n){return t(e.source.value+e.target.value,n.source.value+n.target.value)}}function Pn(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function qn(){return new Pn}function Ln(t){return t.source}function Bn(t){return t.target}function jn(t){return t.radius}function On(t){return t.startAngle}function In(t){return t.endAngle}function Un(){}function zn(t,e){var n=new Un;if(t instanceof Un)t.each(function(t,e){n.set(e,t)});else if(Array.isArray(t)){var r,o=-1,i=t.length;if(null==e)for(;++o<i;)n.set(o,t[o]);else for(;++o<i;)n.set(e(r=t[o],o,t),r)}else if(t)for(var a in t)n.set(a,t[a]);return n}function Hn(){return{}}function Yn(t,e,n){t[e]=n}function $n(){return zn()}function Wn(t,e,n){t.set(e,n)}function Xn(){}function Vn(t,e){var n=new Xn;if(t instanceof Xn)t.each(function(t){n.add(t)});else if(t){var r=-1,o=t.length;if(null==e)for(;++r<o;)n.add(t[r]);else for(;++r<o;)n.add(e(t[r],r,t))}return n}function Gn(t){return new Function("d","return {"+t.map(function(t,e){return JSON.stringify(t)+": d["+e+"]"}).join(",")+"}")}function Jn(t,e){var n=Gn(t);return function(r,o){return e(n(r),o,t)}}function Zn(t){var e=Object.create(null),n=[];return t.forEach(function(t){for(var r in t)r in e||n.push(e[r]=r)}),n}function Qn(t,e,n,r){if(isNaN(e)||isNaN(n))return t;var o,i,a,u,f,c,s,l,h,p=t._root,d={data:r},g=t._x0,v=t._y0,b=t._x1,y=t._y1;if(!p)return t._root=d,t;for(;p.length;)if((c=e>=(i=(g+b)/2))?g=i:b=i,(s=n>=(a=(v+y)/2))?v=a:y=a,o=p,!(p=p[l=s<<1|c]))return o[l]=d,t;if(u=+t._x.call(null,p.data),f=+t._y.call(null,p.data),e===u&&n===f)return d.next=p,o?o[l]=d:t._root=d,t;do{o=o?o[l]=new Array(4):t._root=new Array(4),(c=e>=(i=(g+b)/2))?g=i:b=i,(s=n>=(a=(v+y)/2))?v=a:y=a}while((l=s<<1|c)==(h=(f>=a)<<1|u>=i));return o[h]=p,o[l]=d,t}function Kn(t){var e,n,r,o,i=t.length,a=new Array(i),u=new Array(i),f=1/0,c=1/0,s=-1/0,l=-1/0;for(n=0;n<i;++n)isNaN(r=+this._x.call(null,e=t[n]))||isNaN(o=+this._y.call(null,e))||(a[n]=r,u[n]=o,r<f&&(f=r),r>s&&(s=r),o<c&&(c=o),o>l&&(l=o));for(s<f&&(f=this._x0,s=this._x1),l<c&&(c=this._y0,l=this._y1),this.cover(f,c).cover(s,l),n=0;n<i;++n)Qn(this,a[n],u[n],t[n]);return this}function tr(t){for(var e=0,n=t.length;e<n;++e)this.remove(t[e]);return this}function er(t){return t[0]}function nr(t){return t[1]}function rr(t,e,n){var r=new or(null==e?er:e,null==n?nr:n,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function or(t,e,n,r,o,i){this._x=t,this._y=e,this._x0=n,this._y0=r,this._x1=o,this._y1=i,this._root=void 0}function ir(t){for(var e={data:t.data},n=e;t=t.next;)n=n.next={data:t.data};return e}function ar(t){return t.x+t.vx}function ur(t){return t.y+t.vy}function fr(t){return t.index}function cr(t,e){var n=t.get(e);if(!n)throw new Error("missing: "+e);return n}function sr(t){return t.x}function lr(t){return t.y}function hr(t){return new pr(t)}function pr(t){if(!(e=Tg.exec(t)))throw new Error("invalid format: "+t);var e,n=e[1]||" ",r=e[2]||">",o=e[3]||"-",i=e[4]||"",a=!!e[5],u=e[6]&&+e[6],f=!!e[7],c=e[8]&&+e[8].slice(1),s=e[9]||"";"n"===s?(f=!0,s="g"):Eg[s]||(s=""),(a||"0"===n&&"="===r)&&(a=!0,n="0",r="="),this.fill=n,this.align=r,this.sign=o,this.symbol=i,this.zero=a,this.width=u,this.comma=f,this.precision=c,this.type=s}function dr(e){return Cg=Ng(e),t.format=Cg.format,t.formatPrefix=Cg.formatPrefix,Cg}function gr(){this.reset()}function vr(t,e,n){var r=t.s=e+n,o=r-e,i=r-o;t.t=e-i+(n-o)}function br(t){return t>1?0:t<-1?gv:Math.acos(t)}function yr(t){return t>1?vv:t<-1?-vv:Math.asin(t)}function mr(t){return(t=kv(t/2))*t}function _r(){}function xr(t,e){t&&Pv.hasOwnProperty(t.type)&&Pv[t.type](t,e)}function wr(t,e,n){var r,o=-1,i=t.length-n;for(e.lineStart();++o<i;)r=t[o],e.point(r[0],r[1],r[2]);e.lineEnd()}function Fr(t,e){var n=-1,r=t.length;for(e.polygonStart();++n<r;)wr(t[n],e,1);e.polygonEnd()}function Mr(){jv.point=Er}function Ar(){Tr(Lg,Bg)}function Er(t,e){jv.point=Tr,Lg=t,Bg=e,t*=_v,e*=_v,jg=t,Og=Mv(e=e/2+bv),Ig=kv(e)}function Tr(t,e){t*=_v,e*=_v,e=e/2+bv;var n=t-jg,r=n>=0?1:-1,o=r*n,i=Mv(e),a=kv(e),u=Ig*a,f=Og*i+u*Mv(o),c=u*r*kv(o);Lv.add(Fv(c,f)),jg=t,Og=i,Ig=a}function Cr(t){return[Fv(t[1],t[0]),yr(t[2])]}function kr(t){var e=t[0],n=t[1],r=Mv(n);return[r*Mv(e),r*kv(e),kv(n)]}function Sr(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function Nr(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}function Dr(t,e){t[0]+=e[0],t[1]+=e[1],t[2]+=e[2]}function Rr(t,e){return[t[0]*e,t[1]*e,t[2]*e]}function Pr(t){var e=Nv(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=e,t[1]/=e,t[2]/=e}function qr(t,e){Gg.push(Jg=[Ug=t,Hg=t]),e<zg&&(zg=e),e>Yg&&(Yg=e)}function Lr(t,e){var n=kr([t*_v,e*_v]);if(Vg){var r=Nr(Vg,n),o=[r[1],-r[0],0],i=Nr(o,r);Pr(i),i=Cr(i);var a,u=t-$g,f=u>0?1:-1,c=i[0]*mv*f,s=xv(u)>180;s^(f*$g<c&&c<f*t)?(a=i[1]*mv)>Yg&&(Yg=a):(c=(c+360)%360-180,s^(f*$g<c&&c<f*t)?(a=-i[1]*mv)<zg&&(zg=a):(e<zg&&(zg=e),e>Yg&&(Yg=e))),s?t<$g?zr(Ug,t)>zr(Ug,Hg)&&(Hg=t):zr(t,Hg)>zr(Ug,Hg)&&(Ug=t):Hg>=Ug?(t<Ug&&(Ug=t),t>Hg&&(Hg=t)):t>$g?zr(Ug,t)>zr(Ug,Hg)&&(Hg=t):zr(t,Hg)>zr(Ug,Hg)&&(Ug=t)}else Gg.push(Jg=[Ug=t,Hg=t]);e<zg&&(zg=e),e>Yg&&(Yg=e),Vg=n,$g=t}function Br(){Uv.point=Lr}function jr(){Jg[0]=Ug,Jg[1]=Hg,Uv.point=qr,Vg=null}function Or(t,e){if(Vg){var n=t-$g;Iv.add(xv(n)>180?n+(n>0?360:-360):n)}else Wg=t,Xg=e;jv.point(t,e),Lr(t,e)}function Ir(){jv.lineStart()}function Ur(){Or(Wg,Xg),jv.lineEnd(),xv(Iv)>dv&&(Ug=-(Hg=180)),Jg[0]=Ug,Jg[1]=Hg,Vg=null}function zr(t,e){return(e-=t)<0?e+360:e}function Hr(t,e){return t[0]-e[0]}function Yr(t,e){return t[0]<=t[1]?t[0]<=e&&e<=t[1]:e<t[0]||t[1]<e}function $r(t,e){t*=_v,e*=_v;var n=Mv(e);Wr(n*Mv(t),n*kv(t),kv(e))}function Wr(t,e,n){++Zg,Kg+=(t-Kg)/Zg,tv+=(e-tv)/Zg,ev+=(n-ev)/Zg}function Xr(){Hv.point=Vr}function Vr(t,e){t*=_v,e*=_v;var n=Mv(e);sv=n*Mv(t),lv=n*kv(t),hv=kv(e),Hv.point=Gr,Wr(sv,lv,hv)}function Gr(t,e){t*=_v,e*=_v;var n=Mv(e),r=n*Mv(t),o=n*kv(t),i=kv(e),a=Fv(Nv((a=lv*i-hv*o)*a+(a=hv*r-sv*i)*a+(a=sv*o-lv*r)*a),sv*r+lv*o+hv*i);Qg+=a,nv+=a*(sv+(sv=r)),rv+=a*(lv+(lv=o)),ov+=a*(hv+(hv=i)),Wr(sv,lv,hv)}function Jr(){Hv.point=$r}function Zr(){Hv.point=Kr}function Qr(){to(fv,cv),Hv.point=$r}function Kr(t,e){fv=t,cv=e,t*=_v,e*=_v,Hv.point=to;var n=Mv(e);sv=n*Mv(t),lv=n*kv(t),hv=kv(e),Wr(sv,lv,hv)}function to(t,e){t*=_v,e*=_v;var n=Mv(e),r=n*Mv(t),o=n*kv(t),i=kv(e),a=lv*i-hv*o,u=hv*r-sv*i,f=sv*o-lv*r,c=Nv(a*a+u*u+f*f),s=yr(c),l=c&&-s/c;iv+=l*a,av+=l*u,uv+=l*f,Qg+=s,nv+=s*(sv+(sv=r)),rv+=s*(lv+(lv=o)),ov+=s*(hv+(hv=i)),Wr(sv,lv,hv)}function eo(t,e){return[t>gv?t-yv:t<-gv?t+yv:t,e]}function no(t,e,n){return(t%=yv)?e||n?Wv(oo(t),io(e,n)):oo(t):e||n?io(e,n):eo}function ro(t){return function(e,n){return e+=t,[e>gv?e-yv:e<-gv?e+yv:e,n]}}function oo(t){var e=ro(t);return e.invert=ro(-t),e}function io(t,e){function n(t,e){var n=Mv(e),u=Mv(t)*n,f=kv(t)*n,c=kv(e),s=c*r+u*o;return[Fv(f*i-s*a,u*r-c*o),yr(s*i+f*a)]}var r=Mv(t),o=kv(t),i=Mv(e),a=kv(e);return n.invert=function(t,e){var n=Mv(e),u=Mv(t)*n,f=kv(t)*n,c=kv(e),s=c*i-f*a;return[Fv(f*i+c*a,u*r+s*o),yr(s*r-u*o)]},n}function ao(t,e,n,r,o,i){if(n){var a=Mv(e),u=kv(e),f=r*n;null==o?(o=e+r*yv,i=e-f/2):(o=uo(a,o),i=uo(a,i),(r>0?o<i:o>i)&&(o+=r*yv));for(var c,s=o;r>0?s>i:s<i;s-=f)c=Cr([a,-u*Mv(s),-u*kv(s)]),t.point(c[0],c[1])}}function uo(t,e){e=kr(e),e[0]-=t,Pr(e);var n=br(-e[1]);return((-e[2]<0?-n:n)+yv-dv)%yv}function fo(t,e,n,r){this.x=t,this.z=e,this.o=n,this.e=r,this.v=!1,this.n=this.p=null}function co(t){if(e=t.length){for(var e,n,r=0,o=t[0];++r<e;)o.n=n=t[r],n.p=o,o=n;o.n=n=t[0],n.p=o}}function so(t,e,n,r){function o(o,i){return t<=o&&o<=n&&e<=i&&i<=r}function i(o,i,u,c){var s=0,l=0;if(null==o||(s=a(o,u))!==(l=a(i,u))||f(o,i)<0^u>0)do{c.point(0===s||3===s?t:n,s>1?r:e)}while((s=(s+u+4)%4)!==l);else c.point(i[0],i[1])}function a(r,o){return xv(r[0]-t)<dv?o>0?0:3:xv(r[0]-n)<dv?o>0?2:1:xv(r[1]-e)<dv?o>0?1:0:o>0?3:2}function u(t,e){return f(t.x,e.x)}function f(t,e){var n=a(t,1),r=a(e,1);return n!==r?n-r:0===n?e[1]-t[1]:1===n?t[0]-e[0]:2===n?t[1]-e[1]:e[0]-t[0]}return function(a){function f(t,e){o(t,e)&&E.point(t,e)}function c(){for(var e=0,n=0,o=v.length;n<o;++n)for(var i,a,u=v[n],f=1,c=u.length,s=u[0],l=s[0],h=s[1];f<c;++f)i=l,a=h,s=u[f],l=s[0],h=s[1],a<=r?h>r&&(l-i)*(r-a)>(h-a)*(t-i)&&++e:h<=r&&(l-i)*(r-a)<(h-a)*(t-i)&&--e;return e}function s(){E=T,g=[],v=[],A=!0}function l(){var t=c(),e=A&&t,n=(g=ls(g)).length;(e||n)&&(a.polygonStart(),e&&(a.lineStart(),i(null,null,1,a),a.lineEnd()),n&&cb(g,u,t,i,a),a.polygonEnd()),E=a,g=v=b=null}function h(){C.point=d,v&&v.push(b=[]),M=!0,F=!1,x=w=NaN}function p(){g&&(d(y,m),_&&F&&T.rejoin(),g.push(T.result())),C.point=f,F&&E.lineEnd()}function d(i,a){var u=o(i,a);if(v&&b.push([i,a]),M)y=i,m=a,_=u,M=!1,u&&(E.lineStart(),E.point(i,a));else if(u&&F)E.point(i,a);else{var f=[x=Math.max(lb,Math.min(sb,x)),w=Math.max(lb,Math.min(sb,w))],c=[i=Math.max(lb,Math.min(sb,i)),a=Math.max(lb,Math.min(sb,a))];ub(f,c,t,e,n,r)?(F||(E.lineStart(),E.point(f[0],f[1])),E.point(c[0],c[1]),u||E.lineEnd(),A=!1):u&&(E.lineStart(),E.point(i,a),A=!1)}x=i,w=a,F=u}var g,v,b,y,m,_,x,w,F,M,A,E=a,T=ab(),C={point:f,lineStart:h,lineEnd:p,polygonStart:s,polygonEnd:l};return C}}function lo(){vb.point=po,vb.lineEnd=ho}function ho(){vb.point=vb.lineEnd=_r}function po(t,e){t*=_v,e*=_v,Xv=t,Vv=kv(e),Gv=Mv(e),vb.point=go}function go(t,e){t*=_v,e*=_v;var n=kv(e),r=Mv(e),o=xv(t-Xv),i=Mv(o),a=kv(o),u=r*a,f=Gv*n-Vv*r*i,c=Vv*n+Gv*r*i;gb.add(Fv(Nv(u*u+f*f),c)),Xv=t,Vv=n,Gv=r}function vo(t,e){return!(!t||!wb.hasOwnProperty(t.type))&&wb[t.type](t,e)}function bo(t,e){return 0===_b(t,e)}function yo(t,e){var n=_b(t[0],t[1]);return _b(t[0],e)+_b(e,t[1])<=n+dv}function mo(t,e){return!!db(t.map(_o),xo(e))}function _o(t){return t=t.map(xo),t.pop(),t}function xo(t){return[t[0]*_v,t[1]*_v]}function wo(t,e,n){var r=Qc(t,e-dv,n).concat(e);return function(t){return r.map(function(e){return[t,e]})}}function Fo(t,e,n){var r=Qc(t,e-dv,n).concat(e);return function(t){return r.map(function(e){return[e,t]})}}function Mo(){function t(){return{type:"MultiLineString",coordinates:e()}}function e(){return Qc(Av(i/v)*v,o,v).map(h).concat(Qc(Av(c/b)*b,f,b).map(p)).concat(Qc(Av(r/d)*d,n,d).filter(function(t){return xv(t%v)>dv}).map(s)).concat(Qc(Av(u/g)*g,a,g).filter(function(t){return xv(t%b)>dv}).map(l))}var n,r,o,i,a,u,f,c,s,l,h,p,d=10,g=d,v=90,b=360,y=2.5;return t.lines=function(){return e().map(function(t){return{type:"LineString",coordinates:t}})},t.outline=function(){return{type:"Polygon",coordinates:[h(i).concat(p(f).slice(1),h(o).reverse().slice(1),p(c).reverse().slice(1))]}},t.extent=function(e){return arguments.length?t.extentMajor(e).extentMinor(e):t.extentMinor()},t.extentMajor=function(e){return arguments.length?(i=+e[0][0],o=+e[1][0],c=+e[0][1],f=+e[1][1],i>o&&(e=i,i=o,o=e),c>f&&(e=c,c=f,f=e),t.precision(y)):[[i,c],[o,f]]},t.extentMinor=function(e){return arguments.length?(r=+e[0][0],n=+e[1][0],u=+e[0][1],a=+e[1][1],r>n&&(e=r,r=n,n=e),u>a&&(e=u,u=a,a=e),t.precision(y)):[[r,u],[n,a]]},t.step=function(e){return arguments.length?t.stepMajor(e).stepMinor(e):t.stepMinor()},t.stepMajor=function(e){return arguments.length?(v=+e[0],b=+e[1],t):[v,b]},t.stepMinor=function(e){return arguments.length?(d=+e[0],g=+e[1],t):[d,g]},t.precision=function(e){return arguments.length?(y=+e,s=wo(u,a,90),l=Fo(r,n,y),h=wo(c,f,90),p=Fo(i,o,y),t):y},t.extentMajor([[-180,-90+dv],[180,90-dv]]).extentMinor([[-180,-80-dv],[180,80+dv]])}function Ao(){return Mo()()}function Eo(){Cb.point=To}function To(t,e){Cb.point=Co,Jv=Qv=t,Zv=Kv=e}function Co(t,e){Tb.add(Kv*t-Qv*e),Qv=t,Kv=e}function ko(){Co(Jv,Zv)}function So(t,e){t<kb&&(kb=t),t>Nb&&(Nb=t),e<Sb&&(Sb=e),e>Db&&(Db=e)}function No(t,e){Pb+=t,qb+=e,++Lb}function Do(){Hb.point=Ro}function Ro(t,e){Hb.point=Po,No(nb=t,rb=e)}function Po(t,e){var n=t-nb,r=e-rb,o=Nv(n*n+r*r);Bb+=o*(nb+t)/2,jb+=o*(rb+e)/2,Ob+=o,No(nb=t,rb=e)}function qo(){Hb.point=No}function Lo(){Hb.point=jo}function Bo(){Oo(tb,eb)}function jo(t,e){Hb.point=Oo,No(tb=nb=t,eb=rb=e)}function Oo(t,e){var n=t-nb,r=e-rb,o=Nv(n*n+r*r);Bb+=o*(nb+t)/2,jb+=o*(rb+e)/2,Ob+=o,o=rb*t-nb*e,Ib+=o*(nb+t),Ub+=o*(rb+e),zb+=3*o,No(nb=t,rb=e)}function Io(t){this._context=t}function Uo(t,e){Jb.point=zo,$b=Xb=t,Wb=Vb=e}function zo(t,e){Xb-=t,Vb-=e,Gb.add(Nv(Xb*Xb+Vb*Vb)),Xb=t,Vb=e}function Ho(){this._string=[]}function Yo(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}function $o(t){return t.length>1}function Wo(t,e){return((t=t.x)[0]<0?t[1]-vv-dv:vv-t[1])-((e=e.x)[0]<0?e[1]-vv-dv:vv-e[1])}function Xo(t){var e,n=NaN,r=NaN,o=NaN;return{lineStart:function(){t.lineStart(),e=1},point:function(i,a){var u=i>0?gv:-gv,f=xv(i-n);xv(f-gv)<dv?(t.point(n,r=(r+a)/2>0?vv:-vv),t.point(o,r),t.lineEnd(),t.lineStart(),t.point(u,r),t.point(i,r),e=0):o!==u&&f>=gv&&(xv(n-o)<dv&&(n-=o*dv),xv(i-u)<dv&&(i-=u*dv),r=Vo(n,r,i,a),t.point(o,r),t.lineEnd(),t.lineStart(),t.point(u,r),e=0),t.point(n=i,r=a),o=u},lineEnd:function(){t.lineEnd(),n=r=NaN},clean:function(){return 2-e}}}function Vo(t,e,n,r){var o,i,a=kv(t-n);return xv(a)>dv?wv((kv(e)*(i=Mv(r))*kv(n)-kv(r)*(o=Mv(e))*kv(t))/(o*i*a)):(e+r)/2}function Go(t,e,n,r){var o;if(null==t)o=n*vv,r.point(-gv,o),r.point(0,o),r.point(gv,o),r.point(gv,0),r.point(gv,-o),r.point(0,-o),r.point(-gv,-o),r.point(-gv,0),r.point(-gv,o);else if(xv(t[0]-e[0])>dv){var i=t[0]<e[0]?gv:-gv;o=n*i/2,r.point(-i,o),r.point(0,o),r.point(i,o)}else r.point(e[0],e[1])}function Jo(t){return function(e){var n=new Zo;for(var r in t)n[r]=t[r];return n.stream=e,n}}function Zo(){}function Qo(t,e,n){var r=e[1][0]-e[0][0],o=e[1][1]-e[0][1],i=t.clipExtent&&t.clipExtent();t.scale(150).translate([0,0]),null!=i&&t.clipExtent(null),qv(n,t.stream(Rb));var a=Rb.result(),u=Math.min(r/(a[1][0]-a[0][0]),o/(a[1][1]-a[0][1])),f=+e[0][0]+(r-u*(a[1][0]+a[0][0]))/2,c=+e[0][1]+(o-u*(a[1][1]+a[0][1]))/2;return null!=i&&t.clipExtent(i),t.scale(150*u).translate([f,c])}function Ko(t,e,n){return Qo(t,[[0,0],e],n)}function ti(t){return Jo({point:function(e,n){e=t(e,n),this.stream.point(e[0],e[1])}})}function ei(t,e){function n(r,o,i,a,u,f,c,s,l,h,p,d,g,v){var b=c-r,y=s-o,m=b*b+y*y;if(m>4*e&&g--){var _=a+h,x=u+p,w=f+d,F=Nv(_*_+x*x+w*w),M=yr(w/=F),A=xv(xv(w)-1)<dv||xv(i-l)<dv?(i+l)/2:Fv(x,_),E=t(A,M),T=E[0],C=E[1],k=T-r,S=C-o,N=y*k-b*S;(N*N/m>e||xv((b*k+y*S)/m-.5)>.3||a*h+u*p+f*d<ry)&&(n(r,o,i,a,u,f,T,C,A,_/=F,x/=F,w,g,v),v.point(T,C),n(T,C,A,_,x,w,c,s,l,h,p,d,g,v))}}return function(e){function r(n,r){n=t(n,r),e.point(n[0],n[1])}function o(){b=NaN,w.point=i,e.lineStart()}function i(r,o){var i=kr([r,o]),a=t(r,o);n(b,y,v,m,_,x,b=a[0],y=a[1],v=r,m=i[0],_=i[1],x=i[2],ny,e),e.point(b,y)}function a(){w.point=r,e.lineEnd()}function u(){o(),w.point=f,w.lineEnd=c}function f(t,e){i(s=t,e),l=b,h=y,p=m,d=_,g=x,w.point=i}function c(){n(b,y,v,m,_,x,l,h,s,p,d,g,ny,e),w.lineEnd=a,a()}var s,l,h,p,d,g,v,b,y,m,_,x,w={point:r,lineStart:o,lineEnd:a,polygonStart:function(){e.polygonStart(),w.lineStart=u},polygonEnd:function(){e.polygonEnd(),w.lineStart=o}};return w}}function ni(t){return ri(function(){return t})()}function ri(t){function e(t){return t=s(t[0]*_v,t[1]*_v),[t[0]*v+u,f-t[1]*v]}function n(t){return(t=s.invert((t[0]-u)/v,(f-t[1])/v))&&[t[0]*mv,t[1]*mv]}function r(t,e){return t=a(t,e),[t[0]*v+u,f-t[1]*v]}function o(){s=Wv(c=no(x,w,F),a);var t=a(m,_);return u=b-t[0]*v,f=y+t[1]*v,i()}function i(){return d=g=null,e}var a,u,f,c,s,l,h,p,d,g,v=150,b=480,y=250,m=0,_=0,x=0,w=0,F=0,M=null,A=Kb,E=null,T=Ab,C=.5,k=oy(r,C);return e.stream=function(t){return d&&g===t?d:d=iy(A(c,k(T(g=t))))},e.clipAngle=function(t){return arguments.length?(A=+t?ty(M=t*_v,6*_v):(M=null,Kb),i()):M*mv},e.clipExtent=function(t){return arguments.length?(T=null==t?(E=l=h=p=null,Ab):so(E=+t[0][0],l=+t[0][1],h=+t[1][0],p=+t[1][1]),i()):null==E?null:[[E,l],[h,p]]},e.scale=function(t){return arguments.length?(v=+t,o()):v},e.translate=function(t){return arguments.length?(b=+t[0],y=+t[1],o()):[b,y]},e.center=function(t){return arguments.length?(m=t[0]%360*_v,_=t[1]%360*_v,o()):[m*mv,_*mv]},e.rotate=function(t){return arguments.length?(x=t[0]%360*_v,w=t[1]%360*_v,F=t.length>2?t[2]%360*_v:0,o()):[x*mv,w*mv,F*mv]},e.precision=function(t){return arguments.length?(k=oy(r,C=t*t),i()):Nv(C)},e.fitExtent=function(t,n){return Qo(e,t,n)},e.fitSize=function(t,n){return Ko(e,t,n)},function(){return a=t.apply(this,arguments),e.invert=a.invert&&n,o()}}function oi(t){var e=0,n=gv/3,r=ri(t),o=r(e,n);return o.parallels=function(t){return arguments.length?r(e=t[0]*_v,n=t[1]*_v):[e*mv,n*mv]},o}function ii(t){function e(t,e){return[t*n,kv(e)/n]}var n=Mv(t);return e.invert=function(t,e){return[t/n,yr(e*n)]},e}function ai(t,e){function n(t,e){var n=Nv(i-2*o*kv(e))/o;return[n*kv(t*=o),a-n*Mv(t)]}var r=kv(t),o=(r+kv(e))/2;if(xv(o)<dv)return ii(t);var i=1+r*(2*o-r),a=Nv(i)/o;return n.invert=function(t,e){var n=a-e;return[Fv(t,xv(n))/o*Sv(n),yr((i-(t*t+n*n)*o*o)/(2*o))]},n}function ui(t){var e=t.length;return{point:function(n,r){for(var o=-1;++o<e;)t[o].point(n,r)},sphere:function(){for(var n=-1;++n<e;)t[n].sphere()},lineStart:function(){for(var n=-1;++n<e;)t[n].lineStart()},lineEnd:function(){for(var n=-1;++n<e;)t[n].lineEnd()},polygonStart:function(){for(var n=-1;++n<e;)t[n].polygonStart()},polygonEnd:function(){for(var n=-1;++n<e;)t[n].polygonEnd()}}}function fi(t){return function(e,n){var r=Mv(e),o=Mv(n),i=t(r*o);return[i*o*kv(e),i*kv(n)]}}function ci(t){return function(e,n){var r=Nv(e*e+n*n),o=t(r),i=kv(o),a=Mv(o);return[Fv(e*i,r*a),yr(r&&n*i/r)]}}function si(t,e){return[t,Tv(Dv((vv+e)/2))]}function li(t){function e(){var e=gv*u(),a=i(ob(i.rotate()).invert([0,0]));return c(null==s?[[a[0]-e,a[1]-e],[a[0]+e,a[1]+e]]:t===si?[[Math.max(a[0]-e,s),n],[Math.min(a[0]+e,r),o]]:[[s,Math.max(a[1]-e,n)],[r,Math.min(a[1]+e,o)]])}var n,r,o,i=ni(t),a=i.center,u=i.scale,f=i.translate,c=i.clipExtent,s=null;return i.scale=function(t){return arguments.length?(u(t),e()):u()},i.translate=function(t){return arguments.length?(f(t),e()):f()},i.center=function(t){return arguments.length?(a(t),e()):a()},i.clipExtent=function(t){return arguments.length?(null==t?s=n=r=o=null:(s=+t[0][0],n=+t[0][1],r=+t[1][0],o=+t[1][1]),e()):null==s?null:[[s,n],[r,o]]},e()}function hi(t){return Dv((vv+t)/2)}function pi(t,e){function n(t,e){i>0?e<-vv+dv&&(e=-vv+dv):e>vv-dv&&(e=vv-dv);var n=i/Cv(hi(e),o);return[n*kv(o*t),i-n*Mv(o*t)]}var r=Mv(t),o=t===e?kv(t):Tv(r/Mv(e))/Tv(hi(e)/hi(t)),i=r*Cv(hi(t),o)/o;return o?(n.invert=function(t,e){var n=i-e,r=Sv(o)*Nv(t*t+n*n);return[Fv(t,xv(n))/o*Sv(n),2*wv(Cv(i/r,1/o))-vv]},n):si}function di(t,e){return[t,e]}function gi(t,e){function n(t,e){var n=i-e,r=o*t;return[n*kv(r),i-n*Mv(r)]}var r=Mv(t),o=t===e?kv(t):(r-Mv(e))/(e-t),i=r/o+t;return xv(o)<dv?di:(n.invert=function(t,e){var n=i-e;return[Fv(t,xv(n))/o*Sv(n),i-Sv(o)*Nv(t*t+n*n)]},n)}function vi(t,e){var n=Mv(e),r=Mv(t)*n;return[n*kv(t)/r,kv(e)/r]}function bi(t,e,n,r){return 1===t&&1===e&&0===n&&0===r?Ab:Jo({point:function(o,i){this.stream.point(o*t+n,i*e+r)}})}function yi(t,e){return[Mv(e)*kv(t),kv(e)]}function mi(t,e){var n=Mv(e),r=1+Mv(t)*n;return[n*kv(t)/r,kv(e)/r]}function _i(t,e){return[Tv(Dv((vv+e)/2)),-t]}function xi(t,e){return t.parent===e.parent?1:2}function wi(t){return t.reduce(Fi,0)/t.length}function Fi(t,e){return t+e.x}function Mi(t){return 1+t.reduce(Ai,0)}function Ai(t,e){return Math.max(t,e.y)}function Ei(t){for(var e;e=t.children;)t=e[0];return t}function Ti(t){for(var e;e=t.children;)t=e[e.length-1];return t}function Ci(t){var e=0,n=t.children,r=n&&n.length;if(r)for(;--r>=0;)e+=n[r].value;else e=1;t.value=e}function ki(t,e){if(t===e)return t;var n=t.ancestors(),r=e.ancestors(),o=null;for(t=n.pop(),e=r.pop();t===e;)o=t,t=n.pop(),e=r.pop();return o}function Si(t,e){var n,r,o,i,a,u=new qi(t),f=+t.value&&(u.value=t.value),c=[u];for(null==e&&(e=Di);n=c.pop();)if(f&&(n.value=+n.data.value),(o=e(n.data))&&(a=o.length))for(n.children=new Array(a),i=a-1;i>=0;--i)c.push(r=n.children[i]=new qi(o[i])),r.parent=n,r.depth=n.depth+1;return u.eachBefore(Pi)}function Ni(){return Si(this).eachBefore(Ri)}function Di(t){return t.children}function Ri(t){t.data=t.data.data}function Pi(t){var e=0;do{t.height=e}while((t=t.parent)&&t.height<++e)}function qi(t){this.data=t,this.depth=this.height=0,this.parent=null}function Li(t){this._=t,this.next=null}function Bi(t,e){var n=e.x-t.x,r=e.y-t.y,o=t.r-e.r;return o*o+1e-6>n*n+r*r}function ji(t,e){var n,r,o,i=null,a=t.head;switch(e.length){case 1:n=Oi(e[0]);break;case 2:n=Ii(e[0],e[1]);break;case 3:n=Ui(e[0],e[1],e[2])}for(;a;)o=a._,r=a.next,n&&Bi(n,o)?i=a:(i?(t.tail=i,i.next=null):t.head=t.tail=null,e.push(o),n=ji(t,e),e.pop(),t.head?(a.next=t.head,t.head=a):(a.next=null,t.head=t.tail=a),i=t.tail,i.next=r),a=r;return t.tail=i,n}function Oi(t){return{x:t.x,y:t.y,r:t.r}}function Ii(t,e){var n=t.x,r=t.y,o=t.r,i=e.x,a=e.y,u=e.r,f=i-n,c=a-r,s=u-o,l=Math.sqrt(f*f+c*c);return{x:(n+i+f/l*s)/2,y:(r+a+c/l*s)/2,r:(l+o+u)/2}}function Ui(t,e,n){var r=t.x,o=t.y,i=t.r,a=e.x,u=e.y,f=e.r,c=n.x,s=n.y,l=n.r,h=2*(r-a),p=2*(o-u),d=2*(f-i),g=r*r+o*o-i*i-a*a-u*u+f*f,v=2*(r-c),b=2*(o-s),y=2*(l-i),m=r*r+o*o-i*i-c*c-s*s+l*l,_=v*p-h*b,x=(p*m-b*g)/_-r,w=(b*d-p*y)/_,F=(v*g-h*m)/_-o,M=(h*y-v*d)/_,A=w*w+M*M-1,E=2*(x*w+F*M+i),T=x*x+F*F-i*i,C=(-E-Math.sqrt(E*E-4*A*T))/(2*A);return{x:x+w*C+r,y:F+M*C+o,r:C}}function zi(t,e,n){var r=t.x,o=t.y,i=e.r+n.r,a=t.r+n.r,u=e.x-r,f=e.y-o,c=u*u+f*f;if(c){var s=.5+((a*=a)-(i*=i))/(2*c),l=Math.sqrt(Math.max(0,2*i*(a+c)-(a-=c)*a-i*i))/(2*c);n.x=r+s*u+l*f,n.y=o+s*f-l*u}else n.x=r+a,n.y=o}function Hi(t,e){var n=e.x-t.x,r=e.y-t.y,o=t.r+e.r;return o*o-1e-6>n*n+r*r}function Yi(t,e,n){var r=t._,o=t.next._,i=r.r+o.r,a=(r.x*o.r+o.x*r.r)/i-e,u=(r.y*o.r+o.y*r.r)/i-n;return a*a+u*u}function $i(t){this._=t,this.next=null,this.previous=null}function Wi(t){if(!(o=t.length))return 0;var e,n,r,o;if(e=t[0],e.x=0,e.y=0,!(o>1))return e.r;if(n=t[1],e.x=-n.r,n.x=e.r,n.y=0,!(o>2))return e.r+n.r;zi(n,e,r=t[2]);var i,a,u,f,c,s,l,h=e.r*e.r,p=n.r*n.r,d=r.r*r.r,g=h+p+d,v=h*e.x+p*n.x+d*r.x,b=h*e.y+p*n.y+d*r.y;e=new $i(e),n=new $i(n),r=new $i(r),e.next=r.previous=n,n.next=e.previous=r,r.next=n.previous=e;t:for(u=3;u<o;++u){zi(e._,n._,r=t[u]),r=new $i(r),f=n.next,c=e.previous,s=n._.r,l=e._.r;do{if(s<=l){if(Hi(f._,r._)){n=f,e.next=n,n.previous=e,--u;continue t}s+=f._.r,f=f.next}else{if(Hi(c._,r._)){e=c,e.next=n,n.previous=e,--u;continue t}l+=c._.r,c=c.previous}}while(f!==c.next);for(r.previous=e,r.next=n,e.next=n.previous=n=r,g+=d=r._.r*r._.r,v+=d*r._.x,b+=d*r._.y,h=Yi(e,i=v/g,a=b/g);(r=r.next)!==n;)(d=Yi(r,i,a))<h&&(e=r,h=d);n=e.next}for(e=[n._],r=n;(r=r.next)!==n;)e.push(r._);for(r=qy(e),u=0;u<o;++u)e=t[u],e.x-=r.x,e.y-=r.y;return r.r}function Xi(t){return null==t?null:Vi(t)}function Vi(t){if("function"!=typeof t)throw new Error;return t}function Gi(){return 0}function Ji(t){return Math.sqrt(t.value)}function Zi(t){return function(e){e.children||(e.r=Math.max(0,+t(e)||0))}}function Qi(t,e){return function(n){if(r=n.children){var r,o,i,a=r.length,u=t(n)*e||0;if(u)for(o=0;o<a;++o)r[o].r+=u;if(i=Wi(r),u)for(o=0;o<a;++o)r[o].r-=u;n.r=i+u}}}function Ki(t){return function(e){var n=e.parent;e.r*=t,n&&(e.x=n.x+t*e.x,e.y=n.y+t*e.y)}}function ta(t){return t.id}function ea(t){return t.parentId}function na(t,e){return t.parent===e.parent?1:2}function ra(t){var e=t.children;return e?e[0]:t.t}function oa(t){var e=t.children;return e?e[e.length-1]:t.t}function ia(t,e,n){var r=n/(e.i-t.i);e.c-=r,e.s+=n,t.c+=r,e.z+=n,e.m+=n}function aa(t){for(var e,n=0,r=0,o=t.children,i=o.length;--i>=0;)e=o[i],e.z+=n,e.m+=n,n+=e.s+(r+=e.c)}function ua(t,e,n){return t.a.parent===e.parent?t.a:n}function fa(t,e){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=e}function ca(t){for(var e,n,r,o,i,a=new fa(t,0),u=[a];e=u.pop();)if(r=e._.children)for(e.children=new Array(i=r.length),o=i-1;o>=0;--o)u.push(n=e.children[o]=new fa(r[o],o)),n.parent=e;return(a.parent=new fa(null,0)).children=[a],a}function sa(t,e,n,r,o,i){for(var a,u,f,c,s,l,h,p,d,g,v,b=[],y=e.children,m=0,_=0,x=y.length,w=e.value;m<x;){f=o-n,c=i-r;do{s=y[_++].value}while(!s&&_<x);for(l=h=s,g=Math.max(c/f,f/c)/(w*t),v=s*s*g,d=Math.max(h/v,v/l);_<x;++_){if(s+=u=y[_].value,u<l&&(l=u),u>h&&(h=u),v=s*s*g,(p=Math.max(h/v,v/l))>d){s-=u;break}d=p}b.push(a={value:s,dice:f<c,children:y.slice(m,_)}),a.dice?Iy(a,n,r,o,w?r+=c*s/w:i):Xy(a,n,r,w?n+=f*s/w:o,i),w-=s,m=_}return b}function la(t,e){return t[0]-e[0]||t[1]-e[1]}function ha(t){for(var e=t.length,n=[0,1],r=2,o=2;o<e;++o){for(;r>1&&nm(t[n[r-2]],t[n[r-1]],t[o])<=0;)--r;n[r++]=o}return n.slice(0,r)}function pa(t){if(!(t>=1))throw new Error;this._size=t,this._call=this._error=null,this._tasks=[],this._data=[],this._waiting=this._active=this._ended=this._start=0}function da(t){if(!t._start)try{ga(t)}catch(e){if(t._tasks[t._ended+t._active-1])ba(t,e);else if(!t._data)throw e}}function ga(t){for(;t._start=t._waiting&&t._active<t._size;){var e=t._ended+t._active,n=t._tasks[e],r=n.length-1,o=n[r];n[r]=va(t,e),--t._waiting,++t._active,n=o.apply(null,n),t._tasks[e]&&(t._tasks[e]=n||um)}}function va(t,e){return function(n,r){t._tasks[e]&&(--t._active,++t._ended,t._tasks[e]=null,null==t._error&&(null!=n?ba(t,n):(t._data[e]=r,t._waiting?da(t):ya(t))))}}function ba(t,e){var n,r=t._tasks.length;for(t._error=e,t._data=void 0,t._waiting=NaN;--r>=0;)if((n=t._tasks[r])&&(t._tasks[r]=null,n.abort))try{n.abort()}catch(e){}t._active=NaN,ya(t)}function ya(t){if(!t._active&&t._call){var e=t._data;t._data=void 0,t._call(t._error,e)}}function ma(t){return new pa(arguments.length?+t:1/0)}function _a(t){return function(e,n){t(null==e?n:null)}}function xa(t){var e=t.responseType;return e&&"text"!==e?t.response:t.responseText}function wa(t,e){return function(n){return t(n.responseText,e)}}function Fa(t){function e(e){var i=e+"",a=n.get(i);if(!a){if(o!==Em)return o;n.set(i,a=r.push(e))}return t[(a-1)%t.length]}var n=zn(),r=[],o=Em;return t=null==t?[]:Am.call(t),e.domain=function(t){if(!arguments.length)return r.slice();r=[],n=zn();for(var o,i,a=-1,u=t.length;++a<u;)n.has(i=(o=t[a])+"")||n.set(i,r.push(o));return e},e.range=function(n){return arguments.length?(t=Am.call(n),e):t.slice()},e.unknown=function(t){return arguments.length?(o=t,e):o},e.copy=function(){return Fa().domain(r).range(t).unknown(o)},e}function Ma(){function t(){var t=o().length,r=a[1]<a[0],l=a[r-0],h=a[1-r];e=(h-l)/Math.max(1,t-f+2*c),u&&(e=Math.floor(e)),l+=(h-l-e*(t-f))*s,n=e*(1-f),u&&(l=Math.round(l),n=Math.round(n));var p=Qc(t).map(function(t){return l+e*t});return i(r?p.reverse():p)}var e,n,r=Fa().unknown(void 0),o=r.domain,i=r.range,a=[0,1],u=!1,f=0,c=0,s=.5;return delete r.unknown,r.domain=function(e){return arguments.length?(o(e),t()):o()},r.range=function(e){return arguments.length?(a=[+e[0],+e[1]],t()):a.slice()},r.rangeRound=function(e){return a=[+e[0],+e[1]],u=!0,t()},r.bandwidth=function(){return n},r.step=function(){return e},r.round=function(e){return arguments.length?(u=!!e,t()):u},r.padding=function(e){return arguments.length?(f=c=Math.max(0,Math.min(1,e)),t()):f},r.paddingInner=function(e){return arguments.length?(f=Math.max(0,Math.min(1,e)),t()):f},r.paddingOuter=function(e){return arguments.length?(c=Math.max(0,Math.min(1,e)),t()):c},r.align=function(e){return arguments.length?(s=Math.max(0,Math.min(1,e)),t()):s},r.copy=function(){return Ma().domain(o()).range(a).round(u).paddingInner(f).paddingOuter(c).align(s)},t()}function Aa(t){var e=t.copy;return t.padding=t.paddingOuter,delete t.paddingInner,delete t.paddingOuter,t.copy=function(){return Aa(e())},t}function Ea(){return Aa(Ma().paddingInner(1))}function Ta(t,e){return(e-=t=+t)?function(n){return(n-t)/e}:Tm(e)}function Ca(t){return function(e,n){var r=t(e=+e,n=+n);return function(t){return t<=e?0:t>=n?1:r(t)}}}function ka(t){return function(e,n){var r=t(e=+e,n=+n);return function(t){return t<=0?e:t>=1?n:r(t)}}}function Sa(t,e,n,r){var o=t[0],i=t[1],a=e[0],u=e[1];return i<o?(o=n(i,o),a=r(u,a)):(o=n(o,i),a=r(a,u)),function(t){return a(o(t))}}function Na(t,e,n,r){var o=Math.min(t.length,e.length)-1,i=new Array(o),a=new Array(o),u=-1;for(t[o]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++u<o;)i[u]=n(t[u],t[u+1]),a[u]=r(e[u],e[u+1]);return function(e){var n=jc(t,e,1,o)-1;return a[n](i[n](e))}}function Da(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())}function Ra(t,e){function n(){return o=Math.min(u.length,f.length)>2?Na:Sa,i=a=null,r}function r(e){return(i||(i=o(u,f,s?Ca(t):t,c)))(+e)}var o,i,a,u=km,f=km,c=Mh,s=!1;return r.invert=function(t){return(a||(a=o(f,u,Ta,s?ka(e):e)))(+t)},r.domain=function(t){return arguments.length?(u=Mm.call(t,Cm),n()):u.slice()},r.range=function(t){return arguments.length?(f=Am.call(t),n()):f.slice()},r.rangeRound=function(t){return f=Am.call(t),c=Ah,n()},r.clamp=function(t){return arguments.length?(s=!!t,n()):s},r.interpolate=function(t){return arguments.length?(c=t,n()):c},n()}function Pa(t){var e=t.domain;return t.ticks=function(t){var n=e();return ns(n[0],n[n.length-1],null==t?10:t)},t.tickFormat=function(t,n){return Sm(e(),t,n)},t.nice=function(n){var r=e(),i=r.length-1,a=null==n?10:n,u=r[0],f=r[i],c=o(u,f,a);return c&&(c=o(Math.floor(u/c)*c,Math.ceil(f/c)*c,a),r[0]=Math.floor(u/c)*c,r[i]=Math.ceil(f/c)*c,e(r)),t},t}function qa(){var t=Ra(Ta,mh);return t.copy=function(){return Da(t,qa())},Pa(t)}function La(){function t(t){return+t}var e=[0,1];return t.invert=t,t.domain=t.range=function(n){return arguments.length?(e=Mm.call(n,Cm),t):e.slice()},t.copy=function(){return La().domain(e)},Pa(t)}function Ba(t,e){return(e=Math.log(e/t))?function(n){return Math.log(n/t)/e}:Tm(e)}function ja(t,e){return t<0?function(n){return-Math.pow(-e,n)*Math.pow(-t,1-n)}:function(n){return Math.pow(e,n)*Math.pow(t,1-n)}}function Oa(t){return isFinite(t)?+("1e"+t):t<0?0:t}function Ia(t){return 10===t?Oa:t===Math.E?Math.exp:function(e){return Math.pow(t,e)}}function Ua(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),function(e){return Math.log(e)/t})}function za(t){return function(e){return-t(-e)}}function Ha(){function e(){return i=Ua(o),a=Ia(o),r()[0]<0&&(i=za(i),a=za(a)),n}var n=Ra(Ba,ja).domain([1,10]),r=n.domain,o=10,i=Ua(10),a=Ia(10);return n.base=function(t){return arguments.length?(o=+t,e()):o},n.domain=function(t){return arguments.length?(r(t),e()):r()},n.ticks=function(t){var e,n=r(),u=n[0],f=n[n.length-1];(e=f<u)&&(h=u,u=f,f=h);var c,s,l,h=i(u),p=i(f),d=null==t?10:+t,g=[];if(!(o%1)&&p-h<d){if(h=Math.round(h)-1,p=Math.round(p)+1,u>0){for(;h<p;++h)for(s=1,c=a(h);s<o;++s)if(!((l=c*s)<u)){if(l>f)break;g.push(l)}}else for(;h<p;++h)for(s=o-1,c=a(h);s>=1;--s)if(!((l=c*s)<u)){if(l>f)break;g.push(l)}}else g=ns(h,p,Math.min(p-h,d)).map(a);return e?g.reverse():g},n.tickFormat=function(e,r){if(null==r&&(r=10===o?".0e":","),"function"!=typeof r&&(r=t.format(r)),e===1/0)return r;null==e&&(e=10);var u=Math.max(1,o*e/n.ticks().length);return function(t){var e=t/a(Math.round(i(t)));return e*o<o-.5&&(e*=o),e<=u?r(t):""}},n.nice=function(){return r(Nm(r(),{floor:function(t){return a(Math.floor(i(t)))},ceil:function(t){return a(Math.ceil(i(t)))}}))},n.copy=function(){return Da(n,Ha().base(o))},n}function Ya(t,e){return t<0?-Math.pow(-t,e):Math.pow(t,e)}function $a(){function t(t,e){return(e=Ya(e,n)-(t=Ya(t,n)))?function(r){return(Ya(r,n)-t)/e}:Tm(e)}function e(t,e){return e=Ya(e,n)-(t=Ya(t,n)),function(r){return Ya(t+e*r,1/n)}}var n=1,r=Ra(t,e),o=r.domain;return r.exponent=function(t){return arguments.length?(n=+t,o(o())):n},r.copy=function(){return Da(r,$a().exponent(n))},Pa(r)}function Wa(){return $a().exponent(.5)}function Xa(){function t(){var t=0,i=Math.max(1,r.length);for(o=new Array(i-1);++t<i;)o[t-1]=is(n,t/i);return e}function e(t){if(!isNaN(t=+t))return r[jc(o,t)]}var n=[],r=[],o=[];return e.invertExtent=function(t){var e=r.indexOf(t);return e<0?[NaN,NaN]:[e>0?o[e-1]:n[0],e<o.length?o[e]:n[n.length-1]]},e.domain=function(e){if(!arguments.length)return n.slice();n=[];for(var r,o=0,i=e.length;o<i;++o)null==(r=e[o])||isNaN(r=+r)||n.push(r);return n.sort(qc),t()},e.range=function(e){return arguments.length?(r=Am.call(e),t()):r.slice()},e.quantiles=function(){return o.slice()},e.copy=function(){return Xa().domain(n).range(r)},e}function Va(){function t(t){if(t<=t)return a[jc(i,t,0,o)]}function e(){var e=-1;for(i=new Array(o);++e<o;)i[e]=((e+1)*r-(e-o)*n)/(o+1);return t}var n=0,r=1,o=1,i=[.5],a=[0,1];return t.domain=function(t){return arguments.length?(n=+t[0],r=+t[1],e()):[n,r]},t.range=function(t){return arguments.length?(o=(a=Am.call(t)).length-1,e()):a.slice()},t.invertExtent=function(t){var e=a.indexOf(t);return e<0?[NaN,NaN]:e<1?[n,i[0]]:e>=o?[i[o-1],r]:[i[e-1],i[e]]},t.copy=function(){return Va().domain([n,r]).range(a)},Pa(t)}function Ga(){function t(t){if(t<=t)return n[jc(e,t,0,r)]}var e=[.5],n=[0,1],r=1;return t.domain=function(o){return arguments.length?(e=Am.call(o),r=Math.min(e.length,n.length-1),t):e.slice()},t.range=function(o){return arguments.length?(n=Am.call(o),r=Math.min(e.length,n.length-1),t):n.slice()},t.invertExtent=function(t){var r=n.indexOf(t);return[e[r-1],e[r]]},t.copy=function(){return Ga().domain(e).range(n)},t}function Ja(t,e,n,r){function o(e){return t(e=new Date(+e)),e}return o.floor=o,o.ceil=function(n){return t(n=new Date(n-1)),e(n,1),t(n),n},o.round=function(t){var e=o(t),n=o.ceil(t);return t-e<n-t?e:n},o.offset=function(t,n){return e(t=new Date(+t),null==n?1:Math.floor(n)),t},o.range=function(n,r,i){var a=[];if(n=o.ceil(n),i=null==i?1:Math.floor(i),!(n<r&&i>0))return a;do{a.push(new Date(+n))}while(e(n,i),t(n),n<r);return a},o.filter=function(n){return Ja(function(e){if(e>=e)for(;t(e),!n(e);)e.setTime(e-1)},function(t,r){if(t>=t)for(;--r>=0;)for(;e(t,1),!n(t););})},n&&(o.count=function(e,r){return Dm.setTime(+e),Rm.setTime(+r),t(Dm),t(Rm),Math.floor(n(Dm,Rm))},o.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?o.filter(r?function(e){return r(e)%t==0}:function(e){return o.count(0,e)%t==0}):o:null}),o}function Za(t){return Ja(function(e){e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)},function(t,e){t.setDate(t.getDate()+7*e)},function(t,e){return(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*Lm)/Bm})}function Qa(t){return Ja(function(e){e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)},function(t,e){t.setUTCDate(t.getUTCDate()+7*e)},function(t,e){return(e-t)/Bm})}function Ka(t){if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function tu(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function eu(t){return{y:t,m:0,d:1,H:0,M:0,S:0,L:0}}function nu(t){function e(t,e){return function(n){var r,o,i,a=[],u=-1,f=0,c=t.length;for(n instanceof Date||(n=new Date(+n));++u<c;)37===t.charCodeAt(u)&&(a.push(t.slice(f,u)),null!=(o=q_[r=t.charAt(++u)])?r=t.charAt(++u):o="e"===r?" ":"0",(i=e[r])&&(r=i(n,o)),a.push(r),f=u+1);return a.push(t.slice(f,u)),a.join("")}}function n(t,e){return function(n){var o=eu(1900);if(r(o,t,n+="",0)!=n.length)return null;if("p"in o&&(o.H=o.H%12+12*o.p),"W"in o||"U"in o){"w"in o||(o.w="W"in o?1:0);var i="Z"in o?tu(eu(o.y)).getUTCDay():e(eu(o.y)).getDay();o.m=0,o.d="W"in o?(o.w+6)%7+7*o.W-(i+5)%7:o.w+7*o.U-(i+6)%7}return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,tu(o)):e(o)}}function r(t,e,n,r){for(var o,i,a=0,u=e.length,f=n.length;a<u;){if(r>=f)return-1;if(37===(o=e.charCodeAt(a++))){if(o=e.charAt(a++),!(i=z[o in q_?e.charAt(a++):o])||(r=i(t,n,r))<0)return-1}else if(o!=n.charCodeAt(r++))return-1}return r}function o(t,e,n){var r=S.exec(e.slice(n));return r?(t.p=N[r[0].toLowerCase()],n+r[0].length):-1}function i(t,e,n){var r=P.exec(e.slice(n));return r?(t.w=q[r[0].toLowerCase()],n+r[0].length):-1}function a(t,e,n){var r=D.exec(e.slice(n));return r?(t.w=R[r[0].toLowerCase()],n+r[0].length):-1}function u(t,e,n){var r=j.exec(e.slice(n));return r?(t.m=O[r[0].toLowerCase()],n+r[0].length):-1}function f(t,e,n){var r=L.exec(e.slice(n));return r?(t.m=B[r[0].toLowerCase()],n+r[0].length):-1}function c(t,e,n){return r(t,w,e,n)}function s(t,e,n){return r(t,F,e,n)}function l(t,e,n){return r(t,M,e,n)}function h(t){return T[t.getDay()]}function p(t){return E[t.getDay()]}function d(t){return k[t.getMonth()]}function g(t){return C[t.getMonth()]}function v(t){return A[+(t.getHours()>=12)]}function b(t){return T[t.getUTCDay()]}function y(t){return E[t.getUTCDay()]}function m(t){return k[t.getUTCMonth()]}function _(t){return C[t.getUTCMonth()]}function x(t){return A[+(t.getUTCHours()>=12)]}var w=t.dateTime,F=t.date,M=t.time,A=t.periods,E=t.days,T=t.shortDays,C=t.months,k=t.shortMonths,S=iu(A),N=au(A),D=iu(E),R=au(E),P=iu(T),q=au(T),L=iu(C),B=au(C),j=iu(k),O=au(k),I={a:h,A:p,b:d,B:g,c:null,d:xu,e:xu,H:wu,I:Fu,j:Mu,L:Au,m:Eu,M:Tu,p:v,S:Cu,U:ku,w:Su,W:Nu,x:null,X:null,y:Du,Y:Ru,Z:Pu,"%":Gu},U={a:b,A:y,b:m,B:_,c:null,d:qu,e:qu,H:Lu,I:Bu,j:ju,L:Ou,m:Iu,M:Uu,p:x,S:zu,U:Hu,w:Yu,W:$u,x:null,X:null,y:Wu,Y:Xu,Z:Vu,"%":Gu},z={a:i,A:a,b:u,B:f,c:c,d:du,e:du,H:vu,I:vu,j:gu,L:mu,m:pu,M:bu,p:o,S:yu,U:fu,w:uu,W:cu,x:s,X:l,y:lu,Y:su,Z:hu,"%":_u};return I.x=e(F,I),I.X=e(M,I),I.c=e(w,I),U.x=e(F,U),U.X=e(M,U),U.c=e(w,U),{format:function(t){var n=e(t+="",I);return n.toString=function(){return t},n},parse:function(t){var e=n(t+="",Ka);return e.toString=function(){return t},e},utcFormat:function(t){var n=e(t+="",U);return n.toString=function(){return t},n},utcParse:function(t){var e=n(t,tu);return e.toString=function(){return t},e}}}function ru(t,e,n){var r=t<0?"-":"",o=(r?-t:t)+"",i=o.length;return r+(i<n?new Array(n-i+1).join(e)+o:o)}function ou(t){return t.replace(j_,"\\$&")}function iu(t){return new RegExp("^(?:"+t.map(ou).join("|")+")","i")}function au(t){for(var e={},n=-1,r=t.length;++n<r;)e[t[n].toLowerCase()]=n;return e}function uu(t,e,n){var r=L_.exec(e.slice(n,n+1));return r?(t.w=+r[0],n+r[0].length):-1}function fu(t,e,n){var r=L_.exec(e.slice(n));return r?(t.U=+r[0],n+r[0].length):-1}function cu(t,e,n){var r=L_.exec(e.slice(n));return r?(t.W=+r[0],n+r[0].length):-1}function su(t,e,n){var r=L_.exec(e.slice(n,n+4));return r?(t.y=+r[0],n+r[0].length):-1}function lu(t,e,n){var r=L_.exec(e.slice(n,n+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function hu(t,e,n){var r=/^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(e.slice(n,n+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function pu(t,e,n){var r=L_.exec(e.slice(n,n+2));return r?(t.m=r[0]-1,n+r[0].length):-1}function du(t,e,n){var r=L_.exec(e.slice(n,n+2));return r?(t.d=+r[0],n+r[0].length):-1}function gu(t,e,n){var r=L_.exec(e.slice(n,n+3));return r?(t.m=0,t.d=+r[0],n+r[0].length):-1}function vu(t,e,n){var r=L_.exec(e.slice(n,n+2));return r?(t.H=+r[0],n+r[0].length):-1}function bu(t,e,n){var r=L_.exec(e.slice(n,n+2));return r?(t.M=+r[0],n+r[0].length):-1}function yu(t,e,n){var r=L_.exec(e.slice(n,n+2));return r?(t.S=+r[0],n+r[0].length):-1}function mu(t,e,n){var r=L_.exec(e.slice(n,n+3));return r?(t.L=+r[0],n+r[0].length):-1}function _u(t,e,n){var r=B_.exec(e.slice(n,n+1));return r?n+r[0].length:-1}function xu(t,e){return ru(t.getDate(),e,2)}function wu(t,e){return ru(t.getHours(),e,2)}function Fu(t,e){return ru(t.getHours()%12||12,e,2)}function Mu(t,e){return ru(1+Ym.count(f_(t),t),e,3)}function Au(t,e){return ru(t.getMilliseconds(),e,3)}function Eu(t,e){return ru(t.getMonth()+1,e,2)}function Tu(t,e){return ru(t.getMinutes(),e,2)}function Cu(t,e){return ru(t.getSeconds(),e,2)}function ku(t,e){return ru(Wm.count(f_(t),t),e,2)}function Su(t){return t.getDay()}function Nu(t,e){return ru(Xm.count(f_(t),t),e,2)}function Du(t,e){return ru(t.getFullYear()%100,e,2)}function Ru(t,e){return ru(t.getFullYear()%1e4,e,4)}function Pu(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+ru(e/60|0,"0",2)+ru(e%60,"0",2)}function qu(t,e){return ru(t.getUTCDate(),e,2)}function Lu(t,e){return ru(t.getUTCHours(),e,2)}function Bu(t,e){return ru(t.getUTCHours()%12||12,e,2)}function ju(t,e){return ru(1+d_.count(D_(t),t),e,3)}function Ou(t,e){return ru(t.getUTCMilliseconds(),e,3)}function Iu(t,e){return ru(t.getUTCMonth()+1,e,2)}function Uu(t,e){return ru(t.getUTCMinutes(),e,2)}function zu(t,e){return ru(t.getUTCSeconds(),e,2)}function Hu(t,e){return ru(v_.count(D_(t),t),e,2)}function Yu(t){return t.getUTCDay()}function $u(t,e){return ru(b_.count(D_(t),t),e,2)}function Wu(t,e){return ru(t.getUTCFullYear()%100,e,2)}function Xu(t,e){return ru(t.getUTCFullYear()%1e4,e,4)}function Vu(){return"+0000"}function Gu(){return"%"}function Ju(e){return R_=nu(e),t.timeFormat=R_.format,t.timeParse=R_.parse,t.utcFormat=R_.utcFormat,t.utcParse=R_.utcParse,R_}function Zu(t){return t.toISOString()}function Qu(t){var e=new Date(t);return isNaN(e)?null:e}function Ku(t){return new Date(t)}function tf(t){return t instanceof Date?+t:+new Date(+t)}function ef(t,e,n,r,i,a,u,f,c){function s(o){return(u(o)<o?g:a(o)<o?v:i(o)<o?b:r(o)<o?y:e(o)<o?n(o)<o?m:_:t(o)<o?x:w)(o)}function l(e,n,r,i){if(null==e&&(e=10),"number"==typeof e){var a=Math.abs(r-n)/e,u=Lc(function(t){return t[2]}).right(F,a);u===F.length?(i=o(n/X_,r/X_,e),e=t):u?(u=F[a/F[u-1][2]<F[u][2]/a?u-1:u],i=u[1],e=u[0]):(i=o(n,r,e),e=f)}return null==i?e:e.every(i)}var h=Ra(Ta,mh),p=h.invert,d=h.domain,g=c(".%L"),v=c(":%S"),b=c("%I:%M"),y=c("%I %p"),m=c("%a %d"),_=c("%b %d"),x=c("%B"),w=c("%Y"),F=[[u,1,U_],[u,5,5*U_],[u,15,15*U_],[u,30,30*U_],[a,1,z_],[a,5,5*z_],[a,15,15*z_],[a,30,30*z_],[i,1,H_],[i,3,3*H_],[i,6,6*H_],[i,12,12*H_],[r,1,Y_],[r,2,2*Y_],[n,1,$_],[e,1,W_],[e,3,3*W_],[t,1,X_]];return h.invert=function(t){return new Date(p(t))},h.domain=function(t){return arguments.length?d(Mm.call(t,tf)):d().map(Ku)},h.ticks=function(t,e){var n,r=d(),o=r[0],i=r[r.length-1],a=i<o;return a&&(n=o,o=i,i=n),n=l(t,o,i,e),n=n?n.range(o,i+1):[],a?n.reverse():n},h.tickFormat=function(t,e){return null==e?s:c(e)},h.nice=function(t,e){var n=d();return(t=l(t,n[0],n[n.length-1],e))?d(Nm(n,t)):h},h.copy=function(){return Da(h,ef(t,e,n,r,i,a,u,f,c))},h}function nf(t){var e=t.length;return function(n){return t[Math.max(0,Math.min(e-1,Math.floor(n*e)))]}}function rf(t){function e(e){var i=(e-n)/(r-n);return t(o?Math.max(0,Math.min(1,i)):i)}var n=0,r=1,o=!1;return e.domain=function(t){return arguments.length?(n=+t[0],r=+t[1],e):[n,r]},e.clamp=function(t){return arguments.length?(o=!!t,e):o},e.interpolator=function(n){return arguments.length?(t=n,e):t},e.copy=function(){return rf(t).domain([n,r]).clamp(o)},Pa(e)}function of(t){return t>1?0:t<-1?mx:Math.acos(t)}function af(t){return t>=1?_x:t<=-1?-_x:Math.asin(t)}function uf(t){return t.innerRadius}function ff(t){return t.outerRadius}function cf(t){return t.startAngle}function sf(t){return t.endAngle}function lf(t){return t&&t.padAngle}function hf(t,e,n,r,o,i,a,u){var f=n-t,c=r-e,s=a-o,l=u-i,h=(s*(e-i)-l*(t-o))/(l*f-s*c);return[t+h*f,e+h*c]}function pf(t,e,n,r,o,i,a){var u=t-n,f=e-r,c=(a?i:-i)/bx(u*u+f*f),s=c*f,l=-c*u,h=t+s,p=e+l,d=n+s,g=r+l,v=(h+d)/2,b=(p+g)/2,y=d-h,m=g-p,_=y*y+m*m,x=o-i,w=h*g-d*p,F=(m<0?-1:1)*bx(dx(0,x*x*_-w*w)),M=(w*m-y*F)/_,A=(-w*y-m*F)/_,E=(w*m+y*F)/_,T=(-w*y+m*F)/_,C=M-v,k=A-b,S=E-v,N=T-b;return C*C+k*k>S*S+N*N&&(M=E,A=T),{cx:M,cy:A,x01:-s,y01:-l,x11:M*(o/x-1),y11:A*(o/x-1)}}function df(t){this._context=t}function gf(t){return t[0]}function vf(t){return t[1]}function bf(t){this._curve=t}function yf(t){function e(e){return new bf(t(e))}return e._curve=t,e}function mf(t){var e=t.curve;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){return arguments.length?e(yf(t)):e()._curve},t}function _f(t,e,n){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+e)/6,(t._y0+4*t._y1+n)/6)}function xf(t){this._context=t}function wf(t){this._context=t}function Ff(t){this._context=t}function Mf(t,e){this._basis=new xf(t),this._beta=e}function Af(t,e,n){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-e),t._y2+t._k*(t._y1-n),t._x2,t._y2)}function Ef(t,e){this._context=t,this._k=(1-e)/6}function Tf(t,e){this._context=t,this._k=(1-e)/6}function Cf(t,e){this._context=t,this._k=(1-e)/6}function kf(t,e,n){var r=t._x1,o=t._y1,i=t._x2,a=t._y2;if(t._l01_a>yx){var u=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,f=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*u-t._x0*t._l12_2a+t._x2*t._l01_2a)/f,o=(o*u-t._y0*t._l12_2a+t._y2*t._l01_2a)/f}if(t._l23_a>yx){var c=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,s=3*t._l23_a*(t._l23_a+t._l12_a);i=(i*c+t._x1*t._l23_2a-e*t._l12_2a)/s,a=(a*c+t._y1*t._l23_2a-n*t._l12_2a)/s}t._context.bezierCurveTo(r,o,i,a,t._x2,t._y2)}function Sf(t,e){this._context=t,this._alpha=e}function Nf(t,e){this._context=t,this._alpha=e}function Df(t,e){this._context=t,this._alpha=e}function Rf(t){this._context=t}function Pf(t){return t<0?-1:1}function qf(t,e,n){var r=t._x1-t._x0,o=e-t._x1,i=(t._y1-t._y0)/(r||o<0&&-0),a=(n-t._y1)/(o||r<0&&-0),u=(i*o+a*r)/(r+o);return(Pf(i)+Pf(a))*Math.min(Math.abs(i),Math.abs(a),.5*Math.abs(u))||0}function Lf(t,e){var n=t._x1-t._x0;return n?(3*(t._y1-t._y0)/n-e)/2:e}function Bf(t,e,n){var r=t._x0,o=t._y0,i=t._x1,a=t._y1,u=(i-r)/3;t._context.bezierCurveTo(r+u,o+u*e,i-u,a-u*n,i,a)}function jf(t){this._context=t}function Of(t){this._context=new If(t)}function If(t){this._context=t}function Uf(t){return new jf(t)}function zf(t){return new Of(t)}function Hf(t){this._context=t}function Yf(t){var e,n,r=t.length-1,o=new Array(r),i=new Array(r),a=new Array(r);for(o[0]=0,i[0]=2,a[0]=t[0]+2*t[1],e=1;e<r-1;++e)o[e]=1,i[e]=4,a[e]=4*t[e]+2*t[e+1];for(o[r-1]=2,i[r-1]=7,a[r-1]=8*t[r-1]+t[r],e=1;e<r;++e)n=o[e]/i[e-1],i[e]-=n,a[e]-=n*a[e-1];for(o[r-1]=a[r-1]/i[r-1],e=r-2;e>=0;--e)o[e]=(a[e]-o[e+1])/i[e];for(i[r-1]=(t[r]+o[r-1])/2,e=0;e<r-1;++e)i[e]=2*t[e+1]-o[e+1];return[o,i]}function $f(t,e){this._context=t,this._t=e}function Wf(t){return new $f(t,0)}function Xf(t){return new $f(t,1)}function Vf(t,e){return t[e]}function Gf(t){for(var e,n=0,r=-1,o=t.length;++r<o;)(e=+t[r][1])&&(n+=e);return n}function Jf(t){return t[0]}function Zf(t){return t[1]}function Qf(){this._=null}function Kf(t){t.U=t.C=t.L=t.R=t.P=t.N=null}function tc(t,e){var n=e,r=e.R,o=n.U;o?o.L===n?o.L=r:o.R=r:t._=r,r.U=o,n.U=r,n.R=r.L,n.R&&(n.R.U=n),r.L=n}function ec(t,e){var n=e,r=e.L,o=n.U;o?o.L===n?o.L=r:o.R=r:t._=r,r.U=o,n.U=r,n.L=r.R,n.L&&(n.L.U=n),r.R=n}function nc(t){for(;t.L;)t=t.L;return t}function rc(t,e,n,r){var o=[null,null],i=Tw.push(o)-1;return o.left=t,o.right=e,n&&ic(o,t,e,n),r&&ic(o,e,t,r),Aw[t.index].halfedges.push(i),Aw[e.index].halfedges.push(i),o}function oc(t,e,n){var r=[e,n];return r.left=t,r}function ic(t,e,n,r){t[0]||t[1]?t.left===n?t[1]=r:t[0]=r:(t[0]=r,t.left=e,t.right=n)}function ac(t,e,n,r,o){var i,a=t[0],u=t[1],f=a[0],c=a[1],s=u[0],l=u[1],h=0,p=1,d=s-f,g=l-c;if(i=e-f,d||!(i>0)){if(i/=d,d<0){if(i<h)return;i<p&&(p=i)}else if(d>0){if(i>p)return;i>h&&(h=i)}if(i=r-f,d||!(i<0)){if(i/=d,d<0){if(i>p)return;i>h&&(h=i)}else if(d>0){if(i<h)return;i<p&&(p=i)}if(i=n-c,g||!(i>0)){if(i/=g,g<0){if(i<h)return;i<p&&(p=i)}else if(g>0){if(i>p)return;i>h&&(h=i)}if(i=o-c,g||!(i<0)){if(i/=g,g<0){if(i>p)return;i>h&&(h=i)}else if(g>0){if(i<h)return;i<p&&(p=i)}return!(h>0||p<1)||(h>0&&(t[0]=[f+h*d,c+h*g]),p<1&&(t[1]=[f+p*d,c+p*g]),!0)}}}}}function uc(t,e,n,r,o){var i=t[1];if(i)return!0;var a,u,f=t[0],c=t.left,s=t.right,l=c[0],h=c[1],p=s[0],d=s[1],g=(l+p)/2,v=(h+d)/2;if(d===h){if(g<e||g>=r)return;if(l>p){if(f){if(f[1]>=o)return}else f=[g,n];i=[g,o]}else{if(f){if(f[1]<n)return}else f=[g,o];i=[g,n]}}else if(a=(l-p)/(d-h),u=v-a*g,a<-1||a>1)if(l>p){if(f){if(f[1]>=o)return}else f=[(n-u)/a,n];i=[(o-u)/a,o]}else{if(f){if(f[1]<n)return}else f=[(o-u)/a,o];i=[(n-u)/a,n]}else if(h<d){if(f){if(f[0]>=r)return}else f=[e,a*e+u];i=[r,a*r+u]}else{if(f){if(f[0]<e)return}else f=[r,a*r+u];i=[e,a*e+u]}return t[0]=f,t[1]=i,!0}function fc(t,e,n,r){for(var o,i=Tw.length;i--;)uc(o=Tw[i],t,e,n,r)&&ac(o,t,e,n,r)&&(Math.abs(o[0][0]-o[1][0])>Sw||Math.abs(o[0][1]-o[1][1])>Sw)||delete Tw[i]}function cc(t){return Aw[t.index]={site:t,halfedges:[]}}function sc(t,e){var n=t.site,r=e.left,o=e.right;return n===o&&(o=r,r=n),o?Math.atan2(o[1]-r[1],o[0]-r[0]):(n===r?(r=e[1],o=e[0]):(r=e[0],o=e[1]),Math.atan2(r[0]-o[0],o[1]-r[1]))}function lc(t,e){return e[+(e.left!==t.site)]}function hc(t,e){return e[+(e.left===t.site)]}function pc(){for(var t,e,n,r,o=0,i=Aw.length;o<i;++o)if((t=Aw[o])&&(r=(e=t.halfedges).length)){var a=new Array(r),u=new Array(r);for(n=0;n<r;++n)a[n]=n,u[n]=sc(t,Tw[e[n]]);for(a.sort(function(t,e){return u[e]-u[t]}),n=0;n<r;++n)u[n]=e[a[n]];for(n=0;n<r;++n)e[n]=u[n]}}function dc(t,e,n,r){var o,i,a,u,f,c,s,l,h,p,d,g,v=Aw.length,b=!0;for(o=0;o<v;++o)if(i=Aw[o]){for(a=i.site,f=i.halfedges,u=f.length;u--;)Tw[f[u]]||f.splice(u,1);for(u=0,c=f.length;u<c;)p=hc(i,Tw[f[u]]),d=p[0],g=p[1],s=lc(i,Tw[f[++u%c]]),l=s[0],h=s[1],(Math.abs(d-l)>Sw||Math.abs(g-h)>Sw)&&(f.splice(u,0,Tw.push(oc(a,p,Math.abs(d-t)<Sw&&r-g>Sw?[t,Math.abs(l-t)<Sw?h:r]:Math.abs(g-r)<Sw&&n-d>Sw?[Math.abs(h-r)<Sw?l:n,r]:Math.abs(d-n)<Sw&&g-e>Sw?[n,Math.abs(l-n)<Sw?h:e]:Math.abs(g-e)<Sw&&d-t>Sw?[Math.abs(h-e)<Sw?l:t,e]:null))-1),++c);c&&(b=!1)}if(b){var y,m,_,x=1/0;for(o=0,b=null;o<v;++o)(i=Aw[o])&&(a=i.site,y=a[0]-t,m=a[1]-e,(_=y*y+m*m)<x&&(x=_,b=i));if(b){var w=[t,e],F=[t,r],M=[n,r],A=[n,e];b.halfedges.push(Tw.push(oc(a=b.site,w,F))-1,Tw.push(oc(a,F,M))-1,Tw.push(oc(a,M,A))-1,Tw.push(oc(a,A,w))-1)}}for(o=0;o<v;++o)(i=Aw[o])&&(i.halfedges.length||delete Aw[o])}function gc(){Kf(this),this.x=this.y=this.arc=this.site=this.cy=null}function vc(t){var e=t.P,n=t.N;if(e&&n){var r=e.site,o=t.site,i=n.site;if(r!==i){var a=o[0],u=o[1],f=r[0]-a,c=r[1]-u,s=i[0]-a,l=i[1]-u,h=2*(f*l-c*s);if(!(h>=-Nw)){var p=f*f+c*c,d=s*s+l*l,g=(l*p-c*d)/h,v=(f*d-s*p)/h,b=Cw.pop()||new gc;b.arc=t,b.site=o,b.x=g+a,b.y=(b.cy=v+u)+Math.sqrt(g*g+v*v),t.circle=b;for(var y=null,m=Ew._;m;)if(b.y<m.y||b.y===m.y&&b.x<=m.x){if(!m.L){y=m.P;break}m=m.L}else{if(!m.R){y=m;break}m=m.R}Ew.insert(y,b),y||(Fw=b)}}}}function bc(t){var e=t.circle;e&&(e.P||(Fw=e.N),Ew.remove(e),Cw.push(e),Kf(e),t.circle=null)}function yc(){Kf(this),this.edge=this.site=this.circle=null}function mc(t){var e=kw.pop()||new yc;return e.site=t,e}function _c(t){bc(t),Mw.remove(t),kw.push(t),Kf(t)}function xc(t){var e=t.circle,n=e.x,r=e.cy,o=[n,r],i=t.P,a=t.N,u=[t];_c(t);for(var f=i;f.circle&&Math.abs(n-f.circle.x)<Sw&&Math.abs(r-f.circle.cy)<Sw;)i=f.P,u.unshift(f),_c(f),f=i;u.unshift(f),bc(f);for(var c=a;c.circle&&Math.abs(n-c.circle.x)<Sw&&Math.abs(r-c.circle.cy)<Sw;)a=c.N,u.push(c),_c(c),c=a;u.push(c),bc(c);var s,l=u.length;for(s=1;s<l;++s)c=u[s],f=u[s-1],ic(c.edge,f.site,c.site,o);f=u[0],c=u[l-1],c.edge=rc(f.site,c.site,null,o),vc(f),vc(c)}function wc(t){for(var e,n,r,o,i=t[0],a=t[1],u=Mw._;u;)if((r=Fc(u,a)-i)>Sw)u=u.L;else{if(!((o=i-Mc(u,a))>Sw)){r>-Sw?(e=u.P,n=u):o>-Sw?(e=u,n=u.N):e=n=u;break}if(!u.R){e=u;break}u=u.R}cc(t);var f=mc(t);if(Mw.insert(e,f),e||n){if(e===n)return bc(e),n=mc(e.site),Mw.insert(f,n),f.edge=n.edge=rc(e.site,f.site),vc(e),void vc(n);if(!n)return void(f.edge=rc(e.site,f.site));bc(e),bc(n);var c=e.site,s=c[0],l=c[1],h=t[0]-s,p=t[1]-l,d=n.site,g=d[0]-s,v=d[1]-l,b=2*(h*v-p*g),y=h*h+p*p,m=g*g+v*v,_=[(v*y-p*m)/b+s,(h*m-g*y)/b+l];ic(n.edge,c,d,_),f.edge=rc(c,t,null,_),n.edge=rc(t,d,null,_),vc(e),vc(n)}}function Fc(t,e){var n=t.site,r=n[0],o=n[1],i=o-e;if(!i)return r;var a=t.P;if(!a)return-1/0;n=a.site;var u=n[0],f=n[1],c=f-e;if(!c)return u;var s=u-r,l=1/i-1/c,h=s/c;return l?(-h+Math.sqrt(h*h-2*l*(s*s/(-2*c)-f+c/2+o-i/2)))/l+r:(r+u)/2}function Mc(t,e){var n=t.N;if(n)return Fc(n,e);var r=t.site;return r[1]===e?r[0]:1/0}function Ac(t,e,n){return(t[0]-n[0])*(e[1]-t[1])-(t[0]-e[0])*(n[1]-t[1])}function Ec(t,e){return e[1]-t[1]||e[0]-t[0]}function Tc(t,e){var n,r,o,i=t.sort(Ec).pop();for(Tw=[],Aw=new Array(t.length),Mw=new Qf,Ew=new Qf;;)if(o=Fw,i&&(!o||i[1]<o.y||i[1]===o.y&&i[0]<o.x))i[0]===n&&i[1]===r||(wc(i),n=i[0],r=i[1]),i=t.pop();else{if(!o)break;xc(o.arc)}if(pc(),e){var a=+e[0][0],u=+e[0][1],f=+e[1][0],c=+e[1][1];fc(a,u,f,c),dc(a,u,f,c)}this.edges=Tw,this.cells=Aw,Mw=Ew=Tw=Aw=null}function Cc(t,e,n){this.target=t,this.type=e,this.transform=n}function kc(t,e,n){this.k=t,this.x=e,this.y=n}function Sc(t){return t.__zoom||Pw}function Nc(){t.event.stopImmediatePropagation()}function Dc(){return!t.event.button}function Rc(){var t,e,n=this;return n instanceof SVGElement?(n=n.ownerSVGElement||n,t=n.width.baseVal.value,e=n.height.baseVal.value):(t=n.clientWidth,e=n.clientHeight),[[0,0],[t,e]]}function Pc(){return this.__zoom||Pw}var qc=function(t,e){return t<e?-1:t>e?1:t>=e?0:NaN},Lc=function(t){return 1===t.length&&(t=e(t)),{left:function(e,n,r,o){for(null==r&&(r=0),null==o&&(o=e.length);r<o;){var i=r+o>>>1;t(e[i],n)<0?r=i+1:o=i}return r},right:function(e,n,r,o){for(null==r&&(r=0),null==o&&(o=e.length);r<o;){var i=r+o>>>1;t(e[i],n)>0?o=i:r=i+1}return r}}},Bc=Lc(qc),jc=Bc.right,Oc=Bc.left,Ic=function(t,e){null==e&&(e=n);for(var r=0,o=t.length-1,i=t[0],a=new Array(o<0?0:o);r<o;)a[r]=e(i,i=t[++r]);return a},Uc=function(t,e,r){var o,i,a,u,f=t.length,c=e.length,s=new Array(f*c);for(null==r&&(r=n),o=a=0;o<f;++o)for(u=t[o],i=0;i<c;++i,++a)s[a]=r(u,e[i]);return s},zc=function(t,e){return e<t?-1:e>t?1:e>=t?0:NaN},Hc=function(t){return null===t?NaN:+t},Yc=function(t,e){var n,r,o=t.length,i=0,a=-1,u=0,f=0;if(null==e)for(;++a<o;)isNaN(n=Hc(t[a]))||(r=n-u,u+=r/++i,f+=r*(n-u));else for(;++a<o;)isNaN(n=Hc(e(t[a],a,t)))||(r=n-u,u+=r/++i,f+=r*(n-u));if(i>1)return f/(i-1)},$c=function(t,e){var n=Yc(t,e);return n?Math.sqrt(n):n},Wc=function(t,e){var n,r,o,i=t.length,a=-1;if(null==e){for(;++a<i;)if(null!=(n=t[a])&&n>=n)for(r=o=n;++a<i;)null!=(n=t[a])&&(r>n&&(r=n),o<n&&(o=n))}else for(;++a<i;)if(null!=(n=e(t[a],a,t))&&n>=n)for(r=o=n;++a<i;)null!=(n=e(t[a],a,t))&&(r>n&&(r=n),o<n&&(o=n));return[r,o]},Xc=Array.prototype,Vc=Xc.slice,Gc=Xc.map,Jc=function(t){return function(){return t}},Zc=function(t){return t},Qc=function(t,e,n){t=+t,e=+e,n=(o=arguments.length)<2?(e=t,t=0,1):o<3?1:+n;for(var r=-1,o=0|Math.max(0,Math.ceil((e-t)/n)),i=new Array(o);++r<o;)i[r]=t+r*n;return i},Kc=Math.sqrt(50),ts=Math.sqrt(10),es=Math.sqrt(2),ns=function(t,e,n){var o,i,a,u=e<t,f=-1;if(u&&(o=t,t=e,e=o),0===(a=r(t,e,n))||!isFinite(a))return[];if(a>0)for(t=Math.ceil(t/a),e=Math.floor(e/a),i=new Array(o=Math.ceil(e-t+1));++f<o;)i[f]=(t+f)*a;else for(t=Math.floor(t*a),e=Math.ceil(e*a),i=new Array(o=Math.ceil(t-e+1));++f<o;)i[f]=(t-f)/a;return u&&i.reverse(),i},rs=function(t){return Math.ceil(Math.log(t.length)/Math.LN2)+1},os=function(){function t(t){var i,a,u=t.length,f=new Array(u);for(i=0;i<u;++i)f[i]=e(t[i],i,t);var c=n(f),s=c[0],l=c[1],h=r(f,s,l);Array.isArray(h)||(h=o(s,l,h),h=Qc(Math.ceil(s/h)*h,Math.floor(l/h)*h,h));for(var p=h.length;h[0]<=s;)h.shift(),--p;for(;h[p-1]>l;)h.pop(),--p;var d,g=new Array(p+1);for(i=0;i<=p;++i)d=g[i]=[],d.x0=i>0?h[i-1]:s,d.x1=i<p?h[i]:l;for(i=0;i<u;++i)a=f[i],s<=a&&a<=l&&g[jc(h,a,0,p)].push(t[i]);return g}var e=Zc,n=Wc,r=rs;return t.value=function(n){return arguments.length?(e="function"==typeof n?n:Jc(n),t):e},t.domain=function(e){return arguments.length?(n="function"==typeof e?e:Jc([e[0],e[1]]),t):n},t.thresholds=function(e){return arguments.length?(r="function"==typeof e?e:Jc(Array.isArray(e)?Vc.call(e):e),t):r},t},is=function(t,e,n){if(null==n&&(n=Hc),r=t.length){if((e=+e)<=0||r<2)return+n(t[0],0,t);if(e>=1)return+n(t[r-1],r-1,t);var r,o=(r-1)*e,i=Math.floor(o),a=+n(t[i],i,t);return a+(+n(t[i+1],i+1,t)-a)*(o-i)}},as=function(t,e,n){return t=Gc.call(t,Hc).sort(qc),Math.ceil((n-e)/(2*(is(t,.75)-is(t,.25))*Math.pow(t.length,-1/3)))},us=function(t,e,n){return Math.ceil((n-e)/(3.5*$c(t)*Math.pow(t.length,-1/3)))},fs=function(t,e){var n,r,o=t.length,i=-1;if(null==e){for(;++i<o;)if(null!=(n=t[i])&&n>=n)for(r=n;++i<o;)null!=(n=t[i])&&n>r&&(r=n)}else for(;++i<o;)if(null!=(n=e(t[i],i,t))&&n>=n)for(r=n;++i<o;)null!=(n=e(t[i],i,t))&&n>r&&(r=n);return r},cs=function(t,e){var n,r=t.length,o=r,i=-1,a=0;if(null==e)for(;++i<r;)isNaN(n=Hc(t[i]))?--o:a+=n;else for(;++i<r;)isNaN(n=Hc(e(t[i],i,t)))?--o:a+=n;if(o)return a/o},ss=function(t,e){var n,r=t.length,o=-1,i=[];if(null==e)for(;++o<r;)isNaN(n=Hc(t[o]))||i.push(n);else for(;++o<r;)isNaN(n=Hc(e(t[o],o,t)))||i.push(n);return is(i.sort(qc),.5)},ls=function(t){for(var e,n,r,o=t.length,i=-1,a=0;++i<o;)a+=t[i].length;for(n=new Array(a);--o>=0;)for(r=t[o],e=r.length;--e>=0;)n[--a]=r[e];return n},hs=function(t,e){var n,r,o=t.length,i=-1;if(null==e){for(;++i<o;)if(null!=(n=t[i])&&n>=n)for(r=n;++i<o;)null!=(n=t[i])&&r>n&&(r=n)}else for(;++i<o;)if(null!=(n=e(t[i],i,t))&&n>=n)for(r=n;++i<o;)null!=(n=e(t[i],i,t))&&r>n&&(r=n);return r},ps=function(t,e){for(var n=e.length,r=new Array(n);n--;)r[n]=t[e[n]];return r},ds=function(t,e){if(n=t.length){var n,r,o=0,i=0,a=t[i];for(null==e&&(e=qc);++o<n;)(e(r=t[o],a)<0||0!==e(a,a))&&(a=r,i=o);return 0===e(a,a)?i:void 0}},gs=function(t,e,n){for(var r,o,i=(null==n?t.length:n)-(e=null==e?0:+e);i;)o=Math.random()*i--|0,r=t[i+e],t[i+e]=t[o+e],t[o+e]=r;return t},vs=function(t,e){var n,r=t.length,o=-1,i=0;if(null==e)for(;++o<r;)(n=+t[o])&&(i+=n);else for(;++o<r;)(n=+e(t[o],o,t))&&(i+=n);return i},bs=function(t){if(!(o=t.length))return[];for(var e=-1,n=hs(t,i),r=new Array(n);++e<n;)for(var o,a=-1,u=r[e]=new Array(o);++a<o;)u[a]=t[a][e];return r},ys=function(){return bs(arguments)},ms=Array.prototype.slice,_s=function(t){return t},xs=1,ws=2,Fs=3,Ms=4,As=1e-6,Es={value:function(){}};v.prototype=g.prototype={constructor:v,on:function(t,e){var n,r=this._,o=b(t+"",r),i=-1,a=o.length;if(!(arguments.length<2)){if(null!=e&&"function"!=typeof e)throw new Error("invalid callback: "+e);for(;++i<a;)if(n=(t=o[i]).type)r[n]=m(r[n],t.name,e);else if(null==e)for(n in r)r[n]=m(r[n],t.name,null);return this}for(;++i<a;)if((n=(t=o[i]).type)&&(n=y(r[n],t.name)))return n},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new v(t)},call:function(t,e){if((n=arguments.length-2)>0)for(var n,r,o=new Array(n),i=0;i<n;++i)o[i]=arguments[i+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(r=this._[t],i=0,n=r.length;i<n;++i)r[i].value.apply(e,o)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],o=0,i=r.length;o<i;++o)r[o].value.apply(e,n)}};var Ts="http://www.w3.org/1999/xhtml",Cs={svg:"http://www.w3.org/2000/svg",xhtml:Ts,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},ks=function(t){var e=t+="",n=e.indexOf(":");return n>=0&&"xmlns"!==(e=t.slice(0,n))&&(t=t.slice(n+1)),Cs.hasOwnProperty(e)?{space:Cs[e],local:t}:t},Ss=function(t){var e=ks(t);return(e.local?x:_)(e)},Ns=0;F.prototype=w.prototype={constructor:F,get:function(t){for(var e=this._;!(e in t);)if(!(t=t.parentNode))return;return t[e]},set:function(t,e){return t[this._]=e},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};var Ds=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var Rs=document.documentElement;if(!Rs.matches){var Ps=Rs.webkitMatchesSelector||Rs.msMatchesSelector||Rs.mozMatchesSelector||Rs.oMatchesSelector;Ds=function(t){return function(){return Ps.call(this,t)}}}}var qs=Ds,Ls={};t.event=null,"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(Ls={mouseenter:"mouseover",mouseleave:"mouseout"}));var Bs=function(t,e,n){var r,o,i=E(t+""),a=i.length;if(!(arguments.length<2)){for(u=e?C:T,null==n&&(n=!1),r=0;r<a;++r)this.each(u(i[r],e,n));return this}var u=this.node().__on;if(u)for(var f,c=0,s=u.length;c<s;++c)for(r=0,f=u[c];r<a;++r)if((o=i[r]).type===f.type&&o.name===f.name)return f.value},js=function(){for(var e,n=t.event;e=n.sourceEvent;)n=e;return n},Os=function(t,e){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=e.clientX,r.y=e.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}var o=t.getBoundingClientRect();return[e.clientX-o.left-t.clientLeft,e.clientY-o.top-t.clientTop]},Is=function(t){var e=js();return e.changedTouches&&(e=e.changedTouches[0]),Os(t,e)},Us=function(t){return null==t?S:function(){return this.querySelector(t)}},zs=function(t){"function"!=typeof t&&(t=Us(t));for(var e=this._groups,n=e.length,r=new Array(n),o=0;o<n;++o)for(var i,a,u=e[o],f=u.length,c=r[o]=new Array(f),s=0;s<f;++s)(i=u[s])&&(a=t.call(i,i.__data__,s,u))&&("__data__"in i&&(a.__data__=i.__data__),c[s]=a);return new gt(r,this._parents)},Hs=function(t){return null==t?N:function(){return this.querySelectorAll(t)}},Ys=function(t){"function"!=typeof t&&(t=Hs(t));for(var e=this._groups,n=e.length,r=[],o=[],i=0;i<n;++i)for(var a,u=e[i],f=u.length,c=0;c<f;++c)(a=u[c])&&(r.push(t.call(a,a.__data__,c,u)),o.push(a));return new gt(r,o)},$s=function(t){"function"!=typeof t&&(t=qs(t));for(var e=this._groups,n=e.length,r=new Array(n),o=0;o<n;++o)for(var i,a=e[o],u=a.length,f=r[o]=[],c=0;c<u;++c)(i=a[c])&&t.call(i,i.__data__,c,a)&&f.push(i);return new gt(r,this._parents)},Ws=function(t){return new Array(t.length)},Xs=function(){return new gt(this._enter||this._groups.map(Ws),this._parents)};D.prototype={constructor:D,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var Vs=function(t){return function(){return t}},Gs="$",Js=function(t,e){if(!t)return p=new Array(this.size()),c=-1,this.each(function(t){p[++c]=t}),p;var n=e?P:R,r=this._parents,o=this._groups;"function"!=typeof t&&(t=Vs(t));for(var i=o.length,a=new Array(i),u=new Array(i),f=new Array(i),c=0;c<i;++c){var s=r[c],l=o[c],h=l.length,p=t.call(s,s&&s.__data__,c,r),d=p.length,g=u[c]=new Array(d),v=a[c]=new Array(d);n(s,l,g,v,f[c]=new Array(h),p,e);for(var b,y,m=0,_=0;m<d;++m)if(b=g[m]){for(m>=_&&(_=m+1);!(y=v[_])&&++_<d;);b._next=y||null}}return a=new gt(a,r),a._enter=u,a._exit=f,a},Zs=function(){return new gt(this._exit||this._groups.map(Ws),this._parents)},Qs=function(t){for(var e=this._groups,n=t._groups,r=e.length,o=n.length,i=Math.min(r,o),a=new Array(r),u=0;u<i;++u)for(var f,c=e[u],s=n[u],l=c.length,h=a[u]=new Array(l),p=0;p<l;++p)(f=c[p]||s[p])&&(h[p]=f);for(;u<r;++u)a[u]=e[u];return new gt(a,this._parents)},Ks=function(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var r,o=t[e],i=o.length-1,a=o[i];--i>=0;)(r=o[i])&&(a&&a!==r.nextSibling&&a.parentNode.insertBefore(r,a),a=r);return this},tl=function(t){function e(e,n){return e&&n?t(e.__data__,n.__data__):!e-!n}t||(t=q);for(var n=this._groups,r=n.length,o=new Array(r),i=0;i<r;++i){for(var a,u=n[i],f=u.length,c=o[i]=new Array(f),s=0;s<f;++s)(a=u[s])&&(c[s]=a);c.sort(e)}return new gt(o,this._parents).order()},el=function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nl=function(){var t=new Array(this.size()),e=-1;return this.each(function(){t[++e]=this}),t},rl=function(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],o=0,i=r.length;o<i;++o){var a=r[o];if(a)return a}return null},ol=function(){var t=0;return this.each(function(){++t}),t},il=function(){return!this.node()},al=function(t){for(var e=this._groups,n=0,r=e.length;n<r;++n)for(var o,i=e[n],a=0,u=i.length;a<u;++a)(o=i[a])&&t.call(o,o.__data__,a,i);return this},ul=function(t,e){var n=ks(t);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((null==e?n.local?B:L:"function"==typeof e?n.local?U:I:n.local?O:j)(n,e))},fl=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView},cl=function(t,e,n){var r;return arguments.length>1?this.each((null==e?z:"function"==typeof e?Y:H)(t,e,null==n?"":n)):fl(r=this.node()).getComputedStyle(r,null).getPropertyValue(t)},sl=function(t,e){return arguments.length>1?this.each((null==e?$:"function"==typeof e?X:W)(t,e)):this.node()[t]};J.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var ll=function(t,e){var n=V(t+"");if(arguments.length<2){for(var r=G(this.node()),o=-1,i=n.length;++o<i;)if(!r.contains(n[o]))return!1;return!0}return this.each(("function"==typeof e?et:e?K:tt)(n,e))},hl=function(t){return arguments.length?this.each(null==t?nt:("function"==typeof t?ot:rt)(t)):this.node().textContent},pl=function(t){return arguments.length?this.each(null==t?it:("function"==typeof t?ut:at)(t)):this.node().innerHTML},dl=function(){return this.each(ft)},gl=function(){return this.each(ct)},vl=function(t){var e="function"==typeof t?t:Ss(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})},bl=function(t,e){var n="function"==typeof t?t:Ss(t),r=null==e?st:"function"==typeof e?e:Us(e);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})},yl=function(){return this.each(lt)},ml=function(t){return arguments.length?this.property("__data__",t):this.node().__data__},_l=function(t,e){return this.each(("function"==typeof e?dt:pt)(t,e))},xl=[null];gt.prototype=vt.prototype={constructor:gt,select:zs,selectAll:Ys,filter:$s,data:Js,enter:Xs,exit:Zs,merge:Qs,order:Ks,sort:tl,call:el,nodes:nl,node:rl,size:ol,empty:il,each:al,attr:ul,style:cl,property:sl,classed:ll,text:hl,html:pl,raise:dl,lower:gl,append:vl,insert:bl,remove:yl,datum:ml,on:Bs,dispatch:_l};var wl=function(t){return"string"==typeof t?new gt([[document.querySelector(t)]],[document.documentElement]):new gt([[t]],xl)},Fl=function(t){return"string"==typeof t?new gt([document.querySelectorAll(t)],[document.documentElement]):new gt([null==t?[]:t],xl)},Ml=function(t,e,n){arguments.length<3&&(n=e,e=js().changedTouches);for(var r,o=0,i=e?e.length:0;o<i;++o)if((r=e[o]).identifier===n)return Os(t,r);return null},Al=function(t,e){null==e&&(e=js().touches);for(var n=0,r=e?e.length:0,o=new Array(r);n<r;++n)o[n]=Os(t,e[n]);return o},El=function(){t.event.preventDefault(),t.event.stopImmediatePropagation()},Tl=function(t){var e=t.document.documentElement,n=wl(t).on("dragstart.drag",El,!0);"onselectstart"in e?n.on("selectstart.drag",El,!0):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")},Cl=function(t){return function(){return t}};mt.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};var kl=function(){function e(t){t.on("mousedown.drag",n).on("touchstart.drag",i).on("touchmove.drag",a).on("touchend.drag touchcancel.drag",u).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function n(){if(!s&&l.apply(this,arguments)){var e=f("mouse",h.apply(this,arguments),Is,this,arguments);e&&(wl(t.event.view).on("mousemove.drag",r,!0).on("mouseup.drag",o,!0),Tl(t.event.view),bt(),c=!1,e("start"))}}function r(){El(),c=!0,d.mouse("drag")}function o(){wl(t.event.view).on("mousemove.drag mouseup.drag",null),yt(t.event.view,c),El(),d.mouse("end")}function i(){if(l.apply(this,arguments)){var e,n,r=t.event.changedTouches,o=h.apply(this,arguments),i=r.length;for(e=0;e<i;++e)(n=f(r[e].identifier,o,Ml,this,arguments))&&(bt(),n("start"))}}function a(){var e,n,r=t.event.changedTouches,o=r.length;for(e=0;e<o;++e)(n=d[r[e].identifier])&&(El(),n("drag"))}function u(){var e,n,r=t.event.changedTouches,o=r.length;for(s&&clearTimeout(s),s=setTimeout(function(){s=null},500),e=0;e<o;++e)(n=d[r[e].identifier])&&(bt(),n("end"))}function f(n,r,o,i,a){var u,f,c,s=o(r,n),l=v.copy();if(k(new mt(e,"beforestart",u,n,b,s[0],s[1],0,0,l),function(){return null!=(t.event.subject=u=p.apply(i,a))&&(f=u.x-s[0]||0,c=u.y-s[1]||0,!0)}))return function t(h){var p,g=s;switch(h){case"start":d[n]=t,p=b++;break;case"end":delete d[n],--b;case"drag":s=o(r,n),p=b}k(new mt(e,h,u,n,p,s[0]+f,s[1]+c,s[0]-g[0],s[1]-g[1],l),l.apply,l,[h,i,a])}}var c,s,l=_t,h=xt,p=wt,d={},v=g("start","drag","end"),b=0;return e.filter=function(t){return arguments.length?(l="function"==typeof t?t:Cl(!!t),e):l},e.container=function(t){return arguments.length?(h="function"==typeof t?t:Cl(t),e):h},e.subject=function(t){return arguments.length?(p="function"==typeof t?t:Cl(t),e):p},e.on=function(){var t=v.on.apply(v,arguments);return t===v?e:t},e},Sl=function(t,e,n){t.prototype=e.prototype=n,n.constructor=t},Nl="\\s*([+-]?\\d+)\\s*",Dl="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",Rl="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Pl=/^#([0-9a-f]{3})$/,ql=/^#([0-9a-f]{6})$/,Ll=new RegExp("^rgb\\("+[Nl,Nl,Nl]+"\\)$"),Bl=new RegExp("^rgb\\("+[Rl,Rl,Rl]+"\\)$"),jl=new RegExp("^rgba\\("+[Nl,Nl,Nl,Dl]+"\\)$"),Ol=new RegExp("^rgba\\("+[Rl,Rl,Rl,Dl]+"\\)$"),Il=new RegExp("^hsl\\("+[Dl,Rl,Rl]+"\\)$"),Ul=new RegExp("^hsla\\("+[Dl,Rl,Rl,Dl]+"\\)$"),zl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Sl(Mt,At,{displayable:function(){return this.rgb().displayable()},toString:function(){return this.rgb()+""}}),Sl(St,kt,Ft(Mt,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new St(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new St(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},toString:function(){var t=this.opacity;return t=isNaN(t)?1:Math.max(0,Math.min(1,t)),(1===t?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}})),Sl(Pt,Rt,Ft(Mt,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new Pt(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new Pt(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*e,o=2*n-r;return new St(qt(t>=240?t-240:t+120,o,r),qt(t,o,r),qt(t<120?t+240:t-120,o,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}));var Hl=Math.PI/180,Yl=180/Math.PI,$l=.95047,Wl=1,Xl=1.08883,Vl=4/29,Gl=6/29,Jl=3*Gl*Gl,Zl=Gl*Gl*Gl;Sl(jt,Bt,Ft(Mt,{brighter:function(t){return new jt(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new jt(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,n=isNaN(this.b)?t:t-this.b/200;return t=Wl*It(t),e=$l*It(e),n=Xl*It(n),new St(Ut(3.2404542*e-1.5371385*t-.4985314*n),Ut(-.969266*e+1.8760108*t+.041556*n),Ut(.0556434*e-.2040259*t+1.0572252*n),this.opacity)}})),Sl($t,Yt,Ft(Mt,{brighter:function(t){return new $t(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new $t(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return Lt(this).rgb()}}));var Ql=1.78277,Kl=-.29227,th=-.90649,eh=1.97294,nh=eh*th,rh=eh*Ql,oh=Ql*Kl- -.14861*th;Sl(Vt,Xt,Ft(Mt,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new Vt(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new Vt(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*Hl,e=+this.l,n=isNaN(this.s)?0:this.s*e*(1-e),r=Math.cos(t),o=Math.sin(t);return new St(255*(e+n*(-.14861*r+Ql*o)),255*(e+n*(Kl*r+th*o)),255*(e+n*(eh*r)),this.opacity)}}));var ih,ah,uh,fh,ch,sh,lh=function(t){var e=t.length-1;return function(n){var r=n<=0?n=0:n>=1?(n=1,e-1):Math.floor(n*e),o=t[r],i=t[r+1],a=r>0?t[r-1]:2*o-i,u=r<e-1?t[r+2]:2*i-o;return Gt((n-r/e)*e,a,o,i,u)}},hh=function(t){var e=t.length;return function(n){var r=Math.floor(((n%=1)<0?++n:n)*e),o=t[(r+e-1)%e],i=t[r%e],a=t[(r+1)%e],u=t[(r+2)%e];return Gt((n-r/e)*e,o,i,a,u)}},ph=function(t){return function(){return t}},dh=function t(e){function n(t,e){var n=r((t=kt(t)).r,(e=kt(e)).r),o=r(t.g,e.g),i=r(t.b,e.b),a=te(t.opacity,e.opacity);return function(e){return t.r=n(e),t.g=o(e),t.b=i(e),t.opacity=a(e),t+""}}var r=Kt(e);return n.gamma=t,n}(1),gh=ee(lh),vh=ee(hh),bh=function(t,e){var n,r=e?e.length:0,o=t?Math.min(r,t.length):0,i=new Array(r),a=new Array(r);for(n=0;n<o;++n)i[n]=Mh(t[n],e[n]);for(;n<r;++n)a[n]=e[n];return function(t){for(n=0;n<o;++n)a[n]=i[n](t);return a}},yh=function(t,e){var n=new Date;return t=+t,e-=t,function(r){return n.setTime(t+e*r),n}},mh=function(t,e){return t=+t,e-=t,function(n){return t+e*n}},_h=function(t,e){var n,r={},o={};null!==t&&"object"==typeof t||(t={}),null!==e&&"object"==typeof e||(e={});for(n in e)n in t?r[n]=Mh(t[n],e[n]):o[n]=e[n];return function(t){for(n in r)o[n]=r[n](t);return o}},xh=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,wh=new RegExp(xh.source,"g"),Fh=function(t,e){var n,r,o,i=xh.lastIndex=wh.lastIndex=0,a=-1,u=[],f=[];for(t+="",e+="";(n=xh.exec(t))&&(r=wh.exec(e));)(o=r.index)>i&&(o=e.slice(i,o),u[a]?u[a]+=o:u[++a]=o),(n=n[0])===(r=r[0])?u[a]?u[a]+=r:u[++a]=r:(u[++a]=null,f.push({i:a,x:mh(n,r)})),i=wh.lastIndex;return i<e.length&&(o=e.slice(i),u[a]?u[a]+=o:u[++a]=o),u.length<2?f[0]?re(f[0].x):ne(e):(e=f.length,function(t){for(var n,r=0;r<e;++r)u[(n=f[r]).i]=n.x(t);return u.join("")})},Mh=function(t,e){var n,r=typeof e;return null==e||"boolean"===r?ph(e):("number"===r?mh:"string"===r?(n=At(e))?(e=n,dh):Fh:e instanceof At?dh:e instanceof Date?yh:Array.isArray(e)?bh:isNaN(e)?_h:mh)(t,e)},Ah=function(t,e){return t=+t,e-=t,function(n){return Math.round(t+e*n)}},Eh=180/Math.PI,Th={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1},Ch=function(t,e,n,r,o,i){var a,u,f;return(a=Math.sqrt(t*t+e*e))&&(t/=a,e/=a),(f=t*n+e*r)&&(n-=t*f,r-=e*f),(u=Math.sqrt(n*n+r*r))&&(n/=u,r/=u,f/=u),t*r<e*n&&(t=-t,e=-e,f=-f,a=-a),{translateX:o,translateY:i,rotate:Math.atan2(e,t)*Eh,skewX:Math.atan(f)*Eh,scaleX:a,scaleY:u}},kh=ae(oe,"px, ","px)","deg)"),Sh=ae(ie,", ",")",")"),Nh=Math.SQRT2,Dh=function(t,e){var n,r,o=t[0],i=t[1],a=t[2],u=e[0],f=e[1],c=e[2],s=u-o,l=f-i,h=s*s+l*l;if(h<1e-12)r=Math.log(c/a)/Nh,n=function(t){return[o+t*s,i+t*l,a*Math.exp(Nh*t*r)]};else{var p=Math.sqrt(h),d=(c*c-a*a+4*h)/(2*a*2*p),g=(c*c-a*a-4*h)/(2*c*2*p),v=Math.log(Math.sqrt(d*d+1)-d),b=Math.log(Math.sqrt(g*g+1)-g);r=(b-v)/Nh,n=function(t){var e=t*r,n=ue(v),u=a/(2*p)*(n*ce(Nh*e+v)-fe(v));return[o+u*s,i+u*l,a*n/ue(Nh*e+v)]}}return n.duration=1e3*r,n},Rh=se(Qt),Ph=se(te),qh=he(Qt),Lh=he(te),Bh=pe(Qt),jh=pe(te),Oh=function(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t(r/(e-1));return n},Ih=0,Uh=0,zh=0,Hh=1e3,Yh=0,$h=0,Wh=0,Xh="object"==typeof performance&&performance.now?performance:Date,Vh="function"==typeof requestAnimationFrame?requestAnimationFrame:function(t){setTimeout(t,17)};ve.prototype=be.prototype={constructor:ve,restart:function(t,e,n){if("function"!=typeof t)throw new TypeError("callback is not a function");n=(null==n?de():+n)+(null==e?0:+e),this._next||sh===this||(sh?sh._next=this:ch=this,sh=this),this._call=t,this._time=n,we()},stop:function(){this._call&&(this._call=null,this._time=1/0,we())}};var Gh=function(t,e,n){var r=new ve;return e=null==e?0:+e,r.restart(function(n){r.stop(),t(n+e)},e,n),r},Jh=function(t,e,n){var r=new ve,o=e;return null==e?(r.restart(t,e,n),r):(e=+e,n=null==n?de():+n,r.restart(function i(a){a+=o,r.restart(i,o+=e,n),t(a)},e,n),r)},Zh=g("start","end","interrupt"),Qh=[],Kh=0,tp=1,ep=2,np=3,rp=4,op=5,ip=6,ap=function(t,e,n,r,o,i){var a=t.__transition;if(a){if(n in a)return}else t.__transition={};Ee(t,n,{name:e,index:r,group:o,on:Zh,tween:Qh,time:i.time,delay:i.delay,duration:i.duration,ease:i.ease,timer:null,state:Kh})},up=function(t,e){var n,r,o,i=t.__transition,a=!0;if(i){e=null==e?null:e+"";for(o in i)(n=i[o]).name===e?(r=n.state>ep&&n.state<op,n.state=ip,n.timer.stop(),r&&n.on.call("interrupt",t,t.__data__,n.index,n.group),delete i[o]):a=!1;a&&delete t.__transition}},fp=function(t){return this.each(function(){up(this,t)})},cp=function(t,e){var n=this._id;if(t+="",arguments.length<2){for(var r,o=Ae(this.node(),n).tween,i=0,a=o.length;i<a;++i)if((r=o[i]).name===t)return r.value;return null}return this.each((null==e?Te:Ce)(n,t,e))},sp=function(t,e){var n;return("number"==typeof e?mh:e instanceof At?dh:(n=At(e))?(e=n,dh):Fh)(t,e)},lp=function(t,e){var n=ks(t),r="transform"===n?Sh:sp;return this.attrTween(t,"function"==typeof e?(n.local?qe:Pe)(n,r,ke(this,"attr."+t,e)):null==e?(n.local?Ne:Se)(n):(n.local?Re:De)(n,r,e+""))},hp=function(t,e){var n="attr."+t;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(null==e)return this.tween(n,null);if("function"!=typeof e)throw new Error;var r=ks(t);return this.tween(n,(r.local?Le:Be)(r,e))},pp=function(t){var e=this._id;return arguments.length?this.each(("function"==typeof t?je:Oe)(e,t)):Ae(this.node(),e).delay},dp=function(t){var e=this._id;return arguments.length?this.each(("function"==typeof t?Ie:Ue)(e,t)):Ae(this.node(),e).duration},gp=function(t){var e=this._id;return arguments.length?this.each(ze(e,t)):Ae(this.node(),e).ease},vp=function(t){"function"!=typeof t&&(t=qs(t));for(var e=this._groups,n=e.length,r=new Array(n),o=0;o<n;++o)for(var i,a=e[o],u=a.length,f=r[o]=[],c=0;c<u;++c)(i=a[c])&&t.call(i,i.__data__,c,a)&&f.push(i);return new Ke(r,this._parents,this._name,this._id)},bp=function(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,n=t._groups,r=e.length,o=n.length,i=Math.min(r,o),a=new Array(r),u=0;u<i;++u)for(var f,c=e[u],s=n[u],l=c.length,h=a[u]=new Array(l),p=0;p<l;++p)(f=c[p]||s[p])&&(h[p]=f);for(;u<r;++u)a[u]=e[u];return new Ke(a,this._parents,this._name,this._id)},yp=function(t,e){var n=this._id;return arguments.length<2?Ae(this.node(),n).on.on(t):this.each(Ye(n,t,e))},mp=function(){return this.on("end.remove",$e(this._id))},_p=function(t){var e=this._name,n=this._id;"function"!=typeof t&&(t=Us(t));for(var r=this._groups,o=r.length,i=new Array(o),a=0;a<o;++a)for(var u,f,c=r[a],s=c.length,l=i[a]=new Array(s),h=0;h<s;++h)(u=c[h])&&(f=t.call(u,u.__data__,h,c))&&("__data__"in u&&(f.__data__=u.__data__),l[h]=f,ap(l[h],e,n,h,l,Ae(u,n)));return new Ke(i,this._parents,e,n)},xp=function(t){var e=this._name,n=this._id;"function"!=typeof t&&(t=Hs(t));for(var r=this._groups,o=r.length,i=[],a=[],u=0;u<o;++u)for(var f,c=r[u],s=c.length,l=0;l<s;++l)if(f=c[l]){for(var h,p=t.call(f,f.__data__,l,c),d=Ae(f,n),g=0,v=p.length;g<v;++g)(h=p[g])&&ap(h,e,n,g,p,d);i.push(p),a.push(f)}return new Ke(i,a,e,n)},wp=vt.prototype.constructor,Fp=function(){return new wp(this._groups,this._parents)},Mp=function(t,e,n){var r="transform"==(t+="")?kh:sp;return null==e?this.styleTween(t,We(t,r)).on("end.style."+t,Xe(t)):this.styleTween(t,"function"==typeof e?Ge(t,r,ke(this,"style."+t,e)):Ve(t,r,e+""),n)},Ap=function(t,e,n){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==e)return this.tween(r,null);if("function"!=typeof e)throw new Error;return this.tween(r,Je(t,e,null==n?"":n))},Ep=function(t){return this.tween("text","function"==typeof t?Qe(ke(this,"text",t)):Ze(null==t?"":t+""))},Tp=function(){for(var t=this._name,e=this._id,n=en(),r=this._groups,o=r.length,i=0;i<o;++i)for(var a,u=r[i],f=u.length,c=0;c<f;++c)if(a=u[c]){var s=Ae(a,e);ap(a,t,n,c,u,{time:s.time+s.delay+s.duration,delay:0,duration:s.duration,ease:s.ease})}return new Ke(r,this._parents,t,n)},Cp=0,kp=vt.prototype;Ke.prototype=tn.prototype={constructor:Ke,select:_p,selectAll:xp,filter:vp,merge:bp,selection:Fp,transition:Tp,call:kp.call,nodes:kp.nodes,node:kp.node,size:kp.size,empty:kp.empty,each:kp.each,on:yp,attr:lp,attrTween:hp,style:Mp,styleTween:Ap,text:Ep,remove:mp,tween:cp,delay:pp,duration:dp,ease:gp};var Sp=function t(e){function n(t){return Math.pow(t,e)}return e=+e,n.exponent=t,n}(3),Np=function t(e){function n(t){return 1-Math.pow(1-t,e)}return e=+e,n.exponent=t,n}(3),Dp=function t(e){function n(t){return((t*=2)<=1?Math.pow(t,e):2-Math.pow(2-t,e))/2}return e=+e,n.exponent=t,n}(3),Rp=Math.PI,Pp=Rp/2,qp=4/11,Lp=6/11,Bp=8/11,jp=.75,Op=9/11,Ip=10/11,Up=.9375,zp=21/22,Hp=63/64,Yp=1/qp/qp,$p=function t(e){function n(t){return t*t*((e+1)*t-e)}return e=+e,n.overshoot=t,n}(1.70158),Wp=function t(e){function n(t){return--t*t*((e+1)*t+e)+1}return e=+e,n.overshoot=t,n}(1.70158),Xp=function t(e){function n(t){return((t*=2)<1?t*t*((e+1)*t-e):(t-=2)*t*((e+1)*t+e)+2)/2}return e=+e,n.overshoot=t,n}(1.70158),Vp=2*Math.PI,Gp=function t(e,n){function r(t){return e*Math.pow(2,10*--t)*Math.sin((o-t)/n)}var o=Math.asin(1/(e=Math.max(1,e)))*(n/=Vp);return r.amplitude=function(e){return t(e,n*Vp)},r.period=function(n){return t(e,n)},r}(1,.3),Jp=function t(e,n){function r(t){return 1-e*Math.pow(2,-10*(t=+t))*Math.sin((t+o)/n)}var o=Math.asin(1/(e=Math.max(1,e)))*(n/=Vp);return r.amplitude=function(e){return t(e,n*Vp)},r.period=function(n){return t(e,n)},r}(1,.3),Zp=function t(e,n){function r(t){return((t=2*t-1)<0?e*Math.pow(2,10*t)*Math.sin((o-t)/n):2-e*Math.pow(2,-10*t)*Math.sin((o+t)/n))/2}var o=Math.asin(1/(e=Math.max(1,e)))*(n/=Vp);return r.amplitude=function(e){return t(e,n*Vp)},r.period=function(n){return t(e,n)},r}(1,.3),Qp={time:null,delay:0,duration:250,ease:cn},Kp=function(t){var e,n;t instanceof Ke?(e=t._id,t=t._name):(e=en(),(n=Qp).time=de(),t=null==t?null:t+"");for(var r=this._groups,o=r.length,i=0;i<o;++i)for(var a,u=r[i],f=u.length,c=0;c<f;++c)(a=u[c])&&ap(a,t,e,c,u,n||wn(a,e));return new Ke(r,this._parents,t,e)};vt.prototype.interrupt=fp,vt.prototype.transition=Kp;var td=[null],ed=function(t,e){var n,r,o=t.__transition;if(o){e=null==e?null:e+"";for(r in o)if((n=o[r]).state>tp&&n.name===e)return new Ke([[t]],td,e,+r)}return null},nd=function(t){return function(){return t}},rd=function(t,e,n){this.target=t,this.type=e,this.selection=n},od=function(){t.event.preventDefault(),t.event.stopImmediatePropagation()},id={name:"drag"},ad={name:"space"},ud={name:"handle"},fd={name:"center"},cd={name:"x",handles:["e","w"].map(Mn),input:function(t,e){return t&&[[t[0],e[0][1]],[t[1],e[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},sd={name:"y",handles:["n","s"].map(Mn),input:function(t,e){return t&&[[e[0][0],t[0]],[e[1][0],t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},ld={name:"xy",handles:["n","e","s","w","nw","ne","se","sw"].map(Mn),input:function(t){return t},output:function(t){return t}},hd={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},pd={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},dd={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},gd={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},vd={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1},bd=function(){return Dn(ld)},yd=Math.cos,md=Math.sin,_d=Math.PI,xd=_d/2,wd=2*_d,Fd=Math.max,Md=function(){function t(t){var i,a,u,f,c,s,l=t.length,h=[],p=Qc(l),d=[],g=[],v=g.groups=new Array(l),b=new Array(l*l);for(i=0,c=-1;++c<l;){for(a=0,s=-1;++s<l;)a+=t[c][s];h.push(a),d.push(Qc(l)),i+=a}for(n&&p.sort(function(t,e){return n(h[t],h[e])}),r&&d.forEach(function(e,n){e.sort(function(e,o){return r(t[n][e],t[n][o])})}),i=Fd(0,wd-e*l)/i,f=i?e:wd/l,a=0,c=-1;++c<l;){for(u=a,s=-1;++s<l;){var y=p[c],m=d[y][s],_=t[y][m],x=a,w=a+=_*i;b[m*l+y]={index:y,subindex:m,startAngle:x,endAngle:w,value:_}}v[y]={index:y,startAngle:u,endAngle:a,value:h[y]},a+=f}for(c=-1;++c<l;)for(s=c-1;++s<l;){var F=b[s*l+c],M=b[c*l+s];(F.value||M.value)&&g.push(F.value<M.value?{source:M,target:F}:{source:F,target:M})}return o?g.sort(o):g}var e=0,n=null,r=null,o=null;return t.padAngle=function(n){return arguments.length?(e=Fd(0,n),t):e},t.sortGroups=function(e){return arguments.length?(n=e,t):n},t.sortSubgroups=function(e){return arguments.length?(r=e,t):r},t.sortChords=function(e){return arguments.length?(null==e?o=null:(o=Rn(e))._=e,t):o&&o._},t},Ad=Array.prototype.slice,Ed=function(t){return function(){return t}},Td=Math.PI,Cd=2*Td,kd=Cd-1e-6;Pn.prototype=qn.prototype={constructor:Pn,moveTo:function(t,e){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,e){this._+="L"+(this._x1=+t)+","+(this._y1=+e)},quadraticCurveTo:function(t,e,n,r){this._+="Q"+ +t+","+ +e+","+(this._x1=+n)+","+(this._y1=+r)},bezierCurveTo:function(t,e,n,r,o,i){this._+="C"+ +t+","+ +e+","+ +n+","+ +r+","+(this._x1=+o)+","+(this._y1=+i)},arcTo:function(t,e,n,r,o){t=+t,e=+e,n=+n,r=+r,o=+o;var i=this._x1,a=this._y1,u=n-t,f=r-e,c=i-t,s=a-e,l=c*c+s*s;if(o<0)throw new Error("negative radius: "+o);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=e);else if(l>1e-6)if(Math.abs(s*u-f*c)>1e-6&&o){var h=n-i,p=r-a,d=u*u+f*f,g=h*h+p*p,v=Math.sqrt(d),b=Math.sqrt(l),y=o*Math.tan((Td-Math.acos((d+l-g)/(2*v*b)))/2),m=y/b,_=y/v;Math.abs(m-1)>1e-6&&(this._+="L"+(t+m*c)+","+(e+m*s)),this._+="A"+o+","+o+",0,0,"+ +(s*h>c*p)+","+(this._x1=t+_*u)+","+(this._y1=e+_*f)}else this._+="L"+(this._x1=t)+","+(this._y1=e)},arc:function(t,e,n,r,o,i){t=+t,e=+e,n=+n;var a=n*Math.cos(r),u=n*Math.sin(r),f=t+a,c=e+u,s=1^i,l=i?r-o:o-r;if(n<0)throw new Error("negative radius: "+n);null===this._x1?this._+="M"+f+","+c:(Math.abs(this._x1-f)>1e-6||Math.abs(this._y1-c)>1e-6)&&(this._+="L"+f+","+c),n&&(l<0&&(l=l%Cd+Cd),l>kd?this._+="A"+n+","+n+",0,1,"+s+","+(t-a)+","+(e-u)+"A"+n+","+n+",0,1,"+s+","+(this._x1=f)+","+(this._y1=c):l>1e-6&&(this._+="A"+n+","+n+",0,"+ +(l>=Td)+","+s+","+(this._x1=t+n*Math.cos(o))+","+(this._y1=e+n*Math.sin(o))))},rect:function(t,e,n,r){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)+"h"+ +n+"v"+ +r+"h"+-n+"Z"},toString:function(){return this._}};var Sd=function(){function t(){var t,u=Ad.call(arguments),f=e.apply(this,u),c=n.apply(this,u),s=+r.apply(this,(u[0]=f,u)),l=o.apply(this,u)-xd,h=i.apply(this,u)-xd,p=s*yd(l),d=s*md(l),g=+r.apply(this,(u[0]=c,u)),v=o.apply(this,u)-xd,b=i.apply(this,u)-xd;if(a||(a=t=qn()),a.moveTo(p,d),a.arc(0,0,s,l,h),l===v&&h===b||(a.quadraticCurveTo(0,0,g*yd(v),g*md(v)),a.arc(0,0,g,v,b)),a.quadraticCurveTo(0,0,p,d),a.closePath(),t)return a=null,t+""||null}var e=Ln,n=Bn,r=jn,o=On,i=In,a=null;return t.radius=function(e){return arguments.length?(r="function"==typeof e?e:Ed(+e),t):r},t.startAngle=function(e){return arguments.length?(o="function"==typeof e?e:Ed(+e),t):o},t.endAngle=function(e){return arguments.length?(i="function"==typeof e?e:Ed(+e),t):i},t.source=function(n){return arguments.length?(e=n,t):e},t.target=function(e){return arguments.length?(n=e,t):n},t.context=function(e){return arguments.length?(a=null==e?null:e,t):a},t};Un.prototype=zn.prototype={constructor:Un,has:function(t){return"$"+t in this},get:function(t){return this["$"+t]},set:function(t,e){return this["$"+t]=e,this},remove:function(t){var e="$"+t;return e in this&&delete this[e]},clear:function(){for(var t in this)"$"===t[0]&&delete this[t]},keys:function(){var t=[];for(var e in this)"$"===e[0]&&t.push(e.slice(1));return t},values:function(){var t=[];for(var e in this)"$"===e[0]&&t.push(this[e]);return t},entries:function(){var t=[];for(var e in this)"$"===e[0]&&t.push({key:e.slice(1),value:this[e]});return t},size:function(){var t=0;for(var e in this)"$"===e[0]&&++t;return t},empty:function(){for(var t in this)if("$"===t[0])return!1;return!0},each:function(t){for(var e in this)"$"===e[0]&&t(this[e],e.slice(1),this)}};var Nd=function(){function t(e,o,a,u){if(o>=i.length)return null!=r?r(e):null!=n?e.sort(n):e;for(var f,c,s,l=-1,h=e.length,p=i[o++],d=zn(),g=a();++l<h;)(s=d.get(f=p(c=e[l])+""))?s.push(c):d.set(f,[c]);return d.each(function(e,n){u(g,n,t(e,o,a,u))}),g}function e(t,n){if(++n>i.length)return t;var o,u=a[n-1];return null!=r&&n>=i.length?o=t.entries():(o=[],t.each(function(t,r){o.push({key:r,values:e(t,n)})})),null!=u?o.sort(function(t,e){return u(t.key,e.key)}):o}var n,r,o,i=[],a=[];return o={object:function(e){return t(e,0,Hn,Yn)},map:function(e){return t(e,0,$n,Wn)},entries:function(n){return e(t(n,0,$n,Wn),0)},key:function(t){return i.push(t),o},sortKeys:function(t){return a[i.length-1]=t,o},sortValues:function(t){return n=t,o},rollup:function(t){return r=t,o}}},Dd=zn.prototype;Xn.prototype=Vn.prototype={constructor:Xn,has:Dd.has,add:function(t){return t+="",this["$"+t]=t,this},remove:Dd.remove,clear:Dd.clear,values:Dd.keys,size:Dd.size,empty:Dd.empty,each:Dd.each};var Rd=function(t){var e=[];for(var n in t)e.push(n);return e},Pd=function(t){var e=[];for(var n in t)e.push(t[n]);return e},qd=function(t){var e=[];for(var n in t)e.push({key:n,value:t[n]});return e},Ld=function(t){function e(t,e){var r,o,i=n(t,function(t,n){if(r)return r(t,n-1);o=t,r=e?Jn(t,e):Gn(t)});return i.columns=o,i}function n(t,e){function n(){if(s>=c)return a;if(o)return o=!1,i;var e,n=s;if(34===t.charCodeAt(n)){for(var r=n;r++<c;)if(34===t.charCodeAt(r)){if(34!==t.charCodeAt(r+1))break;++r}return s=r+2,e=t.charCodeAt(r+1),13===e?(o=!0,10===t.charCodeAt(r+2)&&++s):10===e&&(o=!0),t.slice(n+1,r).replace(/""/g,'"')}for(;s<c;){var u=1;if(10===(e=t.charCodeAt(s++)))o=!0;else if(13===e)o=!0,10===t.charCodeAt(s)&&(++s,++u);else if(e!==f)continue;return t.slice(n,s-u)}return t.slice(n)}for(var r,o,i={},a={},u=[],c=t.length,s=0,l=0;(r=n())!==a;){for(var h=[];r!==i&&r!==a;)h.push(r),r=n();e&&null==(h=e(h,l++))||u.push(h)}return u}function r(e,n){return null==n&&(n=Zn(e)),[n.map(a).join(t)].concat(e.map(function(e){return n.map(function(t){return a(e[t])}).join(t)})).join("\n")}function o(t){return t.map(i).join("\n")}function i(e){return e.map(a).join(t)}function a(t){return null==t?"":u.test(t+="")?'"'+t.replace(/\"/g,'""')+'"':t}var u=new RegExp('["'+t+"\n\r]"),f=t.charCodeAt(0);return{parse:e,parseRows:n,format:r,formatRows:o}},Bd=Ld(","),jd=Bd.parse,Od=Bd.parseRows,Id=Bd.format,Ud=Bd.formatRows,zd=Ld("\t"),Hd=zd.parse,Yd=zd.parseRows,$d=zd.format,Wd=zd.formatRows,Xd=function(t,e){function n(){var n,o,i=r.length,a=0,u=0;for(n=0;n<i;++n)o=r[n],a+=o.x,u+=o.y;for(a=a/i-t,u=u/i-e,n=0;n<i;++n)o=r[n],o.x-=a,o.y-=u}var r;return null==t&&(t=0),null==e&&(e=0),n.initialize=function(t){r=t},n.x=function(e){return arguments.length?(t=+e,n):t},n.y=function(t){return arguments.length?(e=+t,n):e},n},Vd=function(t){return function(){return t}},Gd=function(){return 1e-6*(Math.random()-.5)},Jd=function(t){var e=+this._x.call(null,t),n=+this._y.call(null,t);return Qn(this.cover(e,n),e,n,t)},Zd=function(t,e){if(isNaN(t=+t)||isNaN(e=+e))return this;var n=this._x0,r=this._y0,o=this._x1,i=this._y1;if(isNaN(n))o=(n=Math.floor(t))+1,i=(r=Math.floor(e))+1;else{if(!(n>t||t>o||r>e||e>i))return this;var a,u,f=o-n,c=this._root;switch(u=(e<(r+i)/2)<<1|t<(n+o)/2){case 0:do{a=new Array(4),a[u]=c,c=a}while(f*=2,o=n+f,i=r+f,t>o||e>i);break;case 1:do{a=new Array(4),a[u]=c,c=a}while(f*=2,n=o-f,i=r+f,n>t||e>i);break;case 2:do{a=new Array(4),a[u]=c,c=a}while(f*=2,o=n+f,r=i-f,t>o||r>e);break;case 3:do{a=new Array(4),a[u]=c,c=a}while(f*=2,n=o-f,r=i-f,n>t||r>e)}this._root&&this._root.length&&(this._root=c)}return this._x0=n,this._y0=r,this._x1=o,this._y1=i,this},Qd=function(){var t=[];return this.visit(function(e){if(!e.length)do{t.push(e.data)}while(e=e.next)}),t},Kd=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},tg=function(t,e,n,r,o){this.node=t,this.x0=e,this.y0=n,this.x1=r,this.y1=o},eg=function(t,e,n){var r,o,i,a,u,f,c,s=this._x0,l=this._y0,h=this._x1,p=this._y1,d=[],g=this._root;for(g&&d.push(new tg(g,s,l,h,p)),null==n?n=1/0:(s=t-n,l=e-n,h=t+n,p=e+n,n*=n);f=d.pop();)if(!(!(g=f.node)||(o=f.x0)>h||(i=f.y0)>p||(a=f.x1)<s||(u=f.y1)<l))if(g.length){var v=(o+a)/2,b=(i+u)/2;d.push(new tg(g[3],v,b,a,u),new tg(g[2],o,b,v,u),new tg(g[1],v,i,a,b),new tg(g[0],o,i,v,b)),(c=(e>=b)<<1|t>=v)&&(f=d[d.length-1],d[d.length-1]=d[d.length-1-c],d[d.length-1-c]=f)}else{var y=t-+this._x.call(null,g.data),m=e-+this._y.call(null,g.data),_=y*y+m*m;if(_<n){var x=Math.sqrt(n=_);s=t-x,l=e-x,h=t+x,p=e+x,r=g.data}}return r},ng=function(t){if(isNaN(i=+this._x.call(null,t))||isNaN(a=+this._y.call(null,t)))return this;var e,n,r,o,i,a,u,f,c,s,l,h,p=this._root,d=this._x0,g=this._y0,v=this._x1,b=this._y1;if(!p)return this;if(p.length)for(;;){if((c=i>=(u=(d+v)/2))?d=u:v=u,(s=a>=(f=(g+b)/2))?g=f:b=f,e=p,!(p=p[l=s<<1|c]))return this;if(!p.length)break;(e[l+1&3]||e[l+2&3]||e[l+3&3])&&(n=e,h=l)}for(;p.data!==t;)if(r=p,!(p=p.next))return this;return(o=p.next)&&delete p.next,r?(o?r.next=o:delete r.next,this):e?(o?e[l]=o:delete e[l],(p=e[0]||e[1]||e[2]||e[3])&&p===(e[3]||e[2]||e[1]||e[0])&&!p.length&&(n?n[h]=p:this._root=p),this):(this._root=o,this)},rg=function(){return this._root},og=function(){var t=0;return this.visit(function(e){if(!e.length)do{++t}while(e=e.next)}),t},ig=function(t){var e,n,r,o,i,a,u=[],f=this._root;for(f&&u.push(new tg(f,this._x0,this._y0,this._x1,this._y1));e=u.pop();)if(!t(f=e.node,r=e.x0,o=e.y0,i=e.x1,a=e.y1)&&f.length){var c=(r+i)/2,s=(o+a)/2;(n=f[3])&&u.push(new tg(n,c,s,i,a)),(n=f[2])&&u.push(new tg(n,r,s,c,a)),(n=f[1])&&u.push(new tg(n,c,o,i,s)),(n=f[0])&&u.push(new tg(n,r,o,c,s))}return this},ag=function(t){var e,n=[],r=[];for(this._root&&n.push(new tg(this._root,this._x0,this._y0,this._x1,this._y1));e=n.pop();){var o=e.node;if(o.length){var i,a=e.x0,u=e.y0,f=e.x1,c=e.y1,s=(a+f)/2,l=(u+c)/2;(i=o[0])&&n.push(new tg(i,a,u,s,l)),(i=o[1])&&n.push(new tg(i,s,u,f,l)),(i=o[2])&&n.push(new tg(i,a,l,s,c)),(i=o[3])&&n.push(new tg(i,s,l,f,c))}r.push(e)}for(;e=r.pop();)t(e.node,e.x0,e.y0,e.x1,e.y1);return this},ug=function(t){return arguments.length?(this._x=t,this):this._x},fg=function(t){return arguments.length?(this._y=t,this):this._y},cg=rr.prototype=or.prototype;cg.copy=function(){var t,e,n=new or(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return n;if(!r.length)return n._root=ir(r),n;for(t=[{source:r,target:n._root=new Array(4)}];r=t.pop();)for(var o=0;o<4;++o)(e=r.source[o])&&(e.length?t.push({source:e,target:r.target[o]=new Array(4)}):r.target[o]=ir(e));return n},cg.add=Jd,cg.addAll=Kn,cg.cover=Zd,cg.data=Qd,cg.extent=Kd,cg.find=eg,cg.remove=ng,cg.removeAll=tr,cg.root=rg,cg.size=og,cg.visit=ig,cg.visitAfter=ag,cg.x=ug,cg.y=fg;var sg,lg=function(t){function e(){function t(t,e,n,r,o){var i=t.data,u=t.r,p=l+u;if(!i)return e>c+p||r<c-p||n>s+p||o<s-p;if(i.index>f.index){var d=c-i.x-i.vx,g=s-i.y-i.vy,v=d*d+g*g;v<p*p&&(0===d&&(d=Gd(),v+=d*d),0===g&&(g=Gd(),v+=g*g),v=(p-(v=Math.sqrt(v)))/v*a,f.vx+=(d*=v)*(p=(u*=u)/(h+u)),f.vy+=(g*=v)*p,i.vx-=d*(p=1-p),i.vy-=g*p)}}for(var e,r,f,c,s,l,h,p=o.length,d=0;d<u;++d)for(r=rr(o,ar,ur).visitAfter(n),e=0;e<p;++e)f=o[e],l=i[f.index],h=l*l,c=f.x+f.vx,s=f.y+f.vy,r.visit(t)}function n(t){if(t.data)return t.r=i[t.data.index];for(var e=t.r=0;e<4;++e)t[e]&&t[e].r>t.r&&(t.r=t[e].r)}function r(){if(o){var e,n,r=o.length;for(i=new Array(r),e=0;e<r;++e)n=o[e],i[n.index]=+t(n,e,o)}}var o,i,a=1,u=1;return"function"!=typeof t&&(t=Vd(null==t?1:+t)),e.initialize=function(t){o=t,r()},e.iterations=function(t){return arguments.length?(u=+t,e):u},e.strength=function(t){return arguments.length?(a=+t,e):a},e.radius=function(n){return arguments.length?(t="function"==typeof n?n:Vd(+n),r(),e):t},e},hg=function(t){function e(t){return 1/Math.min(c[t.source.index],c[t.target.index])}function n(e){for(var n=0,r=t.length;n<d;++n)for(var o,i,f,c,l,h,p,g=0;g<r;++g)o=t[g],i=o.source,f=o.target,c=f.x+f.vx-i.x-i.vx||Gd(),l=f.y+f.vy-i.y-i.vy||Gd(),h=Math.sqrt(c*c+l*l),h=(h-u[g])/h*e*a[g],c*=h,l*=h,f.vx-=c*(p=s[g]),f.vy-=l*p,i.vx+=c*(p=1-p),i.vy+=l*p}function r(){if(f){var e,n,r=f.length,h=t.length,p=zn(f,l);for(e=0,c=new Array(r);e<h;++e)n=t[e],n.index=e,"object"!=typeof n.source&&(n.source=cr(p,n.source)),"object"!=typeof n.target&&(n.target=cr(p,n.target)),c[n.source.index]=(c[n.source.index]||0)+1,c[n.target.index]=(c[n.target.index]||0)+1;for(e=0,s=new Array(h);e<h;++e)n=t[e],s[e]=c[n.source.index]/(c[n.source.index]+c[n.target.index]);a=new Array(h),o(),u=new Array(h),i()}}function o(){if(f)for(var e=0,n=t.length;e<n;++e)a[e]=+h(t[e],e,t)}function i(){if(f)for(var e=0,n=t.length;e<n;++e)u[e]=+p(t[e],e,t)}var a,u,f,c,s,l=fr,h=e,p=Vd(30),d=1;return null==t&&(t=[]),n.initialize=function(t){f=t,r()},n.links=function(e){return arguments.length?(t=e,r(),n):t},n.id=function(t){return arguments.length?(l=t,n):l},n.iterations=function(t){return arguments.length?(d=+t,n):d},n.strength=function(t){return arguments.length?(h="function"==typeof t?t:Vd(+t),o(),n):h},n.distance=function(t){return arguments.length?(p="function"==typeof t?t:Vd(+t),i(),n):p},n},pg=10,dg=Math.PI*(3-Math.sqrt(5)),gg=function(t){function e(){n(),p.call("tick",i),a<u&&(h.stop(),p.call("end",i))}function n(){var e,n,r=t.length;for(a+=(c-a)*f,l.each(function(t){t(a)}),e=0;e<r;++e)n=t[e],null==n.fx?n.x+=n.vx*=s:(n.x=n.fx,n.vx=0),null==n.fy?n.y+=n.vy*=s:(n.y=n.fy,n.vy=0)}function r(){for(var e,n=0,r=t.length;n<r;++n){if(e=t[n],e.index=n,isNaN(e.x)||isNaN(e.y)){var o=pg*Math.sqrt(n),i=n*dg;e.x=o*Math.cos(i),e.y=o*Math.sin(i)}(isNaN(e.vx)||isNaN(e.vy))&&(e.vx=e.vy=0)}}function o(e){return e.initialize&&e.initialize(t),e}var i,a=1,u=.001,f=1-Math.pow(u,1/300),c=0,s=.6,l=zn(),h=be(e),p=g("tick","end");return null==t&&(t=[]),r(),i={tick:n,restart:function(){return h.restart(e),i},stop:function(){return h.stop(),i},nodes:function(e){return arguments.length?(t=e,r(),l.each(o),i):t},alpha:function(t){return arguments.length?(a=+t,i):a},alphaMin:function(t){return arguments.length?(u=+t,i):u},alphaDecay:function(t){return arguments.length?(f=+t,i):+f},alphaTarget:function(t){return arguments.length?(c=+t,i):c},velocityDecay:function(t){return arguments.length?(s=1-t,i):1-s},force:function(t,e){return arguments.length>1?(null==e?l.remove(t):l.set(t,o(e)),i):l.get(t)},find:function(e,n,r){var o,i,a,u,f,c=0,s=t.length;for(null==r?r=1/0:r*=r,c=0;c<s;++c)u=t[c],o=e-u.x,i=n-u.y,(a=o*o+i*i)<r&&(f=u,r=a);return f},on:function(t,e){return arguments.length>1?(p.on(t,e),i):p.on(t)}}},vg=function(){function t(t){var e,u=o.length,f=rr(o,sr,lr).visitAfter(n);for(a=t,e=0;e<u;++e)i=o[e],f.visit(r)}function e(){if(o){var t,e,n=o.length;for(u=new Array(n),t=0;t<n;++t)e=o[t],u[e.index]=+f(e,t,o)}}function n(t){var e,n,r,o,i,a=0;if(t.length){for(r=o=i=0;i<4;++i)(e=t[i])&&(n=e.value)&&(a+=n,r+=n*e.x,o+=n*e.y);t.x=r/a,t.y=o/a}else{e=t,e.x=e.data.x,e.y=e.data.y;do{a+=u[e.data.index]}while(e=e.next)}t.value=a}function r(t,e,n,r){if(!t.value)return!0;var o=t.x-i.x,f=t.y-i.y,h=r-e,p=o*o+f*f;if(h*h/l<p)return p<s&&(0===o&&(o=Gd(),p+=o*o),0===f&&(f=Gd(),p+=f*f),p<c&&(p=Math.sqrt(c*p)),i.vx+=o*t.value*a/p,i.vy+=f*t.value*a/p),!0;if(!(t.length||p>=s)){(t.data!==i||t.next)&&(0===o&&(o=Gd(),p+=o*o),0===f&&(f=Gd(),p+=f*f),p<c&&(p=Math.sqrt(c*p)));do{t.data!==i&&(h=u[t.data.index]*a/p,i.vx+=o*h,i.vy+=f*h)}while(t=t.next)}}var o,i,a,u,f=Vd(-30),c=1,s=1/0,l=.81;return t.initialize=function(t){o=t,e()},t.strength=function(n){return arguments.length?(f="function"==typeof n?n:Vd(+n),e(),t):f},t.distanceMin=function(e){return arguments.length?(c=e*e,t):Math.sqrt(c)},t.distanceMax=function(e){return arguments.length?(s=e*e,t):Math.sqrt(s)},t.theta=function(e){return arguments.length?(l=e*e,t):Math.sqrt(l)},t},bg=function(t){function e(t){for(var e,n=0,a=r.length;n<a;++n)e=r[n],e.vx+=(i[n]-e.x)*o[n]*t}function n(){if(r){var e,n=r.length;for(o=new Array(n),i=new Array(n),e=0;e<n;++e)o[e]=isNaN(i[e]=+t(r[e],e,r))?0:+a(r[e],e,r)}}var r,o,i,a=Vd(.1);return"function"!=typeof t&&(t=Vd(null==t?0:+t)),e.initialize=function(t){r=t,n()},e.strength=function(t){return arguments.length?(a="function"==typeof t?t:Vd(+t),n(),e):a},e.x=function(r){return arguments.length?(t="function"==typeof r?r:Vd(+r),n(),e):t},e},yg=function(t){function e(t){for(var e,n=0,a=r.length;n<a;++n)e=r[n],e.vy+=(i[n]-e.y)*o[n]*t}function n(){if(r){var e,n=r.length;for(o=new Array(n),i=new Array(n),e=0;e<n;++e)o[e]=isNaN(i[e]=+t(r[e],e,r))?0:+a(r[e],e,r)}}var r,o,i,a=Vd(.1);return"function"!=typeof t&&(t=Vd(null==t?0:+t)),e.initialize=function(t){r=t,n()},e.strength=function(t){return arguments.length?(a="function"==typeof t?t:Vd(+t),n(),e):a},e.y=function(r){return arguments.length?(t="function"==typeof r?r:Vd(+r),n(),e):t},e},mg=function(t,e){if((n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var n,r=t.slice(0,n);return[r.length>1?r[0]+r.slice(2):r,+t.slice(n+1)]},_g=function(t){return t=mg(Math.abs(t)),t?t[1]:NaN},xg=function(t,e){return function(n,r){for(var o=n.length,i=[],a=0,u=t[0],f=0;o>0&&u>0&&(f+u+1>r&&(u=Math.max(1,r-f)),i.push(n.substring(o-=u,o+u)),!((f+=u+1)>r));)u=t[a=(a+1)%t.length];return i.reverse().join(e)}},wg=function(t){return function(e){return e.replace(/[0-9]/g,function(e){return t[+e]})}},Fg=function(t,e){t=t.toPrecision(e);t:for(var n,r=t.length,o=1,i=-1;o<r;++o)switch(t[o]){case".":i=n=o;break;case"0":0===i&&(i=o),n=o;break;case"e":break t;default:i>0&&(i=0)}return i>0?t.slice(0,i)+t.slice(n+1):t},Mg=function(t,e){var n=mg(t,e);if(!n)return t+"";var r=n[0],o=n[1],i=o-(sg=3*Math.max(-8,Math.min(8,Math.floor(o/3))))+1,a=r.length;return i===a?r:i>a?r+new Array(i-a+1).join("0"):i>0?r.slice(0,i)+"."+r.slice(i):"0."+new Array(1-i).join("0")+mg(t,Math.max(0,e+i-1))[0]},Ag=function(t,e){var n=mg(t,e);if(!n)return t+"";var r=n[0],o=n[1];return o<0?"0."+new Array(-o).join("0")+r:r.length>o+1?r.slice(0,o+1)+"."+r.slice(o+1):r+new Array(o-r.length+2).join("0")},Eg={"":Fg,"%":function(t,e){return(100*t).toFixed(e)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.round(t).toString(10)},e:function(t,e){return t.toExponential(e)},f:function(t,e){return t.toFixed(e)},g:function(t,e){return t.toPrecision(e)},o:function(t){return Math.round(t).toString(8)},p:function(t,e){return Ag(100*t,e)},r:Ag,s:Mg,X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}},Tg=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;hr.prototype=pr.prototype,pr.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+this.type};var Cg,kg=function(t){return t},Sg=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"],Ng=function(t){function e(t){function e(t){var e,o,u,s=v,_=b;if("c"===g)_=y(t)+_,t="";else{t=+t;var x=t<0;if(t=y(Math.abs(t),d),x&&0==+t&&(x=!1),s=(x?"("===c?c:"-":"-"===c||"("===c?"":c)+s,_=_+("s"===g?Sg[8+sg/3]:"")+(x&&"("===c?")":""),m)for(e=-1,o=t.length;++e<o;)if(48>(u=t.charCodeAt(e))||u>57){_=(46===u?i+t.slice(e+1):t.slice(e))+_,t=t.slice(0,e);break}}p&&!l&&(t=r(t,1/0));var w=s.length+t.length+_.length,F=w<h?new Array(h-w+1).join(n):"";switch(p&&l&&(t=r(F+t,F.length?h-_.length:1/0),F=""),f){case"<":t=s+t+_+F;break;case"=":t=s+F+t+_;break;case"^":t=F.slice(0,w=F.length>>1)+s+t+_+F.slice(w);break;default:t=F+s+t+_}return a(t)}t=hr(t);var n=t.fill,f=t.align,c=t.sign,s=t.symbol,l=t.zero,h=t.width,p=t.comma,d=t.precision,g=t.type,v="$"===s?o[0]:"#"===s&&/[boxX]/.test(g)?"0"+g.toLowerCase():"",b="$"===s?o[1]:/[%p]/.test(g)?u:"",y=Eg[g],m=!g||/[defgprs%]/.test(g);return d=null==d?g?6:12:/[gprs]/.test(g)?Math.max(1,Math.min(21,d)):Math.max(0,Math.min(20,d)),e.toString=function(){return t+""},e}function n(t,n){var r=e((t=hr(t),t.type="f",t)),o=3*Math.max(-8,Math.min(8,Math.floor(_g(n)/3))),i=Math.pow(10,-o),a=Sg[8+o/3];return function(t){return r(i*t)+a}}var r=t.grouping&&t.thousands?xg(t.grouping,t.thousands):kg,o=t.currency,i=t.decimal,a=t.numerals?wg(t.numerals):kg,u=t.percent||"%";return{format:e,formatPrefix:n}};dr({decimal:".",thousands:",",grouping:[3],currency:["$",""]});var Dg=function(t){return Math.max(0,-_g(Math.abs(t)))},Rg=function(t,e){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(_g(e)/3)))-_g(Math.abs(t)))},Pg=function(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,_g(e)-_g(t))+1},qg=function(){return new gr};gr.prototype={constructor:gr,reset:function(){this.s=this.t=0},add:function(t){vr(pv,t,this.t),vr(this,pv.s,this.s),this.s?this.t+=pv.t:this.s=pv.t},valueOf:function(){return this.s}};var Lg,Bg,jg,Og,Ig,Ug,zg,Hg,Yg,$g,Wg,Xg,Vg,Gg,Jg,Zg,Qg,Kg,tv,ev,nv,rv,ov,iv,av,uv,fv,cv,sv,lv,hv,pv=new gr,dv=1e-6,gv=Math.PI,vv=gv/2,bv=gv/4,yv=2*gv,mv=180/gv,_v=gv/180,xv=Math.abs,wv=Math.atan,Fv=Math.atan2,Mv=Math.cos,Av=Math.ceil,Ev=Math.exp,Tv=Math.log,Cv=Math.pow,kv=Math.sin,Sv=Math.sign||function(t){return t>0?1:t<0?-1:0},Nv=Math.sqrt,Dv=Math.tan,Rv={Feature:function(t,e){xr(t.geometry,e)},FeatureCollection:function(t,e){for(var n=t.features,r=-1,o=n.length;++r<o;)xr(n[r].geometry,e)}},Pv={Sphere:function(t,e){e.sphere()},Point:function(t,e){t=t.coordinates,e.point(t[0],t[1],t[2])},MultiPoint:function(t,e){for(var n=t.coordinates,r=-1,o=n.length;++r<o;)t=n[r],e.point(t[0],t[1],t[2])},LineString:function(t,e){wr(t.coordinates,e,0)},MultiLineString:function(t,e){for(var n=t.coordinates,r=-1,o=n.length;++r<o;)wr(n[r],e,0)},Polygon:function(t,e){Fr(t.coordinates,e)},MultiPolygon:function(t,e){for(var n=t.coordinates,r=-1,o=n.length;++r<o;)Fr(n[r],e)},GeometryCollection:function(t,e){for(var n=t.geometries,r=-1,o=n.length;++r<o;)xr(n[r],e)}},qv=function(t,e){t&&Rv.hasOwnProperty(t.type)?Rv[t.type](t,e):xr(t,e)},Lv=qg(),Bv=qg(),jv={point:_r,lineStart:_r,lineEnd:_r,polygonStart:function(){Lv.reset(),jv.lineStart=Mr,jv.lineEnd=Ar},polygonEnd:function(){var t=+Lv;Bv.add(t<0?yv+t:t),this.lineStart=this.lineEnd=this.point=_r},sphere:function(){Bv.add(yv)}},Ov=function(t){return Bv.reset(),qv(t,jv),2*Bv},Iv=qg(),Uv={point:qr,lineStart:Br,lineEnd:jr,polygonStart:function(){Uv.point=Or,Uv.lineStart=Ir,Uv.lineEnd=Ur,Iv.reset(),jv.polygonStart()},polygonEnd:function(){jv.polygonEnd(),Uv.point=qr,Uv.lineStart=Br,Uv.lineEnd=jr,Lv<0?(Ug=-(Hg=180),zg=-(Yg=90)):Iv>dv?Yg=90:Iv<-dv&&(zg=-90),Jg[0]=Ug,Jg[1]=Hg}},zv=function(t){var e,n,r,o,i,a,u;if(Yg=Hg=-(Ug=zg=1/0),Gg=[],qv(t,Uv),n=Gg.length){for(Gg.sort(Hr),e=1,r=Gg[0],i=[r];e<n;++e)o=Gg[e],Yr(r,o[0])||Yr(r,o[1])?(zr(r[0],o[1])>zr(r[0],r[1])&&(r[1]=o[1]),zr(o[0],r[1])>zr(r[0],r[1])&&(r[0]=o[0])):i.push(r=o);for(a=-1/0,n=i.length-1,e=0,r=i[n];e<=n;r=o,++e)o=i[e],(u=zr(r[1],o[0]))>a&&(a=u,Ug=o[0],Hg=r[1])}return Gg=Jg=null,Ug===1/0||zg===1/0?[[NaN,NaN],[NaN,NaN]]:[[Ug,zg],[Hg,Yg]]},Hv={sphere:_r,point:$r,lineStart:Xr,lineEnd:Jr,polygonStart:function(){Hv.lineStart=Zr,Hv.lineEnd=Qr},polygonEnd:function(){Hv.lineStart=Xr,Hv.lineEnd=Jr}},Yv=function(t){Zg=Qg=Kg=tv=ev=nv=rv=ov=iv=av=uv=0,qv(t,Hv);var e=iv,n=av,r=uv,o=e*e+n*n+r*r;return o<1e-12&&(e=nv,n=rv,r=ov,Qg<dv&&(e=Kg,n=tv,r=ev),(o=e*e+n*n+r*r)<1e-12)?[NaN,NaN]:[Fv(n,e)*mv,yr(r/Nv(o))*mv]},$v=function(t){return function(){return t}},Wv=function(t,e){function n(n,r){return n=t(n,r),e(n[0],n[1])}return t.invert&&e.invert&&(n.invert=function(n,r){return(n=e.invert(n,r))&&t.invert(n[0],n[1])}),n};eo.invert=eo;var Xv,Vv,Gv,Jv,Zv,Qv,Kv,tb,eb,nb,rb,ob=function(t){function e(e){return e=t(e[0]*_v,e[1]*_v),e[0]*=mv,e[1]*=mv,e}return t=no(t[0]*_v,t[1]*_v,t.length>2?t[2]*_v:0),e.invert=function(e){return e=t.invert(e[0]*_v,e[1]*_v),e[0]*=mv,e[1]*=mv,e},e},ib=function(){function t(t,e){n.push(t=r(t,e)),t[0]*=mv,t[1]*=mv}function e(){var t=o.apply(this,arguments),e=i.apply(this,arguments)*_v,f=a.apply(this,arguments)*_v;return n=[],r=no(-t[0]*_v,-t[1]*_v,0).invert,ao(u,e,f,1),t={type:"Polygon",coordinates:[n]},n=r=null,t}var n,r,o=$v([0,0]),i=$v(90),a=$v(6),u={point:t};return e.center=function(t){return arguments.length?(o="function"==typeof t?t:$v([+t[0],+t[1]]),e):o},e.radius=function(t){return arguments.length?(i="function"==typeof t?t:$v(+t),e):i},e.precision=function(t){return arguments.length?(a="function"==typeof t?t:$v(+t),e):a},e},ab=function(){var t,e=[];return{point:function(e,n){t.push([e,n])},lineStart:function(){e.push(t=[])},lineEnd:_r,rejoin:function(){e.length>1&&e.push(e.pop().concat(e.shift()))},result:function(){var n=e;return e=[],t=null,n}}},ub=function(t,e,n,r,o,i){var a,u=t[0],f=t[1],c=e[0],s=e[1],l=0,h=1,p=c-u,d=s-f;if(a=n-u,p||!(a>0)){if(a/=p,p<0){if(a<l)return;a<h&&(h=a)}else if(p>0){if(a>h)return;a>l&&(l=a)}if(a=o-u,p||!(a<0)){if(a/=p,p<0){if(a>h)return;a>l&&(l=a)}else if(p>0){if(a<l)return;a<h&&(h=a)}if(a=r-f,d||!(a>0)){if(a/=d,d<0){if(a<l)return;a<h&&(h=a)}else if(d>0){if(a>h)return;a>l&&(l=a)}if(a=i-f,d||!(a<0)){if(a/=d,d<0){if(a>h)return;a>l&&(l=a)}else if(d>0){if(a<l)return;a<h&&(h=a)}return l>0&&(t[0]=u+l*p,t[1]=f+l*d),h<1&&(e[0]=u+h*p,e[1]=f+h*d),!0}}}}},fb=function(t,e){return xv(t[0]-e[0])<dv&&xv(t[1]-e[1])<dv},cb=function(t,e,n,r,o){var i,a,u=[],f=[];if(t.forEach(function(t){if(!((e=t.length-1)<=0)){var e,n,r=t[0],a=t[e];if(fb(r,a)){for(o.lineStart(),i=0;i<e;++i)o.point((r=t[i])[0],r[1]);return void o.lineEnd()}u.push(n=new fo(r,t,null,!0)),f.push(n.o=new fo(r,null,n,!1)),u.push(n=new fo(a,t,null,!1)),f.push(n.o=new fo(a,null,n,!0))}}),u.length){for(f.sort(e),co(u),co(f),i=0,a=f.length;i<a;++i)f[i].e=n=!n;for(var c,s,l=u[0];;){for(var h=l,p=!0;h.v;)if((h=h.n)===l)return;c=h.z,o.lineStart();do{if(h.v=h.o.v=!0,h.e){if(p)for(i=0,a=c.length;i<a;++i)o.point((s=c[i])[0],s[1]);else r(h.x,h.n.x,1,o);h=h.n}else{if(p)for(c=h.p.z,i=c.length-1;i>=0;--i)o.point((s=c[i])[0],s[1]);else r(h.x,h.p.x,-1,o);h=h.p}h=h.o,c=h.z,p=!p}while(!h.v);o.lineEnd()}}},sb=1e9,lb=-sb,hb=function(){var t,e,n,r=0,o=0,i=960,a=500;return n={stream:function(n){return t&&e===n?t:t=so(r,o,i,a)(e=n)},extent:function(u){return arguments.length?(r=+u[0][0],o=+u[0][1],i=+u[1][0],a=+u[1][1],t=e=null,n):[[r,o],[i,a]]}}},pb=qg(),db=function(t,e){var n=e[0],r=e[1],o=[kv(n),-Mv(n),0],i=0,a=0;pb.reset();for(var u=0,f=t.length;u<f;++u)if(s=(c=t[u]).length)for(var c,s,l=c[s-1],h=l[0],p=l[1]/2+bv,d=kv(p),g=Mv(p),v=0;v<s;++v,h=y,d=_,g=x,l=b){var b=c[v],y=b[0],m=b[1]/2+bv,_=kv(m),x=Mv(m),w=y-h,F=w>=0?1:-1,M=F*w,A=M>gv,E=d*_;if(pb.add(Fv(E*F*kv(M),g*x+E*Mv(M))),i+=A?w+F*yv:w,A^h>=n^y>=n){var T=Nr(kr(l),kr(b));Pr(T);var C=Nr(o,T);Pr(C);var k=(A^w>=0?-1:1)*yr(C[2]);(r>k||r===k&&(T[0]||T[1]))&&(a+=A^w>=0?1:-1)}}return(i<-dv||i<dv&&pb<-dv)^1&a},gb=qg(),vb={sphere:_r,point:_r,lineStart:lo,lineEnd:_r,polygonStart:_r,polygonEnd:_r},bb=function(t){return gb.reset(),qv(t,vb),+gb},yb=[null,null],mb={type:"LineString",coordinates:yb},_b=function(t,e){return yb[0]=t,yb[1]=e,bb(mb)},xb={Feature:function(t,e){return vo(t.geometry,e)},FeatureCollection:function(t,e){for(var n=t.features,r=-1,o=n.length;++r<o;)if(vo(n[r].geometry,e))return!0;return!1}},wb={Sphere:function(){return!0},Point:function(t,e){return bo(t.coordinates,e)},MultiPoint:function(t,e){for(var n=t.coordinates,r=-1,o=n.length;++r<o;)if(bo(n[r],e))return!0;return!1},LineString:function(t,e){return yo(t.coordinates,e)},MultiLineString:function(t,e){for(var n=t.coordinates,r=-1,o=n.length;++r<o;)if(yo(n[r],e))return!0;return!1},Polygon:function(t,e){return mo(t.coordinates,e)},MultiPolygon:function(t,e){for(var n=t.coordinates,r=-1,o=n.length;++r<o;)if(mo(n[r],e))return!0;return!1},GeometryCollection:function(t,e){for(var n=t.geometries,r=-1,o=n.length;++r<o;)if(vo(n[r],e))return!0;return!1}},Fb=function(t,e){return(t&&xb.hasOwnProperty(t.type)?xb[t.type]:vo)(t,e)},Mb=function(t,e){var n=t[0]*_v,r=t[1]*_v,o=e[0]*_v,i=e[1]*_v,a=Mv(r),u=kv(r),f=Mv(i),c=kv(i),s=a*Mv(n),l=a*kv(n),h=f*Mv(o),p=f*kv(o),d=2*yr(Nv(mr(i-r)+a*f*mr(o-n))),g=kv(d),v=d?function(t){var e=kv(t*=d)/g,n=kv(d-t)/g,r=n*s+e*h,o=n*l+e*p,i=n*u+e*c;return[Fv(o,r)*mv,Fv(i,Nv(r*r+o*o))*mv]}:function(){return[n*mv,r*mv]};return v.distance=d,v},Ab=function(t){return t},Eb=qg(),Tb=qg(),Cb={point:_r,lineStart:_r,lineEnd:_r,polygonStart:function(){Cb.lineStart=Eo,Cb.lineEnd=ko},polygonEnd:function(){Cb.lineStart=Cb.lineEnd=Cb.point=_r,Eb.add(xv(Tb)),Tb.reset()},result:function(){var t=Eb/2;return Eb.reset(),t}},kb=1/0,Sb=kb,Nb=-kb,Db=Nb,Rb={point:So,lineStart:_r,lineEnd:_r,polygonStart:_r,polygonEnd:_r,result:function(){var t=[[kb,Sb],[Nb,Db]];return Nb=Db=-(Sb=kb=1/0),t}},Pb=0,qb=0,Lb=0,Bb=0,jb=0,Ob=0,Ib=0,Ub=0,zb=0,Hb={point:No,lineStart:Do,lineEnd:qo,polygonStart:function(){Hb.lineStart=Lo,Hb.lineEnd=Bo},polygonEnd:function(){Hb.point=No,Hb.lineStart=Do,Hb.lineEnd=qo},result:function(){var t=zb?[Ib/zb,Ub/zb]:Ob?[Bb/Ob,jb/Ob]:Lb?[Pb/Lb,qb/Lb]:[NaN,NaN];return Pb=qb=Lb=Bb=jb=Ob=Ib=Ub=zb=0,t}};Io.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,e){switch(this._point){case 0:this._context.moveTo(t,e),this._point=1;break;case 1:this._context.lineTo(t,e);break;default:this._context.moveTo(t+this._radius,e),this._context.arc(t,e,this._radius,0,yv)}},result:_r};var Yb,$b,Wb,Xb,Vb,Gb=qg(),Jb={point:_r,lineStart:function(){Jb.point=Uo},lineEnd:function(){Yb&&zo($b,Wb),Jb.point=_r},polygonStart:function(){Yb=!0},polygonEnd:function(){Yb=null},result:function(){var t=+Gb;return Gb.reset(),t}};Ho.prototype={_circle:Yo(4.5),pointRadius:function(t){return this._circle=Yo(t),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,e){switch(this._point){case 0:this._string.push("M",t,",",e),this._point=1;break;case 1:this._string.push("L",t,",",e);break;default:this._string.push("M",t,",",e,this._circle)}},result:function(){if(this._string.length){var t=this._string.join("");return this._string=[],t}}};var Zb=function(t,e){function n(t){return t&&("function"==typeof i&&o.pointRadius(+i.apply(this,arguments)),qv(t,r(o))),o.result()}var r,o,i=4.5;return n.area=function(t){return qv(t,r(Cb)),Cb.result()},n.measure=function(t){return qv(t,r(Jb)),Jb.result()},n.bounds=function(t){return qv(t,r(Rb)),Rb.result()},n.centroid=function(t){return qv(t,r(Hb)),Hb.result()},n.projection=function(e){return arguments.length?(r=null==e?(t=null,Ab):(t=e).stream,n):t},n.context=function(t){return arguments.length?(o=null==t?(e=null,new Ho):new Io(e=t),"function"!=typeof i&&o.pointRadius(i),n):e},n.pointRadius=function(t){return arguments.length?(i="function"==typeof t?t:(o.pointRadius(+t),+t),n):i},n.projection(t).context(e)},Qb=function(t,e,n,r){return function(o,i){function a(e,n){var r=o(e,n);t(e=r[0],n=r[1])&&i.point(e,n)}function u(t,e){var n=o(t,e);v.point(n[0],n[1])}function f(){x.point=u,v.lineStart()}function c(){x.point=a,v.lineEnd()}function s(t,e){g.push([t,e]);var n=o(t,e);m.point(n[0],n[1])}function l(){m.lineStart(),g=[]}function h(){s(g[0][0],g[0][1]),m.lineEnd();var t,e,n,r,o=m.clean(),a=y.result(),u=a.length;if(g.pop(),p.push(g),g=null,u)if(1&o){if(n=a[0],(e=n.length-1)>0){for(_||(i.polygonStart(),_=!0),i.lineStart(),t=0;t<e;++t)i.point((r=n[t])[0],r[1]);i.lineEnd()}}else u>1&&2&o&&a.push(a.pop().concat(a.shift())),d.push(a.filter($o))}var p,d,g,v=e(i),b=o.invert(r[0],r[1]),y=ab(),m=e(y),_=!1,x={point:a,lineStart:f,lineEnd:c,polygonStart:function(){x.point=s,x.lineStart=l,x.lineEnd=h,d=[],p=[]},polygonEnd:function(){x.point=a,x.lineStart=f,x.lineEnd=c,d=ls(d);var t=db(p,b);d.length?(_||(i.polygonStart(),_=!0),cb(d,Wo,t,n,i)):t&&(_||(i.polygonStart(),_=!0),i.lineStart(),n(null,null,1,i),i.lineEnd()),_&&(i.polygonEnd(),_=!1),d=p=null},sphere:function(){i.polygonStart(),i.lineStart(),n(null,null,1,i),i.lineEnd(),i.polygonEnd()}};return x}},Kb=Qb(function(){return!0},Xo,Go,[-gv,-vv]),ty=function(t,e){function n(n,r,o,i){ao(i,t,e,o,n,r)}function r(t,e){return Mv(t)*Mv(e)>u}function o(t){var e,n,o,u,s;return{lineStart:function(){u=o=!1,s=1},point:function(l,h){var p,d=[l,h],g=r(l,h),v=f?g?0:a(l,h):g?a(l+(l<0?gv:-gv),h):0;if(!e&&(u=o=g)&&t.lineStart(),g!==o&&(p=i(e,d),(fb(e,p)||fb(d,p))&&(d[0]+=dv,d[1]+=dv,g=r(d[0],d[1]))),g!==o)s=0,g?(t.lineStart(),p=i(d,e),t.point(p[0],p[1])):(p=i(e,d),t.point(p[0],p[1]),t.lineEnd()),e=p;else if(c&&e&&f^g){var b;v&n||!(b=i(d,e,!0))||(s=0,f?(t.lineStart(),t.point(b[0][0],b[0][1]),t.point(b[1][0],b[1][1]),t.lineEnd()):(t.point(b[1][0],b[1][1]),t.lineEnd(),t.lineStart(),t.point(b[0][0],b[0][1])))}!g||e&&fb(e,d)||t.point(d[0],d[1]),e=d,o=g,n=v},lineEnd:function(){o&&t.lineEnd(),e=null},clean:function(){return s|(u&&o)<<1}}}function i(t,e,n){var r=kr(t),o=kr(e),i=[1,0,0],a=Nr(r,o),f=Sr(a,a),c=a[0],s=f-c*c;if(!s)return!n&&t;var l=u*f/s,h=-u*c/s,p=Nr(i,a),d=Rr(i,l);Dr(d,Rr(a,h));var g=p,v=Sr(d,g),b=Sr(g,g),y=v*v-b*(Sr(d,d)-1);if(!(y<0)){var m=Nv(y),_=Rr(g,(-v-m)/b);if(Dr(_,d),_=Cr(_),!n)return _;var x,w=t[0],F=e[0],M=t[1],A=e[1];F<w&&(x=w,w=F,F=x);var E=F-w,T=xv(E-gv)<dv,C=T||E<dv;if(!T&&A<M&&(x=M,M=A,A=x),C?T?M+A>0^_[1]<(xv(_[0]-w)<dv?M:A):M<=_[1]&&_[1]<=A:E>gv^(w<=_[0]&&_[0]<=F)){var k=Rr(g,(-v+m)/b);return Dr(k,d),[_,Cr(k)]}}}function a(e,n){var r=f?t:gv-t,o=0;return e<-r?o|=1:e>r&&(o|=2),n<-r?o|=4:n>r&&(o|=8),o}var u=Mv(t),f=u>0,c=xv(u)>dv;return Qb(r,o,n,f?[0,-t]:[-gv,t-gv])},ey=function(t){return{stream:Jo(t)}};Zo.prototype={constructor:Zo,point:function(t,e){this.stream.point(t,e)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var ny=16,ry=Mv(30*_v),oy=function(t,e){return+e?ei(t,e):ti(t)},iy=Jo({point:function(t,e){this.stream.point(t*_v,e*_v)}}),ay=function(){return oi(ai).scale(155.424).center([0,33.6442])},uy=function(){return ay().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])},fy=function(){function t(t){var e=t[0],n=t[1];return u=null,o.point(e,n),u||(i.point(e,n),u)||(a.point(e,n),u)}function e(){return n=r=null,t}var n,r,o,i,a,u,f=uy(),c=ay().rotate([154,0]).center([-2,58.5]).parallels([55,65]),s=ay().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l={point:function(t,e){u=[t,e]}};return t.invert=function(t){var e=f.scale(),n=f.translate(),r=(t[0]-n[0])/e,o=(t[1]-n[1])/e;return(o>=.12&&o<.234&&r>=-.425&&r<-.214?c:o>=.166&&o<.234&&r>=-.214&&r<-.115?s:f).invert(t)},t.stream=function(t){return n&&r===t?n:n=ui([f.stream(r=t),c.stream(t),s.stream(t)])},t.precision=function(t){return arguments.length?(f.precision(t),c.precision(t),s.precision(t),e()):f.precision()},t.scale=function(e){return arguments.length?(f.scale(e),c.scale(.35*e),s.scale(e),t.translate(f.translate())):f.scale()},t.translate=function(t){if(!arguments.length)return f.translate();var n=f.scale(),r=+t[0],u=+t[1];return o=f.translate(t).clipExtent([[r-.455*n,u-.238*n],[r+.455*n,u+.238*n]]).stream(l),i=c.translate([r-.307*n,u+.201*n]).clipExtent([[r-.425*n+dv,u+.12*n+dv],[r-.214*n-dv,u+.234*n-dv]]).stream(l),a=s.translate([r-.205*n,u+.212*n]).clipExtent([[r-.214*n+dv,u+.166*n+dv],[r-.115*n-dv,u+.234*n-dv]]).stream(l),e()},t.fitExtent=function(e,n){return Qo(t,e,n)},t.fitSize=function(e,n){return Ko(t,e,n)},t.scale(1070)},cy=fi(function(t){return Nv(2/(1+t))});cy.invert=ci(function(t){return 2*yr(t/2)});var sy=function(){return ni(cy).scale(124.75).clipAngle(179.999)},ly=fi(function(t){return(t=br(t))&&t/kv(t)});ly.invert=ci(function(t){return t});var hy=function(){return ni(ly).scale(79.4188).clipAngle(179.999)};si.invert=function(t,e){return[t,2*wv(Ev(e))-vv]};var py=function(){return li(si).scale(961/yv)},dy=function(){return oi(pi).scale(109.5).parallels([30,30])};di.invert=di;var gy=function(){return ni(di).scale(152.63)},vy=function(){return oi(gi).scale(131.154).center([0,13.9389])};vi.invert=ci(wv);var by=function(){return ni(vi).scale(144.049).clipAngle(60)},yy=function(){function t(){return o=i=null,a}var e,n,r,o,i,a,u=1,f=0,c=0,s=1,l=1,h=Ab,p=null,d=Ab;return a={stream:function(t){return o&&i===t?o:o=h(d(i=t))},clipExtent:function(o){return arguments.length?(d=null==o?(p=e=n=r=null,Ab):so(p=+o[0][0],e=+o[0][1],n=+o[1][0],r=+o[1][1]),t()):null==p?null:[[p,e],[n,r]]},scale:function(e){return arguments.length?(h=bi((u=+e)*s,u*l,f,c),t()):u},translate:function(e){return arguments.length?(h=bi(u*s,u*l,f=+e[0],c=+e[1]),t()):[f,c]},reflectX:function(e){return arguments.length?(h=bi(u*(s=e?-1:1),u*l,f,c),t()):s<0},reflectY:function(e){return arguments.length?(h=bi(u*s,u*(l=e?-1:1),f,c),t()):l<0},fitExtent:function(t,e){return Qo(a,t,e)},fitSize:function(t,e){return Ko(a,t,e)}}};yi.invert=ci(yr);var my=function(){return ni(yi).scale(249.5).clipAngle(90+dv)};mi.invert=ci(function(t){return 2*wv(t)});var _y=function(){return ni(mi).scale(250).clipAngle(142)};_i.invert=function(t,e){return[-e,2*wv(Ev(t))-vv]};var xy=function(){var t=li(_i),e=t.center,n=t.rotate;return t.center=function(t){return arguments.length?e([-t[1],t[0]]):(t=e(),[t[1],-t[0]])},t.rotate=function(t){return arguments.length?n([t[0],t[1],t.length>2?t[2]+90:90]):(t=n(),[t[0],t[1],t[2]-90])},n([0,0,90]).scale(159.155)},wy=function(){function t(t){var i,a=0;t.eachAfter(function(t){var n=t.children;n?(t.x=wi(n),t.y=Mi(n)):(t.x=i?a+=e(t,i):0,t.y=0,i=t)});var u=Ei(t),f=Ti(t),c=u.x-e(u,f)/2,s=f.x+e(f,u)/2;return t.eachAfter(o?function(e){e.x=(e.x-t.x)*n,e.y=(t.y-e.y)*r}:function(e){e.x=(e.x-c)/(s-c)*n,e.y=(1-(t.y?e.y/t.y:1))*r})}var e=xi,n=1,r=1,o=!1;return t.separation=function(n){return arguments.length?(e=n,t):e},t.size=function(e){return arguments.length?(o=!1,n=+e[0],r=+e[1],t):o?null:[n,r]},t.nodeSize=function(e){return arguments.length?(o=!0,n=+e[0],r=+e[1],t):o?[n,r]:null},t},Fy=function(){return this.eachAfter(Ci)},My=function(t){var e,n,r,o,i=this,a=[i];do{for(e=a.reverse(),a=[];i=e.pop();)if(t(i),n=i.children)for(r=0,o=n.length;r<o;++r)a.push(n[r])}while(a.length);return this},Ay=function(t){for(var e,n,r=this,o=[r];r=o.pop();)if(t(r),e=r.children)for(n=e.length-1;n>=0;--n)o.push(e[n]);return this},Ey=function(t){for(var e,n,r,o=this,i=[o],a=[];o=i.pop();)if(a.push(o),e=o.children)for(n=0,r=e.length;n<r;++n)i.push(e[n]);for(;o=a.pop();)t(o);return this},Ty=function(t){return this.eachAfter(function(e){for(var n=+t(e.data)||0,r=e.children,o=r&&r.length;--o>=0;)n+=r[o].value;e.value=n})},Cy=function(t){return this.eachBefore(function(e){e.children&&e.children.sort(t)})},ky=function(t){for(var e=this,n=ki(e,t),r=[e];e!==n;)e=e.parent,r.push(e);for(var o=r.length;t!==n;)r.splice(o,0,t),t=t.parent;return r},Sy=function(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e},Ny=function(){var t=[];return this.each(function(e){t.push(e)}),t},Dy=function(){var t=[];return this.eachBefore(function(e){e.children||t.push(e)}),t},Ry=function(){var t=this,e=[];return t.each(function(n){n!==t&&e.push({source:n.parent,target:n})}),e};qi.prototype=Si.prototype={constructor:qi,count:Fy,each:My,eachAfter:Ey,eachBefore:Ay,sum:Ty,sort:Cy,path:ky,ancestors:Sy,descendants:Ny,leaves:Dy,links:Ry,copy:Ni};var Py=function(t){for(var e=(t=t.slice()).length,n=null,r=n;e;){var o=new Li(t[e-1]);r=r?r.next=o:n=o,t[void 0]=t[--e]}return{head:n,tail:r}},qy=function(t){return ji(Py(t),[])},Ly=function(t){return Wi(t),t},By=function(t){return function(){return t}},jy=function(){function t(t){return t.x=n/2,t.y=r/2,e?t.eachBefore(Zi(e)).eachAfter(Qi(o,.5)).eachBefore(Ki(1)):t.eachBefore(Zi(Ji)).eachAfter(Qi(Gi,1)).eachAfter(Qi(o,t.r/Math.min(n,r))).eachBefore(Ki(Math.min(n,r)/(2*t.r))),t}var e=null,n=1,r=1,o=Gi;return t.radius=function(n){return arguments.length?(e=Xi(n),t):e},t.size=function(e){return arguments.length?(n=+e[0],r=+e[1],t):[n,r]},t.padding=function(e){return arguments.length?(o="function"==typeof e?e:By(+e),t):o},t},Oy=function(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)},Iy=function(t,e,n,r,o){for(var i,a=t.children,u=-1,f=a.length,c=t.value&&(r-e)/t.value;++u<f;)i=a[u],i.y0=n,i.y1=o,i.x0=e,i.x1=e+=i.value*c},Uy=function(){function t(t){var a=t.height+1;return t.x0=t.y0=o,t.x1=n,t.y1=r/a,t.eachBefore(e(r,a)),i&&t.eachBefore(Oy),t}function e(t,e){return function(n){n.children&&Iy(n,n.x0,t*(n.depth+1)/e,n.x1,t*(n.depth+2)/e);var r=n.x0,i=n.y0,a=n.x1-o,u=n.y1-o;a<r&&(r=a=(r+a)/2),u<i&&(i=u=(i+u)/2),n.x0=r,n.y0=i,n.x1=a,n.y1=u}}var n=1,r=1,o=0,i=!1;return t.round=function(e){return arguments.length?(i=!!e,t):i},t.size=function(e){return arguments.length?(n=+e[0],r=+e[1],t):[n,r]},t.padding=function(e){return arguments.length?(o=+e,t):o},t},zy="$",Hy={depth:-1},Yy={},$y=function(){function t(t){var r,o,i,a,u,f,c,s=t.length,l=new Array(s),h={};for(o=0;o<s;++o)r=t[o],u=l[o]=new qi(r),null!=(f=e(r,o,t))&&(f+="")&&(c=zy+(u.id=f),h[c]=c in h?Yy:u);for(o=0;o<s;++o)if(u=l[o],null!=(f=n(t[o],o,t))&&(f+="")){if(!(a=h[zy+f]))throw new Error("missing: "+f);if(a===Yy)throw new Error("ambiguous: "+f);a.children?a.children.push(u):a.children=[u],u.parent=a}else{if(i)throw new Error("multiple roots");i=u}if(!i)throw new Error("no root");if(i.parent=Hy,i.eachBefore(function(t){t.depth=t.parent.depth+1,--s}).eachBefore(Pi),i.parent=null,s>0)throw new Error("cycle");return i}var e=ta,n=ea;return t.id=function(n){return arguments.length?(e=Vi(n),t):e},t.parentId=function(e){return arguments.length?(n=Vi(e),t):n},t};fa.prototype=Object.create(qi.prototype);var Wy=function(){function t(t){var r=ca(t);if(r.eachAfter(e),r.parent.m=-r.z,r.eachBefore(n),f)t.eachBefore(o);else{var c=t,s=t,l=t;t.eachBefore(function(t){t.x<c.x&&(c=t),t.x>s.x&&(s=t),t.depth>l.depth&&(l=t)});var h=c===s?1:i(c,s)/2,p=h-c.x,d=a/(s.x+h+p),g=u/(l.depth||1);t.eachBefore(function(t){t.x=(t.x+p)*d,t.y=t.depth*g})}return t}function e(t){var e=t.children,n=t.parent.children,o=t.i?n[t.i-1]:null;if(e){aa(t);var a=(e[0].z+e[e.length-1].z)/2;o?(t.z=o.z+i(t._,o._),t.m=t.z-a):t.z=a}else o&&(t.z=o.z+i(t._,o._));t.parent.A=r(t,o,t.parent.A||n[0])}function n(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}function r(t,e,n){if(e){for(var r,o=t,a=t,u=e,f=o.parent.children[0],c=o.m,s=a.m,l=u.m,h=f.m;u=oa(u),o=ra(o),u&&o;)f=ra(f),a=oa(a),a.a=t,r=u.z+l-o.z-c+i(u._,o._),r>0&&(ia(ua(u,t,n),t,r),c+=r,s+=r),l+=u.m,c+=o.m,h+=f.m,s+=a.m;u&&!oa(a)&&(a.t=u,a.m+=l-s),o&&!ra(f)&&(f.t=o,f.m+=c-h,n=t)}return n}function o(t){t.x*=a,t.y=t.depth*u}var i=na,a=1,u=1,f=null;return t.separation=function(e){return arguments.length?(i=e,t):i},t.size=function(e){return arguments.length?(f=!1,a=+e[0],u=+e[1],t):f?null:[a,u]},t.nodeSize=function(e){return arguments.length?(f=!0,a=+e[0],u=+e[1],t):f?[a,u]:null},t},Xy=function(t,e,n,r,o){for(var i,a=t.children,u=-1,f=a.length,c=t.value&&(o-n)/t.value;++u<f;)i=a[u],i.x0=e,i.x1=r,i.y0=n,i.y1=n+=i.value*c},Vy=(1+Math.sqrt(5))/2,Gy=function t(e){function n(t,n,r,o,i){sa(e,t,n,r,o,i)}return n.ratio=function(e){return t((e=+e)>1?e:1)},n}(Vy),Jy=function(){function t(t){return t.x0=t.y0=0,t.x1=o,t.y1=i,t.eachBefore(e),a=[0],r&&t.eachBefore(Oy),t}function e(t){var e=a[t.depth],r=t.x0+e,o=t.y0+e,i=t.x1-e,h=t.y1-e;i<r&&(r=i=(r+i)/2),h<o&&(o=h=(o+h)/2),t.x0=r,t.y0=o,t.x1=i,t.y1=h,t.children&&(e=a[t.depth+1]=u(t)/2,r+=l(t)-e,o+=f(t)-e,i-=c(t)-e,h-=s(t)-e,i<r&&(r=i=(r+i)/2),h<o&&(o=h=(o+h)/2),n(t,r,o,i,h))}var n=Gy,r=!1,o=1,i=1,a=[0],u=Gi,f=Gi,c=Gi,s=Gi,l=Gi;return t.round=function(e){return arguments.length?(r=!!e,t):r},t.size=function(e){return arguments.length?(o=+e[0],i=+e[1],t):[o,i]},t.tile=function(e){return arguments.length?(n=Vi(e),t):n},t.padding=function(e){return arguments.length?t.paddingInner(e).paddingOuter(e):t.paddingInner()},t.paddingInner=function(e){return arguments.length?(u="function"==typeof e?e:By(+e),t):u},t.paddingOuter=function(e){return arguments.length?t.paddingTop(e).paddingRight(e).paddingBottom(e).paddingLeft(e):t.paddingTop()},t.paddingTop=function(e){return arguments.length?(f="function"==typeof e?e:By(+e),t):f},t.paddingRight=function(e){return arguments.length?(c="function"==typeof e?e:By(+e),t):c},t.paddingBottom=function(e){return arguments.length?(s="function"==typeof e?e:By(+e),t):s},t.paddingLeft=function(e){return arguments.length?(l="function"==typeof e?e:By(+e),t):l},t},Zy=function(t,e,n,r,o){function i(t,e,n,r,o,a,u){if(t>=e-1){var c=f[t];return c.x0=r,c.y0=o,c.x1=a,void(c.y1=u)}for(var l=s[t],h=n/2+l,p=t+1,d=e-1;p<d;){var g=p+d>>>1;s[g]<h?p=g+1:d=g}h-s[p-1]<s[p]-h&&t+1<p&&--p;var v=s[p]-l,b=n-v;if(a-r>u-o){var y=(r*b+a*v)/n;i(t,p,v,r,o,y,u),i(p,e,b,y,o,a,u)}else{var m=(o*b+u*v)/n;i(t,p,v,r,o,a,m),i(p,e,b,r,m,a,u)}}var a,u,f=t.children,c=f.length,s=new Array(c+1);for(s[0]=u=a=0;a<c;++a)s[a+1]=u+=f[a].value;i(0,c,t.value,e,n,r,o)},Qy=function(t,e,n,r,o){(1&t.depth?Xy:Iy)(t,e,n,r,o)},Ky=function t(e){function n(t,n,r,o,i){if((a=t._squarify)&&a.ratio===e)for(var a,u,f,c,s,l=-1,h=a.length,p=t.value;++l<h;){for(u=a[l],f=u.children,c=u.value=0,s=f.length;c<s;++c)u.value+=f[c].value;u.dice?Iy(u,n,r,o,r+=(i-r)*u.value/p):Xy(u,n,r,n+=(o-n)*u.value/p,i),p-=u.value}else t._squarify=a=sa(e,t,n,r,o,i),a.ratio=e}return n.ratio=function(e){return t((e=+e)>1?e:1)},n}(Vy),tm=function(t){for(var e,n=-1,r=t.length,o=t[r-1],i=0;++n<r;)e=o,o=t[n],i+=e[1]*o[0]-e[0]*o[1];return i/2},em=function(t){for(var e,n,r=-1,o=t.length,i=0,a=0,u=t[o-1],f=0;++r<o;)e=u,u=t[r],f+=n=e[0]*u[1]-u[0]*e[1],i+=(e[0]+u[0])*n,a+=(e[1]+u[1])*n;return f*=3,[i/f,a/f]},nm=function(t,e,n){return(e[0]-t[0])*(n[1]-t[1])-(e[1]-t[1])*(n[0]-t[0])},rm=function(t){if((n=t.length)<3)return null;var e,n,r=new Array(n),o=new Array(n);for(e=0;e<n;++e)r[e]=[+t[e][0],+t[e][1],e];for(r.sort(la),e=0;e<n;++e)o[e]=[r[e][0],-r[e][1]];var i=ha(r),a=ha(o),u=a[0]===i[0],f=a[a.length-1]===i[i.length-1],c=[];for(e=i.length-1;e>=0;--e)c.push(t[r[i[e]][2]]);for(e=+u;e<a.length-f;++e)c.push(t[r[a[e]][2]]);return c},om=function(t,e){for(var n,r,o=t.length,i=t[o-1],a=e[0],u=e[1],f=i[0],c=i[1],s=!1,l=0;l<o;++l)i=t[l],n=i[0],r=i[1],r>u!=c>u&&a<(f-n)*(u-r)/(c-r)+n&&(s=!s),f=n,c=r;return s},im=function(t){for(var e,n,r=-1,o=t.length,i=t[o-1],a=i[0],u=i[1],f=0;++r<o;)e=a,n=u,i=t[r],a=i[0],u=i[1],e-=a,n-=u,f+=Math.sqrt(e*e+n*n);return f},am=[].slice,um={};pa.prototype=ma.prototype={constructor:pa,defer:function(t){if("function"!=typeof t||this._call)throw new Error;if(null!=this._error)return this;var e=am.call(arguments,1);return e.push(t),++this._waiting,this._tasks.push(e),da(this),this},abort:function(){return null==this._error&&ba(this,new Error("abort")),this},await:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=function(e,n){t.apply(null,[e].concat(n))},ya(this),this},awaitAll:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=t,ya(this),this}};var fm=function(t,e){return t=null==t?0:+t,e=null==e?1:+e,1===arguments.length?(e=t,t=0):e-=t,function(){return Math.random()*e+t}},cm=function(t,e){var n,r;return t=null==t?0:+t,e=null==e?1:+e,function(){var o;if(null!=n)o=n,n=null;else do{n=2*Math.random()-1,o=2*Math.random()-1,r=n*n+o*o}while(!r||r>1);return t+e*o*Math.sqrt(-2*Math.log(r)/r)}},sm=function(){var t=cm.apply(this,arguments);return function(){return Math.exp(t())}},lm=function(t){return function(){for(var e=0,n=0;n<t;++n)e+=Math.random();return e}},hm=function(t){var e=lm(t);return function(){return e()/t}},pm=function(t){return function(){return-Math.log(1-Math.random())/t}},dm=function(t,e){function n(t){var e,n=c.status;if(!n&&xa(c)||n>=200&&n<300||304===n){if(i)try{e=i.call(r,c)}catch(t){return void u.call("error",r,t)}else e=c;u.call("load",r,e)}else u.call("error",r,t)}var r,o,i,a,u=g("beforesend","progress","load","error"),f=zn(),c=new XMLHttpRequest,s=null,l=null,h=0;if("undefined"==typeof XDomainRequest||"withCredentials"in c||!/^(http(s)?:)?\/\//.test(t)||(c=new XDomainRequest),"onload"in c?c.onload=c.onerror=c.ontimeout=n:c.onreadystatechange=function(t){c.readyState>3&&n(t)},c.onprogress=function(t){u.call("progress",r,t)},r={header:function(t,e){return t=(t+"").toLowerCase(),arguments.length<2?f.get(t):(null==e?f.remove(t):f.set(t,e+""),r)},mimeType:function(t){return arguments.length?(o=null==t?null:t+"",r):o},responseType:function(t){return arguments.length?(a=t,r):a},timeout:function(t){return arguments.length?(h=+t,r):h},user:function(t){return arguments.length<1?s:(s=null==t?null:t+"",r)},password:function(t){return arguments.length<1?l:(l=null==t?null:t+"",r)},response:function(t){return i=t,r},get:function(t,e){return r.send("GET",t,e)},post:function(t,e){return r.send("POST",t,e)},send:function(e,n,i){return c.open(e,t,!0,s,l),null==o||f.has("accept")||f.set("accept",o+",*/*"),c.setRequestHeader&&f.each(function(t,e){c.setRequestHeader(e,t)}),null!=o&&c.overrideMimeType&&c.overrideMimeType(o),null!=a&&(c.responseType=a),h>0&&(c.timeout=h),null==i&&"function"==typeof n&&(i=n,n=null),null!=i&&1===i.length&&(i=_a(i)),null!=i&&r.on("error",i).on("load",function(t){i(null,t)}),u.call("beforesend",r,c),c.send(null==n?null:n),r},abort:function(){return c.abort(),r},on:function(){var t=u.on.apply(u,arguments);return t===u?r:t}},null!=e){if("function"!=typeof e)throw new Error("invalid callback: "+e);return r.get(e)}return r},gm=function(t,e){return function(n,r){var o=dm(n).mimeType(t).response(e);if(null!=r){if("function"!=typeof r)throw new Error("invalid callback: "+r);return o.get(r)}return o}},vm=gm("text/html",function(t){return document.createRange().createContextualFragment(t.responseText)}),bm=gm("application/json",function(t){return JSON.parse(t.responseText)}),ym=gm("text/plain",function(t){return t.responseText}),mm=gm("application/xml",function(t){var e=t.responseXML;if(!e)throw new Error("parse error");return e}),_m=function(t,e){return function(n,r,o){arguments.length<3&&(o=r,r=null);var i=dm(n).mimeType(t);return i.row=function(t){return arguments.length?i.response(wa(e,r=t)):r},i.row(r),o?i.get(o):i}},xm=_m("text/csv",jd),wm=_m("text/tab-separated-values",Hd),Fm=Array.prototype,Mm=Fm.map,Am=Fm.slice,Em={name:"implicit"},Tm=function(t){return function(){return t}},Cm=function(t){return+t},km=[0,1],Sm=function(e,n,r){var i,a=e[0],u=e[e.length-1],f=o(a,u,null==n?10:n);switch(r=hr(null==r?",f":r),r.type){case"s":var c=Math.max(Math.abs(a),Math.abs(u));return null!=r.precision||isNaN(i=Rg(f,c))||(r.precision=i),t.formatPrefix(r,c);case"":case"e":case"g":case"p":case"r":null!=r.precision||isNaN(i=Pg(f,Math.max(Math.abs(a),Math.abs(u))))||(r.precision=i-("e"===r.type));break;case"f":case"%":null!=r.precision||isNaN(i=Dg(f))||(r.precision=i-2*("%"===r.type))}return t.format(r)},Nm=function(t,e){t=t.slice();var n,r=0,o=t.length-1,i=t[r],a=t[o];return a<i&&(n=r,r=o,o=n,n=i,i=a,a=n),t[r]=e.floor(i),t[o]=e.ceil(a),t},Dm=new Date,Rm=new Date,Pm=Ja(function(){},function(t,e){t.setTime(+t+e)},function(t,e){return e-t});Pm.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?Ja(function(e){e.setTime(Math.floor(e/t)*t)},function(e,n){e.setTime(+e+n*t)},function(e,n){return(n-e)/t}):Pm:null};var qm=Pm.range,Lm=6e4,Bm=6048e5,jm=Ja(function(t){t.setTime(1e3*Math.floor(t/1e3))},function(t,e){t.setTime(+t+1e3*e)},function(t,e){return(e-t)/1e3},function(t){return t.getUTCSeconds()}),Om=jm.range,Im=Ja(function(t){t.setTime(Math.floor(t/Lm)*Lm)},function(t,e){t.setTime(+t+e*Lm)},function(t,e){return(e-t)/Lm},function(t){return t.getMinutes()}),Um=Im.range,zm=Ja(function(t){var e=t.getTimezoneOffset()*Lm%36e5;e<0&&(e+=36e5),t.setTime(36e5*Math.floor((+t-e)/36e5)+e)},function(t,e){t.setTime(+t+36e5*e)},function(t,e){return(e-t)/36e5},function(t){return t.getHours()}),Hm=zm.range,Ym=Ja(function(t){t.setHours(0,0,0,0)},function(t,e){t.setDate(t.getDate()+e)},function(t,e){return(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*Lm)/864e5},function(t){return t.getDate()-1}),$m=Ym.range,Wm=Za(0),Xm=Za(1),Vm=Za(2),Gm=Za(3),Jm=Za(4),Zm=Za(5),Qm=Za(6),Km=Wm.range,t_=Xm.range,e_=Vm.range,n_=Gm.range,r_=Jm.range,o_=Zm.range,i_=Qm.range,a_=Ja(function(t){t.setDate(1),t.setHours(0,0,0,0)},function(t,e){t.setMonth(t.getMonth()+e)},function(t,e){return e.getMonth()-t.getMonth()+12*(e.getFullYear()-t.getFullYear())},function(t){return t.getMonth()}),u_=a_.range,f_=Ja(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,e){t.setFullYear(t.getFullYear()+e)},function(t,e){return e.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()});f_.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Ja(function(e){e.setFullYear(Math.floor(e.getFullYear()/t)*t),e.setMonth(0,1),e.setHours(0,0,0,0)},function(e,n){e.setFullYear(e.getFullYear()+n*t)}):null};var c_=f_.range,s_=Ja(function(t){t.setUTCSeconds(0,0)},function(t,e){t.setTime(+t+e*Lm)},function(t,e){return(e-t)/Lm},function(t){return t.getUTCMinutes()}),l_=s_.range,h_=Ja(function(t){t.setUTCMinutes(0,0,0)},function(t,e){t.setTime(+t+36e5*e)},function(t,e){return(e-t)/36e5},function(t){return t.getUTCHours()}),p_=h_.range,d_=Ja(function(t){t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCDate(t.getUTCDate()+e)},function(t,e){return(e-t)/864e5},function(t){return t.getUTCDate()-1}),g_=d_.range,v_=Qa(0),b_=Qa(1),y_=Qa(2),m_=Qa(3),__=Qa(4),x_=Qa(5),w_=Qa(6),F_=v_.range,M_=b_.range,A_=y_.range,E_=m_.range,T_=__.range,C_=x_.range,k_=w_.range,S_=Ja(function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCMonth(t.getUTCMonth()+e)},function(t,e){return e.getUTCMonth()-t.getUTCMonth()+12*(e.getUTCFullYear()-t.getUTCFullYear())},function(t){return t.getUTCMonth()}),N_=S_.range,D_=Ja(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCFullYear(t.getUTCFullYear()+e)},function(t,e){return e.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()});D_.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Ja(function(e){e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},function(e,n){e.setUTCFullYear(e.getUTCFullYear()+n*t)}):null};var R_,P_=D_.range,q_={"-":"",_:" ",0:"0"},L_=/^\s*\d+/,B_=/^%/,j_=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;Ju({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var O_=Date.prototype.toISOString?Zu:t.utcFormat("%Y-%m-%dT%H:%M:%S.%LZ"),I_=+new Date("2000-01-01T00:00:00.000Z")?Qu:t.utcParse("%Y-%m-%dT%H:%M:%S.%LZ"),U_=1e3,z_=60*U_,H_=60*z_,Y_=24*H_,$_=7*Y_,W_=30*Y_,X_=365*Y_,V_=function(){return ef(f_,a_,Wm,Ym,zm,Im,jm,Pm,t.timeFormat).domain([new Date(2e3,0,1),new Date(2e3,0,2)])},G_=function(){return ef(D_,S_,v_,d_,h_,s_,jm,Pm,t.utcFormat).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)])},J_=function(t){return t.match(/.{6}/g).map(function(t){return"#"+t})},Z_=J_("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),Q_=J_("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),K_=J_("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),tx=J_("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),ex=jh(Xt(300,.5,0),Xt(-240,.5,1)),nx=jh(Xt(-100,.75,.35),Xt(80,1.5,.8)),rx=jh(Xt(260,.75,.35),Xt(80,1.5,.8)),ox=Xt(),ix=function(t){(t<0||t>1)&&(t-=Math.floor(t));var e=Math.abs(t-.5);return ox.h=360*t-100,ox.s=1.5-1.5*e,ox.l=.8-.9*e,ox+""},ax=nf(J_("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),ux=nf(J_("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),fx=nf(J_("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),cx=nf(J_("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")),sx=function(t){return function(){return t}},lx=Math.abs,hx=Math.atan2,px=Math.cos,dx=Math.max,gx=Math.min,vx=Math.sin,bx=Math.sqrt,yx=1e-12,mx=Math.PI,_x=mx/2,xx=2*mx,wx=function(){function t(){var t,c,s=+e.apply(this,arguments),l=+n.apply(this,arguments),h=i.apply(this,arguments)-_x,p=a.apply(this,arguments)-_x,d=lx(p-h),g=p>h;if(f||(f=t=qn()),l<s&&(c=l,l=s,s=c),l>yx)if(d>xx-yx)f.moveTo(l*px(h),l*vx(h)),f.arc(0,0,l,h,p,!g),s>yx&&(f.moveTo(s*px(p),s*vx(p)),f.arc(0,0,s,p,h,g));else{var v,b,y=h,m=p,_=h,x=p,w=d,F=d,M=u.apply(this,arguments)/2,A=M>yx&&(o?+o.apply(this,arguments):bx(s*s+l*l)),E=gx(lx(l-s)/2,+r.apply(this,arguments)),T=E,C=E;if(A>yx){var k=af(A/s*vx(M)),S=af(A/l*vx(M));(w-=2*k)>yx?(k*=g?1:-1,_+=k,x-=k):(w=0,_=x=(h+p)/2),(F-=2*S)>yx?(S*=g?1:-1,y+=S,m-=S):(F=0,y=m=(h+p)/2)}var N=l*px(y),D=l*vx(y),R=s*px(x),P=s*vx(x);if(E>yx){var q=l*px(m),L=l*vx(m),B=s*px(_),j=s*vx(_);if(d<mx){var O=w>yx?hf(N,D,B,j,q,L,R,P):[R,P],I=N-O[0],U=D-O[1],z=q-O[0],H=L-O[1],Y=1/vx(of((I*z+U*H)/(bx(I*I+U*U)*bx(z*z+H*H)))/2),$=bx(O[0]*O[0]+O[1]*O[1]);T=gx(E,(s-$)/(Y-1)),C=gx(E,(l-$)/(Y+1))}}F>yx?C>yx?(v=pf(B,j,N,D,l,C,g),b=pf(q,L,R,P,l,C,g),f.moveTo(v.cx+v.x01,v.cy+v.y01),C<E?f.arc(v.cx,v.cy,C,hx(v.y01,v.x01),hx(b.y01,b.x01),!g):(f.arc(v.cx,v.cy,C,hx(v.y01,v.x01),hx(v.y11,v.x11),!g),f.arc(0,0,l,hx(v.cy+v.y11,v.cx+v.x11),hx(b.cy+b.y11,b.cx+b.x11),!g),f.arc(b.cx,b.cy,C,hx(b.y11,b.x11),hx(b.y01,b.x01),!g))):(f.moveTo(N,D),f.arc(0,0,l,y,m,!g)):f.moveTo(N,D),s>yx&&w>yx?T>yx?(v=pf(R,P,q,L,s,-T,g),b=pf(N,D,B,j,s,-T,g),f.lineTo(v.cx+v.x01,v.cy+v.y01),T<E?f.arc(v.cx,v.cy,T,hx(v.y01,v.x01),hx(b.y01,b.x01),!g):(f.arc(v.cx,v.cy,T,hx(v.y01,v.x01),hx(v.y11,v.x11),!g),f.arc(0,0,s,hx(v.cy+v.y11,v.cx+v.x11),hx(b.cy+b.y11,b.cx+b.x11),g),f.arc(b.cx,b.cy,T,hx(b.y11,b.x11),hx(b.y01,b.x01),!g))):f.arc(0,0,s,x,_,g):f.lineTo(R,P)}else f.moveTo(0,0);if(f.closePath(),t)return f=null,t+""||null}var e=uf,n=ff,r=sx(0),o=null,i=cf,a=sf,u=lf,f=null;return t.centroid=function(){var t=(+e.apply(this,arguments)+ +n.apply(this,arguments))/2,r=(+i.apply(this,arguments)+ +a.apply(this,arguments))/2-mx/2;return[px(r)*t,vx(r)*t]},t.innerRadius=function(n){return arguments.length?(e="function"==typeof n?n:sx(+n),t):e},t.outerRadius=function(e){return arguments.length?(n="function"==typeof e?e:sx(+e),t):n},t.cornerRadius=function(e){return arguments.length?(r="function"==typeof e?e:sx(+e),t):r},t.padRadius=function(e){return arguments.length?(o=null==e?null:"function"==typeof e?e:sx(+e),t):o},t.startAngle=function(e){return arguments.length?(i="function"==typeof e?e:sx(+e),t):i},t.endAngle=function(e){return arguments.length?(a="function"==typeof e?e:sx(+e),t):a},t.padAngle=function(e){return arguments.length?(u="function"==typeof e?e:sx(+e),t):u},t.context=function(e){return arguments.length?(f=null==e?null:e,t):f},t};df.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:this._context.lineTo(t,e)}}};var Fx=function(t){return new df(t)},Mx=function(){function t(t){var u,f,c,s=t.length,l=!1;for(null==o&&(a=i(c=qn())),u=0;u<=s;++u)!(u<s&&r(f=t[u],u,t))===l&&((l=!l)?a.lineStart():a.lineEnd()),l&&a.point(+e(f,u,t),+n(f,u,t));if(c)return a=null,c+""||null}var e=gf,n=vf,r=sx(!0),o=null,i=Fx,a=null;return t.x=function(n){return arguments.length?(e="function"==typeof n?n:sx(+n),t):e},t.y=function(e){return arguments.length?(n="function"==typeof e?e:sx(+e),t):n},t.defined=function(e){return arguments.length?(r="function"==typeof e?e:sx(!!e),t):r},t.curve=function(e){return arguments.length?(i=e,null!=o&&(a=i(o)),t):i},t.context=function(e){return arguments.length?(null==e?o=a=null:a=i(o=e),t):o},t},Ax=function(){function t(t){var e,s,l,h,p,d=t.length,g=!1,v=new Array(d),b=new Array(d);for(null==u&&(c=f(p=qn())),e=0;e<=d;++e){if(!(e<d&&a(h=t[e],e,t))===g)if(g=!g)s=e,c.areaStart(),c.lineStart();else{for(c.lineEnd(),c.lineStart(),l=e-1;l>=s;--l)c.point(v[l],b[l]);c.lineEnd(),c.areaEnd()}g&&(v[e]=+n(h,e,t),b[e]=+o(h,e,t),c.point(r?+r(h,e,t):v[e],i?+i(h,e,t):b[e]))}if(p)return c=null,p+""||null}function e(){return Mx().defined(a).curve(f).context(u)}var n=gf,r=null,o=sx(0),i=vf,a=sx(!0),u=null,f=Fx,c=null;return t.x=function(e){return arguments.length?(n="function"==typeof e?e:sx(+e),r=null,t):n},t.x0=function(e){return arguments.length?(n="function"==typeof e?e:sx(+e),t):n},t.x1=function(e){return arguments.length?(r=null==e?null:"function"==typeof e?e:sx(+e),t):r},t.y=function(e){return arguments.length?(o="function"==typeof e?e:sx(+e),i=null,t):o},t.y0=function(e){return arguments.length?(o="function"==typeof e?e:sx(+e),t):o},t.y1=function(e){return arguments.length?(i=null==e?null:"function"==typeof e?e:sx(+e),t):i},t.lineX0=t.lineY0=function(){return e().x(n).y(o)},t.lineY1=function(){return e().x(n).y(i)},t.lineX1=function(){return e().x(r).y(o)},t.defined=function(e){return arguments.length?(a="function"==typeof e?e:sx(!!e),t):a},t.curve=function(e){return arguments.length?(f=e,null!=u&&(c=f(u)),t):f},t.context=function(e){return arguments.length?(null==e?u=c=null:c=f(u=e),t):u},t},Ex=function(t,e){return e<t?-1:e>t?1:e>=t?0:NaN},Tx=function(t){return t},Cx=function(){function t(t){var u,f,c,s,l,h=t.length,p=0,d=new Array(h),g=new Array(h),v=+o.apply(this,arguments),b=Math.min(xx,Math.max(-xx,i.apply(this,arguments)-v)),y=Math.min(Math.abs(b)/h,a.apply(this,arguments)),m=y*(b<0?-1:1);for(u=0;u<h;++u)(l=g[d[u]=u]=+e(t[u],u,t))>0&&(p+=l);for(null!=n?d.sort(function(t,e){return n(g[t],g[e])}):null!=r&&d.sort(function(e,n){return r(t[e],t[n])}),u=0,c=p?(b-h*m)/p:0;u<h;++u,v=s)f=d[u],l=g[f],s=v+(l>0?l*c:0)+m,g[f]={data:t[f],index:u,value:l,startAngle:v,endAngle:s,padAngle:y};return g}var e=Tx,n=Ex,r=null,o=sx(0),i=sx(xx),a=sx(0);return t.value=function(n){return arguments.length?(e="function"==typeof n?n:sx(+n),t):e},t.sortValues=function(e){return arguments.length?(n=e,r=null,t):n},t.sort=function(e){return arguments.length?(r=e,n=null,t):r},t.startAngle=function(e){return arguments.length?(o="function"==typeof e?e:sx(+e),t):o},t.endAngle=function(e){return arguments.length?(i="function"==typeof e?e:sx(+e),t):i},t.padAngle=function(e){return arguments.length?(a="function"==typeof e?e:sx(+e),t):a},t},kx=yf(Fx);bf.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,e){this._curve.point(e*Math.sin(t),e*-Math.cos(t))}};var Sx=function(){return mf(Mx().curve(kx))},Nx=function(){var t=Ax().curve(kx),e=t.curve,n=t.lineX0,r=t.lineX1,o=t.lineY0,i=t.lineY1;return t.angle=t.x,delete t.x,t.startAngle=t.x0,delete t.x0,t.endAngle=t.x1,delete t.x1,t.radius=t.y,delete t.y,t.innerRadius=t.y0,delete t.y0,t.outerRadius=t.y1,delete t.y1,t.lineStartAngle=function(){return mf(n())},delete t.lineX0,t.lineEndAngle=function(){return mf(r())},delete t.lineX1,t.lineInnerRadius=function(){return mf(o())},delete t.lineY0,t.lineOuterRadius=function(){return mf(i())},delete t.lineY1,t.curve=function(t){return arguments.length?e(yf(t)):e()._curve},t},Dx={draw:function(t,e){var n=Math.sqrt(e/mx);t.moveTo(n,0),t.arc(0,0,n,0,xx)}},Rx={draw:function(t,e){var n=Math.sqrt(e/5)/2;t.moveTo(-3*n,-n),t.lineTo(-n,-n),t.lineTo(-n,-3*n),t.lineTo(n,-3*n),t.lineTo(n,-n),t.lineTo(3*n,-n),t.lineTo(3*n,n),t.lineTo(n,n),t.lineTo(n,3*n),t.lineTo(-n,3*n),t.lineTo(-n,n),t.lineTo(-3*n,n),t.closePath()}},Px=Math.sqrt(1/3),qx=2*Px,Lx={draw:function(t,e){var n=Math.sqrt(e/qx),r=n*Px;t.moveTo(0,-n),t.lineTo(r,0),t.lineTo(0,n),t.lineTo(-r,0),t.closePath()}},Bx=Math.sin(mx/10)/Math.sin(7*mx/10),jx=Math.sin(xx/10)*Bx,Ox=-Math.cos(xx/10)*Bx,Ix={draw:function(t,e){var n=Math.sqrt(.8908130915292852*e),r=jx*n,o=Ox*n;t.moveTo(0,-n),t.lineTo(r,o);for(var i=1;i<5;++i){var a=xx*i/5,u=Math.cos(a),f=Math.sin(a);t.lineTo(f*n,-u*n),t.lineTo(u*r-f*o,f*r+u*o)}t.closePath()}},Ux={draw:function(t,e){var n=Math.sqrt(e),r=-n/2;t.rect(r,r,n,n)}},zx=Math.sqrt(3),Hx={draw:function(t,e){var n=-Math.sqrt(e/(3*zx));t.moveTo(0,2*n),t.lineTo(-zx*n,-n),t.lineTo(zx*n,-n),t.closePath()}},Yx=-.5,$x=Math.sqrt(3)/2,Wx=1/Math.sqrt(12),Xx=3*(Wx/2+1),Vx={draw:function(t,e){var n=Math.sqrt(e/Xx),r=n/2,o=n*Wx,i=r,a=n*Wx+n,u=-i,f=a;t.moveTo(r,o),t.lineTo(i,a),t.lineTo(u,f),t.lineTo(Yx*r-$x*o,$x*r+Yx*o),t.lineTo(Yx*i-$x*a,$x*i+Yx*a),t.lineTo(Yx*u-$x*f,$x*u+Yx*f),t.lineTo(Yx*r+$x*o,Yx*o-$x*r),t.lineTo(Yx*i+$x*a,Yx*a-$x*i),t.lineTo(Yx*u+$x*f,Yx*f-$x*u),t.closePath()}},Gx=[Dx,Rx,Lx,Ux,Ix,Hx,Vx],Jx=function(){function t(){var t;if(r||(r=t=qn()),e.apply(this,arguments).draw(r,+n.apply(this,arguments)),t)return r=null,t+""||null}var e=sx(Dx),n=sx(64),r=null;return t.type=function(n){return arguments.length?(e="function"==typeof n?n:sx(n),t):e},t.size=function(e){return arguments.length?(n="function"==typeof e?e:sx(+e),t):n},t.context=function(e){return arguments.length?(r=null==e?null:e,t):r},t},Zx=function(){};xf.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:_f(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:_f(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}};var Qx=function(t){return new xf(t)};wf.prototype={areaStart:Zx,areaEnd:Zx,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._x2=t,this._y2=e;break;case 1:this._point=2,this._x3=t,this._y3=e;break;case 2:this._point=3,this._x4=t,this._y4=e,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+e)/6);break;default:_f(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}};var Kx=function(t){return new wf(t)};Ff.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var n=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+e)/6;this._line?this._context.lineTo(n,r):this._context.moveTo(n,r);break;case 3:this._point=4;default:_f(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}};var tw=function(t){return new Ff(t)};Mf.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,e=this._y,n=t.length-1;if(n>0)for(var r,o=t[0],i=e[0],a=t[n]-o,u=e[n]-i,f=-1;++f<=n;)r=f/n,this._basis.point(this._beta*t[f]+(1-this._beta)*(o+r*a),this._beta*e[f]+(1-this._beta)*(i+r*u));this._x=this._y=null,this._basis.lineEnd()},point:function(t,e){this._x.push(+t),this._y.push(+e)}};var ew=function t(e){function n(t){return 1===e?new xf(t):new Mf(t,e)}return n.beta=function(e){return t(+e)},n}(.85);Ef.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:Af(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2,this._x1=t,this._y1=e;break;case 2:this._point=3;default:Af(this,t,e)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var nw=function t(e){function n(t){return new Ef(t,e)}return n.tension=function(e){return t(+e)},n}(0);Tf.prototype={areaStart:Zx,areaEnd:Zx,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._x3=t,this._y3=e;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=e);break;case 2:this._point=3,this._x5=t,this._y5=e;break;default:Af(this,t,e)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var rw=function t(e){function n(t){return new Tf(t,e)}return n.tension=function(e){return t(+e)},n}(0);Cf.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Af(this,t,e)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var ow=function t(e){function n(t){return new Cf(t,e)}return n.tension=function(e){return t(+e)},n}(0);Sf.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3;default:kf(this,t,e)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var iw=function t(e){function n(t){return e?new Sf(t,e):new Ef(t,0)}return n.alpha=function(e){return t(+e)},n}(.5);Nf.prototype={areaStart:Zx,areaEnd:Zx,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=e;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=e);break;case 2:this._point=3,this._x5=t,this._y5=e;break;default:kf(this,t,e)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var aw=function t(e){function n(t){return e?new Nf(t,e):new Tf(t,0)}return n.alpha=function(e){return t(+e)},n}(.5);Df.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:kf(this,t,e)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var uw=function t(e){function n(t){return e?new Df(t,e):new Cf(t,0)}return n.alpha=function(e){return t(+e)},n}(.5);Rf.prototype={areaStart:Zx,areaEnd:Zx,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,e){t=+t,e=+e,this._point?this._context.lineTo(t,e):(this._point=1,this._context.moveTo(t,e))}};var fw=function(t){return new Rf(t)};jf.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:Bf(this,this._t0,Lf(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){var n=NaN;if(t=+t,e=+e,t!==this._x1||e!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,Bf(this,Lf(this,n=qf(this,t,e)),n);break;default:Bf(this,this._t0,n=qf(this,t,e))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e,this._t0=n}}},(Of.prototype=Object.create(jf.prototype)).point=function(t,e){jf.prototype.point.call(this,e,t)},If.prototype={moveTo:function(t,e){this._context.moveTo(e,t)},closePath:function(){this._context.closePath()},lineTo:function(t,e){this._context.lineTo(e,t)},bezierCurveTo:function(t,e,n,r,o,i){this._context.bezierCurveTo(e,t,r,n,i,o)}},Hf.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,e=this._y,n=t.length;if(n)if(this._line?this._context.lineTo(t[0],e[0]):this._context.moveTo(t[0],e[0]),2===n)this._context.lineTo(t[1],e[1]);else for(var r=Yf(t),o=Yf(e),i=0,a=1;a<n;++i,++a)this._context.bezierCurveTo(r[0][i],o[0][i],r[1][i],o[1][i],t[a],e[a]);(this._line||0!==this._line&&1===n)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,e){this._x.push(+t),this._y.push(+e)}};var cw=function(t){return new Hf(t)};$f.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,e),this._context.lineTo(t,e);else{var n=this._x*(1-this._t)+t*this._t;this._context.lineTo(n,this._y),this._context.lineTo(n,e)}}this._x=t,this._y=e}};var sw=function(t){return new $f(t,.5)},lw=Array.prototype.slice,hw=function(t,e){if((r=t.length)>1)for(var n,r,o=1,i=t[e[0]],a=i.length;o<r;++o){n=i,i=t[e[o]];for(var u=0;u<a;++u)i[u][1]+=i[u][0]=isNaN(n[u][1])?n[u][0]:n[u][1]}},pw=function(t){for(var e=t.length,n=new Array(e);--e>=0;)n[e]=e;return n},dw=function(){function t(t){var i,a,u=e.apply(this,arguments),f=t.length,c=u.length,s=new Array(c);for(i=0;i<c;++i){for(var l,h=u[i],p=s[i]=new Array(f),d=0;d<f;++d)p[d]=l=[0,+o(t[d],h,d,t)],l.data=t[d];p.key=h}for(i=0,a=n(s);i<c;++i)s[a[i]].index=i;return r(s,a),s}var e=sx([]),n=pw,r=hw,o=Vf;return t.keys=function(n){return arguments.length?(e="function"==typeof n?n:sx(lw.call(n)),t):e},t.value=function(e){return arguments.length?(o="function"==typeof e?e:sx(+e),t):o},t.order=function(e){return arguments.length?(n=null==e?pw:"function"==typeof e?e:sx(lw.call(e)),t):n},t.offset=function(e){return arguments.length?(r=null==e?hw:e,t):r},t},gw=function(t,e){if((r=t.length)>0){for(var n,r,o,i=0,a=t[0].length;i<a;++i){for(o=n=0;n<r;++n)o+=t[n][i][1]||0;if(o)for(n=0;n<r;++n)t[n][i][1]/=o}hw(t,e)}},vw=function(t,e){if((n=t.length)>0){for(var n,r=0,o=t[e[0]],i=o.length;r<i;++r){for(var a=0,u=0;a<n;++a)u+=t[a][r][1]||0;o[r][1]+=o[r][0]=-u/2}hw(t,e)}},bw=function(t,e){if((o=t.length)>0&&(r=(n=t[e[0]]).length)>0){for(var n,r,o,i=0,a=1;a<r;++a){for(var u=0,f=0,c=0;u<o;++u){for(var s=t[e[u]],l=s[a][1]||0,h=s[a-1][1]||0,p=(l-h)/2,d=0;d<u;++d){var g=t[e[d]];p+=(g[a][1]||0)-(g[a-1][1]||0)}f+=l,c+=p*l}n[a-1][1]+=n[a-1][0]=i,f&&(i-=c/f)}n[a-1][1]+=n[a-1][0]=i,hw(t,e)}},yw=function(t){var e=t.map(Gf);return pw(t).sort(function(t,n){return e[t]-e[n]})},mw=function(t){return yw(t).reverse()},_w=function(t){var e,n,r=t.length,o=t.map(Gf),i=pw(t).sort(function(t,e){return o[e]-o[t]}),a=0,u=0,f=[],c=[];for(e=0;e<r;++e)n=i[e],a<u?(a+=o[n],f.push(n)):(u+=o[n],c.push(n));return c.reverse().concat(f)},xw=function(t){return pw(t).reverse()},ww=function(t){return function(){return t}};Qf.prototype={constructor:Qf,insert:function(t,e){var n,r,o;if(t){if(e.P=t,e.N=t.N,t.N&&(t.N.P=e),t.N=e,t.R){for(t=t.R;t.L;)t=t.L;t.L=e}else t.R=e;n=t}else this._?(t=nc(this._),e.P=null,e.N=t,t.P=t.L=e,n=t):(e.P=e.N=null,this._=e,n=null);for(e.L=e.R=null,e.U=n,e.C=!0,t=e;n&&n.C;)r=n.U,n===r.L?(o=r.R,o&&o.C?(n.C=o.C=!1,r.C=!0,t=r):(t===n.R&&(tc(this,n),t=n,n=t.U),n.C=!1,r.C=!0,ec(this,r))):(o=r.L,o&&o.C?(n.C=o.C=!1,r.C=!0,t=r):(t===n.L&&(ec(this,n),t=n,n=t.U),n.C=!1,r.C=!0,tc(this,r))),n=t.U;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null;var e,n,r,o=t.U,i=t.L,a=t.R;if(n=i?a?nc(a):i:a,o?o.L===t?o.L=n:o.R=n:this._=n,i&&a?(r=n.C,n.C=t.C,n.L=i,i.U=n,n!==a?(o=n.U,n.U=t.U,t=n.R,o.L=t,n.R=a,a.U=n):(n.U=o,o=n,t=n.R)):(r=t.C,t=n),t&&(t.U=o),!r){if(t&&t.C)return void(t.C=!1);do{if(t===this._)break;if(t===o.L){if(e=o.R,e.C&&(e.C=!1,o.C=!0,tc(this,o),e=o.R),e.L&&e.L.C||e.R&&e.R.C){e.R&&e.R.C||(e.L.C=!1,e.C=!0,ec(this,e),e=o.R),e.C=o.C,o.C=e.R.C=!1,tc(this,o),t=this._;break}}else if(e=o.L,e.C&&(e.C=!1,o.C=!0,ec(this,o),e=o.L),e.L&&e.L.C||e.R&&e.R.C){e.L&&e.L.C||(e.R.C=!1,e.C=!0,tc(this,e),e=o.L),e.C=o.C,o.C=e.L.C=!1,ec(this,o),t=this._;break}e.C=!0,t=o,o=o.U}while(!t.C);t&&(t.C=!1)}}};var Fw,Mw,Aw,Ew,Tw,Cw=[],kw=[],Sw=1e-6,Nw=1e-12;Tc.prototype={constructor:Tc,polygons:function(){var t=this.edges;return this.cells.map(function(e){var n=e.halfedges.map(function(n){return lc(e,t[n])});return n.data=e.site.data,n})},triangles:function(){var t=[],e=this.edges;return this.cells.forEach(function(n,r){if(i=(o=n.halfedges).length)for(var o,i,a,u=n.site,f=-1,c=e[o[i-1]],s=c.left===u?c.right:c.left;++f<i;)a=s,c=e[o[f]],s=c.left===u?c.right:c.left,a&&s&&r<a.index&&r<s.index&&Ac(u,a,s)<0&&t.push([u.data,a.data,s.data])}),t},links:function(){return this.edges.filter(function(t){return t.right}).map(function(t){return{source:t.left.data,target:t.right.data}})},find:function(t,e,n){for(var r,o,i=this,a=i._found||0,u=i.cells.length;!(o=i.cells[a]);)if(++a>=u)return null;var f=t-o.site[0],c=e-o.site[1],s=f*f+c*c;do{o=i.cells[r=a],a=null,o.halfedges.forEach(function(n){var r=i.edges[n],u=r.left;if(u!==o.site&&u||(u=r.right)){var f=t-u[0],c=e-u[1],l=f*f+c*c;l<s&&(s=l,a=u.index)}})}while(null!==a);return i._found=r,null==n||s<=n*n?o.site:null}};var Dw=function(){function t(t){return new Tc(t.map(function(r,o){var i=[Math.round(e(r,o,t)/Sw)*Sw,Math.round(n(r,o,t)/Sw)*Sw];return i.index=o,i.data=r,i}),r)}var e=Jf,n=Zf,r=null;return t.polygons=function(e){return t(e).polygons()},t.links=function(e){return t(e).links()},t.triangles=function(e){return t(e).triangles()},t.x=function(n){return arguments.length?(e="function"==typeof n?n:ww(+n),t):e},t.y=function(e){return arguments.length?(n="function"==typeof e?e:ww(+e),t):n},t.extent=function(e){return arguments.length?(r=null==e?null:[[+e[0][0],+e[0][1]],[+e[1][0],+e[1][1]]],t):r&&[[r[0][0],r[0][1]],[r[1][0],r[1][1]]]},t.size=function(e){return arguments.length?(r=null==e?null:[[0,0],[+e[0],+e[1]]],t):r&&[r[1][0]-r[0][0],r[1][1]-r[0][1]]},t},Rw=function(t){return function(){return t}};kc.prototype={constructor:kc,scale:function(t){return 1===t?this:new kc(this.k*t,this.x,this.y)},translate:function(t,e){return 0===t&0===e?this:new kc(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Pw=new kc(1,0,0);Sc.prototype=kc.prototype;var qw=function(){t.event.preventDefault(),t.event.stopImmediatePropagation()},Lw=function(){function e(t){t.on("wheel.zoom",c).on("mousedown.zoom",s).on("dblclick.zoom",l).on("touchstart.zoom",h).on("touchmove.zoom",p).on("touchend.zoom touchcancel.zoom",d).style("-webkit-tap-highlight-color","rgba(0,0,0,0)").property("__zoom",Pc)}function n(t,e){return e=Math.max(_,Math.min(x,e)),e===t.k?t:new kc(e,t.x,t.y)}function r(t,e,n){var r=e[0]-n[0]*t.k,o=e[1]-n[1]*t.k;return r===t.x&&o===t.y?t:new kc(t.k,r,o)}function o(t,e){var n=t.invertX(e[0][0])-w,r=t.invertX(e[1][0])-F,o=t.invertY(e[0][1])-M,i=t.invertY(e[1][1])-A;return t.translate(r>n?(n+r)/2:Math.min(0,n)||Math.max(0,r),i>o?(o+i)/2:Math.min(0,o)||Math.max(0,i))}function i(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function a(t,e,n){t.on("start.zoom",function(){u(this,arguments).start()}).on("interrupt.zoom end.zoom",function(){u(this,arguments).end()}).tween("zoom",function(){var t=this,r=arguments,o=u(t,r),a=m.apply(t,r),f=n||i(a),c=Math.max(a[1][0]-a[0][0],a[1][1]-a[0][1]),s=t.__zoom,l="function"==typeof e?e.apply(t,r):e,h=T(s.invert(f).concat(c/s.k),l.invert(f).concat(c/l.k));return function(t){if(1===t)t=l;else{var e=h(t),n=c/e[2];t=new kc(n,f[0]-e[0]*n,f[1]-e[1]*n)}o.zoom(null,t)}})}function u(t,e){for(var n,r=0,o=C.length;r<o;++r)if((n=C[r]).that===t)return n;return new f(t,e)}function f(t,e){this.that=t,this.args=e,this.index=-1,this.active=0,this.extent=m.apply(t,e)}function c(){function e(){i.wheel=null,i.end()}if(y.apply(this,arguments)){var i=u(this,arguments),a=this.__zoom,f=Math.max(_,Math.min(x,a.k*Math.pow(2,-t.event.deltaY*(t.event.deltaMode?120:1)/500))),c=Is(this);if(i.wheel)i.mouse[0][0]===c[0]&&i.mouse[0][1]===c[1]||(i.mouse[1]=a.invert(i.mouse[0]=c)),clearTimeout(i.wheel);else{if(a.k===f)return;i.mouse=[c,a.invert(c)],up(this),i.start()}qw(),i.wheel=setTimeout(e,D),i.zoom("mouse",o(r(n(a,f),i.mouse[0],i.mouse[1]),i.extent))}}function s(){function e(){qw(),i.moved=!0,i.zoom("mouse",o(r(i.that.__zoom,i.mouse[0]=Is(i.that),i.mouse[1]),i.extent))}function n(){a.on("mousemove.zoom mouseup.zoom",null),yt(t.event.view,i.moved),qw(),i.end()}if(!b&&y.apply(this,arguments)){var i=u(this,arguments),a=wl(t.event.view).on("mousemove.zoom",e,!0).on("mouseup.zoom",n,!0),f=Is(this);Tl(t.event.view),Nc(),i.mouse=[f,this.__zoom.invert(f)],up(this),i.start()}}function l(){if(y.apply(this,arguments)){var i=this.__zoom,u=Is(this),f=i.invert(u),c=i.k*(t.event.shiftKey?.5:2),s=o(r(n(i,c),u,f),m.apply(this,arguments));qw(),E>0?wl(this).transition().duration(E).call(a,s,u):wl(this).call(e.transform,s)}}function h(){if(y.apply(this,arguments)){var e,n,r,o,i=u(this,arguments),a=t.event.changedTouches,f=a.length;for(Nc(),n=0;n<f;++n)r=a[n],o=Ml(this,a,r.identifier),o=[o,this.__zoom.invert(o),r.identifier],i.touch0?i.touch1||(i.touch1=o):(i.touch0=o,e=!0);if(v&&(v=clearTimeout(v),!i.touch1))return i.end(),void((o=wl(this).on("dblclick.zoom"))&&o.apply(this,arguments));e&&(v=setTimeout(function(){v=null},N),up(this),i.start())}}function p(){var e,i,a,f,c=u(this,arguments),s=t.event.changedTouches,l=s.length;for(qw(),v&&(v=clearTimeout(v)),e=0;e<l;++e)i=s[e],a=Ml(this,s,i.identifier),c.touch0&&c.touch0[2]===i.identifier?c.touch0[0]=a:c.touch1&&c.touch1[2]===i.identifier&&(c.touch1[0]=a);if(i=c.that.__zoom,c.touch1){var h=c.touch0[0],p=c.touch0[1],d=c.touch1[0],g=c.touch1[1],b=(b=d[0]-h[0])*b+(b=d[1]-h[1])*b,y=(y=g[0]-p[0])*y+(y=g[1]-p[1])*y;i=n(i,Math.sqrt(b/y)),a=[(h[0]+d[0])/2,(h[1]+d[1])/2],f=[(p[0]+g[0])/2,(p[1]+g[1])/2]}else{if(!c.touch0)return;a=c.touch0[0],f=c.touch0[1]}c.zoom("touch",o(r(i,a,f),c.extent))}function d(){var e,n,r=u(this,arguments),o=t.event.changedTouches,i=o.length;for(Nc(),b&&clearTimeout(b),b=setTimeout(function(){b=null},N),e=0;e<i;++e)n=o[e],r.touch0&&r.touch0[2]===n.identifier?delete r.touch0:r.touch1&&r.touch1[2]===n.identifier&&delete r.touch1;r.touch1&&!r.touch0&&(r.touch0=r.touch1,delete r.touch1),r.touch0?r.touch0[1]=this.__zoom.invert(r.touch0[0]):r.end()}var v,b,y=Dc,m=Rc,_=0,x=1/0,w=-x,F=x,M=w,A=F,E=250,T=Dh,C=[],S=g("start","zoom","end"),N=500,D=150;return e.transform=function(t,e){var n=t.selection?t.selection():t;n.property("__zoom",Pc),t!==n?a(t,e):n.interrupt().each(function(){u(this,arguments).start().zoom(null,"function"==typeof e?e.apply(this,arguments):e).end()})},e.scaleBy=function(t,n){e.scaleTo(t,function(){return this.__zoom.k*("function"==typeof n?n.apply(this,arguments):n)})},e.scaleTo=function(t,a){e.transform(t,function(){var t=m.apply(this,arguments),e=this.__zoom,u=i(t),f=e.invert(u);return o(r(n(e,"function"==typeof a?a.apply(this,arguments):a),u,f),t)})},e.translateBy=function(t,n,r){e.transform(t,function(){return o(this.__zoom.translate("function"==typeof n?n.apply(this,arguments):n,"function"==typeof r?r.apply(this,arguments):r),m.apply(this,arguments))})},f.prototype={start:function(){return 1==++this.active&&(this.index=C.push(this)-1,this.emit("start")),this},zoom:function(t,e){return this.mouse&&"mouse"!==t&&(this.mouse[1]=e.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=e.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=e.invert(this.touch1[0])),this.that.__zoom=e,this.emit("zoom"),this},end:function(){return 0==--this.active&&(C.splice(this.index,1),this.index=-1,this.emit("end")),this},emit:function(t){k(new Cc(e,t,this.that.__zoom),S.apply,S,[t,this.that,this.args])}},e.filter=function(t){return arguments.length?(y="function"==typeof t?t:Rw(!!t),e):y},e.extent=function(t){return arguments.length?(m="function"==typeof t?t:Rw([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),e):m},e.scaleExtent=function(t){return arguments.length?(_=+t[0],x=+t[1],e):[_,x]},e.translateExtent=function(t){return arguments.length?(w=+t[0][0],F=+t[1][0],M=+t[0][1],A=+t[1][1],e):[[w,M],[F,A]]},e.duration=function(t){return arguments.length?(E=+t,e):E},e.interpolate=function(t){return arguments.length?(T=t,e):T},e.on=function(){var t=S.on.apply(S,arguments);return t===S?e:t},e};t.version="4.8.0",t.bisect=jc,t.bisectRight=jc,t.bisectLeft=Oc,t.ascending=qc,t.bisector=Lc,t.cross=Uc,t.descending=zc,t.deviation=$c,t.extent=Wc,t.histogram=os,t.thresholdFreedmanDiaconis=as,t.thresholdScott=us,t.thresholdSturges=rs,t.max=fs,t.mean=cs,t.median=ss,t.merge=ls,t.min=hs,t.pairs=Ic,t.permute=ps,t.quantile=is,t.range=Qc,t.scan=ds,t.shuffle=gs,t.sum=vs,t.ticks=ns,t.tickIncrement=r,t.tickStep=o,t.transpose=bs,t.variance=Yc,t.zip=ys,t.axisTop=l,t.axisRight=h,t.axisBottom=p,t.axisLeft=d,t.brush=bd,t.brushX=Sn,t.brushY=Nn,t.brushSelection=kn,t.chord=Md,t.ribbon=Sd,t.nest=Nd,t.set=Vn,t.map=zn,t.keys=Rd,t.values=Pd,t.entries=qd,t.color=At,t.rgb=kt,t.hsl=Rt,t.lab=Bt,t.hcl=Yt,t.cubehelix=Xt,t.dispatch=g,t.drag=kl,t.dragDisable=Tl,t.dragEnable=yt,t.dsvFormat=Ld,t.csvParse=jd,t.csvParseRows=Od,t.csvFormat=Id,t.csvFormatRows=Ud,t.tsvParse=Hd,t.tsvParseRows=Yd,t.tsvFormat=$d,t.tsvFormatRows=Wd,t.easeLinear=nn,t.easeQuad=an,t.easeQuadIn=rn,t.easeQuadOut=on,t.easeQuadInOut=an,t.easeCubic=cn,t.easeCubicIn=un,t.easeCubicOut=fn,t.easeCubicInOut=cn,t.easePoly=Dp,t.easePolyIn=Sp,t.easePolyOut=Np,t.easePolyInOut=Dp,t.easeSin=hn,t.easeSinIn=sn,t.easeSinOut=ln,t.easeSinInOut=hn,t.easeExp=gn,t.easeExpIn=pn,t.easeExpOut=dn,t.easeExpInOut=gn,t.easeCircle=yn,t.easeCircleIn=vn,t.easeCircleOut=bn,t.easeCircleInOut=yn,t.easeBounce=_n,t.easeBounceIn=mn,t.easeBounceOut=_n,t.easeBounceInOut=xn,t.easeBack=Xp,t.easeBackIn=$p,t.easeBackOut=Wp,t.easeBackInOut=Xp,t.easeElastic=Jp,t.easeElasticIn=Gp,t.easeElasticOut=Jp,t.easeElasticInOut=Zp,t.forceCenter=Xd,t.forceCollide=lg,t.forceLink=hg,t.forceManyBody=vg,t.forceSimulation=gg,t.forceX=bg,t.forceY=yg,t.formatDefaultLocale=dr,t.formatLocale=Ng,t.formatSpecifier=hr,t.precisionFixed=Dg,t.precisionPrefix=Rg,t.precisionRound=Pg,t.geoArea=Ov,t.geoBounds=zv,t.geoCentroid=Yv,t.geoCircle=ib,t.geoClipExtent=hb,t.geoContains=Fb,t.geoDistance=_b,t.geoGraticule=Mo,t.geoGraticule10=Ao,t.geoInterpolate=Mb,t.geoLength=bb,t.geoPath=Zb,t.geoAlbers=uy,t.geoAlbersUsa=fy,t.geoAzimuthalEqualArea=sy,t.geoAzimuthalEqualAreaRaw=cy,t.geoAzimuthalEquidistant=hy,t.geoAzimuthalEquidistantRaw=ly,t.geoConicConformal=dy,t.geoConicConformalRaw=pi,t.geoConicEqualArea=ay,t.geoConicEqualAreaRaw=ai,t.geoConicEquidistant=vy,t.geoConicEquidistantRaw=gi,t.geoEquirectangular=gy,t.geoEquirectangularRaw=di,t.geoGnomonic=by,t.geoGnomonicRaw=vi,t.geoIdentity=yy,t.geoProjection=ni,t.geoProjectionMutator=ri,t.geoMercator=py,t.geoMercatorRaw=si,t.geoOrthographic=my,t.geoOrthographicRaw=yi,t.geoStereographic=_y,t.geoStereographicRaw=mi,t.geoTransverseMercator=xy,t.geoTransverseMercatorRaw=_i,t.geoRotation=ob,t.geoStream=qv,t.geoTransform=ey,t.cluster=wy,t.hierarchy=Si,t.pack=jy,t.packSiblings=Ly,t.packEnclose=qy,t.partition=Uy,t.stratify=$y,t.tree=Wy,t.treemap=Jy,t.treemapBinary=Zy,t.treemapDice=Iy,t.treemapSlice=Xy,t.treemapSliceDice=Qy,t.treemapSquarify=Gy,t.treemapResquarify=Ky,t.interpolate=Mh,t.interpolateArray=bh,t.interpolateBasis=lh,t.interpolateBasisClosed=hh,t.interpolateDate=yh,t.interpolateNumber=mh,t.interpolateObject=_h,t.interpolateRound=Ah,t.interpolateString=Fh,t.interpolateTransformCss=kh,t.interpolateTransformSvg=Sh,t.interpolateZoom=Dh,t.interpolateRgb=dh,t.interpolateRgbBasis=gh,t.interpolateRgbBasisClosed=vh,t.interpolateHsl=Rh,t.interpolateHslLong=Ph,t.interpolateLab=le,t.interpolateHcl=qh,t.interpolateHclLong=Lh,t.interpolateCubehelix=Bh,t.interpolateCubehelixLong=jh,t.quantize=Oh,t.path=qn,t.polygonArea=tm,t.polygonCentroid=em;t.polygonHull=rm,t.polygonContains=om,t.polygonLength=im,t.quadtree=rr,t.queue=ma,t.randomUniform=fm,t.randomNormal=cm,t.randomLogNormal=sm,t.randomBates=hm,t.randomIrwinHall=lm,t.randomExponential=pm,t.request=dm,t.html=vm,t.json=bm,t.text=ym,t.xml=mm,t.csv=xm,t.tsv=wm,t.scaleBand=Ma,t.scalePoint=Ea,t.scaleIdentity=La,t.scaleLinear=qa,t.scaleLog=Ha,t.scaleOrdinal=Fa,t.scaleImplicit=Em,t.scalePow=$a,t.scaleSqrt=Wa,t.scaleQuantile=Xa,t.scaleQuantize=Va,t.scaleThreshold=Ga,t.scaleTime=V_,t.scaleUtc=G_,t.schemeCategory10=Z_,t.schemeCategory20b=Q_,t.schemeCategory20c=K_,t.schemeCategory20=tx,t.interpolateCubehelixDefault=ex,t.interpolateRainbow=ix,t.interpolateWarm=nx,t.interpolateCool=rx,t.interpolateViridis=ax,t.interpolateMagma=ux,t.interpolateInferno=fx,t.interpolatePlasma=cx,t.scaleSequential=rf,t.creator=Ss,t.local=w,t.matcher=qs,t.mouse=Is,t.namespace=ks,t.namespaces=Cs,t.select=wl,t.selectAll=Fl,t.selection=vt,t.selector=Us,t.selectorAll=Hs,t.touch=Ml,t.touches=Al,t.window=fl,t.customEvent=k,t.arc=wx,t.area=Ax,t.line=Mx,t.pie=Cx,t.radialArea=Nx,t.radialLine=Sx,t.symbol=Jx,t.symbols=Gx,t.symbolCircle=Dx,t.symbolCross=Rx,t.symbolDiamond=Lx,t.symbolSquare=Ux,t.symbolStar=Ix,t.symbolTriangle=Hx,t.symbolWye=Vx,t.curveBasisClosed=Kx,t.curveBasisOpen=tw,t.curveBasis=Qx,t.curveBundle=ew,t.curveCardinalClosed=rw,t.curveCardinalOpen=ow,t.curveCardinal=nw,t.curveCatmullRomClosed=aw,t.curveCatmullRomOpen=uw,t.curveCatmullRom=iw,t.curveLinearClosed=fw,t.curveLinear=Fx,t.curveMonotoneX=Uf,t.curveMonotoneY=zf,t.curveNatural=cw,t.curveStep=sw,t.curveStepAfter=Xf,t.curveStepBefore=Wf,t.stack=dw,t.stackOffsetExpand=gw,t.stackOffsetNone=hw,t.stackOffsetSilhouette=vw,t.stackOffsetWiggle=bw,t.stackOrderAscending=yw,t.stackOrderDescending=mw,t.stackOrderInsideOut=_w,t.stackOrderNone=pw,t.stackOrderReverse=xw,t.timeInterval=Ja,t.timeMillisecond=Pm,t.timeMilliseconds=qm,t.utcMillisecond=Pm,t.utcMilliseconds=qm,t.timeSecond=jm,t.timeSeconds=Om,t.utcSecond=jm,t.utcSeconds=Om,t.timeMinute=Im,t.timeMinutes=Um,t.timeHour=zm,t.timeHours=Hm,t.timeDay=Ym,t.timeDays=$m,t.timeWeek=Wm,t.timeWeeks=Km,t.timeSunday=Wm,t.timeSundays=Km,t.timeMonday=Xm,t.timeMondays=t_,t.timeTuesday=Vm,t.timeTuesdays=e_,t.timeWednesday=Gm,t.timeWednesdays=n_,t.timeThursday=Jm,t.timeThursdays=r_,t.timeFriday=Zm,t.timeFridays=o_,t.timeSaturday=Qm,t.timeSaturdays=i_,t.timeMonth=a_,t.timeMonths=u_,t.timeYear=f_,t.timeYears=c_,t.utcMinute=s_,t.utcMinutes=l_,t.utcHour=h_,t.utcHours=p_,t.utcDay=d_,t.utcDays=g_,t.utcWeek=v_,t.utcWeeks=F_,t.utcSunday=v_,t.utcSundays=F_,t.utcMonday=b_,t.utcMondays=M_,t.utcTuesday=y_,t.utcTuesdays=A_,t.utcWednesday=m_,t.utcWednesdays=E_,t.utcThursday=__,t.utcThursdays=T_,t.utcFriday=x_,t.utcFridays=C_,t.utcSaturday=w_,t.utcSaturdays=k_,t.utcMonth=S_,t.utcMonths=N_,t.utcYear=D_,t.utcYears=P_,t.timeFormatDefaultLocale=Ju,t.timeFormatLocale=nu,t.isoFormat=O_,t.isoParse=I_,t.now=de,t.timer=be,t.timerFlush=ye,t.timeout=Gh,t.interval=Jh,t.transition=tn,t.active=ed,t.interrupt=up,t.voronoi=Dw,t.zoom=Lw,t.zoomTransform=Sc,t.zoomIdentity=Pw,Object.defineProperty(t,"__esModule",{value:!0})})}]);
