import paths from "./constants/paths";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Subscription from "./pages/subscription";
import CreateSubscription from "./pages/subscription/createsubscription";
import EditSubscription from "./pages/subscription/editsubscription";
import User from "./pages/user";
import UserInfo from "./pages/user/userinfo";
import Resource from "./pages/resource";
import CreateResource from "./pages/resource/createresource";
import EditResource from "./pages/resource/editresource";
import Plugin from "./pages/plugin";
import PluginInfo from "./pages/plugin/plugininfo";
import CreatePlugin from "./pages/plugin/createplugin";
import EditPlugin from "./pages/plugin/editplugin";
//import Cluster from "./pages/cluster";
import Cluster from "./pages/clusters/ClusterList"
//import CreateCluster from "./pages/cluster/createcluster";
import CreateCluster from './pages/clusters/createcluster/CreateClusterMaster';
//import EditCluster from "./pages/cluster/editcluster";
import EditCluster from './pages/clusters/createcluster/CreateClusterMaster';
// import Register from './pages/registration';
// import ForgotPassword from './pages/forgotpassw0ord';
//import AccountInfo from "./pages/account/AccountInfo";
// import ProjectList from "./pages/project/projectlist/ProjectList";
// import CreateProject from "./pages/project/createproject/CreateProject";
import ProjectInfo from "./pages/user/projectinfo/ProjectInfo";
// import ProjectInfo from "./pages/project/projectinfo/ProjectInfo";
import CreateVersion from "./pages/plugin/version/createversion";
import EditVersion from "./pages/plugin/version/editversion";
import EnvironmentInfo from "./pages/environment/environmentInfo";
import Invitation from "./pages/invitation/Invitation";
// import AppInfo from './pages/app/appinfo/AppInfo';
// import CreateApp from './pages/app/createapp/CreateApp';
// import CreateAppMaster from './pages/environment/createenvironment/CreateAppMaster';
// import ResetPassword from './pages/resetpassword/ResetPassword';
// import PluginSelection from './pages/app/createapp/PluginSelection';
// import RegionSelection from './pages/app/createapp/RegionSelection'
// import Template from './pages/app/createapp/template/Template';
// import Resources from './pages/app/createapp/resources/Resources';
// import Generals from './pages/app/createapp/generals/Generals';
// import Deploy from './pages/app/createapp/deploy/Deploy';
// import EnvironmentInfo from './pages/environment/environmentinfo/EnvironmentInfo';
// import LoginCallback from "./pages/login/LoginCallback";
// import VerifyEmail from './pages/registration/VerifyEmail';
import Support from "./pages/support";
import TicketOverView from "./pages/support/ticketOverview/TicketOverView";
import LoadBalancers from "./pages/loadbalancers";
import LoadBalancerDetail from "./pages/loadbalancers/LoadBalancerDetail";
import Dns from "./pages/dns"
import Registry from "./pages/registry/Registry";
import OrganizationSubscription from "./pages/subscription/OrganizationSubscription";
import EditOrgSubscription from "./pages/subscription/editorgsubscription/EditOrgSubscription";
import CreateOrgSubscription from "./pages/subscription/createorgsubscription/CreateOrgSubscription";
import PromoCodeList from "./pages/billing/promocode/PromoCodeList";
import PaymentList from "./pages/billing/payment/PaymentList";
import InvoiceList from "./pages/billing/invoice/InvoiceList";
import GateWaysList from "./pages/billing/gateway/GateWaysList";
import DeductionsList from "./pages/billing/deductions/DeductionsList";
import OrganizationsList from "./pages/organization/organizationslist/OrganizationsList";
import OrganizationInfo from "./pages/organization/organizationInfo/OrganizationInfo";
import Operators from "./pages/operators/Operators";

export default {
  DEFAULT: {
    component: Login,
    route: paths.DEFAULT,
  },

  DASHBOARD: {
    component: Dashboard,
    route: paths.DASHBOARD,
  },
  SUBSCRIPTION: {
    component: Subscription,
    route: paths.SUBSCRIPTION,
  },
  CREATE_SUBSCRIPTION: {
    component: CreateSubscription,
    route: paths.CREATE_SUBSCRIPTION,
  },
  EDIT_SUBSCRIPTION: {
    component: EditSubscription,
    route: paths.EDIT_SUBSCRIPTION,
  },
  ORG_SUBSCRIPTION: {
    component: OrganizationSubscription,
    route: paths.ORG_SUBSCRIPTION,
  },
  CREATE_ORG_SUBSCRIPTION: {
    component: CreateOrgSubscription,
    route: paths.CREATE_ORG_SUBSCRIPTION,
  },
  EDIT_ORG_SUBSCRIPTION: {
    component: EditOrgSubscription,
    route: paths.EDIT_ORG_SUBSCRIPTION,
  },
  USER: {
    component: User,
    route: paths.USERS,
  },
  USER_INFO: {
    component: UserInfo,
    route: paths.USER_INFO,
  },
  RESOURCE: {
    component: Resource,
    route: paths.RESOURCES,
  },
  CREATE_RESOURCE: {
    component: CreateResource,
    route: paths.CREATE_RESOURCE,
  },
  EDIT_RESOURCE: {
    component: EditResource,
    route: paths.EDIT_RESOURCE,
  },
  PLUGIN: {
    component: Plugin,
    route: paths.PLUGIN,
  },
  CREATE_PLUGIN: {
    component: CreatePlugin,
    route: paths.CREATE_PLUGIN,
  },
  EDIT_PLUGIN: {
    component: EditPlugin,
    route: paths.EDIT_PLUGIN,
  },
  PLUGIN_INFO: {
    component: PluginInfo,
    route: paths.PLUGIN_INFO,
  },
  CLUSTER: {
    component: Cluster,
    route: paths.CLUSTER,
  },
  CREATE_CLUSTER: {
    component: CreateCluster,
    route: paths.CREATE_CLUSTER,
  },
  EDIT_CLUSTER: {
    component: EditCluster,
    route: paths.EDIT_CLUSTER,
  },
  // ACCOUNTDETAILS: {
  //   component: AccountInfo,
  //   route: paths.ACCOUNTDETAILS,
  // },
  // PROJECTLIST: {
  //   component: ProjectList,
  //   route: paths.PROJECTLIST,
  // },
  // CREATEPROJECT: {
  //   component: CreateProject,
  //   route: paths.CREATEPROJECT,
  // },
  PROJECTINFO: {
    component: ProjectInfo,
    route: paths.PROJECT_INFO,
  },
  ENVIRONMENT_INFO: {
    component: EnvironmentInfo,
    route: paths.ENVIRONMENT_INFO,
  },
  CREATE_VERSION: {
    component: CreateVersion,
    route: paths.CREATE_VERSION,
  },
  EDIT_VERSION: {
    component: EditVersion,
    route: paths.EDIT_VERSION,
  },
  REGISTRIES: {
    component: Registry,
    route: paths.REGISTRIES,
  },
  INVITATIONS: {
    component: Invitation,
    route: paths.INVITATIONS,
  },
  // APPDETAILS: {
  //     component: AppInfo,
  //     route: paths.APPDETAILS
  // },
  // CREATEAPP: {
  //     component: CreateApp,
  //     route: paths.CREATEAPP
  // },
  // CREATEAPP_SELECTPLUGIN: {
  //     component: PluginSelection,
  //     route: paths.CREATEAPP_SELECTPLUGIN
  // },
  // CREATEAPP_SELECTREGION: {
  //     component: RegionSelection,
  //     route: paths.CREATEAPP_SELECTREGION
  // },
  // CREATEENVIRONMENT: {
  //     component: CreateAppMaster,
  //     route: paths.CREATEENVIRONMENT
  // },
  // CREATEAPPTEMPLATE: {
  //     component: Template,
  //     route: paths.CREATEAPPTEMPLATE
  // },
  // CREATEAPPRESOURCES: {
  //     component: Resources,
  //     route: paths.CREATEAPPRESOURCES
  // },
  // CREATEAPPGENERALS: {
  //     component: Generals,
  //     route: paths.CREATEAPPGENERALS
  // },
  // CREATEAPPDEPLOY: {
  //     component: Deploy,
  //     route: paths.CREATEAPPDEPLOY
  // },
  // ENVIRONMENTINFO: {
  //     component: EnvironmentInfo,
  //     route: paths.ENVIRONMENTINFO
  // },
  // LOGINCALLBACK: {
  //     component: LoginCallback,
  //     route: paths.LOGINCALLBACK
  // },
  // VERIFYEMAIL: {
  //     component: VerifyEmail,
  //     route: paths.VERIFYEMAIL
  // }
  SUPPORT: {
    component: Support,
    route: paths.SUPPORT,
  },
  TICKETOVERVIEW: {
    component: TicketOverView,
    route: paths.TICKETOVERVIEW,
  },
  LOADBALANCERS: {
    component: LoadBalancers,
    route: paths.LOADBALANCERS,
  },
  LOADBALANCERDETAIL: {
    component: LoadBalancerDetail,
    route: paths.LOADBALANCERDETAIL
  },
  DNS: {
    component: Dns,
    route: paths.DNS
  }, 
  BILLING: {
    component: PromoCodeList,
    route: paths.BILLING
  },
  PAYMENT: {
    component: PaymentList,
    route: paths.PAYMENT
  },
  INVOICE: {
    component: InvoiceList,
    route: paths.INVOICE
  },
  GATEWAY: {
    component: GateWaysList,
    route: paths.GATEWAY
  },
  DEDUCTIONS: {
    component: DeductionsList,
    route: paths.DEDUCTIONS
  },
  ORGANIZATIONLIST: {
    component: OrganizationsList,
    route: paths.ORGANIZATIONLIST
  },
  ORGANIZATIONINFO: {
    component: OrganizationInfo,
    route: paths.ORGANIZATION_INFO
  },
  OPERATORS: {
    component: Operators,
    route: paths.OPERATORS
  },
};
