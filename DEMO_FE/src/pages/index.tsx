import { useEffect } from 'react';
import { history } from 'umi';
import { getToken } from '@/utils/auth';

export default function Home() {
  useEffect(() => {
    const token = getToken(); // Đọc từ cookie thay vì localStorage

    if (token) {
      history.push('/profile');
    } else {
      history.push('/login');
    }
  }, []);

  return null;
}
