import React from "react";
import { connect } from "react-redux";
import { Card, Elevation } from "@blueprintjs/core";
import SetlistCard from "./SetlistCard";
import ImportModal from "./ImportModal";

import * as actions from "../actions";

const Results = (props) => {
  //TODO:

  const renderModalContent = () => {
    return "Are you sure you would like to import the Setlist?";
  };

  const renderActions = () => {
    return (
      <>
        <button onClick={() => importSet} className="ui button primary">
          Delete
        </button>
      </>
    );
  };

  const renderImportModal = () => {
    return <ImportModal />;
  };

  const importSet = async () => {
    await props.importSetlist({
      setlists: props.search.setlists.slice(0, 2),
      artistName: props.searchDetails.artist.name,
      artistSpotifyId: props.searchDetails.artist.id,
    });
  };

  const canImportSetlist = () => {
    return (
      props.auth &&
      props.search &&
      props.search.setlists &&
      props.search.numArtists === 1 &&
      props.searchDetails
    );
  };

  const renderImportButton = () => {
    return canImportSetlist() && <ImportModal />;
  };

  const renderGeneralWarning = (message) => {
    return <p className="warning">{message}</p>;
  };

  const renderWarning = () => {
    if (props.search && props.search.numArtists > 1) {
      return "Too many different artists found from search. Please be more specific.";
    }
    return null;
  };

  const renderSetlists = () => {
    if (!props.search) {
      return renderGeneralWarning("No search found");
    }

    if (props.search.error === 404) {
      return renderGeneralWarning("No artist found");
    }

    return props.search.setlists.map((setlist, index) => (
      <SetlistCard key={index} setlist={setlist} details={true} />
    ));
  };

  const renderContent = () => {
    switch (props.search) {
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
