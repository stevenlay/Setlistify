import React from "react";
import { connect } from "react-redux";
import { FormGroup, Card, Elevation } from "@blueprintjs/core";
import { DebounceInput } from "react-debounce-input";
import * as actions from "../actions";

const Search = ({ fetchArtist, fetchArtistDetails, auth, search }) => {
  const [artist, setArtist] = React.useState("");
  React.useEffect(() => {
    async function getArtistDetails(query) {
      if (auth) {
        let artistQuery = search.numArtists === 1 ? query : false;
        await fetchArtistDetails(artistQuery);
      }
    }
    getArtistDetails(artist);
  });

  const handleChange = async (event) => {
    const query = event.target.value;
    if (artist !== query) {
      await fetchArtist(query);
    }
    setArtist(event.target.value);
  };

  return (
    <div className="card-container">
      <Card interactive={false} elevation={Elevation.ONE}>
        <FormGroup
          helperText=""
          label="Search for an artist:"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <div className="bp3-input-group .modifier">
            <span className="bp3-icon bp3-icon-search"></span>
            <DebounceInput
              className="bp3-input"
              type="search"
              placeholder="Ed Sheeran"
              dir="auto"
              minLength={2}
              onChange={handleChange}
              debounceTimeout={-1}
            />
          </div>
        </FormGroup>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ auth, search }) => {
  return { auth, search };
};

export default connect(mapStateToProps, actions)(Search);
