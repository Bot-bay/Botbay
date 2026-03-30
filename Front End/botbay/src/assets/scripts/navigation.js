import { useNavigate } from "react-router-dom";

export const WikiUrl = "https://github.com/Bot-bay/Botbay/wiki";

export function switchToPage(path) {
    const navigate = useNavigate();

    return () => {
        navigate(path);
    };
}
