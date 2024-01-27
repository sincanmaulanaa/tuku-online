import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
};

const Input = (props: Proptypes) => {
  const { label, name, type, placeholder, defaultValue, disabled, required } =
    props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor="email">{label}</label>}
      <input
        type={type}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        className={styles.container__input}
        required={required}
      />
    </div>
  );
};

export default Input;
