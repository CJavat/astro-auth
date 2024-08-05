import { firebase } from "@/firebase/config";
import { defineAction, z } from "astro:actions";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password }, { cookies }) => {
    try {
      const user = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      return user;
    } catch (error) {
      console.log(error);

      const firebaseError = error as AuthError;
      if (firebaseError.code === "auth/invalid-credential")
        throw new Error("Correo y/o Contraseña son incorrectos");

      throw new Error("Ha ocurrido un error desconocido");
    }
  },
});
