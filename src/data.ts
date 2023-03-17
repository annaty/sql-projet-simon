import { Club, Stadium, Statistics, Sponsor, Player, Staff, StaffType, Competition, CompetitionType, CompetitionInstance, CompetitionClubs } from './types';
import { clubs } from './data/Clubs';
import { competitions } from './data/Competitions';
import { faker } from '@faker-js/faker';

const stadiums = require('./data/SoccerStadiums.json');

export const DEFAULT_TO_GENERATE = 11000;

export const STADIUMS: Stadium[] = Array.from(stadiums).map((stadium: any) => ({ name: stadium.Name }));

export const CLUBS: Club[] = clubs.map((club: string) => ({ name: club, home_stadium_id: getRandomId(STADIUMS.length) }));

export const STATISTICS: Statistics[] = Array.from({ length: DEFAULT_TO_GENERATE }).map(() => {
    return {
        lifetime_goals: parseInt(faker.random.numeric(4)),
        lifetime_matches: parseInt(faker.random.numeric(3)),
        first_match: faker.date.past(100).toJSON().slice(0, 10)
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
        club_id: getRandomId(CLUBS.length),
        sponsor_id: getRandomId(),
        statistics_id: getRandomId()
    }
});


export const STAFF_TYPES: StaffType[] = Array.from({ length: DEFAULT_TO_GENERATE }).map(() => {
    return {
        type: faker.name.jobTitle()
    }
});

export const STAFF: Staff[] = Array.from({ length: DEFAULT_TO_GENERATE }).map(() => {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        type: getRandomId(),
        club_id: getRandomId(CLUBS.length),
    }
});

export const COMPETITION_TYPES: CompetitionType[] = [
    { name: 'League' },
    { name: 'Cup' },
    { name: 'Tournament' },
    { name: 'Friendly' },
    { name: 'Other'},
    { name: 'Championship' },
    { name: 'Playoffs' },
    { name: 'Qualification' },
    { name: 'Relegation' },
    { name: 'Super Cup' },
    { name: 'World Cup' },
    { name: 'European Cup' },
    { name: 'Champions League' },
    { name: 'Europa League' },
    { name: 'Regional' }
]

export const COMPETITIONS: Competition[] = competitions.map((competition: string) => {
    return {
        name: competition,
        type: getRandomId(COMPETITION_TYPES.length)
    }
});

export const COMPETITION_INSTANCES: CompetitionInstance[] = Array.from({ length: DEFAULT_TO_GENERATE }).map(() => {
    return {
        competition_id: getRandomId(competitions.length),
        nb_club_participants: parseInt(faker.random.numeric(3)),
        year: faker.date.past().getFullYear().toString()
    }
});

export const COMPETITION_CLUBS: CompetitionClubs[] = Array.from({ length: DEFAULT_TO_GENERATE }).map(() => {
    return {
        club_id: getRandomId(CLUBS.length),
        competition_instance_id: getRandomId(competitions.length)
    }
});


function getRandomId(range = DEFAULT_TO_GENERATE): number {
    return Math.floor(Math.random() * range) + 1;
}
