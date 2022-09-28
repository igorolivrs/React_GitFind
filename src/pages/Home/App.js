import { useState } from "react";
import { Header } from "../../components/Header";
import background from "../../assets/github.png";
import ItemList from "../../components/ItemList";

import "./styles.css";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio,location, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, location, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <div className="conteudo_backgroud">
          <img src={background} className="background" alt="background app" />
        </div>
        <div className="info">
          <div className="info_search">
            <input
              name="usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@username"
            />
            <button onClick={handleGetData}>Search</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  className="profile-photo"
                  alt="user"
                />

                <div className="perfil_description">
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                  <p>{currentUser.location}</p>
                </div>
              </div>

              <hr />
            </>
          ) : null}

          {repos?.length ? (
            <div>
              <h4 className="repositorios">Repositories</h4>
              {repos.map((repo) => (
                <ItemList
                  title={repo.name}
                  description={repo.description}
                  link={repo.html_url}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
