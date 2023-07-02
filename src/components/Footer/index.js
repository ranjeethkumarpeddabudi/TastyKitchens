import {
  FaPinterestSquare,
  FaTwitter,
  FaInstagram,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dyumtyemc/image/upload/v1687640669/Group_7420_1_oriwo2.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-title">Tasty Kitchen</h1>
      </div>
      <p className="contact-info">
        The only thing we are serious about is food. Contact us on
      </p>
      <ul className="footer-icons-container">
        <li>
          <FaPinterestSquare color="#ffffff" testid="pintrest-social-icon" />
        </li>
        <li>
          <FaInstagram color="#ffffff" testid="instagram-social-icon" />
        </li>
        <li>
          <FaTwitter color="#ffffff" testid="twitter-social-icon" />
        </li>
        <li>
          <FaFacebookSquare color="#ffffff" testid="facebook-social-icon" />
        </li>
      </ul>
    </div>
  )
}
