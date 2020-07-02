import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import Grid from '@material-ui/core/Grid';
import FormikField from "../input/FormikField"
import FileUploadBtn from '../form-components/FileUploadBtn'


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

const EntryDetails = (props) => {
  const classes = useStyles()

  return (
    <div style={{ margin: "15px 0 0 0" }}>
      <div className={classNames(classes.root, classes.title)}>
        {props.title}
      </div>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <FormikField
            name="title"
            label={props.entryTitle}
            error={props.errorTitle}
            touch={props.touchedTitle}
            required
          />
        </Grid>
        {/* <Grid item sm={6}>
          <FormikField
            label="Logo / Image Link (Preferred: Imgur URL)"
            name="image_link"
            error={props.errorImgLink}  
            touch={props.touchedImgLink}
          />
        </Grid> */}
        <Grid item sm={4}>
          <FormikField
            name="image_link"
            label={props.fileName === "" ? "Logo / Image Link (Preferred: Imgur URL)" : props.fileName}
            error={props.errorImgLink}
            touch={props.touchedImgLink}
            value={props.fileName}
          />
        </Grid>
        <Grid item sm={2}>
          <FileUploadBtn
            name='image_file'
            text="Upload"
            label='Image Upload'
            id="fileUpload"
            onChange={props.imgUpload}
          />
        </Grid>
      </Grid >
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <FormikField
            label="Description"
            name="desc"
            multiline rows="5"
            error={props.errorDesc}
            touch={props.touchedDesc}
            required
          />
        </Grid>
      </Grid >
    </div>
  )
}

export default EntryDetails