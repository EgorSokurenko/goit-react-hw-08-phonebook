import "./ContactList.css";

import { useSelector, useDispatch } from "react-redux";
import {
  asyncDeleteContact,
  asyncGetContact,
} from "../../redux/Contact/contact-operation";
import { useEffect } from "react";

export default function ContactList() {
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
                  <span className="nubmer">{contact.phone}</span>
                </div>

                <button
                  className="deleteBotton"
                  onClick={() => {
                    dispatch(asyncDeleteContact(contact.id));
                  }}
                  type="button"
                >
                  Delete
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
