import { FunctionComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Link, RouteComponentProps } from "wouter-preact";

import { Subject, SubjectCode } from "../types";
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
  const initialSubjects: Partial<Record<SubjectCode | "general", boolean>> = Object.keys(teacher.subjects).reduce((obj, prop) => ({
    ...obj,
    [prop]: false
  }), {});
  initialSubjects.general = true;

  const [subjects, setSubjects] = useState<typeof initialSubjects>(initialSubjects);
  const activeSubjects = Object.entries(subjects)
    .map(([code, checked]) => (checked ? code : undefined))
    .filter(code => !!code);

  const handleClick = (subject: SubjectCode | "general") => {
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

      {Object.keys(teacher.subjects).map(subjectCode => {
        // Casting is technically unsafe here, but `Subject` cannot be extended (private constructor)
        // See https://stackoverflow.com/questions/55012174/why-doesnt-object-keys-return-a-keyof-type-in-typescript
        const subject = Subject[subjectCode as SubjectCode].toString();
        const id = `${subject}Phrases`;

        return (
          <div className="field">
            <input id={id} className="switch" type="checkbox" onClick={() => handleClick(subjectCode as SubjectCode)} />
            <label htmlFor={id}>{subject}</label>
          </div>
        );
      })}

      <div className="field">
        <div className="control">
          <Link href={`/${schoolId}/${teacherId}/game?subjects=${JSON.stringify(activeSubjects)}`} className="button is-link">Lag spillbrett</Link>
        </div>
      </div>
    </div>
  );
};

export default StartGamePage;
