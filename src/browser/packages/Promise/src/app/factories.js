import { faker } from "@faker-js/faker";

export const Artist = () => {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    rating: faker.datatype.float({ min: 3, max: 10 }),
  };
};

export const Album = () => {
  return {
    id: faker.datatype.uuid(),
    title: faker.random.words(2),
    releaseDate: faker.date.between(new Date(1990, 0, 1), new Date()),
    url: faker.internet.url(),
    cover: faker.image.lorempicsum.image(300, 200),
    genre: faker.music.genre(),
  };
};

export const Track = () => {
  return {
    id: faker.datatype.uuid(),
    title: faker.random.words(3),
    duration: faker.datatype.float({ min: 1.5, max: 6 }),
  };
};

export const Comment = () => {
  return {
    id: faker.datatype.uuid(),
    text: faker.lorem.paragraphs(),
    author: faker.name.findName(),
    createDate: faker.date.recent(10),
  };
};
