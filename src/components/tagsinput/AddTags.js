import React, { useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
// import { makeStyles } from "@material-ui/core/styles";
import "./addTags.css";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

const TagsInput = (props) => {
  const [tags, setTags] = useState(props.tags);

  //const classes = useStyles();
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    event.preventDefault();
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      // props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);

  useEffect(() => {
    props.selectedTags(tags);
  }, [tags]);

  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      {/* <input
        label={props.label}
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
      /> */}
      <InputBase
        type="text"
        placeholder={props.label}
        inputProps={{ "aria-label": "naked" }}
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
      />
    </div>
  );
};

export default TagsInput;
