import { STADIUMS, CLUBS, STATISTICS, SPONSORS, PLAYERS, STAFF_TYPES, STAFF, COMPETITION_TYPES, COMPETITIONS, COMPETITION_INSTANCES, COMPETITION_CLUBS } from './data';
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
            console.log(STADIUMS.length);
            for (let i = 0; i < STADIUMS.length; i++) {
                lines.push(`
                ("""${STADIUMS[i].name}""")
                `);
            }
            break;
        case TABLES.club:
            for (let i = 0; i < CLUBS.length; i++) {
                lines.push(`
                    ("${CLUBS[i].name}", ${CLUBS[i].home_stadium_id})
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
            console.log(SPONSORS.length);
            for (let i = 0; i < SPONSORS.length; i++) {
                lines.push(`
                    ("${SPONSORS[i].name}")
                `);
            }
            break;

        case TABLES.player:
            for (let i = 0; i < PLAYERS.length; i++) {
                lines.push(`
                    ("${PLAYERS[i].first_name}", "${PLAYERS[i].last_name}", ${PLAYERS[i].club_id}, ${PLAYERS[i].sponsor_id}, ${PLAYERS[i].statistics_id})
                `);
            }
            break;

        case TABLES.staff_type:
            for (let i = 0; i < STAFF_TYPES.length; i++) {
                lines.push(`
                    ("${STAFF_TYPES[i]}")
                `);
            }
            break;

        case TABLES.staff:
            for (let i = 0; i < STAFF.length; i++) {
                lines.push(`
                    ("${STAFF[i].first_name}", "${STAFF[i].last_name}", "${STAFF[i].type}", ${STAFF[i].club_id})
                `);
            }
            break;
        case TABLES.competition_type:
            for (let i = 0; i < COMPETITION_TYPES.length; i++) {
                lines.push(`
                    ("${COMPETITION_TYPES[i].name}")
                `);
            }
            break;
        case TABLES.competition:
            for (let i = 0; i < COMPETITIONS.length; i++) {
                lines.push(`
                    ("${COMPETITIONS[i].name}", ${COMPETITIONS[i].type})
                `);
            }
            break;
        case TABLES.competition_instance:
            for (let i = 0; i < COMPETITION_INSTANCES.length; i++) {
                lines.push(`
                    (${COMPETITION_INSTANCES[i].competition_id}, ${COMPETITION_INSTANCES[i].nb_club_participants}, "${COMPETITION_INSTANCES[i].year}")
                `);
            }
            break;
        case TABLES.competition_clubs:
            for (let i = 0; i < COMPETITION_CLUBS.length; i++) {
                lines.push(`
                    (${COMPETITION_CLUBS[i].competition_instance_id}, ${COMPETITION_CLUBS[i].club_id})
                `);
            }
            break;

        default:
            console.log("wrong table name");
    }

    return lines;
}

main();

