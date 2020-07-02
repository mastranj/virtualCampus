import React from "react";

// form settings
import * as Yup from "yup";

// form inputs
import { Formik, Form, Field } from "formik";

// material-ui components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { CustomHeader, Template } from "../.."

// form components
import FormTitle from "../../form-components/FormTitle"
import ContactInfo from "../../form-components/ContactInfo"
import EntryDetails from "../../form-components/EntryDetails"
import Links from "../../form-components/Links"
import Tags from '../../form-components/Tags'
import AdditionalInfo from '../../form-components/AdditionalInfo'
import SubmitButton from '../../form-components/SubmitButton'

import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";

import firebase from "../../../firebase";
import Categories from "./FormCategories";
const MainCategories = Categories.FormCategories;
const categories = Object.values(MainCategories)
const titles = Object.keys(categories).map(index => {
  return (
    categories[index]['title']
  )
})
// const options = Object.keys(categories).map(index => { return [categories[index]['options']] })
// const tags = JSON.stringify(Object.values(Object.values(MainCategories)[1]))
// console.log("options: " + options)
// console.log("type: " + typeof categories)

const useStyles = makeStyles(styles);
const manualSt = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    // marginBottom: '12px'
  },
  title: {
    fontSize: '36px',
    lineHeight: '54px',
    color: '#0072CE',
    width: '435px',
    height: '66px',
    left: '55px',
    top: '101px',
  },
  subtitle: {
    fontSize: '20px',
    lineHeight: '30px',
    color: '#0072CE',
    width: '243px',
    height: '30px',
    left: '584px',
    top: '114px',
  },
  detail: {
    width: '400px',
    height: '63px',
    left: '55px',
    color: '#000000',
    fontSize: '14px',
    lineHeight: '21px',
  },
  section: {
    margin: '15px 0'
  },
  uploadBtn: {
    right: '5.42%',
    top: '25.72%',
    bottom: '70.59%',
    borderRadius: '10px',
    boxSizing: "border-box",
    color: '#0072CE !important',
    border: "1px solid #0072CE",
    "&:hover,&:focus": {
      color: 'white !important',
      backgroundColor: '#0072CE',
      boxShadow: "0 14px 26px -12px #0072CE50"
    },
    fontSize: 'min(2vw, 15px)',
    padding: "1vh min(2vw,20px)",
    margin: "1vh 0 0 0",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    background: "#FFFFFF",
    width: "121px",
    height: "36px",
    marginLeft: '-10px',
    marginTop: '16px'
  },
  formField: {
    fontSize: '14px',
    lineHeight: '21px',
  },
  submitBtn: {
    borderRadius: '10px',
    width: "100%",
    color: '#FB750D !important',
    boxSizing: "border-box",
    border: "1px solid #FB750D",
    "&:hover,&:focus": {
      color: 'white !important',
      backgroundColor: '#F1945B',
      boxShadow: "0 14px 26px -12px #FB750D50"
    },
    fontSize: 'min(2vw, 15px)',
    padding: "1vh min(2vw,15px)"
  },
  categoryBtn: {
    right: '25px',
    borderRadius: '10px',
    color: '#0072CE !important',
    border: "1px solid #0072CE",
    "&:hover,&:focus": {
      color: 'white !important',
      backgroundColor: '#0072CE',
      boxShadow: "0 14px 26px -12px #0072CE50"
    },
    fontSize: 'min(1vw, 12px)',
    textTransform: 'none',
    marginLeft: '12px'
  },
  dot: {
    fontSize: '16pt',
    color: '#FD6464',
    borderRadius: '50%',
    position: 'absolute',
    width: '5px',
    height: '5px',
    marginLeft: '16px',
    paddingTop: '5px'
  },
}));

// set an init value first so the input is "controlled" by default
const initVal = {
  name: '',
  email: '',
  project_name: '',
  desc: '',
  image_file: '',
  image_link: '',
  project_link: '',
  comments: '',
  category: '',
  needs_tag: '',
  career_tag: '',
  covid_tag: '',
  health_tag: '',
  social_tag: '',
  other_tag: '',
  agree: '',
};

const validationSchema = Yup.object().shape({
  // name: Yup.string()
  //   .min(5, 'Too Short')
  //   .required('Required'),
  // email: Yup.string()
  //   .email('Please enter a valid email address')
  //   .required('Required'),
  // project_link: Yup.string()
  //   .url('Please enter a valid URL')
  //   .required('Required'),
  // project_name: Yup.string()
  //   .required('Required'),
  // desc: Yup.string()
  //   .required('Required')
  //   .max('250', "Please enter less than 250 characters"),
  // agree: Yup.boolean('True')
  //   .required()
});

class ResourceFormDesktop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackSubmit: false,
      errStatus: 0,
      activityIndicatory: false,
      imgFileValue: "",
      imgurLink: "",
      options: null,
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  submitHandler = (values) => {
    let vals = JSON.stringify(values);
    console.log(vals);
    console.log(values);

  };

  imgFileUploadHandler = (fileList) => {
    const fileName = fileList[0].name
    const file = fileList[0]

    this.uploadImage(file)
    this.setState({
      imgFileValue: fileName
    })
  }

  // upload to firebase here
  uploadData(data) {
    console.log(data);
  }

  uploadImage = (file) => {
    let imgur = ""
    const r = new XMLHttpRequest();
    const d = new FormData();
    const clientID = "df36f9db0218771";

    d.append("image", file);

    // Boilerplate for POST request to Imgur
    r.open("POST", "https://api.imgur.com/3/image/");
    r.setRequestHeader("Authorization", `Client-ID ${clientID}`);
    r.onreadystatechange = () => {
      if (r.status === 200 && r.readyState === 4) {
        let res = JSON.parse(r.responseText);
        // this is the link to the uploaded image
        imgur = `https://i.imgur.com/${res.data.id}.png`;

        this.setState({ imgurLink: imgur })
      }
    };
    // send POST request to Imgur API
    r.send(d);
  }

  getFileName() {
    if (this.state.imgFileValue !== "") {
      return this.state.imgFileValue;
    }
    return ""
  }

  handleImageUpload() {
    console.log(this.inputElement);
    this.inputElement.props.label = "Image Uploaded";
    this.inputElement.touch = true;
  }

  selectHandler() {
    console.log("selected")
  }

  render() {
    return (
      <Template title={"Add New Resource"} active={"resources"} >
        <div style={{ background: 'white' }}>
          <Container>
            <Grid container spacing={10}>
              <FormTitle
                title="Add a New Resource"
                desc="Thank you for your interest in sharing your project through CVC. Please fill out the following form so we can thoroughly promote your resource on our website!"
              />
              <Grid item xs={8}>
                <Formik
                  initialValues={initVal}
                  onSubmit={this.submitHandler}
                  validationSchema={validationSchema}
                >{({ errors, touched }) => {
                  return (
                    <Form>
                      <ContactInfo
                        errorName={errors.name}
                        touchedName={touched.name}
                        errorEmail={errors.email}
                        touchedEmail={touched.email}
                      />
                      <EntryDetails
                        title={"Resource"}
                        entryTitle={"Resource"}
                        imgUpload={this.imgFileUploadHandler}
                        fileName={this.getFileName()}

                        errorTitle={errors.title}
                        touchedTitle={touched.title}

                        errorImgLink={errors.image_link}
                        touchedImgLink={touched.image_link}

                        errorDesc={errors.desc}
                        touchedDesc={touched.desc}
                      />
                      <Tags
                        title={"Category"}
                        subtitle={"Tags"}
                        tags={titles}
                        options={[]}
                        otherTagsTouched={touched.other_tags}
                        selected={this.selectHandler}
                        required
                      />
                      <AdditionalInfo
                        touchedComments={touched.comments}
                      />
                      <SubmitButton />
                    </Form>
                  )
                }}

                </Formik>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Template>
    );
  };
}

export default ResourceFormDesktop;