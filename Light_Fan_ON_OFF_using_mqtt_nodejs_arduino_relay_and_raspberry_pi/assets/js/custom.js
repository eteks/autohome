$(document).ready(function(){
	$('.material-switch').on('change',function(){
		var parent_cls = jQuery($(this).data('href'));
		var child_cls = jQuery('.' + $(this).data('options'));
		var parent = $(this).parents('.ctrl_appliances').find(parent_cls);

		if(parent.find(child_cls).hasClass('ac_off')) {
			parent.find(child_cls).removeClass('ac_off');
			parent.find(child_cls).addClass('ac_on');
		}
		else if($(this).data('options')=="ac") {
			parent.find(child_cls).removeClass('ac_on');
			parent.find(child_cls).addClass('ac_off');
		}
		if(parent.find(child_cls).hasClass('light_off')) {
			parent.find(child_cls).removeClass('light_off');
			parent.find(child_cls).addClass('light_on');
		}
		else if($(this).data('options')=="light") { 
			parent.find(child_cls).removeClass('light_on');
			parent.find(child_cls).addClass('light_off');
		}
		if(parent.find(child_cls).hasClass('fan_off')) {
			parent.find(child_cls).removeClass('fan_off');
			parent.find(child_cls).addClass('fan_on');
		}
	    else if($(this).data('options')=="fan") { 
			parent.find(child_cls).removeClass('fan_on');
			parent.find(child_cls).addClass('fan_off');
		}
    });
    

});


