import {useState, useEffect } from 'react'
import {
    makeStyles,
    Grid,
    Box,
    Menu,
    MenuItem,
    Button,
    Typography,
    TextField,
    Divider,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Backdrop,
    CircularProgress,
    Tooltip,
} from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import Layout from '../components/Layout'
import ListenerCard from '../components/cards/ListenerCard'
import { getMenuItem } from '../menuItems'


const useStyles = makeStyles((theme) => ({
    paper: {
      padding: '3em',
      marginBottom: '2em',
    },
    input: {
      fontSize: '0.9rem',
      minWidth: '10rem'
    },
    input2: {
      fontSize: '0.9rem',
      minWidth: '20rem'
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 999,
      color: '#fff',
    },

  }))

const Listeners = (props) => {
    //  Needs to change the name to match the name of the page
    const classes = useStyles()
    const [busy, setBusy] = useState(false)
    const [listeners, setListeners] = useState(props.listeners)
    const [addCredentialType, setAddCredentialType] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClose = () => {
        setAnchorEl(null)
      }
    return (
        <Layout title="Listeners">
            <br />
            <Box display="flex" pb={1}>
                <Box flexGrow={1}>
                    <Typography variant="h6">My Listeners</Typography>
                </Box>
                <div>
                    <Button
                        aria-controls="listeners-menu"
                        aria-haspopup="true"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        color="primary"
                        variant="contained"
                        startIcon={<AddIcon />}
                    >
                        Add Listener
                    </Button>
                    <Menu
            id="credential-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose() || setAddCredentialType('email')}>
              Email
            </MenuItem>
            <MenuItem onClick={() => handleClose() || setAddCredentialType('webdav')}>
              WebDAV
            </MenuItem>
            <MenuItem onClick={() => handleClose() || setAddCredentialType('webhook')}>
              Webhook
            </MenuItem>
          </Menu>
                </div>
            </Box>
            <Divider />
            <Box mt={2}  >
                {listeners && listeners.length > 0 ? (
                 
                    <Grid
                    // make every card have the same size
                    container
                    spacing={2}
                    justify="flex-start"
                    alignItems="stretch"

                 



          

                        
                     
                    >
            
                        {/* // spacing={3}
                        // direction="row"
                        // jusitfy="flex-end"
                        // alignItems="stretch" */}
 
                                 
                    
                        {listeners.map((listener, index) => (
                            <Grid
                             
                                item
                                xs={12}
                                s={12}
                                md={4}
                                lg={4}
                                xl={3}
                                key={index}
                            >
                                <ListenerCard
                                    {...listener}
                                    //onChange={() => setChecked(enabled => !enabled)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>
                        You have not created a listener yet.
                    </Typography>
                )}
            </Box>
            {/* <ConfirmationDialog
        open={!!deleteId}
        title="Delete credential"
        handleClose={() => setDeleteId()}
        handleSubmit={() => deleteCredential(deleteId)}
      /> */}
            {addCredentialType && <AddCredentialDialog
        open={!!addCredentialType}
        type={addCredentialType}
        listeners = {listeners}
        handleClose={() => setAddCredentialType()}
        //handleSubmit={createCredential}
      />}
            <Backdrop className={classes.backdrop} open={busy}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
    )
}
const AddCredentialDialog = ({ open, type, listeners, handleClose, handleSubmit }) => {
    const [values, setValues] = useState({})
    const [isValid, setValid] = useState(false)
    const [hasConflict, setHasConflict] = useState(false)
    

    const handleChange = (e) => {
      console.log("Handle change", e.target)
      console.log(values)
      setValues({ 
        ...values, 
        [e.target.id || e.target.name]: e.target.value,
        type
      })
    }
  
    const validate = (values) => {
      if (type == 'email')
        return values['name'] && values['notify-interval'] && values['source-id'] && values['path'] && values['email']
      if (type == 'webdav')
        return values['name'] && values['notify-interval'] && values['url'] && values['username'] && values['password']
      if (type == 'webhook')
        return values['name'] && values['notify-interval'] && values['url'] && values['source-id'] && values['path'] && values['http-method']
    }
  
    useEffect(() => {
      setValid(validate(values))
      setHasConflict(listeners.some(c => c.name === values['name']))
    }, [values])
  
    return (
      <Dialog open={open} onClose={handleClose} maxWidth='sm'>
        <DialogTitle>Add listener</DialogTitle>
        <DialogContent>
          {type == 'email' && <AddEmailForm onChange={handleChange} />}
          {type == 'webdav' && <AddWebDavForm onChange={handleChange} />}
          {type == 'webhook' && <AddWebhookForm onChange={handleChange} />}

          <Box my={2} display='flex' sx={{color: 'red', height: '2em', maxWidth: '22em'}}>
            {hasConflict && <Typography>WARNING: a listener with this name already exists and will be overwritten</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            disabled={!isValid}
            color="primary" 
            variant="contained" 
            onClick={() => {
              handleSubmit(values)
              handleClose()
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const AddEmailForm = ({ onChange }) => {
    const classes = useStyles()
  
    return (
      <>
  
        <Box mb={2}
            sx={{
              width: '22em',
              maxWidth: '100%',
            }}>
              <Tooltip title="The name of the listener">
              <TextField
                id="name"
                label="Name"
                required={true}
                placeholder="My email listener"
                size="small"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  className: classes.input,
                }}
                onChange={onChange}
              />        
              </Tooltip>
        </Box>
        <Box mb={2}>
        <Tooltip title="The interval in seconds to check for new events">
          <TextField
            id="notify-interval"
            label="Notify interval"
            // Note: this values are not real, they are just for demo
            placeholder='100'
            size="small"
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
          </Tooltip>
        </Box>

        <Box mb={2}>
          <TextField
            id="source-id"
            label="Source ID"
            // Note: this values are not real, they are just for demo
            placeholder='cyverse'
            size="small"
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
        </Box>
        <Box mb={2}>
     
          {/* <TextField
            id="path"
            label="Path(s)"
            // Note: this values are not real, they are just for demo
            placeholder='/path/to/file'
            size="small"
            variant="outlined"
            required={true}
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          /> */}
          </Box>

                 

        <Box mb={2}>
          <Tooltip title="The email address to send notifications to">
              <TextField
                id="email"
                label="Email"
                // this value is optional
                placeholder="johndoe@example.com"
                size="small"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  className: classes.input,
                }}
                onChange={onChange}
              />
          </Tooltip>
        </Box>
                
                

      </>
    )
  }


  const AddWebDavForm = ({ onChange }) => {
    const classes = useStyles()
  
    return (
      <>
  
        <Box mb={2} 
            sx={{
            width: '30em',
            maxWidth: '100%',}}>

              <TextField
                id="name"
                label="Name"
                required={true}
                placeholder="My webdav listener"
                size="small"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  className: classes.input,
                }}
                onChange={onChange}
              />        
        </Box>
        <Box mb={2}>
          <Tooltip title="The interval in seconds to check for new events">
          <TextField
            id="notify-interval"
            label="Notify interval"
            // Note: this values are not real, they are just for demo
            placeholder='100'
            size="small"
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
          </Tooltip>
        </Box>
        <Box mb={2}>
          <TextField
            id="source-id"
            label="Source ID"
            // Note: this values are not real, they are just for demo
            placeholder='cyverse'
            size="small"
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            id="path"
            label="Path(s)"
            // Note: this values are not real, they are just for demo
            placeholder='/path/to/file'
            size="small"
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
        </Box>
        <Box mb={2}>
          <Tooltip title="The URL of the webdav server">
              <TextField
                id="url"
                label="URL"
                required={true}
                placeholder="https://www.example.com/dav/home/user/files"
                size="small"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  className: classes.input,
                }}
                onChange={onChange}
              />
          </Tooltip>

        </Box>
         {/* create two boxes inside a box, the first inside box is for the user name and the second for the password */}
         
        <Box id ="authentication-box" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          marginTop: '10px',
          marginBottom: '10px',
        }}>
          

         
          <Typography variant="subtitle1" gutterBottom>
            Authentication
          </Typography>
   
           <Box mb={2}>
              <TextField
                id="username"
                label="Username"
                required={true}
                placeholder="user"
                size="small"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  className: classes.input,
                }}
                onChange={onChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="password"
                label="Password"
                required={true}
                placeholder="password"
                size="small"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  className: classes.input,
                }}
                onChange={onChange}
              />
            </Box>
        </Box>






          


      </>
    )
  }

  const AddWebhookForm = ({ onChange }) => {
    const classes = useStyles()
    const methods = [
      {
        value: 'GET',
        label: 'GET',
      },
      {
        value: 'PUT',
        label: 'PUT',
      },
      {
        value: 'POST',
        label: 'POST',
      },
    ];
    return (
      <>
  
        <Box mb={2} 
            sx={{
            width: '30em',
            maxWidth: '100%',}}>

              <TextField
                id="name"
                label="Name"
                required={true}
                placeholder="My webhook listener"
                size="small"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  className: classes.input,
                }}
                onChange={onChange}
              />        
        </Box>
        <Box mb={2}>
          <Tooltip title="The interval in seconds to check for new events">
          <TextField
            id="notify-interval"
            label="Notify interval"
            // Note: this values are not real, they are just for demo
            placeholder='100'
            size="small"
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
          </Tooltip>
        </Box>

        <Box mb={2}>
          <TextField
            id="source-id"
            label="Source ID"
            // Note: this values are not real, they are just for demo
            placeholder='cyverse'
            size="small"
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            id="path"
            label="Path(s)"
            // Note: this values are not real, they are just for demo
            placeholder='/path/to/file'
            size="small"
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
        </Box>

        <Box mb={2}>      
              <TextField
                id="url"
                label="URL"
                required={true}
                placeholder="https://www.example.com/dav/home/user/files"
                size="small"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  className: classes.input,
                }}
                onChange={onChange}
              />        
        </Box>
         {/* create two boxes inside a box, the first inside box is for the user name and the second for the password */}
         
        <Box mb={2}>
        <Tooltip title="The HTTP method to use when sending the webhook">
        <TextField
          id="http-method"
          select
          label="HTTP method"
          onChange={onChange}
          SelectProps={{
            native: true,
          }}
          size="small"
          variant="outlined"
          fullWidth
        >
          {methods.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        </Tooltip>
        </Box>
          

       
      </>
    )
  }

  
export async function getServerSideProps({ req }) {
    //const credentials = await req.api.credentials()
    const listeners = [
        {
            name: 'e-Mail Listener',
            enabled: true,
            listenerID: 'ec324a19-336f-4e82-bc29-4157445110cd',
            listenerTypeID: 'email',
            paths: ['/iplant/home/terrycm/test'],
            sourceID: 'cyverse',
            username: 'terrycm',
            email: 'terrycruz@email.arizona.edu',
            url : '', 
            //create a comment
        },
        {
          name: 'webDAV Listener',
          enabled: false,
          listenerID: 'ec324a19-336f-4e82-bc29-4157445110cd',
          listenerTypeID: 'webdav',
          paths: ['/iplant/home/terrycm/test'],
          sourceID: 'cyverse',
          username: 'terrycm',
          email: 'terrycruz@email.arizona.edu',
          url : 'http://cyverse.org', 
          //create a comment
      },
      { name: 'webhook Listener',
        enabled: false,
        listenerID: 'ec324a19-336f-4e82-bc29-4157445110cd',
        listenerTypeID: 'webhook',
        paths: ['/iplant/home/terrycm/test'],
        sourceID: 'cyverse',
        username: 'terrycm',
        url: 'http://cyverse.org',
        method:'GET',
      },  
      
    ]
    return {
        props: {
            listeners,
        },
    }
}
export default Listeners
