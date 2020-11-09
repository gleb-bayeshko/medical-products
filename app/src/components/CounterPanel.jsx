import React from "react";

export default function CounterPanel(props) {
  const counterIncrement = () => {
    props.setCounter((prevCounter) =>
      prevCounter === 99 ? prevCounter : prevCounter + 1
    );
  };

  const counterDecrement = () => {
    props.setCounter((prevCounter) =>
      prevCounter === 1 ? prevCounter : prevCounter - 1
    );
  };

  return (
    <div
      className={`counter-panel ${
        props.addCounterClass ? props.addCounterClass : ""
      }`}
    >
      <div
        className="counter-panel__controls counter-panel__controls_plus"
        onClick={counterIncrement}
      >
        <p>+</p>
      </div>
      <div className="cart-list__qty counter-panel__qty">{props.counter}</div>
      <div
        className="counter-panel__controls counter-panel__controls_minus"
        onClick={counterDecrement}
      >
        <p>-</p>
      </div>
    </div>
  );
}
