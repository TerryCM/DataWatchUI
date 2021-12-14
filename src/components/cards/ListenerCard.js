import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    Button,
} from '@material-ui/core'
import {Delete as DeleteIcon} from '@material-ui/icons'
import { makeStyles,alpha,styled } from '@material-ui/core/styles'
import { pink , green} from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch'





const ListenerSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));




const useStyles = makeStyles(theme => ({
    
    
    rose: {
        color: 'theme.palette.rose.main',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    title: {
        lineHeight: '1.1',
        fontSize: '1.4em',
    },
    cardActions: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    
    }
}))
    
const ListenerCardContents = ({ email, url, listenerTypeID,enabled,paths,method }) => {
    if (listenerTypeID === 'email') {
        return (
            <Typography variant="caption">
                Number of paths: {paths.length}
                <br />
                e-mail: {email}
                <br />
            </Typography>
        )
    } else if(listenerTypeID === 'webdav') {
        return (
            <Typography variant="caption">
                Number of paths: {paths.length}
                <br />
                URL: {url}
                <br />
            </Typography>
        )
    } else {
        return (
        <Typography variant="caption">
            Number of paths: {paths.length}
            <br />
            URL: {url}
            <br />
            Method: {method}
            <br />
        </Typography>
        )

    }
    
}


const ListenerSwitchContents = ({enabled}) => {

    const [checked, setChecked] = React.useState(enabled);
    const handleChange = (event) => {
    setChecked(event.target.checked)
  }
    return (
        <ListenerSwitch
            checked={checked}
            onChange={handleChange}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
     
        
    )
}





const ListenerCard = ({ enabled, name, listenerTypeID, email, url, paths,method}) => {
   

    const classes = useStyles()
    return (
        <Card>
            <CardHeader
                
                className={classes.headers}
                avatar={<Avatar>ST</Avatar>}
                title = {name}
                titleTypographyProps={{ className: classes.title }}
                subheader={
                    <Typography
                    variant="caption">
            
                        Type: {listenerTypeID}

    
                        {/* Created: {created_at} */}
                    </Typography>
                }
            />


            <CardContent>
        
                <ListenerCardContents
                    email={email}
                    url={url}
                    listenerTypeID={listenerTypeID}
                    paths={paths}
                    method={method}
                    
                />
                
            </CardContent>

            <CardActions className={classes.cardActions}>
            <Button
                color="inherit"
                className={classes.rose}
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => {}}
            >
                Delete
               
                
            </Button>
            
                
            <ListenerSwitchContents enabled={enabled}/>
            
            </CardActions>

        </Card>
    )
}


export default ListenerCard
