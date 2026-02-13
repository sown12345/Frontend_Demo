import { useEffect } from 'react';
import { history } from 'umi';

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      history.push('/profile');
    } else {
      history.push('/login');
    }
  }, []);

  return null;
}
