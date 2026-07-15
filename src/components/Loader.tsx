import { useEffect, useState } from 'react';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes speeder {
          0% { transform: translate(2px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -3px) rotate(-1deg); }
          20% { transform: translate(-2px, 0px) rotate(1deg); }
          30% { transform: translate(1px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 3px) rotate(-1deg); }
          60% { transform: translate(-1px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-2px, -1px) rotate(1deg); }
          90% { transform: translate(2px, 1px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }

        @keyframes fazer1 {
          0% { left: 0; opacity: 1; }
          100% { left: -80px; opacity: 0; }
        }

        @keyframes fazer2 {
          0% { left: 0; opacity: 1; }
          100% { left: -100px; opacity: 0; }
        }

        @keyframes fazer3 {
          0% { left: 0; opacity: 1; }
          100% { left: -50px; opacity: 0; }
        }

        @keyframes fazer4 {
          0% { left: 0; opacity: 1; }
          100% { left: -150px; opacity: 0; }
        }

        @keyframes lf {
          0% { left: 200%; opacity: 1; }
          100% { left: -200%; opacity: 0; }
        }

        @keyframes lf2 {
          0% { left: 200%; opacity: 1; }
          100% { left: -200%; opacity: 0; }
        }

        @keyframes lf3 {
          0% { left: 200%; opacity: 1; }
          100% { left: -200%; opacity: 0; }
        }

        @keyframes lf4 {
          0% { left: 200%; opacity: 1; }
          100% { left: -200%; opacity: 0; }
        }

        .loader-container {
          position: fixed;
          inset: 0;
          background: #070612;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: opacity 0.6s ease;
        }

        .loader-container.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 60px;
          animation: speeder 0.4s linear infinite;
        }

        .loader > span {
          height: 5px;
          width: 35px;
          background: #7C3AED;
          position: absolute;
          top: -19px;
          left: 60px;
          border-radius: 2px 10px 1px 0;
        }

        .loader > span:nth-child(1) {
          animation: fazer1 0.2s linear infinite;
        }

        .loader > span:nth-child(2) {
          animation: fazer2 0.4s linear infinite;
        }

        .loader > span:nth-child(3) {
          animation: fazer3 0.4s linear infinite;
          animation-delay: -1s;
        }

        .loader > span:nth-child(4) {
          animation: fazer4 1s linear infinite;
          animation-delay: -1s;
        }

        .base {
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 100px solid #7C3AED;
          border-bottom: 6px solid transparent;
        }

        .base span {
          position: absolute;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #7C3AED;
          right: -110px;
          top: -16px;
        }

        .base span::before {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-right: 30px solid #7C3AED;
          border-bottom: 4px solid transparent;
          right: -30px;
        }

        .base span::after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-right: 20px solid #7C3AED;
          border-bottom: 4px solid transparent;
          top: -10px;
          right: -55px;
          transform: rotate(-45deg);
        }

        .face {
          position: absolute;
          width: 12px;
          height: 20px;
          background: #7C3AED;
          border-radius: 20px 20px 0 0;
          transform: rotate(-40deg);
          right: -125px;
          top: -15px;
        }

        .face::after {
          content: "";
          position: absolute;
          width: 12px;
          height: 20px;
          background: #7C3AED;
          border-radius: 0 0 20px 20px;
          top: 20px;
          transform: rotate(40deg);
        }

        .longfazers {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .longfazers span {
          position: absolute;
          height: 2px;
          width: 20%;
          background: #7C3AED;
          opacity: 0;
        }

        .longfazers span:nth-child(1) {
          top: 20%;
          animation: lf 0.6s linear infinite;
          animation-delay: -5s;
        }

        .longfazers span:nth-child(2) {
          top: 40%;
          animation: lf2 0.8s linear infinite;
          animation-delay: -1s;
        }

        .longfazers span:nth-child(3) {
          top: 60%;
          animation: lf3 0.6s linear infinite;
        }

        .longfazers span:nth-child(4) {
          top: 80%;
          animation: lf4 0.5s linear infinite;
          animation-delay: -3s;
        }
      `}</style>

      <div className={`loader-container ${isFadingOut ? 'fade-out' : ''}`}>
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div className="base">
            <span></span>
            <div className="face"></div>
          </div>
        </div>
        <div className="longfazers">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
}
