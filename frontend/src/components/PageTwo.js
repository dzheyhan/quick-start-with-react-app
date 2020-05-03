import React from "react";
import LayoutComponent from "../containers/Layout.component";
import { withTranslation } from "react-i18next";

function PageTwo(props) {
  const { t } = props;

  return (
    <LayoutComponent>
      <h1>{t("Public page")}</h1>
    </LayoutComponent>
  );
}

export default withTranslation()(PageTwo);
