import React, { useEffect, useState } from "react";
import { Publication } from "../../lib/Publication.interface";
import { FacebookSelector } from "@charkour/react-reactions";
import "./comic.scss";

const Comic = ({
  publication = {} as Publication,
  indexPublication = 0,
  assignReaction = (reaction: string, indexPublication: number) => {},
  //@ts-ignore
  setModal = {} as React.SetStateAction,
  full = false,
}) => {
  const namemMonth = (numMonth: number) => {
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
  const [_full, setFull] = useState(full);

  const activiteReactions = () =>
    reactions ? setReactions(false) : setReactions(true);

  const viewDetail = () => {
    setModal({
      view: true,
      index: indexPublication,
    });
  };

  const resize = () => {
    if (screen.width < 1024 || full !== false) {
      setFull(true);
    } else {
      setFull(false);
    }
  };
  useEffect(() => {
    resize();
  }, []);
  window.addEventListener("resize", resize);

  return (
    <section className={`Comic ${_full && "max"}`}>
      <h2 className="Comic__title" onClick={viewDetail}>
        {publication.title}
      </h2>
      <span className="Comic__date" onClick={viewDetail}>{`${
        publication.day
      } de ${namemMonth(Number(publication.month))} ${Number(
        publication.year
      )}`}</span>
      <span className="Comic__ref" onClick={viewDetail}>
        ref: {publication.num}
      </span>
      <div className={`Comic__img ${_full && "full"}`} onClick={viewDetail}>
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
                <span className="reactionOff__icon material-icons">
                  thumb_up_alt
                </span>
                <p className="reactionOff__text">Me gusta</p>
              </>
            ) : (
              <>
                <img
                  src={publication.reaction.icon}
                  alt={publication.reaction.name}
                  className="Comic__actions-like--reaction---icon"
                />
                <p className="Comic__actions-like--reaction---name">
                  {publication.reaction.name}
                </p>
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
      </div>
    </section>
  );
};

export default Comic;
