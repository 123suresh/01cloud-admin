const USER_PREFIX = "@USER";

export const FETCH_USERS = `${USER_PREFIX}/FETCH_USERS`;
export const FETCH_USERS_SUCCESS = `${USER_PREFIX}/FETCH_USERS_SUCCESS`;
export const FETCH_USERS_FAILURE = `${USER_PREFIX}/FETCH_USERS_FAILURE`;
export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB'

const fetchUsers = (page, size, search, sortColumn, sortDirection) => ({
  type: FETCH_USERS,
  data: {
	page, size, search, sortColumn, sortDirection
  }
});

// const fetchSubscription = () => ({
//     type: FETCH_SUBSCRIPTIONS,
// })

// const fetchSubscription = () => ({
//     type: FETCH_SUBSCRIPTIONS,
// })
const updateBreadcrumb = (payload) => ({ 
	type: UPDATE_BREADCRUMB,
	data: { payload } 
})

export { fetchUsers, updateBreadcrumb };
