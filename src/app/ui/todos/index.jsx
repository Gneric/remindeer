'use client'

import { create } from 'zustand'
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const todoList = create((set) => ({
    todos: [
        { id: 1, text: 'Use Remindeer', completed: true },
        { id: 2, text: 'Organize your life', completed: false },
    ],
    addTodo: (input) => {
        set((state) => ({ 
            todos: [...state.todos, { text: input, completed: false }]} 
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
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const newTodo = e.target.elements.newTodo.value;
                    addTodo(newTodo);
                    e.target.elements.newTodo.value = '';
                }}
            >
                <div className='flex flex-row justify-between' >
                    <div className='w-10/12' >
                        <Input label="Make something up" />
                    </div>
                    <div className='w-2/12 grid place-items-center'>
                        <Button color="primary" type='submit'>
                            Add
                        </Button>
                    </div>
                </div>
            </form>
        )
    }

    return (
      <div className='m-6'>
        <div className='w-full grid place-items-center mb-5' >
            <p className='text-3xl'>
                To-Do List
            </p>
        </div>
        <div className='mb-10' >
            {addTodoForm()}
        </div>
        <ul>
          {
            todos.map(todo => (
                <li className='my-4'  key={todo}>
                    {/* <Checkbox isSelected={todo.completed} onClick={() => toggleTodo(todo.id)}>
                    </Checkbox> */}
                    <Card>
                        <CardBody 
                            className={`${todo.completed == true ? 'bg-green-400 hover:bg-green-600' : 'bg-slate-400 opacity-70'}` } >
                            <p className='text-xl font-bold'>{todo.text}</p>
                        </CardBody>
                    </Card>
                </li>
            ))
          }
        </ul>
      </div>
    );
  }