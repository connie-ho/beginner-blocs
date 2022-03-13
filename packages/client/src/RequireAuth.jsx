import { useContext } from 'react';
import { UserContext } from '../src/contexts/user-context';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../src/components/common/Loading';
function RequireAuth({ children }) {
  const { account, accLoading } = useContext(UserContext);
  let location = useLocation();

  if (accLoading) {
    return <Loading />;
  }

  if (account) {
    return children;
  }

  return <Navigate to="/404" state={{ from: location }} replace />;
}

export default RequireAuth;
