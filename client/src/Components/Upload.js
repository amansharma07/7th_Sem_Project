import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SubmitAnimation from "./SubmitAnimation";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

function Upload(props) {
  return (
    <Box textAlign='center' justify="center" my="18%" >
    	<Button
  variant="contained"
  component="label"
style={{justifyContent: 'center'}}>
  Upload a Certificate File
  <input
    type="file"
    hidden
  />
</Button>
    </Box>
  );
}

export default Upload;