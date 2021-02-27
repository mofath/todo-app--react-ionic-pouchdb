import PouchDB from "pouchdb-core";
import SqlitePlugin from "pouchdb-adapter-cordova-sqlite";

PouchDB.plugin(SqlitePlugin);
export const localTaskDB = new PouchDB("tasks-db", {
  adapter: "cordova-sqlite",
});
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
    return { allTodos };
  };

  return await allDocs();
};

export const removeAllTodos = () => {
  return new Promise((resolve, reject) => {
    localTaskDB.allDocs().then(function (_response) {
      var toBeDeleted = _response.rows.length;
      _response.rows.forEach(function (row) {
        localTaskDB.remove(row.id, row.value.rev, function (err) {
          if (!err) {
            console.log(`document with id ${row.id} was deleted`);
            if (--toBeDeleted === 0) {
              console.log("done");
              resolve(false);
            }
          } else {
            console.error(err.message);
            reject(true);
          }
        });
      });
    });
  });
};
