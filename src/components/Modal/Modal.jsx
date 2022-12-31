import css from './Modal.module.css';
import { Component } from 'react';
import { Loader } from '../ImageGallery/Loader/Loader';

export class Modal extends Component {
  state = { isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });
  }

  stopLoader = () => this.setState({ isLoading: false });

  render() {
    const { image, info, onClick } = this.props;
    return (
      <div className={css.Overlay} onClick={onClick}>
        <div className={css.Modal}>
          {this.state.isLoading && <Loader />}
          <img src={image} alt={info} onLoad={() => this.stopLoader()} />
        </div>
      </div>
    );
  }
}
