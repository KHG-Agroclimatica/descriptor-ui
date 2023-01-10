import List from 'devextreme-react/list'
import AppRouter from '../../router/AppRouter'

const navigation = [
  { id: 3, text: 'Classifications', icon: 'bookmark', path: '/classification' },
  { id: 1, text: 'Fields', icon: 'dragvertical', path: '/field' },
  { id: 2, text: 'Descriptors', icon: 'folder', path: '/descriptor' },
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
