import toast from 'powertoast';
import fetch from 'node-fetch'; // Necesario si usás Node.js fuera de entornos modernos

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const makeToast = async () => {
  try {
    // Dólar oficial
    const resOficial = await fetch('https://mercados.ambito.com//dolarnacion/variacion');
    const dolarOficial = await resOficial.json();

    // Dólar CCL
    const resCCL = await fetch('https://dolarapi.com/v1/dolares/contadoconliqui');
    const dolarCCL = await resCCL.json();

    const us3 = (parseFloat(dolarCCL.venta) * 1.0250).toFixed(2);

    await toast({
      title: "Cotización USD / US3",
      message: `💰 BNA - Venta: ${dolarOficial.venta}\n📉 US3 - ${us3}`,
      icon: './icon/usd.jpg'
    });

  } catch (error) {
    console.error("Error al obtener los datos o mostrar la notificación:", error.message);
  }
};

const main = async () => {
  while (true) {
    await makeToast();
    await delay(600000); // 10 minutos
  }
};

main();
