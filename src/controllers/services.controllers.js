
import { dataSource } from "../../db.js";
import { isValidType } from "../helpers/validateServiceType.js";
import { uploadFile } from "../services/cloudinary.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {IsNull} = require("typeorm");
const formationServiceRepository = dataSource.getRepository("FormationServices");


export const createNewFormationService = async (req, res) => {

  const { type } = req.body;

  if(!type || type && !isValidType(type)){
    return res
    .status(400)
    .json({ isSuccess: false, message: "Please provide a valid type of course: 'course','seminar', 'workshop', 'diploma'" });
  }
  
  try {
    let data = {
      name: req.body.name,
      generalInfo: req.body.generalInfo,
      type:req.body.type,
      image: req.body.image,
      syllabus: req.body.syllabus,
      hours: req.body.hours,
      exhibitorName: req.body.exhibitorName,
      organizedBy: req.body.organizedBy,
      supportedByName: req.body.supportedByName,
      cost: req.body.cost,
      discounts: req.body.discounts,
      inscriptionUrl: req.body.inscriptionUrl,
    };

    for (const imageField of Object.keys(req.files)) {
      let file = req.files[imageField][0];
      const res = await uploadFile(file.path);
      data[imageField] = res.secure_url;
    }

    await formationServiceRepository.save(data);

    return res.status(201).json({ isSuccess: true, message: "Created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
};


export const getFormationServicesByPagination = async (req,res)=>{

  console.log(req.query)
  try{
    if(!req.query.skip || !req.query.taking || isNaN(Number(req.query.skip)) || isNaN(Number(req.query.taking))){
      return res
      .status(400)
      .json({ isSuccess: false, message: "Please provide correct values for pagination. Example: /10/0. This will take 10 elements of each service, starting of id 1. You will get 40 total objects" });
    }
    const {skip, taking} = req.query
   
    const [services,count] =  await formationServiceRepository.findAndCount({
      where:{
        deletedAt:IsNull()
      },
      order:{
        id:"DESC"
      },
      take:taking,
      skip
    })

    return res
    .status(200)
    .json({ isSuccess: true, message: "ok", data:services,count });
  }catch(error){
    return res
    .status(500)
    .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
}

export const updateFormationService = async (req,res)=>{
  if(isNaN(Number(req.params.id))){
    return res
    .status(400)
    .json({ isSuccess: false, message: "Please provide correct values for id. Id must be a number" });
  }
  const type = req.body.type
  if(!type || type && !isValidType(type)){
    return res
    .status(400)
    .json({ isSuccess: false, message: "Please provide a valid type of course: 'course','seminar', 'workshop', 'diploma'" });
  }
 
  try {
    const serviceRecord = await formationServiceRepository.findOne({where:{id:Number(req.params.id)}})
    if(!serviceRecord){
      return res
      .status(400)
      .json({ isSuccess: false, message: "Formation Service not found" });
    }
    let dataToUpdate = {
      ...req.body
    }
    for (const imageField of Object.keys(req.files)) {
      let file = req.files[imageField][0];
      const res = await uploadFile(file.path);
      dataToUpdate[imageField] = res.secure_url;
    }
    Object.assign(serviceRecord,dataToUpdate)
    await formationServiceRepository.save(serviceRecord)
    
    return res
    .status(200)
    .json({ isSuccess: true, message: "Service updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
}

export const deleteFormationService = async (req,res)=>{
  if(isNaN(Number(req.params.id))){
    return res
    .status(400)
    .json({ isSuccess: false, message: "Please provide a correct value for id. Id must be a number" });
  }

  
  try {
    const serviceRecord = await formationServiceRepository.findOne({where:{id:Number(req.params.id)}})
    if(!serviceRecord){
      return res
      .status(400)
      .json({ isSuccess: false, message: "Formation Service not found" });
    }
    serviceRecord.deletedAt = new Date()
    await formationServiceRepository.save(serviceRecord)
    return res
    .status(200)
    .json({ isSuccess: true, message: "Deleted" });
  } catch (error) {
    return res
    .status(500)
    .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
}