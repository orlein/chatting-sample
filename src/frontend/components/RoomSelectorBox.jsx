import styles from "./RoomSelectorBox.module.css";

export default function RoomSelectorBox(props) {
  return (
    <div className={styles.roomSelectorBox}>
      <div className={styles.joinAndName}>
        <button onClick={props.onClickJoin}>Join</button>
        <p>{props.name}</p>
      </div>
      {props.isRemoveAvailable && (
        <div className={styles.remove}>
          <button onClick={props.onClickRemove}>Remove</button>
        </div>
      )}
    </div>
  );
}
