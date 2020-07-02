import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import { Field } from "formik";
import Grid from '@material-ui/core/Grid';
import FormikField from "../input/FormikField"
import { CheckboxWithLabel } from "formik-material-ui";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
  },
  title: {
    fontSize: "20px",
    lineHeight: "30px",
    color: "#0072CE"
  }
}))

const AdditionalInfo = (props) => {
  const classes = useStyles()

  return (
    <div style={{ margin: '15px 0 15px 0' }}>
      <div className={classNames(classes.root, classes.title)}>
        Additional Information
            </div>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <FormikField
            label="Comments"
            name="comments"
            rows="5"
            multiline

            error={props.errorComments}
            touch={props.touchedComments}
          >
          </FormikField>
        </Grid>
      </Grid>
      <div style={{ margin: '15px 0 0 0' }}>
        By adding this {props.title} you agree to the <a
          // href="https://bit.ly/events-policy-docs"
          href={props.policyLink}
          target="_blank">Columbia Virtual Campus Policies</a>.
      </div>
      <Field
        component={CheckboxWithLabel}
        name="agree"
        Label={{ label: "I agree to the CVC Policies." }}
        type="checkbox"
        indeterminate={false}
        color="default"

      />
    </div>
  )
}

export default AdditionalInfo