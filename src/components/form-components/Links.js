import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import classNames from 'classnames'

import { Formik, Field } from "formik";
import Grid from '@material-ui/core/Grid';
import FormikField from "../input/FormikField"
import { CheckboxWithLabel } from "formik-material-ui";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
  }
}))

const Links = (props) => {
  const classes = useStyles()

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <FormikField label="Website / Event Link"
            name="entry_link"
            error={props.entryLinkError}
            touch={props.entryLinkTouched}
            required />
        </Grid>
        <Grid item sm={6}>
          <FormikField
            label="Video Call / Media Link (Zoom, Twitch, etc.)"
            name="media_link"
            error={props.mediaLinkError}
            touch={props.mediaLinkTouched}
          />
        </Grid>
      </Grid >
      <Field
        component={CheckboxWithLabel}
        name="zoomLink"
        Label={{ label: "Request a Zoom Pro link (Only valid if no Video Call link given)" }}
        type="checkbox"
        indeterminate={false}
        color="default"
      />
    </div>
  )
}

export default Links