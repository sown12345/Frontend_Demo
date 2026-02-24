import { useEffect } from 'react';
import { Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/types';
import { clearError } from '@/features/userSlice';

/**
 * Error Alert Component
 * Displays error messages from Redux state
 */
export default function ErrorAlert() {
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.user.error);

    useEffect(() => {
        if (error) {
            // Auto clear error after 5 seconds
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    if (!error) return null;

    return (
        <Alert
            message="Lỗi"
            description={error}
            type="error"
            closable
            onClose={() => dispatch(clearError())}
            style={{ marginBottom: 16 }}
        />
    );
}
