import React from "react";
import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

import classes from "./AppBar.module.css";

const AppBar: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar className={classes.AppBar}>
        <IonTitle className={classes.Title}>
          YOUR
          <br /> <br />
          TASKS
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppBar;
