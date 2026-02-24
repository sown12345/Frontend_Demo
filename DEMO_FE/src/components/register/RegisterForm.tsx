import { Form, Input, Button, Select, Card } from 'antd';
import { ReactNode } from 'react';
import { RegisterRequest } from '@/types';
import styles from './RegisterForm.less';

interface RegisterFormProps {
    onSubmit: (values: RegisterRequest) => Promise<void>;
    loading?: boolean;
    children?: ReactNode;
}

export default function RegisterForm({ onSubmit, loading = false, children }: RegisterFormProps) {
    const [form] = Form.useForm<RegisterRequest>();

    const handleSubmit = async (values: RegisterRequest) => {
        await onSubmit(values);
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.title}>Tạo tài khoản</div>

                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Form.Item
                        name="username"
                        label="Tên đăng nhập"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên đăng nhập' },
                            { min: 3, message: 'Tên đăng nhập tối thiểu 3 ký tự' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: 'Chỉ được chứa chữ, số và _' },
                        ]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu' },
                            { min: 6, message: 'Tối thiểu 6 ký tự' },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item name="phone" label="Số điện thoại">
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item name="gender" label="Giới tính">
                        <Select allowClear placeholder="Chọn giới tính">
                            <Select.Option value="male">Nam</Select.Option>
                            <Select.Option value="female">Nữ</Select.Option>
                            <Select.Option value="other">Khác</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="address" label="Địa chỉ">
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className={styles.button}
                        loading={loading}
                    >
                        Đăng ký
                    </Button>
                </Form>

                {children}
            </Card>
        </div>
    );
}
