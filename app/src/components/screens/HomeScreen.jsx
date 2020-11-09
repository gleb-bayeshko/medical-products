import React from "react";
import { Helmet } from "react-helmet";

import Content from "../Content";

function HomeScreen(props) {
  return (
    <>
      <Helmet>
        <title>{`Medical Products - ${
          props.match.params.category
            ? props.match.params.category[0].toUpperCase() +
              props.match.params.category.slice(1)
            : "All"
        }`}</title>
      </Helmet>
      <Content productCategory={props.match.params.category || "all"} />
    </>
  );
}

export default HomeScreen;
