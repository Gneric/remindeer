'use client'

import TodoList from "./todos"

export default function MainPage(){
    return (
        <div className="h-screen w-screen">
            <div className="w-screen h-1/6 text-center grid place-items-center" >
                <h1 className="text-6xl font-extrabold">
                    Remindeer
                </h1>
            </div>
            <div className="w-screen h-5/6 flex flex-row">
                <div className="bg-slate-950 w-4/12">
                    <TodoList></TodoList>
                </div>
                <div className="bg-slate-600 w-4/12">02</div>
                <div className="bg-gray-900 w-4/12">03</div>
            </div>
        </div>
    )
}