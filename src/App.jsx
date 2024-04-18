import React, { useState } from 'react';
import './App.css';

export default function App() {
  const STATUS = {
    TEXT: 'text',
    NOTE: 'note',
    TODO: 'todo',
    DOING: 'doing',
    DONE: 'done',
  };

  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [noteList, setNoteList] = useState([]);
  const [doingList, setDoingList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === '/clear') {
      setTaskList([]);
      setNoteList([]);
      setDoingList([]);
      setDoneList([]);
      setTask('');
    } else if (task.trim()[0] === '/') {
      setTaskList([...taskList, task]);
      setTask('');
    } else if (task.trim() !== '') {
      setNoteList([...noteList, task]);
      setTask('');
    }
  };

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleAddTask();
  };

  const handleRemoveDiv = (event, state, setState, statusToRemove) => {
    event.preventDefault();
    const valueToRemove = event.target.getAttribute('value');

    const updatedState = state.filter((item) => item !== valueToRemove);
    setState(updatedState);

    if (statusToRemove === STATUS.TODO) {
      setTaskList(updatedState);
      const taskToMove = state.find((item) => item === valueToRemove);
      setDoingList([...doingList, taskToMove]);
    } else if (statusToRemove === STATUS.DOING) {
      setDoingList(updatedState);
      const taskToMove = state.find((item) => item === valueToRemove);
      setDoneList([...doneList, taskToMove]);
    } else if (statusToRemove === STATUS.DONE) {
      setDoneList(updatedState);
      const taskToMove = state.find((item) => item === valueToRemove);
      setTaskList([...taskList, taskToMove]);
    }
  };

  return (
    <main className="h-screen md:h-screen flex flex-row h-max">
      <div
        id="live-note"
        className="flex flex-col justify-between basis-1/2 md:basis-1/2 max-h-full md:max-h-screen "
      >
        <div className="overflow-auto h-full max-h-full border-2 rounded-lg border-slate-500 m-2">
          <h2>live todo notes test</h2>
          <div className="task-list">
            {noteList.map((noteItem, index) => (
              <div key={index}>
                note {index + 1} <br /> {noteItem}{' '}
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
        <div className="m-2">
          <input
            type="text"
            id="large-input"
            className="w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            value={task}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="add a task..."
          />
        </div>
      </div>
      <div
        id="todo-main"
        className="basis-1/2 md:basis-1/2 flex flex-row max-h-full md:max-h-screen overflow-y-auto"
      >
        <div className="todo basic-1/3 md:basis-1/3 max-h-full md:max-h-screen border-2 rounded-lg border-slate-500 m-2">
          <h2>todo</h2>
          {taskList.map((taskItem, index) => (
            <div
              key={index}
              onClick={(event) =>
                handleRemoveDiv(event, taskList, setTaskList, STATUS.TODO)
              }
              className="hover:bg-sky-700 max-w-xl truncate"
              value={taskItem}
            >
              - {taskItem}
            </div>
          ))}
        </div>
        <div className="doing basic-1/3 md:basis-1/3 max-h-full md:max-h-screen border-2 rounded-lg border-slate-500 m-2">
          <h2>doing</h2>
          {doingList.map((taskItem, index) => (
            <div
              key={index}
              onClick={(event) =>
                handleRemoveDiv(event, doingList, setDoingList, STATUS.DOING)
              }
              className="hover:bg-sky-700 max-w-xl  truncate"
              value={taskItem}
            >
              - {taskItem}
            </div>
          ))}
        </div>
        <div className="done basic-1/3 md:basis-1/3 max-h-full md:max-h-screen border-2 rounded-lg border-slate-500 m-2">
          <h2>done</h2>
          {doneList.map((taskItem, index) => (
            <div
              key={index}
              onClick={(event) =>
                handleRemoveDiv(event, doneList, setDoneList, STATUS.DONE)
              }
              className="hover:bg-sky-700 max-w-xl  truncate"
              value={taskItem}
            >
              - {taskItem}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
