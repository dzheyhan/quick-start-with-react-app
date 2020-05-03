import React, { useState } from "react";
import LayoutComponent from "../containers/Layout.component";
import axiosInstance from "../axiosApi";
import { withTranslation } from "react-i18next";

function PageOne(props) {
  // Declare a new state variable, which we'll call "count"
  const [number, setNumber] = useState(0);
  const { t } = props;

  function newRandomNumber(e) {
    axiosInstance
      .get("/hallo")
      .then((data) => setNumber(data.data.number))
      .catch((error) => console.log("Error", error));
  }

  return (
    <LayoutComponent>
      <h1>{t("Public page")}</h1>
      <p onClick={newRandomNumber} style={{ cursor: "pointer" }}>
        CLICK ME OUT: {`${number}`}
      </p>
    </LayoutComponent>
  );
}

export default withTranslation()(PageOne);
