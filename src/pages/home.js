import { Box, Typography, Divider } from "@material-ui/core";
import { getMenuItem } from "../menuItems";

import Layout from "../components/Layout";
import WelcomeBanner from "../components/WelcomeBanner";

const Page = (props) => {
  const menuItem = getMenuItem("Home");
  return (
      <Layout title="Home">
          <WelcomeBanner />
          <Box mt={4}>
              <Typography variant="h6">Content</Typography>
              <Divider />
          </Box>
      </Layout>
  )
};
export default Page;
