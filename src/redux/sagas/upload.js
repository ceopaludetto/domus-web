import { put, take, takeEvery, call, fork } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import api from '../api.js';

function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

const upload = (file, name, onUploadProgress) => {
    const data = new FormData();
    data.append('file', dataURItoBlob(file), name);

    return api.post('/morador/image', data, { onUploadProgress });
};

function createUploader(file, name) {
    let emit;
    const chan = eventChannel(emitter => {
        emit = emitter;
        return () => {};
    });
    const uploadProgressCb = ({ total, loaded }) => {
        const percentage = Math.round((loaded * 100) / total);
        emit(percentage);
        if (percentage === 100) emit(END);
    };
    const uploadPromise = upload(file, name, uploadProgressCb);
    return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan) {
    while (true) {
        const progress = yield take(chan);
        yield put({
            type: 'UPLOAD_FILES_PROGRESS',
            data: {
                progress
            }
        });
    }
}

function* uploadFiles({ FILE, NOME, MOR_INT_ID }) {
    yield put({
        type: 'UPLOAD_FILES_START'
    });
    try {
        const [uploadPromise, chan] = yield call(createUploader, FILE, NOME);
        yield fork(uploadProgressWatcher, chan);
        const res = yield call(() => uploadPromise);
        yield put({
            type: 'UPLOAD_FILES_SUCCESS',
            data: {
                res
            }
        });
        const reload = yield call(api.get, `/morador/${MOR_INT_ID}`);
        yield put({
            type: 'MORADOR_RELOAD',
            data: {
                MORADOR: reload.data.MORADOR
            }
        });
    } catch (error) {
        yield put({
            type: 'UPLOAD_FILES_FAILED',
            data: {
                error
            },
            error: true
        });
    }
}

export function* uploadSaga() {
    yield takeEvery('REQUEST_MORADOR_IMAGE', uploadFiles);
}
