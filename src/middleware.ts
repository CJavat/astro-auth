import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ["/protected"];
const notAuthenticatedRoutes = ["/login", "/register"];

// `context` y `next` son automáticamente tipados
export const onRequest = defineMiddleware((context, next) => {
  const { url, request, locals, redirect } = context;

  const isLoggedIn = !!firebase.auth.currentUser;
  const user = firebase.auth.currentUser;

  locals.isLoggedIn = isLoggedIn;
  if (user) {
    locals.user = {
      avatar: user.photoURL ?? "",
      email: user.email!,
      name: user.displayName!,
      emailVerified: user.emailVerified,
    };
  }

  console.log({ path: url.pathname });

  if (!isLoggedIn && privateRoutes.includes(url.pathname)) return redirect("/");

  if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname))
    return redirect("/");

  return next();
});
