const Actors = require('../models/Actors')
const Directors = require('../models/Directors')
const Genres = require('../models/Genres')
const Movies = require('../models/Movies')


Movies.belongsToMany(Actors, {through: 'movies_actors'})
Actors.belongsToMany(Movies, {through: 'movies_actors'})

Movies.belongsToMany(Directors, {through: 'movies_directors'})
Directors.belongsToMany(Movies, {through: 'movies_directors'})

Movies.belongsToMany(Genres, {through: 'movies_genres'})
Genres.belongsToMany(Movies, {through: 'movies_genres'})