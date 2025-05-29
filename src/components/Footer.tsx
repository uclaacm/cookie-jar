import '../styles/Footer.scss';
import WhiteHeart from '../assets/whiteHeart.svg'
import TeachLALogo from '../assets/teach-la-logo.svg'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>made with <img src={WhiteHeart} alt="white heart" style={{verticalAlign: 'middle', height: '1em'}}/> by <img src={TeachLALogo} alt="teachLA logo" style={{verticalAlign: 'middle', height: '1.5em'}} /><a href="https://teachla.uclaacm.com">acm.teachLA</a></p>
            </div>
        </footer>
    );
};

export default Footer;