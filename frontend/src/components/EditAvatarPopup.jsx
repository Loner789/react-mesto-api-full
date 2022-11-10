// IMPORTS:
import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

// EDIT-AVATAR-POPUP COMPONENT:
function EditAvatarPopup({ isLoading, isOpen, onClose, onUpdateAvatar }) {
  // Variables
  const avatarRef = useRef(null);
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation({});

  // Side-effects
  useEffect(() => {
    resetForm();
    avatarRef.current.value = null;
  // eslint-disable-next-line
  }, [isOpen]);

  // Functions
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='edit-avatar-popup'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isValid={isValid}
    >
      <label className='popup__container-field'>
        <input
          type='url'
          className='popup__container-input'
          name='avatar'
          id='avatar-link'
          placeholder='Ссылка на картинку профиля'
          required
          onChange={handleChange}
          value={values.avatar || ''}
          ref={avatarRef}
        />
        {errors.avatar && (
          <span className='avatar-link-error popup__container-input-error'>
            {errors.avatar}
          </span>
        )}
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
