import './App.css'
import AppRouter from './router/AppRouter';
import { RouterProvider } from 'react-router-dom';
import SideNavigation from './layouts/SideNavigation';

function App() {
  
  return (
    <SideNavigation>
      <RouterProvider router={AppRouter} />
    </SideNavigation>
  )
}

export default App
