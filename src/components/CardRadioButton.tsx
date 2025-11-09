import React, { MouseEventHandler } from 'react';
import "../styles/CardRadioButton.scss";

interface CardRadioButtonProps {
    groupName: string;
    value: string;
    gap: string;
    onClick: MouseEventHandler<HTMLInputElement>;
}

const CardRadioButton: React.FC<CardRadioButtonProps> = ({ groupName, value, onClick, gap }) => {
    return (
        <div style={{ display: "inline-block", paddingRight: gap }}>
            <label className="card-radio-button">
                <input type="radio" name={groupName} value={value} onClick={onClick} />
                {value}
            </label>
        </div>
    );
};

export default CardRadioButton;