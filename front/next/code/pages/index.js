import styles from "../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";

export async function getServerSideProps() {
  const usersReq = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  return {
    props: {
      users: usersReq.data,
    },
  };
}

export default function Home({ users }) {
  return (
    <div className={styles.container}>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
