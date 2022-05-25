import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const JoyrideTour = ({stepIndex,setStepIndex}) => {
  
  const history = useNavigate();  
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
      // hideFooter: true,
      placement: 'top',
      spotlightClicks: true,
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          display: 'none',
        },

      },
      locale: { 
        next: <span>Suivant</span>,
        back: <span>Précédent</span>,
        skip: <span>Passer</span>
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
      title: 'Modifier la taille',
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
      placement: 'top',
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

  const handleJoyrideCallback = data => {
    const { action, index, status, type } = data;
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
      if(index ===1){
        
          let toScroll= document.getElementsByClassName("choseBrightness")[0].offsetTop
          // window.scrollTo(toScroll, toScroll)
      }
      if (index ===3 && action !== 'next' ){
          history("/");
      }
      if (index ===4  && action === 'prev'){
          history("/");
      }
      if (window.location.pathname ==="/mode" && action === "next" && index===2){
        history("/");
      }
      if (index === 4  && action === 'next') {
          document.getElementById("modalNum1").click()
      }
      if (index === 5 && action === 'prev') {
          document.getElementById("deuxBtnClose").click()
      }
      if (index === 9 && action === 'next') {
          document.getElementById("deuxBtnClose").click()
          let toScroll= document.getElementsByClassName("separator")[0].offsetTop
          window.scrollTo(toScroll, toScroll)
      }
      if (index === 9 && action === 'prev') {
        let toScroll= document.getElementById("btnStart").offsetTop
        window.scrollTo(toScroll, toScroll)
          
      }
      if (index === 10 && action === 'prev') {
          document.getElementById("modalNum1").click()
          let toScroll= document.getElementById("modePageId").offsetTop
          window.scrollTo(toScroll, toScroll)
      }
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      localStorage.setItem('tutorial', true);
    }
    // console.groupCollapsed(type);
    // console.log(data); //eslint-disable-line no-console
    // console.groupEnd();
  };

  return (
    <>
    { !localStorage.getItem('tutorial') &&
      <Joyride
          continuous={true}
          steps={steps}
          stepIndex={stepIndex}
          showProgress={true}
          disableScrolling={true}
          showSkipButton={true} 
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: 'red',
              zIndex: 1000,
            }
          }}
        />
      }
    </>
  );

}

export default JoyrideTour