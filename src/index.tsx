import { h, render } from "preact";

import { App } from "./components";

if (process.env.NODE_ENV === "development") {
  // Must use require here as import statements are only allowed
  // to exist at top-level.
  require("preact/debug");
}

render(<App />, document.body);
