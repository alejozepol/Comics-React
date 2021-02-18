import React from "react";
import { Publication } from "../../lib/Publication.interface";
import "./comic.scss";

const Comic = ({ publication = {} as Publication }) => {
  const namemMonth = (numMonth: number) => {
    console.log(numMonth);
    const month = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    if (numMonth <= 12 && numMonth >= 1) {
      return month[numMonth - 1];
    } else {
      return month[0];
    }
  };
  return (
    <section className="Comic">
      <h2 className="Comic__title">{publication.title}</h2>
      <span className="Comic__date">{`${publication.day} de ${namemMonth(
        Number(publication.month)
      )} `}</span>
      <span className="Comic__ref">ref: {publication.num}</span>
      <div className="Comic__img">
        <img
          className="Comic__img-src"
          src={publication.img}
          alt={publication.alt}
        />
      </div>
      <p className="Comic__text">{publication.alt}</p>
      <div className="Comic__actions">
        <div className='Comic__actions-like'>
          <span className="material-icons">thumb_up_alt</span>
          <p>Me gusta</p>
        </div>
        <div className='Comic__actions-share'>
          <span className="material-icons">share</span>
          <p>Compartir</p>
        </div>
      </div>
    </section>
  );
};

export default Comic;
