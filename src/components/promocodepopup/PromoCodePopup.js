import React from 'react';
import {DialogActions,Typography,Divider,Grid,FormControlLabel,Switch,Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MuiTextField from "../textfield/MuiTextField";
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import { useFormik } from "formik"
import { getDateInStandardFormat, formatDate } from '../../helpers/utils';

export function PromoCodePopup(props){
    const [t] = useTranslation()

    const validate = (values) => {
        let errors = {}
        if (!values.title?.trim()?.length) {
            errors.title = t('Billing.PromoCodePopup.invalidTitle');
        }
        if (!values.promoCode?.trim()?.length) {
            errors.promoCode = t('Billing.PromoCodePopup.invalidPromoCode');
        }
        if (values.limit <= 0 || values.limit === "") {
            errors.limit = t('Billing.PromoCodePopup.limitError');
        }
        if (values.discount <= 0 || values.discount === "") {
            errors.discount = t('Billing.PromoCodePopup.discountError');
        }
        if (values.expiryDate.length === 0 || values.expiryDate === "NaN-NaN-NaN") {
            errors.expiryDate = t('Billing.DeductionPopUp.invalidDate');
        }else if(new Date(values.expiryDate) < new Date()){
            errors.expiryDate = t('Billing.PromoCodePopup.expiryDateError');
        }
        return errors
    }

    const addPromoCodeHandler = (values) => {
        let jsonBody = {
            title: values.title,
            code: values.promoCode,
            expiry_date: values.expiryDate,
            is_percent: values.percentageChange,
            limit: parseInt(values.limit),
            discount: parseInt(values.discount),
            active: values.activeStatus,
            count: 10
        }
        props.addPromoCode(jsonBody)
        props.handleCancelPopUp()
        props.resetFilters()
    }

    const updatePromoCodeHandler = (values) => {
        let id = props?.promoCode?.ID
        let jsonBody = {
            title: values.title,
            code: values.promoCode,
            expiry_date: values.expiryDate,
            is_percent: values.percentageChange,
            limit: parseInt(values.limit),
            discount: parseInt(values.discount),
            active: values.activeStatus,
            count: 10
        }
        props.updatePromoCode(id,jsonBody)
        props.handleCancelPopUp()
        props.resetFilters()
    }

    const handleFormSubmit = (values) => {
        if (props?.promoCode) {
            updatePromoCodeHandler(values)
        } else {
            addPromoCodeHandler(values)
        }
    }

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldTouched,
        touched,
        values,
        errors,
        dirty,
        isValid,
    } = useFormik({
        initialValues: {
            promoCode: props?.promoCode?.code ?? '',
            title: props?.promoCode?.title ?? '',
            activeStatus: props?.promoCode?.active ?? true,
            limit: props.promoCode?.limit ?? 0,
            discount: props.promoCode?.discount ?? 0,
            percentageChange: props.promoCode?.is_percent ?? true,
            expiryDate: formatDate(getDateInStandardFormat(props?.promoCode?.expiry_date)) ?? new Date()
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
              {props?.promoCode
                ? t('Billing.PromoCodePopup.editPromoCode')
                : t('Billing.PromoCodePopup.addPromoCode')}
            </Typography>
            <IconButton
              aria-label="close"
              data-test="close-icon"
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
                        data-test="title-field"
                        id="title"
                        label={t('Billing.PromoCodeList.title')}
                        name="title"
                        autoFocus
                        style={{ width: "100%" }}
                        color="primary"
                        margin="normal"
                        variant="outlined"
                        value={ values.title }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.title && errors.title}
                        helperText={
                            touched.title &&
                            errors.title && errors.title
                        }
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                        <MuiTextField
                        data-test="promocode-field"
                        id="promoCode"
                        label={t('Billing.PromoCodeList.code')}
                        name="promoCode"
                        style={{ width: "100%" }}
                        color="primary"
                        margin="normal"
                        variant="outlined"
                        disabled={props?.promoCode?.code}
                        value={ values.promoCode }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.promoCode && errors.promoCode}
                        helperText={
                            touched.promoCode &&
                            errors.promoCode && errors.promoCode
                        }
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={6}>
                        <MuiTextField
                        data-test="discount-field"
                        id="discount"
                        label={t('Billing.PromoCodeList.discount')}
                        name="discount"
                        type="number"
                        style={{ width: "100%" }}
                        color="primary"
                        margin="normal"
                        variant="outlined"
                        disabled={props?.promoCode?.discount}
                        value={ values.discount }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.discount && errors.discount}
                        helperText={
                            touched.discount &&
                            errors.discount && errors.discount
                        }
                        />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <FormControlLabel
                            style={{paddingTop: 25}}
                            data-test="percentage-field"
                            control={
                            <Checkbox
                                disabled={props?.promoCode?.discount}
                                data-test="checkbox"
                                checked={values.percentageChange}
                                onChange={handleChange}
                                name="percentageChange"
                                color="primary"
                            />
                            }
                            label={t('Billing.PromoCodePopup.percent')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={6} style={{paddingTop: 24}}>
                        <MuiTextField
                            data-test="expiryDate-field"
                            value={ values.expiryDate }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onInput={() => setFieldTouched('expiryDate', true, true)}
                            error={touched.expiryDate && errors.expiryDate}
                            helperText={
                                touched.expiryDate &&
                                errors.expiryDate && errors.expiryDate
                            }
                            id="date"
                            name="expiryDate"
                            label={t('Billing.PromoCodeList.expiryDate')}
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <MuiTextField
                        data-test="limit-field"
                        id="limit"
                        label={t('Billing.PromoCodeList.limit')}
                        name="limit"
                        type="number"
                        style={{ width: "100%" }}
                        color="primary"
                        margin="normal"
                        variant="outlined"
                        value={ values.limit }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.limit && errors.limit}
                        helperText={
                            touched.limit &&
                            errors.limit && errors.limit
                        }
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                        <FormControlLabel
                            data-test="active-field"
                            control={
                              <Switch
                                data-test="active"
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
                    {props?.promoCode ? t('Billing.PromoCodePopup.update') : t('Billing.PromoCodePopup.add')}
                </Button>
          </DialogActions>
        </Dialog>
    );
}

export default PromoCodePopup