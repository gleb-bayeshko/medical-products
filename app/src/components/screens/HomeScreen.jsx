import React, { Component } from "react";

import TopBar from '../TopBar';
import Content from '../Content';

class HomeScreen extends Component {
  render() {
    return (
      <>
        <TopBar />
        <Content />
      </>
    )
  }
}

export default HomeScreen;