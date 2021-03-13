import styled from 'styled-components';

const Helper = styled.p`
    font-size: 0.9rem;
    margin-top: 0.5rem;
    margin-bottom: ${props => (props.margin ? '0.75rem' : '0')};
    color: ${props => props.theme.color.white}50;
`;

export default Helper;
