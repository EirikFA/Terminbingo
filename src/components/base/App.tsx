import { FunctionComponent, h } from "preact";
import { Route, Switch } from "wouter";

import { GamePage, HomePage } from "../../Pages";

const App: FunctionComponent = () => (
  <section className="section">
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/game/:schoolId/:teacherId" component={GamePage} />
    </Switch>
  </section>
);

export default App;
