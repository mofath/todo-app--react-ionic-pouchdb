import React from "react";
import {
  IonList,
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { trashOutline, createOutline } from "ionicons/icons";

import classes from "./TodosList.module.css";

const TodosList: React.FC<{
  todos: any[];
}> = ({ todos }) => {
  return (
    <IonContent>
      <div className={classes.TodosListHeader}>List</div>

      <IonList class={classes.TodosList}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <IonItemSliding key={todo.id}>
              <IonItem>
                <p>{todo.title}</p>
              </IonItem>
              <IonItemOptions>
                {" "}
                <IonButton fill="clear">
                  <IonIcon icon={trashOutline} color="success"></IonIcon>
                </IonButton>
                <IonButton fill="clear">
                  <IonIcon icon={createOutline} color="danger"></IonIcon>
                </IonButton>
              </IonItemOptions>
            </IonItemSliding>
          ))
        ) : (
          <IonItem>
            <p>No data</p>
          </IonItem>
        )}
      </IonList>
    </IonContent>
  );
};

export default TodosList;
