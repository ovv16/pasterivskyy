// map
function initMap() {
	const myLatLng = {
		lat: 49.42021665848833,
		lng: 32.05678587802557,
	};
	const map = new google.maps.Map(document.getElementById('infrastructure-map'), {
		zoom: 16,
		center: myLatLng,
		mapId: '459fa72e257f56ad',
		fullscreenControl: false,
		zoomControl: false,
		streetViewControl: false,
		mapTypeControl: false,
	});
	// Массив данных о местах и маркерах
	const places = [
		{
			position: myLatLng,
			icon: './assets/images/about/map-pin/logo.svg',
			info: '<div>ЖК Пастерівський</div>',
		},
		// {
		// 	position: {
		// 		lat: 49.41943056036718,
		// 		lng: 32.04973330935601,
		// 	},
		// 	icon: './assets/images/about/map-pin/kindergarten.svg',
		// 	info: '<div>Дитячий садок</div>',
		// },
		// {
		// 	position: {
		// 		lat: 49.42235747603149,
		// 		lng: 32.061616139135985,
		// 	},
		// 	icon: './assets/images/about/map-pin/school.svg',
		// 	info: '<div>Школа</div>',
		// },
		// {
		// 	position: {
		// 		lat: 49.41607783693156,
		// 		lng: 32.05195098923381,
		// 	},
		// 	icon: './assets/images/about/map-pin/school.svg',
		// 	info: '<div>Школа</div>',
		// },
		// {
		// 	position: {
		// 		lat: 49.41607783693156,
		// 		lng: 32.05195098923381,
		// 	},
		// 	icon: './assets/images/about/map-pin/park.svg',
		// 	info: '<div>Парк</div>',
		// },
		// {
		// 	position: {
		// 		lat: 49.41796758194335,
		// 		lng: 32.05863526379506,
		// 	},
		// 	icon: './assets/images/about/map-pin/apteka.svg',
		// 	info: '<div>Аптека</div>',
		// },
		// {
		// 	position: {
		// 		lat: 49.41709383791724,
		// 		lng: 32.061883696292114,
		// 	},
		// 	icon: './assets/images/about/map-pin/univer.svg',
		// 	info: '<div>Університет</div>',
		// },
		// {
		// 	position: {
		// 		lat: 49.41745959312341,
		// 		lng: 32.054543488245876,
		// 	},
		// 	icon: './assets/images/about/map-pin/shop.svg',
		// 	info: '<div>Магазин</div>',
		// },
		// {
		// 	position: {
		// 		lat: 49.41772374796599, 
		// 		lng: 32.06085294367286,
		// 	},
		// 	icon: './assets/images/about/map-pin/bus-stop.svg',
		// 	info: '<div>Автобусна зупинка</div>',
		// },
	];

	// Создание маркеров и информационных окон
	const markers = places.map((place) => {
		const marker = new google.maps.Marker({
			position: place.position,
			map,
			// title: 'Pasterivskyy',
			icon: place.icon,
		});

		const infoWindow = new google.maps.InfoWindow({
			content: place.info,
		});

		// Добавление обработчика клика для маркера
		marker.addListener('click', () => {
			infoWindow.open(map, marker);
		});

		return { marker, infoWindow };
	});

}
initMap();

// count number
function handleIntersection(entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			if (!entry.target.classList.contains('count-animation-done')) {
				entry.target.classList.add('count-animation-done');
				var $count = $(entry.target);
				$count.prop('counter', 0).animate(
					{
						counter: $count.text(),
					},
					{
						duration: 4000,
						easing: 'swing',
						step: function (now) {
							$count.text(Math.ceil(now));
						},
					},
				);
				observer.unobserve(entry.target);
			}
		}
	});
}
const observer = new IntersectionObserver(handleIntersection, {
	root: null,
	rootMargin: '0px',
	threshold: 0.5,
});
document.querySelectorAll('.count').forEach(function (element) {
	observer.observe(element);
});