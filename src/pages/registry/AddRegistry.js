import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BackdropLoader from "../../components/loader/BackdropLoader";
import PluginConfigForm from "../../components/pluginconfigform/PluginConfigForm";
//import { RegistryConfig } from '../../../../constants/registryconfig';
import {
  addRegistry,
  updateRegistry,
  getRegistryConfig,
} from "./redux/actions";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  selectBox: {
    //minWidth : '100%',
    marginBottom: "1rem",
    fullWidth: true,
    display: "flex",
  },
  selectRegion: {
    textAlign: "left",
  },
}));

export function AddRegistry(props) {
  const classes = useStyles();
  const [provider, setProvider] = useState("Select");
  const [providerConfig, setProviderConfig] = useState(null);
  const [variables, setVariables] = useState({});
  const [isErrors, setIsErrors] = useState([]);
  const [t] = useTranslation();
  //const [hasError, setHasError] = useState(false);
  //const [name, setName] = useState('');
  let RegistryConfig = props.registryConfig;
  // console.log('config file',props.registryConfig)
  useEffect(() => {
    props.getRegistryConfig();
  }, []);

  useEffect(() => {
    if (props.registryDetails && props.registryDetails.id > 0) {
      setVariables(props.registryDetails);
      setProvider(props.registryDetails.provider);
    }
  }, [props.registryDetails]);

  useEffect(() => {
    if (provider !== "Select" && RegistryConfig) {
      const _providerConfig = RegistryConfig?.find((x) => x.name === provider);
      setProviderConfig(null);
      setTimeout(() => {
        setProviderConfig(_providerConfig);
      }, 0);
    }
  }, [provider, RegistryConfig]);

  const handleProviderChange = (e) => {
    if (e.target.value !== "Select") {
      setProvider(e.target.value);
    } else {
      setProvider(e.target.value);
      setProviderConfig(null);
    }
  };

  const handleValueChange = (_variables, errorsList) => {
    setVariables(_variables);
    setIsErrors(errorsList);
    // isErrors: errorsList,
    // const finalError = this.state.isErrors.length > 0;
    // setHasError
  };

  const successCallback = (data) => {
    props.successCallback(data);
  };

  const submitAction = () => {
    const jsonBody = { ...variables, provider: provider };
    if (props.registryDetails) {
      props.updateRegistry(props.registryDetails.id, jsonBody, successCallback);
    } else {
      props.addRegistry(jsonBody, successCallback);
    }
  };

  // const handleChangeName = (e) => {
  //     setName(e.target.value);
  //     if(e.target.value && !new RegExp(item.validation).test(e.target.value)) {
  //         setHasError(true);
  //         props.handleValueChange(item, e.target.value, true);
  //     }
  //     else
  //     {
  //         setHasError(false);
  //         props.handleValueChange(item, e.target.value, false);
  //     }
  // }

  return (
    <div data-test="main-container">
      <>
        {/* <div className="listContainer">
                    <Typography color="textPrimary" variant="h5">
                        { props.registryDetails ? 'Edit Registry' : 'Add Registry' }
                    </Typography>
                </div> */}
        <FormControl
          className={classes.selectBox}
          error={""}
          variant="outlined"
        >
          <InputLabel id="label-provider">{t("SelectProvider")}</InputLabel>
          <Select
            //error={this.state.isRepoTypeDropDownFeildError}
            //helperText={this.state.repoTypeDropDownErrorMessage}
            className={classes.selectRegion}
            color="primary"
            labelId="label-provider"
            //id="simple-select"
            value={provider}
            data-test="select-provider"
            //name='repositoryType'
            disabled={props.registryDetails}
            label="Select Provider"
            onChange={(e) => handleProviderChange(e)}
            MenuProps={{
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
            }}
          >
            <MenuItem value="Select">{t("SelectProvider")}</MenuItem>
            {RegistryConfig &&
              RegistryConfig.length > 0 &&
              RegistryConfig.map((_provider, index) => (
                <MenuItem value={_provider.name} key={index}>
                  {_provider.name}
                </MenuItem>
              ))}
          </Select>
          {/* <FormHelperText error={this.state.isRepoTypeDropDownFeildError}>{ this.state.repoTypeDropDownErrorMessage }</FormHelperText> */}
        </FormControl>
        {providerConfig && (
          <div>
            <PluginConfigForm
              data-test="config-form"
              pluginVersionConfig={providerConfig.config}
              handleValueChange={handleValueChange}
              initialValues={variables}
              isErrors={isErrors}
              gridItemOccupency={12}
              ignoreAlternateColour={true}
              validateEmpty={true}
            />
          </div>
        )}
        <div className="right">
          <Button
            data-test="submit-button"
            onClick={submitAction}
            color="primary"
            variant="contained"
            disabled={provider === "Select" || isErrors.length > 0}
            className="m-t-20"
          >
            {props.registryDetails ? t("Update") : t("Add")}
          </Button>
        </div>
      </>
      {props.addingRegistry && <BackdropLoader message={t("Adding")} data-test="adding-loader" />}
      {props.updatingRegistry && <BackdropLoader message={t("Updating")} data-test="updating-loader" />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  addingRegistry: state.RegistryReducer.addingRegistry,
  updatingRegistry: state.RegistryReducer.updatingRegistry,
  registryConfig: state.RegistryReducer.registryConfig,
});

const mapDispatchToProps = (dispatch) => ({
  addRegistry: (jsonBody, callback) =>
    dispatch(addRegistry(jsonBody, callback)),
  updateRegistry: (id, jsonBody, callback) =>
    dispatch(updateRegistry(id, jsonBody, callback)),
  getRegistryConfig: () => dispatch(getRegistryConfig()),
  // preserveBackup: (eId, bId, jsonBody) => dispatch(preserveBackup(eId, bId, jsonBody)),
  // restoreBackup: (eId, bId) => dispatch(restoreBackup(eId, bId)),
  // deleteBackup: (eId, bId) => dispatch(deleteBackup(eId, bId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRegistry);
