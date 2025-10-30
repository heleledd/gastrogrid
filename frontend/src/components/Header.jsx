import '../styles/Header.css';
import gastrogridLogo from '../images/gastrogridLogo.svg';

export default function Header() {
    return (
        <header>
            <img src={gastrogridLogo} alt="gastrogrid logo" className="headerImage" />
            <span className="header-title">gastrogrid</span>
        </header>
    )
}