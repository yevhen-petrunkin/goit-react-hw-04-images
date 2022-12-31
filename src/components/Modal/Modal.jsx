import css from './Modal.module.css';

export const Modal = ({ image, info, onClick }) => {
  return (
    <div className={css.Overlay} onClick={onClick}>
      <div className={css.Modal}>
        <img src={image} alt={info} />
      </div>
    </div>
  );
};
