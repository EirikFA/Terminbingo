import { FunctionComponent, h, JSX } from "preact";
import { useSearchParam } from "react-use";
import { RouteComponentProps, useLocation } from "wouter-preact";

import "./Game.scss";
import { shuffle } from "../util";
import { schools } from "./Teachers";

type GamePageParams = {
  schoolId: string;
  teacherId: string;
};

export type GamePageProps = RouteComponentProps<GamePageParams>;

const GamePage: FunctionComponent<GamePageProps> = ({ params: { schoolId, teacherId } }) => {
  const school = schools.find(s => s.id === schoolId);
  const teacher = school?.teachers.find(t => t.id === teacherId);

  if (!teacher) return <div>Not found</div>;

  const [, setLocation] = useLocation();

  // Remove `react-use` when https://github.com/molefrog/wouter/issues/58 has a "solution"
  const subjectsQuery = useSearchParam("subjects");
  if (!subjectsQuery) {
    setLocation(`/${schoolId}/${teacherId}`, { replace: true });
    return null;
  }

  const subjects: string[] = JSON.parse(subjectsQuery);
  // TODO: Shorten/rewrite this?
  let quotes = Object.entries(teacher.quotes)
    .map(([subject, phrases]) => (subjects.includes(subject) ? phrases : undefined))
    .filter(p => !!p)
    .flat()
    // Casting because TypeScript does not know we filtered out `undefined` values
    .filter((p, index, self) => self.indexOf(p) === index) as string[];

  const goBack = (e: JSX.TargetedEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.back();
  };

  if (quotes.length < 9) {
    return (
      <div className="container">
        <p>
          Ikke nok sitater til å spille. Vil du&nbsp;
          {
          // eslint-disable-next-line jsx-a11y/anchor-is-valid, react/jsx-one-expression-per-line
          }<a href="#" onClick={goBack}>gå tilbake</a>
          ?
        </p>
      </div>
    );
  }

  quotes = shuffle(quotes, 9);
  const board: string[][] = [];
  while (quotes.length > 0) board.push(quotes.splice(0, 3));

  return (
    <div className="container">
      {board.map(row => (
        <div className="tile is-ancestor bingo-row">
          {row.map(q => <div className="tile bingo-square">{q}</div>)}
        </div>
      ))}
    </div>
  );
};

export default GamePage;
