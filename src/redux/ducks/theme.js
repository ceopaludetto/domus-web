import { createActions, createReducer } from 'reduxsauce';

import theme from '../../components/theme';

const themes = [
    { name: 'Azul', color: '#4285f4' },
    { name: 'Azoxo', color: '#7D82B8' },
    { name: 'Verdola', color: '#00cc88' },
    { name: 'Pinkeno', color: '#Cc0044' },
    { name: 'Azuzo', color: '#6bd7ea' },
    { name: 'Marelu', color: '#D7AF70' }
];

const lightTheme = { back: '#FFFFFC', black: '#F9FBFD', white: '#23272A' };
const darkTheme = { back: '#2C2F33', black: '#23272A', white: '#FFFFFF' };

export { themes };

const INITIAL_STATE = { ...theme, color: { ...theme.color, ...darkTheme }, light: false, name: 'Azul', selected: 0 };

export const { Types, Creators } = createActions({
    requestSwitch: ['COLOR'],
    requestLight: ['COLOR']
});

const troca = (state = INITIAL_STATE, action) => {
    localStorage.setItem('@DOMUS:THEME', action.COLOR);
    return {
        ...state,
        color: { ...state.color, primary: themes[action.COLOR].color },
        name: themes[action.COLOR].name,
        selected: action.COLOR
    };
};

const trocaReload = (state = INITIAL_STATE, action) => {
    const THEME = localStorage.getItem('@DOMUS:THEME');
    if (THEME) {
        return {
            ...state,
            color: { ...state.color, primary: themes[THEME].color },
            name: themes[THEME].name,
            selected: THEME
        };
    } else {
        localStorage.setItem('@DOMUS:THEME', 0);
        return {
            ...state,
            color: { ...state.color, primary: themes[0].color },
            name: themes[0].name,
            selected: 0
        };
    }
};

const light = (state = INITIAL_STATE, action) => {
    localStorage.setItem('@DOMUS:LIGHT', action.COLOR);
    if (action.COLOR) {
        return {
            ...state,
            color: { ...state.color, ...lightTheme },
            light: true
        };
    } else {
        return {
            ...state,
            color: { ...state.color, ...darkTheme },
            light: false
        };
    }
};

const lightReload = (state = INITIAL_STATE, action) => {
    const LIGHT = localStorage.getItem('@DOMUS:LIGHT') === 'true' ? true : false;
    if (LIGHT) {
        return {
            ...state,
            color: { ...state.color, ...lightTheme },
            light: LIGHT
        };
    } else {
        localStorage.setItem('@DOMUS:LIGHT', false);
        return {
            ...state,
            color: { ...state.color, ...darkTheme },
            light: false
        };
    }
};

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_SWITCH]: troca,
    [Types.REQUEST_LIGHT]: light,
    REQUEST_SWITCH_LOGIN: trocaReload,
    REQUEST_LIGHT_LOGIN: lightReload
});
