import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox';
import classNames from "classnames"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    display: "inline-block"
  },
  error: {
    background: '#FFF7F7',
    border: '1px solid #FD6464'
  },
  errorMsg: {
    color: '#FD6464',
    float: 'left',
    paddingTop: '10px'
  },
  hidden: {
    position: 'absolute',
    visibility: 'hidden',
    opacity: 0
  },
  button: {
    margin: "0 0 0 1vh",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    textAlign: "center",
    whiteSpace: "nowrap",
    // verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    background: "#FFFFFF",
    boxSizing: "border-box",
    borderRadius: "10px",
  },
  small: {
    fontSize: 'min(2vw, 15px)',
    padding: "0.5vh min(2vw,10px)",
  },
  blue: {
    color: '#0072CE !important',
    border: "1px solid #0072CE",
    "&:hover": {
      color: 'white !important',
      backgroundColor: '#0072CE',
      boxShadow: "0 14px 26px -12px #0072CE50"
    },
  },
  rounded: {
    borderRadius: "30px"
  },
}))

const CustomCheckBox = (props) => {
  const classes = useStyles();

  let errorMsg
  if (props.error != null) {
    errorMsg = (
      <div className={classes.errorMsg}>
        REQUIRED
      </div>
    )
  }

  let label = props.Label['label']

  const btnClasses = classNames(classes.button, classes.small, classes.blue)

  return (
    <div className={classes.root}>
      <input
        type="checkbox"
        className={classes.hidden}
        name={props.key} />
      <label
        htmlFor={props.key}
        className={btnClasses}
      >
        {label}
      </label>
    </div>
  )
}

export default CustomCheckBox