import React, { useState, useEffect } from 'react';
import '../styles/Profile.scss';
import { getUserPoints, getUserCookies } from '../utils/api';
import PurchasedCookieCard from './PurchasedCookieCard';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto?: string;
    currentStage: number;
    totalPoints: number;
}

interface PurchasedCookie {
    _id: string;
    cookieName: string;
    cookieType: string;
    price: number;
    purchasedAt: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [purchasedCookies, setPurchasedCookies] = useState<PurchasedCookie[]>([]);
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

                // Get purchased cookies
                const cookies = await getUserCookies();
                console.log('User cookies:', cookies); // Debug log

                setUser({
                    firstName: payload.firstName || 'User',
                    lastName: payload.lastName || '',
                    email: payload.email || '',
                    profilePhoto: payload.profilePhoto || undefined,
                    currentStage: payload.currentStage || 1,
                    totalPoints: totalPoints !== null ? totalPoints : (payload.totalPoints || 0)
                });

                setPurchasedCookies(cookies || []);
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
        const cookies = await getUserCookies();
        if (totalPoints !== null && user) {
            setUser({ ...user, totalPoints });
        }
        if (cookies !== null) {
            setPurchasedCookies(cookies);
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
                    Refresh Points
                </button>
            </div>

            <div className="profile-content">
                <div className="profile-info">
                    <div className="avatar">
                        <img src={user.profilePhoto || '/src/assets/c8.png'} alt="Profile" />
                    </div>

                    <div className="user-details">
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p className="email">{user.email}</p>
                    </div>
                </div>

                <div className="stats-container">
                    <div className="stat-card">
                        <h3>Total Points</h3>
                        <div className="points-display">{user.totalPoints.toLocaleString()}</div>
                    </div>
                </div>

                <div className="purchased-cookies-container">
                    <h3>Your Purchased Cookies</h3>
                    {purchasedCookies.length > 0 ? (
                        <div className="purchased-cookies-grid">
                            {purchasedCookies.map((cookie) => (
                                <PurchasedCookieCard key={cookie._id} cookie={cookie} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-cookies">
                            You haven't purchased any cookies yet. Visit the Menu to buy some!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
