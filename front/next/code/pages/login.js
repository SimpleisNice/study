import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../hooks/auth";

async function handleLogin(email, password) {
  const resp = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await resp.json();

  if (data.success) {
    return;
  }
  throw Error("WRONG EMAIL OR PASSWORD");
}

export default function Home() {
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);
  const { loading, loggedIn } = useAuth();

  if (loading) {
    return <p>loading</p>;
  }

  if (!loading && loggedIn) {
    router.push("/protected-route");
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    setLoginError(null);

    handleLogin(email.value, password.value)
      .then(() => router.push("/protected-route"))
      .catch((error) => setLoginError(error.message));
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">EMAIL</label>
        <input id="email" type="email"></input>

        <label htmlFor="password">PASSWORD</label>
        <input id="password" type="password"></input>

        <button type="submit">LOGIN</button>
        {loginError && <div>{loginError}</div>}
      </form>
    </div>
  );
}
