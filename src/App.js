import './App.css';
import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function App() {

    const dispatch = useDispatch()




const [result,setResult] = useState('0')
const [thisValute,setThisValute] = useState('USD');

    useEffect(()=>{
        fetch(`https://api.ratesapi.io/api/latest?base=USD`)
            .then(response=>response.json())
            .then(json=>{
                dispatch({type:'FETCHVALUTES',payload:json.rates})

            })
    },[])

    let valutes = useSelector(state=>state)






function submitHandler(event){



 event.preventDefault()


    var splits = event.target.valute.value.split(' ');
    let valute,valuteValue,parseValute
    splits.map((elem,index)=>{
        if(parseInt(elem) >= 0 || parseInt(elem) <= 0){
            valute = splits[index+1]
            valuteValue = elem
        }
        if(elem === 'in'){
            parseValute = splits[index+1]

            Object.entries(valutes).map(([key, value])=> {
                if(key === parseValute.toUpperCase()){
                    setResult((value * valuteValue).toFixed(2))
                }
            })

        }
    })

    fetch(`https://api.ratesapi.io/api/latest?base=${valute.toUpperCase()}`)
        .then(response=>response.json())
        .then(json=>{
            dispatch({type:'FETCHVALUTES',payload:json.rates})
            return json.rates
        })
        .then((data)=>{

            Object.entries(data).map(([key, value])=> {
                if(key === parseValute.toUpperCase()){
                    setResult((value * valuteValue).toFixed(2))
                }
            })

        })

}
    function CalcForm(){
    const [value,setValue] = useState('')
        return(
            <div>
                <div className='dv-info'>Пример ввода данных: <span>15 usd in rub</span></div>
                <form onSubmit={submitHandler}>
                    <input data-tag='kuskus' name='valute' onChange={event=>setValue(event.target.value)} type="text" value={value}/>
                    <button type='submit'>Submit</button>
                </form>

                <div className='dvResult'>Результат: {result} {thisValute}</div>
            </div>
        )
    }
    function mainListValue(elem){

        fetch(`https://api.ratesapi.io/api/latest?base=${elem}`)
            .then(response=>response.json())
            .then(json=>{
                dispatch({type:'FETCHVALUTES',payload:json.rates})


            })
        setThisValute(elem)
    }

  return (


<div className="App">
    <Router>
<h2>Конвертер валют</h2>


        <nav>
            <ul className='dv-links'>
                <li>
                    <Link to="/">Converter</Link>
                </li>
                <li>
                    <Link to="/values">Values</Link>
                </li>

            </ul>
        </nav>


        <Switch>
            <Route path="/values">
                <h2>Выбери валюту</h2>


                <div className='dv-valute-changer-container'>
                {Object.keys(valutes).map((elem,index)=>{

                    if(elem != 'EUR'){

                        return(
                            <div key={index} onClick={()=>mainListValue(elem)} className={thisValute===elem? 'active' : ''}><span>{elem}</span></div>
                        )
                    }


                })}
                </div>


                <div className='crs-valute'>Текущая валюта: {thisValute}</div>
                <table className='valuteTable'>
    <tbody>

    <tr><td>Валюта</td><td>Курс</td></tr>

                    {Object.entries(valutes).map(([key, value]) => {
                        return(
                            <tr>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        )
                    })}
    </tbody>
                </table>
            </Route>
            <Route path="/">
                <CalcForm/>
            </Route>


        </Switch>


    </Router>

        <div>Новая ветка</div>

</div>
  );




}

export default App;
