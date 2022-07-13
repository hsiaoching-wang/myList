import './App.css';

import {useState,useEffect} from 'react'
function App() {
  const [data, setData] = useState([]);
  const [newData,setNewData] = useState("");
  const [list,setList] = useState([]);
  //每次data有改變，就會變成字串，存入localStorage
  useEffect(()=>{
    localStorage.setItem("content",JSON.stringify(data));
  },[data])

  //每次data有改變，就會變成陣列，存入list
  useEffect(()=>{
    const content = localStorage.getItem("content");
    const contents = JSON.parse(content);
    setList(contents);
    //console.log(contents)
  },[data])

  //刪除
  const DeleteList = (id)=>{
    console.log(id);
    setData([...data.slice(0,id),...data.slice(id+1, data.length)]);
    const content = localStorage.getItem("content");
    const contents = JSON.parse(content);
    setList(contents);
  }
  const setNewLocals = ()=>{
    const newList ={
        newlist : newData,
        id: list.length
    }
    setData(data=>[...data,newList]);
     //localStorage.setItem("content",data);
  }
  return (
    <div className="App">
      <div className='head'>
        <h3>ToDoList</h3>
        <input type="text" onChange={(e)=>{setNewData(e.target.value)}} />
        <button onClick={()=>{setNewLocals()}}>add New</button>
        <ul>
          {list.map(item=>
            <li key={item.id}><span className='number'>{item.id+1}</span>{item.newlist} <button onClick={()=>{DeleteList(item.id)}}>clear</button>
            </li>               
          )}
        </ul>
      </div>
      
    </div>
  );
}

export default App;
