import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ClerkProvider,
  useSignIn,
  useUser,
  useSession,
  useSignUp,
} from "@clerk/clerk-react";

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, user } = useUser();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { session } = useSession();
  const [authStatus, setAuthStatus] = useState<boolean>(false);

  return (
    <ClerkProvider publishableKey="YOUR_PUBLISHABLE_KEY">
      <AuthContext.Provider
        value={{
          signIn,
          signUp,
          isLoaded,
          user,
          session,
          authStatus,
          setAuthStatus,
        }}
      >
        {children}
      </AuthContext.Provider>
    </ClerkProvider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthProvider };

export const useSignInWithPhoneNumber = () => {
  const { signIn, setAuthStatus } = useAuth();

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      const signInAttempt = await signIn.create({ phone: phoneNumber });
      setAuthStatus(true); // Update status once OTP is sent
      return signInAttempt;
    } catch (error) {
      console.error("Phone number sign-in failed:", error);
      setAuthStatus(false);
      return null;
    }
  };

  return { signInWithPhone };
};

export const useVerifyOTP = () => {
  const { signIn, setAuthStatus } = useAuth();

  const verifyOTP = async (otp: string) => {
    try {
      const verification = await signIn.verifyOtp({ code: otp });
      setAuthStatus(true); // OTP verified
      return verification;
    } catch (error) {
      console.error("OTP verification failed:", error);
      setAuthStatus(false);
      return null;
    }
  };

  return { verifyOTP };
};

export const useSignOutUser = () => {
  const { signUp, setAuthStatus } = useAuth();

  const signUpUser = () => {
    signUp();
    setAuthStatus(false);
  };

  return { signUpUser };
};
