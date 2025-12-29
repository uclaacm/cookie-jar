import React from 'react';
import '../styles/Cookie.scss';

interface PurchasedCookie {
    _id: string;
    cookieName: string;
    cookieType: string;
    price: number;
    purchasedAt: string;
}

interface PurchasedCookieCardProps {
    cookie: PurchasedCookie;
}

const PurchasedCookieCard: React.FC<PurchasedCookieCardProps> = ({ cookie }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="purchased-cookie-card">
            <h4>{cookie.cookieName}</h4>
            <p className="cookie-type">{cookie.cookieType}</p>
            <p className="cookie-price">{cookie.price} points</p>
            <p className="purchase-date">Purchased: {formatDate(cookie.purchasedAt)}</p>
        </div>
    );
};

export default PurchasedCookieCard;
