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

import { Creators as funcionarioActions } from '../../redux/ducks/funcionario';

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

class Funcionario extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            openNew: false,
            openModal: 0,
            edit: false,
            editID: 0,
            editNome: '',
            editCel: '',
            editCargo: '',
            editEmpr: '',
            search: '',
            Nome: '',
            Cel: '',
            Cargo: '',
            Empr: '',
            row: 10,
            page: 1,
            desc: false,
            sort: 0,
            selected: [],
            loading: true
        };
    }
    componentWillMount() {
        if (!this.props.funcionario.funcionarios.length) this.props.requestFuncionarioLoad();
    }
    componentDidUpdate(props) {
        if (props.funcionario.success && this.state.loading) {
            this.setState({ loading: false });
        }
    }
    handleNew = () => this.setState({ openNew: true });
    handleClose = () => this.setState({ openNew: false, Num: '', edit: false, editID: 0 });
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleSearch = () => this.setState(state => ({ open: !state.open }));
    handleEdit = prop => () =>
        this.setState({
            edit: true,
            editID: prop.ID,
            editNome: prop.NOME,
            editCel: prop.CEL,
            editCargo: prop.CARGO,
            editEmpr: prop.EMPR
        });
    handleDelete = () => {
        this.props.requestFuncionarioDelete(this.state.selected, this.handleAddUndo);
        this.setState({ selected: [] });
    };
    handleDeleteUndo = id => () => {
        this.props.requestFuncionarioDelete([id]);
        toast.dismiss(id);
    };
    handleAddUndo = (nome, cel, cargo, empr, id) => () => {
        this.props.requestFuncionario(nome, cel, cargo, empr);
        toast.dismiss(id);
    };
    handleEditUndo = (nome, cel, cargo, empr, id) => () => {
        this.props.requestFuncionarioEdit(nome, cel, cargo, empr, id);
        toast.dismiss(id);
    };
    handleSubmit = prop => () => {
        if (prop === 'new') {
            this.props.requestFuncionario(
                this.state.Nome,
                this.state.Cel,
                this.state.Cargo,
                this.state.Empr,
                this.handleDeleteUndo
            );
            this.setState({ openNew: false, Nome: '', Cel: '', Cargo: '', Empr: '' });
        }
        if (prop === 'edit') {
            const func = this.props.funcionario.funcionarios.filter(x => x.FUNC_INT_ID === this.state.editID)[0];
            this.props.requestFuncionarioEdit(
                this.state.editNome,
                this.state.editCel,
                this.state.editCargo,
                this.state.editEmpr,
                this.state.editID,
                this.handleEditUndo,
                func.FUNC_STR_NOME,
                func.FUNC_STR_CEL,
                func.FUNC_STR_CARGO,
                func.FUNC_STR_EMPR
            );
            this.setState({ edit: false, editID: 0, editNome: '', editCel: '', editCargo: '', editEmpr: '' });
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
            selected: compare(state.selected, [...this.props.funcionario.funcionarios.map(b => b.FUNC_INT_ID)])
                ? []
                : [...this.props.funcionario.funcionarios.map(b => b.FUNC_INT_ID)]
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
            editNome,
            editCel,
            editCargo,
            editEmpr,
            Nome,
            Cel,
            Cargo,
            Empr,
            row,
            page
        } = this.state;
        const funcionarios = this.props.funcionario.funcionarios;
        return (
            <Container>
                {this.props.funcionario.loading && this.state.loading ? (
                    <Loading.Component />
                ) : (
                    <Fragment>
                        <Typo.Title variant="white">Funcionários</Typo.Title>
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
                                                    <Typo.Heading>Lista de funcionários</Typo.Heading>
                                                    <Typo.SubHeading helper>Comece adicionando um!</Typo.SubHeading>
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
                                                    !compare(selected, [...funcionarios.map(b => b.FUNC_INT_ID)])
                                                }
                                                checked={compare(selected, [...funcionarios.map(b => b.FUNC_INT_ID)])}
                                            />
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 0 ? 'primary' : 'white'}
                                                onClick={this.handleSort(0)}
                                                action={1}>
                                                <Sort desc={desc && sort === 0 ? 1 : 0} />
                                                Nome
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 1 ? 'primary' : 'white'}
                                                onClick={this.handleSort(1)}
                                                action={1}>
                                                <Sort desc={desc && sort === 1 ? 1 : 0} />
                                                Telefone
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 2 ? 'primary' : 'white'}
                                                onClick={this.handleSort(2)}
                                                action={1}>
                                                <Sort desc={desc && sort === 2 ? 1 : 0} />
                                                Cargo
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 3 ? 'primary' : 'white'}
                                                onClick={this.handleSort(3)}
                                                action={1}>
                                                <Sort desc={desc && sort === 3 ? 1 : 0} />
                                                Empresa
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item action={1} right>
                                            {selected.length === 1 && (
                                                <Form.Button
                                                    icon
                                                    rounded
                                                    onClick={this.handleEdit({
                                                        ID: selected[0],
                                                        NOME: funcionarios.filter(x => x.FUNC_INT_ID === selected[0])[0]
                                                            .FUNC_STR_NOME,
                                                        CEL: funcionarios.filter(x => x.FUNC_INT_ID === selected[0])[0]
                                                            .FUNC_STR_CEL,
                                                        CARGO: funcionarios.filter(
                                                            x => x.FUNC_INT_ID === selected[0]
                                                        )[0].FUNC_STR_CARGO,
                                                        EMPR: funcionarios.filter(x => x.FUNC_INT_ID === selected[0])[0]
                                                            .FUNC_STR_EMPR
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
                                                    value={Nome}
                                                    onChange={this.handleChange('Nome')}
                                                />
                                            </Grid.Table.Item>
                                            <Grid.Table.Item>
                                                <Form.Control
                                                    helper
                                                    value={Cel}
                                                    mask={[
                                                        '(',
                                                        /[1-9]/,
                                                        /\d/,
                                                        ')',
                                                        ' ',
                                                        /\d/,
                                                        /\d/,
                                                        /\d/,
                                                        /\d/,
                                                        /\d/,
                                                        '-',
                                                        /\d/,
                                                        /\d/,
                                                        /\d/,
                                                        /\d/
                                                    ]}
                                                    onChange={this.handleChange('Cel')}
                                                />
                                            </Grid.Table.Item>
                                            <Grid.Table.Item>
                                                <Form.Control
                                                    helper
                                                    value={Cargo}
                                                    onChange={this.handleChange('Cargo')}
                                                />
                                            </Grid.Table.Item>
                                            <Grid.Table.Item>
                                                <Form.Control
                                                    helper
                                                    value={Empr}
                                                    onChange={this.handleChange('Empr')}
                                                />
                                            </Grid.Table.Item>
                                            <Grid.Table.Item action={1} right>
                                                <Form.Button raised onClick={this.handleSubmit('new')}>
                                                    Adicionar
                                                </Form.Button>{' '}
                                                <Form.Button onClick={this.handleClose}>Cancelar</Form.Button>
                                            </Grid.Table.Item>
                                        </Grid.Table.Cell>
                                    )}
                                    {funcionarios
                                        .filter(a => {
                                            if (search) {
                                                let rgx = `${search}`;
                                                let rg = new RegExp(rgx, 'gmi');
                                                return (
                                                    rg.test(a.FUNC_STR_NOME) ||
                                                    rg.test(a.FUNC_STR_CEL) ||
                                                    rg.test(a.FUNC_STR_CARGO) ||
                                                    rg.test(a.FUNC_STR_EMPR)
                                                );
                                            } else {
                                                return a;
                                            }
                                        })
                                        .sort((a, b) => {
                                            const values = [
                                                'FUNC_STR_NOME',
                                                'FUNC_STR_CEL',
                                                'FUNC_STR_CARGO',
                                                'FUNC_STR_EMPR'
                                            ];
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
                                                key={b.FUNC_INT_ID}
                                                page={funcionarios.length < row}
                                                selected={selected.find(x => x === b.FUNC_INT_ID)}>
                                                {selected[0] === b.FUNC_INT_ID && selected.length === 1 && edit ? (
                                                    <Fragment>
                                                        <Grid.Table.Item left>
                                                            <Form.Control
                                                                value={editNome}
                                                                onChange={this.handleChange('editNome')}
                                                                helper
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Form.Control
                                                                value={editCel}
                                                                onChange={this.handleChange('editCel')}
                                                                helper
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Form.Control
                                                                value={editCargo}
                                                                onChange={this.handleChange('editCargo')}
                                                                helper
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Form.Control
                                                                value={editEmpr}
                                                                onChange={this.handleChange('editEmpr')}
                                                                helper
                                                            />
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
                                                                onClick={this.handleSelect(b.FUNC_INT_ID)}
                                                                checked={selected.find(x => x === b.FUNC_INT_ID)}
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.FUNC_STR_NOME}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.FUNC_STR_CEL}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.FUNC_STR_CARGO}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.FUNC_STR_EMPR}
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
                                                    funcionarios.filter(a => {
                                                        if (search) {
                                                            let rgx = `${search}`;
                                                            let rg = new RegExp(rgx, 'gmi');
                                                            return (
                                                                rg.test(a.FUNC_STR_NOME) ||
                                                                rg.test(a.FUNC_STR_CEL) ||
                                                                rg.test(a.FUNC_STR_CARGO) ||
                                                                rg.test(a.FUNC_STR_EMPR)
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
                                                        funcionarios.filter(a => {
                                                            if (search) {
                                                                let rgx = `${search}`;
                                                                let rg = new RegExp(rgx, 'gmi');
                                                                return (
                                                                    rg.test(a.FUNC_STR_NOME) ||
                                                                    rg.test(a.FUNC_STR_CEL) ||
                                                                    rg.test(a.FUNC_STR_CARGO) ||
                                                                    rg.test(a.FUNC_STR_EMPR)
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
    funcionario: state.funcionario
});

const mapDispatchToProps = dispatch => bindActionCreators(funcionarioActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Funcionario);
