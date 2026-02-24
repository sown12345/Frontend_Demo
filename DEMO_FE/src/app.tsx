import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from './store';
import ErrorBoundary from '@/components/ErrorBoundary';

export function rootContainer(container: ReactNode) {
    return (
        <ErrorBoundary>
            <Provider store={store}>{container}</Provider>
        </ErrorBoundary>
    );
}
