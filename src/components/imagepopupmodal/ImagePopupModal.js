import { ButtonBase, Grid, Icon } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ZoomOutMapOutlinedIcon from "@material-ui/icons/ZoomOutMapOutlined";
import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import styleConstants from '../../theme/styleConstants'
import theme from '../../theme/index'
// import ImageList from "@material-ui/core/ImageList";
// import ImageListItem from "@material-ui/core/ImageListItem";

const useStyles = makeStyles((styleTheme) =>
  createStyles({
    backdrop: {
      zIndex: styleTheme.zIndex.appBar + 1,
      color: "#fff",
    },
    previewImage: {
      height: "150",
      width: "100",
      opacity: 0.4,
      // maxHeight: 150,
      // maxWidth: 150,
    },
    root: {
      width: 500,
      height: 450,
    },
    imgageWrap: {
      position: "relative",
    },
    imageDeleteButton: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 100,
    },
    image: {
      position: "relative",
      height: 100,
      [styleTheme.breakpoints.down("xs")]: {
        width: "100% !important", // Overrides inline-style
        height: 100,
      },
      "&:hover, &$focusVisible": {
        zIndex: 1,
        "& $imageBackdrop": {
          opacity: 0.15,
        },
        "& $imageMarked": {
          opacity: 0,
        },
        "& $imageTitle": {
          border: "4px solid currentColor",
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: "absolute",
      // left: 0,
      right: 2,
      top: 2,
      // bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: styleTheme.palette.common.white,
    },
    imageButtonCenter: {
      position: "absolute",
      left: 0,
      right: 2,
      top: 2,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: styleTheme.palette.common.white,
    },
    imageSrc: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: "cover",
      backgroundPosition: "center 40%",
    },
    imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: styleTheme.palette.common.black,
      opacity: 0.4,
      transition: styleTheme.transitions.create("opacity"),
    },
  })
);

// function srcset(image, size, rows = 1, cols = 1) {
//   return `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format 1x,
//   ${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`;
// }

export default function ImagePopupModal(props) {
  const classes = useStyles();

  const [currentImage, setCurrentImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="m-t-10 m-b-10">
      {/* <ImageList cols={3} rowHeight={164} className={classes.root}>
        {props.images?.map((item) => (
          <ImageListItem key={item.url}>
            <img
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format 1x,
            ${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item?.file?.name ?? item?.fileName ?? "Preview"}
            />
          </ImageListItem>
        ))}
      </ImageList> */}
      <Grid container row spacing={2}>
        {props.images?.map((image, ind) => (
            <Grid
              key={image.url ?? image.fileValue ?? ind}
              item
              sm={12}
              xs={12}
              md={4}
            >
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: 150,
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${image.url ?? image.fileValue})`,
                  }}
                />
                <span className={classes.imageBackdrop} />
                {/* {!props.readOnly && (
                <span
                  className={classes.imageButton}
                  onClick={() => props.remove(image)}
                >
                  <Icon fontSize="small" onClick={() => props.remove(image)}>
                    <CloseOutlinedIcon />
                  </Icon>
                </span>
              )} */}
                <span className={classes.imageButtonCenter}>
                  <Icon fontSize="small" onClick={() => openImageViewer(ind)}>
                    <ZoomOutMapOutlinedIcon />
                  </Icon>
                </span>
              </ButtonBase>
              {!props.readOnly && (
                <span>
                  <Icon fontSize="small" onClick={() => props.remove(image)}>
                    <CloseOutlinedIcon />
                  </Icon>
                </span>
              )}
            </Grid>
          ))}
      </Grid>
      {/* <Grid container direction={"row"} spacing={2}>
        {props.images?.map((image, ind) => (
          <Grid key={image.url} item sm={12} xs={12} md={3}>
            <div className="imgageWrap">
              <span className="imageDeleteButton">&times;</span>
              <span
                // src={image.url}
                onClick={() => openImageViewer(ind)}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
                className={classes.previewImage}
              />
            </div>
          </Grid>
        ))}
      </Grid> */}
      {isViewerOpen && (
        <ImageViewer
          src={props.images?.map((u) => u.url ?? u.fileValue)}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            width: `calc(100% - ${styleConstants.drawerWidth}px)`,
            marginLeft: `${styleConstants.drawerWidth}px`,
            zIndex: theme.zIndex.appBar + 1,
          }}
        />
      )}
    </div>
  );
}
