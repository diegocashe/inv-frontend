import { AppBar, Stack, styled, Toolbar, Typography, Button, ButtonBase, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export const Nav = () => {

	const Logo = styled(ButtonBase)(({ theme }) => ({
		...theme.typography.h5,
	}))

	return (
		<AppBar position='sticky' color='transparent' sx={{ boxShadow: 'none' }} >
			<Toolbar style={{ display: 'flex' }}>
				<Box sx={{flexGrow:1}}>
					<Logo LinkComponent={Link} to='/' >Uork</Logo>
				</Box>
				<Stack direction={'row'} spacing={2}>

					<Button LinkComponent={Link} to='/about' color='primary' size='small' >Precios</Button>
					<Button LinkComponent={Link} to='/about' color='primary' size='small' >Sobre nosotros</Button>
					<Button LinkComponent={Link} to='/singin' color='primary' size='small' >Registrate</Button>
					<Button LinkComponent={Link} to='/login' variant='contained' color='primary' size='small' >Ingresa</Button>

				</Stack>
			</Toolbar>
		</AppBar>
	)
}
