import React from "react";

import Content from "../Content";

function HomeScreen(props) {
  document.title = `Medical Products - ${
    props.match.params.category
      ? props.match.params.category[0].toUpperCase() +
        props.match.params.category.slice(1)
      : "All"
  }`;
  return (
    <>
      <Content productCategory={props.match.params.category || "all"} />
    </>
  );
}

export default HomeScreen;
