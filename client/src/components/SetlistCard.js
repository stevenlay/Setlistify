import React from "react";
import { Card } from "@blueprintjs/core";

const SetlistCard = ({ details, setlist }) => {
  return (
    <div className="result-card-container">
      <Card>
        <div className="setlist-card-result-header">
          {details && (
            <h2>
              {setlist.artist}'s {setlist.tour ? setlist.tour : "Tour Name N/A"}
            </h2>
          )}
          <h5>{setlist.date}</h5>
          <h5>
            {setlist.venue} - {setlist.city}
          </h5>
        </div>

        <h4>Songs</h4>
        <ol className="songs-container">
          {setlist.songs &&
            setlist.songs.map((song) => {
              return <li key={song.name}>{song.name}</li>;
            })}
        </ol>
        {!setlist.songs && <p>No songs found</p>}
        {setlist.encore && <h4>Encore</h4>}
        <ol className="songs-container">
          {setlist.encore &&
            setlist.encore.map((song) => {
              return <li key={song.name}>{song.name}</li>;
            })}
        </ol>
      </Card>
    </div>
  );
};

export default SetlistCard;
