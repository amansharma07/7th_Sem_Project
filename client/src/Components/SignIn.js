import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ChainImage from "../Images/chainT.png";

const styles = (theme) => ({
  hidden: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      borderRadius: "5%",
      marginRight: 30,
    },
    [theme.breakpoints.up(1150)]: {
      marginLeft: 50,
      width: 300,
    },
    height: "75vh",
    marginTop: theme.spacing.unit * 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 100,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  media: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  imgstyles: {
    maxWidth: "70vw",
    maxHeight: "90vh",
    [theme.breakpoints.down(1200)]: {
      marginTop: theme.spacing.unit * 4,
    },
  },
});

class SignIn extends Component {
  state = {
    invalidUser: null,
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.email.value);
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const v_type = event.target.v_type.value;

    // const formData = new FormData();
    // formData.append("email", event.target.email.valueail);
    // formData.append("password", event.target.password.value);
    // formData.append("v_type", event.target.v_type.value);

    const formData = {
      email: email,
      password: password,
      // v_type: v_type,
    };

    console.log(formData);
    console.log(this.props);

    axios.post("http://localhost:3000/login", formData).then((res) => {
      console.log(res);
      if (res.data.token) {
        this.props.changeToLoggedIn();
        this.props.history.push("/generate-certificate");
      } else {
        this.setState({ invalidUser: "Invalid Username OR Password" });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container style={{ height: "100%" }}>
          <Grid className={classes.hidden} item sm={false} md={8}>
            <img className={classes.imgstyles} src={ChainImage} alt="chain" />
          </Grid>
          <Grid item sm={12} md={4}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon style={{ fontSize: 70 }} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <p>{this.state.invalidUser}</p>
              <form className={classes.form} onSubmit={this.onSubmitHandler}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Username</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log In
                </Button>
                <br />
                <br />
                <Link to="/signup" activeClassName="active">
                  Don't Have an Account? Sign Up
                </Link>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SignIn));
