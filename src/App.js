import './App.css';
import './mobile.css';
import {Component} from "react";
import {jobs, games, gamesEN, jobsEN} from './projectCommon';

let isEnglishBuild = true;
let allGames = games;
let allJobs = jobs;
if(isEnglishBuild){
    allGames = gamesEN;
    allJobs = jobsEN;
}
const pokiGames = ['age'];


function isElementVisible(target) {
    let targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top + 50
        };
    let windowPosition = {
            top: window.pageYOffset + window.innerHeight
        };
    if (windowPosition.top > targetPosition.top) {
        return true;
    }
}


class App extends Component {

    constructor(props) {
        super(props);
        let showedGames = {
            'game__age': false,
            'game__farm': false,
            'game__rpg': false
        }
        if(!isEnglishBuild){
            showedGames = Object.assign(showedGames,
                {

                    'game__words': false,
                    'game__cross': false,
                    'game__brain': false,
                });
        }
        this.state = {
            showedGames: showedGames,
            showAboutGame: 'no',
            showMenu: false

        };
    }

    getBlock = (link) => {
        let scrollEl = document.querySelector('#' + link);
        scrollEl.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
        if(this.state.showMenu){
            this.setState({
                showMenu: false
            });
        }

    }

    getGameClasses = (id) => {
        let classes = 'ourGames__game ' + 'game__' + id;
        if(this.state.showedGames['game__' + id]) classes += ' ourGames__gameShowed';
        return classes;
    }

    componentDidMount() {
        let testGamesShow = () => {
            Object.keys(this.state.showedGames).forEach(key => {
                if(!this.state.showedGames[key] && isElementVisible(document.querySelector('.' + key))){
                    this.state.showedGames[key] = true;
                    this.setState({
                        showedGames: this.state.showedGames
                    });
                }
            })
        }
        testGamesShow();
        window.addEventListener('scroll', testGamesShow);
    }

    onGameMouseEnter = (id) => {
        this.setState({
            showAboutGame: id
        });
    }
    isPokiGame = (id) => {
        return pokiGames.includes(id);
    }
    onGameMouseOut = () => {
        this.setState({
            showAboutGame: 'no'
        });
    }
    onGameClick = (id) => {
        if(id === 'age'){
            window.open('https://poki.com/en/g/era-evolution', '_blank');
        }
    }
    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    render(){
        return (
            <div className="App">


                <header className={this.state.showMenu ? 'showMenu' : ''}>
                    <div className="header__content" >
                        <div className="hideContent" />
                        <div className="logo" />
                        <div className="links">
                            <div className="link" onClick={() => this.getBlock('ourGames')}>
                                {isEnglishBuild ? 'Our games' : 'Наши игры'}
                            </div>
                            <div className="link" onClick={() => this.getBlock('ourTeam')}>
                                {isEnglishBuild ? 'Team' : 'Команда'}
                            </div>
                            <div className="link" onClick={() => this.getBlock('contacts')}>
                                {isEnglishBuild ? 'Contacts' : 'Контакты'}
                            </div>
                            <div className="link" onClick={() => this.getBlock('jobs')}>
                                {isEnglishBuild ? 'Vacancies' : 'Вакансии'}
                            </div>
                        </div>
                        <div className="openMenu" onClick={this.toggleMenu}/>
                    </div>

                </header>


                <div id="firstBlock">
                    <div className="blur"/>
                </div>


                <div id="ourGames">
                    <div className="content">
                        <div className="content__header">
                            <span>{isEnglishBuild ? 'Our' : 'Наши'}</span>
                            <span className={'header__games'}>{isEnglishBuild ? 'games' : 'игры'}</span>
                        </div>
                        <div className="ourGames__games">
                            {allGames.map(game => {
                                return <div
                                    className={this.getGameClasses(game.id)}
                                    key={game.id}
                                    onMouseOver={() => this.onGameMouseEnter(game.id)}
                                    onMouseOut={() => this.onGameMouseOut()}
                                    onClick={() => this.onGameClick(game.id)}

                                >
                                    {
                                        this.state.showAboutGame === game.id ?
                                            <div className="ourGames__aboutGame">
                                                <div className="ourGames__name">{game.title}</div>
                                                <div className="ourGames__description">{game.description}</div>
                                            </div>
                                            : ''
                                    }
                                    {
                                        this.isPokiGame(game.id) ? <div className="ourGames__poki">Play on Poki!</div>
                                        : ''
                                    }

                                </div>
                            })}
                        </div>
                    </div>

                </div>


                <div id="ourTeam">
                    <div className="content">
                        <div className="ourTeam__block">
                            <div className="ourTeam__header">
                                {isEnglishBuild ? 'Our team' : 'Наша команда'}
                            </div>
                            <div className="ourTeam__flex">
                                <div className="ourTeam__firstFlex">
                                    <div className={'ourTeam__firstBlock'}>
                                        {
                                            isEnglishBuild ?
                                                'Welcome to our game development studio, where creativity and innovation combine to create incredible worlds and exciting game projects.'
                                                :
                                                'Добро пожаловать в нашу студию разработки игр, где творчество и инновации соединяются, чтобы создавать невероятные миры и захватывающие игровые проекты.'
                                        }
                                    </div>
                                    <div>
                                        {
                                            isEnglishBuild ?
                                                'We sincerely believe that games can be more than just entertainment. They are able to develop, educate and inspire!'
                                                :
                                                'Мы искренне верим в то, что игры могут быть более чем просто развлечением. Они способны развивать, образовывать и вдохновлять!'
                                        }

                                    </div>
                                </div>
                                <div className="ourTeam__cow" />
                            </div>
                            <div>
                                {
                                    isEnglishBuild ?
                                        'We care about the quality of each game and attempt to create projects that will be remembered for a long time!'
                                        :
                                        'Мы заботимся о качестве каждой игры и стремимся создавать проекты, которые запомнятся надолго!'
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <div id="jobs">
                    <div className="content">
                        <div className="content__header">
                            {
                                isEnglishBuild ? 'Vacancies' : 'Вакансии'
                            }
                        </div>
                        <div className="content__info">
                            {
                                isEnglishBuild ?
                                    'If you want to join us and create interesting games together, we have suitable vacancies!'
                                    :
                                    'Если ты хочешь присоединиться к нам и вместе создавать интересные игры, у нас есть подходящие вакансии!'
                            }

                        </div>
                        {
                            allJobs.map((job, index) => {
                                return <div className={'job'} key={job.title}>
                                        <div className="job__flex">
                                            <div className="job__firstBlock">
                                                <div className="job__title">{job.title}</div>
                                                <a
                                                    className="job__respond"
                                                    href={job.link}
                                                    target="_blank"
                                                >
                                                    {isEnglishBuild ? 'Contact' : 'Откликнуться'}
                                                </a>
                                            </div>
                                            <ul className="job__secondBlock">
                                                {job.requirements.map((req, index) => {
                                                    return  <li key={'req' + index}>{req}</li>
                                                })}
                                            </ul>
                                            <a
                                                className="job__respond mobileButton"
                                                href={job.link}
                                                target="_blank"
                                            >
                                                {isEnglishBuild ? 'Contact' : 'Откликнуться'}
                                            </a>
                                        </div>
                                </div>
                            })
                        }
                    </div>
                </div>

                <div id="contacts">
                    <div className="blur" />
                    <div className="content">
                        <div className="contacts__header">
                            {isEnglishBuild ? 'Contacts' : 'Контакты'}
                        </div>
                        <div className="contacts__flex">
                            <div className="contacts__info">
                                <div className="contacts__headerInfo contacts__writeUs">
                                    {isEnglishBuild ? 'Write us' : 'Напишите нам'}
                                </div>
                                <div className="contacts__sendInfo">
                                    {isEnglishBuild ?
                                        'If you have any questions or suggestions, please email us!'
                                        :
                                        'Если у вас есть какие-либо вопросы или предложеничя, напишите нам на почту!'}
                                    </div>
                                <div className="contacts__email">
                                    <a
                                        className="icon icon__mail"
                                        href='mailto:support@wit.games' />
                                    <a
                                        href='mailto:support@wit.games'>
                                        support@wit.games
                                    </a>
                                </div>
                            </div>
                            {
                                isEnglishBuild ? '' :

                                    <div>
                                        <div className="contacts__headerInfo">Социальные сети</div>
                                        <div className="social__network">
                                            <a href={'https://www.instagram.com/wit__games/'} target="_blank" className="icon icon__inst" />
                                            <a href={'https://vk.com/witgames'} target="_blank"className="icon icon__vk" />
                                            <a href={'https://t.me/jtaugner'} target="_blank"className="icon icon__tg" />
                                        </div>
                                    </div>
                            }

                        </div>

                    </div>
                    <div className="law">
                        &#169; Wit Games, 2023. {isEnglishBuild ?
                            'All rights reserved.'
                            :
                            'Все права защищены.'
                        }
                        </div>

                </div>
            </div>
        );
    }

}

export default App;
