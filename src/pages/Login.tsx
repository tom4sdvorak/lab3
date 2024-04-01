import { IonButtons, IonButton, IonContent, IonHeader, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import { useState } from 'react';
import { loginUser } from '../firebaseCfg'
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [toastMessage, setToast] = useState("Login failed")
  const history = useHistory();

  async function tryLogin() {
    console.log("Loggin with: " + username + password)
    const res = await loginUser(username, password)
    if (res){
      setToast("Login succesful")
      setIsOpen(true)
      window.location.reload();
    }
    else{
      setToast("Login failed")
      setIsOpen(true)
    }
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonInput label='Email:' onIonInput={(e: any) => setUsername(e.target.value)}></IonInput>
        <IonInput type="password" label='Password:' onIonInput={(e: any) => setPassword(e.target.value)}></IonInput>
        <IonButton onClick={tryLogin}>Login</IonButton>
        <IonToast
          isOpen={isOpen}
          message={toastMessage}
          onDidDismiss={() => setIsOpen(false)}
          duration={5000}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default Login;
