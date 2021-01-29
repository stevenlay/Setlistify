const axios = require("axios");
const querystring = require("querystring");
const util = require("../utils/helper");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/import", requireLogin, async (req, res) => {
    if (!req.user) {
      res.redirect("/");
    }

    const options = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${req.user.accessToken}`,
      },
    };

    let url = "";
    // Get albums from the artist
    const artistId = req.body.search.artistSpotifyId;
    const albumIds = await getAlbumIds(artistId, options);

    let albumIdsString = "";
    if (albumIds.length > 0) {
      albumIdsString = albumIds.join(",");
    } else {
      res.send({ err: "No artist found" });
    }

    const albumAndTracksRes = await getTracksFromAlbumIds(
      albumIdsString,
      options
    );

    // get unique songs from setlists
    let songs = new Set();
    const setlists = req.body.search.setlists;
    for (const setlist of setlists) {
      for (const song of setlist.songs) {
        songs = new Set([...songs, ...song.name.split("/")]);
      }
    }

    // create a master list of songs and their id from Spotify
    const formattedTrackAndIds = albumAndTracksRes.map((album) => {
      return album.album_tracks;
    });
    const songMap = new Map();
    for (const album of formattedTrackAndIds) {
      for (const song of album) {
        const songName = util.trim(song.name.split("(")[0]);
        const songId = song.id;
        if (!songMap.has(songName)) {
          songMap.set(songName, songId);
        }
      }
    }

    // iterate through songs set and add the id found to track ids
    const trackIds = [];
    for (const song of songs) {
      if (songMap.has(song)) {
        trackIds.push(`spotify:track:${songMap.get(song)}`);
      }
    }

    //create playlist
    const artist = req.body.search.artistName;
    let body = {
      name: `Setlist for ${artist}`,
      description: "Most likely songs for upcoming concerts",
      public: false,
    };

    let err = false;
    url = `https://api.spotify.com/v1/users/${req.user.spotifyId}/playlists`;
    const playlistRes = await axios
      .post(url, body, options)
      .catch(function (error) {
        if (error.response) {
          err = error.response.status;
        } else if (error.request) {
          err = error.request;
        } else {
          err = error.message;
        }
      });
    if (err) return res.send({ error: err });

    const playlistId = playlistRes.data.id;
    const playlistUrl = playlistRes.data.external_urls.spotify;

    // add tracks to playlist using the playlist id
    body = {
      uris: trackIds,
    };
    url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?`;
    await axios.post(url, body, options).catch(function (error) {
      if (error.response) {
        err = error.response.status;
      } else if (error.request) {
        err = error.request;
      } else {
        err = error.message;
      }
    });
    if (err) return res.send({ error: err });

    res.send({ playlistUrl });
  });
};

getAlbumIds = async (artistId, options) => {
  let err = false;
  const albumRes = await axios
    .get(`https://api.spotify.com/v1/artists/${artistId}/albums`, options)
    .catch(function (error) {
      if (error.response) {
        err = error.response.status;
      } else if (error.request) {
        err = error.request;
      } else {
        err = error.message;
      }
    });

  const albumIds = albumRes.data.items.map((album) => {
    return album.id;
  });
  return albumIds;
};

getTracksFromAlbumIds = async (ids, options) => {
  if (!ids) {
    return res.send({ error: "No album ids found" });
  }
  let err = false;
  const albumAndTracksRes = await axios
    .get(`https://api.spotify.com/v1/albums`, { ...options, params: { ids } })
    .catch(function (error) {
      if (error.response) {
        err = error.response.status;
      } else if (error.request) {
        err = error.request;
      } else {
        err = error.message;
      }
    });
  if (err) return res.send({ error: err });

  formattedAlbumAndTracks = albumAndTracksRes.data.albums.map((album) => {
    return {
      album_name: album.name,
      album_tracks: util.formatAlbumTracks(album.tracks),
    };
  });
  return formattedAlbumAndTracks;
};
