import { api } from "../../../services/api";
import { useTech } from "../TechContext/tech";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IUserProps {
  children: ReactNode;
}

interface IUserData {
  user: IUserInfo;
  setUser: Dispatch<SetStateAction<ILogin>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  logIn: (data: ILogin) => void;
  logOut: () => void;
  registration: (data: IRegistration) => void;
  handleToLoginPage: () => void;
}

interface IUserInfo{
  email: string;
  password: string;
  name?: string;
  bio?: string;
  contact?: string;
  course_module?: string;
}

type ILogin = Omit<IUserInfo, 'name' | 'bio' | 'contact' | 'course_module'>

interface IRegistration {
    email: string;
    password: string;
    name: string;
    bio: string;
    contact: string;
    course_module: string;
}

export const UserContext = createContext<IUserData>({} as IUserData);

export function useUser() { return useContext(UserContext)}

export default function UserProvider({ children }: IUserProps) {
  const { setTechs } = useTech();

  const [user, setUser] = useState<IUserInfo>({} as IUserInfo);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@userToken");

    async function listUser() {
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const { data } = await api.get(`profile`);
          setUser(data);
          setLoading(true);
          setTechs(data.techs);
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    listUser();
  }, []);

  function logIn(data: ILogin) {
    setLoading(true);
    api
      .post("sessions", data)
      .then((res) => {
        localStorage.setItem("@userToken", res.data.token);
        localStorage.setItem("@userId", res.data.user.id);
        setUser(res.data.user);
        setTechs(res.data.user.techs);
        setLoading(false);
        toast.success("Login realizado com sucesso", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Email e/ou senha incorreta", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  function logOut() {
    localStorage.clear();
    // setUser()
    navigate("/login", { replace: true });
  }

  function registration(data: IRegistration) {
    api
      .post("users", data)
      .then(() => {
        toast.success("Conta criada com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ops! Algo deu errado", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  function handleToLoginPage() {
    navigate("/", { replace: true });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        logIn,
        logOut,
        registration,
        handleToLoginPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
