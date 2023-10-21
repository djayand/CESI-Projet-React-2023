import { useNavigate } from 'react-router-dom';

const useRedirectToPortal = (userRole: string | undefined) => {
    const navigate = useNavigate();

    return () => {
        switch (userRole) {
            case '3':
                navigate('/driver');
                break;
            case '2':
                navigate('/owner');
                break;
            case '1':
                navigate('/customer');
                break;
            case '4':
                navigate('/developer');
                break;
            case '5':
                navigate('/sales');
                break;
            case '6':
                navigate('/technical');
                break;
            default:
                navigate('/login');
        }
    }
};

export default useRedirectToPortal;
