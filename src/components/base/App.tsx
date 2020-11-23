import { FunctionComponent, h } from "preact";
import { Route, Switch } from "wouter-preact";

import { GamePage, HomePage } from "../../Pages";

const App: FunctionComponent = () => (
  <section className="section">
    <Switch>
      <Route path="/:schoolId?" component={HomePage} />
      <Route path="/game/:schoolId/:teacherId" component={GamePage} />
    </Switch>
  </section>
);

export default App;
