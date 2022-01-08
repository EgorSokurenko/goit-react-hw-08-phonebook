import propTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../redux/Filter/filter-action";
import { getFilter } from "../../../redux/Contact/contact-selectors";
export default function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    dispatch(actions.onFilter(e.target.value));
  };
  return (
    <label>
      Find contacts by name
      <input
        onChange={handleFilter}
        value={value}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
      />
    </label>
  );
}
