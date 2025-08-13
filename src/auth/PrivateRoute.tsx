import { onAuthStateChanged } from 'firebase/auth';
import { type ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../services/fireBaseConnection';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps): ReactNode {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const userInfo = {
        uid: user?.uid,
        email: user?.email,
      };

      if (!user) {
        setLoading(false);
        setSigned(false);
        return;
      }

      setSigned(true);
      setLoading(false);

      localStorage.setItem('@userData', JSON.stringify(userInfo));
    });

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div />;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
