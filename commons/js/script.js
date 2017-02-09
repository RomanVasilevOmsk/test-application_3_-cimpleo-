google.maps.event.addDomListener(window, 'load', init);
var map, markersArray = [];

function bindInfoWindow(marker, map, location) {
		google.maps.event.addListener(marker, 'click', function() {
				function close(location) {
						location.ib.close();
						location.infoWindowVisible = false;
						location.ib = null;
				}

				if (location.infoWindowVisible === true) {
						close(location);
				} else {
						markersArray.forEach(function(loc, index){
								if (loc.ib && loc.ib !== null) {
										close(loc);
								}
						});

						var boxText = document.createElement('div');
						boxText.style.cssText = 'background: #fff;';
						boxText.classList.add('md-whiteframe-2dp');

						function buildPieces(location, el, part, icon) {
								if (location[part] === '') {
										return '';
								} else if (location.iw[part]) {
										switch(el){
												case 'photo':
														if (location.photo){
																return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
														 } else {
																return '';
														}
														break;
												case 'iw-toolbar':
														return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
														break;
												case 'div':
														switch(part){
																case 'email':
																		return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
																		break;
																case 'web':
																		return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
																		break;
																case 'desc':
																		return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
																		break;
																default:
																		return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
																break;
														}
														break;
												case 'open_hours':
														var items = '';
														for (var i = 0; i < location.open_hours.length; ++i) {
																if (i !== 0){
																		items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
																}
																var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
														}
														return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
														 break;
										 }
								} else {
										return '';
								}
						}

						boxText.innerHTML =
								buildPieces(location, 'photo', 'photo', '') +
								buildPieces(location, 'iw-toolbar', 'title', '') +
								buildPieces(location, 'div', 'address', 'location_on') +
								buildPieces(location, 'div', 'web', 'public') +
								buildPieces(location, 'div', 'email', 'email') +
								buildPieces(location, 'div', 'tel', 'phone') +
								buildPieces(location, 'div', 'int_tel', 'phone') +
								buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
								buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

						var myOptions = {
								alignBottom: true,
								content: boxText,
								disableAutoPan: true,
								maxWidth: 0,
								pixelOffset: new google.maps.Size(-140, -40),
								zIndex: null,
								boxStyle: {
										opacity: 1,
										width: '280px'
								},
								closeBoxMargin: '0px 0px 0px 0px',
								infoBoxClearance: new google.maps.Size(1, 1),
								isHidden: false,
								pane: 'floatPane',
								enableEventPropagation: false
						};

						location.ib = new InfoBox(myOptions);
						location.ib.open(map, marker);
						location.infoWindowVisible = true;
				}
		});
}

function init() {
		var mapOptions = {
				center: new google.maps.LatLng(33.7677323685868,-118.16230878613283),
				zoom: 11,
				gestureHandling: 'auto',
				fullscreenControl: false,
				zoomControl: false,
				disableDoubleClickZoom: false,
				mapTypeControl: false,
				scaleControl: false,
				scrollwheel: true,
				streetViewControl: false,
				draggable : true,
				clickableIcons: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a0d6d1"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#dedede"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#dedede"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f1f1f1"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
		}
		var mapElement = document.getElementById('mapkit-7944');
		var map = new google.maps.Map(mapElement, mapOptions);
		var locations = [
				{"title":"Лонг-Бич","address":"Лонг-Бич, Калифорния, США","desc":"","tel":"","int_tel":"","email":"","web":"","web_formatted":"","open":"","time":"","lat":33.7700504,"lng":-118.19373949999999,"vicinity":"Лонг-Бич","open_hours":"","marker":{"url":"https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png","scaledSize":{"width":25,"height":42,"j":"px","f":"px"},"origin":{"x":0,"y":0},"anchor":{"x":12,"y":42}},"iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}}
		];
		for (i = 0; i < locations.length; i++) {
				marker = new google.maps.Marker({
						icon: locations[i].marker,
						position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
						map: map,
						title: locations[i].title,
						address: locations[i].address,
						desc: locations[i].desc,
						tel: locations[i].tel,
						int_tel: locations[i].int_tel,
						vicinity: locations[i].vicinity,
						open: locations[i].open,
						open_hours: locations[i].open_hours,
						photo: locations[i].photo,
						time: locations[i].time,
						email: locations[i].email,
						web: locations[i].web,
						iw: locations[i].iw
				});
				markersArray.push(marker);

				if (locations[i].iw.enable === true){
						bindInfoWindow(marker, map, locations[i]);
				}
		}
}


/* menu*/
var theToggle = document.getElementById('toggle');

// based on Todd Motto functions
// http://toddmotto.com/labs/reusable-js/

// hasClass
function hasClass(elem, className) {
	return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// addClass
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
    	elem.className += ' ' + className;
    }
}
// removeClass
function removeClass(elem, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
	if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
// toggleClass
function toggleClass(elem, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0 ) {
            newClass = newClass.replace( " " + className + " " , " " );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}

theToggle.onclick = function() {
   toggleClass(this, 'on');
   return false;
}
$(function() {

	// $('#toggle').on("click", function() {
	// 		$('#toggle').css({'border': 'none'});
	// });
});
/* menu*/

/* scroll*/
$(document).ready(function(){
	$("#menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;

		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});
});
/* scroll*/

/* modal window*/
$('.popup .close_window, .overlay').click(function (){
$('.popup, .overlay').css({'opacity': 0, 'visibility': 'hidden'});
});
$('a.open_window').click(function (e){
$('.popup, .overlay').css({'opacity': 1, 'visibility': 'visible'});
e.preventDefault();
});
/* modal window */
