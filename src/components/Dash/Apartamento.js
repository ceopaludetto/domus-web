import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    MdAdd,
    MdSearch,
    MdArrowDownward,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdDelete,
    MdEdit
} from 'react-icons/md';

import { Creators as apartamentoActions } from '../../redux/ducks/apartamento';
import { Creators as blocoActions } from '../../redux/ducks/bloco';

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

class Apartamento extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            openNew: false,
            openModal: 0,
            edit: false,
            editID: 0,
            editNum: 0,
            editAnd: 0,
            editBloco: 0,
            search: '',
            Num: 0,
            And: 0,
            Bloco: -1,
            row: 10,
            page: 1,
            desc: false,
            sort: 0,
            selected: [],
            loading: true
        };
    }
    componentWillMount() {
        if (!this.props.apartamento.apartamentos.length) this.props.actions.requestApartamentoLoad();
        if (!this.props.bloco.blocos.length) this.props.actions.requestBlocoLoad();
    }
    componentDidUpdate(props) {
        if (props.bloco.success && props.apartamento.success && this.state.loading) {
            this.setState({ loading: false });
        }
    }
    handleNew = () => this.setState({ openNew: true });
    handleClose = () => this.setState({ openNew: false, Num: '', edit: false, editID: 0 });
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleSearch = () => this.setState(state => ({ open: !state.open }));
    handleEdit = prop => () =>
        this.setState({ edit: true, editID: prop.ID, editNum: prop.NUM, editBloco: prop.BLOCO, editAnd: prop.AND });
    handleDelete = () => {
        this.props.actions.requestApartamentoDelete(this.state.selected, this.handleAddUndo);
        this.setState({ selected: [] });
    };
    handleDeleteUndo = id => () => {
        this.props.actions.requestApartamentoDelete([id]);
        toast.dismiss(id);
    };
    handleAddUndo = (num, and, bloco, id) => () => {
        this.props.actions.requestApartamento(num, and, bloco);
        toast.dismiss(id);
    };
    handleEditUndo = (num, and, bloco, id) => () => {
        this.props.actions.requestApartamentoEdit(num, and, bloco, id);
        toast.dismiss(id);
    };
    handleSubmit = prop => () => {
        if (prop === 'new') {
            this.props.actions.requestApartamento(
                this.state.Num,
                this.state.And,
                this.state.Bloco,
                this.handleDeleteUndo
            );
            this.setState({ openNew: false, Num: 0, And: 0, Bloco: -1 });
        }
        if (prop === 'edit') {
            const apto = this.props.apartamento.apartamentos.filter(x => x.APTO_INT_ID === this.state.editID)[0];
            this.props.actions.requestApartamentoEdit(
                this.state.editNum,
                this.state.editAnd,
                this.state.editBloco,
                this.state.editID,
                this.handleEditUndo,
                apto.APTO_INT_NUM,
                apto.APTO_INT_AND,
                apto.BLO_INT_ID
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
            selected: compare(state.selected, [...this.props.apartamento.apartamentos.map(b => b.APTO_INT_ID)])
                ? []
                : [...this.props.apartamento.apartamentos.map(b => b.APTO_INT_ID)]
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
            editNum,
            editAnd,
            editBloco,
            Num,
            And,
            Bloco,
            row,
            page
        } = this.state;
        const apartamentos = this.props.apartamento.apartamentos;
        const blocos = this.props.bloco.blocos;
        return (
            <Container>
                {this.props.apartamento.loading && this.props.bloco.loading && this.state.loading ? (
                    <Loading.Component />
                ) : (
                    <Fragment>
                        <Typo.Title variant="white">Apartamentos</Typo.Title>
                        <Typo.SubTitle variant="primary">Suíte?</Typo.SubTitle>
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
                                                    <Typo.Heading>Lista de apartamentos</Typo.Heading>
                                                    <Typo.SubHeading helper>Comece adicionando um!</Typo.SubHeading>
                                                </Fragment>
                                            )}
                                        </Grid.Table.Item>
                                        <Grid.Table.Item flex action={1} right>
                                            {apartamentos.length === 0 && (
                                                <Form.Button icon>Gerar automático</Form.Button>
                                            )}
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
                                                    !compare(selected, [...apartamentos.map(b => b.APTO_INT_ID)])
                                                }
                                                checked={compare(selected, [...apartamentos.map(b => b.APTO_INT_ID)])}
                                            />
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 0 ? 'primary' : 'white'}
                                                onClick={this.handleSort(0)}
                                                action={1}>
                                                <Sort desc={desc && sort === 0 ? 1 : 0} />
                                                Número
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 1 ? 'primary' : 'white'}
                                                onClick={this.handleSort(1)}
                                                action={1}>
                                                <Sort desc={desc && sort === 1 ? 1 : 0} />
                                                Andar
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 2 ? 'primary' : 'white'}
                                                onClick={this.handleSort(2)}
                                                action={1}>
                                                <Sort desc={desc && sort === 2 ? 1 : 0} />
                                                Bloco
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item action={1} right>
                                            {selected.length === 1 && (
                                                <Form.Button
                                                    icon
                                                    rounded
                                                    onClick={this.handleEdit({
                                                        ID: selected[0],
                                                        NUM: apartamentos.filter(x => x.APTO_INT_ID === selected[0])[0]
                                                            .APTO_INT_NUM,
                                                        BLOCO: apartamentos.filter(
                                                            x => x.APTO_INT_ID === selected[0]
                                                        )[0].BLOCO.BLO_INT_ID,
                                                        AND: apartamentos.filter(x => x.APTO_INT_ID === selected[0])[0]
                                                            .APTO_INT_AND
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
                                                <Form.Control helper value={Num} onChange={this.handleChange('Num')} />
                                            </Grid.Table.Item>
                                            <Grid.Table.Item>
                                                <Form.Control helper value={And} onChange={this.handleChange('And')} />
                                            </Grid.Table.Item>
                                            <Grid.Table.Item>
                                                <Form.Select helper value={Bloco} onChange={this.handleChange('Bloco')}>
                                                    <option value={-1}>Selecione um bloco</option>
                                                    {blocos.map(x => (
                                                        <option key={x.BLO_INT_ID} value={x.BLO_INT_ID}>
                                                            {x.BLO_STR_NOME}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Grid.Table.Item>
                                            <Grid.Table.Item action={1} right>
                                                <Form.Button raised onClick={this.handleSubmit('new')}>
                                                    Adicionar
                                                </Form.Button>{' '}
                                                <Form.Button onClick={this.handleClose}>Cancelar</Form.Button>
                                            </Grid.Table.Item>
                                        </Grid.Table.Cell>
                                    )}
                                    {apartamentos
                                        .filter(a => {
                                            if (search) {
                                                let rgx = `${search}`;
                                                let rg = new RegExp(rgx, 'gmi');
                                                return (
                                                    rg.test(a.APTO_INT_NUM) ||
                                                    rg.test(a.APTO_INT_AND) ||
                                                    rg.test(a.BLOCO.BLO_STR_NOME)
                                                );
                                            } else {
                                                return a;
                                            }
                                        })
                                        .sort((a, b) => {
                                            const values = ['APTO_INT_NUM', 'APTO_INT_AND', 'BLO_STR_NOME'];
                                            if (sort === 2) {
                                                if (desc) {
                                                    if (a.BLOCO[values[sort]] < b.BLOCO[values[sort]]) return 1;
                                                    if (a.BLOCO[values[sort]] > b.BLOCO[values[sort]]) return -1;
                                                } else {
                                                    if (a.BLOCO[values[sort]] < b.BLOCO[values[sort]]) return -1;
                                                    if (a.BLOCO[values[sort]] > b.BLOCO[values[sort]]) return 1;
                                                }
                                            } else {
                                                if (desc) {
                                                    if (a[values[sort]] < b[values[sort]]) return 1;
                                                    if (a[values[sort]] > b[values[sort]]) return -1;
                                                } else {
                                                    if (a[values[sort]] < b[values[sort]]) return -1;
                                                    if (a[values[sort]] > b[values[sort]]) return 1;
                                                }
                                                return 0;
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
                                                key={b.APTO_INT_ID}
                                                page={apartamentos.length < row}
                                                selected={selected.find(x => x === b.APTO_INT_ID)}>
                                                {selected[0] === b.APTO_INT_ID && selected.length === 1 && edit ? (
                                                    <Fragment>
                                                        <Grid.Table.Item left>
                                                            <Form.Control
                                                                value={editNum}
                                                                onChange={this.handleChange('editNum')}
                                                                helper
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Form.Control
                                                                value={editAnd}
                                                                onChange={this.handleChange('editAnd')}
                                                                helper
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Form.Select
                                                                value={editBloco}
                                                                onChange={this.handleChange('editBloco')}
                                                                helper>
                                                                {blocos.map(a => (
                                                                    <option key={a.BLO_INT_ID} value={a.BLO_INT_ID}>
                                                                        {a.BLO_STR_NOME}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </Grid.Table.Item>
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
                                                                onClick={this.handleSelect(b.APTO_INT_ID)}
                                                                checked={selected.find(x => x === b.APTO_INT_ID)}
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.APTO_INT_NUM}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.APTO_INT_AND}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.BLOCO.BLO_STR_NOME}
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
                                                    apartamentos.filter(a => {
                                                        if (search) {
                                                            let rgx = `${search}`;
                                                            let rg = new RegExp(rgx, 'gmi');
                                                            return (
                                                                rg.test(a.APTO_INT_NUM) ||
                                                                rg.test(a.APTO_INT_AND) ||
                                                                rg.test(a.BLOCO.BLO_STR_NOME)
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
                                                        apartamentos.filter(a => {
                                                            if (search) {
                                                                let rgx = `${search}`;
                                                                let rg = new RegExp(rgx, 'gmi');
                                                                return (
                                                                    rg.test(a.APTO_INT_NUM) ||
                                                                    rg.test(a.APTO_INT_AND) ||
                                                                    rg.test(a.BLOCO.BLO_STR_NOME)
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
    apartamento: state.apartamento,
    bloco: state.bloco
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, apartamentoActions, blocoActions), dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Apartamento);
