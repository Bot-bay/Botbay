import { useNavigate } from 'react-router-dom';

export function switchToPage(path) {
    const navigate = useNavigate();

    return () => {
        navigate(path);
    };
}
