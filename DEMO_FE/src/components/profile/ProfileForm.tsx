import { Form, Input, Button, Select, Row, Col } from 'antd';

interface ProfileFormProps {
    onSubmit: (values: any) => Promise<void>;
    initialValues?: any;
    loading?: boolean;
}

export default function ProfileForm({ onSubmit, initialValues, loading = false }: ProfileFormProps) {
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        const { _id, role, createdAt, updatedAt, username, ...updateData } = values;
        await onSubmit(updateData);
    };

    return (
        <Form layout="vertical" form={form} onFinish={handleSubmit} initialValues={initialValues}>
            <Form.Item name="username" label="Tên đăng nhập">
                <Input disabled />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Vui lòng nhập email' },
                ]}
            >
                <Input />
            </Form.Item>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item name="fullName" label="Họ và tên">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="phone" label="Số điện thoại">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item name="gender" label="Giới tính">
                        <Select allowClear>
                            <Select.Option value="male">Nam</Select.Option>
                            <Select.Option value="female">Nữ</Select.Option>
                            <Select.Option value="other">Khác</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="address" label="Địa chỉ">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="createdAt" label="Ngày tạo">
                <Input disabled />
            </Form.Item>

            <Form.Item name="updatedAt" label="Cập nhật lần cuối">
                <Input disabled />
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={loading} size="large">
                Cập nhật hồ sơ
            </Button>
        </Form>
    );
}
