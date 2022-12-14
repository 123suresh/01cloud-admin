const SUBSCRIPTION_PREFIX = "@SUBSCRIPTION";

export const FETCH_SUBSCRIPTIONS = `${SUBSCRIPTION_PREFIX}/FETCH_SUBSCRIPTIONS`;
export const FETCH_SUBSCRIPTIONS_SUCCESS = `${SUBSCRIPTION_PREFIX}/FETCH_SUBSCRIPTIONS_SUCCESS`;
export const FETCH_SUBSCRIPTIONS_FAILURE = `${SUBSCRIPTION_PREFIX}/FETCH_SUBSCRIPTIONS_FAILURE`;
export const FETCH_ORG_SUBSCRIPTIONS = `${SUBSCRIPTION_PREFIX}/FETCH_ORG_SUBSCRIPTIONS`;
export const FETCH_ORG_SUBSCRIPTIONS_SUCCESS = `${SUBSCRIPTION_PREFIX}/FETCH_ORG_SUBSCRIPTIONS_SUCCESS`;
export const FETCH_ORG_SUBSCRIPTIONS_FAILURE = `${SUBSCRIPTION_PREFIX}/FETCH_ORG_SUBSCRIPTIONS_FAILURE`;
export const FETCH_ORG_SUBSCRIPTION = `${SUBSCRIPTION_PREFIX}/FETCH_ORG_SUBSCRIPTION`;
export const FETCH_ORG_SUBSCRIPTION_SUCCESS = `${SUBSCRIPTION_PREFIX}/FETCH_ORG_SUBSCRIPTION_SUCCESS`;
export const FETCH_ORG_SUBSCRIPTION_FAILURE = `${SUBSCRIPTION_PREFIX}/FETCH_ORG_SUBSCRIPTION_FAILURE`;
export const CREATE_ORG_SUBSCRIPTION = `${SUBSCRIPTION_PREFIX}/CREATE_ORG_SUBSCRIPTION`;
export const CREATE_ORG_SUBSCRIPTION_SUCCESS = `${SUBSCRIPTION_PREFIX}/CREATE_ORG_SUBSCRIPTION_SUCCESS`;
export const CREATE_ORG_SUBSCRIPTION_FAILURE = `${SUBSCRIPTION_PREFIX}/CREATE_ORG_SUBSCRIPTION_FAILURE`;
export const EDIT_ORG_SUBSCRIPTION = `${SUBSCRIPTION_PREFIX}/EDIT_ORG_SUBSCRIPTION`;
export const EDIT_ORG_SUBSCRIPTION_SUCCESS = `${SUBSCRIPTION_PREFIX}/EDIT_ORG_SUBSCRIPTION_SUCCESS`;
export const EDIT_ORG_SUBSCRIPTION_FAILURE = `${SUBSCRIPTION_PREFIX}/EDIT_ORG_SUBSCRIPTION_FAILURE`;
export const DELETE_ORG_SUBSCRIPTION = `${SUBSCRIPTION_PREFIX}/DELETE_ORG_SUBSCRIPTION`;
export const DELETE_ORG_SUBSCRIPTION_SUCCESS = `${SUBSCRIPTION_PREFIX}/DELETE_ORG_SUBSCRIPTION_SUCCESS`;
export const DELETE_ORG_SUBSCRIPTION_FAILURE = `${SUBSCRIPTION_PREFIX}/DELETE_ORG_SUBSCRIPTION_FAILURE`;
export const FETCH_SUBSCRIPTION = `${SUBSCRIPTION_PREFIX}/FETCH_SUBSCRIPTION`;
export const FETCH_SUBSCRIPTION_SUCCESS = `${SUBSCRIPTION_PREFIX}/FETCH_SUBSCRIPTION_SUCCESS`;
export const FETCH_SUBSCRIPTION_FAILURE = `${SUBSCRIPTION_PREFIX}/FETCH_SUBSCRIPTION_FAILURE`;
export const DELETE_SUBSCRIPTION = `${SUBSCRIPTION_PREFIX}/DELETE_SUBSCRIPTION`;
export const DELETE_SUBSCRIPTION_SUCCESS = `${SUBSCRIPTION_PREFIX}/DELETE_SUBSCRIPTION_SUCCESS`;
export const DELETE_SUBSCRIPTION_FAILURE = `${SUBSCRIPTION_PREFIX}/DELETE_SUBSCRIPTION_FAILURE`;
export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB'

const fetchSubscriptions = () => ({
  type: FETCH_SUBSCRIPTIONS,
});

export const fetchOrgSubscriptions = () => ({
  type: FETCH_ORG_SUBSCRIPTIONS,
});

export const fetchOrgSubscription = (id) => ({
  type: FETCH_ORG_SUBSCRIPTION,
  data: {id}
});

export const createOrgSubscription = (payload, history) => ({
  type: CREATE_ORG_SUBSCRIPTION,
  data: {
    payload,
    history
  }
});

export const editOrgSubscription = (id, payload, history) => ({
  type: EDIT_ORG_SUBSCRIPTION,
  data: {
    id, 
    payload,
    history
  }
});

export const deleteOrgSubscription = (id) => ({
  type: DELETE_ORG_SUBSCRIPTION,
  data: {
    id, 
  }
});

const fetchSubscription = (id) => ({
  type: FETCH_SUBSCRIPTION,
  data: {
    id,
  },
});

const deleteSubscription = (id) => ({
  type: DELETE_SUBSCRIPTION,
  data: {
    id,
  },
});

const updateBreadcrumb = (payload) => ({ 
	type: UPDATE_BREADCRUMB,
	data: { payload } 
})

export { fetchSubscriptions, fetchSubscription, deleteSubscription, updateBreadcrumb };
