import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import Api from '../utils/Api';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // Редактирование аватара
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // Редактирование профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // Добавление карточки
  const [selectedCard, setSelectedCard] = useState({});


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className = "page">
      <Header />
      <Main 
        onEditAvatar = {handleEditAvatarClick}
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick = {handleCardClick}
      />
      <Footer />
      <PopupWithForm 
        title = "Редактировать профиль"
        name = "profile-edit"
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        onSubmit = {handleSubmit}
      >
        <input 
          type = "text" 
          className = "popup__input popup__input_type_name" 
          name = "username" 
          id = "userName-input" 
          placeholder = "Имя" 
          minLength ="2" 
          maxLength="40" />
        <span className = "popup__input-error" id="username-error"></span>
        <input 
          type = "text" 
          className ="popup__input popup__input_type_job" 
          name="profession" 
          id="userProf-input" 
          placeholder="Профессия"  
          minLength="2" 
          maxLength="400"  />
        <span className = "popup__input-error" id="profession-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title = "Новое место"
        name = "card-add"
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onSubmit = {handleSubmit}
        buttonText = "Создать"
      >
        <input 
          type = "text" 
          className = "popup__input popup__input_type_place" 
          name = "name" 
          id = "placeName-input" 
          placeholder = "Название"  
          minLength = "2" 
          maxLength = "30"/>
        <span className = "popup__input-error" id = "name-error"></span>
        <input 
          type = "url" 
          className = "popup__input popup__input_type_src" 
          name = "link" 
          id = "placeLink-input" 
          placeholder = "Ссылка на картинку" />
        <span className = "popup__input-error" id="link-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title = "Обновить аватар"
        name = "avatar-edit"
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onSubmit = {handleSubmit}
      >   
        <input 
          type = "url" 
          className = "popup__input popup__input_type_avatar" 
          name = "userAvatar" 
          id = "userAvatar-input" 
          placeholder = "Ссылка на картинку" />
          <span className = "popup__input-error" id="userAvatar-error"></span>  
      </PopupWithForm>
      <PopupWithForm
        title = "Вы уверены?"
        name = "delete"
        buttonText = "Да"
      >   
      </PopupWithForm>
      <ImagePopup  card = {selectedCard} onClose = {closeAllPopups} />
    </div>
  );
}

export default App;