import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import Bold from '../Typo/Bold';

const Fragment = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${props => (props.helper ? '0' : '1rem')};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    border-radius: 21px;
    width: 38px;
    height: 22px;
    padding: 1px;
    position: relative;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border: 1px solid ${props => (props.error ? props.theme.color.error : darken(0.1, props.theme.color.black))};
    background-color: ${props =>
        props.disabled
            ? props.theme.color.back
            : props.checked
                ? darken(0.05, props.theme.color.primary)
                : props.theme.color.black};
`;

const SwitchFrame = styled.div`
    cursor: pointer;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    transform-origin: 50% 50%;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, width 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform: ${props => (props.checked ? 'translateX(15px)' : 'translateX(-1px)')};
    background-color: ${props => (props.checked ? props.theme.color.primary : props.theme.color.back)};
    &:active {
        width: 25px;
        border-radius: 12.5px;
        transform: ${props => (props.checked ? 'translateX(10px)' : 'translateX(-1px)')};
    }
`;

const Text = styled(Bold)`
    margin-left: 1rem;
    margin-top: 0;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const Switch = props => (
    <Fragment helper={props.helper ? 1 : 0}>
        <Wrapper checked={props.checked ? 1 : 0}>
            <SwitchFrame
                {...props}
                helper={props.helper ? 1 : 0}
                error={props.error ? 1 : 0}
                checked={props.checked ? 1 : 0}
                disabled={props.disabled}
            />
        </Wrapper>
        {props.text ? <Text helper>{props.text}</Text> : ''}
    </Fragment>
);

export default Switch;
