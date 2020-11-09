import React, { useEffect, useRef, useState } from "react";

function ClothesColors(props) {
    const [colorActive, setColorActive] = useState(null);
    const colorActiveRef = useRef(null);

    const selectActiveColor = (e) => {
      if (!props.isSelectable) return;

      setColorActive(e.target);

      props.setActiveColorName &&
      props.setActiveColorName(e.target.getAttribute('data-color'));
    }

    useEffect(() => {
      if (colorActive) {
        colorActiveRef.current &&
        colorActiveRef.current.classList.remove('clothes-color_active');

        colorActive.classList.add('clothes-color_active');
        colorActiveRef.current = colorActive;
      }
    }, [colorActive])

    

    return (
      <>
      {
        props.colors !== null &&
        props.colors !== undefined &&
        props.colors.map(color => {
          return <div className={`clothes-color clothes-color_${color}`} data-color={`${color}`} onClick={selectActiveColor} key={`${props._id}_${color}`}></div>
        })
      }
      </>
    )
}

export default ClothesColors;