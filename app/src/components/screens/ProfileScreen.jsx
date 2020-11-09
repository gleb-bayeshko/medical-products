import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { set } from "js-cookie";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signOut,
  userUpdateAvatar,
  userUpdateInfo,
  userUpdatePassword,
  userUpdatePasswordCleanState,
} from "../../actions/userActions";
import { DEFAULT_AVATAR } from "../../constants/userConstants";
import Preloader from "../preloaders/Preloader";

function ProfileScreen(props) {
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordMode, setIsPasswordMode] = useState(false);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const [name, setName] = useState(userInfo.name || "");
  const [secondName, setSecondName] = useState(userInfo.secondName || "");
  const [country, setCountry] = useState(userInfo.country || "");
  const [city, setCity] = useState(userInfo.city || "");
  const [sex, setSex] = useState(userInfo.sex || "");
  const [avatar, setAvatar] = useState(userInfo.avatar || "");
  const [passwordPrev, setPasswordPrev] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingAvatarError, setUploadingAvatarError] = useState(false);
  const {
    loadingUpdatePassword,
    successUpdatePassword,
    errorUpdatePassword,
  } = useSelector((state) => state.userUpdatePassword);

  const avatarPathRef = useRef();

  const handleUploadAvatar = (e) => {
    const avatarUpload = e.target.files[0];
    const bodyFormData = new FormData();

    bodyFormData.append("avatar-image", avatarUpload);

    setUploadingAvatar(true);
    axios
      .post("/api/uploads/avatar-image", bodyFormData, {
        headers: {
          "Content-type": "multipart/form-data",
          'Authorization': `Bearer ${userInfo.token}`
        },
      })
      .then((response) => {
        setUploadingAvatar(false);
        setAvatar(response.data);
      })
      .catch((error) => {
        setUploadingAvatar(false);
        setUploadingAvatarError(
          error.message)
      });
  };

  const handleAvatarError = (e) =>
    (e.target.src = DEFAULT_AVATAR);

  useEffect(() => {
    if (avatar !== userInfo.avatar) {
      dispatch(userUpdateAvatar({ avatar: avatar }));
    }
  }, [avatar]);

  const handleSaveButton = () => {
    setIsEditMode(false);

    dispatch(
      userUpdateInfo({
        name,
        secondName,
        country,
        city,
        sex,
        avatar,
      })
    );
  };

  const handleSavePasswordButton = () => {
    setIsPasswordMode(false)
    dispatch(
      userUpdatePassword({
        passwordPrev,
        passwordNew,
      })
    );
    setPasswordPrev('');
    setPasswordNew('');
  };

  useEffect(() => {
    dispatch(userUpdatePasswordCleanState());
  }, [])

  const handleLogOutButton = () => {
    dispatch(signOut());
    props.history.push("/signin");
  }

  return (
    <section className="profile">
      <Helmet>
        <title>
          {
            userInfo && (userInfo.name && userInfo.secondName)
            ? document.title = `${userInfo.name} ${userInfo.secondName} - Profile`
            : document.title = `${userInfo.name} - Profile`
          }
        </title>
      </Helmet>
      <div className="wrapper">
        <div className="profile__container">
          <div className="profile__top">
            <h2 className="profile__title">User profile</h2>
            {!isEditMode && !isPasswordMode ? (
              <button
                type="button"
                className="action-button profile__action-button"
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
            ) : (
              !isPasswordMode && (
                <button
                  type="button"
                  className="action-button profile__action-button profile__action-button_save"
                  onClick={handleSaveButton}
                >
                  Save
                </button>
              )
            )}
          </div>
          {uploadingAvatarError && (
            <div className="auth-warning-message profile__warning_bottom-borders-radius-none">
              {uploadingAvatarError}
            </div>
          )}
          {successUpdatePassword && (
                    <div className="auth-warning-message profile__message-success profile__warning_bottom-borders-radius-none">
                      {successUpdatePassword}
                    </div>
                  )}
                  {errorUpdatePassword && (
                    <div className="auth-warning-message profile__warning_bottom-borders-radius-none">
                      {errorUpdatePassword}
                    </div>
                  )}
          <div
            className={`profile__info ${
              uploadingAvatarError || errorUpdatePassword || successUpdatePassword
                ? `profile__info_top-borders-radius-none`
                : ""
            }`}
          >
            <div
              className={`profile__fields-container ${
                isEditMode ||
                (isPasswordMode ? `profile__fields-container_full-width` : "")
              }`}
            >
              <h3 className="profile__field">
                Email:{" "}
                <span className="profile__user-data">
                  {userInfo.email || ""}
                </span>
              </h3>
              <h3 className="profile__field">
                Name:{" "}
                {isEditMode ? (
                  <input
                    type="text"
                    name="profile-name"
                    id="profile-name"
                    defaultValue={name}
                    className="sign-in__input profile__input"
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <span className="profile__user-data">{name}</span>
                )}
              </h3>
              <h3 className="profile__field">
                Second name:{" "}
                {isEditMode ? (
                  <input
                    type="text"
                    name="profile-second-name"
                    id="profile-second-name"
                    defaultValue={secondName}
                    className="sign-in__input profile__input"
                    onChange={(e) => setSecondName(e.target.value)}
                  />
                ) : (
                  <span className="profile__user-data">
                    {userInfo.secondName || ""}
                  </span>
                )}
              </h3>
              <h3 className="profile__field">
                Country:{" "}
                {isEditMode ? (
                  <input
                    type="text"
                    name="profile-country"
                    id="profile-country"
                    defaultValue={country}
                    className="sign-in__input profile__input"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                ) : (
                  <span className="profile__user-data">{country || ""}</span>
                )}
              </h3>
              <h3 className="profile__field">
                City:{" "}
                {isEditMode ? (
                  <input
                    type="text"
                    name="profile-city"
                    id="profile-city"
                    defaultValue={city}
                    className="sign-in__input profile__input"
                    onChange={(e) => setCity(e.target.value)}
                  />
                ) : (
                  <span className="profile__user-data">{city || ""}</span>
                )}
              </h3>
              <h3 className="profile__field">
                Sex:{" "}
                {isEditMode ? (
                  <select
                    name="profile-sex"
                    id="profile-sex"
                    defaultValue={sex || "DEFAULT"}
                    className="sign-in__input profile__input"
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option value="DEFAULT" disabled>
                      Choose...
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <span className="profile__user-data">{sex || ""}</span>
                )}
              </h3>
              {!isEditMode && (
                <div className="profile__password-container">
                  <h3 className="profile__field">Password: </h3>
                  {isPasswordMode ? (
                    <>
                      {!loadingUpdatePassword ? (
                        <>
                          <button
                            className="button profile__action-button_save button-change-password"
                            onClick={handleSavePasswordButton}
                          >
                            Save password
                          </button>
                          <button
                            className="cancel-action profile__cancel-action"
                            onClick={() => setIsPasswordMode(false)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <div className="profile__loading-text">Loading...</div>
                      )}
                    </>
                  ) : (
                    <button
                      className="button button_inverted button-change-password"
                      onClick={() => setIsPasswordMode(true)}
                    >
                      Change password
                    </button>
                  )}
                </div>
              )}
              {isPasswordMode && (
                <>
                  <label htmlFor="password-prev" className="profile__field">
                    Enter current password
                  </label>
                  <input
                    type="password"
                    name="password-prev"
                    id="password-prev"
                    className="sign-in__input profile__input"
                    onChange={(e) => setPasswordPrev(e.target.value)}
                  />
                  <label htmlFor="password-new" className="profile__field">
                    Enter new password
                  </label>
                  <input
                    type="password"
                    name="password-new"
                    id="password-new"
                    className="sign-in__input profile__input"
                    onChange={(e) => setPasswordNew(e.target.value)}
                  />
                </>
              )}
            </div>
            {!isEditMode && (
              <div className="profile__avatar">
                <div className="profile__avatar-container">
                  <img
                    src={`${
                      !avatar
                        ? DEFAULT_AVATAR
                        : avatar
                    }`}
                    alt="avatar"
                    onError={handleAvatarError}
                    className="profile__avatar"
                  />
                </div>
                {uploadingAvatar && (
                  <Preloader isPositionAbsolute={true} isCentred={true} />
                )}
                {!uploadingAvatar && (
                  <>
                    <input
                      type="file"
                      name="profile-avatar-upload"
                      ref={avatarPathRef}
                      id="profile-avatar-upload"
                      onChange={handleUploadAvatar}
                      className="input-file"
                    />
                    <label
                      htmlFor="profile-avatar-upload"
                      className="input-file__label profile__input-file"
                    >
                      <span>Upload image</span>
                    </label>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="profile__bottom">
            <Link to="/cart">
              <button className="button profile__go-to-cart-button">
                Go to own cart
              </button>
            </Link>
            <button className="profile__log-out__button" onClick={handleLogOutButton}>Log out</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileScreen;
