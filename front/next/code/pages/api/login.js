import { serialize } from "cookie";
import { encode } from "../../lib/jwt";

function authentiacateUser(email, password) {
  const vaildEmail = "test@test.com";
  const vaildPassword = "test";

  if (email === vaildEmail && password === vaildPassword) {
    return encode({
      id: "123",
      name: "test",
      email: "test",
    });
  }
  return null;
}

export default function login(req, res) {
  const { method } = req;
  const { email, password } = req.body;

  if (method !== "POST") {
    return res.status(404).end();
  }

  if (!email || !password) {
    return res.status(400).json({
      error: "Missing required params",
    });
  }

  const user = authentiacateUser(email, password);

  if (user) {
    res.setHeader(
      "Set-Cookie",
      serialize("my_auth", user, { path: "/", httpOnly: true })
    );
    return res.json({
      success: true,
      user,
    });
  } else {
    return res.status(401).json({
      success: false,
      error: "wrong email of password",
    });
  }
}
