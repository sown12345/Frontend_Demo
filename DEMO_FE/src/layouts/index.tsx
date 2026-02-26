import { Layout, Menu, Button, Avatar, Space, Drawer } from 'antd';
import { MenuOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation, history } from 'umi';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchProfileRequest } from '@/features/userSlice';
import { RootState } from '@/types';
import { ReactNode, useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import { BREAKPOINTS } from '@/styles/breakpoints';
import ErrorAlert from '@/components/ErrorAlert';
import styles from './index.less';

const { Header, Content, Sider } = Layout;

interface BasicLayoutProps {
    children: ReactNode;
}

export default function BasicLayout({ children }: BasicLayoutProps) {
    // State từ Router + Redux
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { token, profile, profileStatus, isLoading } = useSelector((state: RootState) => state.user);

    // Trạng thái Drawer cho điều hướng tablet/mobile
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Chiều rộng viewport để quyết định hành vi responsive của điều hướng
    const [viewportWidth, setViewportWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.desktopMin
    );

    // Các trang không cần layout có sidebar khi chưa đăng nhập
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    // Dùng điều hướng kiểu Drawer từ mobile đến tablet-lg (<= 1023)
    const useDrawerNav = viewportWidth <= BREAKPOINTS.tabletLgMax;
    const isMobile = viewportWidth <= BREAKPOINTS.mobileMax;

    // Theo dõi thay đổi kích thước màn hình để chuyển mode layout theo thời gian thực
    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Chuyển hướng người dùng chưa đăng nhập khỏi các trang cần xác thực
    useEffect(() => {
        if (!token && !isAuthPage) {
            history.push('/login');
        }
    }, [token, isAuthPage]);

    // Tải profile sau đăng nhập nếu chưa có dữ liệu profile trong store
    useEffect(() => {
        if (token && !profile && profileStatus === 'idle' && !isLoading) {
            dispatch(fetchProfileRequest());
        }
    }, [token, profile, profileStatus, isLoading, dispatch]);

    // Tự động đóng Drawer khi đổi route
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Xử lý đăng xuất: xóa trạng thái xác thực và chuyển về trang đăng nhập
    const handleLogout = () => {
        dispatch(logout());
        history.push('/login');
    };

    // Danh sách menu dùng cho chế độ đã đăng nhập (sidebar/drawer)
    const menuItems = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Bảng điều khiển</Link>,
        },
        {
            key: '/profile',
            icon: <UserOutlined />,
            label: <Link to="/profile">Hồ sơ</Link>,
        },
    ];

    const pageTitleMap: Record<string, string> = {
        '/dashboard': 'Bảng điều khiển',
        '/profile': 'Hồ sơ',
        '/login': 'Đăng nhập',
        '/register': 'Đăng ký',
    };

    // Tiêu đề trang hiện tại hiển thị trên header
    const pageTitle = pageTitleMap[location.pathname] || 'Ứng dụng';

    // Layout khi chưa đăng nhập: chỉ có header + nội dung auth, không có sidebar
    if (!token) {
        return (
            <Layout className={styles.authLayout}>
                <ErrorAlert />
                <Header className={styles.header}>
                    <div className={styles.pageTitle}>{pageTitle}</div>
                    <Space size={8} className={styles.authActions}>
                        <Link to="/login">
                            <Button size={isMobile ? 'small' : 'middle'} type={location.pathname === '/login' ? 'primary' : 'default'}>Đăng nhập</Button>
                        </Link>
                        <Link to="/register">
                            <Button size={isMobile ? 'small' : 'middle'} type={location.pathname === '/register' ? 'primary' : 'default'}>Đăng ký</Button>
                        </Link>
                    </Space>
                </Header>
                <Content className={styles.authContent}>{children}</Content>
            </Layout>
        );
    }

    // Layout khi đã đăng nhập: desktop dùng sidebar, tablet/mobile dùng drawer + header + content
    return (
        <Layout className={styles.appLayout}>
            {!useDrawerNav && (
                <Sider width={220} theme="dark" className={styles.sider}>
                    <div className={styles.logo}>MyAuthApp</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        className={styles.menu}
                    />
                </Sider>
            )}

            <Drawer
                title="Điều hướng"
                placement="left"
                open={useDrawerNav && mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                className={styles.mobileDrawer}
            >
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={() => setMobileMenuOpen(false)}
                />
            </Drawer>

            <Layout>
                <ErrorAlert />
                <Header className={styles.header}>
                    <div className={styles.headerLeft}>
                        {useDrawerNav && (
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                className={styles.menuTrigger}
                                onClick={() => setMobileMenuOpen(true)}
                            />
                        )}
                        <div className={styles.pageTitle}>{pageTitle}</div>
                    </div>
                    <Space size={12} className={styles.headerRight}>
                        {!useDrawerNav && <Avatar size="small">{(profile?.username?.[0] || 'U').toUpperCase()}</Avatar>}
                        {!useDrawerNav && <span className={styles.username}>{profile?.username || 'Người dùng'}</span>}
                        <Button size={isMobile ? 'small' : 'middle'} type="primary" danger onClick={handleLogout}>
                            Đăng xuất
                        </Button>
                    </Space>
                </Header>

                <Content className={styles.content}>{children}</Content>
            </Layout>
        </Layout>
    );
}
