import styled from 'styled-components';

const Paper = styled.div`
    background-color: ${props => props.theme.color[props.variant]};
    border-radius: 8px;
    padding: 48px 40px;
    width: 100%;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    @media (max-width: ${props => props.theme.break[2].size}px) {
        padding: 24px 20px;
    }
`;

Paper.defaultProps = {
    variant: 'back'
};

export default Paper;
