export enum StaffType {
    director = "DIRECTOR",
    writer = "WRITER",
    actor = "ACTOR"
}

export interface IBoxOffice {
    amount: number,
    symbol: string,
    type?: string,
    currencyCode?: string,
    name?: string
}

export interface IStaff {
    nameRu: string
    professionKey: StaffType.director | StaffType.writer | StaffType.actor
    staffId?: number
    nameEn?: string
    description?: string | null
    posterUrl?: string
}

interface IGenres {
    genre: string
}

interface ICountries {
    country: string
}

export interface IMovie {
    kinopoiskId: number
    imdbId: string
    nameRu: string
    nameEn: string
    nameOriginal: string
    year: number
    filmLength: number
    genres: IGenres[]
    directors: IStaff[]
    writers: IStaff[]
    actors: IStaff[]
    description: string
    posterUrl: string
    posterUrlPreview: string
    coverUrl: string
    logoUrl: string
    ratingImdb: number
    boxOffice: IBoxOffice[]
    countries: ICountries[]
    reviewsCount?: number
    ratingGoodReview?: number
    ratingGoodReviewVoteCount?: number
    ratingKinopoisk: number
    ratingKinopoiskVoteCount?: number
    ratingImdbVoteCount?: number
    ratingFilmCritics?: number
    ratingFilmCriticsVoteCount?: number
    ratingAwait?: number
    ratingAwaitCount?: number
    ratingRfCritics?: number
    ratingRfCriticsVoteCount?: number
    webUrl?: string
    slogan?: string
    shortDescription?: string
    editorAnnotation?: string
    isTicketsAvailable?: boolean
    productionStatus?: string
    type?: string
    ratingMpaa?: string
    ratingAgeLimits?: string
    hasImax?: boolean
    has3D?: boolean
    lastSync?: string
    startYear?: number
    endYear?: number
    serial?: boolean
    shortFilm?: boolean
    completed?: boolean
    rating?: string
    favorite?: boolean
    filmId?: number
}
