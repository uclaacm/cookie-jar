import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "../../styles/Stage3.scss";

const Stage3: React.FC = () => {

    return (
        <div className="stage3-container">
            <h1>Stage 3</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>

            <Link to="/stage2" className="back-button">
                <ArrowLeft />
            </Link>
            <Link to="/stage4" className="next-button">
                <ArrowRight />
            </Link>

        </div>
    );
};

export default Stage3;