import React, { useState } from "react";
import { Publication } from "../../lib/Publication.interface";
import { FacebookSelector } from "@charkour/react-reactions";
import "./comic.scss";

const Comic = ({
  publication = {} as Publication,
  indexPublication = 0,
  assignReaction = (reaction: string, indexPublication: number) => {},
  setModal,
  full= false
}) => {
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

  const [reactions, setReactions] = useState(false);

  const activiteReactions = () =>
    reactions ? setReactions(false) : setReactions(true);
  
    const viewDetail = () => {
      console.log('dsds')
      setModal({
        view: true,
        index: indexPublication
      })
    }

  return (
    <section className={ `Comic ${full && 'max'}`}>
      <h2 className="Comic__title" onClick={viewDetail}>{publication.title}</h2>
      <span className="Comic__date" onClick={viewDetail}>{`${publication.day} de ${namemMonth(
        Number(publication.month)
      )} `}</span>
      <span className="Comic__ref" onClick={viewDetail}>ref: {publication.num}</span>
      <div className={ `Comic__img ${full && 'full'}`} onClick={viewDetail}>
        <img
          className="Comic__img-src"
          src={publication.img}
          alt={publication.alt}
        />
      </div>
      <p className="Comic__text">{publication.alt}</p>
      <div className="Comic__actions">
        <div className="Comic__actions-like">
          <div
            className="Comic__actions-like--reaction"
            onClick={activiteReactions}
          >
            {!publication.reaction ? (
              <>
                <span className="material-icons">thumb_up_alt</span>
                <p>Me gusta</p>
              </>
            ) : (
              <>
                <img
                  src={publication.reaction.icon}
                  alt={publication.reaction.name}
                  className="Comic__actions-like--reaction---icon"
                />
                <p>{publication.reaction.name}</p>
              </>
            )}
          </div>
          {reactions && (
            <span className="Comic__actions-like--reactions">
              <FacebookSelector
                onSelect={(d) => {
                  assignReaction(d, indexPublication);
                  activiteReactions();
                }}
              />
            </span>
          )}
        </div>
        <div className="Comic__actions-share">
          <span className="material-icons">share</span>
          <p>Compartir</p>
        </div>
      </div>
    </section>
  );
};

export default Comic;
