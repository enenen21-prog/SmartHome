import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

/* Read all the rooms */
app.get('/rooms', async (req, res) => {
   console.log('Backend server: GET ROOMS');
  try {
    // Read the rooms file
    const fileContent = await fs.readFile('./data/rooms.json');
    const rooms = JSON.parse(fileContent);

    // Respond with the rooms array
    res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch rooms' });
  }
});

/* Add a new room */
app.post('/rooms', async (req, res) => {
  console.log('Backend server: ADD NEW ROOM');
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Read existing rooms
    const fileContent = await fs.readFile('./data/rooms.json');
    const rooms = JSON.parse(fileContent);

    // Create the new room object
    const newRoom = {
      id: randomUUID(),
      title,
      description: description || '',
    };

    // Add to rooms array
    rooms.push(newRoom);

    // Save back to file
    await fs.writeFile('./data/rooms.json', JSON.stringify(rooms, null, 2));

    // Return the new room
    res.status(201).json(newRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create room' });
  }
});

app.listen(3000, () => {
  console.log('Backend server: running on http://localhost:3000');
});
