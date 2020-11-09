import React from "react";

function Rating(props) {
  const ratingValues = [5, 4, 3, 2, 1];
  const rating = props.rating;
  const starClass = props.starClass || "";
  const starContainerClass = props.starContainerClass || "";
  const keyWord = props.keyWord || "DEFAULT_RATING_KEY_WORD";

  return (
    <div className={`rating reviews__rating ${starContainerClass}`}>
      {ratingValues
        .map((value) => {
          if (rating >= value) {
            return (
              <i
                className={`fas fa-star rating__star ${starClass}`}
                key={`${keyWord}__${value}`}
              ></i>
            );
          } else if (rating >= value - 0.5) {
            return (
              <i
                className={`fas fa-star-half-alt rating__star ${starClass}`}
                key={`${keyWord}__${value}`}
              ></i>
            );
          } else {
            return (
              <i
                className={`far fa-star rating__star ${starClass}`}
                key={`${keyWord}__${value}`}
              ></i>
            );
          }
        })
        .reverse()}
    </div>
  );
}

export default Rating;
