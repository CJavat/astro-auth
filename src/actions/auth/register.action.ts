import { firebase } from "@/firebase/config";
import { defineAction, z } from "astro:actions";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from "firebase/auth";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }, context) => {
    const { cookies } = context;

    //* Cookies
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), //? 1 año
        path: "/",
      });
    } else {
      cookies.delete("email", { path: "/" });
    }

    //* Creación del usuario
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      //* Actualizar el nombre (displayName)
      updateProfile(firebase.auth.currentUser!, {
        displayName: name,
      });

      //* Enviar correo de confirmación
      await sendEmailVerification(firebase.auth.currentUser!, {
        // url: "http://localhost:4321/protected?emailVerified=true",
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
      });

      //* Verificar el correo electrónico

      return user;
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === "auth/email-already-in-use")
        throw new Error("El correo ya está en uso");

      throw new Error("Auxilio algo salió mal");
    }
  },
});
