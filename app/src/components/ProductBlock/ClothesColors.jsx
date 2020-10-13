import React, { Component } from "react";

class ClothesColors extends Component {
  render() {
    return (
      <>
      {
        this.props.colors !== null &&
        this.props.colors !== undefined &&
        this.props.colors.map(color => {
          return <div className={`clothes-color clothes-color_${color}`} key={`${this.props.productId}_${color}`}></div>
        })
      }
      </>
    )
  }
}

export default ClothesColors;