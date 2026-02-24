import { Card, message, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, uploadAvatar } from '@/features/userSlice';
import { history } from 'umi';
import AvatarUploader from '@/components/avatar/AvatarUploader';
import ProfileForm from '@/components/profile/ProfileForm';
import styles from './index.less';

export default function Profile() {
    const dispatch = useDispatch();
    const { profile, token } = useSelector((s: any) => s.user);
    const [loading, setLoading] = useState(false);

    // Kiểm tra đăng nhập + load profile
    useEffect(() => {
        if (!token) {
            history.push('/login');
        } else {
            dispatch(fetchProfile());
        }
    }, [token, dispatch]);

    // Format profile data
    const formattedProfile = profile ? {
        ...profile,
        createdAt: new Date(profile.createdAt).toLocaleString(),
        updatedAt: new Date(profile.updatedAt).toLocaleString(),
    } : null;

    // Loading khi chưa có profile
    if (!profile) {
        return (
            <div className={styles.container}>
                <Spin style={{ display: 'block', margin: '150px auto' }} />
            </div>
        );
    }

    // Handle avatar upload
    const handleUpload = async (formData: FormData) => {
        try {
            setLoading(true);
            const result: any = await dispatch(uploadAvatar(formData));

            if (uploadAvatar.fulfilled.match(result)) {
                message.success('Cập nhật ảnh đại diện thành công');
            } else {
                throw new Error(result.payload || 'Tải ảnh thất bại');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle profile update
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const result: any = await dispatch(updateProfile(values));

            if (updateProfile.fulfilled.match(result)) {
                message.success('Cập nhật thông tin thành công');
            } else {
                throw new Error(result.payload as string);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.title}>Hồ sơ người dùng</div>

                <div className={styles.profileGrid}>
                    {/* Left Column - Avatar */}
                    <div className={styles.leftCol}>
                        <div className={styles.avatarWrapper}>
                            <AvatarUploader avatar={profile.avatar} onUpload={handleUpload} loading={loading} />
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className={styles.rightCol}>
                        <ProfileForm onSubmit={onFinish} initialValues={formattedProfile} loading={loading} />
                    </div>
                </div>
            </Card>
        </div>
    );
}
