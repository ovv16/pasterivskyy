import $ from 'jquery';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swiper, {
  EffectFade,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
  Autoplay,
  Mousewheel,
} from 'swiper';
import Headroom from 'headroom.js';
import { lenis } from './modules/scroll/leniscroll';
import buttonHover from './modules/buttonHover';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import { gsap, ScrollTrigger } from 'gsap/all';
import 'current-device';
// import menu from './modules/menu';
import './modules/form';
import { useState } from './modules/helpers/helpers';
import { sideSwitchArrow } from './modules/effects/sideSwitchArrow';
import FormMonster from '../../pug/components/form/form';

// const scroller = lenis;

Swiper.use([EffectFade, Navigation, Pagination, Thumbs, FreeMode, Autoplay, Mousewheel]);
/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.ScrollTrigger = ScrollTrigger;
gsap.core.globals('ScrollTrigger', ScrollTrigger);
global.axios = axios;

gsap.registerPlugin(ScrollTrigger);

var myElement = document.querySelector('header');
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myElement);
headroom.init();
// var myElement = document.querySelector(".header-white");
// // construct an instance of Headroom, passing the element
// var headroomWhite = new Headroom(myElement);
// headroomWhite.init();

//========================================================================================================================================================
// ovv
// swiper main
const swiperMain = new Swiper('.swiper-main', {
  loop: true,
  effect: 'fade',
  speed: 1500,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.pagination-main',
    clickable: true,
    renderBullet: function(index, className) {
      return '<div class="' + className + '">' + '0' + (index + 1) + '</div>';
    },
  },
});

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
            step: function(now) {
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
document.querySelectorAll('.count').forEach(function(element) {
  observer.observe(element);
});

// footer button-up
document.body.addEventListener('click', function(evt) {
  const target = evt.target.closest('[data-up-arrow]');
  if (!target) return;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
document.body.addEventListener('click', function(evt) {
  const target = evt.target.closest('[data-arrow-down]');
  if (!target) return;
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth',
  });
});
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
    icon: './assets/images/logo_pasterivskyy_map.svg',
  });
}
initMap();

// Заблокировать прокрутку body
function disableBodyScroll() {
  const body = document.body;
  const scrollY = window.scrollY;

  body.style.position = 'fixed';
  body.style.width = '100%';
  body.style.top = `-${scrollY}px`;
  body.style.overflow = 'hidden';
}

// Разблокировать прокрутку body
function enableBodyScroll() {
  const body = document.body;
  const scrollY = parseInt(body.style.top, 10);

  body.style.position = '';
  body.style.width = '';
  body.style.top = '';
  body.style.overflow = '';

  window.scrollTo(0, scrollY * -1);
}

// Заблокировать прокрутку body при открытии модального окна
disableBodyScroll();
// Разблокировать прокрутку body при закрытии модального окна
enableBodyScroll();

// меню
export function menuInit() {
  document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.closest('[data-menu-open]')) {
      document.documentElement.classList.add('menu-open');
      disableBodyScroll();
    } else if (target.closest('[data-menu-closet]')) {
      document.documentElement.classList.remove('menu-open');
      enableBodyScroll();
    }
  });
}

export function menuOpen() {
  document.documentElement.classList.add('menu-open');
}
export function menuClose() {
  document.documentElement.classList.remove('menu-open');
}
menuInit();

// прелоудер
// Заблокировать прокрутку body
disableBodyScroll();

// Скрываем прелоадер после полной загрузки всех ресурсов на странице
window.addEventListener('load', function() {
  const loaderWrap = document.querySelector('.loader-wrap');
  // loaderWrap.style.opacity = '0'; // Делаем его прозрачным
  setTimeout(() => {
    loaderWrap.style.display = 'none'; // Убираем его из DOM
    // Разблокировать прокрутку body
    enableBodyScroll();
  }, 4000); // Время, через которое прелоудер исчезнет
});

// popup зворотній зв'язок
document.body.addEventListener('click', function(evt) {
  const target = evt.target.closest('[data-call-form]');
  if (!target) return;
  document.querySelector('[data-form-wrapper]').classList.add('active');
  disableBodyScroll();
});
document.body.addEventListener('click', function(evt) {
  const target = evt.target.closest('[data-close-form]');
  if (!target) return;
  document.querySelector('[data-form-wrapper]').classList.remove('active');
  enableBodyScroll();
});

// popup зворотній зв'язок mob
document.body.addEventListener('click', function(evt) {
  const target = evt.target.closest('[data-call-mobile-callback]');
  if (!target) return;
  document.querySelector('[data-mobile-callback-popup]').classList.add('active');
  disableBodyScroll();
});
document.body.addEventListener('click', function(evt) {
  const target = evt.target.closest('[data-close-mobile-callback]');
  if (!target) return;
  document.querySelector('[data-mobile-callback-popup]').classList.remove('active');
  enableBodyScroll();
});

// кнопка певернутися назад
// const goBackButton = document.querySelector('[data-go-back-button]');
// goBackButton.addEventListener('click', function() {
//   window.history.back();
//   console.log('немає куди повертатись');
// });
//========================================================================================================================================================

// document.querySelector('[data-up-arrow]').style.visibility = 'hidden';

// window.addEventListener('scroll', (evt) => {
//   document.querySelector('[data-up-arrow]').style.visibility  = window.scrollY > (document.body.scrollHeight * 0.5) ? '' : 'hidden';
// })

// menu();

// splitToLinesAndFadeUp('section:not(.section-1) .text-style-h-1, section  .text-style-h-3');

// function addIntersectionOnceWithCallback(el, cb = () => { }) {
//   const image = el;
//   const target = image;
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const lazyImage = entry.target;
//         cb();
//         observer.unobserve(target);
//       }
//     });
//   }, {
//     rootMargin: '0px',
//     threshold: 0.1,
//   });
//   observer.observe(target);
// }

// document.querySelectorAll('[data-srcset]').forEach(el => {
//   addIntersectionOnceWithCallback(el, () => {
//     el.setAttribute('srcset', el.dataset.srcset);
//   })
// })
// document.querySelectorAll('img[data-src]').forEach(el => {
//   addIntersectionOnceWithCallback(el, () => {
//     el.setAttribute('src', el.dataset.src);
//   })
// })
// document.querySelectorAll('[data-lazy]').forEach(el => {

//   addIntersectionOnceWithCallback(el, () => {
//     const lazyElemt = el.querySelector('[data-href]');
//     lazyElemt.setAttribute('href', lazyElemt.dataset.href);
//   })
// })

// const gallerySwiper = new Swiper('.home-gallery__container', {
//   // navigation: {
//   //   nextEl: '.home-gallery__arrow-next',
//   //   prevEl: '.home-gallery__arrow-prev'
//   // },
//   pagination: {
//     el: '.home-gallery .thumbs',
//     clickable: true,
//     renderBullet: function (index, className) {
//       return '<span class="thumbs__item ' + className + '"></span>';
//     },
//   },
// });

// sideSwitchArrow(
//   gallerySwiper,
//   document.querySelector('.home-gallery__arrow-prev'),
//   document.querySelector('.home-gallery__container')
// )

// const aboutSliderPictures = new Swiper('.circle-screen__img.swiper-container', {
//   loop: true,
//   speed: 1250,
//   on: {

//     setTransition: swiper_blur
//   },
//   effect: 'fade',
//   fadeEffect: {
//     crossFade: true
//   },

// });

// document.body.insertAdjacentHTML('beforeend', `
//   <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="filters" style="    position: absolute;pointer-events: none;width: 0;height: 0;">
//     <defs>
//       <filter id="blur">
//         <feGaussianBlur in="SourceGraphic" stdDeviation="0, 0" />
//       </filter>
//     </defs>
//   </svg>
// `);

// function swiper_blur(swiper, dur) {
//   var blur = 15;
//   $({ state: 0 }).animate({ state: blur }, {
//     duration: (dur / 2),
//     step: function (now) {
//       $('#blur feGaussianBlur').attr("stdDeviation", now + ", 0");
//     },
//     done: function () {
//       $({ state: blur }).animate({ state: 0 }, {
//         duration: (dur / 2),
//         step: function (now) {
//           $('#blur feGaussianBlur').attr("stdDeviation", now + ", 0");
//         }
//       });
//     }
//   });
// }

// const aboutSlider = new Swiper('[data-home-about-slider]', {
//   navigation: {
//     nextEl: '[data-home-about-slider-next]',
//     prevEl: '[data-home-about-slider-prev]'
//   },
//   loop: true,
//   effect: 'fade',
//   fadeEffect: {
//     crossFade: true
//   },
//   thumbs: {
//     swiper: aboutSliderPictures,
//   },
//   on: {
//     init: (e) => {
//       document.querySelector('.js-about-slider-counter .total').textContent = e.slides.length;
//       console.log(e);
//     },
//   }
// })

// if (document.documentElement.classList.contains('mobile')) {

//   aboutSlider.on('slideChangeTransitionEnd', (e) => {
//     document.querySelector('.circle-screen-mobile-button').setAttribute('href', document.querySelector('[data-home-about-slider] .swiper-slide-active .button-30').getAttribute('href'))
//   })
// }

// {
//   if (document.documentElement.classList.contains('desktop')) {
//     ScrollTrigger.create({
//       trigger: '.circle-screen',
//       start: '5% bottom',
//       onEnter: () => {
//         scroller.scrollTo(document.querySelector('.circle-screen'), {
//           duration: 2.5
//         })
//       }
//     })
//   }
// }

// gsap.timeline({
//   scrollTrigger: {
//     scrub: true,
//     trigger: '.home-screen1',
//     start: '100% bottom',
//     end: '120% top',
//   }
// })
//   .fromTo('.circle-screen__circle', {
//     scale: 0.75
//   }, {
//     scale: 1,
//   })
//   .fromTo('.circle-screen__img', {
//     scale: 1.5
//   }, {
//     scale: 1
//   }, '<')

// aboutSlider.on('activeIndexChange', ({ activeIndex, realIndex, ...data }) => {
//   const img = data.slides[activeIndex].dataset.image;
//   document.querySelector('.circle-screen__img').setAttribute('src', img);
//   document.querySelector('.js-about-slider-counter .current')
//     .textContent = realIndex + 1;
// })

// aboutSlider.on('beforeSlideChangeStart', ({ activeIndex, realIndex, slides, ...data }) => {
//   console.log('beforeSlideChangeStart', slides[activeIndex]);
//   gsap.to(slides[activeIndex].children, {
//     y: -100,
//     clearProps: 'all'
//   })
// })
// aboutSlider.on('slideChangeTransitionStart', ({ activeIndex, realIndex, slides, ...data }) => {
//   console.log('slideChangeTransitionEnd', slides[activeIndex]);
//   gsap.from(slides[activeIndex].children, {
//     y: 100,
//     clearProps: 'all'
//   })
// })

// splitToLinesAndFadeUp('.text-style-h-1');

// function gridBlockSlider() {
//   if (!document.documentElement.classList.contains('mobile')) return;

//   document.querySelectorAll('[data-mobile-grid-sldier] .swiper-wrapper .swiper-slide').forEach((slide, index) => {
//     if (index > 0) slide.remove();
//   })

//   const slider = new Swiper('[data-mobile-grid-sldier]',
//     {
//       effect: 'fade',
//       fadeEffect: {
//         crossFade: true
//       },
//       freeMode: false,
//       // pagination: {
//       //   el: '[data-mobile-grid-sldier] .thumbs',
//       // 	clickable: true,
//       //   renderBullet: function (index, className) {
//       //     return '<span class="thumbs__item ' + className + '"></span>';
//       //   },
//       // },
//     });
// }

// gridBlockSlider();

// const [genplanFilter, setGenplanFilter, useGenplanFilterEffect] = useState([]);

// useGenplanFilterEffect(values => {
//   document.querySelectorAll('path[data-polygon], g[data-polygon]').forEach(el => {
//     if (values.includes(el.dataset.polygon)) {
//       el.style.opacity = '';
//       return;
//     }
//     el.style.opacity = 0;
//   })
// })

// setGenplanFilter([]);

// function genplanMobileLegendSlider() {
//   const html = document.documentElement;
//   if (!html.classList.value.match(/tablet|mobile/)) return;
//   new Swiper('[data-mobile-genplan-slider]', {
//     effect: 'fade',
//     fadeEffect: {
//       crossFade: true
//     },
//     loop: true,
//     navigation: {
//       prevEl: '[data-mobile-genplan-slider-prev]',
//       nextEl: '[data-mobile-genplan-slider-next]'
//     },
//     on: {
//       activeIndexChange: ({ activeIndex, slides, ...e }) => {
//         const slide = slides[activeIndex];
//         setGenplanFilter([slide.dataset.polygon]);
//       }
//     }
//   });

//   document.querySelector('.genplan__svg-wrapper').scrollTo(window.innerHeight - window.innerWidth, 0);
// }

// genplanMobileLegendSlider();

// function genplanDesktopHandler() {
//   if (!document.documentElement.classList.contains('desktop')) return;
//   document.body.addEventListener('click', (evt) => {
//     const target = evt.target.closest('.genplan__legend-point');
//     if (!target) return;
//     if (target.classList.contains('active')) {
//       setGenplanFilter([
//         ...genplanFilter().filter(el => el !== target.dataset.polygon)
//       ]);
//       target.classList.remove('active');
//     } else {
//       setGenplanFilter([
//         ...genplanFilter(), target.dataset.polygon
//       ]);
//       target.classList.add('active');
//     }
//   });

// }

// genplanDesktopHandler();

// gsap.timeline({
//   defaults: {
//     ease: 'power4.out'
//   },
//   scrollTrigger: {
//     once: true,
//     trigger: '.progress-line'
//   }
// })
//   .from('.progress-line', {
//     autoAlpha: 0
//   })
//   .fromTo('.section-progress-item', {
//     autoAlpha: 0
//   }, {
//     autoAlpha: 1,
//     stagger: 0.2
//   })
//   .fromTo('.section-progress-item__title', {
//     autoAlpha: 0,
//     y: 50
//   }, {
//     autoAlpha: 1,
//     y: 0,
//     stagger: 0.2
//   })
//   .fromTo('.section-progress-item__value', {
//     autoAlpha: 0,
//     y: -50
//   }, {
//     autoAlpha: 1,
//     y: 0,
//     stagger: 0.2
//   }, '<')
//   .fromTo('.ocean-wrapper', {
//     autoAlpha: 0,
//     y: -50
//   }, {
//     autoAlpha: 1,
//     y: 0,
//     stagger: 0.2
//   }, '<')

// function mobileHomeNews() {
//   if (!document.documentElement.classList.contains('mobile')) return;
//   new Swiper('.home-news.swiper-container', {
//     slidesPerView: 1.1,
//     spaceBetween: 12
//   })
// }

// mobileHomeNews();

// document.querySelectorAll('.home-progress__video-button').forEach(el => {
//   el.addEventListener('click', function (evt) {
//     console.log('click');
//     el.remove();
//     document.querySelector('[data-home-page-video]').setAttribute('controls', true);
//     document.querySelector('[data-home-page-video]').play();
//   }, {
//     once: true
//   });
// })
