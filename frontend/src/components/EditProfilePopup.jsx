// IMPORTS:
import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';

// EDIT-PROFILE-POPUP COMPONENT:
function EditProfilePopup({ isLoading, isOpen, onClose, onUpdateUser }) {
  // Variables
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValues, resetForm, setIsValid } =
    useFormAndValidation({});

  // Side-effects
  useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsValid(true);
  // eslint-disable-next-line
  }, [currentUser, isOpen]);

  // Functions
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name='edit-profile-popup'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isValid={isValid && values.name && values.about}
    >
      <label className='popup__container-field'>
        <input
          type='text'
          className='popup__container-input'
          name='name'
          id='profile-name'
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        {errors.name && (
          <span className='profile-name-error popup__container-input-error'>
            {errors.name}
          </span>
        )}
      </label>
      <label className='popup__container-field'>
        <input
          type='text'
          className='popup__container-input'
          name='about'
          id='profile-job'
          placeholder='Профессия'
          minLength='2'
          maxLength='200'
          required
          value={values.about || ''}
          onChange={handleChange}
        />
        {errors.about && (
          <span className='profile-job-error popup__container-input-error'>
            {errors.about}
          </span>
        )}
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
