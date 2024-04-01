import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { signUserOut } from '../firebaseCfg'
import { useLocation, useHistory } from 'react-router-dom';
import { calendarNumberOutline, calendarNumberSharp, videocamOutline, videocamSharp, homeOutline, homeSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Login',
    url: '/login',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Register',
    url: '/register',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Today',
    url: '/schedule',
    iosIcon: calendarNumberOutline,
    mdIcon: calendarNumberSharp
  },
  {
    title: 'Movies',
    url: '/movies',
    iosIcon: videocamOutline,
    mdIcon: videocamSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  async function signOut(){
    await signUserOut();
    window.location.reload();
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Finnkino App</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonItem>
            <IonButton onClick={signOut}>Sign out</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
