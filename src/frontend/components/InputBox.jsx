import styles from "./InputBox.module.css";

export default function InputBox(props) {
  return (
    <div className={styles.inputBox}>
      <p>{props.name}</p>
      <input {...props} />
    </div>
  );
}
