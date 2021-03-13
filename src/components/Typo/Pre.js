import styled from 'styled-components';

const Pre = styled.pre`
    border-radius: 8px;
    padding: 40px 48px;
    background-color: ${props => props.theme.color.black};
    color: ${props => props.theme.color.white};
    margin-bottom: 1.5rem;
`;

export default Pre;
