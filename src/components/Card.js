import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card ({ card, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);  
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  );
  
  const handleClick = () => {
      onCardClick(card);
    };
   
    return (
      <li className = "element">
        <img 
          className = "element__image" 
          onClick = {handleClick}
          src = {card.link}
          alt = {card.name}
        />
        <div className = "element__title-wrapper">
          <h2 className = "element__title">{card.name}</h2>
          <div className = "element__like-area">
            <button type = "button" className = "element__like-button" aria-label = "Поставить лайк"></button>
            <p className = "element__like-count">{card.likes.length}</p>
          </div>
        </div>
        <button className = "element__delete-button" aria-label = "Удалить карточку"></button>
      </li>
    )
}

export default Card;