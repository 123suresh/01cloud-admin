import React, { memo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../routes";
import PrivateRoute from "./PrivateRoute";
import { withTranslation } from "react-i18next";

const MainRouter = () => {
  // props.i18n.changeLanguage("hin");
  return (
    <Router>
      <Switch>
        <Route
          path={routes.DEFAULT.route}
          component={routes.DEFAULT.component}
          exact
        />
        <PrivateRoute
          path={routes.DASHBOARD.route}
          component={routes.DASHBOARD.component}
          exact
        />
        <PrivateRoute
          path={routes.SUBSCRIPTION.route}
          component={routes.SUBSCRIPTION.component}
          exact
        />
        <PrivateRoute
          path={routes.CREATE_SUBSCRIPTION.route}
          component={routes.CREATE_SUBSCRIPTION.component}
          exact
        />
        <PrivateRoute
          path={routes.EDIT_SUBSCRIPTION.route}
          component={routes.EDIT_SUBSCRIPTION.component}
          exact
        />
        <PrivateRoute
          path={routes.ORG_SUBSCRIPTION.route}
          component={routes.ORG_SUBSCRIPTION.component}
          exact
        />
        <PrivateRoute
          path={routes.CREATE_ORG_SUBSCRIPTION.route}
          component={routes.CREATE_ORG_SUBSCRIPTION.component}
          exact
        />
        <PrivateRoute
          path={routes.EDIT_ORG_SUBSCRIPTION.route}
          component={routes.EDIT_ORG_SUBSCRIPTION.component}
          exact
        />
        <PrivateRoute
          path={routes.INVITATIONS.route}
          component={routes.INVITATIONS.component}
          exact
        />
        <PrivateRoute
          path={routes.USER.route}
          component={routes.USER.component}
          exact
        />
        <PrivateRoute
          path={routes.USER_INFO.route}
          component={routes.USER_INFO.component}
          exact
        />
        <PrivateRoute
          path={routes.PLUGIN.route}
          component={routes.PLUGIN.component}
          exact
        />
        <PrivateRoute
          path={routes.CREATE_PLUGIN.route}
          component={routes.CREATE_PLUGIN.component}
          exact
        />
        <PrivateRoute
          path={routes.EDIT_PLUGIN.route}
          component={routes.EDIT_PLUGIN.component}
          exact
        />
        <PrivateRoute
          path={routes.CREATE_VERSION.route}
          component={routes.CREATE_VERSION.component}
          exact
        />
        <PrivateRoute
          path={routes.EDIT_VERSION.route}
          component={routes.EDIT_VERSION.component}
          exact
        />
        <PrivateRoute
          path={routes.PLUGIN_INFO.route}
          component={routes.PLUGIN_INFO.component}
          exact
        />
        <PrivateRoute
          path={routes.CLUSTER.route}
          component={routes.CLUSTER.component}
          exact
        />
        <PrivateRoute
          path={routes.CREATE_CLUSTER.route}
          component={routes.CREATE_CLUSTER.component}
          exact
        />
        <PrivateRoute
          path={routes.EDIT_CLUSTER.route}
          component={routes.EDIT_CLUSTER.component}
          exact
        />
        <PrivateRoute
          path={routes.RESOURCE.route}
          component={routes.RESOURCE.component}
          exact
        />
        <PrivateRoute
          path={routes.CREATE_RESOURCE.route}
          component={routes.CREATE_RESOURCE.component}
          exact
        />
        <PrivateRoute
          path={routes.EDIT_RESOURCE.route}
          component={routes.EDIT_RESOURCE.component}
          exact
        />
        {/* <PrivateRoute
          path={routes.ACCOUNTDETAILS.route}
          component={routes.ACCOUNTDETAILS.component}
          exact
        />
        {/* <PrivateRoute
          path={routes.PROJECTLIST.route}
          component={routes.PROJECTLIST.component}
          exact
        />
        <PrivateRoute
          path={routes.CREATEPROJECT.route}
          component={routes.CREATEPROJECT.component}
          exact
        /> */}
        <PrivateRoute
          path={routes.PROJECTINFO.route}
          component={routes.PROJECTINFO.component}
          exact
        />
        <PrivateRoute
          path={routes.ENVIRONMENT_INFO.route}
          component={routes.ENVIRONMENT_INFO.component}
          exact
        />
        <PrivateRoute
          path={routes.SUPPORT.route}
          component={routes.SUPPORT.component}
          exact
        />

        <PrivateRoute
          path={routes.TICKETOVERVIEW.route}
          component={routes.TICKETOVERVIEW.component}
          exact
        />

        <PrivateRoute
          path={routes.LOADBALANCERS.route}
          component={routes.LOADBALANCERS.component}
          exact
        />

        <PrivateRoute
          path={routes.BILLING.route}
          component={routes.BILLING.component}
          exact
        />

        <PrivateRoute
          path={routes.REGISTRIES.route}
          component={routes.REGISTRIES.component}
          exact
        />

        <PrivateRoute
          path={routes.LOADBALANCERDETAIL.route}
          component={routes.LOADBALANCERDETAIL.component}
          exact
        />

        <PrivateRoute
          path={routes.DNS.route}
          component={routes.DNS.component}
          exact
        />

        <PrivateRoute
          path={routes.PAYMENT.route}
          component={routes.PAYMENT.component}
          exact
        />
        <PrivateRoute
          path={routes.INVOICE.route}
          component={routes.INVOICE.component}
          exact
        />
        <PrivateRoute
          path={routes.GATEWAY.route}
          component={routes.GATEWAY.component}
          exact
        />
        <PrivateRoute
          path={routes.DEDUCTIONS.route}
          component={routes.DEDUCTIONS.component}
          exact
        />
        <PrivateRoute
          path={routes.ORGANIZATIONLIST.route}
          component={routes.ORGANIZATIONLIST.component}
          exact
        />
        <PrivateRoute
          path={routes.ORGANIZATIONINFO.route}
          component={routes.ORGANIZATIONINFO.component}
          exact
        />
        <PrivateRoute
          path={routes.OPERATORS.route}
          component={routes.OPERATORS.component}
          exact
        />
        {/* <PrivateRoute path={ routes.CREATEAPP.route } component={ routes.CREATEAPP.component } exact /> */}
        {/* <PrivateRoute path={ routes.APPDETAILS.route } component={ routes.APPDETAILS.component } exact /> */}
      </Switch>
    </Router>
  );
};

export default memo(withTranslation()(MainRouter));
