import React, { useEffect, useState } from 'react';


function App() {
  const [forToDo, setforToDo] = useState([])

  const handleOnChange = (e) => {
    if (e.target.value !== '') {
      setforToDo([...forToDo, {
        done: false,
        label: e.target.value
      }]);

      e.target.value = '';
    }
  }

  const handleDeleteTask = (e) => {
    if(forToDo.length > 1) {
      let newForToDo = [...forToDo];
      newForToDo.splice(e.target.id, 1);
      setforToDo(newForToDo);
    }
  }

  useEffect(() => {
    if(forToDo.length !== 0) {
      actualizarLista(forToDo);
    }
  }, [forToDo]) // cuando se modifica el estado forToDo
  
  useEffect(() => {
    getList();
  }, []) // arreglo vacio si queremos que se ejecute solamente cuando el componente se monta

  const getList = async (tareas) => {
    try {
      const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/lmontero88');
      const data = await response.json();
      setforToDo(data);

    }
    catch (error) {
      console.log(error);
    }

  }

  const actualizarLista = (tareas) => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/lmontero88', {
      method: 'PUT',
      body: JSON.stringify(tareas),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => {
        response.json()
      })
      .then((data) => {
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (

    <div className='row d-flex justify-content-center m-5'>
      <div className=' col-md-6 contenedor bg-info pb-5'>
        <h1>To Do</h1>
        <input type='text' className='form-control pt-4 pb-4' placeholder='What needs to be done?' onBlur={handleOnChange}></input>
        <ul className="list-group">
          {
            forToDo.map((actividad, i) => {
              return <li className="list-group-item task" key={i}>
                <div>{actividad.label}</div>
                <i id={i} className="fa fa-times" aria-hidden="true" onClick={handleDeleteTask}></i>
                </li>
            })
          }


        </ul>
      </div>
    </div>
  );
}

export default App;
