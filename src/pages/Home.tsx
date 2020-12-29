import React, { useState, useEffect, useCallback } from "react";
import { IonFab, IonFabButton, IonIcon, IonPage } from "@ionic/react";
import { add } from "ionicons/icons";
import { AppBar, AddTodoForm, TodosList } from "../components";
import { addTodo, fetchTodos } from "../services/pouchDB";

const Home: React.FC = () => {
  const [showForm, setshowForm] = useState(false);
  const [todos, setTodos] = useState<any[]>([]);

  const getTodos = useCallback(() => {
    fetchTodos().then((data: any) => {
      setTodos(data);
    });
  }, []);

  useEffect(() => getTodos(), [getTodos]);

  const handleSave = async (title: any, status: any) => {
    const newTodo = {
      title,
      status,
      date: Date.now(),
    };
    const { response } = await addTodo(newTodo);
    if (response?.ok) {
      setTodos((prevState) => {
        return [...prevState, { ...newTodo, id: response.id }];
      });
      setshowForm(false);
    }
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
