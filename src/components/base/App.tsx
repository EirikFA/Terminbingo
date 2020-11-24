import { FunctionComponent, h } from "preact";
import { Route, Switch } from "wouter-preact";

import { GamePage, StartGamePage, TeachersPage } from "../../Pages";

const App: FunctionComponent = () => (
  <section className="section">
    <Switch>
      <Route path="/:schoolId?" component={TeachersPage} />
      <Route path="/:schoolId/:teacherId" component={StartGamePage} />
      <Route path="/:schoolId/:teacherId/game" component={GamePage} />
    </Switch>
  </section>
);

export default App;
