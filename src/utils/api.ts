const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const updateUserPoints = async (points: number): Promise<boolean> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('No authentication token found');
            return false;
        }

        const response = await fetch(`${API_BASE_URL}/api/users/points`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ points }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to update points:', errorData.error);
            return false;
        }

        const data = await response.json();
        console.log(`Successfully added ${points} points. New total: ${data.totalPoints}`);
        return true;
    } catch (error) {
        console.error('Error updating user points:', error);
        return false;
    }
};

export const getUserPoints = async (): Promise<number | null> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('No authentication token found');
            return null;
        }

        const response = await fetch(`${API_BASE_URL}/api/users/points`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to get points:', errorData.error);
            return null;
        }

        const data = await response.json();
        return data.totalPoints;
    } catch (error) {
        console.error('Error getting user points:', error);
        return null;
    }
};
