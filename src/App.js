import React, { useReducer, useEffect } from 'react';
import './App.css'; 
import confetti from 'canvas-confetti';


const reducer = (state, action) => {
  switch (action.type) {
    case 'para_yatir':
      return { ...state, bakiye: state.bakiye + 100 };
    case 'para_cek':
      return { ...state, bakiye: state.bakiye - 100 };
    case 'sifirla':
      return { ...state, bakiye:  0 };
    default:
      return state;
  }
};
const initialBalance = Number(localStorage.getItem('kayitli_bakiye')) || 0;

function App() {

  const [state, dispatch] = useReducer(reducer, { bakiye: initialBalance , kullanici: "Merve"});

  
  useEffect(() => {
    localStorage.setItem('kayitli_bakiye', state.bakiye);
    console.log("Bakiye kasaya kilitlendi:", state.bakiye);
  }, [state.bakiye]); 

const handleParaYatir = () => {
    
   
      confetti({
        particleCount: 500,
        spread: 150,
        origin: { y: 0.6 },
        colors: ['#e62d99', '#cc2ebc', '#b6d536','#53d8df']
      });
    
    dispatch({ type: 'para_yatir' });
  };

  return (
    <div className="container"> 
      <h1>{state.kullanici}'nin Banka Hesabı</h1>

    <h1 className={state.bakiye < 0 ? 'balance danger' : 'balance'}>
    {state.bakiye} TL
    </h1>

    {state.bakiye < 0 && <p className="error-msg">⚠️ Eksiye düştünüz!</p>}

      <div className="button-group">
     
        <button 
        
        onClick={handleParaYatir} >
          100 TL Yatır
          
        </button>

        <button className="withdraw" onClick={() => dispatch({ type: 'para_cek' })}>
          100 TL Çek
        </button>

        <button className="reset" onClick={() => dispatch({ type: 'sifirla' })}>
          Sıfırla
        </button>
       
      </div>
    </div>
  );
}

export default App;