import { FunctionComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Link, RouteComponentProps } from "wouter-preact";

import { schools } from "./Teachers";

type StartGamePageParams = {
  schoolId: string;
  teacherId: string;
};

export type StartGamePageProps = RouteComponentProps<StartGamePageParams>;

const StartGamePage: FunctionComponent<StartGamePageProps> = ({ params: { schoolId, teacherId } }) => {
  const school = schools.find(s => s.id === schoolId);
  const teacher = school?.teachers.find(t => t.id === teacherId);

  if (!teacher) return <div>Not found</div>;

  // Creates object with teacher's subject (codes) as keys (plus one for general quotes)
  const initialSubjects: Partial<Record<string, boolean>> = Object.keys(teacher.quotes).reduce((obj, prop) => ({
    ...obj,
    [prop]: false
  }), {});
  initialSubjects.general = true;

  const [subjects, setSubjects] = useState<typeof initialSubjects>(initialSubjects);
  const [preventSubmit, setPreventSubmit] = useState(false);

  useEffect(() => {
    const prevent = !Object.values(subjects).includes(true);
    // To prevent rerendering when the value did not change
    // (P)react should bail out, but we like being safe
    // https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update
    if (prevent !== preventSubmit) {
      setPreventSubmit(prevent);
    }
  }, [subjects]);

  const activeSubjects = Object.entries(subjects)
    .map(([code, checked]) => (checked ? code : undefined))
    .filter(code => !!code);

  const handleClick = (subject: string) => {
    setSubjects(subs => ({
      ...subs,
      [subject]: !subs[subject]
    }));
  };

  return (
    <div className="container">
      <h1 className="title">{teacher.name}</h1>
      <h2 className="subtitle">Velg fag og sitater for å spille</h2>

      <div className="field">
        <input id="generalPhrases" className="switch" type="checkbox" checked={subjects.general} onClick={() => handleClick("general")} />
        <label htmlFor="generalPhrases">Generelle sitater</label>
        <i> (Sitater uten tilknytning til et bestemt fag)</i>
      </div>

      {Object.keys(teacher.quotes).map(subject => {
        // Shown above with better description
        if (subject === "general") return null;

        // Spaces converted to camel case
        const subjectCode = subject.toLowerCase().replace(/\s+(\w)?/gi, (_match, letter) => letter.toUpperCase());
        const id = `${subjectCode}Phrases`;

        return (
          <div className="field">
            <input id={id} className="switch" type="checkbox" checked={subjects[subject]} onClick={() => handleClick(subject)} />
            <label htmlFor={id}>{subject}</label>
          </div>
        );
      })}

      <div className="field">
        <div className="control">
          <Link href={`/${schoolId}/${teacherId}/game?subjects=${JSON.stringify(activeSubjects)}`}>
            <button className="button is-link" type="button" disabled={preventSubmit}>Lag spillbrett</button>
          </Link>
        </div>
      </div>

      {preventSubmit && (
        <div className="field">
          <p className="help is-danger">Velg minst én gruppe med sitater</p>
        </div>
      )}
    </div>
  );
};

export default StartGamePage;
