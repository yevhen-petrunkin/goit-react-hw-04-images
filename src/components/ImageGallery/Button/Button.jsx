import css from './Button.module.css';

export const Button = ({ onCLick }) => {
  return (
    <button className={css.Button} onClick={onCLick}>
      Load more
    </button>
  );
};
