import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButtons, IonContent, IonHeader, IonLabel, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Schedule.css';
import { useApi } from '../hooks/useApi';

const Schedule: React.FC = () => {
  const cinemaList = [
    {
      id: 1045,
      name: "ITIS"
    },
    {
      id: 1031,
      name: "KINOPALATSI"
    },
    {
      id: 1032,
      name: "MAXIM"
    },{
      id: 1033,
      name: "TENNISPALATSI"
    }
  ]

  const { getSchedule } = useApi();
  const [movies, setMovies] = useState([{}]);
  const [cinema, setCinema] = useState("1002")

  useEffect(() => {
    const loadMovies = async () => {
      const result = await getSchedule(cinema);
      setMovies(result);
    }
    loadMovies();
  }, [cinema])
  let i = 0;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Today</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Today</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonSelect label ="Select Cinema" value={cinema} onIonChange={(e) => setCinema(e.detail.value!)}>
            <IonSelectOption value={cinemaList[0].id}>{cinemaList[0].name}</IonSelectOption>
            <IonSelectOption value={cinemaList[1].id}>{cinemaList[1].name}</IonSelectOption>
            <IonSelectOption value={cinemaList[2].id}>{cinemaList[2].name}</IonSelectOption>
            <IonSelectOption value={cinemaList[3].id}>{cinemaList[3].name}</IonSelectOption>
          </IonSelect>
        </IonItem>
            {movies.map((element) => (
              <IonCard key={i++}>
                <IonCardHeader>
                    <IonCardTitle>{element.title}</IonCardTitle>
                    <IonCardSubtitle>{element.start}</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            ))}
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
