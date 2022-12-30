import { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: null,
  };

  handleSubmit = query => this.setState({ query });

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
