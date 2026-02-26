import { all, fork } from 'redux-saga/effects';
import { userSaga } from '@/sagas/userSaga';

// Root saga: nơi gom và chạy song song các saga theo module.
export default function* rootSaga() {
    yield all([fork(userSaga)]);
}
