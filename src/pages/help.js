import { Grid, Box, Typography, Divider, Link } from '@material-ui/core'
import Layout from '../components/Layout'
import HelpCard from '../components/cards/HelpCard'
import { getMenuItem } from '../menuItems'

const Help = () => {
    const help = getMenuItem('Help')
    const supportItems = help.items.filter(item => item.category == 'support')
    const learnItems = help.items.filter(item => item.category == 'learn')

    return (
        <Layout title="Help">
            <Box mt={4}>
                <Typography variant="h6">Learn</Typography>
                <Divider />
                <br />
                <Grid container spacing={4}>
                    {learnItems.map((item, index) => (
                        <Grid item md={6} s={12} xs={12} lg={3} xl={3} key={index}>
                            <Link underline="none" href={item.path}>
                                <HelpCard title={item.label} icon={item.icon} description={item.description}/>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box mt={4}>
                <Typography variant="h6" mt={4}>
                    Support
                </Typography>
                <Divider />
                <br />
                <Grid container spacing={4}>
                    {supportItems.map((item, index) => (
                        <Grid item md={6} s={12} xs={12} lg={3} xl={3} key={index}>
                            <Link underline="none" href={item.path}>
                                <HelpCard title={item.label} description={item.description} icon={item.icon}/>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Layout>
    )
}

export default Help
