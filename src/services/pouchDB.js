import PouchDB from "pouchdb-core";
import SqlitePlugin from "pouchdb-adapter-cordova-sqlite";

PouchDB.plugin(SqlitePlugin);
const localTaskDB = new PouchDB("tasks-db", { adapter: "cordova-sqlite" });
// const remoteNoteDb = new PouchDB(`http://localhost/mydb`);

window.sqlitePlugin = window.sqlitePlugin || SqlitePlugin;

export const addTodo = async (newTodo) => {
  let response;
  try {
    response = await localTaskDB.post({ ...newTodo });
  } catch (err) {
    console.log(err.message);
  }
  return { response };
};

export const fetchTodos = async () => {
  let allTodos;
  const allDocs = async () => {
    try {
      const response = await localTaskDB.allDocs({ include_docs: true });
      allTodos = response.rows.map((row) => {
        return {
          id: row.doc._id,
          title: row.doc.title,
          status: row.doc.status,
          date: row.doc.date,
        };
      });
    } catch (err) {
      console.log(err.message);
    }
    return allTodos;
  };

  // localTaskDB
  //   .changes({ live: true, since: "now", include_docs: true })
  //   .on("change", () => {
  //     allDocs().then((todos) => {
  //       return (allTodos = todos);
  //     });
  //   });

  return await allDocs();
};
