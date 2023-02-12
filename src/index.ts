import { STADIUMS, CLUBS, STATISTICS, SPONSORS, PLAYERS } from './data';
import { dbStructure, TABLES } from './types';
let mysql = require('mysql');


let con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "mynewpassword",  
    database: "sports"  
});  

function main() {
    let table: keyof typeof dbStructure;

    for (table in dbStructure) { //loop over each table to insert 
        connectAndInsert(table);
    }
    con.end();
    console.log('done inserting')
}

function connectAndInsert(targetTable: keyof typeof dbStructure) {
    let lines = generateInsertLines(targetTable);

    for (let i = 0; i < lines.length; i++) {
        let sql = `INSERT INTO ${targetTable} 
        (${dbStructure[targetTable].columns.join(", ")}) 
        VALUES ${lines[i]}`;

        con.query(sql, function (err: any, result: any) {  
            if (err) throw err;  
        })
    }
    console.log(`done inserting ${targetTable}`)
}

function generateInsertLines(targetTable: keyof typeof dbStructure): string[] {
    let lines: string[] = []; //format: ["('xxx', 'xxx')", "('xxx', 'xxx')", ...]
    switch (targetTable) {
        case TABLES.stadium:
            for (let i = 0; i < STADIUMS.length; i++) {
                lines.push(`
                ("""${STADIUMS[i].name}""")
                `);
            }
            break;
        case TABLES.club:
            for (let i = 0; i < CLUBS.length; i++) {
                lines.push(`
                ("${CLUBS[i].name}", "${CLUBS[i].home_stadium_id}")
                `);
            }
            break;
        case TABLES.statistics:
            for (let i = 0; i < STATISTICS.length; i++) {
                lines.push(`
                (${STATISTICS[i].lifetime_goals}, ${STATISTICS[i].lifetime_matches}, "${STATISTICS[i].first_match}")
                `);
            }
            break;
        case TABLES.sponsor:
            for (let i = 0; i < SPONSORS.length; i++) {
                lines.push(`
                ("${SPONSORS[i].name}")
                `);
            }
            break;

        case TABLES.player:
            for (let i = 0; i < PLAYERS.length; i++) {
                lines.push(`
                ("${PLAYERS[i].first_name}", "${PLAYERS[i].last_name}", "${PLAYERS[i].club_id}", "${PLAYERS[i].sponsor_id}", "${PLAYERS[i].statistics_id}")
                `);
            }
            break;

        default:
            console.log("wrong table name");
    }

    return lines;
}

main();

