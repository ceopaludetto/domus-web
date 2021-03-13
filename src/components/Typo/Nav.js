import styled from 'styled-components';

const Nav = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme.color[props.variant]};
    transition: border-bottom 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    a {
        padding: 1rem;
        display: block;
        text-decoration: none;
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        border-bottom: 1px solid transparent;
        margin-bottom: -1px;
        transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-bottom 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        color: ${props => props.theme.color.white};
        &:hover {
            background-color: ${props => props.theme.color.back}50;
            border-color: ${props => props.theme.color.primary};
        }
        &.active {
            color: ${props => props.theme.color.primary};
            border-color: ${props => props.theme.color.primary};
        }
        &.active:hover {
            background-color: transparent;
            color: ${props => props.theme.color.primary};
        }
    }
`;

Nav.defaultProps = {
    variant: 'back'
};

export default Nav;
