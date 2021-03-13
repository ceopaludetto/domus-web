import styled from 'styled-components';

const Warn = styled.p`
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    display: block;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: ${props => props.theme.color.white}70;
`;

export default Warn;
