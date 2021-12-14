import clsx from "clsx"
import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Box, Divider, IconButton, Typography, Toolbar, AppBar, Drawer, CssBaseline, Badge, Tooltip } from "@material-ui/core"
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon } from '@material-ui/icons'
import UserMenu from "./UserMenu"
import SideBar from "./SideBar"
//import TopBar from "./TopBar"
import CyVerseServices from "./CyverseServices"
import { CyVerseIcon, HelpChatIcon } from "./icons"

const projectName = "DataWatch"
const drawerWidth = 235

const useStyles = makeStyles((theme) => {
  return {
      root: {
          display: 'flex',
      },
      logo: {
          width: '45px',
          padding: '2px',
          marginRight: '10px',
      },
      toolbar: {
          paddingRight: 24, // keep right padding when drawer closed
      },
      toolbarIcon: {
          display: 'flex',
          color: 'primary',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          ...theme.mixins.toolbar,
      },
      ChevronLeftIcon: {
          color: 'white',
      },
      appBar: {
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: '#448aff',  // header color
          //backgroundImage: "url(backgroundImages/toppattern.svg)",
          transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
          }),
      },
      appBarShift: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
          }),
      },
      menuButton: {
          marginRight: 36,
      },
      menuButtonHidden: {
          display: 'none',
      },
      title: {
          flexGrow: 1,
      },
      drawerPaper: {
          position: 'relative',
          whiteSpace: 'nowrap',
          width: drawerWidth,
          color: '#ffffff',
          backgroundColor: '#0d47a1', // section ncolor
          //backgroundColor: "#121212",
          //backgroundImage: "url(/backgroundImages/sidebarPattern.svg)",
          transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
          }),
      },
      drawerPaperClose: {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
              width: theme.spacing(9),
          },
      },
      appBarSpacer: theme.mixins.toolbar,
      content: {
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
      },
      container: {
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(5),
          paddingLeft: theme.spacing(5),
          paddingRight: theme.spacing(5),
          backgroundColor: theme.palette.background.default,
          maxWidth: '100%',
      },
      paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
      },
      fixedHeight: {
          height: 240,
      },
  }
})

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      CyVerse {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default function Dashboard(props) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
      <div className={classes.root}>
          <CssBaseline />
          <AppBar
              position="absolute"
              className={clsx(classes.appBar, open && classes.appBarShift)}
          >
              <Toolbar className={classes.toolbar}>
                  <IconButton
                      edge="start"
                      aria-label="open drawer"
                      color="inherit"
                      onClick={handleDrawerOpen}
                      className={clsx(
                          classes.menuButton,
                          open && classes.menuButtonHidden
                      )}
                  >
                      <MenuIcon />
                  </IconButton>
                  <CyVerseIcon className={classes.logo} />
                  <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      className={classes.title}
                  >
                      {projectName}
                  </Typography>
                  <IconButton color="inherit">
                      <Badge badgeContent={1} color="error">
                          <HelpChatIcon />
                      </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                      <Badge badgeContent={4} color="error">
                          <NotificationsIcon />
                      </Badge>
                  </IconButton>
                  <CyVerseServices />

                  <Link href="/account">
                      <Tooltip title="Account Info">
                          <UserMenu />
                      </Tooltip>
                  </Link>
              </Toolbar>
          </AppBar>
          <Drawer
              variant="permanent"
              classes={{
                  paper: clsx(
                      classes.drawerPaper,
                      !open && classes.drawerPaperClose
                  ),
              }}
              open={open}
          >
              <div className={classes.toolbarIcon}>
                  <IconButton onClick={handleDrawerClose}>
                      <ChevronLeftIcon className={classes.ChevronLeftIcon} />
                  </IconButton>
              </div>
              <Divider />
              <SideBar open={open} />
          </Drawer>
          <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              {/* <TopBar
                  title={props.title}
                  breadcrumbs={props.breadcrumbs}
                  back={props.back}
                  actions={props.actions}
              /> */}
              <Container maxWidth="lg" className={classes.container}>
                  {props.children}
                  <Box pt={10}>
                      <Copyright />
                  </Box>
              </Container>
          </main>
      </div>
  )
}
