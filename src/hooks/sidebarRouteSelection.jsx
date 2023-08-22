import { useLocation } from "react-router-dom";

export function useSelectedRoute() {
	const location = useLocation();

	let selected;
	switch (location.pathname) {
		case "/":
			selected = "/dashboard";
			break;
		case "/calendar":
		case "/appointment":
			selected = "appointments";
			break;
		default:
			selected = null;
	}
	return selected;
}
