//switcher
/////////////////////////////////////////////
//DELETE FOLLOWING CODE TO DISABLE SWITCHER//
/////////////////////////////////////////////
jQuery(document).ready(function(){

window.patternClasses = [];

var deleteAllCookiesHTML = '';
if (jQuery.cookie) {
	if(!jQuery.isEmptyObject( jQuery.cookie() )) {
		deleteAllCookiesHTML = '<span class="rt-icon2-delete-outline" data-toggle="tooltip" data-placement="top" title="Clear All Styles (Page will be reloaded)"></span>';
	}
}
		


		jQuery('body').append(switcherHTML);

		//switcher toggle
        jQuery('#switcher span[class="rt-icon2-brush"]').on('click', function(){
            jQuery('#switcher').toggleClass('active');
        });
		
		//switcher reset all styles
        jQuery('#switcher span[class="rt-icon2-delete-outline"]').on('click', function(){
            cookieClass.deleteAllCookies();
        });


        //boxed or wide
        jQuery('#layout').on('click', {patterns: patternClasses}, switcherClass.switchBoxedWide);

        //boxed with top and bottom margins (enable only whet "boxed" is active)
        jQuery('#boxed_margin').find("input").on('change', switcherClass.switchBoxedMargins);
        
        //pattern switcher
        jQuery('#switcher-patterns a').on('click', {patterns: patternClasses}, function( e ) {
			switcherClass.switchPatterns( e, jQuery(this).data('pattern'));
        });

        //color switcher
        jQuery('#switcher-colors a').on('click', switcherClass.switchColorScheme);

		//version switcher
        jQuery('#switcher-version a').on('click', switcherClass.switchDarkLight);


        //if cookie set - changing color scheme
        if (cookieClass.returnTrueOrFalseCookie('colorScheme')) {
        	jQuery('#switcher-colors a[data-color="' + cookieClass.getCookieValue('colorScheme') + '"]').trigger('click');
        }


        //if cookie set - changing to dark version
        if (cookieClass.returnTrueOrFalseCookie('light')) {
        	cookieClass.toggleTrueOrFalseCookie('light');
        	jQuery('#switcher-version .light').trigger('click');
        }


        //if cookies set - changing layout
        if (cookieClass.returnTrueOrFalseCookie('boxed')) {
        	if (cookieClass.returnTrueOrFalseCookie('topBottomMargins')) {
        		var topBottomMarginsCookie = cookieClass.getCookieValue('topBottomMargins');
        	}
        	if (cookieClass.returnTrueOrFalseCookie('pattern')) {
        		var patternCookie = cookieClass.getCookieValue('pattern');
        	}
        	switcherClass.switchBoxedWide();
        	cookieClass.toggleTrueOrFalseCookie("boxed");
        	jQuery('#layout').prop('checked', true);

        	if (topBottomMarginsCookie) {
        		jQuery('#boxed_margin').find('input').prop('checked', true).trigger('change');
        	}
        	if (patternCookie) {
        		jQuery('#switcher-patterns').find('a[data-pattern="' + patternCookie + '"]').trigger('click');
        	}
        	
        }
});

var cookieClass = {
	deleteAllCookies: function () {
		if (jQuery.cookie) {
			jQuery.each(jQuery.cookie(), function(key, value) {
				jQuery.removeCookie(key);
				location.reload();
			});
		} else {
			return false;
		}
	},
	deleteCookie: function (cookieName) {
		if (jQuery.cookie) {
			jQuery.removeCookie(cookieName);
		} else {
			return false;
		}
	},
	setCookieValue: function (cookieName, cookieValue) {
		if (jQuery.cookie) {
			jQuery.cookie(cookieName, cookieValue);
		} else {
			return false;
		}
	},
	getCookieValue: function (cookieName) {
		if (jQuery.cookie) {
			return jQuery.cookie(cookieName);
		} else {
			return false;
		}
	},
	toggleTrueOrFalseCookie: function(cookieName) {
		if (jQuery.cookie) {
			if(!jQuery.cookie(cookieName) || jQuery.cookie(cookieName) == '0') {
				jQuery.cookie(cookieName, '1');
				return true;
				
			} else {
				jQuery.cookie(cookieName, '0');
				return true;
			}
		} else {
			return false;
		}
		
	},
	returnTrueOrFalseCookie: function( cookieName ) {
		if (jQuery.cookie) {
			cookieName = jQuery.cookie( cookieName );
			switch ( cookieName ) {
				case '0':
					return false;
					break;
				case 0:
					return false;
					break;
				case false:
					return false;
					break;
				case undefined:
					return false;
					break;
				case null:
					return false;
					break;
				default:
					return true;
					break;
			}
		} else {
			return false;
		}
	},
	setCookieToFalse: function(cookieName) {
		if (jQuery.cookie) {
				jQuery.cookie(cookieName, '0');
		} else {
			return false;
		}
		
	}
}

var switcherClass = {
	switchBoxedWide : function  ( e ) {
		//wide boxed changing
	    jQuery("#boxed_margin").toggleClass("hidden").find("input").prop("checked", false);
	    jQuery(".for-toggle").toggleClass("hidden");
	    jQuery("#canvas").toggleClass("boxed").removeClass(patternClasses.join(' '));;
	    jQuery("#box_wrapper").toggleClass("container").removeClass('top-bottom-margins');
	    if (jQuery().isotope) {
	    	jQuery("#isotopeContainer").isotope("reLayout");
	    }
	    jQuery(window).trigger("resize");
	    cookieClass.toggleTrueOrFalseCookie("boxed");
	    cookieClass.setCookieToFalse("topBottomMargins");
	    cookieClass.setCookieToFalse("pattern");

	},
	switchBoxedMargins : function  ( e ) {
		if(jQuery('#layout').prop('checked')) {
		    jQuery('#box_wrapper').toggleClass('top-bottom-margins');
		    cookieClass.toggleTrueOrFalseCookie('topBottomMargins');
		}
	},
	switchPatterns: function  ( e, newPattern ) {
	    e.preventDefault();
	    e.stopPropagation();
	    jQuery('#canvas').removeClass(e.data.patterns.join(' '));
	    jQuery('#canvas').addClass(newPattern);
	    cookieClass.setCookieValue('pattern', newPattern);
	},

	switchColorScheme: function ( e ) {
	    e.preventDefault();
	    e.stopPropagation();
	    var color = jQuery(this).data('color');
	    jQuery('#color-switcher-link').attr('href', 'css/main' + color + '.css');
	    cookieClass.setCookieValue('colorScheme', color);
	},

	switchDarkLight: function ( e ) {
	    e.preventDefault();
	    e.stopPropagation();
	    if (jQuery(this).parent().hasClass("active")) {
	    	return;
	    }
	    jQuery("#switcher-version").find("li").toggleClass("active");

	    jQuery("#canvas").toggleClass("dark");

		jQuery(".page_header").toggleClass("header_darkgrey header_white");
		jQuery(".page_breadcrumbs.changeable").toggleClass("ls ds");
		jQuery(".mosaic-post .post-social-links").toggleClass("ls ds");
		jQuery("article .author-meta").toggleClass("ls ds");
		jQuery(".comment-body .media-body").toggleClass("ls ds");

		jQuery("#box_wrapper > *").each(function() {
    		//sections to ignore light-dark switch 
			if (
				   // jQuery(this).hasClass('page_topline') 
				   // jQuery(this).hasClass('page_footer') 
				   jQuery(this).hasClass('page_breadcrumbs') 
				// || jQuery(this).hasClass('page_copyright') 
				// || jQuery(this).hasClass('intro_section') 
				|| jQuery(this).hasClass("static")
				|| jQuery(this).hasClass("gradient")
				|| jQuery(this).hasClass("cs")
				|| (jQuery(this).attr("id") == "featured")
			) {
				return;
			}
			
			if(jQuery(this).hasClass("ls")) {
				jQuery(this).toggleClass("ls ds");
			} else if(jQuery(this).hasClass("ds")) {
				jQuery(this).toggleClass("ds ls");
			}
		});

	    cookieClass.toggleTrueOrFalseCookie('light');
	}
}