import styled from 'styled-components';

const Heading = styled.h1`
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-size: 1.5rem;
    font-weight: 300;
    text-transform: uppercase;
    color: ${props => props.theme.color[props.variant]};
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        font-size: 1.1rem;
    }
`;

Heading.defaultProps = {
    variant: 'white'
};

export default Heading;
