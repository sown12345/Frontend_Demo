import { Form, Input, Button, Card } from 'antd';
import { ReactNode } from 'react';
import { LoginRequest } from '@/types';
import styles from './LoginForm.less';

interface LoginFormProps {
    onSubmit: (values: LoginRequest) => Promise<void>;
    loading?: boolean;
    children?: ReactNode;
}

export default function LoginForm({ onSubmit, loading = false, children }: LoginFormProps) {
    const [form] = Form.useForm<LoginRequest>();

    const handleSubmit = async (values: LoginRequest) => {
        await onSubmit(values);
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.title}>Đăng nhập</div>

                <Form layout="vertical" onFinish={handleSubmit} form={form} style={{ width: '100%' }}>
                    <Form.Item
                        name="username"
                        label="Tên đăng nhập"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block className={styles.button} loading={loading}>
                        Đăng nhập
                    </Button>
                </Form>

                {children}
            </Card>
        </div>
    );
}
