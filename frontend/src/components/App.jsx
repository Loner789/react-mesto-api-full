// IMPORTS:
import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import api from '../utils/api';
import * as auth from '../utils/auth';
import accept from '../images/icon_accept.svg';
import decline from '../images/icon_decline.svg';

// BASE COMPONENT OF APPLICATION:
function App() {
  // Variables
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ imgPath: '', text: '' });
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToBeDeleted, setCardToBeDeleted] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Side effects:
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));

      api
        .getInitialCards()
        .then((cards) => setCards(cards))
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    function checkToken() {
      auth
        .getContent()
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => console.log(err));
    }

    checkToken();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loggedIn) return;

    history.push('/');
    // eslint-disable-next-line
  }, [loggedIn]);

  // Functions:
  function handleBurgerButtonClick() {
    setIsClicked(!isClicked);
  }

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        setMessage({ imgPath: accept, text: 'Вы успешно зарегистрировались!' });
        history.push('/sign-in');
      })
      .catch(() =>
        setMessage({
          imgPath: decline,
          text: 'Что-то пошло не так! Попробуйте еще раз.',
        })
      )
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (!data?.token) {
          return Promise.reject('No data');
        }

        setEmail(email);
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setIsClicked(false);
    history.push('/sign-in');
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);

    api
      .setUserInfo(data)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);

    api
      .setUserAvatar(data)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((element) => (element._id === card._id ? newCard : element))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((element) => element._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDeleteClick(cardData) {
    setCardToBeDeleted(cardData);
    setIsConfirmationPopupOpen(true);
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);

    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          loggedIn={loggedIn}
          email={email}
          onSignOut={handleLogout}
          onClick={handleBurgerButtonClick}
          isClicked={isClicked}
        />
        <Switch>
          <ProtectedRoute exact path='/' loggedIn={loggedIn}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDeleteClick}
            />
          </ProtectedRoute>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
        </Switch>
        <Footer />
      </div>

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        title={message.text}
        imgPath={message.imgPath}
      />
      <EditAvatarPopup
        isLoading={isLoading}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isLoading={isLoading}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isLoading={isLoading}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithConfirmation
        isOpen={isConfirmationPopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        card={cardToBeDeleted}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
