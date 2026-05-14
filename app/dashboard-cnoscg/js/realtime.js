let realtime = null;

function startRealtime(){

  realtime = setInterval(() => {

    connectKobo();

  }, 30000);

}
