import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);

var swiper = new Swiper('.swiper-progress-single', {
  speed: 1500,
  slidesPerView: 'auto',
  spaceBetween: 14,
  breakpoints: {
    1366: {
      spaceBetween: 20,
    },
  },
  navigation: {
    nextEl: '.swiper-navigation__arow-right',
    prevEl: '.swiper-navigation__arow-left',
  },
  mousewheel: true,
  keyboard: true,
});

// кнопка певернутися назад
const goBackButton = document.querySelector('[data-go-back-button]');
goBackButton.addEventListener('click', function () {
  window.history.back();
});


  // Функция для приостановки видео и отображения кнопки
  function pauseVideo() {
    if (video && !video.paused) {
      video.pause();
      videoButton.style.opacity = 1;
      videoButton.style.visibility = "visible";
    }
  }

  // Получаем элементы DOM
  var video = document.getElementById("video");
  var videoButton = document.querySelector(".progress-single__video-button");

  // Проверяем наличие элементов
  if (video && videoButton) {
    // Обработчик клика на видео
    video.addEventListener("click", pauseVideo);

    // Обработчик клика на кнопку
    videoButton.addEventListener("click", function () {
      video.play();
      videoButton.style.opacity = 0;
      videoButton.style.visibility = "hidden";
    });
  }






