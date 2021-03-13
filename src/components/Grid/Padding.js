import styled from 'styled-components';

const Padding = styled.div`
    padding: 0 1rem;
    opacity: ${props => (props.visible ? '1' : '0')};
    ${props => (props.grow ? 'flex-grow: 1;' : '')};
    ${props => (props.flex ? 'display: flex; align-items: center;' : '')};
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        opacity: 1;
        flex: ${props => (props.no ? 'none' : '1')};
        flex-wrap: nowrap;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;

export default Padding;
