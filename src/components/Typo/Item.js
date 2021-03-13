import styled from 'styled-components';

const Item = styled.li`
    font-size: 0.9rem;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    text-decoration: ${props => (props.dashed ? 'line-through' : 'none')};
    color: ${props => (props.dashed ? `${props.theme.color[props.variant]}90` : props.theme.color[props.variant])};
    &::before {
        background-color: ${props =>
            props.dashed || props.inverted ? props.theme.color.black : props.theme.color.primary};
    }
    a {
        font-size: 0.9rem;
        font-weight: 400;
        display: initial;
        margin-left: 0.25rem;
    }
`;

Item.defaultProps = {
    variant: 'black'
};

export default Item;
