import { Form, Input, Button, Select, Card, message, Spin, Avatar, Upload, Image, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, uploadAvatar } from '@/features/userSlice';
import { history } from 'umi';
import styles from './index.less';

export default function Profile() {
    const dispatch = useDispatch();
    const { profile, token } = useSelector((s: any) => s.user);
    const [form] = Form.useForm();

    // state preview ảnh
    const [preview, setPreview] = useState(false);

    // Kiểm tra đăng nhập + load profile
    useEffect(() => {
        if (!token) {
            history.push('/login');
        } else {
            dispatch(fetchProfile());
        }
    }, [token, dispatch]);

    // Đổ dữ liệu profile vào form
    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                ...profile,
                createdAt: new Date(profile.createdAt).toLocaleString(),
                updatedAt: new Date(profile.updatedAt).toLocaleString(),
            });
        }
    }, [profile]);

    // Loading khi chưa có profile
    if (!profile) {
        return (
            <div className={styles.container}>
                <Spin style={{ display: 'block', margin: '150px auto' }} />
            </div>
        );
    }

    // Upload avatar
    const handleUpload = async (file: any) => {
        if (!file.type.startsWith('image/')) {
            message.error('Chỉ được tải lên file ảnh');
            return Upload.LIST_IGNORE;
        }

        if (file.size > 2 * 1024 * 1024) {
            message.error('Ảnh tối đa 2MB');
            return Upload.LIST_IGNORE;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        const result: any = await dispatch(uploadAvatar(formData));

        if (uploadAvatar.fulfilled.match(result)) {
            message.success('Cập nhật ảnh đại diện thành công');
        } else {
            message.error(result.payload || 'Tải ảnh thất bại');
        }

        return false;
    };

    // Submit form cập nhật profile
    const onFinish = async (values: any) => {
        const { _id, role, createdAt, updatedAt, username, ...updateData } = values;
        const result: any = await dispatch(updateProfile(updateData));

        if (updateProfile.fulfilled.match(result)) {
            message.success('Cập nhật thông tin thành công');
        } else {
            message.error(result.payload as string);
        }
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.title}>Hồ sơ người dùng</div>

                {/* Avatar */}
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatarBox}>
                        <Avatar
                            size={120}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setPreview(true)}
                            src={
                                profile.avatar
                                    ? `http://localhost:5000/uploads/${profile.avatar}`
                                    : undefined
                            }
                        />

                        {/* Image ẩn dùng để preview */}
                        <Image
                            style={{ display: 'none' }}
                            preview={{
                                visible: preview,
                                src: profile.avatar
                                    ? `http://localhost:5000/uploads/${profile.avatar}`
                                    : undefined,
                                onVisibleChange: (v) => setPreview(v),
                            }}
                        />
                    </div>

                    <div style={{ marginTop: 15 }}>
                        <Upload
                            showUploadList={false}
                            beforeUpload={handleUpload}
                        >
                            <Button icon={<UploadOutlined />}>
                                Đổi ảnh đại diện
                            </Button>
                        </Upload>
                    </div>
                </div>

                <Form layout="vertical" form={form} onFinish={onFinish}>
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

                    <Form.Item name="fullName" label="Họ và tên">
                        <Input />
                    </Form.Item>

                    <Form.Item name="phone" label="Số điện thoại">
                        <Input />
                    </Form.Item>

                    <Form.Item name="gender" label="Giới tính">
                        <Select>
                            <Select.Option value="male">
                                Nam
                            </Select.Option>
                            <Select.Option value="female">
                                Nữ
                            </Select.Option>
                            <Select.Option value="other">
                                Khác
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="address" label="Địa chỉ">
                        <Input />
                    </Form.Item>

                    <Form.Item name="createdAt" label="Ngày tạo">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item name="updatedAt" label="Cập nhật lần cuối">
                        <Input disabled />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className={styles.button}
                    >
                        Cập nhật hồ sơ
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
