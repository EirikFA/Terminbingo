import { FunctionComponent, h, JSX } from "preact";
import { useState } from "preact/hooks";
import { useLocation } from "wouter";
import "@fortawesome/fontawesome-free/css/all.css";

import "./Home.scss";

import { SchoolPicker, TeacherList } from "../components";
import { School, Subject, Teacher } from "../types";

const teachers: Teacher[] = [
  {
    id: "1",
    name: "John-Nitter Gundersen",
    tagline: "Kræsj bom bang",
    picture: "https://via.placeholder.com/64x64.png",
    phrases: ["Kræsj bom bang"],
    subjects: {
      [Subject.Geog.toString()]: [],
      [Subject.Geo1.toString()]: [],
      [Subject.Geo2.toString()]: [],
      [Subject.MathR2.toString()]: []
    }
  },
  {
    id: "2",
    name: "Olav Skutlaberg",
    tagline: "Glup idé",
    picture: "https://via.placeholder.com/64x64.png",
    phrases: ["Glup idé"],
    subjects: {
      [Subject.Math1T.toString()]: [],
      [Subject.MathR1.toString()]: [],
      [Subject.MathR2.toString()]: []
    }
  },
  {
    id: "3",
    name: "John-Willy Syvertsen",
    tagline: "All krig er basert",
    picture: "https://cdn.discordapp.com/avatars/324619866487390218/08ce9ce5a3f9827d74ad4cdeed413ac7.png?size=64",
    phrases: ["All krig er basert"],
    subjects: {
      [Subject.Hist.toString()]: [],
      [Subject.Norw.toString()]: []
    }
  },
  {
    id: "4",
    name: "Olav Mørland",
    tagline: "Selvstudium i IT-timene i dag",
    picture: "https://s3.itslearning.com/fetch?id=7602%2F09e6-4860-4cc5-bb7b-4d6e709001c4&version=1&expires=2020-11-23T16%3A06%3A28Z&isDownloadRequest=0&s3Url=https%3A%2F%2Fs3.eu-central-1.amazonaws.com%2Fprod.eu-central-1.filerepo%2F7602%2F09e6-4860-4cc5-bb7b-4d6e709001c4%3FX-Amz-Expires%3D900%26response-cache-control%3Dmax-age%253D900%26response-content-disposition%3Dinline%253B%2520filename%253D%2522900742_414128_637014640353753126.png%2522%253B%26response-content-type%3Dimage%252Fpng%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIAIQ6TLTXZ2ESTRSDA%2F20201123%2Feu-central-1%2Fs3%2Faws4_request%26X-Amz-Date%3D20201123T155128Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3D0fd6a08ddd73f7c880e35c9ea5363f4caaf0f41e2712dd44bb118a8a3da73e21&sign=jgSyLfXgOQK8eYFoYEnFTpAYq%2BaeRjMEbbFvrZj8T%2BU%3D",
    phrases: ["Selvstudium i IT-timene i dag"],
    subjects: {
      [Subject.IT1.toString()]: [],
      [Subject.IT2.toString()]: [],
      [Subject.Math1T.toString()]: []
    }
  }
];

const schools: School[] = [
  {
    id: "1",
    name: "Arendal videregående skole",
    teachers
  }
];

const HomePage: FunctionComponent = () => {
  const [, setLocation] = useLocation();
  const [school, setSchool] = useState<School | null>(null);

  const handleSchoolInput: JSX.GenericEventHandler<HTMLSelectElement> = e => {
    const selected = schools.find(s => s.id === (e.target as HTMLSelectElement).value);
    setSchool(selected ?? null);
  };

  const handleTeacherClick = (id: string): void => {
    if (school) {
      setLocation(`/game/${school.id}/${id}`);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Terminbingo</h1>
      <h2 className="subtitle">
        Velg en&nbsp;
        {school ? "lærer" : "skole"}
        &nbsp;for å spille
      </h2>
      {!school && <SchoolPicker onInput={handleSchoolInput} schools={schools} />}

      {school && (
        <div className="columns is-multiline teacher-list">
          <TeacherList teachers={school.teachers} onClick={handleTeacherClick} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
