import styled from 'styled-components';

const Bold = styled.p`
    font-size: 0.8rem;
    display: flex;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    font-weight: ${props => (props.table ? '400' : '700')};
    margin-top: ${props => (props.helper ? '0' : '0.5rem')};
    margin-bottom: ${props => (props.margin ? '0.75rem' : '0')};
    color: ${props => props.theme.color[props.variant]};
    cursor: ${props => (props.action ? 'pointer' : 'default')};
    svg {
        margin-right: 0.25rem;
        path {
            transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            fill: ${props => props.theme.color[props.variant]};
        }
    }
`;

Bold.defaultProps = {
    variant: 'primary'
};

export default Bold;
