// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { ChevronLeft, ChevronRight } from 'mdi-material-ui'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const data = [
  {
    sales: '894k',
    trendDir: 'up',
    subtitle: 'USA',
    title: '$8,656k',
    avatarText: 'US',
    trendNumber: '25.8%',
    avatarColor: 'success',
    trend: <ChevronLeft sx={{ color: 'success.main', fontWeight: 600 }} />
  },
  {
    sales: '645k',
    subtitle: 'UK',
    trendDir: 'down',
    title: '$2,415k',
    avatarText: 'UK',
    trendNumber: '6.2%',
    avatarColor: 'error',
    trend: <ChevronRight sx={{ color: 'error.main', fontWeight: 600 }} />
  }
]

const SalesByCountries = ({ recharges }) => {
  return (
    <Card>
      <CardHeader
        title='7 Derniers Recharges'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}

        /* action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        } */
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {recharges?.length > 0 ? (
          recharges?.map((recharge, index) => {
            return (
              <Box
                key={recharge._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: '20px'
                }}
              >
                <div style={{ display: 'flex', width: '100%' }}>
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      marginRight: 3,
                      fontSize: '1rem',
                      color: 'common.white',
                      backgroundColor: recharge.category === 'IN' ? `success.main` : `error.main`
                    }}
                  >
                    {recharge.category === 'IN' ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography
                        sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}
                      >{`$${recharge.amount}`}</Typography>
                      <Typography
                        variant='caption'
                        sx={{
                          fontWeight: 600,
                          lineHeight: 1.5,
                          color: recharge.category === 'IN' ? 'success.main' : 'error.main'
                        }}
                      >
                        {recharge.code}
                      </Typography>
                    </div>
                    <div>
                      <span style={{ fontSize: '15px' }}> {new Date(recharge.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                {/*   <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  marginRight: 3,
                  fontSize: '1rem',
                  color: 'common.white',
                  backgroundColor: recharge.category === 'IN' ? `success.main` : `error.main`
                }}
              >
                {recharge.category === 'IN' ? <ArrowBackIcon /> : <ArrowForwardIcon />}
              </Avatar>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >


                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography
                      sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}
                    >{`$${recharge.amount}`}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {new Date(recharge.createdAt).toLocaleString()}
                      <Typography
                        variant='caption'
                        sx={{
                          fontWeight: 600,
                          lineHeight: 1.5,
                          color: recharge.category === 'IN' ? 'success.main' : 'error.main'
                        }}
                      >
                        {recharge.code}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box> */}
              </Box>
            )
          })
        ) : (
          <h3>Il n'y as encore des recharges.</h3>
        )}
      </CardContent>
    </Card>
  )
}

export default SalesByCountries
