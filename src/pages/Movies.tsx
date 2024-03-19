import { IonButtons, IonContent, IonHeader, IonLabel, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Movies.css';
import { useApi } from '../hooks/useApi';
import { useState } from 'react';

const Movies: React.FC = () => {
  const { getMovies } = useApi();
  const [movies, setMovies] = useState([]);

  const loadMovies = async () => {
    const result = await getMovies();
    setMovies(result);
  }
  loadMovies();
  let i = 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Movies</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Movies</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {movies.map((element) => (
            <IonItem key={i++}>
                <IonLabel>{element.value}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Movies;
