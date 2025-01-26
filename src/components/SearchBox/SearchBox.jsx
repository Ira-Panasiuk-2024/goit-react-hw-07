import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';
import css from './SearchBox.module.css';

function SearchBox() {
  const dispatch = useDispatch();

  const handleSearch = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.find}>
      <p className={css.text}>Find contacts by name</p>
      <input
        type="text"
        className={css.input}
        onChange={handleSearch}
        placeholder="Search contacts..."
      />
    </div>
  );
}

export default SearchBox;
