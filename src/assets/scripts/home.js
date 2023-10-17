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
