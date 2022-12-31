import { Component } from 'react';
import css from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onFormChange = evt => this.setState({ query: evt.target.value.trim() });
  onFormSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.query.trim());
    this.formReset();
  };

  formReset = () => this.setState({ query: '' });

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onFormSubmit}>
          <button type="submit" className={css.SearchFormBtn}>
            <FcSearch />
            <span className={css.SearchFormBtnLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.onFormChange}
          />
        </form>
      </header>
    );
  }
}
