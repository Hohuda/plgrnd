// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactLib1 } from "@khokhuda-playground/react-lib-1";
import styles from "./app.module.scss";

import { NxWelcome } from "./nx-welcome";

export function App() {
  return (
    <>
      <NxWelcome title="react-app-1" />
      <ReactLib1 />

      <div />
    </>
  );
}

export default App;
