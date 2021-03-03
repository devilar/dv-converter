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
    const valutes = useSelector(state=>state)



const [result,setResult] = useState(0)
const [dvCurrency,setDvCurrency] = useState('USD')


useEffect(()=>{
/*
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(response=>response.json())
        .then(json=>dispatch({type:'FETCHVALUTES',payload:json.Valute}))
    */

    fetch(`https://api.ratesapi.io/api/latest?base=USD`)
        .then(response=>response.json())
        .then(json=>dispatch({type:'FETCHVALUTES',payload:json.rates}))


},[])

function submitHandler(event){

        event.preventDefault()



    var splits = event.target.valute.value.split(' ');
    let valute,valuteValue,parseValute

    splits.map((elem,index)=>{
        if(parseInt(elem) >= 0 || parseInt(elem) <= 0){

            valute = splits[index+1]
            valuteValue = elem
        }
        if(elem == 'in'){

            parseValute = splits[index+1]
            console.log('valute',valute, 'with value:',valuteValue, 'and parsevalute is', parseValute)


            Object.entries(valutes).map(([key,value])=> {
                console.log(key)
                console.log(valueg)



                /*
                if(elem.CharCode == valute.toUpperCase()){

                    console.log('bingo!! value is ',elem.Value * valuteValue)
                    setResult((elem.Value * valuteValue).toFixed(2))
                }*/



            })


        }
    })

}

    function CalcForm(el){


        const [value,setValue] = useState('')
        return(
            <div>
                <form onSubmit={submitHandler}>
                    <input name='valute' onChange={event=>setValue(event.target.value)} type="text" value={value}/>
                    <button type='submit'>Submit</button>
                </form>

                {result}


            </div>
        )
    }


  return (


<div className="App">
    <Router>
<h2>Конвертер валют</h2>


        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/values">Values</Link>
                </li>

            </ul>
        </nav>


        <Switch>
            <Route path="/values">
                <table className='valuteTable'>
                    {/*<tr><td>ID</td><td>Название Валюты</td><td>Чаркод</td><td>Предыдущая стоимость</td><td>Текущая стоимость</td></tr>*/}
                    {/*Object.values(valutes).map(elem=><tr><td>{elem.ID}</td><td>{elem.Name}</td><td>{elem.CharCode}</td><td>{elem.Previous}</td><td>{elem.Value}</td></tr>)*/}
                    {Object.entries(valutes).map(([key, value]) => {
                        return(
                            <tr>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        )
                    })}

                </table>
            </Route>
            <Route path="/">
                <CalcForm/>
            </Route>


        </Switch>









    </Router>
</div>
  );




}

export default App;
