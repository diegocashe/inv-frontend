import { NavAppMenu } from '../common/navigation/NavAppMenu/NavAppMenu'

export const PrivateLayout = ({children , menuList}) => {
  return (
    <>
      <NavAppMenu menuList={menuList}>
        {children}
      </NavAppMenu>
    </>

  )
}
