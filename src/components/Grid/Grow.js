import styled from 'styled-components';

const Grow = styled.div`
    flex-grow: 1;
    padding: 0 1rem;
    display: ${props => (props.invisible ? 'none' : props.flex ? 'flex' : 'block')};
    word-wrap: break-word;
    ${props => (props.flex ? 'align-items:center;' : '')};
`;

export default Grow;
