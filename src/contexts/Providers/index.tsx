import { ReactNode } from "react";
import TechProvider from "./TechContext/tech";
import UserProvider from "./UserContext/user";

interface IProvider {
  children: ReactNode;
}

export default function Providers({ children }: IProvider) {
  return (
    <TechProvider>
      <UserProvider>
      {children}
      </UserProvider>
    </TechProvider>
  );
}
