$(document).ready(function(){$(".button-collapse").sideNav(),$(".modal-trigger").leanModal(),$("form").submit(function(){return form=$(this),$.ajax({type:"POST",url:$(this).attr("action"),data:$(this).serialize(),success:function(e){1==e.success&&form.find("input:password").val("").blur().parent().find("i, label").removeClass("active"),Materialize.toast(e.message,150*e.message.length)}}),!1}),$("#logout").click(function(){$.ajax({type:"GET",url:"/api/logout",success:function(e){1==e.success?window.location.href="/":Materialize.toast(e.message,150*e.message.length)}})})});