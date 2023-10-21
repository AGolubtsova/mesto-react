import React, { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Api from '../utils/Api';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // Редактирование аватара
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // Редактирование профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // Добавление карточки
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Api.getAllNeededData()
      .then(([items, user]) => {
        setCards(items);
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCardClick = (card) => {
      setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    Api.deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardId));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleUpdateUser(data) {
    Api.sendUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
    }

  function handleUpdateAvatar(avatar) {
    Api.handleUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className = "page">
        <Header />
        <Main 
          onEditAvatar = {handleEditAvatarClick}
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
          cards = {cards}
        />
        <Footer />
        <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser}/>
        <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} /> 
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
          title = "Вы уверены?"
          name = "delete"
          buttonText = "Да"
        >   
        </PopupWithForm>
        <ImagePopup  card = {selectedCard} onClose = {closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;