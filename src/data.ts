import { Club, Stadium, Statistics, Sponsor, Player } from './types';
import { clubs } from './data/Clubs';
import { faker } from '@faker-js/faker';

const stadiums = require('./data/SoccerStadiums.json');

export const DEFAULT_TO_GENERATE = 1000;

export const STADIUMS: Stadium[] = Array.from(stadiums).map((stadium: any) => ({ name: stadium.Name }));

export const CLUBS: Club[] = clubs.map((club: string) => ({ name: club, home_stadium_id: getRandomId(STADIUMS.length) }));

export const STATISTICS: Statistics[] = Array.from({ length: DEFAULT_TO_GENERATE }).map(() => {
    return {
        lifetime_goals: parseInt(faker.random.numeric(4)),
        lifetime_matches: parseInt(faker.random.numeric(3)),
        first_match: faker.date.past().toISOString()
    } as Statistics;
});

export const SPONSORS: Sponsor[] = Array.from({ length: DEFAULT_TO_GENERATE }).map(() => {
    return {
        name: faker.company.name()
    }
});

export const PLAYERS: Player[] = Array.from({ length: DEFAULT_TO_GENERATE }).map(() => {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        club_id: getRandomId(),
        sponsor_id: getRandomId(),
        statistics_id: getRandomId()
    }
});


function getRandomId(range = DEFAULT_TO_GENERATE): number {
    return Math.floor(Math.random() * range);
}
