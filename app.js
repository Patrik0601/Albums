import express from 'express'
import { initializeDB, dbAll, dbRun, dbGet } from './util/database.js';
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json())

app.get('/albums', async (req, res) => {
    const rows = await dbAll('SELECT * FROM albums')
    res.json(rows)
})

app.get('/albums/:id', async (req, res) => {
    const album = await dbGet('SELECT * FROM albums WHERE id = ?', [req.params.id])
    if (album) res.json(album)
    else res.status(404).send('Album not found')
})

app.post('/albums', async (req, res) => {
    const { zenekar, albumName, releaseDateYear, sales } = req.body
    await dbRun('INSERT INTO albums (zenekar, albumName, releaseDateYear, sales) VALUES (?, ?, ?, ?)', [
        zenekar, albumName, releaseDateYear, sales
    ])
    res.status(201).send('Album added')
})

app.put('/albums/:id', async (req, res) => {
    const { zenekar, albumName, releaseDateYear, sales } = req.body
    await dbRun(
        'UPDATE albums SET zenekar = ?, albumName = ?, releaseDateYear = ?, sales = ? WHERE id = ?',
        [zenekar, albumName, releaseDateYear, sales, req.params.id]
    )
    res.send('Album updated')
})

app.delete('/albums/:id', async (req, res) => {
    await dbRun('DELETE FROM albums WHERE id = ?', [req.params.id])
    res.send('Album deleted')
})

async function startServer(){
    await initializeDB();
    app.listen(3000, () => {
        console.log("Server runs on port 3000")
    });
}

startServer();