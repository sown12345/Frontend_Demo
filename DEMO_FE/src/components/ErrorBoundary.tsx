import { Component, ReactNode, ErrorInfo } from 'react';
import { Result, Button } from 'antd';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary Component
 * Catches React component errors and displays user-friendly error message
 */
export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <Result
                    status="error"
                    title="Đã xảy ra lỗi"
                    subTitle="Ứng dụng gặp sự cố. Vui lòng làm mới trang hoặc liên hệ hỗ trợ."
                    extra={
                        <Button type="primary" onClick={this.handleReset}>
                            Thử lại
                        </Button>
                    }
                />
            );
        }

        return this.props.children;
    }
}
