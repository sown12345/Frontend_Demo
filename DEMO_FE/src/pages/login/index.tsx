import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '@/features/userSlice';
import { history } from 'umi';
import LoginForm from '@/components/login/LoginForm';

export default function Login() {
    const dispatch = useDispatch();

    const onFinish = async (values: any) => {
        const result: any = await dispatch(login(values));

        if (login.fulfilled.match(result)) {
            message.success('Đăng nhập thành công');
            history.push('/profile');
        } else {
            message.error(result.payload as string);
        }
    };

    return <LoginForm onSubmit={onFinish} />;
}
