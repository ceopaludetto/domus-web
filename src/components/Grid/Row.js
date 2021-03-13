import styled from 'styled-components';
import PropTypes from 'prop-types';

const Row = styled.div`
    margin: 0 -16px;
    display: flex;
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    flex-wrap: ${props => props.flexWrap};
    flex-direction: ${props => props.flexDirection};
    height: ${props => (props.full ? '100%' : 'auto')};
`;

Row.defaultProps = {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
};

Row.propTypes = {
    justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
    alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
    flexWrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse']),
    flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse'])
};

export default Row;
