import { FunctionComponent, h } from "preact";
import { Route, Switch } from "wouter";

import { Home } from "../../Pages";

const App: FunctionComponent = () => (
  <section className="section">
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </section>
);

export default App;
