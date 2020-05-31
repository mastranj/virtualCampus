import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase';


const manualSt = makeStyles(() => ({
  root: {
    margin: '2px 0 8px'
  },
  uploadBtn: {
    background: 'white',
    border: '1px solid #0072CE',
    borderRadius: '10px',
    color: '#0072CE',
    boxShadow: 'none',
    width: "100%",
    height: '44px',
    // fontsize: '16px'
  },
}))

const FileUploadBtn = (props) => {
  const manual = manualSt();

  const text = props.text


  return (
    <div className={manual.root}>
      <input
        type='file'
        id='file_upload'
        style={{ display: 'none' }}
      />
      <label htmlFor="file_upload">
        <ButtonBase className={manual.uploadBtn} component="span" onClick={props.onClick}>
                    <span style={{ fontSize: '14px' }}>
                        {text}
                    </span>
        </ButtonBase>
      </label>
    </div>
  )
}

export default FileUploadBtn