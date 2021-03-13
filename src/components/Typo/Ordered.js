import styled from 'styled-components';

const Ordered = styled.ol`
    list-style-type: none;
    padding-left: 0;
    margin-bottom: ${props => (props.helper ? '0' : '1rem')};
    margin-top: ${props => (props.margin ? '1.5rem' : '0')};
    li {
        display: flex;
        align-items: center;
        &::before {
            content: ${props => props.before};
            display: inline-block;
            box-sizing: border-box;
            margin-right: 8px;
        }
    }
`;

export default Ordered;
