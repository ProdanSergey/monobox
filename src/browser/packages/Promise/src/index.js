import { FakeRequest } from "@utils/fake-request";
import { Album, Artist, Comment } from "./app/factories";
import { populate } from "./app/utils";

const renderArtist = (artist) => {
  console.log(artist);
};
const getRelatedAlbums = ({ id }) => {
  return FakeRequest.resolved({
    body: populate(() => {
      return {
        artistId: id,
        ...Album(),
      };
    }, 5),
  });
};
const getRelatedArtists = () => {
  return FakeRequest.rejected({
    body: populate(() => {
      return Artist();
    }, 7),
  });
};
const getArtistComments = ({ id }) => {
  return FakeRequest.resolved({
    body: populate(() => {
      return {
        artistId: id,
        ...Comment(id),
      };
    }, 3),
  });
};

const getRandomArtist = () => {
  FakeRequest.resolved({ body: Artist() })
    .then(({ body }) => {
      renderArtist(body);

      return Promise.all([getRelatedAlbums(body), getArtistComments(body), getRelatedArtists()]);
    })
    .then(console.log);
};

getRandomArtist();
