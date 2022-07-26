import { useState, useRef, useEffect } from 'react';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import ToWatch from './components/ToWatch';
import { nanoid } from 'nanoid';
import { usePrevious } from './components/usePrevious';

const FILTER_MAP: any = {
    All: () => true,
    Active: (movie: any) => !movie.watched,
    Watched: (movie: any) => movie.watched
};

const FILTER_NAMES: any = Object.keys(FILTER_MAP);

function App(props: any) {
    const [movies, setMovies] = useState(props.movies);
    const [filter, setFilter] = useState('All');

    function toggleMovieWatched(id: any) {
        const updatedMovies = movies.map((movie: any) => {
            if (id === movie.id) {
                return { ...movie, watched: !movie.watched }
            }

            return movie;
        });
        setMovies(updatedMovies);
    }


    function removeMovie(id: any) {
        const remainingMovies = movies.filter((movie: any) => id !== movie.id);
        setMovies(remainingMovies);
    }


    function editMovie(id: any, newTitle: any) {
        const editedWatchlist = movies.map((movie: any) => {
            if (id === movie.id) {
                return { ...movie, title: newTitle }
            }

            return movie;
        });
        setMovies(editedWatchlist);
    }

    const watchlist = movies
        .filter(FILTER_MAP[filter])
        .map((movie: any) => (
            <ToWatch
                id={movie.id}
                title={movie.title}
                watched={movie.watched}
                key={movie.id}
                toggleMovieWatched={toggleMovieWatched}
                removeMovie={removeMovie}
                editMovie={editMovie}
            />
        ));

    const filterList = FILTER_NAMES.map((title: any) => (
        <FilterButton
            key={title}
            title={title}
            isPressed={title === filter}
            setFilter={setFilter}
        />
    ));

    function addMovie(title: any) {
        const newMovie = { id: nanoid(), title: title, watched: false };
        setMovies([...movies, newMovie]);
    }


    const moviesNoun = watchlist.length !== 1 ? 'movies' : 'movie';
    const headingText = `${watchlist.length} ${moviesNoun} remaining`;

    const listHeadingRef: any = useRef(null);
    const prevMovieLength: any = usePrevious(movies.length);

    useEffect(() => {
        if (movies.length - prevMovieLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [movies.length, prevMovieLength]);

    return (
        <div className="watchlist stack-large">
            <Form addMovie={addMovie} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
                {headingText}
            </h2>
            <ul
                className="to-watch-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {watchlist}
            </ul>
        </div>
    );
}

export default App;
