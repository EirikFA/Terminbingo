import { Fragment, FunctionComponent, h } from "preact";

import { Teacher } from "../types";
import TeacherCard from "./TeacherCard";

export interface TeacherListProps {
  onClick?: (id: string) => void;
  teachers: Teacher[];
}

const TeacherList: FunctionComponent<TeacherListProps> = ({ onClick, teachers }) => (
  <Fragment>
    {teachers.map(t => (
      <div className="column is-4">
        <TeacherCard key={t.id} teacher={t} onClick={() => onClick && onClick(t.id)} />
      </div>
    ))}
  </Fragment>
);

export default TeacherList;
