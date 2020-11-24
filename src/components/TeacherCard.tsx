import { FunctionComponent, h, JSX } from "preact";
import "@fortawesome/fontawesome-free/css/all.css";

import "./TeacherCard.scss";
import { Teacher } from "../types";

export interface TeacherCardProps {
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
  teacher: Teacher;
}

const TeacherCard: FunctionComponent<TeacherCardProps> = ({
  onClick,
  teacher: {
    name, tagline, picture, phrases
  }
}) => (
  <div className="box teacher-card">
    <div className="media">
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
          {Object.keys(phrases).map(subject => subject !== "general" && <span className="tag is-dark">{subject}</span>)}
        </p>
      </div>
    </div>

    <button type="button" className="button is-dark select-teacher-button" onClick={onClick}>Velg</button>
  </div>
);

export default TeacherCard;
