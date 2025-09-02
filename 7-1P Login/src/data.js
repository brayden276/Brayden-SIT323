import { faker } from '@faker-js/faker';

const makeCard = (tag) => ({
  title: faker.company.catchPhrase(),
  desc: faker.hacker.phrase(),
  author: faker.internet.userName(),
  stars: faker.number.float({ min: 4, max: 5, multipleOf: 0.1 }),
  img: `https://picsum.photos/seed/${tag}-${faker.string.uuid()}/400/300`,
});

export const articles = Array.from({ length: 6 }, () => makeCard('article'));
export const tutorials = Array.from({ length: 6 }, () => makeCard('tutorial'));
