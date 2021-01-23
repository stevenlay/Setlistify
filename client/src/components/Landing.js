import React from "react";
import Search from "./Search";
import Results from "./Results";
import ArtistDetails from "./ArtistDetails";

const Landing = () => {
  return (
    <React.Fragment>
      <div className="rowC">
        <Search />
        <Results />
        <ArtistDetails />
      </div>
    </React.Fragment>
  );
};
export default Landing;
