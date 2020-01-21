import React, { Component } from "react";
import {
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
  Row,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { logIn, toggleError } from "../../actions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        username: "",
        password: ""
      }
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  changeUsername(e) {
    let username = e.target.value;
    this.setState(prevState => ({
      credentials: { ...prevState.credentials, username }
    }));
  }

  changePassword(e) {
    let password = e.target.value;
    this.setState(prevState => ({
      credentials: { ...prevState.credentials, password }
    }));
  }

  onDismiss() {
    this.props.toggleError(false);
  }

  logInClick() {
    const { credentials } = this.state;
    const { logIn, history } = this.props;

    logIn(credentials, history);
  }

  singUp() {
    const { history } = this.props;
    history.push("/signup");
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
                    <h1>Login</h1>
                    <p className="text-muted">Entra con tu cuenta.</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="material-icons">account_circle</i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Usuario"
                        autoComplete="username"
                        value={this.state.credentials.username}
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
                        autoComplete="current-password"
                        value={this.state.credentials.password}
                        onChange={this.changePassword}
                        maxLength="100"
                      />
                    </InputGroup>
                    <Alert color="danger" isOpen={this.props.error} toggle={this.onDismiss}>
                      Credenciales incorrectas.
                    </Alert>
                    <Row>
                      <Col xs="6">
                        <Button onClick={() => this.logInClick()} color="primary" className="px-4">
                          Entrar
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button onClick={() => this.singUp()} color="link" className="px-0">
                          Registrase
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { token, error } = auth;
  return { token, error };
};

export default connect(mapStateToProps, { logIn, toggleError })(Login);
