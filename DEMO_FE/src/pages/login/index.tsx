import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/features/userSlice';
import { history } from 'umi';
import { LoginRequest, RootState } from '@/types';
import { AppDispatch } from '@/store';
import LoginForm from '@/components/login/LoginForm';

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: RootState) => state.user);

    const onFinish = async (values: LoginRequest) => {
        const result = await dispatch(login(values));

        if (login.fulfilled.match(result)) {
            message.success('Đăng nhập thành công');
            history.push('/profile');
        }
    };

    return <LoginForm onSubmit={onFinish} loading={isLoading} />;
}
