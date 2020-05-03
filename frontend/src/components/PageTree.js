import React from "react";
import LayoutComponent from "../containers/Layout.component";
import { UserContext } from "../Providers/UserProvider";
import { withTranslation } from "react-i18next";

class PageTree extends React.Component {
  static contextType = UserContext;

  render() {
    const { t } = this.props;
    return (
      <LayoutComponent>
        <h1>{t("Private page")}</h1>
        <h1>{t("Welcome to React")}</h1>
      </LayoutComponent>
    );
  }
}

export default withTranslation()(PageTree);
