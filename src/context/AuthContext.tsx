import { createContext, FC, useContext } from "react";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";

import { auth } from "@/firebase/firebase";

const AuthContext = createContext<{
  user: any;
  loading: boolean;
  error: any;
  handleGoogleLogin: () => void;
  handleLogout: () => void;
}>({
  user: null,
  loading: true,
  error: null,
  handleGoogleLogin: () => {},
  handleLogout: () => {},
});
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
export const AuthProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signOut] = useSignOut(auth);
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Signed in successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, loading, error, handleGoogleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
