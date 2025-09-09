import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const RedirectHandler = () => {
  const { code } = useParams();

  useEffect(() => {
    window.location.href = `http://localhost:5000/s/${code}`;
  }, [code]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;