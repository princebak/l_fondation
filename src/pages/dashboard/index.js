// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button, Card, CardHeader } from '@mui/material'
import Loader from 'src/@core/components/Loader'

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [dashboardData, setDashboardData] = useState({
    balance: 0,
    totalSent: 0,
    totalReceived: 0,
    sevenLastRecharges: [],
    sevenLastDeposits: [],
    sevenLastWithdraws: [],
    sevenLastTransfers: []
  })

  /*  useEffect(() => {
    console.log('User State >> ', session?.user?.status)
    if (!session?.user?.status || session?.user?.status === 'created') {
      router.push('/verify_email')
    } else {
    }
  }, []) */

  const loadDashboardData = async () => {
    const response = await fetch('/api/dashboard?userId=' + session?.user?._id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const dashboardData = await response.json()
    console.log('dashboardData response >> ', dashboardData)

    setDashboardData(dashboardData)
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadDashboardData()
    }
    fetchData()
  }, [])

  return (
    <ApexChartWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {'Code du compte >> '} {dashboardData.accountCode ? <strong>{dashboardData.accountCode}</strong> : <Loader />}
        </div>
        <Button
          size='large'
          variant='contained'
          sx={{ height: 'fit-content', marginTop: '10px', marginRight: '10px' }}
          onClick={() => loadDashboardData()}
        >
          Actualiser
        </Button>
      </div>

      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy title={'Solde'} subTitle={'Total de votre solde'} amount={dashboardData?.balance} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Trophy title={'Montant envoyé'} subTitle={'Montant total envoyé'} amount={dashboardData?.totalSent} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Trophy title={'Montant reçu'} subTitle={'Montant total reçu'} amount={dashboardData?.totalReceived} />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries recharges={dashboardData?.sevenLastRecharges} />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw deposits={dashboardData?.sevenLastDeposits} withdraws={dashboardData?.sevenLastWithdraws} />
        </Grid>
        {/*   <Grid item xs={12}>
          <Card>
            <CardHeader title='7 Derniers transferts' titleTypographyProps={{ variant: 'h6' }} />
            <Table transfers={dashboardData?.sevenLastTransfers} />
          </Card>
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard

{
  /* <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper> */
}
