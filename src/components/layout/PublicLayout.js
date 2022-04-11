import { Box } from '@mui/material'
import { Nav } from '../common/navigation/Nav'

export const PublicLayout = ({ children }) => {
  return (
    <>
      <Nav />
      <Box
        width={'100%'}
        sx={{ height: ['calc(100vh - 56px)', 'calc(100vh - 64px)']}}
        backgroundColor={'contrast.main'}
      >
        {children}
      </Box>
    </>
  )
}
