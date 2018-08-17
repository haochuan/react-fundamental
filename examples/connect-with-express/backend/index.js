const express = require('express');
const app = express();
const faker = require('faker');

const PORT = 4000;

function generateData(length = 10) {
  const data = [];
  for (let i = 0; i < length; i++) {
    const user = {
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      email: faker.internet.email(),
      image: faker.image.avatar()
    };
    data.push(user);
  }
  return data;
}

app.get('/api/users', (req, res) => {
  const users = generateData(5);
  setTimeout(() => {
    res.status(200).json(users);
  }, 5000);
});

app.listen(PORT, () => {
  console.log(`Express Server is running on port ${PORT}`);
});
