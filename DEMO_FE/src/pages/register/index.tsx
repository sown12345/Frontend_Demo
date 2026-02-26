import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '@/features/userSlice';
import { RegisterRequest, RootState } from '@/types';
import { AppDispatch } from '@/store';
import RegisterForm from '@/components/register/RegisterForm';

export default function Register() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: RootState) => state.user);

    const onFinish = async (values: RegisterRequest): Promise<void> => {
        dispatch(registerRequest(values));
    };

    return <RegisterForm onSubmit={onFinish} loading={isLoading} />;
}
