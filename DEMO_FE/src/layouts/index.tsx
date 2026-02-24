import { Layout, Menu, Button } from 'antd';
import { Link, useLocation, history } from 'umi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/userSlice';
import { RootState } from '@/types';
import { ReactNode } from 'react';
import ErrorAlert from '@/components/ErrorAlert';

const { Header, Content } = Layout;

interface BasicLayoutProps {
    children: ReactNode;
}

export default function BasicLayout({ children }: BasicLayoutProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.user.token);

    const handleLogout = () => {
        dispatch(logout());
        history.push('/login');
    };

    const menuItems = token
        ? [
            {
                key: '/profile',
                label: <Link to="/profile">Profile</Link>,
            },
        ]
        : [
            {
                key: '/login',
                label: <Link to="/login">Login</Link>,
            },
            {
                key: '/register',
                label: <Link to="/register">Register</Link>,
            },
        ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <ErrorAlert />
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ color: '#fff', marginRight: 40 }}>
                    MyAuthApp
                </div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    style={{ flex: 1 }}
                    items={menuItems}
                />

                {token && (
                    <Button type="primary" danger onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Header>

            <Content style={{ padding: 0 }}>
                {children}
            </Content>
        </Layout>
    );
}
