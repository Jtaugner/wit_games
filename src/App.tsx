import "./App.css";
import "./mobile.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { jobs, games, gamesEN, jobsEN } from "./projectCommon";
import Header from "./Header";
import Footer from "./Footer";

export const isEnglishBuild = true as const;

type Game = { id: string; title: string; description: string };
type Job = { title: string; link: string; requirements: string[] };

const allGames: Game[] = isEnglishBuild ? (gamesEN as Game[]) : (games as Game[]);
const allJobs: Job[] = isEnglishBuild ? (jobsEN as Job[]) : (jobs as Job[]);
const pokiGames: string[] = [];

function isElementVisible(target: Element | null): boolean {
  if (!target) return false;
  const targetPositionTop = window.pageYOffset + target.getBoundingClientRect().top + 50;
  const windowBottom = window.pageYOffset + window.innerHeight;
  return windowBottom > targetPositionTop;
}

export default function App() {
  const initialShowed = useMemo(() => {
    // те же ключи, что и в исходнике
    const base: Record<string, boolean> = {
      // "game__age": false,
      "game__farm": false,
      "game__rpg": false,
    };
    if (!isEnglishBuild) {
      Object.assign(base, {
        "game__words": false,
        "game__cross": false,
        "game__brain": false,
      });
    }
    return base;
  }, []);

  const [showedGames, setShowedGames] = useState<Record<string, boolean>>(initialShowed);
  const [showAboutGame, setShowAboutGame] = useState<string>("no");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const getBlock = useCallback(
    (link: string) => {
      const el = document.querySelector<HTMLElement>("#" + link);
      el?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      if (showMenu) setShowMenu(false);
    },
    [showMenu]
  );

  const getGameClasses = useCallback(
    (id: string) => {
      let classes = "ourGames__game " + "game__" + id;
      if (showedGames["game__" + id]) classes += " ourGames__gameShowed";
      return classes;
    },
    [showedGames]
  );

  useEffect(() => {
    const testGamesShow = () => {
      // не мутируем стейт напрямую
      let changed = false;
      const next: Record<string, boolean> = { ...showedGames };

      Object.keys(next).forEach((key) => {
        if (!next[key] && isElementVisible(document.querySelector("." + key))) {
          next[key] = true;
          changed = true;
        }
      });

      if (changed) setShowedGames(next);
    };

    // первичная проверка + подписка
    testGamesShow();
    window.addEventListener("scroll", testGamesShow, { passive: true });
    return () => window.removeEventListener("scroll", testGamesShow);
  }, [showedGames]);

  const onGameMouseEnter = (id: string) => setShowAboutGame(id);
  const onGameMouseOut = () => setShowAboutGame("no");
  const isPokiGame = (id: string) => pokiGames.includes(id);

  const onGameClick = (id: string) => {
    if (id === "age") {
      window.open("https://poki.com/en/g/era-evolution", "_blank");
    }
  };

  const toggleMenu = () => setShowMenu((v) => !v);

  return (
    <div className="App">
      {/* Заголовок и меню */}
      <Header showMenu={showMenu}>
        <div className="links" >
          <div className="link" onClick={() => getBlock("ourGames")}>
            {isEnglishBuild ? "Our games" : "Наши игры"}
          </div>
          <div className="link" onClick={() => getBlock("ourTeam")}>
            {isEnglishBuild ? "Team" : "Команда"}
          </div>
          <div className="link" onClick={() => getBlock("contacts")}>
            {isEnglishBuild ? "Contacts" : "Контакты"}
          </div>
          <div className="link" onClick={() => getBlock("jobs")}>
            {isEnglishBuild ? "Vacancies" : "Вакансии"}
          </div>
        </div>
        <div className="openMenu" onClick={toggleMenu} />
      </Header>

      {/* Первый блок */}
      <div id="firstBlock">
        <div className="blur" />
      </div>

      {/* Наши игры */}
      <div id="ourGames">
        <div className="content">
          <div className="content__header">
            <span>{isEnglishBuild ? "Our" : "Наши"}</span>
            <span className={"header__games"}>{isEnglishBuild ? "games" : "игры"}</span>
          </div>
          <div className="ourGames__games">
            {allGames.map((game) => (
              <div
                className={getGameClasses(game.id)}
                key={game.id}
                onMouseOver={() => onGameMouseEnter(game.id)}
                onMouseOut={onGameMouseOut}
                onClick={() => onGameClick(game.id)}
              >
                {showAboutGame === game.id ? (
                  <div className="ourGames__aboutGame">
                    <div className="ourGames__name">{game.title}</div>
                    <div className="ourGames__description">{game.description}</div>
                  </div>
                ) : null}

                {isPokiGame(game.id) ? <div className="ourGames__poki">Play on Poki!</div> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Команда */}
      <div id="ourTeam">
        <div className="content">
          <div className="ourTeam__block">
            <div className="ourTeam__header">{isEnglishBuild ? "Our team" : "Наша команда"}</div>
            <div className="ourTeam__flex">
              <div className="ourTeam__firstFlex">
                <div className={"ourTeam__firstBlock"}>
                  {isEnglishBuild
                    ? "Welcome to our game development studio, where creativity and innovation combine to create incredible worlds and exciting game projects."
                    : "Добро пожаловать в нашу студию разработки игр, где творчество и инновации соединяются, чтобы создавать невероятные миры и захватывающие игровые проекты."}
                </div>
                <div>
                  {isEnglishBuild
                    ? "We sincerely believe that games can be more than just entertainment. They are able to develop, educate and inspire!"
                    : "Мы искренне верим в то, что игры могут быть более чем просто развлечением. Они способны развивать, образовывать и вдохновлять!"}
                </div>
              </div>
              <div className="ourTeam__cow" />
            </div>
            <div>
              {isEnglishBuild
                ? "We care about the quality of each game and attempt to create projects that will be remembered for a long time!"
                : "Мы заботимся о качестве каждой игры и стремимся создавать проекты, которые запомнятся надолго!"}
            </div>
          </div>
        </div>
      </div>

      {/* Вакансии */}
      <div id="jobs">
        <div className="content">
          <div className="content__header">{isEnglishBuild ? "Vacancies" : "Вакансии"}</div>
          <div className="content__info">
            {isEnglishBuild
              ? "If you want to join us and create interesting games together, we have suitable vacancies!"
              : "Если ты хочешь присоединиться к нам и вместе создавать интересные игры, у нас есть подходящие вакансии!"}
          </div>

          {allJobs.map((job) => (
            <div className={"job"} key={job.title}>
              <div className="job__flex">
                <div className="job__firstBlock">
                  <div className="job__title">{job.title}</div>
                  <a className="job__respond" href={job.link} target="_blank" rel="noreferrer">
                    {isEnglishBuild ? "Contact" : "Откликнуться"}
                  </a>
                </div>
                <ul className="job__secondBlock">
                  {job.requirements.map((req, i) => (
                    <li key={"req" + i}>{req}</li>
                  ))}
                </ul>
                <a className="job__respond mobileButton" href={job.link} target="_blank" rel="noreferrer">
                  {isEnglishBuild ? "Contact" : "Откликнуться"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Контакты */}
      <Footer showMenu={showMenu} />
    </div>
  );
}
