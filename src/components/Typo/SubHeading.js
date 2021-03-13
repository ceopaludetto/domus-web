import styled from 'styled-components';

const SubHeading = styled.h1`
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    margin-bottom: ${props => (props.helper ? '0' : '1.5rem')};
    color: ${props => props.theme.color[props.variant]};
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        font-size: 0.8rem;
    }
`;

SubHeading.defaultProps = {
    variant: 'primary'
};

export default SubHeading;
