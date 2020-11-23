import { FunctionComponent, h } from "preact";
import { RouteComponentProps } from "wouter-preact";

import { schools } from "./Home";

type GamePageParams = {
  schoolId: string;
  teacherId: string;
};

export type GamePageProps = RouteComponentProps<GamePageParams>;

const GamePage: FunctionComponent<GamePageProps> = ({ params: { schoolId, teacherId } }) => {
  const school = schools.find(s => s.id === schoolId);
  const teacher = school?.teachers.find(t => t.id === teacherId);

  if (!teacher) return <div>Not found</div>;

  return (
    <div className="container">
      <h1 className="title">{teacher.name}</h1>
      <h2 className="subtitle">Velg fag og sitater for å spille</h2>
    </div>
  );
};

export default GamePage;
