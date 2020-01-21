import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import { signUp, clearAlert } from "../../actions";
import MessageAlert from "../../components/MessageAlert";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signup: {
        username: "",
        password: "",
        confirmPassword: ""
      },
      validation: {
        confirm: false
      }
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPsw = this.changeConfirmPsw.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
  }

  changeUsername(e) {
    let username = e.target.value;
    this.setState(prevState => ({
      signup: { ...prevState.signup, username }
    }));
  }

  changePassword(e) {
    let password = e.target.value;
    this.setState(prevState => ({
      signup: { ...prevState.signup, password },
      validation: { confirm: false }
    }));
  }

  changeConfirmPsw(e) {
    let confirmPassword = e.target.value;
    this.setState(prevState => ({
      signup: { ...prevState.signup, confirmPassword },
      validation: { confirm: false }
    }));
  }

  clearAlert() {
    const { clearAlert, history } = this.props;
    clearAlert();
    history.push("/");
  }

  signUpClick() {
    const { signup } = this.state;
    debugger;
    let vCofirm = signup.password !== signup.confirmPassword;
    if (vCofirm) {
      this.setState(prevState => ({
        validation: {
          confirm: vCofirm
        }
      }));
      return;
    }
    this.props.signUp(signup);
  }

  renderAlert() {
    const { alert } = this.props;
    if (alert !== "") return <MessageAlert message={alert} variant={"success"} clearAlert={this.clearAlert} />;
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <h1>Registrarse</h1>
                    <p className="text-muted">Registra una cuenta.</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="material-icons">account_circle</i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Usuario"
                        value={this.state.signup.username}
                        onChange={this.changeUsername}
                        maxLength="50"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="material-icons">lock</i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        value={this.state.signup.password}
                        onChange={this.changePassword}
                        maxLength="100"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="material-icons">lock</i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={this.state.signup.confirmPassword}
                        onChange={this.changeConfirmPsw}
                        maxLength="100"
                      />
                    </InputGroup>
                    {this.state.validation.confirm && (
                      <Alert color="warning">No coincide la confirmación de contraseña.</Alert>
                    )}
                    <Row>
                      <Col xs="12">
                        <Button onClick={() => this.signUpClick()} color="primary" className="px-4">
                          Registrarse
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {this.renderAlert()}
      </div>
    );
  }
}

const mapStateToProps = ({ components }) => {
  const { alert } = components;
  return { alert };
};

export default connect(mapStateToProps, { signUp, clearAlert })(SignUp);
