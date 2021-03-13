import { eventChannel } from 'redux-saga';
import { fork, call, take, put } from 'redux-saga/effects';
import io from 'socket.io-client';

function connect() {
    const socket = io('http://localhost:3001');
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
}

function subscribe(socket) {
    return eventChannel(emit => {
        socket.on('message', data => {
            emit({
                type: 'RECEIVE_MESSAGE',
                data
            });
        });
        socket.on('disconnect', e => {
            socket.disconnect();
        });
        return () => {};
    });
}

function* read(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        yield put(action);
    }
}

function* write(socket) {
    while (true) {
        const action = yield take('REQUEST_MESSAGE');
        socket.emit('message', { MSG_STR_DESC: action.TEXT, MOR_INT_ID: action.ID, MSG_INT_DEST: action.DEST });
    }
}

function* load(socket) {
    while (true) {
        const action = yield take('REQUEST_MESSAGE_LOAD');
        socket.emit('subscribe', action.ID);
    }
}

function* handleIO(socket) {
    yield fork(read, socket);
    yield fork(write, socket);
    yield fork(load, socket);
}

export function* flow() {
    const socket = yield call(connect);

    yield fork(handleIO, socket);
}
