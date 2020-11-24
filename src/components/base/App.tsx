import { FunctionComponent, h } from "preact";
import { Route, Switch } from "wouter-preact";

import { StartGame, TeachersPage } from "../../Pages";

const App: FunctionComponent = () => (
  <section className="section">
    <Switch>
      <Route path="/:schoolId?" component={TeachersPage} />
      <Route path="/:schoolId/:teacherId" component={StartGame} />
    </Switch>
  </section>
);

export default App;
