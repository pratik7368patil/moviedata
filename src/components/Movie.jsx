import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "89vh",
    padding: 10,
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  imgMain: {
    height: "100%",
    marginTop: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: "500px",
      width: "100%",
    },
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
  starIcon: {
    color: "#fc0",
  },
  media: {
    borderRadius: 5,
    marginLeft: 1,
    height: "100%",
    width: "350px",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      maxWidth: "350px",
      width: "100%",
    },
  },
  content: {
    padding: 20,
  },
  btn: {
    background: "#2b2b2b",
    color: "white",
    "&:hover": {
      background: "#2b2b2b",
    },
  },
}));

export default function Movie(props) {
  const classes = useStyles();

  const { currentMovie, addToWatchlist, removeFromWatchlist } = props;

  if (Object.keys(currentMovie).length !== 0) {
    return (
      <Paper className={classes.root} elevation={0}>
        <div className={classes.imgMain}>
          {currentMovie.Poster === "N/A" ? (
            "Poster not available"
          ) : (
            <CardMedia
              className={classes.media}
              image={currentMovie.Poster}
              title={currentMovie.Title}
            />
          )}
        </div>

        <div className={classes.content}>
          <Typography gutterBottom variant="h2" component="h2">
            <Box fontWeight="fontWeightBold">{currentMovie.Title}</Box>
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {`${currentMovie.Genre} | ${currentMovie.Year}`}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h5"
            className={classes.rating}
          >
            <Rating
              name="read-only"
              value={currentMovie.imdbRating / 2}
              readOnly
              precision={0.5}
            />
            <Box fontWeight="fontWeightBold" ml={2}>
              {currentMovie.imdbRating}
            </Box>
          </Typography>
          <Typography variant="body1" color="textSecondary" component="div">
            {currentMovie.Plot}
          </Typography>
          <Typography variant="body1">
            <Box fontWeight="fontWeightBold" mt={3} component="div">
              {currentMovie.Actors}
            </Box>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <Box mt={3}>{currentMovie.Language}</Box>
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={() =>
                currentMovie.isWachlisted
                  ? removeFromWatchlist(currentMovie.imdbID)
                  : addToWatchlist(currentMovie.imdbID)
              }
            >
              {currentMovie.isWachlisted
                ? "Remove from Watchlist"
                : "Add to Watchlist"}
            </Button>
          </Box>
        </div>
      </Paper>
    );
  }
  return null;
}
