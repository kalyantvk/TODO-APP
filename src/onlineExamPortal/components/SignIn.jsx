import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {Formik,Form,Field, ErrorMessage} from 'formik'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import OAPAuthicationService from './OAPAuthenticationService.js'
import { trackPromise } from 'react-promise-tracker';
import Button from '@material-ui/core/Button';
import '../../App.css' 
import { CircularProgress } from "@material-ui/core";



class SignIn extends Component {


 
  constructor(props)
  {
      super(props)
      this.state = {
        studentid:'',
        password:'',
        description:'',
        hasLoginFailed:false,
        isLoading:false

    }
    this.toggleLoading=this.toggleLoading.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    
  }

  onSubmit(values){
      this.toggleLoading()
      console.log("login clicked"+values.studentid);
      OAPAuthicationService.makeLogin(values.studentid,values.password)
        .then( (response) =>{
          console.log(response)
          if(response.data.message==="Success")
          {
              OAPAuthicationService.registerSuccessfulLogin(values.studentid)
              this.props.history.push("/home")
          }
          else
          {
              this.setState({
                  hasLoginFailed:true
              })
          }
          this.toggleLoading()
      })
      
      
  }
  
  studentIdHandleChange = (event) => {
    this.setState({
      studentid: event.target.value,
    }, () => { console.log( this.state.studentid) });
    
  };


  studentPasswordHandleChange = (event) => {
      this.setState({
          password: event.target.value,
      }, () => { console.log(this.state.password) });
  };
  toggleLoading = () => {
    this.setState((prevState, props) => ({
      isLoading: !prevState.isLoading
    }))
  }

  componentDidMount(){
    console.log("my path"+"---------------"+window.location.pathname)
  }
  

  render(){
    let {description,studentid,password}=this.state
  return (
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      
      <div id="signinform" >
        
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
            initialValues={{description,studentid,password}}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}

        
        >
        {
            (props) => (
                <Form>
                {this.state.hasLoginFailed && <div className="alert alert-danger">Invalid Credentials</div>}

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="studentid"
                    label="Studen ID"
                    name="studentid"
                    onChange={this.studentIdHandleChange}
                    autoComplete="studentid"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={this.studentPasswordHandleChange}
                    id="password"
                    autoComplete="current-password"
                />
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{marginTop:5}}
                    disabled={this.state.isLoading}
                >
                   
                  {this.state.isLoading && <CircularProgress size={20} color="#" /> }
                  {!this.state.isLoading && "Signin"}
                </Button>
                
                
                <Grid container style={{marginTop:20}}>
                    <Grid item xs>
                    <Link to="" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/signup" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                    </Grid>
                </Grid>
                </Form>
            )}
        </Formik>
            
      </div>
     
    </Container>
  );
  }
}
export default SignIn;