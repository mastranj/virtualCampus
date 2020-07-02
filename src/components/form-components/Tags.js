import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import Grid from '@material-ui/core/Grid';
import FormikField from "../input/FormikField"
import { Field } from "formik"
import { CheckboxWithLabel } from "formik-material-ui";
import CustomCheckBox from '../input/CustomCheckBox';
// import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles(() => ({
  dot: {
    fontSize: '16pt',
    color: '#FD6464',
    borderRadius: '50%',
    position: 'absolute',
    left: '23px',
    top: '7px',
  },
  title: {
    paddingTop: '7px',
    paddingLeft: '42px'
  }
}))

const Tags = (props) => {
  const classes = useStyles()
  const tags = props.tags
  const options = props.options

  let dot = null
  if (props.required) {
    // console.log("i am required")
    dot = (
      <div className={classes.dot}>
        •
      </div>
    )
  }

  let optionsSelect = null
  if (options != null) {
    optionsSelect = (
      <div>
        <br />
        < Grid container spacing={2} >
          <div style={{ display: "inline-block", position: "relative" }}>
            {dot}
            <div className={classes.title}>{props.subtitle}</div>
          </div>
          <Grid item sm={10}>
            {options.map((option, index) => {
              return (
                <Field
                  component={CheckboxWithLabel}
                  // component={ToggleButton}
                  name={option.toLowerCase() + "_option"}
                  Label={{ label: option }}
                  type="checkbox"
                  indeterminate={false}
                  color="default"
                  key={index}
                ></Field>
              )
            })}
            {/* <CustomCheckBox label="hello"></CustomCheckBox> */}
          </Grid>
        </Grid >
      </div>

    )
  }

  return (
    <div style={{ paddingTop: '20px' }}>
      <Grid container spacing={2}>
        <div style={{ display: "inline-block", position: "relative" }}>
          {dot}
          <div className={classes.title}>{props.title}</div>
        </div>
        <Grid item sm={10}>
          {tags.map((tag, index) => {
            return (
              <Field
                component={CheckboxWithLabel}
                // component={CustomCheckBox}
                name={tag.toLowerCase() + "_tag"}
                Label={{ label: tag }}
                type="checkbox"
                indeterminate={false}
                color="default"
                key={index + 'tag'}
              ></Field>
              // <Field
              //   component={ToggleButton}
              //   type="button"
              //   label={tag}
              //   key={index + "Tag"}
              //   value={tag}
              // >
              //   butts
              // </Field>
            )
          })}
          {/* <CustomCheckBox label="hello"></CustomCheckBox> */}
        </Grid>
      </Grid>
      {optionsSelect}
      <br />
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <FormikField
            name="other_tags"
            label="Other Tags (Seperate each by semicolon)"
            placeholder="Separate Each Tag by Semicolon"
            touch={props.otherTagsTouched}
          />
        </Grid>
      </Grid >
    </div>
  )
}

export default Tags