import { useState } from "react";
import propTypes from "prop-types";
import "./ContactForm.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddContact } from "../../redux/Contact/contact-operation";
export default function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector((state) => state.items);
  const dispatch = useDispatch();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      setNumber("");
      setName("");
      return;
    }
    dispatch(asyncAddContact(name, number));
    setNumber("");
    setName("");
  };
  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <label className="form__label">
        Name
        <input
          placeholder="Введите имя"
          className="form__input"
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <br />
      <label className="form__label">
        Number
        <input
          placeholder="Введите номер"
          className="form__input"
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <br />
      <button className="form__button" type="submit">
        Add Contact
      </button>
    </form>
  );
}
