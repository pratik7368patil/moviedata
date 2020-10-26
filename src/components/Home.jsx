import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import background from "./back.jpg";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: 561,
    color: "white",
    padding: "0px 30px 0px 30px",
    borderRadius: 0,
  },
  mainContainer: {
    height: "100%",
  },
  alignToCenter: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  },
  mainBtn: {
    width: 250,
    background: "white",
    color: "#2b2b2b",
    "&:hover": {
      background: "lightgray",
    },
  },
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.main} elevation={0}>
      <Grid container className={classes.mainContainer}>
        <Grid item sm={6} className={classes.alignToCenter}>
          <Box mb={4}>
            <Typography variant="h3">
              <Box fontWeight="fontWeightBold">
                Get your Favourite Movie here!
              </Box>
            </Typography>
          </Box>
          <Box mb={4}>
            <Typography variant="body1">
              Built on the top of OMDb API, It is a RESTful web service to
              obtain movie information, all content and images.
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={6}></Grid>
      </Grid>
    </Paper>
  );
}
