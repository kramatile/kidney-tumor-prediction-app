import React from "react";
import PresentationCard from "../components/PresentationCard";
import styles from "../styles/About.module.css"

function About(){
    return(
        <div className={styles.about}>
            <div className={styles.groupe}>
                <h1>Groupe 16</h1>
                <div className={styles.boxes}>
                    <PresentationCard name="BENFATAH Yassine" img_path="DSC_0257.JPG" img_alt="Photo de Ben Fatah Yassine" description="Data scientist passionné par le Machine Learning, le deepLearning et les LLM's " link="https://www.linkedin.com/in/yassine-ben-fatah/"/>
                    <PresentationCard name="LAKHDAR Aya" img_path="Lakhdar.jpeg" img_alt="Photo de Lakhdar Aya " description="Ingénieur en deep learning, computer vision et data science" link="https://www.linkedin.com/in/aya-lakhdar-28471a271/"/>
                </div>  
            </div>
            
        </div>
    );

}

export default About;