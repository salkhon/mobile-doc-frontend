import { useLocation } from "react-router-dom";

export function useSelectedRoute() {
	const location = useLocation();
    const pathname = location.pathname;

	let selected;
	console.log("location pathname", pathname);
    if (pathname === "/") {
        selected = "Home";
    } else if (pathname.startsWith("/appointment")) {
        selected = "Appointments";
    } else if (pathname.startsWith("/calendar")) {
        selected = "Calendar";
    } else if (pathname.startsWith("/profile")) {
        selected = "Profile"
    }

	return selected;
}
