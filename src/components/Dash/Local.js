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

import { Creators as localActions } from '../../redux/ducks/local';

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

class Local extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            openNew: false,
            openModal: 0,
            edit: false,
            editID: 0,
            editNome: '',
            editDesc: '',
            editQtde: 0,
            search: '',
            Nome: '',
            Desc: '',
            Qtde: 0,
            row: 10,
            page: 1,
            desc: false,
            sort: 0,
            selected: [],
            loading: true
        };
    }
    componentWillMount() {
        if (!this.props.local.locais.length) this.props.requestLocalLoad();
    }
    componentDidUpdate(props) {
        if (props.local.success && this.state.loading) {
            this.setState({ loading: false });
        }
    }
    handleNew = () => this.setState({ openNew: true });
    handleClose = () => this.setState({ openNew: false, Nome: '', edit: false, editID: 0 });
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleSearch = () => this.setState(state => ({ open: !state.open }));
    handleEdit = prop => () =>
        this.setState({ edit: true, editID: prop.ID, editNome: prop.NOME, editQtde: prop.QTDE, editDesc: prop.DESC });
    handleDelete = () => {
        this.props.requestLocalDelete(this.state.selected, this.handleAddUndo);
        this.setState({ selected: [] });
    };
    handleDeleteUndo = id => () => {
        this.props.requestLocalDelete([id]);
        toast.dismiss(id);
    };
    handleAddUndo = (nome, desc, qtde, id) => () => {
        this.props.requestLocal(nome, desc, qtde);
        toast.dismiss(id);
    };
    handleEditUndo = (nome, desc, qtde, id) => () => {
        this.props.requestLocalEdit(nome, desc, qtde, id);
        toast.dismiss(id);
    };
    handleSubmit = prop => () => {
        if (prop === 'new') {
            this.props.requestLocal(this.state.Nome, this.state.Desc, this.state.Qtde, this.handleDeleteUndo);
            this.setState({ openNew: false, Nome: '', Desc: '', Qtde: 0 });
        }
        if (prop === 'edit') {
            const local = this.props.local.locais.filter(x => x.LOC_INT_ID === this.state.editID)[0];
            this.props.requestLocalEdit(
                this.state.editNome,
                this.state.editDesc,
                this.state.editQtde,
                this.state.editID,
                this.handleEditUndo,
                local.LOC_STR_NOME,
                local.LOC_STR_DESC,
                local.LOC_INT_QTDE
            );
            this.setState({ edit: false, editID: 0, editNome: '', editDesc: '', editQtde: '' });
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
            selected: compare(state.selected, [...this.props.local.locais.map(b => b.LOC_INT_ID)])
                ? []
                : [...this.props.local.locais.map(b => b.LOC_INT_ID)]
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
            editDesc,
            editQtde,
            Nome,
            Desc,
            Qtde,
            row,
            page
        } = this.state;
        const apartamentos = this.props.local.locais;
        const locais = this.props.local.locais;
        return (
            <Container>
                {this.props.local.loading && this.state.loading ? (
                    <Loading.Component />
                ) : (
                    <Fragment>
                        <Typo.Title variant="white">Locais</Typo.Title>
                        <Typo.SubTitle variant="primary">Mal passada?</Typo.SubTitle>
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
                                                    <Typo.Heading>Lista de Locais</Typo.Heading>
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
                                                    !compare(selected, [...apartamentos.map(b => b.LOC_INT_ID)])
                                                }
                                                checked={compare(selected, [...apartamentos.map(b => b.LOC_INT_ID)])}
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
                                                Descrição
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item>
                                            <Typo.Bold
                                                helper
                                                variant={sort === 2 ? 'primary' : 'white'}
                                                onClick={this.handleSort(2)}
                                                action={1}>
                                                <Sort desc={desc && sort === 2 ? 1 : 0} />
                                                Quantidade
                                            </Typo.Bold>
                                        </Grid.Table.Item>
                                        <Grid.Table.Item action={1} right>
                                            {selected.length === 1 && (
                                                <Form.Button
                                                    icon
                                                    rounded
                                                    onClick={this.handleEdit({
                                                        ID: selected[0],
                                                        NOME: locais.filter(x => x.LOC_INT_ID === selected[0])[0]
                                                            .LOC_STR_NOME,
                                                        DESC: locais.filter(x => x.LOC_INT_ID === selected[0])[0]
                                                            .LOC_STR_DESC,
                                                        QTDE: locais.filter(x => x.LOC_INT_ID === selected[0])[0]
                                                            .LOC_INT_QTDE
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
                                                    value={Desc}
                                                    onChange={this.handleChange('Desc')}
                                                />
                                            </Grid.Table.Item>
                                            <Grid.Table.Item>
                                                <Form.Control
                                                    helper
                                                    value={Qtde}
                                                    onChange={this.handleChange('Qtde')}
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
                                    {apartamentos
                                        .filter(a => {
                                            if (search) {
                                                let rgx = `${search}`;
                                                let rg = new RegExp(rgx, 'gmi');
                                                return (
                                                    rg.test(a.LOC_STR_NOME) ||
                                                    rg.test(a.LOC_STR_DESC) ||
                                                    rg.test(a.LOC_INT_QTDE)
                                                );
                                            } else {
                                                return a;
                                            }
                                        })
                                        .sort((a, b) => {
                                            const values = ['LOC_STR_NOME', 'LOC_STR_DESC', 'LOC_INT_ID'];
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
                                                key={b.LOC_INT_ID}
                                                page={apartamentos.length < row}
                                                selected={selected.find(x => x === b.LOC_INT_ID)}>
                                                {selected[0] === b.LOC_INT_ID && selected.length === 1 && edit ? (
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
                                                                value={editDesc}
                                                                onChange={this.handleChange('editDesc')}
                                                                helper
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Form.Control
                                                                value={editQtde}
                                                                onChange={this.handleChange('editQtde')}
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
                                                                onClick={this.handleSelect(b.LOC_INT_ID)}
                                                                checked={selected.find(x => x === b.LOC_INT_ID)}
                                                            />
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.LOC_STR_NOME}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.LOC_STR_DESC}
                                                            </Typo.Bold>
                                                        </Grid.Table.Item>
                                                        <Grid.Table.Item>
                                                            <Typo.Bold variant="white" helper table>
                                                                {b.LOC_INT_QTDE}
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
                                                            return rg.test(a.APTO_INT_NUM);
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
                                                                return rg.test(a.APTO_INT_NUM);
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
    local: state.local
});

const mapDispatchToProps = dispatch => bindActionCreators(localActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Local);
