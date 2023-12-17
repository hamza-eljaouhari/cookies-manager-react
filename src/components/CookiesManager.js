import React, { useState, useMemo } from 'react';
import axios from 'axios';
import './CookieConsent.css';

const CookieConsent = () => {
    const [visible, setVisible] = useState(true);
    const [choiceMade, setChoiceMade] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState({
        beamer: false,
        wisepop: false,
        contentSquare: false,
    });

    const handleSubmit = async (choice) => {
        // Send the user's choice to the server
        try {
            await axios.post('/api/consent', { consent: choice }, { withCredentials: true });
            setVisible(false); // Fade out the box after submission
        } catch (error) {
            console.error('Error submitting consent:', error);
        }
    };

    const handleOpenChoices = () => {
        setChoiceMade(true);
    };

    const handleToggleCookie = (cookie) => {
        setCookiePreferences((prevPreferences) => ({
            ...prevPreferences,
            [cookie]: !prevPreferences[cookie],
        }));
    };

    const handleSelectAll = () => {
        if(selectedAll){
            setCookiePreferences({
                beamer: false,
                wisepop: false,
                contentSquare: false,
            });
        } else {
            setCookiePreferences({
                beamer: true,
                wisepop: true,
                contentSquare: true,
            });
        }
    };


    const selectedAll = useMemo(() => {
        return Object.values(cookiePreferences).every(e => e === true);
    }, [cookiePreferences]);

    const handleReturn = () => {
        setChoiceMade(false);
    };

    if (!visible) return null;

    return (
        <div className={`cookie-consent-container ${!visible ? 'fade-out' : ''}`}>
            {!choiceMade ? (
                <div className="cookie-consent-content">
                    <h2>Blah blah blah Cookie!</h2>
                    <p>We're committed to providing you with a personalized experience that feels like it was crafted just for you! To do this, we use cookies that remember your preferences and tailor content to your interests. By consenting to cookies, you're allowing us to make every visit a delightful and customized journey for you. Simply click "Accept" and let us take care of the details, ensuring your time with us is as enjoyable and relevant as possible. Your privacy is paramount, and your trust is our cornerstone—thank you for allowing us to make your experience here exceptional.</p>
                    <div className="cookie-consent-buttons">
                        <button onClick={() => handleSubmit('accept')}>J'accepte tout</button>
                        <button onClick={() => handleSubmit('reject')}>Non merci</button>
                        <button onClick={handleOpenChoices}>Je choisis</button>
                    </div>
                </div>
            ) : (
                <div className="cookie-consent-choices">
                    <h2>Blah blah blah Cookie !</h2>
                    <p>Nous utilisons les outils suivants pour mesurer notre audience...</p>
                    <div className="select-all-section">
                        <span>Tout cocher</span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={selectedAll}
                                onChange={handleSelectAll}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    
                    <div className="cookie-options">
                        {Object.keys(cookiePreferences).map(cookie => (
                            <div className="cookie-option" key={cookie}>
                                <span>{cookie}</span>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={cookiePreferences[cookie]}
                                        onChange={() => handleToggleCookie(cookie)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="cookie-consent-buttons">
                        <button onClick={handleReturn}>Retour</button>
                        <button onClick={() => handleSubmit('custom')}>Je confirme</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CookieConsent;
