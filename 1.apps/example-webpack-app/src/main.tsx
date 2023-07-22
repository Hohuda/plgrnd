import { hello } from "@plgrnd/example-ts-lib";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

((): void => {
  try {
    const rootNode = document.getElementById("root");

    if (!rootNode) {
      throw new Error(
        'Root node is absent in html template! Please add `<div id="root"/> to taskpane.html!`'
      );
    }

    const root = createRoot(rootNode);

    root.render(
      <StrictMode>
        <p>
          Hi there, it&aposs an example app! Build with webpack inside of the Nx
          monorepo.
        </p>
        <p>{hello()}</p>
      </StrictMode>
    );
  } catch (e: unknown) {
    console.error(e);
  }
})();
