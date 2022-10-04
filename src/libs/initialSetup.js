const Role = require('../models/Role');
const CampaignType = require('../models/CampaignType');
const AudienceDefinition = require('../models/Induction/AudienceDefinition');
const Destination = require('../models/Induction/Destination');
const LinkExplain = require('../models/Induction/LinkExplain');
const LinkPost = require('../models/Induction/LinkPost');
const OperationPoint = require('../models/Induction/OperationPoint');
const PaymentMethod = require('../models/Induction/PaymentMethod');
const Platform = require('../models/Induction/Platform');
const Segmentation = require('../models/Induction/Segmentation');
const UbicationImportance = require('../models/Induction/UbicationImportance');
const VinculationAccount = require('../models/Induction/VinculationAccount');
const WorkingGroupCreation = require('../models/Induction/WorkingGroupCreation')

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'admin' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createCampaignType = async () => {
  try {
    const count = await CampaignType.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new CampaignType({
        name: 'Reconocimiento de Marca',
        description: 'Fija tu marca o producto en el público para que lo recuerde'
      }).save(),
      new CampaignType({
        name: 'Alcance',
        description: 'Llega a la mayor cantidad de personas'
      }).save(),
      new CampaignType({
        name: 'Trafico',
        description: 'Dirige a tu Página web, WhatsApp, Messenger'
      }).save(),
      new CampaignType({
        name: 'Interaccion',
        description: 'Fomenta la interacción del publico con el anuncio'
      }).save(),
      new CampaignType({
        name: 'Instalación de Apps',
        description: 'Dirige al publico a la descarga de tu App'
      }).save(),
      new CampaignType({
        name: 'Reproducciones de video',
        description: 'Dirigido a aumentar las reproducciones de tu video'
      }).save(),
      new CampaignType({
        name: 'Mensajes',
        description: 'Dirige a tu publico a Messenger o Mensajes Directos'
      }).save(),
      new CampaignType({
        name: 'Conversiones',
        description: 'Dirige al publico al directo al botón de comprar en tu pagina web'
      }).save(),
      new CampaignType({
        name: 'Ventas del Catalogo',
        description: 'Dirige al público directo al catalogo de tu tienda en línea'
      }).save(),
      new CampaignType({
        name: 'Conseguir que las personas visiten tu negocio',
        description: 'Este ADS se lanza a personas que están cerca de tu ubicación para aumentar las visitas físicas que recibes'
      }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

/* InduccionAccountElements */

const createAudienceDefinition = async () => {
  try {
    const count = await AudienceDefinition.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new AudienceDefinition({ name: 'Edad' }).save(),
      new AudienceDefinition({ name: 'Sexo' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createDestination = async () => {
  try {
    const count = await Destination.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new Destination({ name: 'Perfil' }).save(),
      new Destination({ name: 'Sitio Web' }).save(),
      new Destination({ name: 'Mensajes Directos' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createLinkExplain = async () => {
  try {
    const count = await LinkExplain.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new LinkExplain({ name: 'API de Whatsapp' }).save(),
      new LinkExplain({ name: 'Formularios de Google' }).save(),
      new LinkExplain({ name: 'Link de Landing Page' }).save(),
      new LinkExplain({ name: 'Formularios en tu sitio Web' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createLinkPost = async () => {
  try {
    const count = await LinkPost.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new LinkPost({ name: 'Desde Instagram' }).save(),
      new LinkPost({ name: 'Desde Facebook' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createOperationPoint = async () => {
  try {
    const count = await OperationPoint.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new OperationPoint({ name: 'Solicitudes de Lunes a Jueves' }).save(),
      new OperationPoint({ name: '48 horas antes' }).save(),
      new OperationPoint({ name: 'Casos especiales. "Publicaciones Urgentes"' }).save(),
      new OperationPoint({ name: 'Tiempo de aprobación de los anuncios por la plataformas de 20 minutos a 24 horas' }).save(),
      new OperationPoint({ name: 'Parar una publicación' }).save(),
      new OperationPoint({ name: 'Sistema Referido' }).save(),
      new OperationPoint({ name: 'Calidad de los Post. "Imagen Vs Contenido"' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createPaymentMethod = async () => {
  try {
    const count = await PaymentMethod.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new PaymentMethod({ name: 'Bank of America' }).save(),
      new PaymentMethod({ name: 'Efectivo' }).save(),
      new PaymentMethod({ name: 'Bolivares a la tasa del dia' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createPlatform = async () => {
  try {
    const count = await Platform.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new Platform({ name: 'Instagram' }).save(),
      new Platform({ name: 'Facebook' }).save(),
      new Platform({ name: 'Dark Post (V1, V2, V3)' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createSegmentation = async () => {
  try {
    const count = await Segmentation.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new Segmentation({
        name: 'Demográfico',
        description: 'La segmentación demográfica debe tomar en cuenta variables como los ingresos, grado de estudios, nacionalidad, raza, religión, ocupación, entre otros'
      }).save(),
      new Segmentation({
        name: 'Intereses',
        description: 'La segmentación por intereses debe hacer que el público sea más específico según sus comportamientos, gustos y aficiones'
      }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createUbicationImportance = async () => {
  try {
    const count = await UbicationImportance.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new UbicationImportance({ name: 'Regional' }).save(),
      new UbicationImportance({ name: 'Local' }).save(),
      new UbicationImportance({ name: 'Excluir' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createVinculationAccount = async () => {
  try {
    const count = await VinculationAccount.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new VinculationAccount({ name: 'Fanpage creada' }).save(),
      new VinculationAccount({ name: 'Instagram debidamente vinculada a esa fanpage' }).save(),
      new VinculationAccount({ name: 'Nombrarnos administrador de esa fanpage' }).save(),
      new VinculationAccount({ name: 'Explicar por que un solo administrador' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createWorkingGroupCreation = async () => {
  try {
    const count = await WorkingGroupCreation.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new WorkingGroupCreation({ name: 'Incorporar al equipo de trabajo y nombrar los administradores' }).save(),
      new WorkingGroupCreation({ name: 'Pasar la información general y los formularios usar' }).save(),
      new WorkingGroupCreation({ name: 'Colocar la imagen al grupo' }).save(),
      new WorkingGroupCreation({ name: 'Colocar la descripción al grupo' }).save()
    ]);
  } catch (err) {
    console.log(err);
  }
}

const createInductionElements = async () => {
  try {
    await Promise.all([
      createAudienceDefinition(),
      createDestination(),
      createLinkExplain(),
      createLinkPost(),
      createOperationPoint(),
      createPaymentMethod(),
      createPlatform(),
      createSegmentation(),
      createUbicationImportance(),
      createVinculationAccount(),
      createWorkingGroupCreation()
    ]);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createRoles,
  createCampaignType,
  createInductionElements
}
