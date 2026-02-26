import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '@/features/userSlice';
import { LoginRequest, RootState } from '@/types';
import { AppDispatch } from '@/store';
import LoginForm from '@/components/login/LoginForm';

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: RootState) => state.user);

    const onFinish = async (values: LoginRequest): Promise<void> => {
        dispatch(loginRequest(values));
    };

    return <LoginForm onSubmit={onFinish} loading={isLoading} />;
}
