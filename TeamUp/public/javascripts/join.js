'use strict';$(document).ready(function(){$('.joinEventBtn').click(function(a){var b=$(a.target).children('input').val();console.log(b);var c=$('#input_csrf').val();$.ajax({type:'POST',url:'/join',data:{_csrf:c,eventAliasId:b},timeout:3e3,success:function success(d){'400'==d.status?swal({title:d.msg,text:d.text,type:'warning',confirmButtonColor:'#DD6B55',confirmButtonText:'Okay',closeOnConfirm:!0}):swal({title:d.msg,text:d.text,type:'success',confirmButtonColor:'#DD6B55',confirmButtonText:'Okay',closeOnConfirm:!1},function(){window.location.href=d.redirect})},error:function error(d){console.log(d)}})}),$('#showAllEventsBtn').click(function(){infoWindow.close(),$('.ac-event-panel').removeClass('highlight'),$('.ac-event-panel').show(),$('html,body').animate({scrollTop:$('#showAllEventsBtn').offset().top},'slow')})});var markers=[],map,infoWindow,service;function loadMap(){var b=$('#input_events').val();b=JSON.parse(b),map=new google.maps.Map(document.getElementById('map'),{center:{lat:49.278628,lng:-122.920355},zoom:12,scaleControl:!0,mapTypeId:'roadmap'}),infoWindow=new google.maps.InfoWindow,service=new google.maps.places.PlacesService(map);var c=document.getElementById('pac-input'),d=new google.maps.places.SearchBox(c);map.controls[google.maps.ControlPosition.TOP].push(c),map.addListener('bounds_changed',function(){d.setBounds(map.getBounds())}),d.addListener('places_changed',function(){var f=d.getPlaces();if(0!=f.length){var g=new google.maps.LatLngBounds;f.forEach(function(h){return h.geometry?void(h.geometry.viewport?g.union(h.geometry.viewport):g.extend(h.geometry.location)):void console.log('Returned place contains no geometry')}),map.fitBounds(g)}});for(var _loop=function(){var f=b[a].locationName,g=b[a].locationAddress,h=b[a].locationCoordinates[1],k=b[a].locationCoordinates[0],l=b[a].sport,m=b[a].teamupName,n=b[a].from.split('T')[0]+' '+b[a].from.split('T')[1].split('.')[0];var o='None Set';b[a].to&&(o=b[a].to.split('T')[0]+' '+b[a].to.split('T')[1].split('.')[0]);for(var p=a-1;0<=p;p--)b[p].locationCoordinates[1]==h&&b[p].locationCoordinates[0]==k&&(h+=(Math.random()-1)/1500,k+=(Math.random()-.5)/1500);var p=new google.maps.Marker({position:new google.maps.LatLng(h,k),map:map,title:f,animation:google.maps.Animation.DROP});p.category=l,p.setVisible(!0),function(r,s,t,u,v){google.maps.event.addListener(r,'click',function(){var w='<b>TeamUp Name</b>: '+m+'<br><b>From</b>: '+n+'<br><b>To</b>: '+o+'<br><b>Sport</b>: '+l+'<br><b>Location</b>: '+s+'<br>'+t+'<br><a class=\'directions\' target=\'_blank\' href=https://www.google.com/maps/dir//'+h+','+k+'>Get Directions</a>';u.setContent(w),u.open(map,r),$('.ac-event-panel').removeClass('highlight'),$('.ac-event-panel').hide(),$('#mixin'+v).show(),$('#mixin'+v).addClass('highlight')})}(p,f,g,infoWindow,a),markers.push(p)},a=0;a<b.length;a++)_loop();navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(f){var g={lat:f.coords.latitude,lng:f.coords.longitude},k=new google.maps.Marker({position:g,map:map,icon:'http://i.stack.imgur.com/orZ4x.png'});infoWindow.setPosition(g),infoWindow.setContent('You are here.'),infoWindow.open(map),setTimeout(function(){infoWindow.close()},'3000'),map.setCenter(g)})}
