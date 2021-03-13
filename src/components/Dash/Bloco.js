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
    MdEdit,
    MdClose
} from 'react-icons/md';

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

class Bloco extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            openNew: false,
            openModal: 0,
            edit: false,
            editID: 0,
            editNome: '',
            search: '',
            Nome: '',
            row: 10,
            page: 1,
            desc: false,
            selected: [],
            loading: true
        };
    }
    componentWillMount() {
        if (!this.props.bloco.blocos.length) this.props.requestBlocoLoad();
    }
    componentDidUpdate(props) {
        if (props.bloco.success && this.state.loading) {
            this.setState({ loading: false });
        }
    }
    handleNew = () => this.setState({ openNew: true });
    handleClose = () => this.setState({ openNew: false, Nome: '', edit: false, editID: 0 });
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleSearch = () => this.setState(state => ({ open: !state.open }));
    handleEdit = prop => () => this.setState({ edit: true, editID: prop.ID, editNome: prop.NOME });
    handleDelete = () => {
        this.props.requestBlocoDelete(this.state.selected, this.handleAddUndo);
        this.setState({ selected: [] });
    };
    handleDeleteUndo = id => () => {
        this.props.requestBlocoDelete([id]);
        toast.dismiss(id);
    };
    handleAddUndo = (nome, id) => () => {
        this.props.requestBloco(nome);
        toast.dismiss(id);
    };
    handleEditUndo = (nome, id) => () => {
        this.props.requestBlocoEdit(nome, id);
        toast.dismiss(id);
    };
    handleSubmit = prop => () => {
        if (prop === 'new') {
            this.props.requestBloco(this.state.Nome, this.handleDeleteUndo);
            this.setState({ openNew: false, Nome: '' });
        }
        if (prop === 'edit') {
            this.props.requestBlocoEdit(
                this.state.editNome,
                this.state.editID,
                this.handleEditUndo,
                this.props.bloco.blocos.filter(x => x.BLO_INT_ID === this.state.editID)[0].BLO_STR_NOME
            );
            this.setState({ edit: false, editID: 0, editNome: '' });
        }
    };
    handleSort = () => this.setState(state => ({ desc: !state.desc }));
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
            selected: compare(state.selected, [...this.props.bloco.blocos.map(b => b.BLO_INT_ID)])
                ? []
                : [...this.props.bloco.blocos.map(b => b.BLO_INT_ID)]
        }));
    render() {
        const { open, search, selected, desc, openNew, edit, editNome, Nome, row, page } = this.state;
        const blocos = this.props.bloco.blocos;
        return (
            <Container>
                {this.props.bloco.loading && this.state.loading ? (
                    <Loading.Component />
                ) : (
                    <Fragment>
                        <Typo.Title variant="white">Blocos</Typo.Title>
                        <Typo.SubTitle variant="primary">Ja é carnaval?</Typo.SubTitle>
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
                                                    <Typo.Heading>Lista de blocos</Typo.Heading>
                                                    <Typo.SubHeading helper>Comece adicionando um!</Typo.SubHeading>
                                                </Fragment>
                                            )}
                                        </Grid.Table.Item>
                                        <Grid.Table.Item action={1} right>
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
                                                    !compare(selected, [...blocos.map(b => b.BLO_INT_ID)])
                                                }
                                                checked={compare(selected, [...blocos.map(b => b.BLO_INT_ID)])}
                                            />
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold helper variant="primary" onClick={this.handleSort} action={1}>
                                                <Sort desc={desc ? 1 : 0} />
                                                Nome
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item action={1} right>
                                            {selected.length === 1 && (
                                                <Form.Button
                                                    icon
                                                    rounded
                                                    onClick={this.handleEdit({
                                                        ID: selected[0],
                                                        NOME: blocos.filter(x => x.BLO_INT_ID === selected[0])[0]
                                                            .BLO_STR_NOME
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
                                    {blocos
                                        .filter(b => {
                                            if (search) {
                                                let rgx = `${search}`;
                                                let rg = new RegExp(rgx, 'gmi');
                                                return rg.test(b.BLO_STR_NOME);
                                            } else {
                                                return b;
                                            }
                                        })
                                        .sort((a, b) => {
                                            if (desc) {
                                                if (a.BLO_STR_NOME < b.BLO_STR_NOME) return 1;
                                                if (a.BLO_STR_NOME > b.BLO_STR_NOME) return -1;
                                            } else {
                                                if (a.BLO_STR_NOME < b.BLO_STR_NOME) return -1;
                                                if (a.BLO_STR_NOME > b.BLO_STR_NOME) return 1;
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
                                                key={b.BLO_INT_ID}
                                                page={blocos.length < row}
                                                selected={selected.find(x => x === b.BLO_INT_ID)}>
                                                {selected[0] === b.BLO_INT_ID && selected.length === 1 && edit ? (
                                                    <Fragment>
                                                        <Grid.Table.Item left>
                                                            <Form.Control
                                                                value={editNome}
                                                                onChange={this.handleChange('editNome')}
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
                                                                onClick={this.handleSelect(b.BLO_INT_ID)}
                                                                checked={selected.find(x => x === b.BLO_INT_ID)}
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.BLO_STR_NOME}
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
                                                    blocos.filter(b => {
                                                        if (search) {
                                                            let rgx = `${search}`;
                                                            let rg = new RegExp(rgx, 'gmi');
                                                            return rg.test(b.BLO_STR_NOME);
                                                        } else {
                                                            return b;
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
                                                        blocos.filter(b => {
                                                            if (search) {
                                                                let rgx = `${search}`;
                                                                let rg = new RegExp(rgx, 'gmi');
                                                                return rg.test(b.BLO_STR_NOME);
                                                            } else {
                                                                return b;
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
    bloco: state.bloco
});

const mapDispatchToProps = dispatch => bindActionCreators(blocoActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bloco);
