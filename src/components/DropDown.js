import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Fab, List, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fabButton: {
    position: "absolute",
    margin: '0 auto',
    right: '5%',
    top: '10%',
  },
  }));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
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
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  return (
    <div>
      <Fab color="primary" aria-label="add" className={classes.fabButton} aria-controls="customized-menu"
      aria-haspopup="true"
      onClick={handleClick}>
      <AddIcon  />
      </Fab>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
          <ListItem>
            Option 1
          </ListItem>
          <ListItem>
            Option 2
          </ListItem>
          <ListItem>
            Option 3
          </ListItem>
        </List>
      </StyledMenu>
    </div>
  );
}
