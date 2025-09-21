import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [firstLineText, setFirstLineText] = useState('');
  const [secondLineText, setSecondLineText] = useState('');
  const navigate = useNavigate();

  const fullFirstLine = 'Project Student 2025';
  const fullSecondLine = 'Supervised by Engr (Mrs). G. O. Fadiran';

  // Optional: play typewriter sound
  const playTypeSound = () => {
    // const audio = new Audio('/type.mp3');
    // audio.volume = 0.2;
    // audio.play();
  };

  const typeFirstLine = (index = 0) => {
    if (index < fullFirstLine.length) {
      setFirstLineText((prev) => prev + fullFirstLine[index]);
      playTypeSound();
      setTimeout(() => typeFirstLine(index + 1), 70);
    } else {
      setTimeout(() => typeSecondLine(0), 500); // Delay before second line
    }
  };

  const typeSecondLine = (index = 0) => {
    if (index < fullSecondLine.length) {
      setSecondLineText((prev) => prev + fullSecondLine[index]);
      playTypeSound();
      setTimeout(() => typeSecondLine(index + 1), 70);
    } else {
      setTimeout(() => {
        // Reset both lines before restarting
        setFirstLineText('');
        setSecondLineText('');
        typeFirstLine(0);
      }, 3000);
    }
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      typeFirstLine(0); // Start typing animation
    }, 2000); // Loading spinner duration

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleProceed = () => {
    navigate('/chatbot');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light font-poppins">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3 text-primary">Loading, please wait...</h4>
        </div>
      ) : (
        <div className="text-center bg-white p-5 rounded-4 shadow-lg animate__animated animate__fadeIn">
          <i className="bi bi-robot display-1 text-primary"></i>
          <h1 className="mt-4 fw-bold text-dark">Computer Engineering ChatBot</h1>
          <h3 className="text-secondary">The Polytechnic, Ibadan</h3>

          <div className="mt-4 fs-5 text-muted">
            <p className="mb-1">{firstLineText}</p>
            <p>{secondLineText}</p>
          </div>

          <button
            className="btn btn-primary btn-lg mt-4 d-flex align-items-center mx-auto"
            onClick={handleProceed}
          >
            <i className="bi bi-arrow-right-circle me-2"></i> Proceed to ChatBot
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
