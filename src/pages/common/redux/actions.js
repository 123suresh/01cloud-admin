const COMMON_PREFIX = '@COMMON';

export const UPLOAD_FILE = `${ COMMON_PREFIX }/UPLOAD_FILE`
export const UPLOAD_FILE_SUCCESS = `${ COMMON_PREFIX }/UPLOAD_FILE_SUCCESS`
export const UPLOAD_FILE_FAILURE = `${ COMMON_PREFIX }/UPLOAD_FILE_FAILURE`
export const UPLOAD_MULTIPLE_FILES = `${ COMMON_PREFIX }/UPLOAD_MULTIPLE_FILES`

export const UPDATE_NAV = `${ COMMON_PREFIX }/UPDATE_NAV`

const uploadFile = (formData, callBack) => ({
	type: UPLOAD_FILE,
	data: { formData, callBack }
})

const uploadMultipleFiles = (files, callBack) => ({
	type: UPLOAD_MULTIPLE_FILES,
	data: { files, callBack }
})

const updateNav = (navText, toLink) => ({
  type: UPDATE_NAV,
  data: { navText, toLink },
});

export {
	uploadFile,
	uploadMultipleFiles,
	updateNav,
}