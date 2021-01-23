import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Search extends React.Component {
  artist = "";
  handleChange = async (event) => {
    if (this.artist !== event.target.value) {
      this.artist = event.target.value;
      await this.props.fetchArtist(this.artist);

      if (this.props.auth) {
        let artistQuery =
          this.props.search.numArtists === 1 ? this.artist : false;
        await this.props.fetchArtistDetails(artistQuery);
      }
    }
  };
  render() {
    return (
      <div className="card-container">
        <form>
          <input></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, search }) => {
  return { auth, search };
};

export default connect(mapStateToProps, actions)(Search);
