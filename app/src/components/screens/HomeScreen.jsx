import React from "react";

import Content from '../Content';

function HomeScreen (props) {
  return (
    <>
      <Content productCategory={props.match.params.category || 'all'} />
    </>
  )
}

export default HomeScreen;