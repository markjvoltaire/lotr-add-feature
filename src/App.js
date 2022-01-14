import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import CharacterList from './components/Characters/CharacterList';
import FilmList from './components/Films/FilmList';

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getFilms();
    getCharacters();
  }, []);

  const getFilms = async () => {
    const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/films`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await resp.json();

    const changeData = data.map((film) => [
      film.title,
      film.title.trim().toLowerCase().split('').join('-'),
      film.box_office_total,
      film.academy_award_nominations,
    ]);

    setFilms(changeData);
  };

  const getCharacters = async () => {
    const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/characters`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await resp.json();

    const changeData = data.map((character) => ({
      ...character,
      dates:
        character.birth && character.death ? `${character.birth} - ${character.death}` : 'unknown',
    }));
    setCharacters(changeData);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavLink to="/films" data-testid="film-link">
            Films
          </NavLink>
          <NavLink to="/characters" data-testid="char-link">
            Characters
          </NavLink>
        </header>
        <Switch>
          {/* ADD YOUR ROUTES HERE */}
          <Route exact path="/characters">
            <CharacterList characters={characters} />
          </Route>
          <Route exact path="/films">
            <FilmList films={films} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
