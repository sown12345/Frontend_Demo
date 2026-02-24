import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { register } from '@/features/userSlice';
import { history } from 'umi';
import RegisterForm from '@/components/register/RegisterForm';

export default function Register() {
    const dispatch = useDispatch();

    const onFinish = async (values: any) => {
        const result: any = await dispatch(register(values));

        if (register.fulfilled.match(result)) {
            message.success('Đăng ký thành công');
            history.push('/login');
        } else {
            message.error(result.payload as string);
        }
    };

    return <RegisterForm onSubmit={onFinish} />;
}
