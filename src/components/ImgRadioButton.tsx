import React, { MouseEventHandler } from 'react';
import "../styles/ImgRadioButton.scss";

interface ImgRadioButtonProps {
    groupName: string;
    label: string;
    value: number;
    img: string;
    onClick: MouseEventHandler<HTMLInputElement>;
}

const ImgRadioButton: React.FC<ImgRadioButtonProps> = ({ groupName, label, value, img, onClick }) => {
    return (
        <div style={{ display: "inline-block", margin: "16px" }}>
            <label className="img-radio-button">
                <input type="radio" name={groupName} value={value} onClick={onClick} />
                <img src={img} alt={label} width="120" height="120" />
                <div>{label}</div>
            </label>
        </div>
    );
};

export default ImgRadioButton;