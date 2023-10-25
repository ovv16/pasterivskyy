// map
function initMap() {
	const myLatLng = {
		lat: 49.42021665848833,
		lng: 32.05678587802557,
	};
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: myLatLng,
		mapId: '459fa72e257f56ad',
		fullscreenControl: false,
		zoomControl: false,
		streetViewControl: false,
		mapTypeControl: false,
	});
	new google.maps.Marker({
		position: myLatLng,
		map,
		title: 'Pasterivskyy',
		icon: 'http://pasterivskyy/wp-content/uploads/2023/10/logopin.png',
	});
}
initMap();