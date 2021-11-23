import React, { useState } from "react";
import DisplayData from "./DisplayData";

const Search = () => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [starred, setStarred] = useState([]);
  const [gists, setGists] = useState([]);

  const onChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const headers = {
    Authorization: "Token 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",
  };
  const userUrl = `https://api.github.com/users/${username}`;
  const starredUrl = `https://api.github.com/users/${username}/starred`;
  const reposUrl = `https://api.github.com/search/repositories?q=user:${username}`;
  const gistsUrl = `https://api.github.com/users/${username}/gists`;

  const submitHandler = async (e) => {
    e.preventDefault();

    const profile = await fetch(userUrl, { method: "GET", headers: headers });
    const profileJson = await profile.json();
    console.log(profileJson);

    // const repositories = await fetch(profileJson.repos_url, { method: "GET", headers: headers });
    const repositories = await fetch(reposUrl, { method: "GET", headers: headers });
    const repoJson = await repositories.json();
    // console.log(repoJson);

    const starred = await fetch(starredUrl, { method: "GET", headers: headers });
    const starredJson = await starred.json();

    const gists = await fetch(gistsUrl, { method: "GET", headers: headers });
    const gistsJson = await gists.json();
    console.log(gistsJson);

    if (profileJson) {
      setData(profileJson);
      console.log(repoJson.items);
      setRepositories(repoJson.items);
      setStarred(starredJson);
      setGists(gistsJson);
    }
  };
  return (
    <>
      <div style={{ padding: 20 }}>
      
        <div className="ui search">
          <div className="ui icon input">
            <i className="search icon"></i>
            <input
              className="prompt"
              placeholder="search username here..."
              type="text"
              value={username}
              onChange={onChangeHandler}
            />
          </div>

          <button
            className="ui primary button"
            type="submit"
            onClick={submitHandler}
          >
            <i className="github icon"></i>
            Search
          </button>
          <DisplayData data={data} repositories={repositories} starred={starred} gists={gists}/>
        </div>
      </div>
    </>
  );
};
export default Search;
