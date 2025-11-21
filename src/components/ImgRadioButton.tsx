import React, { MouseEventHandler } from 'react';
import "../styles/ImgRadioButton.scss";

interface ImgRadioButtonProps {
    key: number;
    groupName: string;
    value: string;
    img: string;
    onClick: MouseEventHandler<HTMLInputElement>;
}

const ImgRadioButton: React.FC<ImgRadioButtonProps> = ({ key, groupName, value, img, onClick }) => {
    return (
        <div key={key} style={{ display: "inline-block", margin: "16px" }}>
            <label className="img-radio-button">
                <input type="radio" name={groupName} value={value} onClick={onClick} />
                <img src={img} alt={value} width="120" height="120" />
                <div>{value}</div>
            </label>
        </div>
    );
};

export default ImgRadioButton;