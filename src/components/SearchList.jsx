import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyle = makeStyles((theme) => ({
  listItemMain: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  listStyle: {
    borderRadius: 5,
    "&:hover": {
      background: "#2b2b2b",
      color: "white",
    },
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SearchList(props) {
  const { list, handleMovieClick } = props;
  const classes = useStyle();

  return (
    <List>
      {list !== undefined
        ? list.map((movie) => (
            <div key={movie.imdbID} className={classes.listItemMain}>
              <ListItem
                button
                className={classes.listStyle}
                key={movie.imdbID}
                onClick={() => handleMovieClick(movie.imdbID)}
              >
                <ListItemText primary={movie.Title} />
              </ListItem>
            </div>
          ))
        : null}
    </List>
  );
}
