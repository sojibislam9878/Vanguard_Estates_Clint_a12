import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import useRole from '../Hooks/useRole'
import Spinner from '../Components/Spinner'
const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <Spinner></Spinner>
  if (role === 'admin') return children
  return <Navigate to='/dashboard' />
}

export default AdminRoute

AdminRoute.propTypes = {
  children: PropTypes.element,
}