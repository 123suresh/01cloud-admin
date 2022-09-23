import {
    Button,
    Card,
    CardActions, CardContent,
    CardHeader,
    Divider, Grid, Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import BackdropLoader from '../../components/loader/BackdropLoader';
import MuiTextField from "../../components/textfield/MuiTextField";
import { updateClusterRepo } from './redux/actions';
import { useTranslation } from 'react-i18next';

// const transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

const ClusterImportEndpoints = (props) => {
    const [t] = useTranslation()
    //const [name, setName] = useState("");

    // const handleClose = () => {

    //     props.handleDisagree();
    // };
    // const [image_repo_username, setImage_repo_username] = useState("");
    // const [image_repo_service, setImage_repo_service] = useState("");
    // const [image_repo_password, setImage_repo_password] = useState("");
    // const [image_repo_project, setImage_repo_project] = useState("");
    const [formData, setFormData] = useState({
        image_repo_username: "",
        image_repo_service: "",
        image_repo_password: "",
        image_repo_project: ""
    })

    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        let jsonBody = new FormData(); 
        jsonBody.append("image_repo_username", formData.image_repo_username);
        jsonBody.append("image_repo_service", formData.image_repo_service);
        jsonBody.append("image_repo_password", formData.image_repo_password);
        jsonBody.append("image_repo_project", formData.image_repo_project);
        props.updateClusterRepo(props.clusterId, jsonBody, props.mainClusterId);
    };

    const updateFormData = (e) => { 
        // let _formData = formData;
        // _formData[e.target.name] = e.target.value;
        // setFormData(_formData);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        const isEmptyCheck = e.currentTarget.getAttribute('emptyCheck');
        if (isEmptyCheck === "1") {
            setErrors({
                ...errors,
                [e.target.name]: e.target.value === "" ? "Value cannot be empty" : ""
            })
        }
    }
    const isFormValid = () => {
        let valid = false;
        let e = false
        Object.keys(errors).forEach(k => {
            if (errors[k]) {
                e = true
                return
            }
        })
        if(formData.image_repo_service.trim() !== "" //&& !isClusterNameError
            && formData.image_repo_project.trim() !== ""
            && !e)
        {
            valid = true;
        }
        return !valid; 
    }

    return (
        <>
            <Card className="m-t-20">
                <CardHeader title={t('Cluster.ClusterImportEndpoints.updateRepoDetails')} />
                <CardContent>
                    <Grid>
                        <Grid container spacing={2} >
                            <Grid item md="6">
                                <Typography variant='h5'> {t('Cluster.ClusterImportEndpoints.imageRepoService')} </Typography>
                                <MuiTextField
                                    name="image_repo_service"
                                    value={formData.image_repo_service}
                                    onChange={(e) => updateFormData(e)}
                                    type="text"
                                    margin="normal"
                                    inputProps={{
                                        emptyCheck: "1"
                                    }}
                                    error={errors.image_repo_service}
                                    helperText={errors.image_repo_service && errors.image_repo_service}
                                />
                            </Grid>
                            <Grid item md="6">
                                <Typography variant='h5' > {t('Cluster.ClusterImportEndpoints.imageRepoProject')}</Typography>
                                <MuiTextField
                                    name="image_repo_project"
                                    value={formData.image_repo_project}
                                    onChange={(e) => updateFormData(e)}
                                    type="text"
                                    margin="normal"
                                    inputProps={{
                                        emptyCheck: "1"
                                    }}
                                    error={errors.image_repo_project}
                                    helperText={errors.image_repo_project && errors.image_repo_project}
                                />
                            </Grid>

                            <Grid item md="6">
                                <Typography variant='h5' > {t('Cluster.ClusterImportEndpoints.imageRepoUsername')} </Typography>
                                <MuiTextField
                                    name="image_repo_username"
                                    value={formData.image_repo_username}
                                    onChange={(e) => updateFormData(e)}
                                    type="text"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant='h5' >{t('Cluster.ClusterImportEndpoints.imageRepoPassword')}</Typography>
                                <MuiTextField
                                    name="image_repo_password"
                                    value={formData.image_repo_password}
                                    onChange={(e) => updateFormData(e)}
                                    type="text"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        disabled={isFormValid()}
                    >
                       {t('Cluster.ClusterImportEndpoints.update')}
                    </Button>
                </CardActions>
            </Card>
            
            {/* <Dialog
          open={props.open ?? false}
          TransitionComponent={transition}
          onClose={handleClose}
          keepMounted
        > 
            <DialogTitle>
                <Typography className="dialogtitle"></Typography>

                <IconButton
                  aria-label="close"
                  size="small"
                  className="right"
                  onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers> */}
            {/* </DialogContent> 
            <DialogActions>
                <Button
                  onClick={handleAgree}
                  color="primary"
                  variant="contained"

                >
                </Button>
            </DialogActions>
        </Dialog> */}
        { props.updatingRepoDetails && <BackdropLoader message={t('Cluster.ClusterImportEndpoints.updatingRepoDetails')} /> }
        </>
    );
};

const mapStateToProps = state => ({
    updatingRepoDetails: state.ClusterReducer.updatingRepoDetails
})

const mapDispatchtoProps = dispatch => {
    return {
        updateClusterRepo: (id, jsonBody, mainClusterId) => dispatch(updateClusterRepo(id, jsonBody, mainClusterId)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(ClusterImportEndpoints)
