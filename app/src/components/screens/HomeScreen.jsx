import React from "react";

import TopBar from '../TopBar';
import Content from '../Content';

function HomeScreen (props) {
  return (
    <>
      <Content productCategory={props.match.params.category || 'all'} />
    </>
  )
}

export default HomeScreen;