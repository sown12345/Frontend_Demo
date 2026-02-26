import { Card, Typography } from 'antd';
import styles from './index.less';

const { Title, Paragraph } = Typography;

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Title level={3}>Dashboard</Title>
                <Paragraph>
                    Đây là trang tổng quan của hệ thống. Bạn có thể điều hướng sang trang Profile từ menu bên trái.
                </Paragraph>
            </Card>
        </div>
    );
}
