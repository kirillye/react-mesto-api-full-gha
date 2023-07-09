import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import mainLogo from "../img/logo.svg";
import userAvatar from "../img/Avatar.png";
import iconSeccessfull from "../img/SeccessfullIcon.svg";
import badIcon from "../img/badIcon.svg";
import { api } from "../utils/Api.js";
import { authentication } from "../utils/authentication.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import RemoveCardPopup from "./RemoveCardPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute ";
import Spinner from "./Spinner.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  // попапы
  const [isEditAvatarPopupOpen, openEditAvatar] = useState(false);
  const [isEditProfilePopupOpen, openEditProfile] = useState(false);
  const [isAddPlacePopupOpen, openAddPlace] = useState(false);
  const [isImagePopupOpen, openImagePopup] = useState(false);
  const [isAcceptPopupOpen, openAcceptPopup] = useState(false);
  const [isNotificationPupupOpen, setIsNotificationPupupOpen] = useState(false);

  // информция из бд
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // авторизация
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  // работа с карточками
  const [currentCardDelete, setCurrentCardDelete] = useState({});
  const [selectedCard, setSelectCard] = useState({ name: "", link: "" });

  // загрузка
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  // собираем ошибки
  const [regStatus, setRegStatus] = useState({
    messageError: "",
    isError: true,
  });

  //
  const httpRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    tokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
          const { user } = userData;
          handleCardsChange(cards);
          setCurrentUser(user);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  if (isLoading) {
    return <Spinner />;
  }

  function handleCardsChange(data) {
    setCards(data.reverse());
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete() {
    setIsLoadingForm(true);
    if (!currentCardDelete) {
      return;
    }
    api
      .removeCard(currentCardDelete._id)
      .then((res) => {
        closeAllPopups();
        setCards((state) =>
          state.filter((c) => !(c._id === currentCardDelete._id))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoadingForm(true);
    api
      .sendUserInfo(data)
      .then((data) => {
        closeAllPopups();
        setCurrentUser(data.user);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoadingForm(true);
    api
      .sendUserAvatar(data)
      .then((data) => {
        closeAllPopups();
        setCurrentUser((state) => ({ ...state, avatar: data.user.avatar }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function handleUpdateCards(data) {
    setIsLoadingForm(true);
    api
      .sendCard(data)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  // ============ Функции управления попапами =======================

  function closeAllPopups() {
    openEditAvatar(false);
    openEditProfile(false);
    openAddPlace(false);
    openImagePopup(false);
    setSelectCard({ name: "", link: "" });
    openAcceptPopup(false);
    setIsNotificationPupupOpen(false);
  }

  function handleEditAvatarClick(e) {
    openEditAvatar(true);
  }

  function handleEditProfileClick(e) {
    openEditProfile(true);
  }

  function handleAddPlaceClick(e) {
    openAddPlace(true);
  }

  function handleCardClick(link) {
    openImagePopup(true);
    setSelectCard(link);
  }

  function handleDeleteCard(data) {
    setCurrentCardDelete(data);
    openAcceptPopup(true);
  }

  //  ============ Функции авторизации/актуализации данных пользователя  ============

  const tokenCheck = () => {
    authentication
      .tokenCheck()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(`Произошла ${err}: ${err.massage}`);
      });
  };

  const handleLogOut = () => {
    authentication
      .signOut()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          localStorage.removeItem("email", email);
          navigate("/sign-in");
        } else {
          console.log(`Не успешная попытка выйтию... Попробуйте, чуть позже.`);
        }
      })
      .catch((err) => {
        console.log(`Произошла ${err}: ${err.massage}`);
      });
  };

  const handleRegister = ({ userEmail, userPassword }) => {
    return authentication
      .signUp(userEmail, userPassword)
      .then((res) => {
        setRegStatus({
          messageError: "",
          isError: false,
        });
        setIsNotificationPupupOpen(true);
        setTimeout(() => {
          setIsNotificationPupupOpen(false);
          navigate("/sign-in", { replace: true });
        }, 1000);
      })
      .catch((err) => {
        setRegStatus({
          messageError: "",
          isError: true,
        });
        setIsNotificationPupupOpen(true);
        return err;
      });
  };

  const handleLogin = ({ userEmail, userPassword }) => {
    return authentication
      .signIn(userEmail, userPassword)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("email", userEmail);
        setEmail(userEmail);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        return err;
      });
  };

  // ============== Функции валидации форм ==============

  function linkHandler(e, setLinkFieldError) {
    if (httpRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setLinkFieldError({
        textError: "",
        falidField: true,
      });
    } else if (e.target.value.length === 0) {
      setLinkFieldError({
        textError: "Поле пустое",
        falidField: false,
      });
    } else {
      setLinkFieldError({
        textError: "Ссылка не корректна",
        falidField: false,
      });
    }
  }

  function nameHandler(e, minLength = 1, maxLength = 150, setNameFieldError) {
    const value = e.target.value;
    if (value.length > maxLength) {
      setNameFieldError({
        textError: `Максимум ${maxLength} символов`,
        falidField: false,
      });
    } else if (value.length === 0) {
      setNameFieldError({
        textError: "Поле пустое",
        falidField: false,
      });
    } else if (value.length < minLength) {
      setNameFieldError({
        textError: `минимальное количество символов ${minLength}`,
        falidField: false,
      });
    } else if (value.length <= maxLength && value.length >= minLength) {
      setNameFieldError({
        textError: "",
        falidField: true,
      });
    } else {
      setNameFieldError({
        textError: "Данные не корректы..(",
        falidField: false,
      });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        logo={mainLogo}
        loggedIn={loggedIn}
        handleLogOut={handleLogOut}
        email={email}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={
                <>
                  <Main
                    isLoading={isLoading}
                    avatar={userAvatar}
                    onCardLike={handleCardLike}
                    handleCardsChange={handleCardsChange}
                    cards={cards}
                    handleEditAvatarClick={handleEditAvatarClick}
                    handleEditProfileClick={handleEditProfileClick}
                    handleAddPlaceClick={handleAddPlaceClick}
                    handleCardClick={handleCardClick}
                    handleDeleteCard={handleDeleteCard}
                  />
                  <EditAvatarPopup
                    checkLink={linkHandler}
                    isLoadingForm={isLoadingForm}
                    onUpdateAvatar={handleUpdateAvatar}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                  />
                  <EditProfilePopup
                    checkField={nameHandler}
                    isLoadingForm={isLoadingForm}
                    onUpdateUser={handleUpdateUser}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                  />
                  <AddPlacePopup
                    checkField={nameHandler}
                    checkLink={linkHandler}
                    isLoadingForm={isLoadingForm}
                    onUpdateCards={handleUpdateCards}
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                  />
                  <RemoveCardPopup
                    isLoadingForm={isLoadingForm}
                    onDeleteCard={handleCardDelete}
                    isOpen={isAcceptPopupOpen}
                    onClose={closeAllPopups}
                  />
                  <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImagePopupOpen}
                  />
                  <Footer />
                </>
              }
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Register handleRegister={handleRegister} />
              <InfoTooltip
                isSeccessfull={!regStatus.isError}
                iconSeccessfull={iconSeccessfull}
                badIcon={badIcon}
                isOpen={isNotificationPupupOpen}
                onClose={closeAllPopups}
              />
            </>
          }
        />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="*"
          element={
            <>
              <main>
                <section className="login container">
                  <h1>Ошибка 404</h1>
                  <h2>К сожалению страница не найдена..</h2>
                </section>
              </main>
            </>
          }
        />
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
