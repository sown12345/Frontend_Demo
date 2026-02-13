import { Form, Input, Button, Select, Card, message } from 'antd';
import { useDispatch } from 'react-redux';
import { register } from '@/features/userSlice';
import { history } from 'umi';
import styles from './index.less';

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

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.title}>Tạo tài khoản</div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="Tên đăng nhập"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu' },
                            { min: 6, message: 'Tối thiểu 6 ký tự' },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="fullName" label="Họ và tên">
                        <Input />
                    </Form.Item>

                    <Form.Item name="phone" label="Số điện thoại">
                        <Input />
                    </Form.Item>

                    <Form.Item name="gender" label="Giới tính">
                        <Select allowClear>
                            <Select.Option value="male">Nam</Select.Option>
                            <Select.Option value="female">Nữ</Select.Option>
                            <Select.Option value="other">Khác</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="address" label="Địa chỉ">
                        <Input />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className={styles.button}
                    >
                        Đăng ký
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
