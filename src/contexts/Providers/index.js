import TechProvider from "./TechContext/tech";
import UserProvider from "./UserContext/user";

const Providers = ({ children }) => {
    return (
        <TechProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </TechProvider>
    )
};

export default Providers;
          