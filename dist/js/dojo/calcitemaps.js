<<<<<<< HEAD
/* calcite-maps - v0.0.1 - 2016-03-10
*  https://github.com/alaframboise/calcite-maps#readme
*  Copyright (c) 2016 Environmental Systems Research Institute, Inc.
*  Apache 2.0 License */
define(["dojo/query","dojo/dom-class","dojo/domReady!"],function(query,domClass){function isMobile(){return"none"!==query(".navbar-toggle").style("display")[0]}var _mobile=isMobile();query("[data-tooltip=tip]").tooltip({placement:"bottom",delay:{show:100,hide:100},trigger:"hover"}),query("#mainNav li > a").on("click",function(e){var panelBody,panels,panel=query(e.currentTarget.dataset.target);panel.length>0&&domClass.contains(panel[0],"panel")&&(panelBody=query(panel).query(".panel-collapse"),domClass.contains(panel[0],"in")||panel.collapse("show"),domClass.contains(panelBody[0],"in")||query(panel[0]).query(".panel-toggle")[0].click(),_mobile&&(panels=query("#panelAccordion .panel.in:not(:#"+panel.id+")"),panels.collapse("hide")))}),query("#mainNav").on("show.bs.collapse",function(e){_mobile&&query("#mainNav .dropdown").addClass("open")}),query("#mainNav").on("shown.bs.collapse",function(e){_mobile&&query("#mainNav .dropdown").addClass("open")}),query("#mainNav .dropdown").on("hide.bs.dropdown",function(e){var nav=query("#mainNav");domClass.contains(nav[0],"in")&&domClass.contains(e.target,"open")&&query("#mainNav").collapse("hide")}),query(".navbar-brand").on("click",function(){domClass.contains(query("body")[0],"nav-position-top-fixed")||domClass.contains(query("body")[0],"nav-position-bottom-fixed")||(domClass.contains(query("body")[0],"is-minibar")?(query("#mainNav ul.nav > li, .navbar-info, .navbar-toggle").removeClass("hidden"),query("body").removeClass("is-minibar")):(query("#mainNav ul.nav > li, .navbar-info, .navbar-toggle").addClass("hidden"),query("body").addClass("is-minibar")))}),query("#mainNav .dropdown").on("show.bs.dropdown",function(){_mobile||domClass.add(query("#panelAccordion")[0],"fade-out opacity-75")}),query("#mainNav .dropdown").on("hide.bs.dropdown",function(){_mobile||domClass.remove(query("#panelAccordion")[0],"fade-out opacity-75")}),query(window).on("resize",function(){if(!_mobile&&isMobile()){var panel,panels=query("#panelAccordion .panel.in");panels.length>0&&(panel=panels.query(".panel-collapse.in"),panel.length>0?panels=query("#panelAccordion .panel.in:not(#"+panel.parent().attr("id")+")"):(panel=panels[0],panels=query("#panelAccordion .panel.in:not(#"+panel.id+")")),panels.collapse("hide")),domClass.remove(query("#panelAccordion")[0],"fade-out opacity-75")}else isMobile()||query("#panelAccordion .panel.in.panel-mobile-only").collapse("hide");_mobile=isMobile()})});
=======
/* ========================================================================
 * Calcite Maps: calcitemaps.js v0.2 (dojo)
 * ========================================================================
 * Generic handlers for mapping-specific UI
 *
 * ======================================================================== */

define([ 
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/query",
  "dojo/dom-class",
  "dojo/on",
  "dojo/domReady!"
], function(declare, lang, query, domClass, on) {

  var CalciteMaps = declare(null, {

    constructor: function () {
      
      this.initEvents();

    },

    //--------------------------------------------------------------------------
    //
    //  Public
    //
    //--------------------------------------------------------------------------

    dropdownMenuItemSelector: ".calcite-navbar .calcite-dropdown li > a",

    autoCollapsePanel: true,

    preventOverscrolling: true,

    activePanel: null,

    stickyDropdownDesktop: false,

    stickyDropdownMobile: false,

    stickyDropdownBreakpoint: 768,

    //----------------------------------
    // Initialize Handlers
    //----------------------------------

    initEvents: function() {

      this.setDropdownItemEvents();
      this.setDropdownToggleEvents();
      this.setToggleNavbarClick();
      this.setPanelEvents();

    },

    //----------------------------------
    // Dropdown Menu Item Events
    //----------------------------------

    setDropdownItemEvents: function() {

      var funcContext = function setNavbarEvents(e) {

        var isPanel = false,
          panel = null,
          panelBody = null,
          panels = null;

        if (e.currentTarget.dataset.target) {
          panel = query(e.currentTarget.dataset.target);
          if (panel.length > 0) {
            isPanel = domClass.contains(panel[0], "panel");
          }
        }

        // Toggle panels
        if (isPanel) {
          panelBody = query(panel).query(".panel-collapse");
          // Show
          if (!domClass.contains(panel[0], "in")) {
            // Close panels
            panels = query(panel).parent().query(".panel.in");
            panels.collapse("hide");
            // Close bodies
            query(panels).query(".panel-collapse").collapse("hide");
            // Show panel
            panel.collapse("show");
            // Show body
            query(panelBody[0]).collapse("show");
          } else { // Re-show
            panel.removeClass("in");
            query(panelBody[0]).removeClass("in");
            panel.collapse("show");
            query(panelBody[0]).collapse("show");
          }
          // Dismiss dropdown automatically
          var isMobile = window.innerWidth < this.stickyDropdownBreakpoint;
          if (isMobile && !this.stickyDropdownMobile || !isMobile && !this.stickyDropdownDesktop) {
            var toggle = query(".calcite-dropdown .dropdown-toggle")[0];
            on.emit(toggle, "click", { bubbles: true, cancelable: true });
          }
          this.activePanel = panel;
        }
      }.bind(this);

      // Show/hide panels

      query(this.dropdownMenuItemSelector).on("click", lang.hitch(this, funcContext)); 

    },

    //----------------------------------
    // Manually show/hide the dropdown
    //----------------------------------

    setDropdownToggleEvents: function() {
      
      // Manually show/hide the dropdown
      query(".calcite-dropdown .dropdown-toggle").on('click', function (e) {
        query(this).parent().toggleClass("open");
        query(".calcite-dropdown-toggle").toggleClass("open");
      });

      query(".calcite-dropdown").on("hide.bs.dropdown", function () {
        query(".calcite-dropdown-toggle").removeClass("open");
      });

      // Dismiss dropdown menu
      query(window).on("click", function (e) {
        var menu = query(".calcite-dropdown.open")[0];
        if (menu) {
          if (query(e.target).closest(".calcite-dropdown").length === 0) {
            query(menu).removeClass("open");
            query(".calcite-dropdown-toggle").removeClass("open");
          }
        }
      });
    },

    //----------------------------------
    // Toggle navbar hidden
    //----------------------------------

    setToggleNavbarClick: function() {

      query("#calciteToggleNavbar").on("click", function(e) {
        if (!domClass.contains(query("body")[0],"calcite-nav-hidden")) {
          query("body").addClass("calcite-nav-hidden");
        } else {
          query("body").removeClass("calcite-nav-hidden");
        }
        var menu = query(".calcite-dropdown .dropdown-toggle")[0];
        if (menu) {
          on.emit(menu, "click", { bubbles: true, cancelable: true });
        }
      });

    },

    //----------------------------------
    // Panel Collapse Events
    //----------------------------------

    setPanelEvents: function() {

      if (this.autoCollapsePanel) {
        // Hide
        query(".calcite-panels .panel .panel-collapse").on("hidden.bs.collapse", function(e) {
          query(e.target.parentNode).query(".panel-label, .panel-close").addClass("visible-mobile-only");
        });
        //Show
        query(".calcite-panels .panel .panel-collapse").on("show.bs.collapse", function(e) {
          query(e.target.parentNode).query(".panel-label, .panel-close").removeClass("visible-mobile-only");
        });
      }
      
    }

  });
      
  return new CalciteMaps();
});
>>>>>>> 4636075d34047cdd495e46badbabc1b87250dfda
