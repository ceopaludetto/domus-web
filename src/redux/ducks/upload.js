import { createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    success: false,
    failure: false,
    progress: 0,
    data: {}
};

const start = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: true
});

const success = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    success: true,
    data: {
        res: action.data.res
    }
});

const failure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    data: {
        ERROR: action.data.ERROR
    }
});

const progress = (state = INITIAL_STATE, action) => ({
    ...state,
    progress: action.data.progress
});

export default createReducer(INITIAL_STATE, {
    UPLOAD_FILES_START: start,
    UPLOAD_FILES_SUCCESS: success,
    UPLOAD_FILES_FAILURE: failure,
    UPLOAD_FILES_PROGRESS: progress
});
