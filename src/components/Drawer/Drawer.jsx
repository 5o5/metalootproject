import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import clsx from "clsx";
import lootTheme from "../../scss/lootTheme";
import { useHistory } from "react-router";
import TwitterIcon from '@material-ui/icons/Twitter';

const drawerWidth = 240;
const windowWidth = window.screen.width;

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ".MuiAppBar-colorPrimary": {
      background: "#fff",
      padding: "0px",

    },
  
    ".MuiToolbar-gutters": {
      padding: "0px",
    },
    "header.MuiPaper-root.MuiAppBar-root.MuiAppBar-positionFixed.MuiAppBar-colorPrimary.makeStyles-appBar-33.mui-fixed.MuiPaper-elevation4":
    {
      width: windowWidth,
      left: "0px",
    },
  },
  root: {
    display: "flex",
    fontFamily: 'eb_gar',
    overflowX: "hidden",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'rgba(0,0,0,90%)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#fff",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navWidth: {
    width: '0',
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  mobileHeader: {
    padding: '1em',
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: lootTheme.colors.primary,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 0,
    marginLeft: "auto",
    color: '#fff'
  },
  webTitle: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    letterSpacing: '5px',
    fontFamily: 'eb_gar',
    [theme.breakpoints.up("sm")]: {
      cursor:'pointer',
    },
  },
  liRoot: {
    padding: "2em 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: '#fff',
    cursor: "pointer",
    position: "relative",
    marginLeft: '2em'
  },
  navLogo: {
    position: "absolute",
    width: "180px",
    height: "160px",
    top: "10px",
    left: "40px",
  },
  navLogoMob: {
    width: "70px",
    position: "absolute",
    right: "5%",
    top: "10%",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  sidenavDrawer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "3em",
  },
  sideNavTxt: {
    color: "#fff",
    borderBottom: "1px solid #fff",
    padding: "1em",
    width: "100%",
  },
  dFlex: {
    display: 'flex',
    alignItems: 'center',
  },
  bs: {
    boxSizing: 'content-box'
  },
  flexEnd: {
    justifyContent: 'flex-end'
  },
  mr1: {
    marginRight: '1em'
  },
  dFlexCenter:
    { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  hLink: {
    width: '30px',
    height: '30px',
    borderRadius: '50px',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  pr1: {
    paddingRight: '1em'
  }
}));
function ResponsiveDrawer(props) {
  const navList = [
    { name: "FAQ" },
    { name: "Resources" },

  ];

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const history = useHistory()
  const drawer = (
    <Grid container style={{ display: "flex", padding: '0 10em' }}>
      <Grid lg={3} md={3} className={clsx(classes.dFlex, classes.bs)}>
        {/* <img src={headerEgg} className={classes.pr1} alt="header egg" width={50} height={60} /> */}
        <Typography className={classes.webTitle} onClick={()=>history.push('/')}>
          MetaLoot
        </Typography>
      </Grid>
      <Grid lg={7} md={7} className={classes.dFlex}>
        <Grid item xs></Grid>

        {navList.map((item) => (
          <>
            <Grid
              className={classes.liRoot}
              item

              onClick={() => itemClick(item)}
            >
              <Typography style={{ fontWeight: '100', fontFamily: 'eb_gar' }}>
                {item.name
                }</Typography>
            </Grid>
          </>
        ))}
      </Grid>
      <Grid lg={2} md={2} className={clsx(classes.dFlex, classes.flexEnd)}>
        <a href="#" rel="noreferrer" style={{ display: 'flex' }} target="_blank">
          <div className={clsx(classes.hLink)} style={{ background: '#1da1f2 ', marginRight: '1em' }}>
            <TwitterIcon style={{ color: '#fff', fontSize: '18px' }} />
          </div>
        </a>
        <a href="#" rel="noreferrer" style={{ display: 'flex' }} target="_blank">
          <div className={clsx(classes.hLink)} style={{ background: '#818a91', marginRight: '1em' }}>
            <i style={{ color: '#fff' }} class="fab fa-discord"></i>
          </div>
        </a>

        <a href="#" rel="noreferrer" style={{ display: 'flex' }} target="_blank">
          <div className={clsx(classes.hLink)} style={{ background: '#415072' }}>
        
        <i style={{ color: '#fff' }} class="fas fa-chart-bar"></i>

          </div>
        </a>

      </Grid>
    </Grid>
  );
  const itemClick = (item) => {
    
    // props.handleListClick(item);
    if(item.name === 'FAQ'){
      history.push('/faq')
    }
    else{
    history.push('/resources')
    }
    // setTimeout(() => {
    //   setMobileOpen(!mobileOpen);

    // }, 1000);
  };
  const mobDrawer = (
    <div className={classes.sidenavDrawer}>
      {navList.map((item, i) => (
        <>
          <p onClick={() => itemClick(item)} className={classes.sideNavTxt}>
            {item.name}
          </p>

        </>
      ))}
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Grid container className={classes.mobileHeader}>
              <Grid item xs={10} className={clsx(classes.dFlex, classes.bs)}>
                {/* <img src={headerEgg} className={classes.pr1} alt="header egg" width={33} height={40} /> */}
                <Typography className={classes.webTitle}>
                  MetaLoot
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
            <nav smUp implementation="css" className={classes.navWidth} style={{ background: 'rgb(0 0 0 / 90%)' }}>
              <Hidden smUp implementation="css">
                <Drawer
                  variant="temporary"
                  anchor={theme.direction === "rtl" ? "right" : "left"}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  <IconButton
                    onClick={handleDrawerToggle}
                    className={classes.closeMenuButton}
                  >
                    <CloseIcon />
                  </IconButton>
                  {mobDrawer}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                {drawer}
              </Hidden>
            </nav>
          </Toolbar>

        </AppBar>
      </HideOnScroll>
    </div>
  );
}
ResponsiveDrawer.propTypes = {
  container: PropTypes.object,
};
export default ResponsiveDrawer;
