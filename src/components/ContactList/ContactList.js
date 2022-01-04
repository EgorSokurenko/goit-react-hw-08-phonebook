import "./ContactList.css";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncDeleteContact,
  asyncGetContact,
  asyncChangeContact,
} from "../../redux/Contact/contact-operation";
import { useEffect, useState } from "react";

export default function ContactList() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector((state) => state.items);
  const isLoading = useSelector((state) => state.isLoading);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  let visibleContacts = [];
  if (contacts) {
    visibleContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        break;
    }
  };
  const onChange = (changeId, name, number) => {
    if (id === changeId) {
      setId("");
      return;
    }
    setId(changeId);
    setName(name);
    setNumber(number);
  };
  const changeSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncChangeContact({ id, contact: { name, number } }));
    setId(null);
  };
  useEffect(() => {
    dispatch(asyncGetContact());
  }, [dispatch]);
  return (
    <>
      {!isLoading && <h2>Loading</h2>}
      <ul className="contactList">
        {visibleContacts &&
          visibleContacts.map((contact) => {
            return (
              <li className="contactItem" key={contact.id}>
                <div className="contactBlock">
                  <span>{contact.name}</span>
                  <span className="nubmer">{contact.number}</span>
                  <Button
                    onClick={() =>
                      onChange(contact.id, contact.name, contact.number)
                    }
                    variant="outline-success"
                  >
                    Change
                  </Button>
                  {id === contact.id && (
                    <form onSubmit={changeSubmit}>
                      <input
                        onChange={handleChange}
                        value={name}
                        type="text"
                        name="name"
                        required
                      />
                      <input
                        onChange={handleChange}
                        value={number}
                        type="tel"
                        name="number"
                        required
                      />{" "}
                      <br />
                      <button type="submit">Отправить</button>
                    </form>
                  )}

                  <br />
                  <Button
                    onClick={() => {
                      dispatch(asyncDeleteContact(contact.id));
                    }}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}
