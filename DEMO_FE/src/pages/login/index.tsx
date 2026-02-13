import { Form, Input, Button, Card, message } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '@/features/userSlice';
import { history } from 'umi';
import styles from './index.less';

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

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.title}>Đăng nhập</div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="Tên đăng nhập"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className={styles.button}
                    >
                        Đăng nhập
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
