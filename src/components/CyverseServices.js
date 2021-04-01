import React from 'react'
import { makeStyles, withStyles, IconButton, Menu, MenuItem, List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core'
import { CyVerseIcon, BisqueIcon, DNASubwayIcon, DataStoreIcon, DCIcon, DEIcon, UPortalIcon } from "./icons"

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
    link: {
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
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
                <CyVerseIcon />
            </IconButton>
            <StyledMenu
                //id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <List component="nav" aria-label="cyverse service launcher">
                    <a
                        className={classes.link}
                        href="https://user.cyverse.org/"
                        target="_blank"
                    >
                        <ListItem button dense>
                            <ListItemIcon>
                                <UPortalIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary="User Portal" />
                        </ListItem>
                    </a>
                    <a
                        className={classes.link}
                        href="https://de.cyverse.org/de/"
                        target="_blank"
                    >
                        <ListItem button dense>
                            <ListItemIcon>
                                <DEIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Discovery Environment" />
                        </ListItem>
                    </a>
                    <a
                        className={classes.link}
                        href="https://de.cyverse.org/de"
                        target="_blank"
                    >
                        <ListItem button dense>
                            <ListItemIcon>
                                <DataStoreIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Data Store" />
                        </ListItem>
                    </a>
                    <a
                        className={classes.link}
                        href="https://datacommons.cyverse.org/"
                        target="_blank"
                    >
                        <ListItem button dense>
                            <ListItemIcon>
                                <DCIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Data Commons" />
                        </ListItem>
                    </a>
                    <a
                        className={classes.link}
                        href="https://bisque.cyverse.org/client_service/"
                        target="_blank"
                    >
                        <ListItem button dense>
                            <ListItemIcon>
                                <BisqueIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary="BisQue" />
                        </ListItem>
                    </a>
                    <a
                        className={classes.link}
                        href="https://dnasubway.cyverse.org/"
                        target="_blank"
                    >
                        <ListItem button dense>
                            <ListItemIcon>
                                <DNASubwayIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary="DNA Subway" />
                        </ListItem>
                    </a>
                </List>
            </StyledMenu>
        </div>
    )
}
