import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);


var swiper = new Swiper(".swiper-gallery", {
	speed: 1500,
	slidesPerView: 'auto',
	spaceBetween: 14,
	breakpoints: {
		1366: {
			spaceBetween: 20,
		},
	},
	navigation: {
		nextEl: ".swiper-navigation__arow-right",
		prevEl: ".swiper-navigation__arow-left",
	},
});