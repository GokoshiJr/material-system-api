const Role = require('../models/Role');
const CampaignType = require('../models/CampaignType');

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Role({name: 'user'}).save(),
      new Role({name: 'admin'}).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createCampaignType = async () => {
  try {
    const count = await CampaignType.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new CampaignType({
        name: 'Reconocimiento de Marca', description: 'Fija tu marca o producto en el público para que lo recuerde'
      }).save(),
      new CampaignType({
        name: 'Alcance', description: 'Llega a la mayor cantidad de personas'
      }).save(),
      new CampaignType({
        name: 'Trafico', description: 'Dirige a tu Página web, WhatsApp, Messenger'
      }).save(),
      new CampaignType({
        name: 'Interaccion', description: 'Fomenta la interacción del publico con el anuncio'
      }).save(),
      new CampaignType({
        name: 'Instalación de Apps', description: 'Dirige al publico a la descarga de tu App'
      }).save(),
      new CampaignType({
        name: 'Reproducciones de video', description: 'Dirigido a aumentar las reproducciones de tu video'
      }).save(),
      new CampaignType({
        name: 'Mensajes', description: 'Dirige a tu publico a Messenger o Mensajes Directos'
      }).save(),
      new CampaignType({
        name: 'Conversiones', description: 'Dirige al publico al directo al botón de comprar en tu pagina web'
      }).save(),
      new CampaignType({
        name: 'Ventas del Catalogo', description: 'Dirige al público directo al catalogo de tu tienda en línea'
      }).save(),
      new CampaignType({
        name: 'Conseguir que las personas visiten tu negocio', description: 'Este ADS se lanza a personas que están cerca de tu ubicación para aumentar las visitas físicas que recibes'
      }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createRoles,
  createCampaignType
}
