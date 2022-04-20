import * as React from 'react';
import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Container, Paper, Stack, Typography, Avatar, Divider, Chip, Box, } from '@mui/material'
import { StyledPaper } from '../../common/Surfaces/Papers/Paper'
import IconButton from '@mui/material/IconButton';
import { ALLOCATIONS } from "../../../const/routes";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form';
import useFormFetch from '../../../hooks/useFormFetch';
import { GridAddIcon } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { LinearGradientLoader } from '../../common/Loaders/LinearGradientLoader';
import { useUser } from '../../../hooks/useUser';
import { useSnackbar } from '../../../hooks/useSnackbar';


const itemExample = {
  "id": -1,
  "serial": "",
  "active_code": "",
  "model_id": -1,
  "state_id": -1,
  "created": "",
  "modified": "",
  "model": {
    "id": -1,
    "code": "",
    "brand_id": -1,
    "item_type_id": -1,
    "description": "",
    "created": "",
    "modified": "",
    "brand": {
      "id": 1,
      "name": "",
      "website": "",
      "created": "",
      "modified": ""
    },
    "item_type": {
      "id": -1,
      "name": "",
      "description": "",
      "scope": "",
      "created": "",
      "modified": ""
    }
  }
}

const userExample = {
  "id": -1,
  "username": "",
  "active": false,
  "rol_id": -1,
  "created": "",
  "modified": "",
  "person": {
    "id": 1,
    "first_name": "",
    "last_name": "",
    "email": "",
    "nacional_identify": "",
    "position_id": -1,
    "user_id": -1,
    "department_headquarter_id": -1,
    "created": "",
    "modified": ""
  }
}

const steps = ['Items', 'Usuario', 'Ubicación', 'Confirmar asignación'];

const Item = ({ itemData, deleteItem }) => {
  if (itemData === undefined) return <>loading</>
  return (<>
    <Paper variant='outlined' sx={{ width: 'fit-content' }}>
      <Stack gap={1} direction='row' justifyContent={'center'}>
        <Stack gap={0.2} p={1}>
          <Typography variant='body'>{itemData.active_code}</Typography>
          <Typography variant='caption'>{itemData.model.item_type.name} {itemData.model.brand.name}</Typography>
          <Typography variant='caption'>{itemData.serial}</Typography>
        </Stack>
        <Stack justifyContent={'center'}>
          <Button aria-label="add" onClick={() => { deleteItem(itemData.id) }} color={'error'}>
            <DeleteIcon />
          </Button>
        </Stack>
      </Stack>
    </Paper>
  </>)
};

const SelectObjectsStep = ({ items, pushSelectedItem, deleteSelectedItem, selectedItems = [] }) => {

  const { control, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { selectedItem: itemExample } })

  const handleOnSubmit = (data) => {
    pushSelectedItem(data.selectedItem)
    reset()
  }

  if (items) {
    return (<>
      <Stack gap={2}>
        <Stack direction={'row'} alignItems={'center'}>
          {/* <Typography variant='h5' color='text.primary' >Selecciona los items a asignar</Typography> */}
          <Stack direction={'column'} sx={{ flexGrow: 1 }}>
            <Typography variant='h5'>Items</Typography>
            <Typography variant='caption'>Selecciona los items a asignar</Typography>
          </Stack>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Stack gap={2} direction={'row'}>
              <Controller
                name='selectedItem'
                control={control}
                rules={{
                  required: true,
                  validate: value => Object.keys(value).includes('id')
                }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id='selectedItem'
                    options={items || []}
                    disableClearable
                    getOptionLabel={option => {
                      if (option.active_code === undefined) return ''
                      return option.active_code
                    }}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Stack direction={'column'}>
                          <Typography variant='body'>{option.active_code}</Typography>
                          <Typography variant='caption'>{option.model.item_type.name} {option.model.brand.name}</Typography>
                        </Stack>
                      </Box>
                    )}
                    renderInput={(params) => {
                      return (
                        <TextField label='Items'
                          {...params}
                          fullWidth
                          inputProps={{
                            ...params.inputProps,
                          }}
                        // error={!!errors.department_id?.type}
                        // helperText={errors.department_id?.type === 'validate' && "El departamento es requerido"}
                        />)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, data) => { field.onChange(data) }}
                  />
                )
                }
              />
              <Button aria-label="add" type='submit'>
                <GridAddIcon />
              </Button>
            </Stack>
          </form>
        </Stack>
        <Container>
          <Stack flexWrap={'wrap'} direction={'row'} gap={1}>
            {(selectedItems && Array.isArray(selectedItems))
              && selectedItems.map(e => <Item key={e.id} itemData={e} deleteItem={deleteSelectedItem} />)}
          </Stack>
        </Container>

      </Stack>
    </>)

  }
  return <LinearGradientLoader />
}

const SelectUserStep = ({ users, setSelectedUser, selectedUser }) => {

  const { control, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { selectedUser: userExample } })

  const handleOnSubmit = (data) => {
    setSelectedUser(data.selectedUser)
  }

  if (users) {
    const { person } = selectedUser

    const fullname = (person) ? `${person.first_name} ${person.last_name}` : 'Sin Seleccionar'
    const position = (person) ? `${(person?.position) ? person?.position.name : 'No agregado'}` : ''
    const department = `${(person?.department_headquarter_id !== null && person?.department_headquarter_id !== -1)
      ? `${person.department_headquarter.headquarters.name} en ${person.department_headquarter.department.name}`
      : 'Sin detalles'}`
    return (<>
      <Stack gap={2}>
        <Stack direction={'row'} alignItems={'center'}>
          <Stack direction={'column'} sx={{ flexGrow: 1 }}>
            <Typography variant='h5'>Usuario</Typography>
            <Typography variant='caption'>Selecciona el usuario que recibirá</Typography>
          </Stack>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Stack gap={2} direction={'row'}>
              <Controller
                name='selectedUser'
                control={control}
                rules={{
                  required: true,
                  validate: value => Object.keys(value).includes('id')
                }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id='selectedUser'
                    options={users || []}
                    disableClearable
                    getOptionLabel={option => {
                      if (option.person.first_name === undefined || option.id === -1) return ''
                      return `${option.person.id} - ${option.person.first_name} ${option.person.last_name}`
                    }}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Stack direction={'column'}>
                          <Typography variant='body2'>CI: {option.person.nacional_identify || 'CI no diponible'}</Typography>
                          <Typography variant='caption'>{option.person.id} - {option.person.first_name} {option.person.last_name}</Typography>
                        </Stack>
                      </Box>
                    )}
                    renderInput={(params) => {
                      return (
                        <TextField label='Usuarios'
                          {...params}
                          fullWidth
                          inputProps={{
                            ...params.inputProps,
                          }}
                        // error={!!errors.department_id?.type}
                        // helperText={errors.department_id?.type === 'validate' && "El departamento es requerido"}
                        />)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, data) => { field.onChange(data) }}
                  />
                )
                }
              />
              <Button aria-label="add" type='submit'>
                <GridAddIcon />
              </Button>
            </Stack>
          </form>
        </Stack>
        <Container>{
          (selectedUser && selectedUser.id !== -1) &&
          <Stack gap={1}>
            <Box >
              <Avatar sx={{ width: 70, height: 70, margin: 'auto', color: 'text.primary', bgcolor: 'secondary.light' }} >{fullname.slice(0, 2).toLocaleUpperCase()}</Avatar>
            </Box>
            <Typography variant='h6' color='text.primary' >{fullname}</Typography>
            <Box>
              <Typography variant='body1' color='text.secondary' align='left'>Unidad</Typography>
              <Typography variant='body2' color='text.primary' align='left'>{department}</Typography>

            </Box>
            <Divider />
            <Box>
              <Typography variant='body1' color='text.secondary' align='left'>Cargo</Typography>
              <Typography variant='body2' color='text.primary' align='left'>{position}</Typography>
            </Box>
            <Divider />
          </Stack>}
        </Container>
      </Stack>
    </>)

  }
  return <LinearGradientLoader />
}

const UbicationStep = ({ ubication, setUbication }) => {

  const { control, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { ubication: '' } })

  const handleOnSubmit = (data) => {
    setUbication(data.ubication)
  }

  return (<>
    <Stack gap={2}>
      <Stack direction={'row'} alignItems={'center'}>
        {/* <Typography variant='h5' color='text.primary' >Selecciona los items a asignar</Typography> */}
        <Stack direction={'column'} sx={{ flexGrow: 1 }}>
          <Typography variant='h5'>Ubicacion</Typography>
          <Typography variant='caption'>Agregue una descripción del lugar donde se ubicará en item</Typography>
        </Stack>
      </Stack>
      <Container>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Stack gap={2} direction={'row'}>
            <Controller
              name='ubication'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField label='Descripcion de la ubicación'
                  multiline
                  fullWidth
                  {...field}
                  error={!!errors.ubication?.type}
                  helperText={errors.ubication?.type === 'validate' && "La ubicación es requerida"}
                />
              )}
            />
            <Button aria-label="add" type='submit'>
              <GridAddIcon />
            </Button>
          </Stack>
        </form>
      </Container>
      {(ubication) && <Typography variant='body1' color={'text.primary'}>Los objetos estaran ubicados en: {ubication}</Typography>}

    </Stack>
  </>)
}

const ConfirmStep = ({ selectedItems, selectedUser, deleteSelectedItem, ubication }) => {
  if (selectedItems && selectedUser) {
    const { person } = selectedUser
    const fullname = `${person.first_name} ${person.last_name}`
    const position = `${(person?.position) ? person?.position.name : 'No agregado'}`
    const department = `${(person?.department_headquarter_id && person?.department_headquarter_id !== -1)
      ? `${person.department_headquarter.headquarters.name} en ${person.department_headquarter.department.name}`
      : 'Sin detalles'}`
    return (<>
      <Typography variant='h5' color='text.primary'>Confirmar datos</Typography>
      <Typography variant='h6' color='text.secondary' >Usuario seleccionado</Typography>
      <Stack gap={2}>
        {(selectedUser && selectedUser?.id !== -1) ?
          <Stack gap={1}>
            <Box >
              <Avatar sx={{ width: 70, height: 70, margin: 'auto', color: 'text.primary', bgcolor: 'secondary.light' }} >{fullname.slice(0, 2).toLocaleUpperCase()}</Avatar>
            </Box>
            <Typography variant='h6' color='text.primary' >{fullname}</Typography>
            <Box>
              <Typography variant='body1' color='text.secondary' align='left'>Unidad</Typography>
              <Typography variant='body2' color='text.primary' align='left'>{department}</Typography>

            </Box>
            <Divider />
            <Box>
              <Typography variant='body1' color='text.secondary' align='left'>Cargo</Typography>
              <Typography variant='body2' color='text.primary' align='left'>{position}</Typography>
            </Box>
          </Stack>
          : <Typography variant='body1' color='text.primary'> No ha seleccionado un usuario</Typography>
        }
        <Divider />
        <Typography variant='h6' color='text.secondary' >Items a agregar</Typography>
        {(selectedItems && Array.isArray(selectedItems) && selectedItems.length > 0)
          ? <Container>
            <Stack flexWrap={'wrap'} direction={'row'} gap={1}>
              {selectedItems.map(e => <Item key={e.id} itemData={e} deleteItem={deleteSelectedItem} />)}
            </Stack>
          </Container>
          : <Typography variant='body1' >No agregó ningun item</Typography>}
        <Divider />
        <Stack>
          <Typography variant='h6' color='text.secondary' >Ubicación</Typography>
          <Typography variant='body1' color='text.primary'>{ubication || 'Ubicación no especificada'}</Typography>
        </Stack>
      </Stack>
    </>
    )
  }
  return <LinearGradientLoader />
}

export const AllocateView = () => {

  const { post, settings } = useFormFetch({ route: ALLOCATIONS })
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedUser, setSelectedUser] = useState(userExample)
  const [ubication, setUbication] = useState('')
  const { user } = useUser()
  const { items, users } = settings

  const { setSnackbar } = useSnackbar()

  const allocate = async () => {
    const body = {
      assignor: user,
      items: selectedItems,
      user: selectedUser,
      ubication: ubication
    }
    await post(body)
  }

  const pushSelectedItem = (data) => {
    console.log(data)
    setSelectedItems([...selectedItems, data])
  }

  const deleteSelectedItem = (id) => {
    setSelectedItems([...selectedItems.filter(e => e.id !== id)])
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      setIsLoading(true);
      allocate().then(e => {
        setIsLoading(false)
        setSelectedItems([])
        setSelectedUser(userExample)
        setSnackbar('Asignado sin problemas', true, 'success')
      })
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSelectUser = (user) => {
    setSelectedUser(user)
  }

  return (
    <Container sx={{ pt: 2 }}>
      <Stack gap={2}>
        <StyledPaper sx={{ padding: 2 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

        </StyledPaper>
        <StyledPaper sx={{ mb: 2 }}>
          <Stack gap={2} >
            <Container >

            </Container>

            {activeStep === steps.length ? (
              <React.Fragment>
                {(isLoading)
                  ? <>
                    <Typography variant='h5' color='text.primary'>Insertando datos</Typography>
                    <LinearGradientLoader />
                  </>
                  : <>
                    <Typography variant='h5' color='text.primary'>Asignado sin problemas</Typography>
                    <Typography variant='body1' color='text.secondary'>dale click a reiniciar para realizar otra asignación</Typography>
                  </>
                }

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <>
                {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep}</Typography> */}
                {(activeStep === 0) && <SelectObjectsStep items={items} pushSelectedItem={pushSelectedItem} selectedItems={selectedItems} deleteSelectedItem={deleteSelectedItem} />}
                {(activeStep === 1) && <SelectUserStep users={users} setSelectedUser={onSelectUser} selectedUser={selectedUser} />}
                {(activeStep === 2) && <UbicationStep ubication={ubication} setUbication={setUbication} />}
                {(activeStep === 3) && <ConfirmStep selectedItems={selectedItems} selectedUser={selectedUser} ubication={ubication} />}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    ATRAS
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} disabled={((activeStep === steps.length - 1) && (selectedItems.length === 0 || selectedUser.username === ''))}>
                    {activeStep === steps.length - 1 ? 'FINALIZAR' : 'SIGUIENTE'}
                  </Button>
                </Box>
              </>
            )}
          </Stack>
        </StyledPaper>

      </Stack>
    </Container>
  )
}
