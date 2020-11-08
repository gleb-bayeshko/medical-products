import React from "react";

function Rating(props) {
  const ratingValues = [5, 4, 3, 2, 1];
  const rating = props.rating;
  const starClass = props.starClass || '';
  const starContainerClass = props.starContainerClass || '';

  return (
    <div className={`rating reviews__rating ${starContainerClass}`}>
      {ratingValues.map((value) => {
        if (rating >= value) {
          return <i className={`fas fa-star rating__star ${starClass}`}></i>
        } else if (rating >= value - 0.5) {
          return <i className={`fas fa-star-half-alt rating__star ${starClass}`}></i>
        } else {
          return <i className={`far fa-star rating__star ${starClass}`}></i>
        }
      }).reverse()}
    </div>
  );
}

export default Rating;
