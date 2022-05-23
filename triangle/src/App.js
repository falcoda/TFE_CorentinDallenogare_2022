
import './css/App.css';
import Color from './Color';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './component/Navbar';
import {BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom'; 
import Mode from './Mode';
import Settings from './Settings';
import useToken from './component/useToken'
import JoyrideTour from './helper/JoyrideTour';
import Login from './component/Login';
import Profile from './component/Profile';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useNavigate } from "react-router-dom";
// import guidedTourPageHome from './demo/DemoHome';
// import guidedTourPageModes from './demo/DemoModes';

import {useState}from 'react';

function App() {

    


  const { token, removeToken, setToken } = useToken();
  const [auth, setAuth] = useState(token);
  // const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [ run, setRun] = useState(false);
  const [steps, setSteps] =useState([
    {
      content: 'Vous pouvez choisir une couleur via le color picker',
      placement: 'bottom',
      disableBeacon: true,
      spotlightPadding: 0,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".IroHandle",
      title: 'Choix de couleur',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      disableScrolling : false,
    },
    {
      content: 'Vous pouvez choisir la teneur en noir d\'une couleur',
      placement: 'top',
      spotlightPadding: 0,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".IroSliderGradient",
      title: 'Choix de la teneur en noir',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      disableScrolling : false,
    },
    {
      content: 'Choisissez une couleur parmi celles proposées',
      placement: 'top',
      spotlightPadding: 0,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".colorButtons",
      title: 'Choix de couleur',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      disableScrolling : true,
    },
    {
      content: 'Changez la luminosité des leds. Le changement de luminosité s\'effectuera lors de la prochaine instruction',
      placement: 'top',
      
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".choseBrightness",
      title: 'Changer la luminosité',
      
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightPadding: 0,
    },
    
    {
      content: (
        <div>
          Cliquez sur un icone afin de changer de page
          <br />
          Click sur l'icone en dessous
        </div>
      ),
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      placement: 'top',
      spotlightClicks: true,
      styles: {
        options: {
          zIndex: 10000,
        }
      },
      target: ".toModePage",
      title: 'Menu',
    },
    {
      content: 'Choisissez entre les différents modes',
      placement: 'bottom',
      styles: {
        options: {
          zIndex: 10000,
        },
        // buttonBack: {
        //   display: 'none',
        // }
      },
      target: ".mode1",
      title: 'Choix de mode',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      disableOverlayClose: true,
      hideCloseButton: true,
      disableBeacon: true,
      spotlightPadding: 0,
      
    },
    {
      placement: 'bottom',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".tourSpeeddeux ",
      title: 'Modifier la vitesse',
      content: 'Choix de la vitesse de l\'animation',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    {
      placement: 'bottom',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".tourSizedeux",
      title: 'Modifier l\'espacement',
      content: 'Choix du nombre de leds allumées dans l\'animation',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    {
      placement: 'top',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".tourSpacingdeux",
      title: 'Modifier l\'espacement',
      content: 'Choix du nombre de leds eteintes entre chaques leds allumées',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    
    {
      placement: 'top',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".tourRainbowdeux",
      title: 'Activer le mode arc-en-ciel',
      content: 'Permet de choisir si l\'animation est en mode arc-en-ciel',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    {
      placement: 'top',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".tourPerioddeux",
      title: 'Modifier le mode arc-en-ciel',
      content: 'Permet de choisir la vitesse du changement de couleur lors d\'une animation arc-en-ciel',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    {
      placement: 'top',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".tourStartdeux",
      content: 'Permet de démarrer le mode sélectionner avec les paramètres choisis',
      title: 'Démarrer un mode',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    {
      placement: 'top',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".tourSavedeux",
      title: 'Sauvegarder un mode',
      content: 'Permet de sauvegarder un mode avec les paramètres choisis en renseignant un nom',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    {
      placement: 'top',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".separator",
      title: 'Section mode sauvegardé',
      content: 'Permet de retrouver ses modes sauvegardés',
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    {
      placement: 'top',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".myOwnEffectsTutorial",
      title: 'Mode sauvegardé',
      content: "Démarrez un mode sauvegarder en cliquant dessus",
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    {
      placement: 'top',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".btnModifiy",
      title: 'Supprimer un mode',
      content: "Cliquez sur le bouton pour supprimer un mode. Sélectionnez le mode à supprimer en cliquant sur la poubelle",
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      
      disableOverlayClose: true,
      hideCloseButton: true,
      spotlightClicks: true,
      spotlightPadding: 0,
    },
    
    
    {
      title: 'Contrôler l\'alimentation',
      content: "Cliquez sur le bouton pour éteindre ou allumer les leds",
      disableOverlayClose: true,
      hideCloseButton: true,
      placement: 'right',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
      },
      target: ".tourShutdown",
      spotlightPadding: 0,
      spotlightClicks: true,
    },
    {
      title: 'Modifier les paramètres',
      content: "Cliquez sur le bouton pour accèder à la page de paramètres",
      disableOverlayClose: true,
      hideCloseButton: true,
      placement: 'right',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>,
        last: <span>Terminer</span>
      },
      target: ".tourSettings",
      spotlightPadding: 0,
      spotlightClicks: true,
    },
    
    
    ])
    // const history = useNavigate()
    
 
  return (
    <Router>
     
    <div className="App">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
    
        {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} setAuth={setAuth}/>
        :(
          
          <div className='home'>
          <JoyrideTour stepIndex={stepIndex} run={run} steps={steps} setStepIndex={setStepIndex} setRun={setRun}/>
            <Routes>
              <Route path="/" element={<Color auth={token} setToken={setToken} stepIndex={stepIndex} run={run} steps={steps} setStepIndex={setStepIndex} setRun={setRun} />}/>
              <Route path="/mode" element={<Mode  auth={token} stepIndex={stepIndex} run={run} steps={steps} setStepIndex={setStepIndex} setRun={setRun} />}/>
                <Route path="/settings" element={<Settings token={token} setToken={setToken}/>}/>
              <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
            </Routes>
            
          </div>
        )}
        
      </div>
      
      <Navbar></Navbar>
      </Router>

  );
}

export default App;
