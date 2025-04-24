import sqlite from 'sqlite3'

const db = new sqlite.Database('./data/database.sqlite')

export function dbAll(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.all(sql, params, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbGet(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.get(sql, params, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbRun(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.run(sql, params, function(err) {
            if(err) reject(err);
            else resolve();
        });
    });
}

export async function initializeDB(){
    await dbRun("DROP TABLE IF EXISTS albums;");
    await dbRun("CREATE TABLE IF NOT EXISTS albums (id INTEGER PRIMARY KEY AUTOINCREMENT, zenekar STRING, albumName STRING, releaseDateYear INT, sales INT);")
        const albums = [
            {zenekar: "Black Sabbath", albumName: "Paranoid", releaseDateYear: "1970", sales: "12000000"},
            {zenekar: "Metallica", albumName: "Master of Puppets", releaseDateYear: "1986", sales: "3000000"},
            {zenekar: "Judas Priest", albumName: "British Steel", releaseDateYear: "1980", sales: "1165000"},
            {zenekar: "Iron Maiden", albumName: "The Number of the Beast", releaseDateYear: "1982", sales: "14000000"},
            {zenekar: "Slayer", albumName: "Reign in Blood", releaseDateYear: "1986", sales: "500000"}, 
        ]
    for(const album of albums){
        await dbRun("INSERT INTO albums (zenekar, albumName, releaseDateYear, sales) VALUES (?, ?, ?, ?);", [album.zenekar, album.albumName, album.releaseDateYear, album.sales]);
    }
}