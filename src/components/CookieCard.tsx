import React, { useState } from 'react';
import './../styles/Cookie.scss';
import { purchaseCookie, getUserPoints } from '../utils/api';

interface CookieCardProps {
    name: string;
    image: string;
    onClick: () => void;
    cookieType: string;
    onPurchaseSuccess?: (remainingPoints: number) => void;
    userPurchasedCookies?: string[];
}

const CookieCard: React.FC<CookieCardProps> = ({ name, image, onClick, cookieType, onPurchaseSuccess, userPurchasedCookies = [] }) => {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [insufficientPoints, setInsufficientPoints] = useState(false);
    const [alreadyOwned, setAlreadyOwned] = useState(false);
    const cookiePrice = 500;

    const handleBuyClick = async (e: React.MouseEvent) => {
        e.stopPropagation();

        // Check if user already owns this cookie
        const alreadyOwnsCookie = userPurchasedCookies.some(purchasedCookie =>
            purchasedCookie.toLowerCase() === name.toLowerCase()
        );

        if (alreadyOwnsCookie) {
            setAlreadyOwned(true);
            return;
        }

        // Check user's current points
        const userPoints = await getUserPoints();
        if (userPoints === null) {
            console.error('Could not fetch user points');
            return;
        }

        if (userPoints < cookiePrice) {
            setInsufficientPoints(true);
            return;
        }

        setShowConfirmPopup(true);
    };

    const handleConfirmPurchase = async () => {
        setIsPurchasing(true);
        try {
            const result = await purchaseCookie(name, cookieType, cookiePrice);
            if (result && result.success && result.remainingPoints !== undefined) {
                console.log(`Successfully purchased ${name} for ${cookiePrice} points`);
                // Call the callback to update parent component
                if (onPurchaseSuccess) {
                    onPurchaseSuccess(result.remainingPoints);
                }
            } else {
                console.log(`Failed to purchase ${name}`);
                // You could add an error message here
            }
        } catch (error) {
            console.error('Error purchasing cookie:', error);
        } finally {
            setIsPurchasing(false);
            setShowConfirmPopup(false);
        }
    };

    const handleCancelPurchase = () => {
        setShowConfirmPopup(false);
    };

    const handleInsufficientPointsClose = () => {
        setInsufficientPoints(false);
    };

    const handleAlreadyOwnedClose = () => {
        setAlreadyOwned(false);
    };

    return (
        <>
            <div className="cookie-card">
                <div onClick={onClick}>
                    <img src={image} alt={name} className="cookie-image" />
                    <h3>{name}</h3>
                </div>
                <button className="buy-button" onClick={handleBuyClick}>
                    Buy this cookie
                </button>
            </div>

            {showConfirmPopup && (
                <div className="buy-confirm-overlay">
                    <div className="buy-confirm-popup">
                        <h3>Confirm Purchase</h3>
                        <p>Are you sure you want to purchase this cookie? This cookie costs {cookiePrice} points.</p>
                        <div className="confirm-buttons">
                            <button
                                className="confirm-yes"
                                onClick={handleConfirmPurchase}
                                disabled={isPurchasing}
                            >
                                {isPurchasing ? 'Purchasing...' : 'Yes'}
                            </button>
                            <button
                                className="confirm-no"
                                onClick={handleCancelPurchase}
                                disabled={isPurchasing}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {insufficientPoints && (
                <div className="buy-confirm-overlay">
                    <div className="buy-confirm-popup">
                        <h3>Insufficient Points</h3>
                        <p>You don't have enough points to purchase this cookie. This cookie costs {cookiePrice} points.</p>
                        <div className="confirm-buttons">
                            <button className="confirm-no" onClick={handleInsufficientPointsClose}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {alreadyOwned && (
                <div className="buy-confirm-overlay">
                    <div className="buy-confirm-popup">
                        <h3>Already Owned</h3>
                        <p>You have already purchased this cookie. Check your Profile page to view your collection!</p>
                        <div className="confirm-buttons">
                            <button className="confirm-no" onClick={handleAlreadyOwnedClose}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default CookieCard;