import React, { useContext } from 'react';
import Card from './Card';
import Api from "../utils/Api";



function Main ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [cards, setCards] = React.useState([]);
    const [userInfo, setUserInfo] = React.useState({});

    React.useEffect(() => {
        Api.getAllNeededData()
          .then(([items, user]) => {
            setCards(items);
            setUserInfo(user);
          })
    
          .catch((error) => {
            console.log(error);
          });
      }, []);

    return (
        <>
          <main>
            <section className = "profile">
              <div className = "profile__info">
                <div className = "profile__avatar-area">
                  <img 
                    className = "profile__avatar" 
                    src = {userInfo.avatar}
                    alt = "фотография пользователя"
                  />
                  <button 
                    type = "button" 
                    className = "profile__avatar-edit-button"
                    onClick = {onEditAvatar}
                  >
                  </button>
                </div>  
                <div className = "profile__content">
                  <div className = "profile__row">
                    <h1 className = "profile__title">{userInfo.name}</h1>
                    <button 
                      type = "button" 
                      className = "profile__edit-button" 
                      aria-label = "Редактировать форму"
                      onClick = {onEditProfile}
                    >
                    </button>
                  </div>
                    <p className = "profile__description">{userInfo.about}</p>
                </div>
              </div>
              <button 
                type = "button" 
                className = "profile__add-button"
                onClick = {onAddPlace}
              >
              </button>
            </section>
            <section className = "elements">
              {
                cards.map((card) => (
                <Card 
                  key = {card._id} 
                  card = {card} 
                  onCardClick = {onCardClick} />)
              )}
            </section>
          </main>  
        </>    
    );
}

export default Main;