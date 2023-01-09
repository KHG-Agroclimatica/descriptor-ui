import List from 'devextreme-react/list'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import AppRouter from '../../router/AppRouter'

const navigation = [
  { id: 1, text: 'Fields', icon: 'message', path: '/field' },
  { id: 2, text: 'Descriptors', icon: 'check', path: '/descriptor' },
  { id: 3, text: 'Items', icon: 'trash', path: '/item' },
]

const NavigationList = () => {
  const onItemClick = (path: string = '/') => {
    AppRouter.navigate(path);
  }

  return (
    <List
      items={navigation}
      width={200}
      selectionMode="single"
      onItemClick={(item) => onItemClick(item.itemData?.path)}
    />
  )
}

export default NavigationList
