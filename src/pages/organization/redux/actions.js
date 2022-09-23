const ORGANIZATION_PREFIX = "@ORGANIZATION"

export const GET_ORGANIZATION_LIST = `${ ORGANIZATION_PREFIX }/GET_ORGANIZATION_LIST`
export const GET_ORGANIZATION_LIST_SUCCESS = `${ ORGANIZATION_PREFIX }/GET_ORGANIZATION_LIST_SUCCESS`
export const GET_ORGANIZATION_LIST_FAILURE = `${ ORGANIZATION_PREFIX }/GET_ORGANIZATION_LIST_FAILURE`

export const GET_ORGANIZATION_BY_ID = `${ ORGANIZATION_PREFIX }/GET_ORGANIZATION_BY_ID`
export const GET_ORGANIZATION_BY_ID_SUCCESS = `${ ORGANIZATION_PREFIX }/GET_ORGANIZATION_BY_ID_SUCCESS`
export const GET_ORGANIZATION_BY_ID_FAILURE = `${ ORGANIZATION_PREFIX }/GET_ORGANIZATION_BY_ID_FAILURE`

export const GET_PROJECT_OF_ORGANIZATION = `${ ORGANIZATION_PREFIX }/GET_PROJECT_OF_ORGANIZATION`
export const GET_PROJECT_OF_ORGANIZATION_SUCCESS = `${ ORGANIZATION_PREFIX }/GET_PROJECT_OF_ORGANIZATION_SUCCESS`
export const GET_PROJECT_OF_ORGANIZATION_FAILURE = `${ ORGANIZATION_PREFIX }/GET_PROJECT_OF_ORGANIZATION_FAILURE`

export const GET_CLUSTER_OF_ORGANIZATION = `${ ORGANIZATION_PREFIX }/GET_CLUSTER_OF_ORGANIZATION`
export const GET_CLUSTER_OF_ORGANIZATION_SUCCESS = `${ ORGANIZATION_PREFIX }/GET_CLUSTER_OF_ORGANIZATION_SUCCESS`
export const GET_CLUSTER_OF_ORGANIZATION_FAILURE = `${ ORGANIZATION_PREFIX }/GET_CLUSTER_OF_ORGANIZATION_FAILURE`

export const CLEAR_ORGANIZATION_DATA = `${ ORGANIZATION_PREFIX }/CLEAR_ORGANIZATION_DATA`

export const getOrganizationList = (page, size, search) => ({
    type: GET_ORGANIZATION_LIST,
	data: { page, size, search}
})

export const getOrganizationById = (id) => ({
    type: GET_ORGANIZATION_BY_ID,
	id: id
})

export const getProjectOfOrganization = (oid) => ({
    type: GET_PROJECT_OF_ORGANIZATION,
	oid: oid
})

export const getClusterOfOrganization = (oid) => ({
    type: GET_CLUSTER_OF_ORGANIZATION,
	oid: oid
})