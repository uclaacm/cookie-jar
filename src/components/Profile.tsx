import React, { useState, useEffect } from 'react';
import '../styles/Profile.scss';
import { getUserPoints } from '../utils/api';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto?: string;
    currentStage: number;
    totalPoints: number;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            // Get user data from token (basic info)
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                console.log('Token payload:', payload); // Debug log

                // Get total points from API (for real-time updates)
                const totalPoints = await getUserPoints();
                console.log('API points:', totalPoints); // Debug log

                setUser({
                    firstName: payload.firstName || 'User',
                    lastName: payload.lastName || '',
                    email: payload.email || '',
                    profilePhoto: payload.profilePhoto || undefined,
                    currentStage: payload.currentStage || 1,
                    totalPoints: totalPoints !== null ? totalPoints : (payload.totalPoints || 0)
                });
            }
        } catch (err) {
            setError('Failed to load user data');
            console.error('Error fetching user data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    // Add refresh functionality
    const refreshPoints = async () => {
        const totalPoints = await getUserPoints();
        if (totalPoints !== null && user) {
            setUser({ ...user, totalPoints });
        }
    };

    if (loading) {
        return (
            <div className="profile-container">
                <div className="loading">Loading profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-container">
                <div className="error">User not found</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>User Profile</h1>
                <button className="refresh-button" onClick={refreshPoints}>
                    🔄 Refresh Points
                </button>
            </div>

            <div className="profile-content">
                <div className="profile-info">
                    <div className="avatar">
                        {user.profilePhoto ? (
                            <img src={user.profilePhoto} alt="Profile" />
                        ) : (
                            <div className="default-avatar">
                                {user.firstName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="user-details">
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p className="email">{user.email}</p>
                        <p className="stage">Current Stage: {user.currentStage}</p>
                    </div>
                </div>

                <div className="stats-container">
                    <div className="stat-card">
                        <h3>Total Points</h3>
                        <div className="points-display">{user.totalPoints.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
