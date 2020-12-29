import React, { useState } from "react";
import {
  IonIcon,
  IonButton,
  IonModal,
  IonList,
  IonCol,
  IonItem,
  IonLabel,
  IonRadio,
  IonRow,
  IonRadioGroup,
  IonInput,
  IonText,
} from "@ionic/react";
import { close } from "ionicons/icons";

import classes from "./AddTodoForm.module.css";

const AddTodoForm: React.FC<{
  showForm: boolean;
  setshowForm: (showForm: boolean) => void;
  handleSave: (title: any, status: any) => void;
}> = ({ showForm, setshowForm, handleSave }) => {
  const [title, setTitle] = useState<string | undefined | null>("");
  const [status, setStatus] = useState<boolean | undefined | null>(false);

  const submit = () => {
    handleSave(title, status);
  };

  return (
    <IonModal isOpen={showForm}>
      <form className={classes.AddTodoForm}>
        <IonList className={classes.Content}>
          <IonItem color="transparent" lines="full" className={classes.Header}>
            <IonText className={classes.Title} slot="start">
              ADD NEW <br />
              TASK
            </IonText>
            <IonButton
              onClick={() => setshowForm(false)}
              className={classes.CloseBtn}
              fill="clear"
            >
              <IonIcon icon={close} className={classes.CloseIcon} />
            </IonButton>
          </IonItem>

          <IonItem color="transparent" lines="full">
            <IonInput
              type="text"
              onIonChange={(e) => setTitle(e.detail.value)}
              placeholder="e.g Shopping"
            />
          </IonItem>

          <IonRadioGroup
            name="status"
            onIonChange={(e) => setStatus(e.detail.value)}
            value={false}
          >
            <IonRow className="ion-margin-vertical">
              <IonCol>
                <IonItem color="transparent" lines="none">
                  Completed
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem color="transparent" lines="none">
                  <IonRadio value={true} />
                  <IonLabel>&nbsp;Yes</IonLabel>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem color="transparent" lines="none">
                  <IonRadio value={false} />
                  <IonLabel>&nbsp;No</IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonRadioGroup>
          <br />

          <IonButton
            className={classes.SaveBtn}
            size="large"
            expand="block"
            onClick={() => submit()}
          >
            Save
          </IonButton>
        </IonList>
      </form>
    </IonModal>
  );
};

export default AddTodoForm;
