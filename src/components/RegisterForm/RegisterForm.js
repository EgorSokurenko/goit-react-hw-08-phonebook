import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { register } from "../../redux/User/user-operations";
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const HandleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const HandleChangeName = (e) => {
    setName(e.target.value);
  };
  const HandleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setPassword("");
    setName("");
    setEmail("");
  };
  return (
    <Form onSubmit={HandleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={HandleChangeName}
          value={name}
          type="input"
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={HandleChangeEmail}
          value={email}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
