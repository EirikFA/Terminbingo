import { Fragment, FunctionComponent, h } from "preact";

import { Teacher } from "../types";
import TeacherCard from "./TeacherCard";

export interface TeacherListProps {
  teachers: Teacher[]
}

const TeacherList: FunctionComponent<TeacherListProps> = ({ teachers }) => (
  <Fragment>
    {teachers.map(t => (
      <div className="column is-4">
        <TeacherCard key={t.id} teacher={t} />
      </div>
    ))}
  </Fragment>
);

export default TeacherList;
