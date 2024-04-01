import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './firebaseCfg'
import Menu from './components/Menu';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  
  const [ userLogged, setLogged ] = useState(false);

  useEffect(() => {
    getCurrentUser().then(user => {
      if(user){
        console.log("User logged");
        setLogged(true);
      }
      console.log("User not logged");
    })
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Route exact path="/" render={(props) => {return userLogged ? <Home/> : <Login />;}} />
            <Route exact path="/home" render={(props) => {return userLogged ? <Home/> : <Login />;}} />
            <Route exact path="/login" render={(props) => {return userLogged ? <Home/> : <Login />;}} />
            <Route exact path="/register" render={(props) => {return userLogged ? <Home/> : <Register />;}} />
            <Route exact path="/schedule" render={(props) => {return userLogged ? <Schedule/> : <Login />;}} />
            <Route exact path="/movies" render={(props) => {return userLogged ? <Movies/> : <Login />;}} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
