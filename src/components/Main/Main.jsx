import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const [isListening, setIsListening] = useState(false);
    const [storedQuery, setStoredQuery] = useState(""); // New state to store the query

    const handleVoiceInput = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.start();
    };

    const handleSend = () => {
        if (input) {
            setStoredQuery(input); // Store the query for future regenerate actions
            onSent(); 
            setInput(""); 
        }
    };
    

    const handleRegenerateResponse = () => {
        if (recentPrompt) { // Check if there's a stored query
            setInput(recentPrompt); // Set the stored query as input
            onSent(recentPrompt); // Re-run the query
        }
    };

    const handleCopyAnswer = () => {
        navigator.clipboard.writeText(resultData)
            .then(() => {
                alert("Answer copied to clipboard!");
            })
            .catch(err => {
                console.error("Error copying to clipboard: ", err);
            });
    };

    const handleLikeDislike = (type) => {
        alert(type === "like" ? "You liked this response!" : "You disliked this response!");
    };

    return (
        <div className='main'>
            <div className='nav'>
                <div className="spec"><img src={assets.logo} alt="" /></div>
                <p>ThaparGenie</p>
                <img src={assets.tiet} alt="" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, </span></p>
                            <p>How can I help you today?</p>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>

                        {/* Grouped buttons inside a rounded box */}
                        <div className="result-actions small-box">
    <button onClick={handleRegenerateResponse} className="result-btn regenerate">
        <img src={assets.regenerate} alt="regenerate" />
    </button>
    <button onClick={handleCopyAnswer} className="result-btn copy">
        <img src={assets.copy} alt="copy" />
    </button>
    <button onClick={() => handleLikeDislike("like")} className="result-btn like">
        <img src={assets.like} alt="like" />
    </button>
    <button onClick={() => handleLikeDislike("dislike")} className="result-btn dislike">
        <img src={assets.dislike} alt="dislike" />
    </button>
</div>

            
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Enter your question here'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSend();
                            }}
                        />
                        <div>
                            <button onClick={handleVoiceInput} className="mic-button">
                                <img
                                    src={isListening ? assets.mic_active_icon : assets.mic_icon}
                                    alt="mic"
                                    title="Click to start voice input"
                                />
                            </button>
                            {input && (
                                <img
                                    onClick={handleSend}
                                    src={assets.send_icon}
                                    alt="send"
                                />
                            )}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        ThaparGenie may display some old information, so double-check with the helpline number if you have any queries related to fees structure.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
