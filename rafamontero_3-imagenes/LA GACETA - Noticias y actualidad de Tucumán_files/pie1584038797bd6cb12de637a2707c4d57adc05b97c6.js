
var initPhotoSwipeFromDOM=function(gallerySelector){var parseThumbnailElements=function(el){var thumbElements=el.childNodes,numNodes=thumbElements.length,items=[],el,childElements,thumbnailEl,size,item;for(var i=0;i<numNodes;i++){el=thumbElements[i];if(el.nodeType!==1){continue;}
childElements=el.children;size=el.getAttribute('data-size').split('x');item={src:el.getAttribute('href'),w:parseInt(size[0],10),h:parseInt(size[1],10),author:el.getAttribute('data-author')};item.el=el;if(childElements.length>0){item.msrc=childElements[0].getAttribute('src');if(childElements.length>1){item.title=childElements[1].innerHTML;}}
var mediumSrc=el.getAttribute('data-med');if(mediumSrc){size=el.getAttribute('data-med-size').split('x');item.m={src:mediumSrc,w:parseInt(size[0],10),h:parseInt(size[1],10)};}
item.o={src:item.src,w:item.w,h:item.h};items.push(item);}
return items;};var closest=function closest(el,fn){return el&&(fn(el)?el:closest(el.parentNode,fn));};var onThumbnailsClick=function(e){e=e||window.event;e.preventDefault?e.preventDefault():e.returnValue=false;var eTarget=e.target||e.srcElement;var clickedListItem=closest(eTarget,function(el){return el.tagName==='A';});if(!clickedListItem){return;}
var clickedGallery=clickedListItem.parentNode;var childNodes=clickedListItem.parentNode.childNodes,numChildNodes=childNodes.length,nodeIndex=0,index;for(var i=0;i<numChildNodes;i++){if(childNodes[i].nodeType!==1){continue;}
if(childNodes[i]===clickedListItem){index=nodeIndex;break;}
nodeIndex++;}
if(index>=0){openPhotoSwipe(index,clickedGallery);}
return false;};var photoswipeParseHash=function(){var hash=window.location.hash.substring(1),params={};if(hash.length<5){return params;}
var vars=hash.split('&');for(var i=0;i<vars.length;i++){if(!vars[i]){continue;}
var pair=vars[i].split('=');if(pair.length<2){continue;}
params[pair[0]]=pair[1];}
if(params.gid){params.gid=parseInt(params.gid,10);}
return params;};var openPhotoSwipe=function(index,galleryElement,disableAnimation,fromURL){var pswpElement=document.querySelectorAll('.pswp')[0],gallery,options,items;items=parseThumbnailElements(galleryElement);options={galleryUID:galleryElement.getAttribute('data-pswp-uid'),getThumbBoundsFn:function(index){var thumbnail=items[index].el.children[0],pageYScroll=window.pageYOffset||document.documentElement.scrollTop,rect=thumbnail.getBoundingClientRect();return{x:rect.left,y:rect.top+pageYScroll,w:rect.width};},addCaptionHTMLFn:function(item,captionEl,isFake){if(!item.title){captionEl.children[0].innerText='';return false;}
captionEl.children[0].innerHTML=item.title+'<br/><small>Photo: '+item.author+'</small>';return true;}};if(fromURL){if(options.galleryPIDs){for(var j=0;j<items.length;j++){if(items[j].pid==index){options.index=j;break;}}}else{options.index=parseInt(index,10)-1;}}else{options.index=parseInt(index,10);}
if(isNaN(options.index)){return;}
var radios=document.getElementsByName('gallery-style');for(var i=0,length=radios.length;i<length;i++){if(radios[i].checked){if(radios[i].id=='radio-all-controls'){}else if(radios[i].id=='radio-minimal-black'){options.mainClass='pswp--minimal--dark';options.barsSize={top:0,bottom:0};options.captionEl=false;options.fullscreenEl=false;options.shareEl=false;options.bgOpacity=0.85;options.tapToClose=true;options.tapToToggleControls=false;}
break;}}
if(disableAnimation){options.showAnimationDuration=0;}
gallery=new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options);var realViewportWidth,useLargeImages=false,firstResize=true,imageSrcWillChange;gallery.listen('beforeResize',function(){var dpiRatio=window.devicePixelRatio?window.devicePixelRatio:1;dpiRatio=Math.min(dpiRatio,2.5);realViewportWidth=gallery.viewportSize.x*dpiRatio;if(realViewportWidth>=1200||(!gallery.likelyTouchDevice&&realViewportWidth>800)||screen.width>1200){if(!useLargeImages){useLargeImages=true;imageSrcWillChange=true;}}else{if(useLargeImages){useLargeImages=false;imageSrcWillChange=true;}}
if(imageSrcWillChange&&!firstResize){gallery.invalidateCurrItems();}
if(firstResize){firstResize=false;}
imageSrcWillChange=false;});gallery.listen('gettingData',function(index,item){if(useLargeImages){item.src=item.o.src;item.w=item.o.w;item.h=item.o.h;}else{item.src=item.m.src;item.w=item.m.w;item.h=item.m.h;}});gallery.init();};var galleryElements=document.querySelectorAll(gallerySelector);for(var i=0,l=galleryElements.length;i<l;i++){galleryElements[i].setAttribute('data-pswp-uid',i+1);galleryElements[i].onclick=onThumbnailsClick;}
var hashData=photoswipeParseHash();if(hashData.pid&&hashData.gid){openPhotoSwipe(hashData.pid,galleryElements[hashData.gid-1],true,true);}};

$(function(){runSwiperSlide();runLightboxGif();initPhotoSwipeFromDOM('.demo-gallery');inicializo_slider_mas_noticias();});function droplink()
{$('#dropLink').hover(function(e){e.stopPropagation();$('.dropLink').addClass('active');$('#subActualidad').animate({height:'toggle',opacity:'toggle'},100);});$("#dropLink").mouseleave(function(){$('.dropLink').removeClass('active');});}
function openClouseMicro(p_id){if($("#micro-"+p_id).children('div').hasClass("open")){$("#micro-"+p_id).children('div').removeClass("open");$("#micro-"+p_id).children('div').find('h2').stop(true,true).delay(200).fadeIn('fast');$("#micro-"+p_id).children('div').find('p').slideToggle('fast');}else{$("#micro-"+p_id).children('div').addClass("open");$("#micro-"+p_id).children('div').find('h2').fadeOut('fast');$("#micro-"+p_id).children('div').find('p').stop(true,true).delay(200).slideToggle('fast');}}
function runLightboxGif()
{lightbox.option({resizeDuration:200,wrapAround:true,positionFromTop:100});}
function runSwiperSlide()
{var swiper=new Swiper('.swiper-container',{slidesPerView:'auto',paginationClickable:true,spaceBetween:0});}
var maxheight=0;$.each($('[id^="multi_"] .cards'),function(){maxheight=($(this).height()>maxheight?$(this).height():maxheight);$(this).find('.item').height(maxheight-50);});$('.breadCrumb span').click(function(e){e.stopPropagation();$(this).find('.drop').animate({height:'toggle',opacity:'toggle'},200);});$(function(){$(document).hover(function(){$('.drop:visible').delay('250').animate({height:'toggle',opacity:'toggle'},200);});});$('#edition').hover(function(e){e.stopPropagation();$(this).find('.edition').delay('250').animate({height:'toggle',opacity:'toggle'},200);});$('.button-collapse').sideNav({menuWidth:280,edge:'right',closeOnClick:true,draggable:false});$(function(){$(".users.loged .link").click(function(){if($('#navigation').css('display')==='none'){$('#navigation').show();$('#account').hide();$(this).find('span i').removeClass('rotate');}else{$('#navigation').hide();$('#account').show();$(this).find('span i').addClass('rotate');}});var swiper=new Swiper('.moreNews',{pagination:'.swiper-pagination',slidesPerView:4,paginationClickable:true,spaceBetween:30,nextButton:'.arrowNext',prevButton:'.arrowPrev',slidesPerGroup:4,autoplay:8000,loop:true,breakpoints:{1200:{slidesPerView:3,slidesPerGroup:3}}});});$("#header").headroom({offset:100,tolerance:{up:10,down:10},classes:{initial:"headroom",pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom"},onNotTop:function(){$('.header').addClass('in');},onTop:function(){$('.header').removeClass('in');}});$("#banner").headroom({offset:200,tolerance:{up:20,down:10},classes:{initial:"headroom",pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom"},onNotTop:function(){$('.header').addClass('in');},onTop:function(){$('.header').removeClass('in');}});$("#headerIn").headroom({offset:100,tolerance:{up:10,down:10},classes:{initial:"headroom",pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom"}});$("#subMenu").headroom({offset:0});$("#portals").headroom({offset:100});$("#btnUp").headroom({offset:1000,tolerance:{up:10,down:10},classes:{initial:"headroom",pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"in",bottom:"headroom--bottom",notBottom:"headroom--not-bottom"}});$("#btnUp").click(function(){$("html, body").animate({scrollTop:0},"slow");return false;});$(".inner").click(function(){$("html, body").animate({scrollTop:0},"slow");return false;});var pheight=$('[id^="parent_"]').height();var cheight=$('[id^="child_"]').height();if($(window).width()<992){if(pheight>cheight){$('[id^="child_"]').css({'height':pheight});}else{$('[id^="child_"]').css({'height':cheight});}}
function inicializo_slider_mas_noticias()
{var swiper=new Swiper('.moreNews',{pagination:'.swiper-pagination',slidesPerView:4,paginationClickable:true,spaceBetween:30,nextButton:'.arrowNext',prevButton:'.arrowPrev',slidesPerGroup:4,autoplay:8000,breakpoints:{1200:{slidesPerView:3,slidesPerGroup:3}}});}
$(window).scroll(function(){var limit=$('#limit').height();if($(window).scrollTop()>limit){$('.trackerDown').addClass('down');$('.trackerDown').removeClass('up');}
if($(window).scrollTop()<limit){$('.trackerDown').addClass('up');$('.trackerDown').removeClass('down');}});$("#moreCom, #moreCom2, #moreCom3, #moreCom4, #moreCom5").click(function(){$('html, body').animate({scrollTop:$("#comm").offset().top},500);});$('#moreInfo').click(function(){$(this).fadeOut('fast');setTimeout(function(){$('.more').fadeIn();$('#desc').removeClass('clamp');},300);});

$(function(){startLazyload();});function startVideos(){$('.js-video-player').each(function(){$el=$(this);var playerInstance=videojs($el.attr('id'));});}
function configYoutube(player)
{player.setup({file:$el.data('videoUrl'),skin:{name:"glow"},width:'100%',aspectratio:'16:9',image:$el.data('imagePreview'),icons:false,preload:"metadata",ga:{},skin:{name:"seven"}});}
function configTelecom(player)
{player.setup({aspectratio:"16:9",width:"100%",playlist:[{image:$el.data('imagePreview'),sources:[{default:false,file:$el.data('videoUrl'),label:"0",type:"hls",preload:"none"}]}],flashplayer:"//ssl.p.jwpcdn.com/player/v/7.8.1/jwplayer.flash.swf",primary:"html5",plugins:{"https://assets-jpcust.jwpsrv.com/player/6/6124956/ping.js":{pixel:"https://content.jwplatform.com/ping.gif"}},autoplay:false,skin:{name:"seven"}});}
function startScrollStandard(p_url){var pagina=0;var working=false;var notMore=false;$(window).scroll(function(){if($("#mas_notas").val()>0)
{var scroll=$(window).scrollTop();if($(window).height()+scroll>=($(document).height()-360))
{if(working||notMore)return;working=true;pagina=pagina+20;filter=$("#mas_notas").val();$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+p_url,{id:filter,start:pagina},function(data){if(!data)
{notMore=true;}
var $html=$('<div>'+data+'</div>');$html.find('.addItem').each(function(){var $item=$(this);$forAppend=$($(this).html());$('#notas').append($forAppend);$('.grid').masonry('appended',$forAppend).masonry('reloadItems');$item.remove();});$forAppend=$($html.html());$('.grid').masonry().append($forAppend).masonry('appended',$forAppend).masonry('reloadItems');$(".micro .cardBody").click(openClouseMicro);startVideos();runSwiperSlide();runLightboxGif();initPhotoSwipeFromDOM('.demo-gallery');startLazyload();if(filter==4)
startWidgetSport();cargaPartidosTarjeta();$('body').css('cursor','default');$("#loading").hide();}).complete(function()
{working=false;$("#loading").hide();});}}});}
function startScrollHighlighted(p_url){var pagina=0;var working=false;var notMore=false;$(window).scroll(function(){if($("#mas_notas").val()>0)
{var scroll=$(window).scrollTop();if($(window).height()+scroll>=($(document).height()-360))
{if(working||notMore)return;working=true;pagina=pagina+20;$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+p_url,{start:pagina},function(data){if(!data)
{notMore=true;}
var $html=$('<div>'+data+'</div>');$html.find('.addItem').each(function(){var $item=$(this);$forAppend=$($(this).html());$('#notas').append($forAppend);$('.grid').masonry('appended',$forAppend).masonry('reloadItems');$item.remove();});$forAppend=$($html.html());$('.grid').masonry().append($forAppend).masonry('appended',$forAppend).masonry('reloadItems');$(".micro .cardBody").click(openClouseMicro);startVideos();runSwiperSlide();runLightboxGif();initPhotoSwipeFromDOM('.demo-gallery');startLazyload();$('body').css('cursor','default');$("#loading").hide();}).complete(function()
{working=false;$("#loading").hide();});}}});}
function startScrollTimeline()
{var pagina=0;var working=false;var notMore=false;$(window).scroll(function(){var scroll=$(window).scrollTop();if($(window).height()+scroll>=($(document).height()-360))
{if(working||notMore)return;working=true;pagina=pagina+24;$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+'home/timeline/'+pagina,{},function(data){if(!data)
{notMore=true;}
var $html=$('<div>'+data+'</div>');$html.find('.addItem').each(function(){var $item=$(this);$forAppend=$($(this).html());$('#notas').append($forAppend);$('.grid').masonry('appended',$forAppend).masonry('reloadItems');$item.remove();});$forAppend=$($html.html());$('.grid').masonry().append($forAppend).masonry('appended',$forAppend).masonry('reloadItems');$(".micro .cardBody").click(openClouseMicro);startVideos();runSwiperSlide();runLightboxGif();initPhotoSwipeFromDOM('.demo-gallery');startLazyload();$('body').css('cursor','default');$("#loading").hide();cargaPartidosTarjeta();}).complete(function()
{working=false;$("#loading").hide();});}});}
function startScrollComments(object_id,comment_type,comment_time,canonical)
{var working=false;var notMore=false;$(window).scroll(function(){if($("#more_comments").val()>0){var scroll=$(window).scrollTop();if($(window).height()+scroll>=($(document).height()-360))
{if(working||notMore)return;working=true;$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+'comentarios/ver_todos',{objeto_id:object_id,tipo:comment_type,tiempo:comment_time,canonical:canonical},function(data){if(!data)
{notMore=true;}
$('#comments').html(data);$('#more_comments').val('0');$('body').css('cursor','default');$("#loading").hide();}).complete(function()
{working=false;$("#loading").hide();});}}});}
function startComments(object_id,comment_type,comment_time,canonical)
{$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+'comentarios/ver_todos',{objeto_id:object_id,tipo:comment_type,tiempo:comment_time,canonical:canonical},function(data){if(!data)
{notMore=true;}
$('#comments').html(data);$('#more_comments').val('0');$('body').css('cursor','default');$("#loading").hide();}).complete(function()
{working=false;$("#loading").hide();});}
function startScrollGalerias(p_url)
{var pagina=0;var working=false;var notMore=false;$(window).scroll(function(){if($("#mas_notas").val()>0)
{var scroll=$(window).scrollTop();if($(window).height()+scroll>=($(document).height()-360))
{if(working||notMore)return;working=true;pagina=pagina+18;$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+p_url+'/listado_mas',{start:pagina},function(data){if(!data)
{notMore=true;}
var $html=$('<div>'+data+'</div>');$html.find('.addItem').each(function(){var $item=$(this);$forAppend=$($(this).html());$('#notas').append($forAppend);$('.grid').masonry('appended',$forAppend).masonry('reloadItems');$item.remove();});$forAppend=$($html.html());$('.grid').masonry().append($forAppend).masonry('appended',$forAppend).masonry('reloadItems');startLazyload();$('body').css('cursor','default');$("#loading").hide();}).complete(function()
{working=false;$("#loading").hide();});}}});}
var startScrollSeccionBlog=function(){var pagina=0;var working=false;var notMore=false;$(window).scroll(function(){if($("#mas_notas").val()>0)
{var scroll=$(window).scrollTop();if($(window).height()+scroll>=($(document).height()-360))
{if(working||notMore)return;working=true;pagina=pagina+20;seccion=$("#mas_notas").val();$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+'blogs/listado_mas',{id_seccion:seccion,start:pagina},function(data){if(!data)
{notMore=true;}
var $html=$('<div>'+data+'</div>');$html.find('.addItem').each(function(){var $item=$(this);$forAppend=$($(this).html());$('#notas').append($forAppend);$('.grid').masonry('appended',$forAppend).masonry('reloadItems');$item.remove();});$forAppend=$($html.html());$('.grid').masonry().append($forAppend).masonry('appended',$forAppend).masonry('reloadItems');startLazyload();$('body').css('cursor','default');$("#loading").hide();}).complete(function()
{working=false;$("#loading").hide();});}}});}
function startScrollVideo(){var pagina=0;var working=false;var notMore=false;$(window).scroll(function(){if($("#mas_notas").val()>0)
{var scroll=$(window).scrollTop();if($(window).height()+scroll>=($(document).height()-360))
{if(working||notMore)return;working=true;pagina=pagina+19;$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+'canalesdevideo/mas_videos',{start:pagina},function(data){if(!data)
{notMore=true;}
var $html=$('<div>'+data+'</div>');$html.find('.addItem').each(function(){var $item=$(this);$forAppend=$($(this).html());$('#notas').append($forAppend);$('.grid').masonry('appended',$forAppend).masonry('reloadItems');$item.remove();});$forAppend=$($html.html());$('.grid').masonry().append($forAppend).masonry('appended',$forAppend).masonry('reloadItems');$(".micro .cardBody").click(openClouseMicro);startVideos();startLazyload();$('body').css('cursor','default');$("#loading").hide();}).complete(function()
{working=false;$("#loading").hide();});}}});}
function reloadCaptcha()
{$('#captcha_image').attr('src',URL_ACTUAL+'comentarios/generar_captcha?'+Math.random());$('#captcha_code').attr('value','');}
function reloadCaptchaResponse()
{$('#captcha_image_response').attr('src',URL_ACTUAL+'comentarios/generar_captcha?'+Math.random());$('#captcha_code_response').attr('value','');}
function comment()
{var comment=$('#target').val();var comment_type=$('#comment_type').val();var object_id=$('#object_id').val();var captcha_code=$('#captcha_code').val();var recaptcha_code=$('#recaptcha_google').val();if(comment!="")
{if(comment.length<1000)
{$("#btnComent").hide();$("#loading_com").show();$.post(URL_ACTUAL+'comentarios/comentar/'+object_id,{comentario:comment,codigo_seguridad:captcha_code,tipo:comment_type,token:recaptcha_code},function(data){var message=' '+data.msj;if(data.estado)
{var type='alert-success';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-check-free"></i>'+message+'</div>');$("#target").val("");setTimeout('location.reload()',5000);pushEventGTM('comentarios','publicacion','publicar',object_id,1);}
else
{var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');if(data.captcha)
{reloadCaptcha();$("#captcha_code").val('');$("#captcha_lg").show();}
if(data.clerform)
{$("#target").val("");$("#captcha_code").val('');$("#target").focus();}
if(data.modalNoti)
$('#modalNotiCom').modal();if(data.sesion)
setTimeout('location.reload()',5000);if(data.btnshow)
$("#btnComent").show();$("#loading_com").hide();}
alertDismiss();},'json');}
else
{var message=' Su comentario no debe superar los 1000 caracteres.';var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');alertDismiss();}}
else
{var message=' Debe ingresar un comentario.';var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');alertDismiss();}}
function responseComment(user,comment_id)
{$('#userComment').text(user);$('#btnResponse').attr('onclick','commentComment('+comment_id+')');$('.modalComment').modal('toggle');}
function commentComment(comment_id)
{var comment=$('#target_response').val();var comment_type=$('#comment_type_response').val();var object_id=$('#object_id_response').val();var captcha_code=$('#captcha_code_response').val();var recaptcha_code=$('#recaptcha_google').val();if(comment!="")
{if(comment.length<1000)
{$("#btnResponse").hide();$("#loading_com_response").show();$.post(URL_ACTUAL+'comentarios/comentar/'+object_id,{comentario:comment,codigo_seguridad:captcha_code,tipo:comment_type,id_comentario:comment_id,token:recaptcha_code},function(data){var message=' '+data.msj;if(data.estado)
{var type='alert-success';$('#alert_response').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-check-free"></i>'+message+'</div>');$("#target").val("");setTimeout('location.reload()',5000);pushEventGTM('comentarios','publicacion','publicar',object_id,1);}
else
{var type='alert-warning';$('#alert_response').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');if(data.captcha)
{reloadCaptchaResponse();$("#captcha_code_response").val('');$("#captcha_lg_2").show();}
if(data.clerform)
{$("#target_response").val("");$("#captcha_code_response").val('');$("#target_response").focus();}
if(data.modalNoti)
{$('#modalNotiCom').modal();$('.modalComment').modal('toggle');}
if(data.sesion)
setTimeout('location.reload()',5000);if(data.btnshow)
$("#btnResponse").show();$("#loading_com_response").hide();}
alertDismiss();},'json');}
else
{var message=' Su comentario no debe superar los 1000 caracteres.';var type='alert-warning';$('#alert_response').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');alertDismiss();}}
else
{var message=' Debe ingresar un comentario.';var type='alert-warning';$('#alert_response').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');alertDismiss();}}
function voteComment(comment_id,object_id,comment_type,vote_type)
{if(comment_id>0)
{var alert=true;if(vote_type==1)
{$('#votePos_'+comment_id).hide();$('#loadingPos_'+comment_id).show();}
else
{$('#voteNeg_'+comment_id).hide();$('#loadingNeg_'+comment_id).show();}
$.post(URL_ACTUAL+'comentarios/votar',{comentario_id:comment_id,voto_tipo:vote_type,objeto_id:object_id,tipo:comment_type},function(data){switch(data)
{case"0":var message=' Ya votó este comentario.';var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');if(vote_type==1)
{$("#loadingPos_"+comment_id).hide();$("#votePos_"+comment_id).show();$("#votePos_"+comment_id).attr('onclick','');}
else
{$("#loadingNeg_"+comment_id).hide();$("#voteNeg_"+comment_id).show();$("#voteNeg_"+comment_id).attr('onclick','');}
break;case"-2":var message=' Has superado la cantidad de votos permitidos por día.';var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');if(vote_type==1)
{$("#loadingPos_"+comment_id).hide();$("#votePos_"+comment_id).show();$("#votePos_"+comment_id).attr('onclick','');}
else
{$("#loadingNeg_"+comment_id).hide();$("#voteNeg_"+comment_id).show();$("#voteNeg_"+comment_id).attr('onclick','');}
break;case"-1":var message=' Intente mas tarde.';var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');if(vote_type==1)
{$("#loadingPos_"+comment_id).hide();$("#votePos_"+comment_id).show();$("#votePos_"+comment_id).attr('onclick','');}
else
{$("#loadingNeg_"+comment_id).hide();$("#voteNeg_"+comment_id).show();$("#voteNeg_"+comment_id).attr('onclick','');}
break;case'400':showMsjCom('v');alert=false;if(vote_type==1)
{$("#loadingPos_"+comment_id).hide();$("#votePos_"+comment_id).show();}
else
{$("#loadingNeg_"+comment_id).hide();$("#voteNeg_"+comment_id).show();}
break;default:if(vote_type==1)
{$("#loadingPos_"+comment_id).hide();$("#votePos_"+comment_id).show();$("#votePos_"+comment_id).html('<i class="icon-like"></i>'+data);$("#votePos_"+comment_id).attr('onclick','');alert=false;pushEventGTM('comentarios','votacion','like',object_id,1);}
else
{$("#loadingNeg_"+comment_id).hide();$("#voteNeg_"+comment_id).show();$("#voteNeg_"+comment_id).html('<i class="icon-unlike"></i>'+data);$("#voteNeg_"+comment_id).attr('onclick','');alert=false;pushEventGTM('comentarios','votacion','dislike',object_id,1);}
break;}
if(alert)
alertDismiss();});}}
function voteShareComment(comment_id,object_id,comment_type,vote_type)
{if(comment_id>0)
{var alert=true;if(vote_type==1)
{$('#voteSharePos_'+comment_id).hide();$('#loadingSharePos_'+comment_id).show();}
else
{$('#voteShareNeg_'+comment_id).hide();$('#loadingShareNeg_'+comment_id).show();}
$.post(URL_ACTUAL+'comentarios/votar',{comentario_id:comment_id,voto_tipo:vote_type,objeto_id:object_id,tipo:comment_type},function(data){switch(data)
{case"0":var message=' Ya votó este comentario.';var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');if(vote_type==1)
{$("#loadingSharePos_"+comment_id).hide();$("#voteSharePos_"+comment_id).show();$("#voteSharePos_"+comment_id).attr('onclick','');}
else
{$("#loadingShareNeg_"+comment_id).hide();$("#voteShareNeg_"+comment_id).show();$("#voteShareNeg_"+comment_id).attr('onclick','');}
break;case"-2":var message=' Has superado la cantidad de votos permitidos por día.';var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');if(vote_type==1)
{$("#loadingPos_"+comment_id).hide();$("#votePos_"+comment_id).show();$("#votePos_"+comment_id).attr('onclick','');}
else
{$("#loadingNeg_"+comment_id).hide();$("#voteNeg_"+comment_id).show();$("#voteNeg_"+comment_id).attr('onclick','');}
break;case"-1":var message=' Intente mas tarde.';var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+message+'</div>');if(vote_type==1)
{$("#loadingSharePos_"+comment_id).hide();$("#voteSharePos_"+comment_id).show();$("#voteSharePos_"+comment_id).attr('onclick','');}
else
{$("#loadingShareNeg_"+comment_id).hide();$("#voteShareNeg_"+comment_id).show();$("#voteShareNeg_"+comment_id).attr('onclick','');}
break;default:if(vote_type==1)
{$("#loadingSharePos_"+comment_id).hide();$("#voteSharePos_"+comment_id).show();$("#voteSharePos_"+comment_id).html('<i class="icon-like"></i>'+data);$("#voteSharePos_"+comment_id).attr('onclick','');alert=false;}
else
{$("#loadingShareNeg_"+comment_id).hide();$("#voteShareNeg_"+comment_id).show();$("#voteShareNeg_"+comment_id).html('<i class="icon-unlike"></i>'+data);$("#voteShareNeg_"+comment_id).attr('onclick','');alert=false;}
break;}
if(alert)
alertDismiss();});}}
function reportAbuse(comment_id,object_id,usuario_id)
{if(comment_id>0)
{var showAlert=true;$("#report_"+comment_id).hide();$.post(URL_ACTUAL+'comentarios/reportar_abuso',{comentario_id:comment_id,nota_id:object_id},function(data){if(!data.estado)
{if(data.session)
{var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+data.msj+'</div>');}
else
{showMsjCom('r');showAlert=false;}}
else
{var type='alert-success';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-check-free"></i>'+data.msj+'</div>');pushEventGTM('comentarios','publicacion','denunciar',data.usuario_id,1);}
if(showAlert)
{alertDismiss();$("#report_"+comment_id).attr('onclick','');}},'json');}}
function share(url)
{var dialogWin=new Object();dialogWin.width=700;dialogWin.height=435;now=new Date();var millis=now.getTime();var mstr=""+millis;if(navigator.appName=="Netscape")
{dialogWin.left=window.screenX+((window.outerWidth-dialogWin.width)/2);dialogWin.top=window.screenY+((window.outerHeight-dialogWin.height)/2);var attr='screenX='+dialogWin.left+',screenY='+dialogWin.top+',resizable=no,width='+dialogWin.width+',height='+dialogWin.height+',scrollbars=yes,menubar=no,location=no,toolbar=no,status=no,directories=no';}
else if(document.all)
{dialogWin.left=(screen.width-dialogWin.width)/2;dialogWin.top=(screen.height-dialogWin.height)/2;var attr='left='+dialogWin.left+',top='+dialogWin.top+',resizable=no,width='+dialogWin.width+',height='+dialogWin.height+',scrollbars=yes,menubar=no,location=no,toolbar=no,status=no,directories=no';}
window.open(url,'Redes',attr);$('#modalShare').modal('hide');}
function shareModal(urlF,urlT,urlW)
{$('#modalShare').modal();$(".js-shareF").attr('href',"javascript:share('"+urlF+"')");$(".js-shareT").attr('href',"javascript:share('"+urlT+"')");$(".js-shareW").attr('href',"javascript:share('"+urlW+"')");}
function shareModal2(urlF,urlT,urlW,urlCP)
{$('#modalShare').modal();$(".js-shareF").attr('href',"javascript:share('"+urlF+"')");$(".js-shareT").attr('href',"javascript:share('"+urlT+"')");$(".js-shareW").attr('href',"javascript:share('"+urlW+"')");$(".js-shareCP").attr('href',"javascript:copyToClipboard('"+urlCP+"')");}
function shareModal3(urlF,urlT,urlW,urlCP,v_nota_id)
{$('#modalShare').modal();$(".js-shareF").attr('href',"javascript:share('"+urlF+"')");$(".js-shareT").attr('href',"javascript:share('"+urlT+"')");$(".js-shareW").attr('href',"javascript:share('"+urlW+"')");$(".js-shareCP").attr('href',"javascript:copyToClipboard('"+urlCP+"')");$(".js-shareT").attr('onclick',"send_share_tw_wh("+v_nota_id+")");$(".js-shareW").attr('onclick',"send_share_tw_wh("+v_nota_id+")");}
function saveNote(p_note_id,p_tipo)
{$('#icon_'+p_note_id).hide();$('#loading_'+p_note_id).show();$.post(URL_ACTUAL+"nota/guardar_nota",{nota_id:p_note_id,tipo:p_tipo},function(data){switch(data.msg){case 1:$('#alert').html('<div class="alert alert-success animated fadeInUpBig" role="alert"><i class="icon-check-free"></i> '+data.text+' <a href="'+data.url+'" class="alert-link">Ver todas</a></div>');$('#icon_'+p_note_id).attr('class','active');$('#icon_'+p_note_id).attr('onclick','notSaveNote('+p_note_id+','+p_tipo+')');break;case 2:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');break;case 3:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+' <a href="'+data.url+'" class="alert-link">Ver todas</a></div>');$('#icon_'+p_note_id).attr('class','active');$('#icon_'+p_note_id).attr('onclick','notSaveNote('+p_note_id+','+p_tipo+')');break;case 4:$('#alert').html('<div class="alert alert-info animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');break;default:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');break;}
alertDismiss();$('#loading_'+p_note_id).hide();$('#icon_'+p_note_id).show();},'json');}
function notSaveNote(p_note_id,p_tipo)
{$('#icon_'+p_note_id).hide();$('#loading_'+p_note_id).show();$.post(URL_ACTUAL+"nota/no_guardar_nota",{nota_id:p_note_id,tipo:p_tipo},function(data){switch(data.msg){case 1:$('#alert').html('<div class="alert alert-success animated fadeInUpBig" role="alert"><i class="icon-check-free"></i> '+data.text+'</div>');$('#icon_'+p_note_id).attr('class','');$('#icon_'+p_note_id).attr('onclick','saveNote('+p_note_id+','+p_tipo+')');break;case 2:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');break;case 3:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');$('#icon_'+p_note_id).attr('class','');$('#icon_'+p_note_id).attr('onclick','saveNote('+p_note_id+','+p_tipo+')');break;default:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');break;}
alertDismiss();$('#loading_'+p_note_id).hide();$('#icon_'+p_note_id).show();},'json');}
function leer_share_fb(p_url,p_compartidas,p_id,p_tipo)
{$.post(URL_ACTUAL+'redes/compartidas',{objeto_id:p_id,tipo:p_tipo,url:p_url,comp_ant:p_compartidas},function(data){if(data.estado)
{$("#share-cont").html(data.total);}
else
$("#share-cont").html(p_compartidas);},'json');}
function send_share_tw_wh(p_id)
{$.post(URL_ACTUAL+'redes/shareTwWh',{objeto_id:p_id},function(data){},'json');}
function inicio_nota_lista(p_item_id,p_nota_id)
{var galleryTop=new Swiper('.gallery-top',{pagination:'.swiper-pagination',paginationClickable:true,nextButton:'.swiper-button-next',prevButton:'.swiper-button-prev',spaceBetween:0,slidesPerView:'auto',hashnav:true,hashnavWatchState:true,autoHeight:true,runCallbacksOnInit:false,onInit:function(){if(p_item_id)
{var current=$('#item_'+p_item_id).data('order');}
else
{var url_first=window.location.pathname;item_id=$('.headlines a:nth-child(1)').data('id');url_second=url_first+'?id='+item_id+'#slide1';window.location.href=url_second;var current='1';}
var count=$('.headlines a').length;$(".headBtn .cant").html('<b>'+current+'</b> de <span>'+count+'</span>');$('.headlines a:nth-child('+current+')').addClass('active');},onSlideChangeEnd:function(a,b,c){var hash=$(location).attr('hash');if(!hash)
{var current='1';var item_id=$('.headlines a:nth-child(1)').data('id');}
else
{var current=a.realIndex+1;if(current>$('.headlines a').length)
current=1;var item_id=$('.headlines a:nth-child('+current+')').data('id');}
url=window.location.pathname+'?id='+item_id+'#slide'+current;history.pushState(null,null,url);var result=parseFloat(current)+parseFloat(1);var count=$('.headlines a').length;$(".headBtn .cant").html('<b>'+current+'</b> de <span>'+count+'</span>');$('.headlines a').removeClass('active');$('.headlines a:nth-child('+current+')').addClass('active');title=$('#notaLista'+p_nota_id).data('title');dataLayer.push({'event':'VirtualPageview','virtualPageURL':url,'virtualPageTitle':title+' - Lista #'+item_id+' - La Gaceta','virtualNotaID':p_nota_id,'virtualListaID':item_id});}});}
function startWidgetSport()
{var widgetSports=new Swiper('.widgetSports',{slidesPerView:5,spaceBetween:30,loop:false,nextButton:'.arrowNext',prevButton:'.arrowPrev',slidesPerGroup:5,autoplay:0,breakpoints:{1580:{slidesPerView:4,slidesPerGroup:4},1230:{slidesPerView:3,slidesPerGroup:3},930:{slidesPerView:2,slidesPerGroup:2,spaceBetween:20},595:{slidesPerView:1,slidesPerGroup:1}}});}
function startWidgetSportDesktop()
{var widgetSports=new Swiper('.widgetSportsIn',{slidesPerView:3,spaceBetween:30,loop:false,nextButton:'.arrowNext',prevButton:'.arrowPrev',slidesPerGroup:3,autoplay:0,breakpoints:{1580:{slidesPerView:3,slidesPerGroup:3},1230:{slidesPerView:3,slidesPerGroup:3},930:{slidesPerView:2,slidesPerGroup:2,spaceBetween:20},595:{slidesPerView:1,slidesPerGroup:1}}});}
$(function(){startWidgetSportDesktop();});function startWidgetClubLG()
{var triggers=$('ul.triggers li');var images=$('ul.images li');var lastElem=triggers.length-1;var target;triggers.first().addClass('active');images.hide().first().show();function sliderResponse(target){images.fadeOut(300).eq(target).fadeIn(300);triggers.removeClass('active').eq(target).addClass('active');}
triggers.click(function(){if(!$(this).hasClass('active')){target=$(this).index();sliderResponse(target);resetTiming();}});function sliderTiming(){target=$('ul.triggers li.active').index();target===lastElem?target=0:target=target+1;sliderResponse(target);}
var timingRun=setInterval(function(){sliderTiming();},5000);function resetTiming(){clearInterval(timingRun);timingRun=setInterval(function(){sliderTiming();},5000);}}
$(function(){startWidgetClubLG();});var minxmin={intervalos:{},getTime:function(fechaEstado){var d=new Date();var date1=new Date(fechaEstado);var d1=date1.getTime();var date2=new Date();var d2=date2.getTime();var dif=(d2-d1);var h=parseInt(dif/1000/60/60);var m=parseInt((dif/1000/60)-(h*60));var s=parseInt((dif/1000)-(h*60*60)-(m*60));if(h>0)
return((h>9?h:'0'+h)+':'+(m>9?m:'0'+m)+':'+(s>9?s:'0'+s));else
return((m>9?m:'0'+m)+':'+(s>9?s:'0'+s));},showTimer:function(reloj,hora){var fecha=reloj.data('fecha-estado');hora.text(this.getTime(fecha));},getMatchData:function(id,callback){$.ajax({url:URL_ACTUAL+'partidos/mam_minuto/'+id,type:"GET",dataType:'json',success:function(data){callback(data);}});},iniciarReloj:function(reloj,id,hora){if(!minxmin.intervalos['reloj_'+id])
minxmin.intervalos['reloj_'+id]=setInterval(function(){minxmin.showTimer(reloj,hora)},1000);},stop:function(id){if(minxmin.intervalos['reloj_'+id])
clearInterval(minxmin.intervalos['reloj_'+id]);},startInterval:function(prefix,seconds,idPartido,callb){var self=this;minxmin.intervalos[prefix+idPartido]=setInterval(function(){self.getMatchData(idPartido,callb);},seconds*1000);},ajaxCall:function(element){var idPartido=element.data('id_partido');var estadoPartido=element.data('estado');var reloj=element.find('.js-reloj-mam');var hora=element.find('.js-hora');var reloj_id=reloj.data('uniq');var info=element.find('.js-descripcion-estado');var incidencias=element.find('.js-marquee');var iconplay=element.find('.js-icon-play');info.hide();var isCompact=reloj.data('compacto');var team_1_name=element.find('.js-local-name');var team_2_name=element.find('.js-visit-name');var team_1_shield=element.find('.js-local-shield');var team_2_shield=element.find('.js-visit-shield');var score=element.find('.js-score');var self=this;var callb=function(data){team_1_name.html(data.local_abbr);team_2_name.html(data.visita_abbr);team_1_shield.attr("src",data.escudo_local);team_2_shield.attr("src",data.escudo_visita);if(data.gol_penal_local)
score.html('<span>('+data.gol_penal_local+')</span>'+data.gol_local+' . '+data.gol_visita+'<span>('+data.gol_penal_visita+')</span>');else
score.html(data.gol_local+' . '+data.gol_visita);reloj.data('fecha-estado',data.fecha_inicio_estado);switch(parseInt(data.mam_estado)){case 0:if($("#iconClock").length)
hora.html(data.fecha_corta+' '+data.hora_inicio);else
hora.html(data.fecha_corta+' '+data.hora_inicio+' hrs');info.html('').hide();incidencias.data('marquee','');iconplay.hide();break;case 1:minxmin.iniciarReloj(reloj,reloj_id,hora);reloj.show();info.html('(PT)').show();incidencias.attr('data-marquee',data.incidencias);iconplay.show();break;case 2:minxmin.stop(reloj_id);hora.html('Finalizado');info.html('').hide();incidencias.attr('data-marquee',data.incidencias);iconplay.show();if($("#iconClock").length)
$("#iconClock").remove();break;case 3:minxmin.stop(reloj_id);hora.html('Suspendido');info.html('').hide();incidencias.attr('data-marquee',data.incidencias);iconplay.show();if($("#iconClock").length)
$("#iconClock").remove();break;case 4:minxmin.stop(reloj_id);hora.html('Postergado');info.html('').hide();iconplay.hide();if($("#iconClock").length)
$("#iconClock").remove();break;case 5:minxmin.stop(reloj_id);hora.html('ET');info.html('').hide();incidencias.attr('data-marquee',data.incidencias);iconplay.show();break;case 6:minxmin.iniciarReloj(reloj,reloj_id,hora);reloj.show();info.html('(ST)').show();incidencias.attr('data-marquee',data.incidencias);iconplay.show();break;case 7:minxmin.stop(reloj_id);hora.html('Alargue');info.html('').hide();incidencias.attr('data-marquee',data.incidencias);iconplay.show();break;case 8:minxmin.iniciarReloj(reloj,reloj_id,hora);reloj.show();info.html('(PTA)').show();incidencias.attr('data-marquee',data.incidencias);iconplay.show();break;case 9:minxmin.stop(reloj_id);hora.html('ET');info.html('').hide();incidencias.attr('data-marquee',data.incidencias);iconplay.show();break;case 10:minxmin.iniciarReloj(reloj,reloj_id,hora);reloj.show();info.html('(STA)').show();incidencias.attr('data-marquee',data.incidencias);iconplay.show();break;case 11:minxmin.stop(reloj_id);hora.html('Finalizado');info.html('').hide();incidencias.attr('data-marquee',data.incidencias);iconplay.show();if($("#iconClock").length)
$("#iconClock").remove();break;case 12:minxmin.stop(reloj_id);hora.html('Penales');info.html('').hide();incidencias.attr('data-marquee',data.incidencias);iconplay.show();if($("#iconClock").length)
$("#iconClock").remove();if(!minxmin.intervalos['penales_partido_'+idPartido]){clearInterval(minxmin.intervalos['partido_'+idPartido]);self.startInterval('penales_partido_',10,idPartido,callb);}
break;default:break;}};this.getMatchData(idPartido,callb);this.startInterval('partido_',60,idPartido,callb);},ajaxCallCards:function(element){var idPartido=element.data('pid');var team_1_name=element.find('.js-nombre-local');var team_2_name=element.find('.js-nombre-visita');var team_1_shield=element.find('.js-escudo-local');var team_2_shield=element.find('.js-escudo-visita');var score=element.find('.js-resultado');var callbCards=function(data){if(data.local_abbr)
{team_1_name.html(data.local_abbr);team_2_name.html(data.visita_abbr);team_1_shield.attr("src",data.escudo_local);team_2_shield.attr("src",data.escudo_visita);switch(parseInt(data.mam_estado)){case 2:if((data.gol_penal_local)||(data.gol_penal_visita))
score.html('<span>('+data.gol_penal_local+')<span> '+data.gol_local+' . '+data.gol_visita+' <span>('+data.gol_penal_visita+')</span>');else
score.html(data.gol_local+' . '+data.gol_visita);break;case 12:score.html('<span>('+data.gol_penal_local+')<span> '+data.gol_local+' . '+data.gol_visita+' <span>('+data.gol_penal_visita+')</span>');break;default:score.html(data.gol_local+' . '+data.gol_visita);break;}
element.show();}};this.getMatchData(idPartido,callbCards);}}
function cargaPartidosTarjeta()
{var dataPartidoTarjeta=$('.data-partido-tarjeta');dataPartidoTarjeta.each(function(){minxmin.ajaxCallCards($(this));});}
$(document).on('ready',function(){startVideos();var dataPartido=$('.data-partido');dataPartido.each(function(){minxmin.ajaxCall($(this));});cargaPartidosTarjeta();});function alertDismiss()
{window.setTimeout(function(){$(".alert").removeClass("fadeInUpBig");$(".alert").addClass("bounceOutRight");},4000);}
function saveThisNote(p_note_id,p_tipo)
{$('#icon_desktop_'+p_note_id).hide();$('#icon_mobile_'+p_note_id).hide();$('#load_desktop_'+p_note_id).show();$('#load_mobile_'+p_note_id).show();$.post(URL_ACTUAL+"nota/guardar_nota",{nota_id:p_note_id,tipo:p_tipo},function(data){switch(data.msg){case 1:$('#alert').html('<div class="alert alert-success animated fadeInUpBig" role="alert"><i class="icon-check-free"></i> '+data.text+' <a href="'+data.url+'" class="alert-link">Ver todas</a></div>');$('#icon_desktop_'+p_note_id).addClass('active');$('#icon_mobile_'+p_note_id).addClass('active');$('#icon_desktop_'+p_note_id).attr('onclick','notSaveThisNote('+p_note_id+','+p_tipo+')');$('#icon_mobile_'+p_note_id).attr('onclick','notSaveThisNote('+p_note_id+','+p_tipo+')');break;case 2:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');break;case 3:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+' <a href="'+data.url+'" class="alert-link">Ver todas</a></div>');$('#icon_desktop_'+p_note_id).addClass('active');$('#icon_mobile_'+p_note_id).addClass('active');$('#icon_desktop_'+p_note_id).attr('onclick','notSaveThisNote('+p_note_id+','+p_tipo+')');$('#icon_mobile_'+p_note_id).attr('onclick','notSaveThisNote('+p_note_id+','+p_tipo+')');break;default:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');break;}
alertDismiss();$('#load_desktop_'+p_note_id).hide();$('#load_mobile_'+p_note_id).hide();$('#icon_desktop_'+p_note_id).show();$('#icon_mobile_'+p_note_id).show();},'json');}
function notSaveThisNote(p_note_id,p_tipo)
{$('#icon_desktop_'+p_note_id).hide();$('#icon_mobile_'+p_note_id).hide();$('#load_desktop_'+p_note_id).show();$('#load_mobile_'+p_note_id).show();$.post(URL_ACTUAL+"nota/no_guardar_nota",{nota_id:p_note_id},function(data){switch(data.msg){case 1:$('#alert').html('<div class="alert alert-success animated fadeInUpBig" role="alert"><i class="icon-check-free"></i> '+data.text+'</div>');$('#icon_desktop_'+p_note_id).removeClass('active');$('#icon_mobile_'+p_note_id).removeClass('active');$('#icon_desktop_'+p_note_id).attr('onclick','saveThisNote('+p_note_id+','+p_tipo+')');$('#icon_mobile_'+p_note_id).attr('onclick','saveThisNote('+p_note_id+','+p_tipo+')');break;case 2:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');break;case 3:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');$('#icon_desktop_'+p_note_id).removeClass('active');$('#icon_mobile_'+p_note_id).removeClass('active');$('#icon_desktop_'+p_note_id).attr('onclick','saveThisNote('+p_note_id+','+p_tipo+')');$('#icon_mobile_'+p_note_id).attr('onclick','saveThisNote('+p_note_id+','+p_tipo+')');break;default:$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.text+'</div>');break;}
alertDismiss();$('#load_desktop_'+p_note_id).hide();$('#load_mobile_'+p_note_id).hide();$('#icon_desktop_'+p_note_id).show();$('#icon_mobile_'+p_note_id).show();},'json');}
function search_now()
{value=$.trim($("#side_search").val());word=value.replace(/ /gi,"_");word2=word.replace(/\./gi,"_");word2=word2.toLowerCase();window.location=URL_ACTUAL+'buscar?q='+word2;}
function search_now_advanced()
{value=$.trim($("#side_search_advanced").val());word=value.replace(/ /gi,"_");word2=word.replace(/\./gi,"_");word2=word2.toLowerCase();url=URL_ACTUAL+'buscar?q='+word2;$("#searchForm").attr("action",url);$("#searchForm").submit();$("#notas").html('<img src="'+URL_ACTUAL+'images/loading.gif" alt="Loading" style="margin: 0 0 10% 45%; width: 50px;"/>');}
function limpiar_fechas()
{$(".date").val('');}
$(document).on('ready',function(){$("#side_search").bind('keypress',function(event){if(event.keyCode=='13')
search_now();});$("#captcha_code").bind('keypress',function(event)
{if(event.keyCode=='13')
comment();});$("#side_search_advanced").bind('keypress',function(event)
{if(event.keyCode=='13')
search_now_advanced();});});var startScrollSearch=function(){var working=false;var notMore=false;var pagina_buscador=0;$(window).scroll(function(){if($("#mas_notas").val()!=0)
{var scroll=$(window).scrollTop();if($(window).height()+scroll>=($(document).height()-360))
{if(working||notMore)return;working=true;pagina_buscador=pagina_buscador+20;p_keyword=$("#palabra").val();vdesde=$("#fdesde").val();vhasta=$("#fhasta").val();$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+'buscar/nueva_busqueda_mas',{palabra:p_keyword,fecha_desde:vdesde,fecha_hasta:vhasta,start:pagina_buscador},function(data){if(data.estado)
{$("#notas").append(data.html);}
else
notMore=true;$('body').css('cursor','default');$("#loading").hide();},'json').complete(function()
{working=false;$("#loading").hide();});}}});}
function big_banner_init()
{if($(window).width()>=1300)
{var i=0;function ensanchar()
{if($("#div-gpt-ad-1530306059224-1").is(":visible"))
{$("#central").addClass("addRight");$("#header").addClass("addRight");$("#footerhome").addClass("addRight");var w=window.innerWidth;var c=$('.news .container').width();$('.addFloat').css({'right':(w-c)/2-151}).addClass('animated fadeIn');$(window).resize(function(){var w=window.innerWidth;var c=$('.news .container').width();$('.addFloat').css({'right':(w-c)/2-150});});if($("#div-gpt-ad-1530306059224-29").is(":visible"))
$("#div-gpt-ad-1530306059224-29").css("margin-left",'-610px');clearInterval(refreshIntervalId);}
i=i+1;if(i>30)
{clearInterval(refreshIntervalId);}}
var refreshIntervalId=setInterval(function(){ensanchar()},2000);}}
var startScrollColumnist=function(){var pagina=0;var working=false;var notMore=false;$(window).scroll(function(){if($("#mas_periodistas").val()>0)
{var scroll=$(window).scrollTop();if($(window).height()+scroll>=($(document).height()-360))
{if(working||notMore)return;working=true;pagina=pagina+18;$("#loading").show();$('body').css('cursor','wait');$.post(URL_ACTUAL+'columnistas/listado_mas',{start:pagina},function(data){if(!data)
{notMore=true;}
$('body').css('cursor','default');$("#loading").hide();$("#periodistas").append(data);}).complete(function()
{working=false;$("#loading").hide();});}}});}
function countWords()
{s=$("#mensaje").val();s=s.replace(/(^\s*)|(\s*$)/gi,"");s=s.replace(/[ ]{2,}/gi," ");s=s.replace(/\n /,"\n");palabras=s.split(' ').length;return palabras;}
function sendContact()
{$("span.error").html('');$("input, textarea").removeClass('error');$("#enviar_contacto").hide();$("#loading").show();var validado=true;if($("#nombre").val()=="")
{$("#nombre").addClass('error');$("#msj_nombre").text('Ingresá tu nombre y apellido.');validado=false;}
if($("#email").val()=="")
{$("#email").addClass('error');$("#msj_email").text('Ingresá tu dirección de E-mail.');validado=false;}
if($("#mensaje").val()=="")
{$("#mensaje").addClass('error');$("#msj_mensaje").text('Ingresá el mensaje que deseas enviar.');validado=false;}
else
{if(countWords()>400){$("#mensaje").addClass('error');$("#msj_mensaje").text('El texto ingresado es mayor a 400 palabras.');validado=false;}}
if($("#telcod").val()!="")
{if($("#telcod").val()<2||$("#telnum").val()=="")
{$("#telcod").addClass('error');$("#telnum").addClass('error');$("#msj_telefono").text('El número de teléfono ingresado no es válido.');validado=false;}}
if($("#telnum").val()!=""){if($("#telcod").val()==""||$("#telnum").val()<6)
{$("#telcod").addClass('error');$("#telnum").addClass('error');$("#msj_telefono").text('El número de teléfono ingresado no es válido.');validado=false;}}
if(validado)
{$.post(URL_ACTUAL+'contactenos/enviar',{motivo:$("#motivo").val(),nombre:$("#nombre").val(),email:$("#email").val(),telefono:$("#telcod").val()+"-"+$("#telnum").val(),texto:$("#mensaje").val(),codigo:$("#captcha_code").val(),token:$("#captcha_v3").val()},function(data){switch(data.codigo)
{case"ok":var message=data.msj;var type='alert-success';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-check-free"></i>'+message+'</div>');$(".field").val('');alertDismiss();break;case"ko":var message=data.msj;var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-check-free"></i>'+message+'</div>');alertDismiss();break;case"error_info":var message=data.msj;var type='alert-warning';$('#alert').html('<div class="alert '+type+' animated fadeInUpBig" role="alert"><i class="icon-check-free"></i>'+message+'</div>');alertDismiss();break;case"error_email":$("#email").addClass('error');$("#msj_email").text(data.msj);break;case"error_tamtexto":$("#mensaje").addClass('error');$("#msj_mensaje").text(data.msj);break;case"error_codigo":$("#captcha_lg").show();$("#captcha_code").addClass('error');$("#msj_captcha_code").text(data.msj);reloadCaptcha();break;}
$("#enviar_contacto").show();$("#loading").hide();},'json');}
else
{$("#enviar_contacto").show();$("#loading").hide();}
$("#mensaje").focusout(function(){var texto=countWords();if(texto>400)
{$("#palabras").html(countWords()+" palabras.");$("#mensaje").addClass('error');$("#msj_mensaje").text('El texto posee demasiadas palabras. El máximo permitido es de 400.');}
if($("#mensaje").val()!="")
$("#palabras").html(countWords()+" palabras.");else
$("#palabras").html("Hasta 400 palabras");});}
function startLazyload()
{$(".lazy").lazyload({effect:"fadeIn",threshold:1500,load:function(){$(this).removeClass('lazy');}});}
function hideSlideNotes()
{var array=[6,7,8,9,10,11];$.each(array,function(i,val){$("#slide_note_"+val).hide();});}
function showSlideNotes()
{var array=[6,7,8,9,10,11];$.each(array,function(i,val){$("#slide_note_"+val).show();});$('#moreSlideNotes').hide();$('.gradient').hide();}
function fixedBarShare()
{$(".tracker").stick_in_parent({parent:'.track',spacer:'.spacer'});}
function topRankingRight(p_type)
{$("#ranking_right").hide();$("#loading_ranking_right").show();$.post(URL_ACTUAL+'nota/dame_notas_ranking',{tipo:p_type},function(data){if(data.estado)
{if(p_type==1)
{$("#link_02").removeClass("active");$("#link_01").addClass("active");}
else
{$("#link_01").removeClass("active");$("#link_02").addClass("active");}
$("#ranking_right").html(data.html);$("#ranking_right").show();$("#loading_ranking_right").hide();}
else
{$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+data.msj+'</div>');alertDismiss();$("#ranking_right").show();$("#loading_ranking_right").hide();}},'json');}
function startVectorMap()
{$('#map').vectorMap({map:'ar_mill_en',regionsSelectable:true,regionsSelectableOne:true,backgroundColor:'#FFF',zoomOnScroll:false,zoomButtons:false,selectedRegions:'AR-A',regionStyle:{initial:{fill:'#bbbbbb',"fill-opacity":1},hover:{fill:'#999999',"fill-opacity":1,cursor:'pointer'},selected:{fill:'#0067B6',"fill-opacity":1}},onRegionClick:function(event,code){updateWeather(code);},});}
function updateWeather(p_code)
{$('#datos_clima').html('<img src="'+URL_ACTUAL+'images/loading2.gif" alt="Loading"/>');$.post(URL_ACTUAL+'servicios/actualizar_pronostico',{codigo:p_code},function(data){$("#datos_clima").html(data.html);},'json');}
function changeDivisa()
{var img=URL_ACTUAL+"img/loading2.gif";var recarga=URL_ACTUAL+"servicios/grafico_divisa/"+$("#select-divisa").val();var $myNewElement=$('<iframe width="100%" height="500" id="i-divisa" src="'+recarga+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>');$("#graf01").addClass('cont-grafico');$('#graf01 iframe').remove();$('#graf01').append($myNewElement);$("#graf01").removeClass('cont-grafico');}
function changeIndice()
{var img=URL_ACTUAL+"img/loading2.gif";var recarga=URL_ACTUAL+"servicios/grafico_indice/"+$("#select-indice").val();var $myNewElement=$('<iframe width="100%" height="500" id="i-indice" src="'+recarga+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>');$("#graf02").addClass('cont-grafico');$('#graf02 iframe').remove();$('#graf02').append($myNewElement);$("#graf02").removeClass('cont-grafico');}
function topRankingMobile(p_type)
{$("#ranking_mobile").hide();$("#loading_ranking_mobile").show();$.post(URL_ACTUAL+'nota/dame_notas_ranking_mobile',{tipo:p_type},function(data){if(data.estado)
{if((p_type==1)||(p_type==3))
{$("#link_02").removeClass("active");$("#link_01").addClass("active");}
else
{$("#link_01").removeClass("active");$("#link_02").addClass("active");}
$("#ranking_mobile").html(data.html);$("#ranking_mobile").show();$("#loading_ranking_mobile").hide();$('.grid').masonry();}
else
{$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+data.msj+'</div>');alertDismiss();$("#ranking_mobile").show();$("#loading_ranking_mobile").hide();}},'json');}
$('#closeCom').click(function(){$('.commentShare').fadeOut('fast');});function copyToClipboard(p_url)
{var $temp=$("<input>");$("body").append($temp);$temp.val(p_url).select();document.execCommand("copy");$temp.remove();$('#modalShare').modal('hide');}
function checkUser(p_origen)
{$.post(URL_ACTUAL+'ajax/chequear_usuario',{retorno:CURRENT_URL,origen:p_origen},function(data){if(data.estado)
{$("#user_menu").html(data.html_menu);$("#user_notification").html(data.html_notificacion);$("#user_notification_mobile").html(data.html_notificacion_mobile);if(typeof sendUserPW==='function')
callSignPW=setInterval(function(){sendUserPW(true,data.user);},500);}
else
{$("#user_menu").html(data.html_menu);$("#user_notification").html(data.html_notificacion);if(typeof sendUserPW==='function')
callSignPW=setInterval(function(){sendUserPW(false,false);},500);}},'json');}
function rememberLate()
{$.post(URL_ACTUAL+'usuarios/remember_late_notif',{},function(data){},'json');$("#modalNotiCom").modal('hide');}
function updateProfile(p_idform)
{$("#noti-error").html('');$("#botones").hide();$("#loading-noti").show();var datos=$("#"+p_idform).serializeArray();$.post(URL_ACTUAL+'usuarios/update_profile',datos,function(data){if(data.estado)
{$("#form-noti-modal").html('<div class="icon"><i class="icon-users"></i></div><h2>'+data.msj+'</h2>');}
else
{$("#noti-error").html(data.msj);$("#loading-noti").hide();$("#botones").show();}},'json');}
function ajax_sociales(p_id,p_tipo,p_canonical,p_es_vivo,p_seccion_banner)
{$.post(URL_ACTUAL+"ajax/sociales",{objeto_id:p_id,tipo:p_tipo,canonical:p_canonical,es_vivo:p_es_vivo,seccion_banner_id:p_seccion_banner},function(data){if(data.comentarios.permiso)
{$("#htmlcomentarios").html(data.comentarios.html);if(data.comentarios.totalcomentarios>0)
{$(".totalcomentarios").append(data.comentarios.totalcomentarios);$("#totalcomentarios_msj").html(data.comentarios.msj);}
else
$(".totalcomentarios").hide();}
else
$("#comentarios").hide();if(data.compartidas.total>0)
{$('.totalcompartidas').css('display','inline');$('#share-cont').html(data.compartidas.total);}},"json");}
function showloading()
{if($("#modalmodal").length)
{$("#modalmodal").show();}
else
{$('body').append('<div id="modalmodal"><img src="'+URL_ACTUAL+'images/loading.gif"></div>');$('#modalmodal').css('width','100%');$('#modalmodal').css('height','100%');$('#modalmodal').css('z-index','1009');$('#modalmodal').css('top','0px');$('#modalmodal').css('left','0px');$('#modalmodal').css('background','rgba(255,255,255,.7)');$('#modalmodal').css('position','fixed');$('#modalmodal').css('overflow','hidden');$('#modalmodal').css('text-align','center');$('#modalmodal img').css('position','relative');$('#modalmodal img').css('top','50%');}}
function hideloading()
{if($("#modalmodal").length)
{$("#modalmodal").hide();}}
function setNotifications(p_valor,p_uuid)
{showloading();$.post(URL_ACTUAL+"ajax/changeNotifications",{valor:p_valor,device_id:p_uuid},function(data){hideloading();if(data.estado)
{if(data.valor==1)
{$("#check_notis_label_app").html('Desactivar');$("#check_notis_app").attr("onclick","setNotifications(0)");}
else
{$("#check_notis_label_app").html('Activar');$("#check_notis_app").attr("onclick","setNotifications(1)");}
$('#alert').html('<div class="alert alert-success animated fadeInUpBig" role="alert"><i class="icon-check-free"></i> '+data.msj+'</div>');}
else
$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i> '+data.msj+'</div>');alertDismiss();},"json");}
function pushEventGTM(p_event,p_category,p_action,p_label,p_value)
{dataLayer.push({'event':p_event,'eventCategory':p_category,'eventAction':p_action,'eventLabel':p_label,'eventValue':p_value});}
function showMsjCom(p_p)
{if(p_p=='c')
{$("#regcom").show();$("#votecom").hide();$("#voterep").hide();}
else if(p_p=='v')
{$("#votecom").show();$("#regcom").hide();$("#voterep").hide();}
else
{$("#voterep").show();$("#regcom").hide();$("#votecom").hide();}
$('#nocom').modal();}
function closeZocalo()
{$.post(URL_ACTUAL+"ajax/close_zocalo",{},function(data){},"json");}
function reCaptchaInit(p_key,p_action,p_inputVal)
{grecaptcha.ready(function(){grecaptcha.execute(p_key,{action:p_action}).then(function(token){var recaptchaResponse=document.getElementById(p_inputVal);recaptchaResponse.value=token;});});}
function salir(p_retorno)
{showloading();$.ajaxSetup({crossDomain:true,xhrFields:{withCredentials:true}});$.post(URL_CUENTA+'usuarios/logout/'+p_retorno,{},function(data)
{if(!data.estado)
{$('#alert').html('<div class="alert alert-warning animated fadeInUpBig" role="alert"><i class="icon-wrong"></i>'+data.msj+'</div>');hideloading();alertDismiss();}
else
{callSignPW=setInterval(function(){sendUserPW(false,false);},500);window.location=data.url;}},'json');}
function sendUserPW(is_log,userInfo)
{if((typeof paywall!=='undefined')&&(typeof paywall.auth!=='undefined'))
{if(is_log)
{if(!paywall.auth.user())
{paywall.queue.push(['invoke','signIn',{id:userInfo.id,email:userInfo.email,first_name:userInfo.nombre,last_name:userInfo.apellido,avatar:userInfo.avatar,identification_type:userInfo.identification_type,identification_number:userInfo.identification_number,phone:userInfo.celular,roles:userInfo.roles}]);}
else
{if(typeof googletag==="object")
googletag.pubads().setTargeting('LGSegments',paywall.paywall.getSegments());if($('#zocalo_msg').length)
{if(paywall.paywall.getSegments().indexOf('8n3i5oklnrf9')>=0)
{paywall.paywall.auth.isSubscribed().then(function(val){if(!val)$('#zocalo_msg.js-zocalomov').show();})}}}}
else
{if(paywall.auth.isLogged())
paywall.signOff();if($('#zocalo_msg').length)
{$('#zocalo_msg.js-zocalomov').show();}}
paywall.queue.push(['invoke','check']);clearInterval(callSignPW);}}
function checkSesion()
{$.post(URL_ACTUAL+'usuarios/check_session',{},function(data)
{if(!data.estado)
{$("#msj-modal-sesion").html(data.msj);$("#modalNotiSesion").modal({show:true,backdrop:'static',keyboard:false});$(".container,.share,.article").addClass("blur");console.log("Sesión cerrada. Refrescar");paywall.signOff();clearInterval(intervalID);}},'json');}
$(document).on('ready',function(){$("#modalNotiSesion").on('hide.bs.modal',function(){window.location=URL_ACTUAL;});});function checkSuscPayWall()
{if((typeof paywall!=='undefined')&&(typeof paywall.auth!=='undefined'))
{paywall.queue.push(['invoke','viewSubscriptionData',function(subscriptionData){if(subscriptionData)
{if(typeof subscriptionData.id!=='undefined')
{$.post(URL_ACTUAL+'usuarios/check_susc_paywall',subscriptionData,function(data){if(data.suscripcion_id)
{dataLayer.push({'event':'Suscripcion','eventCategory':'Registro','eventAction':'Ok','eventLabel':data.suscripcion_id,'eventValue':1});dataLayer.push({'event':'ga_ultimanota','eventCategory':'subscriptions','eventAction':'Nota Post','eventLabel':data.suscripcion_id,'eventURL':atob(CURRENT_URL),'eventValue':1});}},'json');}}}]);}}
function controlSesion()
{var intervalID=window.setInterval(function(){checkSesion();},60000);}
function sendOnesignal(p_user_id,p_susc_id,p_appId,p_msj,p_sendT)
{var OneSignal=window.OneSignal||[];OneSignal.push(function(){OneSignal.init({appId:p_appId,promptOptions:{actionMessage:p_msj,acceptButtonText:"Acepto",cancelButtonText:"No me interesa"}});if(p_sendT)
{OneSignal.getUserId().then(function(userId){$.post(URL_ACTUAL+'ajax/send_token',{token:userId},function(data){},'json');});}
OneSignal.setExternalUserId(p_user_id);if(p_susc_id)
{OneSignal.sendTag("suscripto","si").then(function(tagsSent){});}});}
