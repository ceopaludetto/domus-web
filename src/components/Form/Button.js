import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { readableColor, darken } from 'polished';

const ButtonFrame = styled(({ tag = 'button', children, ...props }) => createElement(tag, props, children))`
    display: inline-block;
    padding: 12px;
    font-size: 0.875rem;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    text-decoration: none;
    min-height: 36px;
    box-sizing: border-box;
    line-height: ${props => (props.icon ? '0.7' : '1.4em')};
    font-weight: 600;
    border-radius: ${props => (props.rounded ? (props.icon ? '50%' : '25px') : '4px')};
    border: ${props => (props.outline ? `2px solid ${props.theme.color[props.variant]}` : 'none')};
    position: relative;
    width: ${props => (props.block ? '100%' : 'auto')};
    background-color: ${props =>
        props.loading || props.disabled
            ? props.raised
                ? `${props.theme.color[props.variant]}40`
                : 'transparent'
            : props.raised
                ? props.theme.color[props.variant]
                : 'transparent'};
    color: ${props =>
        props.loading || props.disabled
            ? props.raised
                ? `${readableColor(props.theme.color[props.variant])}40`
                : `${props.theme.color[props.variant]}40`
            : props.raised
                ? readableColor(props.theme.color[props.variant])
                : props.theme.color[props.variant]}!important;
    cursor: ${props => (props.loading || props.disabled ? 'default' : 'pointer')};
    ${props =>
        props.loading || props.disabled
            ? ''
            : `&:hover {
                text-decoration: none!important;
                background-color: ${
                    props.raised
                        ? darken(0.075, props.theme.color[props.variant])
                        : props.outline
                            ? 'transparent'
                            : `${props.theme.color[props.variant]}30`
                };
                ${
                    props.outline
                        ? `border-color: ${darken(0.075, props.theme.color[props.variant])}; 
                            color: ${darken(0.075, props.theme.color[props.variant])};`
                        : ''
                }
    }`} &:focus,
    ${props =>
        props.loading || props.disabled
            ? '&:active { outline: none; }'
            : `&:active, &.active {
                outline: none;
                background-color: ${
                    props.raised
                        ? darken(0.1, props.theme.color[props.variant])
                        : props.outline
                            ? 'transparent'
                            : `${props.theme.color[props.variant]}40`
                };
                ${
                    props.outline
                        ? `border-color: ${darken(0.1, props.theme.color[props.variant])}; 
                            color: ${darken(0.1, props.theme.color[props.variant])};`
                        : ''
                }
    }`}
    @media (max-width: ${props => props.theme.break[3].size}px) {
        padding: ${props => (props.icon ? '11.5px' : '1rem')};
    }
`;

const Button = props => (
    <ButtonFrame
        {...props}
        outline={props.outline ? 1 : 0}
        rounded={props.rounded ? 1 : 0}
        loading={props.loading ? 1 : 0}
        raised={props.raised ? 1 : 0}
        block={props.block ? 1 : 0}
        icon={props.icon ? 1 : 0}
        disabled={props.loading || props.disabled}>
        {props.loading ? 'Carregando...' : props.children}
    </ButtonFrame>
);

Button.defaultProps = {
    variant: 'primary',
    outline: false,
    loading: false,
    raised: false,
    block: false,
    icon: false
};

Button.propTypes = {
    variant: PropTypes.string,
    outline: PropTypes.bool,
    loading: PropTypes.bool,
    raised: PropTypes.bool,
    block: PropTypes.bool,
    icon: PropTypes.bool
};

export default Button;
