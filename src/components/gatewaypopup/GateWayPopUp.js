import React from 'react';
import { DialogActions, Typography, Divider, Grid, FormControlLabel, Switch, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MuiTextField from "../textfield/MuiTextField";
import { useTranslation } from 'react-i18next';
import { Autocomplete } from "@material-ui/lab";
import { useFormik } from "formik"
import { validateInputField } from '../../helpers/utils';

var countryData = require("../../constants/country-states.json");

const countriesList = countryData.map((country) => {
    return {
        name: country.name,
        code: country.countryCode,
    };
});

const getCountry = countryName => {
    return countriesList.find(country => country.name === countryName) ?? {};
}

export function GateWayPopUp(props) {
    const [t] = useTranslation()
    const [country, setCountry] = React.useState(props?.gateway?.country ? getCountry(props?.gateway?.country) : '');
    const [countryError, setCountryError] = React.useState(false);
    const [countryErrorMessage, setCountryErrorMessage] = React.useState('');

    const validate = (values) => {
        let errors = {}
        if (!values.name?.trim()?.length) {
            errors.name = t('Billing.GateWayPopUp.nameError');
        }

        if (!values.code?.trim()?.length) {
            errors.code = t('Billing.GateWayPopUp.codeError');
        }

        if (!values.description?.trim()?.length) {
            errors.description = t('Billing.GateWayPopUp.descriptionError');
        }

        if (!values.initUrl?.trim()?.length) {
            errors.initUrl = t('Billing.GateWayPopUp.failureUrlError');
        } else {
            let urlValid = validateInputField(values.initUrl, "url")
            if (urlValid.message) {
                errors.initUrl = urlValid.message
            }
        }

        if (!values.failureUrl?.trim()?.length) {
            errors.failureUrl = t('Billing.GateWayPopUp.failureUrlError');
        } else {
            let urlValid = validateInputField(values.failureUrl, "url")
            if (urlValid.message) {
                errors.failureUrl = urlValid.message
            }
        }

        if (!values.paymentUrl?.trim()?.length) {
            errors.paymentUrl = t('Billing.GateWayPopUp.failureUrlError');
        } else {
            let urlValid = validateInputField(values.paymentUrl, "url")
            if (urlValid.message) {
                errors.paymentUrl = urlValid.message
            }
        }

        if (!values.successUrl?.trim()?.length) {
            errors.successUrl = t('Billing.GateWayPopUp.failureUrlError');
        } else {
            let urlValid = validateInputField(values.successUrl, "url")
            if (urlValid.message) {
                errors.successUrl = urlValid.message
            }
        }

        if (!values.key?.trim()?.length) {
            errors.key = t('Billing.GateWayPopUp.keyError');
        } else {
            try {
                JSON.parse(values.key);
            } catch (e) {
                errors.key = t('Billing.GateWayPopUp.keyError');
            }

        }

        return errors
    }

    const addGateWayHandler = (values) => {
        let jsonBody = {
            name: values.name,
            code: values.code,
            country: country?.name ?? "",
            description: values.description,
            active: values.activeStatus,
            icon: values.icon,
            success_url: values.successUrl,
            payment_url: values.paymentUrl,
            init_url: values.initUrl,
            failure_url: values.failureUrl,
            key: values.key ? JSON.parse(values.key) : {}
        }
        props.addGateWay(jsonBody)
        props.handleCancelPopUp()
    }

    const updateGateWayHanlder = (values) => {
        let id = props?.gateway?.ID
        let jsonBody = {
            name: values.name,
            code: values.code,
            country: country?.name ?? "",
            description: values.description,
            active: values.activeStatus,
            icon: values.icon,
            success_url: values.successUrl,
            payment_url: values.paymentUrl,
            init_url: values.initUrl,
            failure_url: values.failureUrl,
            key: values.key ? JSON.parse(values.key) : {}
        }
        props.updateGateWay(id, jsonBody)
        props.handleCancelPopUp()
    }

    const handleFormSubmit = (values) => {
        if (props?.gateway) {
            updateGateWayHanlder(values)
        } else {
            addGateWayHandler(values)
        }
    }

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
        dirty,
        isValid,
    } = useFormik({
        initialValues: {
            name: props.gateway?.name ?? "",
            code: props.gateway?.code ?? "",
            // country: props.gateway?.country ?? "",
            description: props.gateway?.description ?? "",
            icon: props.gateway?.icon ?? "",
            initUrl: props.gateway?.init_url ?? "",
            paymentUrl: props.gateway?.payment_url ?? "",
            successUrl: props.gateway?.success_url ?? "",
            failureUrl: props.gateway?.failure_url ?? "",
            key: props?.gateway?.key ? JSON.stringify(props?.gateway?.key) : "",
            activeStatus: props?.gateway?.active ?? false,
        },
        enableReinitialize: true,
        onSubmit: (formValues) => handleFormSubmit(formValues),
        validate: validate,
    })

    React.useEffect(() => {
        return () => {
            props.clearData()
        }
    }, [])

    // const handleStatusChange = () => {
    //     setActiveStatus(!activeStatus ? true : false)
    // }

    // const handleNameChange = (e) => {
    //     if (e.target.value?.trim()?.length === 0) {
    //         setNameError(true);
    //         setNameErrorMessage(t('Billing.GateWayPopUp.nameError'));
    //     } else {
    //         setNameError(false);
    //         setNameErrorMessage("");
    //     }
    //     setName(e.target.value)
    // }

    // const handleNameOnBlur = () => {
    //     if (name.length === 0) {
    //         setNameError(true);
    //         setNameErrorMessage(t('Billing.GateWayPopUp.nameBlurError'));
    //     }
    // };

    // const handleCodeChange = (e) => {
    //     if (e.target.value?.trim()?.length === 0) {
    //         setCodeError(true);
    //         setCodeErrorMessage(t('Billing.GateWayPopUp.codeError'));
    //     } else {
    //         setCodeError(false);
    //         setCodeErrorMessage("");
    //     }
    //     setCode(e.target.value)
    // }

    // const handleCodeOnBlur = () => {
    //     if (code.length === 0) {
    //         setCodeError(true);
    //         setCodeErrorMessage(t('Billing.GateWayPopUp.codeBlurError'));
    //     }
    // };

    const handleCountryChange = (_, newValue) => {
        if (!newValue) {
            setCountryError(true);
            setCountryErrorMessage(t('Billing.GateWayPopUp.countryError'));
        } else {
            setCountryError(false);
            setCountryErrorMessage('');
        }

        setCountry(newValue)
    }

    // const handleDescriptionChange = (e) => {
    //     if (e.target.value?.trim()?.length === 0) {
    //         setDescriptionError(true);
    //         setDescriptionErrorMessage(t('Billing.GateWayPopUp.descriptionError'));
    //     } else {
    //         setDescriptionError(false);
    //         setDescriptionErrorMessage("");
    //     }
    //     setDescription(e.target.value)
    // }

    // const handleDescriptionOnBlur = () => {
    //     if (description.length === 0) {
    //         setDescriptionError(true);
    //         setDescriptionErrorMessage(t('Billing.GateWayPopUp.descriptionBlurError'));
    //     }
    // };

    // const handleIconChange = (e) => {
    //     setIcon(e.target.value)
    // }

    // const handleInitUrlChange = (e) => {
    //     if (e.target.value?.trim()?.length === 0) {
    //         setInitUrlError(true);
    //         setInitUrlErrorMessage(t('Billing.GateWayPopUp.failureUrlError'));
    //     } else {
    //         setInitUrlError(false);
    //         setInitUrlErrorMessage("");
    //     }
    //     setInitUrl(e.target.value)
    // }

    // const handleInitUrlOnBlur = () => {
    //     if (initUrl.length === 0) {
    //         setInitUrlError(true);
    //         setInitUrlErrorMessage(t('Billing.GateWayPopUp.initUrlBlurError'));
    //     }
    // }

    // const handlePaymentUrlChange = (e) => {
    //     if (e.target.value?.trim()?.length === 0) {
    //         setPaymentUrlError(true);
    //         setPaymentUrlErrorMessage(t('Billing.GateWayPopUp.failureUrlError'));
    //     } else {
    //         setPaymentUrlError(false);
    //         setPaymentUrlErrorMessage("");
    //     }
    //     setPaymentUrl(e.target.value)
    // }

    // const handlePaymentUrlOnBlur = () => {
    //     if (initUrl.length === 0) {
    //         setPaymentUrlError(true);
    //         setPaymentUrlErrorMessage(t('Billing.GateWayPopUp.paymentUrlBlurError'));
    //     }
    // }

    // const handleSuccessUrlChange = (e) => {
    //     if (e.target.value?.trim()?.length === 0) {
    //         setSuccessUrlError(true);
    //         setSuccessUrlErrorMessage(t('Billing.GateWayPopUp.failureUrlError'));
    //     } else {
    //         setSuccessUrlError(false);
    //         setSuccessUrlErrorMessage("");
    //     }
    //     setSuccessUrl(e.target.value)
    // }

    // const handleSuccessUrlOnBlur = () => {
    //     if (successUrl.length === 0) {
    //         setSuccessUrlError(true);
    //         setSuccessUrlErrorMessage(t('Billing.GateWayPopUp.successUrlBlurError'));
    //     }
    // }

    // const handleFailureUrlChange = (e) => {
    //     if (e.target.value?.trim()?.length === 0) {
    //         setFailureUrlError(true);
    //         setFailureUrlErrorMessage(t('Billing.GateWayPopUp.failureUrlError'));
    //     } else {
    //         setFailureUrlError(false);
    //         setFailureUrlErrorMessage("");
    //     }
    //     setFailureUrl(e.target.value)
    // }

    // const handleFailureUrlOnBlur = () => {
    //     if (failureUrl.length === 0) {
    //         setFailureUrlError(true);
    //         setFailureUrlErrorMessage(t('Billing.GateWayPopUp.failureUrlBlurError'));
    //     }
    // }

    // const handleKeyChange = (e) => {
    //     if (e.target.value?.trim()?.length === 0) {
    //         setKeyError(true);
    //         setKeyErrorMessage(t('Billing.GateWayPopUp.keyError'));
    //     } else {
    //         setKeyError(false);
    //         setKeyErrorMessage("");
    //     }
    //     setKey(e.target.value)
    // }

    // const handleKeyOnBlur = () => {
    //     if (key.length === 0) {
    //         setKeyError(true);
    //         setKeyErrorMessage(t('Billing.GateWayPopUp.keyBlurError'));
    //     }
    // }

    return (
        <Dialog
            open={props.openAddPopup}
            keepMounted
            onClose={props.handleCancelPopUp}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            disableBackdropClick={true}
            data-test="add-reg-popup"
        >
            <DialogTitle id="alert-dialog-slide-title">
                <Typography className="dialogtitle" data-test="dialog-title">
                    {props?.gateway
                        ? t('Billing.GateWayPopUp.edit')
                        : t('Billing.GateWayPopUp.add')}
                </Typography>
                <IconButton
                    data-test="close-icon"
                    aria-label="close"
                    size="small"
                    className="right"
                    onClick={props.handleCancelPopUp}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent dividers>
                <Grid data-test="form-grid">
                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>
                            <MuiTextField
                                data-test="name-field"
                                id="name"
                                label={t('Billing.GateWaysList.name')}
                                name="name"
                                autoFocus
                                style={{ width: "100%" }}
                                color="primary"
                                margin="normal"
                                variant="outlined"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.name && errors.name}
                                helperText={
                                    touched.name &&
                                    errors.name && errors.name
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item md={6} xs={6}>
                            <MuiTextField
                                data-test="icon-field"
                                id="icon"
                                label={t('Billing.GateWayPopUp.icon')}
                                name="icon"
                                style={{ width: "100%" }}
                                color="primary"
                                margin="normal"
                                variant="outlined"
                                value={values.icon}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <MuiTextField
                                data-test="code-field"
                                id="code"
                                label={t('Billing.PromoCodeList.code')}
                                name="code"
                                style={{ width: "100%" }}
                                color="primary"
                                margin="normal"
                                variant="outlined"
                                value={values.code}
                                error={touched.code && errors.code}
                                helperText={
                                    touched.code &&
                                    errors.code && errors.code
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item md={6} xs={6}>
                            <MuiTextField
                                data-test="description-field"
                                id="description"
                                label={t('Billing.GateWaysList.description')}
                                name="description"
                                style={{ width: "100%" }}
                                color="primary"
                                margin="normal"
                                variant="outlined"
                                value={values.description}
                                error={touched.description && errors.description}
                                helperText={
                                    touched.description &&
                                    errors.description && errors.description}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <Autocomplete
                                data-test="country-field"
                                name="country"
                                fullWidth
                                options={countriesList}
                                value={country}
                                onChange={handleCountryChange}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(option) => (
                                    <>
                                        {option.name} <Typography style={{ fontSize: 12, marginLeft: 5 }} variant="subtitle1"> ({option.code}) </Typography>
                                    </>
                                )}
                                renderInput={(params) => (
                                    <MuiTextField
                                        {...params}
                                        label={t('Billing.GateWaysList.country')}
                                        variant="outlined"
                                        error={countryError}
                                        helperText={countryErrorMessage}
                                    />
                                )}
                                style={{
                                    marginTop: 16,
                                    marginBottom: 8,
                                }}
                            />

                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={6}>
                            <MuiTextField
                                data-test="initUrl-field"
                                id="initUrl"
                                label={t('Billing.GateWayPopUp.initUrl')}
                                name="initUrl"
                                style={{ width: "100%" }}
                                color="primary"
                                margin="normal"
                                variant="outlined"
                                value={values.initUrl}
                                error={touched.initUrl && errors.initUrl}
                                helperText={
                                    touched.initUrl &&
                                    errors.initUrl && errors.initUrl
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <MuiTextField
                                data-test="paymentUrl-field"
                                id="paymentUrl"
                                label={t('Billing.GateWayPopUp.paymentUrl')}
                                name="paymentUrl"
                                style={{ width: "100%" }}
                                color="primary"
                                margin="normal"
                                variant="outlined"
                                value={values.paymentUrl}
                                error={touched.paymentUrl && errors.paymentUrl}
                                helperText={
                                    touched.paymentUrl &&
                                    errors.paymentUrl && errors.paymentUrl
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={6}>
                            <MuiTextField
                                data-test="successUrl-field"
                                id="successUrl"
                                label={t('Billing.GateWayPopUp.successUrl')}
                                name="successUrl"
                                style={{ width: "100%" }}
                                color="primary"
                                margin="normal"
                                variant="outlined"
                                value={values.successUrl}
                                error={touched.successUrl && errors.successUrl}
                                helperText={
                                    touched.successUrl &&
                                    errors.successUrl && errors.successUrl
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <MuiTextField
                                data-test="failureUrl-field"
                                id="failureUrl"
                                label={t('Billing.GateWayPopUp.failureUrl')}
                                name="failureUrl"
                                style={{ width: "100%" }}
                                color="primary"
                                margin="normal"
                                variant="outlined"
                                value={values.failureUrl}
                                error={touched.failureUrl && errors.failureUrl}
                                helperText={
                                    touched.failureUrl &&
                                    errors.failureUrl && errors.failureUrl
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>
                            <MuiTextField
                                data-test="key-field"
                                id="key"
                                label={t('Billing.GateWayPopUp.key')}
                                name="key"
                                multiline
                                rows={2}
                                style={{ width: "100%" }}
                                color="primary"
                                margin="normal"
                                variant="outlined"
                                value={values.key}
                                error={touched.key && errors.key}
                                helperText={
                                    touched.key &&
                                    errors.key && errors.key
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>
                            <FormControlLabel
                                data-test="percentage-field"
                                control={
                                    <Switch
                                        data-test="activeStatus"
                                        checked={values.activeStatus}
                                        onChange={handleChange}
                                        name="activeStatus"
                                        color="primary"
                                    />
                                }
                                label={values.activeStatus ? t('Billing.PromoCodeList.active') : t('Billing.PromoCodeList.inactive')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    data-test="submit-button"
                    disabled={!(dirty && isValid)}
                    className="oneRemLeftMarginSeperator"
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {props?.gateway ? t('Billing.PromoCodePopup.update') : t('Billing.PromoCodePopup.add')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default GateWayPopUp