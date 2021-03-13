import React, { PureComponent } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { darken } from 'polished';
import Slider from 'rc-slider';
import styled from 'styled-components';

import moment from '../../utils/moment';
import Button from './Button';
import Label from '../Typo/Label';
import Grid from '../Grid/index';

const Wrapper = styled.div`
    width: 100%;
    min-height: 700px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    margin-bottom: 1rem;
    background-color: ${props => props.theme.color.black};
    border: 1px solid ${props => darken(0.1, props.theme.color.black)};
    overflow: hidden;
    @media (max-width: ${props => props.theme.break[2].size}px) {
        min-height: 0;
    }
`;

const Header = styled.div`
    width: 100%;
    padding: 1rem 2rem 0.5rem;
    text-align: center;
`;

const Item = styled.div`
    display: flex;
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    color: ${props => props.theme.color.white};
    justify-content: ${props => (props.day ? 'flex-end' : 'center')};
    align-items: ${props => (props.day ? 'stretch' : 'center')};
    flex: ${props => (props.grow && !props.week ? '1' : 'none')};
    padding: ${props => (props.week ? '1rem 0' : '0')};
    @media (max-width: ${props => props.theme.break[2].size}px) {
        font-size: 0.75rem;
        ${props => (props.grow && props.day ? 'flex: none;' : '')};
    }
`;

const DayItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    position: relative;
    border-left: 5px solid transparent;
    padding: 0.75rem;
    user-select: none;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:not(.disabled):hover {
        cursor: pointer;
        background-color: ${props => darken(0.05, props.theme.color.black)}40;
    }
    &.selected {
        border-left-color: ${props => props.theme.color.primary};
        background-color: ${props => darken(0.05, props.theme.color.black)}!important;
        div {
            display: flex;
            animation: surge 250ms cubic-bezier(0.4, 0, 0.2, 1);
            @keyframes surge {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        }
    }
    &.disabled {
        span {
            color: ${props => `${props.theme.color.white}70`};
        }
    }
    &:last-of-type {
        border-right: none;
    }
    @media (max-width: ${props => props.theme.break[2].size}px) {
        justify-content: flex-start;
        padding: 0.5rem;
        span {
            font-size: 0.75rem;
        }
        &.selected {
            div {
                font-size: 3rem;
                justify-content: flex-end;
            }
        }
    }
`;

const Day = styled.span`
    font-size: 1.1rem;
    font-weight: 700;
    color: ${props => props.theme.color.white};
`;

const DayBg = styled.div`
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    font-size: 8rem;
    font-weight: 700;
    line-height: 0.8;
    color: ${props => props.theme.color.primary}40;
`;

const Title = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${props => props.theme.color.white};
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        font-size: 1rem;
    }
`;

const Body = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

const Footer = styled.div`
    text-align: center;
    width: 100%;
`;

const Time = styled.div`
    width: 100%;
    position: relative;
    height: calc(3rem - 3px);
`;

const Mark = styled.div`
    height: 80%;
    width: 1px;
    position: absolute;
    bottom: 0;
    background-color: ${props => darken(0.1, props.theme.color.black)};
`;

const Input = styled.input`
    font-size: 0.875rem;
    line-height: 1.4em;
    font-weight: 500;
    padding: 12px;
    color: ${props => props.theme.color.white};
    border: none;
    background-color: transparent;
    cursor: default;
`;

const Selector = styled(Slider)`
    height: 100% !important;
    .rc-slider-rail {
        visibility: hidden;
    }
    .rc-slider-track {
        visibility: hidden;
    }
    .rc-slider-handle {
        height: 100%;
        border-radius: 2px;
        border: none;
        box-shadow: none !important;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        background-color: ${props => props.theme.color.primary};
    }
`;

const SelectorRange = styled(Slider.Range)`
    height: 100% !important;
    .rc-slider-rail {
        visibility: hidden;
    }
    .rc-slider-track {
        height: 100%;
        border: none;
        border-radius: 0;
        margin-top: -5px;
        box-shadow: none !important;
        background-color: ${props => props.theme.color.primary}40;
    }
    .rc-slider-handle {
        height: 100%;
        border-radius: 2px;
        border: none;
        box-shadow: none !important;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        background-color: ${props => props.theme.color.primary};
    }
`;

class Calendar extends PureComponent {
    constructor() {
        super();
        this.timeline = React.createRef();
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            hour: 0,
            hourTer: 0,
            value: moment().set({ hour: 0, minute: 0 }),
            valueTer: moment()
                .set({ hour: 0, minute: 0 })
                .add(1, 'minute')
        };
    }
    componentWillMount() {
        if (this.props.onChange) this.props.onChange(this.state.value);
    }
    onDateClick = day => {
        if (this.props.range) {
            const value = moment(day)
                .set('hour', 0)
                .add(this.state.hour, 'hour');
            const valueTer = moment(day)
                .set('hour', 0)
                .add(this.state.hourTer, 'hour');
            this.setState({
                selectedDate: day,
                value,
                valueTer
            });
            if (this.props.onChange) this.props.onChange(value.toISOString(), valueTer.toISOString());
        } else {
            const value = moment(day)
                .set('hour', 0)
                .add(this.state.hour, 'hour');
            this.setState({
                selectedDate: day,
                value
            });
            if (this.props.onChange) this.props.onChange(value.toISOString());
        }
    };
    nextMonth = () => {
        this.setState({
            currentMonth: moment(this.state.currentMonth).add(1, 'month')
        });
    };
    prevMonth = () => {
        this.setState({
            currentMonth: moment(this.state.currentMonth).subtract(1, 'month')
        });
    };
    timelineChange = v => {
        const value = moment(this.state.selectedDate)
            .set('hour', 0)
            .add(v, 'hour');
        this.setState({ hour: v, value });
        if (this.props.onChange) this.props.onChange(value.toISOString());
    };
    rangeChange = v => {
        const value = moment(this.state.selectedDate)
            .set('hour', 0)
            .add(v[0], 'hour');
        const valueTer = moment(this.state.selectedDate)
            .set('hour', 0)
            .add(v[1], 'hour');
        this.setState({ hour: v[0], hourTer: v[1], value, valueTer });
        if (this.props.onChange) this.props.onChange(value.toISOString(), valueTer.toISOString());
    };
    renderHeader() {
        const dateFormat = 'MMMM YYYY';
        return (
            <Header>
                <Label margin>Dia</Label>
                <Grid.Row alignItems="center">
                    <Item>
                        <Button icon rounded onClick={this.prevMonth}>
                            <MdChevronLeft />
                        </Button>
                    </Item>
                    <Item grow>
                        <Title>{moment(this.state.currentMonth).format(dateFormat)}</Title>
                    </Item>
                    <Item>
                        <Button icon rounded onClick={this.nextMonth}>
                            <MdChevronRight />
                        </Button>
                    </Item>
                </Grid.Row>
            </Header>
        );
    }
    renderDays() {
        const dateFormat = 'ddd';
        const days = [];
        let startDate = moment(this.state.currentMonth).startOf('week');
        for (let i = 0; i < 7; i++) {
            days.push(
                <Item grow key={i}>
                    {moment(startDate)
                        .add(i, 'day')
                        .format(dateFormat)}
                </Item>
            );
        }
        return (
            <Item week day grow>
                {days}
            </Item>
        );
    }
    renderBody() {
        return (
            <Body>
                {this.renderDays()}
                {this.renderCells()}
            </Body>
        );
    }
    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = moment(currentMonth).startOf('month');
        const monthEnd = moment(monthStart).endOf('month');
        const startDate = moment(monthStart).startOf('week');
        const endDate = moment(monthEnd).endOf('week');
        const dateFormat = 'D';
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = moment(day).format(dateFormat);
                const cloneDay = day;
                days.push(
                    <DayItem
                        grow
                        className={`${
                            !moment(day).isSame(monthStart, 'month') ||
                            moment()
                                .subtract(1, 'day')
                                .isAfter(day)
                                ? 'disabled'
                                : moment(day).isSame(selectedDate, 'day')
                                    ? 'selected'
                                    : ''
                        }`}
                        key={day}
                        onClick={
                            !moment(day).isSame(monthStart, 'month') ||
                            moment()
                                .subtract(1, 'day')
                                .isAfter(day)
                                ? () => {}
                                : () => this.onDateClick(moment(cloneDay))
                        }>
                        <Day>{formattedDate}</Day>
                        <DayBg>{formattedDate}</DayBg>
                    </DayItem>
                );
                day = moment(day).add(1, 'day');
            }
            rows.push(
                <Item day grow key={day}>
                    {days}
                </Item>
            );
            days = [];
        }
        return rows;
    }
    renderFooter() {
        return (
            <Footer>
                <Label margin>Horário</Label>
                {this.renderTimeline()}
            </Footer>
        );
    }
    renderForm() {
        return (
            <Input
                type="text"
                value={
                    this.props.value
                        ? this.props.value
                        : this.props.range
                            ? moment(this.state.value).format('DD/MM/YYYY [dás] HH:mm') +
                              ' até ' +
                              moment(this.state.valueTer).format('HH:mm')
                            : moment(this.state.value).format('DD/MM/YYYY [ás] HH:mm')
                }
                readOnly
            />
        );
    }
    renderTimeline() {
        let marks = [];
        for (let i = this.props.min + 1; i < this.props.max; i++) {
            const left = (100 / (this.props.max - this.props.min)) * i;
            marks.push({ left });
        }
        return (
            <Time>
                {marks.map((m, i) => (
                    <Mark key={i} style={{ left: `${m.left}%` }} />
                ))}
                {this.props.range ? (
                    <SelectorRange max={this.props.max} min={this.props.min} onChange={this.rangeChange} step={0.1} />
                ) : (
                    <Selector max={this.props.max} min={this.props.min} onChange={this.timelineChange} step={0.1} />
                )}
            </Time>
        );
    }
    render() {
        return (
            <Wrapper>
                {this.renderForm()}
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </Wrapper>
        );
    }
}

Calendar.defaultProps = {
    min: 0,
    max: 24
};

export default Calendar;
