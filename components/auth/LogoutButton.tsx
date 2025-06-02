import React from 'react';
import Styles from './LogoutButton.module.css';

const LogoutButton: React.FC = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={Styles.logoutButton}
        >
            Se déconnecter
        </button>
    );
};

export default LogoutButton;