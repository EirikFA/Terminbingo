import { FunctionComponent, h } from "preact";
import "@fortawesome/fontawesome-free/css/all.css";

import "./TeacherCard.scss";
import { Teacher } from "../types";

export interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard: FunctionComponent<TeacherCardProps> = ({
  teacher: {
    name, tagline, picture, subjects
  }
}) => (
  <div className="media box teacher-card">
    <div className="media-left">
      <figure className="image is-64x64">
        <img src={picture} alt={`${name} profilbilde`} />
      </figure>
    </div>

    <div className="media-content">
      <p className="title is-4">{name}</p>
      <p className="subtitle is-6">
        <span className="icon is-small">
          <i className="fas fa-quote-left fa-sm" />
        </span>
        &nbsp;
        <i>{tagline}</i>
      </p>
      <p className="tags">
        {subjects.map(s => <span className="tag is-dark">{s}</span>)}
      </p>
    </div>
  </div>
);

export default TeacherCard;
