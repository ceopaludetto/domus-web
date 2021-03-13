import styled from 'styled-components';

import Paper from '../Form/Paper';

const Frame = styled(Paper)`
    margin-top: 1.5rem;
    padding: 48px 0 0 0;
    overflow: hidden;
    @media (max-width: ${props => props.theme.break[3].size}px) {
        padding: 24px 0 0 0;
    }
`;

const Head = styled.div`
    background-color: ${props => props.theme.color.back};
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 2.5rem;
    padding-top: ${props => (props.footer ? '24px' : 0)};
    padding-bottom: ${props => (props.footer ? '48px' : 0)};
    @media (max-width: ${props => props.theme.break[3].size}px) {
        padding: 0 1.25rem;
        padding-top: ${props => (props.footer ? '12px' : 0)};
        padding-bottom: ${props => (props.footer ? '24px' : 0)};
    }
`;

const Cell = styled.div`
    padding: ${props => (props.options ? (props.padding ? '57px 2.5rem 33px' : '48px 2.5rem 24px') : '1rem 2.5rem')};
    display: flex;
    align-items: center;
    position: relative;
    flex: 0 0 100%;
    background-color: ${props => (props.selected ? props.theme.color.black : props.theme.color.back)};
    ${props => (props.options ? `border-bottom: 1px solid ${props.theme.color.black}` : '')};
    @media (max-width: ${props => props.theme.break[3].size}px) {
        padding: ${props =>
            props.options ? (props.padding ? '28.5px 1.25rem 16.5px' : '24px 1.25rem 12px') : '1rem 1.25rem'};
    }
`;

const Item = styled.div`
    flex: ${props => (props.action ? '0 1 auto' : '1')};
    padding: ${props => (props.left ? '0 0.5rem 0 0' : props.right ? '0 0 0 0.5rem' : '0 0.5rem')};
    padding-top: ${props => (props.open ? '1px' : '0')};
    display: ${props => (props.flex ? 'flex' : 'block')};
    align-items: center;
    word-wrap: normal;
`;

const Table = {
    Frame,
    Head,
    Cell,
    Item
};

export default Table;
