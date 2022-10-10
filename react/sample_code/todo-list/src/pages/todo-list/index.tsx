import { createContext, useState, useEffect } from 'react';

// component
import InputTodoItem from 'src/pages/todo-list/inputTodoItem';
import ListTemplate from './listTemplate';

// context api
import { TitleContext } from 'src/contexts';


export default function TodoListPage() {
  const [todoList, setTodoList] = useState({
    title: 'TODO LIST',
    listItems: [],
  });
  const [progressList, setProgressList] = useState({
    title: 'PROGRESS LIST',
    listItems: [],
  });
  const [doneList, setDoneList] = useState({
    title: 'DONE LIST',
    listItems: [],
  });
  const [endList, setEndList] = useState({
    title: 'END LIST',
    listItems: [],
  });

  useEffect(() => {
    setTodoList(prevState => ({ ...prevState, ...{ title: 'TODO LIST' } }));
    setProgressList(prevState => ({ ...prevState, ...{ title: 'PROGRESS LIST' } }));
    setDoneList(prevState => ({ ...prevState, ...{ title: 'DONE LIST' } }));
    setEndList(prevState => ({ ...prevState, ...{ title: 'END LIST' } }));
  }, []);

  return (
    <div style={{ width: "100%", height: 800, background: "#CCC" }}>
      {/* input */}
      <div style={{ width: "100%", height: "10%" }}>
        <InputTodoItem />
      </div>
      {/* todo list */}
      <TitleContext.Provider value={todoList.title}>
        <ListTemplate />
      </TitleContext.Provider>
      {/* progress list */}
      <TitleContext.Provider value={progressList.title}>
        <ListTemplate />
      </TitleContext.Provider>
      {/* done list */}
      <TitleContext.Provider value={doneList.title}>
        <ListTemplate />
      </TitleContext.Provider>
    </div>
  )
}

