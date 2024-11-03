import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('emailOrPhone');
      // const userRole = localStorage.getItem('userRole'); 

      if (isLoggedIn) {
        setIsUser(true);
      } else {
        navigate('/');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return isUser ? children : null;
};

export default ProtectRoute;
