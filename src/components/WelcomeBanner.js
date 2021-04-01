import { makeStyles, Paper, Grid, Box, Typography } from '@material-ui/core'
import BannerImage from '../assets/bannerImage'

const useStyles = makeStyles(theme => {
    return {
        root: {
            '& .MuiGrid-item': {
                padding: '0px',
            },
        },
        button: {
            margin: theme.spacing(1),
        },
        bannerImage: {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        padding: {
            padding: '4%',
            [theme.breakpoints.down('md')]: {
                padding: '3%',
            },
            [theme.breakpoints.down('sm')]: {
                padding: '2%',
            },
        },

        paper: {
            padding: theme.spacing(3),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        root: {
            flexGrow: 1,
        },
    }
})

export default function WelcomeBanner() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Box mt={4}>
                <Paper elevation={3} className={classes.paper}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={4}
                    >
                        <Grid
                            item
                            sm={12}
                            md={5}
                            lg={5}
                            className={classes.bannerImage}
                        >
                            <BannerImage />
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={6}>
                            <div className={classes.padding}>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    color="primary"
                                >
                                    Welcome Banner
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}