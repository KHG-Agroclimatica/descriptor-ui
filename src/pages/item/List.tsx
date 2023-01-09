import Datagrid from './components/Datagrid'
import { useDescriptorContext } from './context/DescriptorContext';

const List = () => {
  const context = useDescriptorContext();
  
  return (
      <Datagrid descriptorId={context.id}/>
  )
}

export default List