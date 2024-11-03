import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";

interface IJwtPayload extends JwtPayload {
  exp: number;
}

const AuthContext = createContext({});
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(localStorage.getItem("jwt") || null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token !== "null") {
      const validatedToken = validateToken(token as string);
      setUser(validatedToken);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("jwt", token);
    setUser(jwtDecode(token));
    toast.success("Login Succeeded!");
    router.push("/dashboard");
  };

  const validateToken = (token: string) => {
    if (token) {
      const decodedToken = jwtDecode<IJwtPayload>(token);
      if (decodedToken.exp * 1000 < Date.now()) return null;
      else return decodedToken;
    }
  };

  const register = () => router.push("/login");

  const logout = () => {
    try {
      localStorage.removeItem("jwt");
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("walletConnected");
      localStorage.removeItem("balance");
      setUser(null);
      router.push("/login");
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, setUser, validateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthGuard = ({ children }: any) => {
  const router = useRouter();
  const { user } = useAuth();
  return user ? children : router.push("/login");
};

const useAuth = () => useContext<any>(AuthContext);
export { AuthProvider, useAuth };
