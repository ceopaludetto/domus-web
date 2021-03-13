import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    padding: 0 1rem;
    margin: 0 auto;
    ${props => (props.full ? 'height: 100%;' : '')};
    ${props => (props.gutter ? 'padding: 2rem 1rem;' : '')};
    ${props => (props.helper ? 'padding: 0 1rem!important;' : '')};
    ${props => (props.no ? 'padding: 0 !important;' : '')};
    ${props =>
        props.fluid
            ? ''
            : props.theme.break.map(
                  b => (b.size === 0 ? '' : `@media (min-width: ${b.size}px){ max-width: ${b.value}px}`)
              )};
`;

export default Container;
