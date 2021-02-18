import React from "react";
import { Publication } from "../../lib/Publication.interface";
import "./comic.scss";

const Comic = ({ publication = {} as Publication }) => {
  return (
    <section className="Comic">
      <h2 className="Comic__title">{publication.title}</h2>
      <h4 className="Comic__date">{`${publication.month} ${publication.day}`}</h4>
      <span className="Comic__ref">{publication.num}num</span>
      <div className="Comic__img">
        <img
          className="Comic__img-src"
          src={publication.img}
          alt={publication.alt}
        />
      </div>
      <div className="Comic__actions">
        <p>d</p>
      </div>
    </section>
  );
};

export default Comic;
