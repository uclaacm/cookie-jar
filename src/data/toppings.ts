import chocolateChipsImg from "../assets/chocolate-chips.svg";
import sprinklesImg from "../assets/sprinkles.svg";
import frostingImg from "../assets/frosting.svg";
import mmsImg from "../assets/mms.png";
import caramelImg from "../assets/caramel.svg";
import plainCookieImg from  "../assets/plain-cookie.svg";
import chocolateChipCookieImg from "../assets/chocolate-chip-cookie.svg";
import sprinklesCookieImg from "../assets/sprinkles-cookie.svg";

// List of all cookie toppings corresponding to Stage 3
export const TOPPINGS = [
    { name: "plain", img: null, cookieImg: plainCookieImg, color: "#ffc107" },
    { name: "chocolate chips", img: chocolateChipsImg, cookieImg: chocolateChipCookieImg, color: "#bda88e" },
    { name: "sprinkles", img: sprinklesImg, cookieImg: sprinklesCookieImg, color: "#ffc8c8" },
    { name: "frosting", img: frostingImg, cookieImg: plainCookieImg, color: "#ffbef2" },
    { name: "m&m's candy", img: mmsImg, cookieImg: plainCookieImg, color: "#c0c6ff" },
    { name: "caramel drizzle", img: caramelImg, cookieImg: plainCookieImg, color: "#e2a187" }
] as const;