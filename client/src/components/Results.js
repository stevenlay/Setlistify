import React from "react";
import { connect } from "react-redux";
import { Card, Elevation } from "@blueprintjs/core";
import SetlistCard from "./SetlistCard";
import ImportModal from "./ImportModal";

import * as actions from "../actions";

const Results = ({ auth, search, searchDetails, importSetlist }) => {
  const canImportSetlist = () => {
    return (
      auth &&
      search &&
      search.setlists &&
      search.numArtists === 1 &&
      searchDetails
    );
  };

  const renderImportButton = () => {
    return canImportSetlist() && <ImportModal />;
  };

  const renderGeneralWarning = (message) => {
    return <p className="warning">{message}</p>;
  };

  const renderWarning = () => {
    if (search && search.numArtists > 1) {
      return "Too many different artists found from search. Please be more specific.";
    }
    return null;
  };

  const renderSetlists = () => {
    if (!search) {
      return renderGeneralWarning("No search found");
    }

    if (search.error === 404) {
      return renderGeneralWarning("No artist found");
    }

    return search.setlists.map((setlist, index) => (
      <SetlistCard key={index} setlist={setlist} details={true} />
    ));
  };

  const renderContent = () => {
    switch (search) {
      case false:
        return (
          <p className="alert">Search an artist and see the results here!</p>
        );
      default:
        return [
          <h1 className="header" key="header">
            Results
          </h1>,
          <div className="header" key="import">
            {renderImportButton()}
          </div>,
          <h4 className="warning" key="alert">
            {renderWarning()}
          </h4>,
          <div key="setlist" className="setlist-card-container">
            {renderSetlists()}
          </div>,
        ];
    }
  };

  return (
    <div className="card-container">
      <Card interactive={false} elevation={Elevation.ONE}>
        {renderContent()}
      </Card>
    </div>
  );
};

const mapStateToProps = ({ auth, search, searchDetails }) => {
  return { auth, search, searchDetails };
};

export default connect(mapStateToProps, actions)(Results);
