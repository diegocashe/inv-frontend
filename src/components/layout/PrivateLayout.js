import { NavAppMenu } from '../common/navigation/NavAppMenu/NavAppMenu'

export const PrivateLayout = ({children}) => {
  return (
    <>
      <NavAppMenu>
        {children}
      </NavAppMenu>
    </>

  )
}
