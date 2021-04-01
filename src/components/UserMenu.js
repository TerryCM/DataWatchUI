import { withStyles, makeStyles, IconButton, Menu, MenuItem, Typography, Grid, Avatar,Button, Divider, Paper } from '@material-ui/core'
import { AccountCircle as PersonIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    fabButton: {
        position: 'absolute',
        margin: '0 auto',
        right: '5%',
        top: '10%',
    },
    menuIcon: {
        width: '30px',
        height: '30px',
    },
    paper: {
        padding: theme.spacing(1),
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(0.2),
            backgroundColor: theme.palette.info.main,
        },
    },
    typography: {
        color: theme.palette.info.main,
        [theme.breakpoints.down("xs")]: {
            color: theme.palette.info.contrastText,
        },
    },
    divider: {
        margin: theme.spacing(1),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(0.5),
        },
    },
    button: {
        color: theme.palette.primary.main,
        [theme.breakpoints.down("xs")]: {
            color: theme.palette.info.contrastText,
        },
    },
}))

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem)

export default function CyVerseServices() {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const classes = useStyles()

    return (
        <div>
            <IconButton
                color="inherit"
                aria-label="add"
                //className={classes.fabButton}
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <PersonIcon />
            </IconButton>
            <StyledMenu
                //id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Paper elevation={0}className={classes.paper}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Avatar>
                            MW
                        </Avatar>
                        <Grid item>
                            <Typography
                                variant="caption"
                                className={classes.typography}
                            >
                                name
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="caption"
                                className={classes.typography}
                            >
                                username
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="caption"
                                className={classes.typography}
                            >
                                email
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                className={classes.button}
                                size="small"
                            >
                                Manage account
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item>
                            <Button
                                variant="outlined"
                                className={classes.button}
                                size="small"
                            >
                                logout
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item>
                            <Typography
                                variant="caption"
                                className={classes.typography}
                            >
                                policies
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="caption">•</Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="caption"
                                className={classes.typography}
                            >
                                about
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </StyledMenu>
        </div>
    )
}
