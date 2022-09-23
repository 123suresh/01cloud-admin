import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import styled from "styled-components";
import { uploadMultipleFiles } from "../../pages/common/redux/actions";
import UploadIcon from "../../upload.svg";
import ImagePopupModal from "../imagepopupmodal/ImagePopupModal";
import BackdropLoader from "../loader/BackdropLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme?.palette?.background?.paper,
  },
  spanStyle: {
    color: "#0057fa",
  },
  labelStyle: {
    color: "black",
    fontWeight: "bolder",
    textAlign: "start",
    marginBottom: theme.spacing(1),
  },
  styleGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  previewImage: {
    height: "auto",
    width: "auto",
    maxHeight: 150,
    maxWidth: 150,
  },
}));

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  color: black;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

// Set Files with the array of objects with each object of the format
// {
//   id: int,
//   file : Object,
//   url: string,
// }

export function MultiFileUpload(props) {
  const classes = useStyles();
  const [uploaded, setUploaded] = useState([]);

  const uploadCallback = (data, _file) => {
    if (data && _file) {
      const fileData = {
        id: uploaded.length,
        file: _file,
        url: data.url,
      };
      setUploaded((prevUploads) => [...prevUploads, fileData]);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const toUploadFiles = [];
    for (let i = 0; i < acceptedFiles.length; i++) {
      const f = acceptedFiles[i];
      const attachment = new FormData();
      attachment.append("file_name", f.name);
      attachment.append("file_type", f.type);
      attachment.append("file", f);
      toUploadFiles.push(attachment);
    }
    props.uploadMultipleFiles(toUploadFiles, uploadCallback);
  }, []);

  useEffect(() => {
    props.setFile(uploaded);
  }, [uploaded]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    // acceptedFiles,
  } = useDropzone({ onDrop, accept: "image/*" });

  // useEffect(() => {
  //   setFile(
  //     acceptedFiles.map((file) => (
  //       <li key={file.path}>
  //         {file.path} - {file.size} bytes
  //       </li>
  //     ))
  //   );
  // }, [acceptedFiles]);

  // useEffect(() => {
  //   setFile(
  //     uploaded.map((upload) => (
  //       <li key={upload?.file?.path}>
  //         {upload?.file?.path} - {upload?.file?.size} bytes
  //       </li>
  //     ))
  //   );
  // }, [uploaded]);

  useEffect(() => {
    if (props.reset) {
      setUploaded([]);
    }
  }, [props.reset]);

  const handleRemove = (item) => {
    const newUploads = [];
    uploaded.forEach((u) => {
      if (u.url !== item.url) {
        newUploads.push(u);
      }
    });
    setUploaded([...newUploads]);
  };

  return (
    <div>
      <Grid container spacing={1} className={classes.styleGrid}>
        <Grid item md={12} sm={6} xs={12}>
          <Card>
            <CardHeader title="Attachments" />
            <CardContent>
              <ImagePopupModal images={uploaded} remove={handleRemove} />
              <Container
                {...getRootProps({
                  isDragActive,
                  isDragAccept,
                  isDragReject,
                })}
              >
                <input {...getInputProps()} />
                {uploaded?.length <= 0 ? (
                  <>
                    <p>
                      <img
                        src={UploadIcon}
                        alt="Upload Icon"
                        width="40px"
                        height="40px"
                      />
                    </p>
                    <p>
                      {" "}
                      <b>
                        Drop Your Files or{" "}
                        <span className={classes.spanStyle}> browse </span>{" "}
                      </b>
                    </p>
                    <p> Supports JPG, JPEG, PNG </p>
                  </>
                ) : (
                  <p> Add More</p>
                )}
                {/* <p className={classes.fileStyle}>{file}</p> */}
              </Container>
            </CardContent>
          </Card>
          {/* <Grid container direction={"row"} spacing={3}>
              {uploaded.map((upload, ind) => (
                <Grid key={upload.url} item sm={12} xs={12} md={4}>
                  <img
                    src={upload.url}
                    onClick={() => openImageViewer(ind)}
                    width="100"
                    height="100"
                    style={{ margin: "2px" }}
                    alt={upload.file?.name}
                    className={classes.previewImage}
                  />
                </Grid>
              ))}
            </Grid> */}
        </Grid>
      </Grid>
      {props.uploadingFile && <BackdropLoader message="Uploading..." />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  uploadingFile: state.CommonReducer.uploadingFile,
});

const mapDispatchtoProps = (dispatch) => {
  return {
    uploadMultipleFiles: (files, callBack) =>
      dispatch(uploadMultipleFiles(files, callBack)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(MultiFileUpload);
