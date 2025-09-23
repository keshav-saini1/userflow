import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import user from "@/assets/user.svg";
import { useNavigate } from "react-router";


const UserDropdown = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("selectedPropertyId");
        localStorage.removeItem("tenant_id");
        localStorage.removeItem("tenant_status");
        navigate("/");
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <img src={user} alt="user" className="w-10 h-10" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default UserDropdown