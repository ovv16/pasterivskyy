import * as yup from 'yup';
import i18next from 'i18next';
import FormMonster from '../../../../pug/components/form/form';
import SexyInput from '../../../../pug/components/input/input';
import { successPopup } from '../successPopup';

export const contactFormFooter = (formRef, onSuccess) => {
  const btnRef = formRef.querySelector('[data-btn-submit]');
  console.log('ooo');
  new FormMonster({
    elements: {
      $form: formRef,
      $btnSubmit: btnRef,
      showSuccessMessage: false,
      successAction: () => {
        successPopup.open();
        onSuccess && onSuccess();
      },
      fields: {
        phone: {
          inputWrapper: new SexyInput({
            animation: 'none',
            $field: formRef.querySelector('[data-field-phone]'),
            typeInput: 'phone',
          }),
          rule: yup
            .string()
            .required(i18next.t('required'))
            .min(17, i18next.t('field_too_short', { cnt: 19 - 7 })),

          defaultMessage: i18next.t('phone'),
          valid: false,
          error: [],
        },
      },
    },
  });
};
