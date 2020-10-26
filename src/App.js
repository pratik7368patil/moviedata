import React from "react";
import { getResult } from "./data/searchResult";
import { getMovieData } from "./data/movieData";
import {
  AppBar,
  Box,
  Divider,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  InputBase,
  Badge,
  Toolbar,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTheme } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import MenuIcon from "@material-ui/icons/Menu";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import SearchIcon from "@material-ui/icons/Search";
import SearchList from "./components/SearchList";
import Movie from "./components/Movie";
import Home from "./components/Home";
import { useStyles } from "./components/appStyles.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchData, setSearchData] = React.useState([]);
  const [currentMovie, setCurrentMovie] = React.useState({});
  const [watchlist, setWatchlist] = React.useState([]);

  const [error, setError] = React.useState({
    isSuccessed: false,
    message: "Success!",
    show: false,
  });

  const handleError = (message, isSuccessed) => {
    setError({ isSuccessed: isSuccessed, message: message, show: true });
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError({
      isSuccessed: error.isSuccessed,
      message: error.message,
      show: false,
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  async function handleSearch(event) {
    if (event.keyCode === 13) {
      handleToggle();
      let data = await getResult(event.target.value);
      if (data.Response === "True") {
        setSearchData(data.Search);
        handleMovieClick(data.Search[0].imdbID);
        handleError("Movie List Found!", true);
      } else {
        handleError("Movie List not Found!", false);
      }
      handleClose();
    }
  }

  async function handleMovieClick(movieId) {
    handleToggle();
    let data = await getMovieData(movieId);
    if (data.Response === "True") {
      let watchListStatus = checkInWatchlist(movieId);
      setCurrentMovie({ ...data, isWachlisted: watchListStatus });
      handleError("Movie Found!", true);
    } else {
      handleError("Movie not Found!", false);
    }
    handleClose();
  }

  function addToWatchlist(id) {
    const copyCurrentMovie = { ...currentMovie };
    copyCurrentMovie.isWachlisted = !copyCurrentMovie.isWachlisted;
    setCurrentMovie(copyCurrentMovie);
    const copyWatchlist = [...watchlist];
    copyWatchlist.push(id);
    setWatchlist(copyWatchlist);
  }

  function checkInWatchlist(id) {
    for (let i of watchlist) {
      if (i === id) {
        return true;
      }
    }

    return false;
  }

  function removeFromWatchlist(id) {
    const copyCurrentMovie = { ...currentMovie };
    copyCurrentMovie.isWachlisted = !copyCurrentMovie.isWachlisted;
    setCurrentMovie(copyCurrentMovie);
    const newWatchlist = watchlist.filter((item) => item !== id);
    setWatchlist(newWatchlist);
  }

  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const handleClose = () => {
    setLoadingStatus(false);
  };
  const handleToggle = () => {
    setLoadingStatus(!loadingStatus);
  };

  const drawer = (
    <div>
      <h2 className={classes.head}>Movie List</h2>
      <Divider />
      <SearchList list={searchData} handleMovieClick={handleMovieClick} />
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Badge badgeContent={searchData.length} color="primary" showZero>
              <MenuIcon />
            </Badge>
          </IconButton>

          <Typography variant="h6" noWrap className={classes.title}>
            <Box fontWeight="fontWeightBold">Movie Database</Box>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyDown={handleSearch}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <IconButton className={classes.watchIconMain}>
            <Badge badgeContent={watchlist.length} color="primary" showZero>
              <WatchLaterIcon className={classes.watchIcon} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {Object.keys(currentMovie).length !== 0 ? (
          <Movie
            currentMovie={currentMovie}
            addToWatchlist={addToWatchlist}
            removeFromWatchlist={removeFromWatchlist}
          />
        ) : (
          <Home />
        )}
        <div>
          <Backdrop className={classes.backdrop} open={loadingStatus}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </main>
      <Snackbar
        open={error.show}
        autoHideDuration={error.isSuccessed ? 1000 : 2500}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity={error.isSuccessed ? "success" : "error"}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
