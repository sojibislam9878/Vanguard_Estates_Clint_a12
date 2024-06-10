
import { Navigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import useRole from '../Hooks/useRole';
import PropTypes from 'prop-types'
const MemberRoutes = ({children}) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <Spinner />
    if (role === 'member') return children
    return <Navigate to='/dashboard' />
    
}
export default MemberRoutes;
MemberRoutes.propTypes = {
    children: PropTypes.element,
  }