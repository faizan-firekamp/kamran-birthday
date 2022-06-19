import { useEffect, useMemo, useRef, useState } from "react";
import "./App.scss";
import map from "./assets/images/map.png";
import pin from "./assets/images/pin.png";
import { Fireworks } from "fireworks-js";
import useSound from "use-sound";
import birthdaySound from "./assets/sound/birthday.mp3";
import announcement from "./assets/sound/announcement.mp3";
import modalSound from "./assets/sound/modal-sound.mp3";
import HyperModal from "react-hyper-modal";
import Message from "./Message";
import { data } from "./data";

const positions = [
  { left: 120, top: 240 },
  { left: 315, top: 250 },
  { left: 290, top: 150 },
  { left: 400, top: 100 },
  { left: 505, top: 200 },
  { left: 630, top: 275 },
  { left: 860, top: 170 },
  { left: 980, top: 215 },
  { left: 1130, top: 140 },
  { left: 1220, top: 210 },
  { left: 1360, top: 260 },
  { left: 1520, top: 200 },
];

function App() {
  const pinRef = useRef(null);
  const [index, setIndex] = useState(0);
  const fireworkRef = useRef(null);
  const [play] = useSound(birthdaySound);
  const [playAnnouncement] = useSound(announcement);
  const [playModalSound] = useSound(modalSound);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentData = useMemo(() => {
    if (index === 0) return {};
    return data[index - 1];
  }, [index]);

  const currentPosition = useMemo(() => {
    if (index <= 11) {
      return positions[index];
    }
  }, [index]);

  useEffect(() => {
    if (index === 11) {
      const fireworks = new Fireworks(fireworkRef.current);
      fireworks.start();
      play();
      fireworkRef.current.style.zIndex = 2;
    }
  }, [index, play]);

  useEffect(() => {
    if (index > 0 && index < 11) {
      playAnnouncement();
      setTimeout(() => {
        setIsModalOpen(true);
        playModalSound();
      }, [1000]);
    }
  }, [index, playAnnouncement, playModalSound]);

  return (
    <div className="App">
      <div style={{ backgroundImage: `url(${map})` }} className="map-overlay" />
      <div onClick={console.log} className="wrapper">
        <img className="map" alt="" src={map} />
        <img
          style={{
            top: currentPosition.top || 0,
            left: currentPosition.left || 0,
          }}
          ref={pinRef}
          alt=""
          className="pin"
          src={pin}
        />
      </div>
      <div className="button__wrapper">
        {index < 11 ? (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="button second"
          >
            Move Ahead
          </button>
        ) : (
          <h1 className="birthday-text">Happy birthday</h1>
        )}
      </div>
      <div className="firework" ref={fireworkRef} />
      <HyperModal
        isOpen={isModalOpen}
        renderCloseIcon={() => null}
        requestClose={() => setIsModalOpen(false)}
      >
        <Message data={currentData} />
      </HyperModal>
    </div>
  );
}

export default App;
