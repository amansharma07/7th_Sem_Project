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
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

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
    height: "85vh",
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
    height: "100%",
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

class SignUp extends Component {
  state = {
    v_type: null,
    status: null,
  };
  vtypeHandleChange = (event) => {
    // setAge(event.target.value);
    this.setState({ v_type: event.target.value });
    console.log(this.state.v_type);
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.email.value);
    const email = event.target.email.value;
    const password = event.target.password.value;
    const v_type = event.target.v_type.value;

    // const formData = new FormData();
    // formData.append("email", event.target.email.valueail);
    // formData.append("password", event.target.password.value);
    // formData.append("v_type", event.target.v_type.value);

    const formData = {
      email: email,
      password: password,
      v_type: v_type,
    };

    console.log(formData);

    axios.post("http://localhost:3000/signup", formData).then((res) => {
      // console.log(res);
      if (res.data === "User exists already, please login instead.") {
        this.setState({ status: res.data });
      } else {
        this.setState({ status: "Signed Up" });
        this.props.changeToLoggedIn();
        this.props.history.push("/");
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
                Sign Up
              </Typography>
              <p>{this.state.status}</p>
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
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="v_type">Type</InputLabel>
                  <Select
                    // labelId="v_type"
                    name="v_type"
                    id="v_type"
                    value={this.state.v_type}
                    onChange={this.vtypeHandleChange}
                  >
                    <MenuItem value="issuer">Issuer</MenuItem>
                    <MenuItem value="verifier">Verifier</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <br />
                <br />
                <Link to="/login" activeClassName="active">
                  Have an account ? Log In
                </Link>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SignUp));
