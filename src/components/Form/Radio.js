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
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 22px;
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
    &:active {
        div {
            transform: ${props => (props.checked ? 'scale(0.8)' : 'scale(0.6)')};
        }
    }
`;

const RadioFrame = styled.div`
    height: 12px;
    width: 12px;
    border-radius: 50%;
    transform-origin: 50% 50%;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform: ${props => (props.checked ? 'scale(1)' : 'scale(0.4)')};
    background-color: ${props => (props.checked ? props.theme.color.primary : props.theme.color.back)};
`;

const Text = styled(Bold)`
    margin-left: 1rem;
    margin-top: 0;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

class Radio extends React.PureComponent {
    handleClick = prop => e => {
        e.stopPropagation();
        prop();
    };
    render() {
        const props = this.props;
        return (
            <Fragment helper={props.helper ? 1 : 0}>
                <Wrapper checked={props.checked ? 1 : 0} onClick={this.handleClick(props.onClick)}>
                    <RadioFrame
                        {...props}
                        helper={props.helper ? 1 : 0}
                        error={props.error ? 1 : 0}
                        checked={props.checked ? 1 : 0}
                        disabled={props.disabled}
                        onClick={this.handleClick(props.onClick)}
                    />
                </Wrapper>
                {props.text ? <Text helper>{props.text}</Text> : ''}
            </Fragment>
        );
    }
}

export default Radio;
