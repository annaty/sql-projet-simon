export interface Stadium {
    name: string;
}

export interface Club {
    name: string;
    home_stadium_id: number;
}

export interface Statistics {
    lifetime_goals: number;
    lifetime_matches: number;
    first_match: string;
}

export interface Sponsor {
    name: string;
}

export interface Player {
    first_name: string;
    last_name: string;
    club_id: number;
    sponsor_id: number;
    statistics_id: number;
}

export interface Staff {
    first_name: string;
    last_name: string;
    type: number;
    club_id: number;
}

export interface StaffType {
    type: string;
}

export interface Competition {
    name: string;
    type: number;
}

export interface CompetitionType {
    name: string;
}

export interface CompetitionInstance {
    competition_id: number;
    nb_club_participants: number;
    year: string;
}

export interface CompetitionClubs {
    competition_instance_id: number;
    club_id: number;
}

export enum TABLES {
    competition_type = 'competition_type',
    competition = 'competition',
    competition_instance = 'competition_instance',
    staff_type = 'staff_type',
    staff = 'staff',
    stadium = 'stadium',
    club = 'club',
    competition_clubs = 'competition_clubs',
    sponsor = 'sponsor',
    statistics = 'statistics',
    player = 'player'
}

type Structure = {
    [key in TABLES]: {
        columns: string[];
    };
};

export const dbStructure: Structure = {
    stadium: {
        columns: ['name'],
    },
    club: {
        columns: ['name', 'home_stadium_id'],
    },
    sponsor: {
        columns: ['name'],
    },
    statistics: {
        columns: ['lifetime_goals', 'lifetime_matches', 'first_match'],
    },
    player: {
        columns: ['first_name', 'last_name', 'club_id', 'sponsor_id', 'statistics_id'],
    },
    competition_type: {
        columns: ['name'],
    },
    competition: {
        columns: ['name', 'type'],
    },
    competition_instance: {
        columns: ['competition_id', 'nb_club_participants', 'year'],
    },
    staff_type: {
        columns: ['type'],
    },
    staff: {
        columns: ['first_name', 'last_name', 'type', 'club_id'],
    },
    competition_clubs: {
        columns: ['competition_instance_id', 'club_id'],
    }
};