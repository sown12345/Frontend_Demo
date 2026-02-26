import { Card, Spin, Result, Button, Typography, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileRequest, updateProfileRequest, uploadAvatarRequest } from '@/features/userSlice';
import { RootState, UpdateProfileRequest, User } from '@/types';
import { AppDispatch } from '@/store';
import AvatarUploader from '@/components/avatar/AvatarUploader';
import ProfileForm from '@/components/profile/ProfileForm';
import styles from './index.less';

const { Title, Text } = Typography;

const formatDate = (value?: string) => {
    if (!value) {
        return '--';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '--';
    }

    return date.toLocaleString();
};

export default function Profile() {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, isLoading, profileStatus, error } = useSelector((state: RootState) => state.user);

    // Loading khi chưa có profile
    if (!profile && (profileStatus === 'idle' || profileStatus === 'loading')) {
        return (
            <div className={styles.container}>
                <Spin style={{ display: 'block', margin: '150px auto' }} />
            </div>
        );
    }

    // Error state khi fetch profile thất bại
    if (!profile && profileStatus === 'failed') {
        return (
            <div className={styles.container}>
                <Result
                    status="error"
                    title="Không thể tải hồ sơ"
                    subTitle={error || 'Đã có lỗi xảy ra, vui lòng thử lại.'}
                    extra={
                        <Button type="primary" onClick={() => dispatch(fetchProfileRequest())}>
                            Thử lại
                        </Button>
                    }
                />
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    // Handle avatar upload
    const handleUpload = async (formData: FormData): Promise<void> => {
        dispatch(uploadAvatarRequest(formData));
    };

    // Handle profile update
    const onFinish = async (values: UpdateProfileRequest): Promise<void> => {
        dispatch(updateProfileRequest(values));
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.header}>
                    <Title level={3} className={styles.title}>Hồ sơ người dùng</Title>
                    <Text className={styles.subtitle}>Quản lý thông tin cá nhân và ảnh đại diện tài khoản của bạn.</Text>
                </div>

                <div className={styles.profileGrid}>
                    {/* Left Column - Avatar */}
                    <div className={styles.leftCol}>
                        <div className={styles.avatarWrapper}>
                            <AvatarUploader
                                avatar={profile.avatar}
                                onUpload={handleUpload}
                                loading={isLoading}
                            />

                            <div className={styles.identityBlock}>
                                <Text className={styles.identityName}>{profile.fullName || profile.username}</Text>
                                <Text className={styles.identityUsername}>@{profile.username}</Text>
                                <Tag className={styles.roleTag}>{profile.role}</Tag>
                            </div>

                            <div className={styles.metaList}>
                                <div className={styles.metaRow}>
                                    <Text className={styles.metaLabel}>Email</Text>
                                    <Text className={styles.metaValue}>{profile.email || '--'}</Text>
                                </div>
                                <div className={styles.metaRow}>
                                    <Text className={styles.metaLabel}>Tạo lúc</Text>
                                    <Text className={styles.metaValue}>{formatDate(profile.createdAt)}</Text>
                                </div>
                                <div className={styles.metaRow}>
                                    <Text className={styles.metaLabel}>Cập nhật</Text>
                                    <Text className={styles.metaValue}>{formatDate(profile.updatedAt)}</Text>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className={styles.rightCol}>
                        <ProfileForm onSubmit={onFinish} initialValues={profile as Partial<User>} loading={isLoading} />
                    </div>
                </div>
            </Card>
        </div>
    );
}
