import React, { useState, useEffect } from "react";
import DisplayData from "./DisplayData";

const Profile = () => {
  const [data, setData] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [starred, setStarred] = useState([]);
  const [gists, setGists] = useState([]);
  const username = "miletic96";


  const headers = {
    Authorization: "Token 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",
  };
  const userUrl = `https://api.github.com/users/${username}`;
  const starredUrl = `https://api.github.com/users/${username}/starred`;
  const reposUrl = `https://api.github.com/search/repositories?q=user:${username}`;
  const gistsUrl = `https://api.github.com/users/${username}/gists`;

  const submitHandler = async (e) => {
    // e.preventDefault();

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
    // console.log(starredJson);

    if (profileJson) {
      setData(profileJson);
      setRepositories(repoJson.items);
      setStarred(starredJson);
      setGists(gistsJson);
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    submitHandler();
  },[]);
  return (
    <>
      <div style={{ padding: 20 }}>
        <div className="ui search">
         
          <DisplayData data={data} repositories={repositories} starred={starred} gists={gists}/>
        </div>
      </div>
    </>
  );
};
export default Profile;
