import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setLastLocation } from 'utils/store';
import { GuestRouter } from './elements/guest-router';
import { GuestRouterPath } from './router-path';

export function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname != GuestRouterPath.signIn) {
      setLastLocation(`${location.pathname}?${location.search}`);
    }
  }, [location.pathname]);

  return <GuestRouter />;
}
