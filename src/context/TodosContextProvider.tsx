import React, { useState, useEffect, useCallback } from "react";

import TodosContext from "./TodosContext";
import {
  addTodo,
  fetchTodos,
  removeAllTodos,
  localTaskDB,
} from "../services/pouchDB";
import { Plugins } from "@capacitor/core";
const { Network } = Plugins;

const TodosContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [isDeviceConnected, setIsDeviceConnected] = useState<boolean>(false);

  // listen to any change to localdb
  localTaskDB
    .changes({ since: "now", include_docs: true })
    .on("change", (change) => {
      console.log(change.deleted);
      if (!change.deleted && isDeviceConnected) {
        localTaskDB.remove(change.id, change.changes[0].rev).then((err) => {});
      }
    })
    .on("error", (err) => {
      console.log(err);
    });

  Network.addListener("networkStatusChange", (status) => {
    setIsDeviceConnected(status.connected);
  });

  useEffect(() => {
    Network.getStatus().then((status) =>
      setIsDeviceConnected(status.connected)
    );
  }, []);

  useEffect(() => {
    if (!isDeviceConnected) {
      console.log("offline");
    } else {
      console.log("online");
      removeAllTodos().then((error) => {
        if (!error) {
          console.log("all deleted");
          setTodos([]);
        }
      });
    }
  }, [isDeviceConnected]);

  const addNewTodo = async (title: any, status: any) => {
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
    }
  };

  const getTodos = useCallback(() => {
    fetchTodos().then(({ allTodos }: any) => {
      setTodos(allTodos);
    });
  }, []);

  useEffect(() => getTodos(), [getTodos]);

  return (
    <TodosContext.Provider value={{ todos, getTodos, addNewTodo }}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
