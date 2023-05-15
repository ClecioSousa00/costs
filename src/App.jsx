
import './styles/elements/base.css'
import './styles/generic/reset.css'
import './styles/settings/colors.css'
import { AppRoutes } from './routes/routes'
import { Header } from './components/Header'
import { BrowserRouter } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  )
}
