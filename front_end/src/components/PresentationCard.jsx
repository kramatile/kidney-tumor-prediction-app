import React from "react";
import styles from "../styles/Presentation.module.css"

function PresentationCard(props){
    return(
        <a href={props.link} target="_blank" rel="noopener noreferrer">
        <div className={styles.presentation}>
            <h2>{props.name}</h2>
            <img src={props.img_path} alt={props.img_alt}></img>
            <div className={styles.description}>
                <p>{props.description}</p>
            </div>
        </div>
        </a>
    );
}


export default PresentationCard;