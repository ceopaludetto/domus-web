import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const Toast = styled(ToastContainer)`
    .Toastify__toast-container {
        align-items: center;
        display: flex;
    }
    .Toastify__toast {
        width: 100%;
        display: flex;
        align-items: center;
        border-radius: 4px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        padding: 1rem 0.75rem;
        background-color: ${props => props.theme.color.back};
        .Toastify__toast-body {
            display: flex;
            align-items: center;
        }
        .Toastify__progress-bar {
            background: ${props => props.theme.color.primary};
            height: 2px;
        }
    }
`;

Toast.defaultProps = {
    position: 'bottom-right',
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    closeOnClick: false,
    closeButton: false,
    autoClose: 10000
};

export default Toast;
