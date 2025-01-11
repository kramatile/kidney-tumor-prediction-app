import React from "react";
import styles from "../styles/Data.module.css"
function Data() {
    return (
        <div className={styles.data}>
            <h1>Description du Dataset</h1>
            <p>
                Ce dataset, collecté sur <span className={styles.kaggle}><a href="https://www.kaggle.com/datasets/nazmul0087/ct-kidney-dataset-normal-cyst-tumor-and-stone" target="_blank" rel="noreferrer">Kaggle</a></span>, a été développé par une équipe spécialisée dans le domaine de l'imagerie médicale. 
                Intitulé <strong>CT KIDNEY DATASET</strong>, il regroupe des données d'imagerie de patients présentant des diagnostics de rein normal, kystique, tumoral ou avec des calculs rénaux.
            </p>

            <h2>Contexte</h2>
            <p>
                Les données ont été extraites d'un <strong>système d'archivage et de communication d'images médicales (PACS)</strong> provenant de divers hôpitaux situés à Dhaka, au Bangladesh. 
                Ces données concernent des patients ayant reçu un diagnostic médical confirmé.
            </p>
            <p>
                Pour garantir une couverture complète :
            </p>
            <ul>
                <li>Des coupes <strong>coronales</strong> et <strong>axiales</strong> ont été sélectionnées.</li>
                <li>Des études contrastées et non contrastées ont été réalisées selon un protocole spécifique à l’abdomen et à l’urogramme.</li>
            </ul>
            <p>
                Chaque étude DICOM a été soigneusement choisie, anonymisée, puis convertie au format <strong>JPG sans perte</strong>. 
                Après conversion, les images ont été vérifiées par un radiologue et un technologue médical pour assurer l'exactitude des données.
            </p>

            <h2>Contenu du Dataset</h2>
            <p>Le dataset contient <strong>12 446 images uniques</strong>, réparties comme suit :</p>
            <ul>
                <li><strong>Kystes</strong> : 3 709 images</li>
                <li><strong>Normales</strong> : 5 077 images</li>
                <li><strong>Calculs rénaux</strong> : 1 377 images</li>
                <li><strong>Tumeurs</strong> : 2 283 images</li>
            </ul>

            <h2>Remerciements</h2>
            <p>
                Ce travail a été rendu possible grâce à l’aide de <strong>Mehedi Hasan</strong>, technologue médical, 
                qui a contribué à collecter les données auprès de différents hôpitaux.
            </p>

            <h2>Références</h2>
            <p>
                Si vous trouvez ce dataset utile, merci de le citer comme suit :
            </p>
            <blockquote>
                Islam MN, Hasan M, Hossain M, Alam M, Rabiul G, Uddin MZ, Soylu A. Vision transformer and explainable transfer learning models 
                for auto detection of kidney cyst, stone and tumor from CT-radiography. <em>Scientific Reports</em>. 2022 Jul 6;12(1):1-4.
            </blockquote>
        </div>
    );
}

export default Data;
