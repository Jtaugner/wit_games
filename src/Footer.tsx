import React from "react";
import { useNavigate } from "react-router-dom";
import { isEnglishBuild } from "./App";

type HeaderProps = {
  showMenu?: boolean;
  children?: React.ReactNode;
};

export default function Footer({ showMenu = false, children }: HeaderProps) {
  const navigate = useNavigate();
  const handlePolicyClick = () => {
       navigate("/privacy");
     };
  return (
    <footer id={'contacts'}>
        <div className="blur" />
        <div className="content">
          <div className="contacts__header">{isEnglishBuild ? "Contacts" : "Контакты"}</div>
          <div className="contacts__flex">
            <div className="contacts__info">
              <div className="contacts__headerInfo contacts__writeUs">
                {isEnglishBuild ? "Write us" : "Напишите нам"}
              </div>
              <div className="contacts__sendInfo">
                {isEnglishBuild
                  ? "If you have any questions or suggestions, please email us!"
                  : "Если у вас есть какие-либо вопросы или предложеничя, напишите нам на почту!"}
              </div>
              <div className="contacts__email">
                <a className="icon icon__mail" href="mailto:support@wit.games" />
                <a href="mailto:support@wit.games">support@wit.games</a>
              </div>
            </div>

            {!isEnglishBuild && (
              <div>
                <div className="contacts__headerInfo">Социальные сети</div>
                <div className="social__network">
                  <a
                    href={"https://www.instagram.com/wit__games/"}
                    target="_blank"
                    rel="noreferrer"
                    className="icon icon__inst"
                  />
                  <a href={"https://vk.com/witgames"} target="_blank" rel="noreferrer" className="icon icon__vk" />
                  <a href={"https://t.me/jtaugner"} target="_blank" rel="noreferrer" className="icon icon__tg" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="law">
          &#169; Wit Games, 2025. {isEnglishBuild ? "All rights reserved." : "Все права защищены."}
        </div>
        <div className="privacy-link" onClick={handlePolicyClick}>
        {isEnglishBuild ? "Privacy Policy" : "Политика конфиденциальности"}
        </div>
    </footer>
  );
}
