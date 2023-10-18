import Swiper, {
  EffectFade,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
  Autoplay,
  Mousewheel,
} from 'swiper';

Swiper.use([EffectFade, Navigation, Pagination, Thumbs, FreeMode, Autoplay, Mousewheel]);

// swiper main
const swiperMain = new Swiper('.swiper-main', {
  loop: true,
  effect: 'fade',
  speed: 1500,
  slidesPerView: 3,
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