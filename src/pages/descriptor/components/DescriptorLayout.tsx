import { Outlet } from 'react-router-dom'
import MainSectionLayout from '../../../layouts/MainSectionLayout'

const DescriptorLayout = () => {
  return (
    <MainSectionLayout title='Descriptors'>
      <Outlet/>
    </MainSectionLayout>
  )
}

export default DescriptorLayout