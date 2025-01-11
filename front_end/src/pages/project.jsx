import React from "react";
import DropZone from "../components/DropZone";
import styles from "../styles/Project.module.css";
function Project(){
    return(
        <div className={styles.image_form}>
            <p>Insérez une image de votre radio du rein afin qu'on puisse faire la prédiction</p>
            <DropZone></DropZone>
            <p className={styles.nb}><span>NB:</span>Ceci ne remplacera jamais l'avis d'un expert</p>
        </div> 
    );
}

export default Project;