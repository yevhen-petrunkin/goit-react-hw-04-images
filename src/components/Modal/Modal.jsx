import css from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Loader } from '../Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  state = { isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.stopLoader();
      this.props.onClose();
    }
  };

  handleOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  stopLoader = () => this.setState({ isLoading: false });

  render() {
    const { image, info } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal}>
          {this.state.isLoading && <Loader />}
          <img src={image} alt={info} onLoad={() => this.stopLoader()} />
        </div>
      </div>,
      modalRoot
    );
  }
}
