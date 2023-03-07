import { useRef, useState } from "react";
import styles from "./react-lib-1.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReactLib1Props {}

export function ReactLib1(props: ReactLib1Props) {
  const [state, setState] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);
  const toggleState = () => setState((s) => !s);

  return (
    <div className={styles.container}>
      <h1>Welcome to ReactLib1!</h1>
      {state ? <h2>State is true</h2> : <h2>State is false</h2>}
      <button type="button" onClick={toggleState} ref={ref}>
        Change state
      </button>
    </div>
  );
}
