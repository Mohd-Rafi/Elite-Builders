import { isTokenValid, isRoleCheck } from '../../utilities/index.js';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ role, path }) => {
  if (isTokenValid() && isRoleCheck(role)) {
    return <Outlet />;
  } else {
    return <Navigate to={path} />;
  }
};

export default PrivateRoute;
