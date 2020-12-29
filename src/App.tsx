import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonAlert } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

import { Plugins } from "@capacitor/core";
const { Network } = Plugins;

const App: React.FC = () => {
  const [networkState, setNetworkState] = useState("offline");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    Network.addListener("networkStatusChange", (status) => {
      setNetworkState(status.connectionType);
      console.log(status);
    });
  }, []);

  useEffect(() => {
    setShowAlert(true);
  }, [networkState]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Alert"}
        message={networkState}
        buttons={["OK"]}
      ></IonAlert>
    </IonApp>
  );
};
export default App;
