import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/features/userSlice';
import { history } from 'umi';
import { RegisterRequest, RootState } from '@/types';
import { AppDispatch } from '@/store';
import RegisterForm from '@/components/register/RegisterForm';

export default function Register() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: RootState) => state.user);

    const onFinish = async (values: RegisterRequest) => {
        const result = await dispatch(register(values));

        if (register.fulfilled.match(result)) {
            message.success('Đăng ký thành công');
            history.push('/login');
        }
    };

    return <RegisterForm onSubmit={onFinish} loading={isLoading} />;
}
