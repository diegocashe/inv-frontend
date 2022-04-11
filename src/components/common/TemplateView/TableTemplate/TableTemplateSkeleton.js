import { Skeleton, Stack } from '@mui/material'
import { Box } from '@mui/system'

export const TableTemplateSkeleton = () => {
  return (
    <Box padding={'2rem'} overflow='hidden' sx={{
      height: ['calc(100vh - 220px)']
    }} >
      <Stack flexDirection='column'>
        <Stack gap={2} flexDirection='row' >
          <Box flexGrow={1}>
            <Skeleton height={'5rem'} />
          </Box>
          <Box flexGrow={0.2}>
            <Skeleton height={'5rem'} />
          </Box>
        </Stack>
        <Box flexGrow={1}>
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: '100%' }} />
          </Skeleton>

        </Box>


      </Stack>
    </Box>
  )
}
