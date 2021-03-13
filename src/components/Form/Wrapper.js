import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.color.black};
`;

export default Wrapper;
