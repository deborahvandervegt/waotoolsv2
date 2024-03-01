// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import EcommerceNewVisitors from 'src/views/dashboards/ecommerce/EcommerceNewVisitors'
import EcommerceWebsiteStatistics from 'src/views/dashboards/ecommerce/EcommerceWebsiteStatistics'
import AnalyticsTransactionsCard from 'src/views/dashboards/analytics/AnalyticsTransactionsCard'
import TotalPercentCard from 'src/views/dashboard/TotalPercentCard'
import TotalBeastChart from 'src/views/dashboard/TotalBeastTalentsChart'
import TotalColossusChart from 'src/views/dashboard/TotalColossusChart'
import TotalMysticCollegeChart from 'src/views/dashboard/TotalMysticCollegeChart'
import TotalHighCollegeChart from 'src/views/dashboard/TotalHighCollegeChart'
import EquipmentChart from 'src/views/dashboard/EquipmentChart'
import UserInfoChart from 'src/views/dashboard/UserInfoChart'
import CastleDetailsChart from 'src/views/dashboard/CastleDetailsChart'
import SpeedChart from 'src/views/dashboard/SpeedsChart'
import TotalPlannerChart from 'src/views/dashboard/TotalPlannerChart'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <UserInfoChart />
        </Grid>
        <Grid item xs={12} md={8}>
          <CastleDetailsChart />
        </Grid>
        <Grid item xs={12} md={4} sx={{ order: 0 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <TotalBeastChart />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TotalColossusChart />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TotalHighCollegeChart />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TotalPlannerChart />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalMysticCollegeChart />
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ order: 0 }}>
          <SpeedChart />
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ order: 0 }}>
          <EquipmentChart />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
