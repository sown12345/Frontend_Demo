import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './features/userSlice';
import rootSaga from './sagas';

// Saga middleware chịu trách nhiệm chạy các side-effect bất đồng bộ
// (gọi API, điều hướng, hiển thị message...) tách khỏi reducer thuần.
const sagaMiddleware = createSagaMiddleware();

// Store trung tâm của ứng dụng:
// - reducer: gom các slice state (hiện tại có user)
// - middleware: giữ middleware mặc định của RTK + thêm sagaMiddleware
export const store = configureStore({
    reducer: { user: userReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Chạy rootSaga một lần khi app khởi tạo để đăng ký toàn bộ watcher saga.
sagaMiddleware.run(rootSaga);

// Kiểu dispatch dùng cho dispatch action có type-safe.
export type AppDispatch = typeof store.dispatch;

// RootState lấy trực tiếp từ store để luôn đồng bộ với reducer thực tế.
export type RootState = ReturnType<typeof store.getState>;

