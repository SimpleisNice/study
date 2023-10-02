import React, { useState, useEffect } from 'react';

export default function GitHubUser({ login }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!login) {
      return;
    }
    setLoading(true);
    fetch(`https://api.github.com/users/${login}`)
      .then(res => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(console.err)
  }, [login]);

  if (loading) {
    return <h1>loading....</h1>
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <img
        src={data.avatar_url}
        alt={data.login}
        style={{ width: 200 }}
      />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.location}</p>}
      </div>
    </div>
  );
}