import React, { createElement } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import MaskedInput from 'react-text-mask';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: ${props => (props.tag === 'textarea' ? 'wrap' : 'nowrap')};
    margin-bottom: ${props => (props.helper ? '0' : '1rem')};
    ${props => (props.grow ? 'flex-grow: 1;' : '')};
`;

const ControlMaskFrame = styled(MaskedInput)`
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
    min-height: ${props => (props.tag === 'textarea' ? '100px' : '36px')};
    box-sizing: border-box;
    line-height: 1.4em;
    font-weight: 500;
    border-radius: ${props =>
        props.prepend && props.append ? '0' : props.prepend ? '0 4px 4px 0' : props.append ? '4px 0 0 4px' : '4px'};
    width: 100%;
    position: relative;
    resize: vertical;
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
    ${props => (props.prepend ? 'border-left: none;' : '')};
    ${props => (props.append ? 'border-right: none;' : '')};
    ${props =>
        props.disabled
            ? ''
            : `&:focus,
    &:active {
        outline: none;
        border-color: ${props.error ? props.theme.color.error : props.theme.color.primary};
        & + span {
            border-color: ${props.error ? props.theme.color.error : props.theme.color.primary};
            & + span {
                border-color: ${props.error ? props.theme.color.error : props.theme.color.primary};
            }
        }
    }`};
`;

const ControlFrame = styled(({ tag = 'input', children, ...props }) => createElement(tag, props, children))`
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
    min-height: ${props => (props.tag === 'textarea' ? '100px' : '36px')};
    box-sizing: border-box;
    line-height: 1.4em;
    font-weight: 500;
    border-radius: ${props =>
        props.prepend && props.append ? '0' : props.prepend ? '0 4px 4px 0' : props.append ? '4px 0 0 4px' : '4px'};
    width: 100%;
    position: relative;
    resize: vertical;
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
    ${props => (props.prepend ? 'border-left: none;' : '')};
    ${props => (props.append ? 'border-right: none;' : '')};
    ${props =>
        props.disabled
            ? ''
            : `&:focus,
    &:active {
        outline: none;
        border-color: ${props.error ? props.theme.color.error : props.theme.color.primary};
        & + span {
            border-color: ${props.error ? props.theme.color.error : props.theme.color.primary};
            & + span {
                border-color: ${props.error ? props.theme.color.error : props.theme.color.primary};
            }
        }
    }`};
`;

const Prepend = styled.span`
    display: block;
    padding: 12px;
    font-size: 0.875rem;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-height: 36px;
    box-sizing: border-box;
    line-height: 1.4em;
    font-weight: 700;
    border-radius: 4px 0 0 4px;
    order: -1;
    border: 1px solid ${props => (props.error ? props.theme.color.error : darken(0.1, props.theme.color.black))};
    border-right: none;
    background-color: ${props => props.theme.color.black};
    color: ${props => props.theme.color.white};
`;

const Append = styled.span`
    padding: 1.5px 2px;
    display: flex;
    align-items: center;
    min-height: 36px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 0 4px 4px 0;
    border: 1px solid ${props => (props.error ? props.theme.color.error : darken(0.1, props.theme.color.black))};
    border-left: none;
    background-color: ${props => props.theme.color.black};
    color: ${props => props.theme.color.white};
`;

const Counter = styled.p`
    width: 100%;
    display: block;
    text-align: right;
    font-size: 0.8rem;
    font-weight: 700;
    color: ${props => darken(0.1, props.theme.color.white)};
`;

const Control = props => (
    <Wrapper helper={props.helper ? 1 : 0} tag={props.tag} grow={props.grow ? 1 : 0}>
        {props.mask ? (
            <ControlMaskFrame
                {...props}
                helper={props.helper ? 1 : 0}
                error={props.error ? 1 : 0}
                prepend={props.prepend ? 1 : 0}
                append={props.append ? 1 : 0}
                disabled={props.disabled}
                mask={props.mask}
            />
        ) : (
            <ControlFrame
                {...props}
                helper={props.helper ? 1 : 0}
                error={props.error ? 1 : 0}
                prepend={props.prepend ? 1 : 0}
                append={props.append ? 1 : 0}
                disabled={props.disabled}
            />
        )}
        {props.prepend ? <Prepend>{props.prepend}</Prepend> : ''}
        {props.append ? <Append>{props.append}</Append> : ''}
        {props.tag === 'textarea' && props.counter ? (
            <Counter>
                {props.value.length}/{props.maxLength}
            </Counter>
        ) : (
            ''
        )}
    </Wrapper>
);

export default Control;
