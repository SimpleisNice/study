import { useRouter } from "next/router";
import { useAuth } from "../hooks/auth";

export default function ProtectedRoute() {
  const router = useRouter();
  const { loading, error, loggedIn } = useAuth();

  if (!loading && !loggedIn) {
    router.push("/login");
  }

  return (
    <div>
      {loading && <p>loading</p>}
      {error && <p>an error </p>}
      {loggedIn && <h1>PROTECTED ROUTE</h1>}
    </div>
  );
}
