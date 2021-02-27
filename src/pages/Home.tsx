import React, { useState, useContext } from "react";
import { IonFab, IonFabButton, IonIcon, IonPage } from "@ionic/react";
import { add } from "ionicons/icons";
import { AppBar, AddTodoForm, TodosList } from "../components";

import TodosContext from "../context/TodosContext";

const Home: React.FC = () => {
  const { todos, addNewTodo } = useContext(TodosContext);
  const [showForm, setshowForm] = useState<boolean>(false);

  const handleSave = async (title: any, status: any) => {
    await addNewTodo(title, status);
    setshowForm(false);
  };

  return (
    <IonPage>
      <AppBar />

      <AddTodoForm
        showForm={showForm}
        setshowForm={setshowForm}
        handleSave={handleSave}
      />

      <TodosList todos={todos} />

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton color="" onClick={() => setshowForm(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Home;
