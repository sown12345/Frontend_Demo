import { Provider } from 'react-redux';
import { store } from './store';

export function rootContainer(container: any) {
    return <Provider store={store}>{container}</Provider>;
}
