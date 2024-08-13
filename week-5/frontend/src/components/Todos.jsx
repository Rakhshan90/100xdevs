import React from 'react'

const Todos = (props) => {

    return (
        <div className='flex-1 flex flex-col gap-6'>
            {props.todos.map((item) => (
                <div key={item?._id}  className='text-left'>
                    <h1 className="mx-12 w-full text-2xl font-medium">{item.title}</h1>
                    <h2 className="mx-12 w-full text-lg max-w-xl">{item.description}</h2>
                    <button onClick={()=>{
                        fetch('http://localhost:3000/todo/complete', {
                            method: 'PUT',
                            body: JSON.stringify({
                                todoId: item._id,
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                    }} className='w-1/3 p-4 m-4 bg-blue-500 rounded-full px-6 py-3 text-white'>
                        {item.completed ? "done" : "mark as done"}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Todos