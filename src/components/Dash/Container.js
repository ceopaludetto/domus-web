import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import Grid from '../Grid/index';

const Wrapper = styled.div`
    flex: 1;
    width: 100%;
    padding: 0 1rem;
    overflow: ${props => (props.full ? 'hidden' : 'auto')};
    height: ${props => (props.full ? '100%' : 'auto')};
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        padding: 0;
    }
`;

const StyledScroll = styled(Scrollbars)`
    div:nth-child(2),
    div:nth-child(3) {
        .thumb {
            border-radius: 4px;
            background-color: ${props => props.theme.color.primary};
        }
    }
`;

class Container extends React.PureComponent {
    renderThumb = ({ style, ...props }) => {
        return <div style={{ ...style }} className="thumb" {...props} />;
    };

    render() {
        const props = this.props;
        return (
            <StyledScroll
                style={{ height: '100%' }}
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                onUpdate={props.onUpdate}
                ref="scroll">
                <Wrapper full={props.full ? 1 : 0}>
                    <Grid.Container
                        gutter={props.gutter ? 1 : props.fluid ? 0 : 1}
                        full={props.full ? 1 : 0}
                        fluid={props.fluid ? 1 : 0}
                        helper={props.helper ? 1 : 0}
                        no={props.no ? 1 : 0}>
                        {props.children}
                    </Grid.Container>
                </Wrapper>
            </StyledScroll>
        );
    }
}

export default Container;
