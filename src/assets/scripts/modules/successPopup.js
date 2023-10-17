import { popupFactory } from './popupFactory';

export const successPopup = popupFactory(document.querySelector('.thank-wrapper'));

const closeAllBtnRef = document.querySelector('.thank-close');

closeAllBtnRef.addEventListener('click', () => {
  successPopup.close();
});
