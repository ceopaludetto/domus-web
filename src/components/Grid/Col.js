import styled from 'styled-components';
import PropTypes from 'prop-types';

const Col = styled.div`
    padding: 0 1rem;
    min-height: 1px;
    max-width: 100%;
    flex-basis: 0;
    flex-grow: 1;
    text-align: ${props => props.textAlign};
    ${props =>
        props.size
            ? props.size.map(
                  s =>
                      `@media (min-width: ${props.theme.break[s.break].size}px){ flex: 0 0 ${(s.value / 12) *
                          100}%; max-width: ${(s.value / 12) * 100}% }`
              )
            : ''};
    ${props =>
        props.textAlign
            ? props.textAlign.map(
                  t => `@media (min-width: ${props.theme.break[t.break].size}px){ text-align: ${t.value}; }`
              )
            : ''};
    ${props =>
        props.margin
            ? props.margin.map(
                  m =>
                      `@media (min-width: ${props.theme.break[m.break].size}px){ ${m.side.map(
                          side => `margin-${side.name}: ${side.value};`
                      )} }`
              )
            : ''};
    ${props =>
        props.order
            ? props.order.map(o => `@media (min-width: ${props.theme.break[o.break].size}px){ order: ${o.value}; }`)
            : ''};
`;

Col.propTypes = {
    size: PropTypes.array
};

export default Col;
