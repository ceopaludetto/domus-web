import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import moment from '../../utils/moment';
import styled from 'styled-components';
import {
    MdAdd,
    MdSearch,
    MdArrowDownward,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdDelete,
    MdEdit,
    MdClose
} from 'react-icons/md';

import { Creators as despesaActions } from '../../redux/ducks/despesa';

import Container from './Container';
import Typo from '../Typo/index';
import Grid from '../Grid/index';
import Form from '../Form/index';
import Loading from '../Loading/index';

const Control = styled(Form.Control)`
    display: ${props => (props.visible ? 'flex' : 'none')};
    margin-right: 0.5rem;
`;

const Sort = styled(MdArrowDownward)`
    transition: transform 250ms ease;
    transform: ${props => (props.desc ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

function compare(p, p2) {
    let array = p.sort((a, b) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    });
    let array2 = p2.sort((a, b) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    });
    if (!array) return false;
    if (array2.length !== array.length) return false;
    for (var i = 0, l = array2.length; i < l; i++) {
        if (array2[i] instanceof Array && array[i] instanceof Array) {
            if (!compare(array2[i], array[i])) return false;
        } else if (array2[i] !== array[i]) {
            return false;
        }
    }
    return true;
}

class Despesa extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            openNew: false,
            openModal: 0,
            edit: false,
            editID: 0,
            editDesc: 0,
            editVal: 0,
            search: '',
            Desc: '',
            Val: 0,
            row: 10,
            page: 1,
            desc: false,
            sort: 0,
            selected: [],
            loading: true
        };
    }
    componentWillMount() {
        if (!this.props.despesa.despesas.length) this.props.requestDespesaLoad();
    }
    componentDidUpdate(props) {
        if (props.despesa.success && this.state.loading) {
            this.setState({ loading: false });
        }
    }
    handleNew = () => this.setState({ openNew: true });
    handleClose = () => this.setState({ openNew: false, Desc: '', edit: false, editID: 0 });
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleSearch = () => this.setState(state => ({ open: !state.open }));
    handleEdit = prop => () => this.setState({ edit: true, editID: prop.ID, editDesc: prop.DESC, editVal: prop.VAL });
    handleDelete = () => {
        this.props.requestDespesaDelete(this.state.selected, this.handleAddUndo);
        this.setState({ selected: [] });
    };
    handleDeleteUndo = id => () => {
        this.props.requestDespesaDelete([id]);
        toast.dismiss(id);
    };
    handleAddUndo = (desc, val, id) => () => {
        this.props.requestDespesa(desc, val);
        toast.dismiss(id);
    };
    handleEditUndo = (desc, val, id) => () => {
        this.props.requestDespesaEdit(desc, val, id);
        toast.dismiss(id);
    };
    handleSubmit = prop => () => {
        if (prop === 'new') {
            this.props.requestDespesa(this.state.Desc, this.state.Val, this.handleDeleteUndo);
            this.setState({ openNew: false, Desc: '', Val: 0 });
        }
        if (prop === 'edit') {
            const desp = this.props.despesa.despesas.filter(x => x.DESP_INT_ID === this.state.editID)[0];
            this.props.requestDespesaEdit(
                this.state.editDesc,
                this.state.editVal,
                this.state.editID,
                this.handleEditUndo,
                desp.DESP_STR_DESC,
                desp.DESP_NM_VAL
            );
            this.setState({ edit: false, editID: 0, editNum: 0, editAnd: 0, editBloco: -1 });
        }
    };
    handleSort = prop => () => this.setState(state => (state.sort === prop ? { desc: !state.desc } : { sort: prop }));
    handleNext = () => this.setState(state => ({ page: state.page + 1 }));
    handlePrev = () => this.setState(state => ({ page: state.page - 1 }));
    handleSelect = prop => () =>
        this.setState(state => {
            if (state.selected.find(x => x === prop)) {
                return { selected: state.selected.filter(x => x !== prop) };
            } else {
                const arr = state.selected;
                arr.push(prop);
                return { selected: arr };
            }
        });
    handleSelectAll = () =>
        this.setState(state => ({
            selected: compare(state.selected, [...this.props.despesa.despesas.map(b => b.DESP_INT_ID)])
                ? []
                : [...this.props.despesa.despesas.map(b => b.DESP_INT_ID)]
        }));
    render() {
        const {
            open,
            search,
            selected,
            desc,
            sort,
            openNew,
            edit,
            editDesc,
            editVal,
            Desc,
            Val,
            row,
            page
        } = this.state;
        const despesas = this.props.despesa.despesas;
        return (
            <Container>
                {this.props.despesa.loading && this.state.loading ? (
                    <Loading.Component />
                ) : (
                    <Fragment>
                        <Typo.Title variant="white">Despesas</Typo.Title>
                        <Typo.SubTitle variant="primary">Bolsa!</Typo.SubTitle>
                        <Grid.Row>
                            <Grid.Col size={[{ break: 0, value: 12 }]}>
                                <Grid.Table.Frame>
                                    <Grid.Table.Head>
                                        <Grid.Table.Item left open={!open}>
                                            {open ? (
                                                <Control
                                                    grow={open ? 1 : 0}
                                                    visible={open ? 1 : 0}
                                                    helper
                                                    value={search}
                                                    onChange={this.handleChange('search')}
                                                />
                                            ) : (
                                                <Fragment>
                                                    <Typo.Heading>Lista de despesas</Typo.Heading>
                                                    <Typo.SubHeading helper>
                                                        Comece não adicionando uma!
                                                    </Typo.SubHeading>
                                                </Fragment>
                                            )}
                                        </Grid.Table.Item>
                                        <Grid.Table.Item flex action={1} right>
                                            <Form.Button rounded icon onClick={this.handleSearch}>
                                                <MdSearch />
                                            </Form.Button>{' '}
                                            <Form.Button rounded icon onClick={this.handleNew}>
                                                <MdAdd />
                                            </Form.Button>
                                        </Grid.Table.Item>
                                    </Grid.Table.Head>

                                    <Grid.Table.Cell padding={selected.length === 0} options>
                                        <Grid.Table.Item action={1} left>
                                            <Form.Check
                                                helper
                                                onClick={this.handleSelectAll}
                                                indeterminated={
                                                    selected.length > 0 &&
                                                    !compare(selected, [...despesas.map(b => b.DESP_INT_ID)])
                                                }
                                                checked={compare(selected, [...despesas.map(b => b.DESP_INT_ID)])}
                                            />
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 0 ? 'primary' : 'white'}
                                                onClick={this.handleSort(0)}
                                                action={1}>
                                                <Sort desc={desc && sort === 0 ? 1 : 0} />
                                                Descrição
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 1 ? 'primary' : 'white'}
                                                onClick={this.handleSort(1)}
                                                action={1}>
                                                <Sort desc={desc && sort === 1 ? 1 : 0} />
                                                Valor
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 2 ? 'primary' : 'white'}
                                                onClick={this.handleSort(2)}
                                                action={1}>
                                                <Sort desc={desc && sort === 2 ? 1 : 0} />
                                                Data
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item action={1} right>
                                            {selected.length === 1 && (
                                                <Form.Button
                                                    icon
                                                    rounded
                                                    onClick={this.handleEdit({
                                                        ID: selected[0],
                                                        DESC: despesas.filter(x => x.DESP_INT_ID === selected[0])[0]
                                                            .DESP_STR_DESC,
                                                        VAL: despesas.filter(x => x.DESP_INT_ID === selected[0])[0]
                                                            .DESP_NM_VAL
                                                    })}>
                                                    <MdEdit />
                                                </Form.Button>
                                            )}{' '}
                                            {selected.length > 0 && (
                                                <Form.Button icon rounded onClick={this.handleDelete}>
                                                    <MdDelete />
                                                </Form.Button>
                                            )}
                                        </Grid.Table.Item>
                                    </Grid.Table.Cell>
                                    {openNew && (
                                        <Grid.Table.Cell>
                                            <Grid.Table.Item left>
                                                <Form.Control
                                                    helper
                                                    value={Desc}
                                                    onChange={this.handleChange('Desc')}
                                                />
                                            </Grid.Table.Item>
                                            <Grid.Table.Item>
                                                <Form.Control
                                                    prepend="R$"
                                                    helper
                                                    value={Val}
                                                    onChange={this.handleChange('Val')}
                                                />
                                            </Grid.Table.Item>
                                            <Grid.Table.Item />
                                            <Grid.Table.Item action={1} right>
                                                <Form.Button icon rounded onClick={this.handleSubmit('new')}>
                                                    <MdAdd />
                                                </Form.Button>{' '}
                                                <Form.Button icon rounded onClick={this.handleClose}>
                                                    <MdClose />
                                                </Form.Button>
                                            </Grid.Table.Item>
                                        </Grid.Table.Cell>
                                    )}
                                    {despesas
                                        .filter(a => {
                                            if (search) {
                                                let rgx = `${search}`;
                                                let rg = new RegExp(rgx, 'gmi');
                                                return (
                                                    rg.test(a.DESP_STR_DESC) ||
                                                    rg.test(a.DESP_NM_VAL) ||
                                                    rg.test(a.DESP_DT_DATA)
                                                );
                                            } else {
                                                return a;
                                            }
                                        })
                                        .sort((a, b) => {
                                            const values = ['DESP_STR_DESC', 'DESP_NM_VAL', 'DESP_DT_DATA'];
                                            if (desc) {
                                                if (a[values[sort]] < b[values[sort]]) return 1;
                                                if (a[values[sort]] > b[values[sort]]) return -1;
                                            } else {
                                                if (a[values[sort]] < b[values[sort]]) return -1;
                                                if (a[values[sort]] > b[values[sort]]) return 1;
                                            }
                                            return 0;
                                        })
                                        .filter((b, i) => {
                                            let min = page * row - row;
                                            let max = page * row;
                                            if (i >= min && i < max) {
                                                return b;
                                            } else {
                                                return null;
                                            }
                                        })
                                        .map(b => (
                                            <Grid.Table.Cell
                                                key={b.DESP_INT_ID}
                                                page={despesas.length < row}
                                                selected={selected.find(x => x === b.DESP_INT_ID)}>
                                                {selected[0] === b.DESP_INT_ID && selected.length === 1 && edit ? (
                                                    <Fragment>
                                                        <Grid.Table.Item left>
                                                            <Form.Control
                                                                value={editDesc}
                                                                onChange={this.handleChange('editDesc')}
                                                                helper
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Form.Control
                                                                value={editVal}
                                                                onChange={this.handleChange('editVal')}
                                                                helper
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item />
                                                        <Grid.Table.Item action={1} right>
                                                            <Form.Button raised onClick={this.handleSubmit('edit')}>
                                                                Alterar
                                                            </Form.Button>{' '}
                                                            <Form.Button onClick={this.handleClose}>
                                                                Cancelar
                                                            </Form.Button>
                                                        </Grid.Table.Item>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <Grid.Table.Item action={1} left>
                                                            <Form.Check
                                                                helper
                                                                onClick={this.handleSelect(b.DESP_INT_ID)}
                                                                checked={selected.find(x => x === b.DESP_INT_ID)}
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.DESP_STR_DESC}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                R$ {b.DESP_NM_VAL}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {moment(b.DESP_DT_DATA).format('DD/MM/YYYY')}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                    </Fragment>
                                                )}
                                            </Grid.Table.Cell>
                                        ))}
                                    <Grid.Table.Head footer>
                                        <Grid.Table.Item />
                                        <Grid.Table.Item action={1}>
                                            <Typo.Bold variant="white" helper>
                                                Página {page} de{' '}
                                                {Math.ceil(
                                                    despesas.filter(a => {
                                                        if (search) {
                                                            let rgx = `${search}`;
                                                            let rg = new RegExp(rgx, 'gmi');
                                                            return (
                                                                rg.test(a.DESP_STR_DESC) ||
                                                                rg.test(a.DESP_NM_VAL) ||
                                                                rg.test(a.DESP_DT_DATA)
                                                            );
                                                        } else {
                                                            return a;
                                                        }
                                                    }).length / row
                                                )}
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item action={1} right>
                                            <Form.Button icon rounded onClick={this.handlePrev} disabled={page === 1}>
                                                <MdKeyboardArrowLeft />
                                            </Form.Button>{' '}
                                            <Form.Button
                                                icon
                                                rounded
                                                onClick={this.handleNext}
                                                disabled={
                                                    page ===
                                                    Math.ceil(
                                                        despesas.filter(a => {
                                                            if (search) {
                                                                let rgx = `${search}`;
                                                                let rg = new RegExp(rgx, 'gmi');
                                                                return (
                                                                    rg.test(a.DESP_STR_DESC) ||
                                                                    rg.test(a.DESP_NM_VAL) ||
                                                                    rg.test(a.DESP_DT_DATA)
                                                                );
                                                            } else {
                                                                return a;
                                                            }
                                                        }).length / row
                                                    )
                                                }>
                                                <MdKeyboardArrowRight />
                                            </Form.Button>
                                        </Grid.Table.Item>
                                    </Grid.Table.Head>
                                </Grid.Table.Frame>
                            </Grid.Col>
                        </Grid.Row>
                    </Fragment>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    despesa: state.despesa
});

const mapDispatchToProps = dispatch => bindActionCreators(despesaActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Despesa);
