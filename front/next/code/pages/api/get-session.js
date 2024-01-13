import { parse } from "cookie";
import { decode } from "jsonwebtoken";

export default function getSession(req, res) {
  if (req.method !== "GET") {
    return res.status(404).end();
  }

  const { my_auth } = parse(req.headers.cookie || "");

  if (!my_auth) {
    return res.json({ loggedIn: fasle });
  }

  return res.json({
    loggedIn: true,
    user: decode(my_auth),
  });
}
