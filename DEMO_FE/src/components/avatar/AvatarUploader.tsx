import { Button, Avatar, Upload, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import styles from './AvatarUploader.less';

interface AvatarUploaderProps {
    avatar?: string;
    onUpload: (formData: FormData) => Promise<void>;
    loading?: boolean;
}

export default function AvatarUploader({ avatar, onUpload, loading = false }: AvatarUploaderProps) {
    const [preview, setPreview] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (file: RcFile) => {
        if (!file.type.startsWith('image/')) {
            message.error('Chỉ được tải lên file ảnh');
            return Upload.LIST_IGNORE;
        }

        if (file.size > 2 * 1024 * 1024) {
            message.error('Ảnh tối đa 2MB');
            return Upload.LIST_IGNORE;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('avatar', file);
            await onUpload(formData);
        } catch (error) {
            const err = error as Error;
            message.error(err.message || 'Tải ảnh thất bại');
        } finally {
            setUploading(false);
        }

        return false;
    };

    const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    const serverOrigin = apiBaseUrl.replace(/\/api\/?$/, '');
    const avatarUrl = avatar
        ? avatar.startsWith('http://') || avatar.startsWith('https://')
            ? avatar
            : `${serverOrigin}/uploads/${avatar}`
        : undefined;

    return (
        <div className={styles.avatarWrapper}>
            <div className={styles.avatarBox}>
                <Avatar
                    size={120}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPreview(true)}
                    src={avatarUrl}
                />

                {/* Image ẩn dùng để preview */}
                <Image
                    style={{ display: 'none' }}
                    preview={{
                        visible: preview,
                        src: avatarUrl,
                        onVisibleChange: (v) => setPreview(v),
                    }}
                />
            </div>

            <div style={{ marginTop: 15 }}>
                <Upload
                    showUploadList={false}
                    beforeUpload={handleUpload}
                    disabled={uploading || loading}
                >
                    <Button icon={<UploadOutlined />} loading={uploading || loading}>
                        Đổi ảnh đại diện
                    </Button>
                </Upload>
            </div>
        </div>
    );
}
