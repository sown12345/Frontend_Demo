import { Layout, Menu, Button } from 'antd';
import { Link, useLocation, history } from 'umi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/userSlice';

const { Header, Content } = Layout;

export default function BasicLayout(props: any) {
    const location = useLocation();
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.user.token);

    const handleLogout = () => {
        dispatch(logout());
        history.push('/login');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ color: '#fff', marginRight: 40 }}>
                    MyAuthApp
                </div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    style={{ flex: 1 }}
                >
                    {!token && (
                        <>
                            <Menu.Item key="/login">
                                <Link to="/login">Login</Link>
                            </Menu.Item>

                            <Menu.Item key="/register">
                                <Link to="/register">Register</Link>
                            </Menu.Item>
                        </>
                    )}

                    {token && (
                        <Menu.Item key="/profile">
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                    )}
                </Menu>

                {token && (
                    <Button type="primary" danger onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Header>

            <Content style={{ padding: 0 }}>
                {props.children}
            </Content>
        </Layout>
    );
}
