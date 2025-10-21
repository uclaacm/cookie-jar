import '../styles/Footer.scss';
import WhiteHeart from '../assets/whiteHeart.svg';
import TeachLALogo from '../assets/teach-la-logo.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    made with{' '}
                    <img
                        src={WhiteHeart}
                        alt="white heart"
                        className="footer-icon"
                    />{' '}
                    by{' '}
                    <a
                        href="https://teachla.uclaacm.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        <img
                            src={TeachLALogo}
                            alt="Teach LA logo"
                            className="footer-logo"
                        />
                        acm.teachLA
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
