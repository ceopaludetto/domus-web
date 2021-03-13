import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: ${props => (props.tag === 'textarea' ? 'wrap' : 'nowrap')};
    margin-bottom: ${props => (props.helper ? '0' : '1rem')};
    ${props => (props.grow ? 'flex-grow: 1;' : '')};
`;

const SelectFrame = styled.select`
    padding: ${props =>
        props.prepend && props.append
            ? '12px 0'
            : props.prepend
                ? '12px 12px 12px 0'
                : props.append
                    ? '12px 0 12px 12px'
                    : '12px'};
    font-size: 0.875rem;
    min-width: 64px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-height: 36px;
    height: calc(3rem - 3px);
    box-sizing: border-box;
    line-height: 1.4em;
    font-weight: 500;
    border-radius: 4px;
    width: 100%;
    position: relative;
    display: block;
    border: 1px solid ${props => (props.error ? props.theme.color.error : darken(0.1, props.theme.color.black))};
    background-color: ${props => (props.disabled ? props.theme.color.back : props.theme.color.black)};
    color: ${props => props.theme.color.white};
    &[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    & + span {
        border-color: ${props => (props.error ? props.theme.color.error : darken(0.1, props.theme.color.black))};
        & + span {
            border-color: ${props => (props.error ? props.theme.color.error : darken(0.1, props.theme.color.black))};
        }
    }
    ${props =>
        props.disabled
            ? ''
            : `&:focus,
    &:active {
        outline: none;
        border-color: ${props.error ? props.theme.color.error : props.theme.color.primary};
    }`};
`;

const Select = props => (
    <Wrapper helper={props.helper ? 1 : 0} grow={props.grow ? 1 : 0}>
        <SelectFrame {...props} helper={props.helper ? 1 : 0} error={props.error ? 1 : 0} disabled={props.disabled}>
            {props.children}
        </SelectFrame>
    </Wrapper>
);

export default Select;
