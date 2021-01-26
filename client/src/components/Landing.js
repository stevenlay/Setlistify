import React from "react";
import Search from "./Search";
import Results from "./Results";
import ArtistDetails from "./ArtistDetails";

const Landing = () => {
  return (
    <>
      <div className="rowC">
        <Search />
        <Results />
        <ArtistDetails />
      </div>
    </>
  );
};
export default Landing;
