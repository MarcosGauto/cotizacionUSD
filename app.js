import toast from 'powertoast';

async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise(resolve => setTimeout(resolve, ms));
}

const makeToast = async () => {

  try {

    let response = (await fetch('https://mercados.ambito.com//dolarnacion/variacion')).json();

    await response.then((json) => {
      toast({
        title: `Cotizacion BNA - Updated: ${json.fecha}`,
        message: `Compra: ${json.compra} -- Venta: ${json.venta}`,
        icon: './icon/usd.jpg'
      }).catch((err) => { 
        console.error(err);
      });
      
    });
  
  } catch (error) {
    
    console.log(`Error: ${error.message}`);
  }

}

while (true) {
  
  // Get the price of blue dolar
  makeToast();

  // Wait:
  // 10 minutes: 600.000 ms;
  // 100 minutes: 6.000.000;
  // 1.000 minutes: 60.000.000
  await delay(600000);

}