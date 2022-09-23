/* eslint-disable no-undef */
export default {
    AUTH: {
        LOGIN: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/login',
        REGISTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/register',
        FORGOT_PASSWORD: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/forgot-password',
        UPDATE_PASSWORD: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/change-password',
        LOGIN_OAUTH: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/login/external',
        VERIFY_EMAIL: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/verify/:token',
        RESEND_VERIFY_EMAIL: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/resend-verification'
    },
    GET_PROFILE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/:userId',
    PLUGIN_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/plugins?page=:page&size=:size&search=:search&sort-column=:sort-column&sort-direction=:sort-direction',
    GET_USERS_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/users?page=:page&size=:size&search=:search&sort-column=:sort-column&sort-direction=:sort-direction',
    PLUGIN_DETAILS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/plugin/:pId',
    CREATE_PROJECT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project',
    GET_PROJECT_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/projects',
    GET_SUBSCRIPTION_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/subscriptions',
    GET_SUBSCRIPTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/subscription/:id',
    CREATE_SUBSCRIPTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/subscription',
    EDIT_SUBSCRIPTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/subscription/:id',
    GET_CLUSTER_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + "/admin/clusters",
    UPDATE_PROJECT_DETAILS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:projectId',
    DELETE_PROJECT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:projectId',
    REGIONS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/regions',
    PROJECT_DETAILS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:pId',
    GET_APP_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:pId/applications',
    GET_APP_DETAILS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/application/:aid',
    DELETE_APP: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/application/:aid',
    GET_ENVIRONMENT_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/application/:aid/environments',
    UPDATE_USER_DETAILS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/:userId',
    ENV_DETAILS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId',
    START_ENVIRONMENT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId/restart',
    STOP_ENVIRONMENT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId/stop',
    DELETE_ENVIRONMENT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId',
    //UPDATE_USER_DETAILS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/:userId',
    RESET_PASSWORD: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/reset-password',
    CREATE_APPLICATION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/application',
    CREATE_ENVIRONMENT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment',
    DEPLOY_APPLICATION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/application/:appId/deploy',
    ADD_USERS_IN_PROJECT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:projectId/user',
    LIST_USERS_IN_PROJECT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:projectId/users',
    DELETE_USERS_IN_PROJECT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:projectId/user/:userId',
    FETCH_ROLES_DATA: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/roles',
    ADD_USERS_IN_ENVIRONMENT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:environmentId/user',
    LIST_USERS_IN_ENVIRONMENT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:environmentId/users',
    DELETE_USERS_IN_ENVIRONMENT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:environmentId/user/:userId',
    CREATE_VERSION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/plugin-version',
    CREATE_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/cluster',
    GET_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/cluster/:id',
    EDIT_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/cluster/:id',
    //DEPLOY_APPLICATION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/application/:appId/deploy',
    RESOURCES: {
        FETCH_RESOURCES: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/resources',
        CREATE_RESOURCE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/resource',
        EDIT_RESOURCE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/resource/:id',
        GET_RESOURCE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/resource/:id',
    },
    ENVIRONMENT: {
        GET_VARIABLES: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId/variables',
        UPDATE_VARIABLES: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId/variables',
        START_FETCHING_LOGS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId/fetch-logs?fetch_time=:duration',
        GET_LOGS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId/status',
        UPDATE_ENV: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId',
        GET_INSIGHTS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId/insights',
        GET_STATE_INITIATE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId/fetch-state',
        GET_STATE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/environment/:eId/state'
    },
    PLUGIN: {
        GET_VERSION_CONFIG: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/plugin-version/:id/config',
        UPLOAD_ICON: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/upload',
        CREATE_PLUGIN: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/plugin',
        PLUGIN_INFO: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/plugin/:pId',
        EDIT_PLUGIN: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/plugin/:id',
        PLUGIN_VERSION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/plugin/:pId/versions',
        GET_ADDON_CATEGORIES: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/plugin-category?is_add_on=true',
    },
    VERSION: {
        EDIT_VERSION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/plugin-version/:id'
    },
    PROJECT: {
        GET_ACTIVITIES: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:pId/activities',
        GET_INSIGHTS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:pId/insights',
        GET_APPS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:pId/admin-app',
        GET_APPS_ENV: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/application/:appId/admin-env',
        GET_INFO: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/project/:pId',
        UPLOAD_ICON: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/upload',
    },
    USER: {
        UPDATE_USER_DISCOUNT: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/admin/setting/:id',
        USER_INFO: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/:userId',
        USER_PROJECTS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/:userId/projects',
        UPDATE_USER_ACTIVE_STATUS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/:userId/block',
        UPDATE_USER_ADMIN_STATUS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user/:userId/change-admin-status',
    },
    INVITATION: {
        GET_INVITATION_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user-invites',
        APPROVE_INVITATION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user-invite-validate/:id',
        ADD_INVITATION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/user-invite'
    },
    SUPPORT: {
        GET_TICKET_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/admin',
        GET_TICKET_OVERVIEW: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/details/:id',
        ASSIGN_TICKET: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/assign',
        ASSIGN_SERVICE_TYPE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/:id',
        ADD_NOTES: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/:id',
        CLOSE_TICKET: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/:id',
        REPLY_TICKET: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/reply',
        DELETE_TICKET: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/:id',
        GET_TICKET_GROUP: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/group',
        GET_ADMIN_GROUP: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/user',
        GET_TICKET_STATS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/ticket/dashboard'
    },
    LOADBALANCERS: {
        GET_LB_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/loadbalancers',
        GET_LB_DETAIL: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/loadbalancer/:id/environment'
    },
    DNS: {
        GET_PROVIDER_CONFIG: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster-config?provider=:provider',
        CHECK_DNS_PERMISSION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/check-dns-permissions',
        CREATE_DNS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/dns',
        GET_DNS_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/dns',
        DELETE_DNS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/dns/:dns_id',
        GET_DNS_BY_ID: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/dns/:dns_id',
        UPDATE_DNS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/dns/:dns_id'
    },
    REGISTRY: {
        GET_REGISTRY_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/registries',
        GET_REGISTRY: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/registry/:id',
        ADD_REGISTRY: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/registry',
        UPDATE_REGISTRY: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/registry/:id',
        DELETE_REGISTRY: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/registry/:id',
        GET_REGISTRY_CONFIG: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/registry-config'
    },
    CLUSTER: {
        CREATE_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster',
        UPDATE_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id',
        GET_CLUSTER_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster',
        GET_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id',
        APPLY_TERRAFORM: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/apply',
        GET_WORKFLOWS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/workflows?page=:page&limit=:limit',
        CANCEL_WORKFLOW: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/cancel?workflow_name=:workflow',
        GET_WORKFLOW_LOG: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/workflow-log?workflow_name=:workflow-name',
        DOWNLOAD_TF_FILES: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/download-files',
        DELETE_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id',
        DESTROY_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/destroy',
        CHECK_PERMISSION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/check-permissions',
        GET_PROVIDER_CONFIG: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster-config?provider=:provider',
        IMPORT_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/import-cluster',
        GET_CLUSTER_PACKAGE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/package-config',
        INSTALL_CLUSTER_PACKAGE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/install-package',
        UNINSTALL_CLUSTER_PACKAGE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/uninstall-package',
        GET_PACKAGE_STATUS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/package-status',
        ENABLE_DISABLE_CLUSTER: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:id/change-active-status',
        UPDATE_CLUSTER_REPO: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/cluster/:id',
        SETUP_CLUSTER_DNS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/cluster/:id/add-dns',
        CHECK_DNS_PERMISSION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/check-dns-permissions',
        CREATE_STORAGE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/cluster/:cluster_id/change-storage',
        UPDATE_STORAGE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/cluster/:cluster_id/change-storage',
        GET_CLUSTER_INSIGHTS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/create-cluster/:cluster_id/insights',

    },
    SUBSCRIPTION: {
        GET_ORG_SUBSCRIPTION_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/organizationPlans',
        GET_ORG_SUBSCRIPTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/organizationPlan/:id',
        CREATE_ORG_SUBSCRIPTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/organizationPlan',
        UPDATE_ORG_SUBSCRIPTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/organizationPlan/:id',
        DELETE_ORG_SUBSCRIPTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/organizationPlan/:id',
    },
    ORGANIZATION: {
        GET_ORGANIZATION_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/organizations?page=:page&size=:size&query=:search',
        GET_ORGANIZATION_BY_ID: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/organization/:id',
        GET_PROJECT_OF_ORGANIZATION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/project/:oid',
        GET_CLUSTER_OF_ORGANIZATION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/org/cluster/:oid'
    },
    BILLING: {
        LIST_PROMO_CODES: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/promocode?search=:searchText&status=:status',
        GET_PROMO_CODE_DETAIL: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/promocode/:id',
        ADD_PROMO_CODE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/promocode',
        UPDATE_PROMO_CODE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/promocode/:id',
        DELETE_PROMO_CODE: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/promocode/:id',
        GET_PAYMENTS_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/transaction?page=:page&size=:size&search=:searchText&status=:status&startdate=:fromDate&endate=:toDate',
        GET_INVOICE_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/invoices?page=:page&size=:size&search=:searchText&status=:status&user_id=:user_id&startdate=:fromDate&endate=:toDate',
        GET_INVOICE_BY_ID: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/invoice/:id',
        GET_GATEWAYS_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/gateway-all',
        ADD_GATEWAY: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/gateway',
        UPDATE_GATEWAY: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/gateway/:id',
        DELETE_GATEWAY: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/gateway/:id',
        GET_GATEWAY_BY_ID: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/gateway/:id',
        GET_DEDUCTIONS_LIST: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/deduction',
        ADD_DEDUCTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/deduction',
        UPDATE_DEDUCTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/deduction/:id',
        DELETE_DEDUCTION: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/deduction/:id',
        GET_DEDUCTION_BY_ID: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/payment/deduction/:id',
    },
    DASHOBARD: window?.config?.REACT_APP_RESTAPI_ENDPOINT + '/admin/dashboard',
    OPERATORS: {
        FETCH_OPERATORS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + "/admin/operators",
        UPDATE_OPERATOR_STATUS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + "/admin/operator/enable-disable?packageName=:packageName&isActive=:isActive",
        SYNC_OPERATOR: window?.config?.REACT_APP_RESTAPI_ENDPOINT + "/admin/operator/sync?packageName=:packageName",
        FETCH_OPERATOR_DETAILS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + "/operator?packageName=:packageName",
        UPDATE_OPERATOR_DETAILS: window?.config?.REACT_APP_RESTAPI_ENDPOINT + "/admin/operator/:packageName",
    }
}