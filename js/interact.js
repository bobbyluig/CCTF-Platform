//Use Pixabay's autoComplete code for team selection
// jQuery autoComplete v1.0.5
// https://github.com/Pixabay/jQuery-autoComplete
!function(e){e.fn.autoComplete=function(t){var s=e.extend({},e.fn.autoComplete.defaults,t);return"string"==typeof t?(this.each(function(){var s=e(this);"destroy"==t&&(e(window).off("resize.autocomplete",s.updateSC),s.off("keydown.autocomplete keyup.autocomplete"),s.data("autocomplete")?s.attr("autocomplete",s.data("autocomplete")):s.removeAttr("autocomplete"),e(s.data("el")).remove(),s.removeData("el").removeData("autocomplete"))}),this):this.each(function(){function t(e){var t=a.val();if(a.cache[t]=e,e.length&&t.length>=s.minChars){var o="";for(i=0;i<e.length;i++)o+=s.renderItem(e[i],t);a.sc.html(o),a.updateSC(0)}else a.sc.hide()}var a=e(this);a.sc=e('<div class="autocomplete-suggestions"></div>').addClass(s.menuClass),a.data("el",a.sc).data("autocomplete",a.attr("autocomplete")),a.attr("autocomplete","off"),a.cache={},a.last_val="",a.updateSC=function(t,s){if(a.sc.css({top:a.offset().top+a.outerHeight(),left:a.offset().left,width:a.outerWidth()}),!t&&(a.sc.show(),a.sc.maxHeight||(a.sc.maxHeight=parseInt(a.sc.css("max-height"))),a.sc.suggestionHeight||(a.sc.suggestionHeight=e(".autocomplete-suggestion",a.sc).first().outerHeight()),a.sc.suggestionHeight))if(s){var o=a.sc.scrollTop(),l=s.offset().top-a.sc.offset().top;l+a.sc.suggestionHeight-a.sc.maxHeight>0?a.sc.scrollTop(l+a.sc.suggestionHeight+o-a.sc.maxHeight):0>l&&a.sc.scrollTop(l+o)}else a.sc.scrollTop(0)},e(window).on("resize.autocomplete",a.updateSC),a.sc.appendTo("body"),a.sc.on("mouseleave.autocomplete",".autocomplete-suggestion",function(){e(".autocomplete-suggestion.selected").removeClass("selected")}),a.sc.on("mouseenter.autocomplete",".autocomplete-suggestion",function(){e(".autocomplete-suggestion.selected").removeClass("selected"),e(this).addClass("selected")}),a.sc.on("mousedown.autocomplete",".autocomplete-suggestion",function(){var t=e(this).data("val");a.val(t),s.onSelect(t),setTimeout(function(){a.focus()},10)}),a.blur(function(){a.last_val=a.val(),a.sc.hide()}),a.on("keydown.autocomplete",function(t){if(40==t.which&&a.sc.html()){var s,o=e(".autocomplete-suggestion.selected",a.sc);return o.length?(s=o.next(".autocomplete-suggestion"),s.length?(o.removeClass("selected"),a.val(s.addClass("selected").data("val"))):(o.removeClass("selected"),a.val(a.last_val),s=0)):(s=e(".autocomplete-suggestion",a.sc).first(),a.val(s.addClass("selected").data("val"))),a.updateSC(0,s),!1}if(38==t.which&&a.sc.html()){var s,o=e(".autocomplete-suggestion.selected",a.sc);if(o.length){var s=o.prev(".autocomplete-suggestion");s.length?(o.removeClass("selected"),a.val(s.addClass("selected").data("val"))):(o.removeClass("selected"),a.val(a.last_val),s=0)}else s=e(".autocomplete-suggestion",a.sc).last(),a.val(s.addClass("selected").data("val"));return a.updateSC(0,s),!1}27==t.which&&a.val(a.last_val).sc.hide()}),a.on("keyup.autocomplete",function(o){if(!~e.inArray(o.which,[27,38,40,37,39])){var l=a.val();if(l.length>=s.minChars){if(l!=a.last_val){if(a.last_val=l,clearTimeout(a.timer),s.cache){if(l in a.cache)return void t(a.cache[l]);for(i=1;i<l.length-s.minChars;i++){var c=l.slice(0,l.length-i);if(c in a.cache&&!a.cache[c].length)return void t([])}}a.timer=setTimeout(function(){s.source(l,t)},s.delay)}}else a.last_val=l,a.sc.hide()}})})},e.fn.autoComplete.defaults={source:0,minChars:3,delay:100,cache:1,menuClass:"",renderItem:function(e,t){var s=new RegExp("("+t.split(" ").join("|")+")","gi");return'<div class="autocomplete-suggestion" data-val="'+e+'">'+e.replace(s,"<b>$1</b>")+"</div>"},onSelect:function(){}}}(jQuery);

$(document).ready(function() {
	//Initialize the sideNav
	$(".button-collapse").sideNav();
	//Initialize the modal
	$('.modal-trigger').leanModal();
	
	//Send IP to server
	$('form').submit(function() {
		$.ajax({
			type: 'POST',
			url: $(this).attr('action'),
			data: $(this).serialize(),
			success: function(data) {
				//On completion calculate ip and convert to text
				if (data.success) {
					current = parseInt($('#ip').text());
					$('#ip').text(data.ip);
				}
				//Display a toast with info
				Materialize.toast(data.message, data.message.length * 150);
			}
		});
		return false;
	});
	
	//Put the data for the teams into the field
	$('#team').autoComplete({
		//Minimum number of characters a user needs to input to prompt a suggestion
		minChars: 2,
		//Get the data for the teams so autoComplete will work
		source: function(term, response) {
			$.getJSON('/api/interact/list_teams/', {
				q: term
			}, function(data) {
				response(data);
			});
		}
	});
});