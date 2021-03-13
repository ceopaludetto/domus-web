import styled from 'styled-components';

const Title = styled.h1`
    font-size: 3.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    display: block;
    width: 100%;
    text-align: ${props => props.textAlign};
    color: ${props => props.theme.color[props.variant]};
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        font-size: 2rem;
    }
`;

Title.defaultProps = {
    textAlign: 'left',
    variant: 'black'
};

export default Title;
