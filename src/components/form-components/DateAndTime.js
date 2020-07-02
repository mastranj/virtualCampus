import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import Grid from '@material-ui/core/Grid';
import { Select } from "material-ui-formik-components/Select";
import { DateTimePicker } from "formik-material-ui-pickers";
import { Field } from "formik";


const DateAndTime = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item sm={3}>
        <div style={{ margin: "16px 0 8px" }}>
          <Field
            component={DateTimePicker}
            name="start_date"
            label="Start Time"
            required
          />
        </div>
      </Grid>
      <Grid item sm={3}>
        <div style={{ margin: "16px 0 8px" }}>
          <Field
            component={DateTimePicker}
            name="end_date"
            label="End Time"
            required
          />
        </div>
      </Grid>
      <Grid item sm={3}>
        <Field
          name="timezone"
          label="Select Timezone"
          options={optionsTZ}
          component={Select}
          required
        />
      </Grid>
    </Grid >
  )
}

export default DateAndTime