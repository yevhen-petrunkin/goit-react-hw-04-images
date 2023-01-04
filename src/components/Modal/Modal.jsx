import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Loader } from '../Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeUrl, info, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    function handleKeyDown(evt) {
      if (evt.code === 'Escape') {
        setIsLoading(false);
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  function handleOverlayClick(evt) {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  }

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        {isLoading && <Loader />}
        <img src={largeUrl} alt={info} onLoad={() => setIsLoading(false)} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeUrl: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
