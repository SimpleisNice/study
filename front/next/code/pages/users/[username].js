import axios from "axios";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  const { username } = ctx.query;
  const userReq = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${username}`
  );

  if (userReq.status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: userReq.data,
    },
  };
}

function UserPage({ user }) {
  return (
    <div>
      <div>
        <Link href={"/"}>BACK TO HOME</Link>
      </div>
      <hr />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <b>USER NAME</b>: {user.username}
        </div>
        <div>
          <b>EMAIL</b>: {user.email}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
