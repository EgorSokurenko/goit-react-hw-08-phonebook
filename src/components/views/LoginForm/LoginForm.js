import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/User/user-operations";
export default function LoginFormForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const HandleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const HandleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setPassword("");
    setEmail("");
  };
  return (
    <Form onSubmit={HandleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={HandleChangeEmail}
          value={email}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={HandleChangePassword}
          value={password}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
