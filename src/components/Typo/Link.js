import { createElement } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Link = styled(({ tag = RouterLink, children, ...props }) => createElement(tag, props, children))`
    font-size: 0.8rem;
    font-weight: 700;
    text-decoration: none;
    color: ${props => props.theme.color[props.variant]};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

Link.defaultProps = {
    variant: 'primary'
};

export default Link;
