// кнопка певернутися назад
const goBackButton = document.querySelector('[data-go-back-button]');
goBackButton.addEventListener('click', function() {
  window.history.back();
});