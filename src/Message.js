import Plant from "./assets/images/Plant.png";
import Birthday from "./assets/images/Birthday.png";
import Confetti from "./assets/images/Confetti.png";

// Users
import Faizan from "./assets/images/users/faizan.png";

const Message = ({ data, requestClose }) => {
  return (
    <div onClick={requestClose} className="message">
      <img src={Birthday} className="message__birthday" alt="plant" />
      <img src={Plant} className="message__plant" alt="plant" />
      <div className="message__wrapper">
        <div className="message__inner-wrapper">
          <div className="message__main">
            <p className="message__data">Hi Kamran,</p>
            {data.meme ? (
              <img className="message__meme" src={data.meme} alt="data" />
            ) : (
              data.message
            )}
          </div>
        </div>
        <img src={Confetti} className="message__confetti" alt="plant" />
        <img
          src={data.image || Faizan}
          className="message__user-img"
          alt="plant"
        />
      </div>
    </div>
  );
};

export default Message;
