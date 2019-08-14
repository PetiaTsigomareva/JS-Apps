const movieController = function () {
  const getCreateMovie = function (context) {
    helper.addHeaderInfo(context);
    helper.loadPartials(context)
      .then(function () {
        this.partial('./views/movies/createMovies.hbs')
      })
  };

  const postCreateMovie = function (context) {
    movieModel.createMovie(context.params)
      .then(helper.handler)
      .then((data) => {
        console.log(data);
        context.redirect('#/home')
      })

  };

  const loadMovies = function (context) {
    helper.addHeaderInfo(context);
    movieModel.getAllMovies()
      .then(helper.handler)
      .then((data) => {
        context.movies = data;
        helper.loadPartials(context, {'movieView': './views/movies/movieView.hbs'})
          .then(function () {
            this.partial('./views/movies/cinema.hbs')
          })
      })

  };
//Async way for load movies
  const loadMoviesAsync = async function (context) {
    helper.addHeaderInfo(context);
    try {
      const response = await movieModel.getAllMovies();
      const movies = await response.json();
      context.movies = movies;

      helper.loadPartials(context, {'movieView': './views/movies/movieView.hbs'})
        .then(function () {
          this.partial('./views/movies/cinema.hbs')
        })
    } catch (e) {
      console.log(e);
    }

  };

  const loadMyMovies = function (context) {
    helper.addHeaderInfo(context);
    movieModel.getMyMovies(sessionStorage.getItem('userId'))
      .then(helper.handler)
      .then((data) => {
        context.movies = data;
        helper.loadPartials(context, {'myMovieView': './views/movies/myMovieView.hbs'})
          .then(function () {
            this.partial('./views/movies/myMovies.hbs')
          })
      })
  };

  const getEditMovie = function (context) {
    helper.addHeaderInfo(context);
    movieModel.getMovieById(context.params.id)
      .then(helper.handler)
      .then((data) => {
        Object.keys(data).forEach(key => {
          if (key === 'genres') {
            data[key] = data[key].join(' ');
          }
          context[key] = data[key]

        });
        helper.loadPartials(context)
          .then(function () {
            this.partial('./views/movies/editMovie.hbs')
          })
      })
  };

  const postEditMovie = function (context) {
    movieModel.editMovie(context.params)
      .then(helper.handler)
      .then((data) => {
        console.log(data);
        context.redirect('#/myMovies')
      })

  };

  const getDeleteMovie = function (context) {
    helper.addHeaderInfo(context);
    movieModel.getMovieById(context.params.id)
      .then(helper.handler)
      .then((data) => {
        Object.keys(data).forEach(key => {
          if (key === 'genres') {
            data[key] = data[key].join(' ');
          }
          context[key] = data[key]

        });
        helper.loadPartials(context)
          .then(function () {
            this.partial('./views/movies/deleteMovie.hbs')
          })
      })
  };

  const postDeleteMovie = function (context) {
    movieModel.deleteMovie(context.params.id)
      .then(helper.handler)
      .then((data) => {
        console.log(data);
        context.redirect('#/home')
      })
  };

  const getMovieDetails = function (context) {
    helper.addHeaderInfo(context);
    movieModel.getMovieById(context.params.id)
      .then(helper.handler)
      .then((data) => {
        Object.keys(data).forEach(key => {
          if (key === 'genres') {
            data[key] = data[key].join(' ');
          }
          context[key] = data[key]

        });
        helper.loadPartials(context)
          .then(function () {
            this.partial('./views/movies/detailMovie.hbs')
          })
      })
  };

  const buyTickets = function (context) {
    helper.addHeaderInfo(context);
    movieModel.getMovieById(context.params.id)
      .then(helper.handler)
      .then((data) => {
        if (data.tickets !== 0) {
          data.tickets = data.tickets - 1;
        }
        return requester.put(`movies/${context.params.id}`, 'appdata', 'Kinvey', data)
      })
      .then(helper.handler)
      .then(()=>{
        context.redirect('#/allMovies');
      })
  };

  return {
    getCreateMovie,
    postCreateMovie,
    loadMovies,
    loadMoviesAsync,
    loadMyMovies,
    getEditMovie,
    postEditMovie,
    getDeleteMovie,
    postDeleteMovie,
    getMovieDetails,
    buyTickets
  }

}
();