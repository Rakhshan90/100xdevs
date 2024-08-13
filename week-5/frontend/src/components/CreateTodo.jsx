import React, { useState } from 'react'

const CreateTodo = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const clickHandler = () => {
    fetch('http://localhost:3000/todo/create', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "content-Type": "application/json"
      }
    }).then(async function(res){
      const json = await res.json();
      alert("Todo has been added");
    });
  }


  return (
    <div className='max-w-md'>
      <input onChange={(e) => setTitle(e.target.value)} value={title} className='w-full p-4 m-4 border-2' type="text" placeholder='Enter title' /> <br></br>

      <input onChange={(e) => setDescription(e.target.value)} value={description} className='w-full p-4 m-4 border-2' type="text" placeholder='Enter description' /> <br></br>

      <button onClick={clickHandler} className='w-full p-4 m-4 bg-blue-500 rounded-full px-6 py-3 text-white'>
        Create Todo
      </button>
    </div>
  )
}

export default CreateTodo