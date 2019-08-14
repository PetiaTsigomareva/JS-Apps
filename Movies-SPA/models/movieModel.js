const movieModel = function () {
  const createMovie = function (params) {
    let movie = {
      title: params.title,
      imageUrl: params.imageUrl,
      description: params.description,
      genres: params.genres.split(' '),
      tickets: Number(params.tickets)
    };

    console.log(movie);
    //TODO Validation
    return requester.post('movies', 'appdata', 'Kinvey', movie);
  };

  const getAllMovies = function () {
    const sortCriteria = JSON.stringify({'tickets': -1});
    return requester.get(`movies?query={}&sort=${sortCriteria}`, 'appdata', 'Kinvey');
  };

  const getMyMovies = function (user_id) {
    return requester.get(`movies?query={"_acl.creator":"${user_id}"}`, 'appdata', 'Kinvey');
  };

  const getMovieById = function (id) {
    return requester.get(`movies/${id}`, 'appdata', 'Kinvey');

  };

  const editMovie = function (params) {
    let movie = {
      title: params.title,
      imageUrl: params.imageUrl,
      description: params.description,
      genres: params.genres.split(' '),
      tickets: Number(params.tickets)
    };

    console.log(movie);
    //TODO Validation
    return requester.put(`movies/${params.id}`, 'appdata', 'Kinvey', movie);


 };

  const deleteMovie = function (id) {
    //TODO Validation
    return requester.del(`movies/${id}`, 'appdata', 'Kinvey');
  };

  return {
    createMovie,
    getAllMovies,
    getMyMovies,
    getMovieById,
    editMovie,
    deleteMovie
  }

}();