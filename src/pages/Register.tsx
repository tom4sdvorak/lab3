import { IonButtons, IonButton, IonContent, IonHeader, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import { useState } from 'react';
import { registerUser } from '../firebaseCfg'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [toastMessage, setToast] = useState("Passwords do not match!")

  async function regUser() {
    if(password !== confirm){
      setToast("Passwords do not match!")
      setIsOpen(true)
      return false
    }
    if (username.trim() === '' || password.trim() === ''){
      setToast("Email and password are required")
      setIsOpen(true)
      return false
    }
    if (password.length < 6){
      setToast("Password must be longer than 6 characters")
      setIsOpen(true)
      return false
    }
    const res = await registerUser(username, password)
    if(res){
      setToast("You have been registered!")
      setIsOpen(true)
    }
    else{
      setToast("Account already exists!")
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
        <IonInput label= "Password:" type="password" onIonInput={(e: any) => setPassword(e.target.value)}></IonInput>
        <IonInput label= "Confirm Password:" type="password" onIonInput={(e: any) => setConfirm(e.target.value)}></IonInput>
        <IonButton onClick={regUser}>Register</IonButton>
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

export default Register;