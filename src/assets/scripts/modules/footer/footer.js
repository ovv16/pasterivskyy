import { contactFormFooter } from './contactFormFooter';

const footer = document.querySelector('.footer');

const initFooter = () => {
  console.log('footer');
  contactFormFooter(document.querySelector('.callback-footer__form'));
};

if (footer) {
  initFooter();
}
