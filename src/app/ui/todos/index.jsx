'use client'

import { create } from 'zustand'
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";

const todoList = create((set) => ({
    todos: [
        { id: 1, text: 'Use Remindeer', completed: true },
        { id: 2, text: 'Organize your life', completed: false },
    ],
    addTodo: (input) => {
        set((state) => ({ 
            todos: [...state.todos, { id: state.todos.length + 1, text: input, completed: false }]} 
        ))
    },
    removeTodo: (id) => set((state) => ({ todos: state.todos.filter(t => t.id !== id)} )),
    toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
    },
}))

export default function TodoList() {
    const { todos, addTodo, removeTodo, toggleTodo } = todoList()
    const completed = todos.filter((todo) => todo.completed).length;

    const addTodoForm = () => {
        return (
            <div className='flex flex-row justify-between' >
                <div className='w-10/12' >
                    <Input id="newTodoTextBox" label="Make something up" />
                </div>
                <div className='w-2/12 grid place-items-center'>
                    <Button color="primary" type='submit' onPress={ (e) => {
                            const newTodoTextBox = document.getElementById('newTodoTextBox');
                            addTodo(newTodoTextBox.value)
                            newTodoTextBox.value = ''
                        }}>
                        Add
                    </Button>
                </div>
            </div>
        )
    }

    return (
      <>
        <div className='my-10 h-unit-xl' >
            {addTodoForm()}
        </div>
        <ScrollShadow hideScrollBar id="scrollShadow" className="h-5/6">
            <ul className='h-3/5' >
            {
                todos.map(todo => (
                    <li className='my-4'  key={todo}>
                        {/* <Checkbox isSelected={todo.completed} onClick={() => toggleTodo(todo.id)}>
                        </Checkbox> */}
                        <Card>
                            <CardBody 
                                className={`${todo.completed == true ? 'bg-green-400 hover:bg-green-600' : 'bg-slate-400 text-opacity-70 hover:bg-slate-600'}` }
                                onClick={(e) => { 
                                    toggleTodo(todo.id) 
                                    console.log('Todos ', todos)
                                }}
                            >
                                <p className='text-xl font-bold'>{todo.text}</p>
                            </CardBody>
                        </Card>
                    </li>
                ))
            }
            </ul>
        </ScrollShadow>
      </>
    );
  }