window.GameStore={
  getBest:(k)=>Number(localStorage.getItem(k)||0),
  setBest:(k,v)=>localStorage.setItem(k,String(v||0))
};