import styled from 'styled-components';

const Paragraph = styled.p`
    color: ${props => props.theme.color[props.variant]};
    text-align: justify;
    line-height: 1.2;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

Paragraph.defaultProps = {
    variant: 'white'
};

export default Paragraph;
