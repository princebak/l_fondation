// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider from '@mui/material/Divider'
import { Avatar } from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const depositData = [
  {
    logoWidth: 28,
    logoHeight: 29,
    amount: '+$4,650',
    subtitle: 'Sell UI Kit',
    title: 'Gumroad Account',
    logo: '/images/logos/gumroad.png'
  },
  {
    logoWidth: 38,
    logoHeight: 38,
    amount: '+$92,705',
    title: 'Mastercard',
    subtitle: 'Wallet deposit',
    logo: '/images/logos/mastercard-label.png'
  },
  {
    logoWidth: 20,
    logoHeight: 28,
    amount: '+$957',
    title: 'Stripe Account',
    subtitle: 'iOS Application',
    logo: '/images/logos/stripe.png'
  },
  {
    logoWidth: 34,
    logoHeight: 32,
    amount: '+$6,837',
    title: 'American Bank',
    subtitle: 'Bank Transfer',
    logo: '/images/logos/american-bank.png'
  },
  {
    logoWidth: 33,
    logoHeight: 22,
    amount: '+$446',
    title: 'Bank Account',
    subtitle: 'Wallet deposit',
    logo: '/images/logos/citi-bank.png'
  }
]

const withdrawData = [
  {
    logoWidth: 29,
    logoHeight: 30,
    amount: '-$145',
    title: 'Google Adsense',
    subtitle: 'Paypal deposit',
    logo: '/images/logos/google.png'
  },
  {
    logoWidth: 34,
    logoHeight: 34,
    amount: '-$1870',
    title: 'Github Enterprise',
    logo: '/images/logos/github.png',
    subtitle: 'Security & compliance'
  },
  {
    logoWidth: 30,
    logoHeight: 30,
    amount: '-$450',
    title: 'Upgrade Slack Plan',
    subtitle: 'Debit card deposit',
    logo: '/images/logos/slack.png'
  },
  {
    logoWidth: 30,
    logoHeight: 30,
    amount: '-$540',
    title: 'Digital Ocean',
    subtitle: 'Cloud Hosting',
    logo: '/images/logos/digital-ocean.png'
  },
  {
    logoWidth: 36,
    logoHeight: 21,
    amount: '-$21',
    title: 'AWS Account',
    logo: '/images/logos/aws.png',
    subtitle: 'Choosing a Cloud Platform'
  }
]

// Styled Divider component
const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(5, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const DepositWithdraw = ({ deposits, withdraws }) => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='7 Derniers Dépôts'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}

          /*  action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }} */
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {deposits?.length > 0 ? (
            deposits.map((deposit, index) => {
              return (
                <Box
                  key={deposit._id}
                  sx={{ display: 'flex', alignItems: 'center', mb: index !== depositData.length - 1 ? 6 : 0 }}
                >
                  <div style={{ display: 'flex', width: '100%' }}>
                    <Avatar
                      sx={{
                        width: 38,
                        height: 38,
                        marginRight: 3,
                        fontSize: '1rem',
                        color: 'common.white',
                        backgroundColor: deposit.category === 'IN' ? `success.main` : `error.main`
                      }}
                    >
                      {deposit.category === 'IN' ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                    </Avatar>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                          sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}
                        >{`$${deposit.amount}`}</Typography>
                        <Typography
                          variant='caption'
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.5,
                            color: deposit.category === 'IN' ? 'success.main' : 'error.main'
                          }}
                        >
                          {deposit.code}
                        </Typography>
                      </div>
                      <div>
                        <span style={{ fontSize: '15px' }}> {new Date(deposit.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Box>
              )
            })
          ) : (
            <h3>Il n'y as encore des dépôts.</h3>
          )}
        </CardContent>
      </Box>

      <Divider flexItem />

      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='7 Derniers retraits'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}

          /* action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }} */
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {withdraws?.length > 0 ? (
            withdraws.map((withdraw, index) => {
              return (
                <Box
                  key={item.title}
                  sx={{ display: 'flex', alignItems: 'center', mb: index !== depositData.length - 1 ? 6 : 0 }}
                >
                  <div style={{ display: 'flex', width: '100%' }}>
                    <Avatar
                      sx={{
                        width: 38,
                        height: 38,
                        marginRight: 3,
                        fontSize: '1rem',
                        color: 'common.white',
                        backgroundColor: withdraw.category === 'IN' ? `success.main` : `error.main`
                      }}
                    >
                      {withdraw.category === 'IN' ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                    </Avatar>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                          sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}
                        >{`$${withdraw.amount}`}</Typography>
                        <Typography
                          variant='caption'
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.5,
                            color: withdraw.category === 'IN' ? 'success.main' : 'error.main'
                          }}
                        >
                          {withdraw.code}
                        </Typography>
                      </div>
                      <div>
                        <span style={{ fontSize: '15px' }}> {new Date(withdraw.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Box>
              )
            })
          ) : (
            <h3>Il n'y as encore des retraits.</h3>
          )}
        </CardContent>
      </Box>
    </Card>
  )
}

export default DepositWithdraw
