import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Navbar,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import {
  getCurrencies,
  getSuppliers,
  getReceipts,
  saveReceipts,
  deleteReceipts,
  toggleModal,
  logOut
} from "../../actions";

class Home extends Component {
  columns = [
    {
      dataField: "receiptId",
      text: "FOLIO",
      sort: true
    },
    {
      dataField: "supplier",
      text: "PROVEEDOR",
      sort: true
    },
    {
      dataField: "amount",
      text: "MONTO",
      sort: true
    },
    {
      dataField: "currency",
      text: "MONEDA",
      sort: true
    },
    {
      dataField: "date",
      text: "FECHA",
      sort: true
    },
    {
      dataField: "comment",
      text: "COMENTARIO",
      sort: true
    }
  ];
  rowEvents = {
    onClick: (e, row) => {
      this.props.toggleModal(true);
      row.date = row.date.substring(0, 10);
      this.setState({
        receipt: row,
        IsEdit: true
      });
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      receipt: {
        receiptId: "0",
        amount: "",
        date: "",
        comment: "",
        currencyId: "0",
        supplierId: "0"
      },
      filters: {
        currencyId: "0",
        supplierId: "0"
      },
      IsEdit: false,
      validation: {
        amount: false,
        currencyId: false,
        supplierId: false,
        date: false
      },
      modalDel: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.save = this.save.bind(this);
    this.search = this.search.bind(this);
    this.delete = this.delete.bind(this);
    this.loadSuppliers = this.loadSuppliers.bind(this);
    this.loadCurrency = this.loadCurrency.bind(this);
    this.rowEvents.onClick = this.rowEvents.onClick.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeCurrencyNew = this.changeCurrencyNew.bind(this);
    this.changeSupplier = this.changeSupplier.bind(this);
    this.changeSupplierNew = this.changeSupplierNew.bind(this);
  }

  toggle() {
    const { modal, toggleModal } = this.props;
    toggleModal(!modal.show);

    this.setState(() => ({
      receipt: {
        receiptId: "0",
        amount: "",
        date: "",
        comment: "",
        currencyId: "-1",
        supplierId: "-1"
      },
      IsEdit: false,
      validation: {
        amount: false,
        currencyId: false,
        supplierId: false
      }
    }));
  }

  toggleConfirm() {
    this.setState({
      modalDel: !this.state.modalDel
    });
  }

  delete() {
    const { token, history } = this.props;
    const { receiptId } = this.state.receipt;
    this.toggleConfirm();
    this.props.deleteReceipts(receiptId, token, history);
  }

  save() {
    const { token, history } = this.props;
    const { receipt } = this.state;

    //validation
    let vAmount = receipt.amount === "";
    let vCurrencyId = receipt.currencyId === "-1";
    let vSupplierId = receipt.supplierId === "-1";
    let vDate = receipt.date === "";
    if (vAmount || vCurrencyId || vSupplierId || vDate) {
      this.setState(() => ({
        validation: {
          amount: vAmount,
          currencyId: vCurrencyId,
          supplierId: vSupplierId,
          date: vDate
        }
      }));
      return;
    }

    this.props.saveReceipts(receipt, token, history);

    this.setState(prevState => ({
      receipt: {
        receiptId: "0",
        amount: "",
        date: "",
        comment: "",
        currencyId: "0",
        supplierId: "0"
      },
      filters: {
        currencyId: receipt.currencyId,
        supplierId: receipt.supplierId
      },
      IsEdit: false
    }));
  }

  search() {
    const { token, history } = this.props;
    const { supplierId, currencyId } = this.state.filters;
    this.props.getReceipts(supplierId, currencyId, token, history);
  }

  loadSuppliers() {
    const { token, history, getSuppliers } = this.props;
    getSuppliers(token, history);
  }

  loadCurrency() {
    const { token, history, getCurrencies } = this.props;
    getCurrencies(token, history);
  }

  changeAmount(e) {
    const amount = e.target.value;
    this.setState(prevState => ({
      receipt: { ...prevState.receipt, amount },
      validation: { ...prevState.validation, amount: false }
    }));
  }

  changeDate(e) {
    const date = e.target.value;
    this.setState(prevState => ({
      receipt: { ...prevState.receipt, date },
      validation: { ...prevState.validation, date: false }
    }));
  }

  changeComment(e) {
    const comment = e.target.value;
    this.setState(prevState => ({
      receipt: { ...prevState.receipt, comment }
    }));
  }

  changeCurrency(e) {
    const currencyId = e.target.value;
    this.setState(prevState => ({
      filters: { ...prevState.filters, currencyId }
    }));
  }

  changeCurrencyNew(e) {
    const currencyId = e.target.value;
    this.setState(prevState => ({
      receipt: { ...prevState.receipt, currencyId },
      validation: { ...prevState.validation, currencyId: false }
    }));
  }

  changeSupplier(e) {
    const supplierId = e.target.value;
    this.setState(prevState => ({
      filters: { ...prevState.filters, supplierId }
    }));
  }

  changeSupplierNew(e) {
    const supplierId = e.target.value;
    this.setState(prevState => ({
      receipt: { ...prevState.receipt, supplierId },
      validation: { ...prevState.validation, supplierId: false }
    }));
  }

  renderSuppliers() {
    return this.props.suppliers.map(obj => (
      <option key={obj.supplierId} value={obj.supplierId}>
        {obj.supplier}
      </option>
    ));
  }

  renderCurrencies() {
    return this.props.currencies.map(obj => (
      <option key={obj.currencyId} value={obj.currencyId}>
        {obj.currency}
      </option>
    ));
  }

  componentDidMount() {
    this.loadSuppliers();
    this.loadCurrency();
  }

  render() {
    return (
      <div>
        <Navbar color="dark" expand="lg">
          <Button color="danger" onClick={() => this.props.logOut(this.props.history)}>
            Salir
          </Button>
        </Navbar>
        <div className="container">
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <div>
                    <h3>Recibos</h3>
                    <hr />
                  </div>
                  <FormGroup className="formGpReceipt">
                    <Label for="supplierSelect">Proveedor: </Label>
                    <Input
                      type="select"
                      name="select"
                      id="supplierSelect"
                      onChange={this.changeSupplier}
                      value={this.state.filters.supplierId}
                    >
                      <option value="0">TODOS</option>
                      {this.renderSuppliers()}
                    </Input>
                    <Label for="currencySelect">Moneda: </Label>
                    <Input
                      type="select"
                      name="select"
                      id="currencySelect"
                      onChange={this.changeCurrency}
                      value={this.state.filters.currencyId}
                    >
                      <option value="0">TODOS</option>
                      {this.renderCurrencies()}
                    </Input>
                  </FormGroup>
                  {this.props.searchLoading ? (
                    <Button color="primary" style={{ marginBottom: "1rem" }}>
                      <Spinner size="sm" color="light" />
                    </Button>
                  ) : (
                    <Button color="primary" onClick={this.search} style={{ marginBottom: "1rem" }}>
                      <i className="fa fa-search" />
                      Buscar
                    </Button>
                  )}
                  <Button color="success" onClick={this.toggle} style={{ margin: "0rem 0rem 1rem 1rem" }}>
                    <i className="fa fa-plus" />
                    Nuevo
                  </Button>
                  <BootstrapTable
                    keyField="receiptId"
                    data={this.props.receipts}
                    columns={this.columns}
                    rowEvents={this.rowEvents}
                    pagination={paginationFactory()}
                    hover
                  />
                </CardBody>
              </Card>
              <Modal
                isOpen={this.props.modal.show}
                toggle={this.toggle}
                className={this.props.className}
                backdrop="static"
                keyboard={false}
              >
                <ModalHeader toggle={this.toggle}>Recibos</ModalHeader>
                <ModalBody>
                  <Modal isOpen={this.state.modalDel} toggle={this.toggleConfirm} backdrop="static" keyboard={false}>
                    <ModalHeader>Confirmar eliminar</ModalHeader>
                    <ModalBody>Seguro que desea eliminar el recibo?</ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.delete}>
                        Si
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggleConfirm}>
                        No
                      </Button>
                    </ModalFooter>
                  </Modal>
                  {this.props.modal.loading ? (
                    <Row className="justify-content-center">
                      <div className="colSpinner">
                        <Spinner style={{ width: "5rem", height: "5rem" }} color="success" />
                      </div>
                    </Row>
                  ) : (
                    <Form>
                      <FormGroup className="formGpReceipt">
                        <Label for="supplierSelect">Proveedor: </Label>
                        <Input
                          type="select"
                          name="select"
                          id="supplierSelect"
                          onChange={this.changeSupplierNew}
                          value={this.state.receipt.supplierId}
                          disabled={this.state.IsEdit}
                          invalid={this.state.validation.supplierId}
                        >
                          <option value="-1">SELECCIONAR</option>
                          {this.renderSuppliers()}
                        </Input>
                        <Label for="inputAmount" style={style.styleLabelModalForm}>
                          Monto
                        </Label>
                        <Input
                          type="text"
                          name="amount"
                          id="inputAmount"
                          value={this.state.receipt.amount}
                          onChange={this.changeAmount}
                          disabled={this.state.IsEdit}
                          invalid={this.state.validation.amount}
                          maxLength="30"
                        />
                        <Label for="currencySelect">Moneda: </Label>
                        <Input
                          type="select"
                          name="select"
                          id="currencySelect"
                          onChange={this.changeCurrencyNew}
                          value={this.state.receipt.currencyId}
                          disabled={this.state.IsEdit}
                          invalid={this.state.validation.currencyId}
                        >
                          <option value="0">TODOS</option>
                          {this.renderCurrencies()}
                        </Input>
                        <Label for="inputDate" style={style.styleLabelModalForm}>
                          Fecha
                        </Label>
                        <Input
                          type="date"
                          name="date"
                          id="inputDate"
                          value={this.state.receipt.date}
                          onChange={this.changeDate}
                          invalid={this.state.validation.date}
                        />
                        <Label for="commentText" style={style.styleLabelModalForm}>
                          Comentario
                        </Label>
                        <Input
                          type="textarea"
                          name="comment"
                          id="commentText"
                          value={this.state.receipt.comment}
                          onChange={this.changeComment}
                          maxLength="1000"
                        />
                      </FormGroup>
                    </Form>
                  )}
                </ModalBody>
                <ModalFooter className="modalFooterDel">
                  {this.state.IsEdit && !this.props.modal.loading && (
                    <Button color="danger" onClick={this.toggleConfirm}>
                      Eliminar
                    </Button>
                  )}
                  {this.props.modal.loading ? (
                    <div />
                  ) : (
                    <div>
                      <Button color="success" onClick={this.save}>
                        Guardar
                      </Button>{" "}
                      <Button color="danger" onClick={this.toggle}>
                        Cancelar
                      </Button>
                    </div>
                  )}
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const style = {
  styleLabelModalForm: {
    marginTop: "10px"
  }
};

const mapStateToProps = ({ auth, receipt, components }) => {
  const { token } = auth;
  const { receipts, currencies, suppliers } = receipt;
  const { modal, searchLoading } = components;
  return { token, receipts, currencies, suppliers, modal, searchLoading };
};

export default connect(mapStateToProps, {
  getCurrencies,
  getSuppliers,
  getReceipts,
  saveReceipts,
  deleteReceipts,
  toggleModal,
  logOut
})(Home);
