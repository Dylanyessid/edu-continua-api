import { dataSource } from "../../db.js";
import { uploadFile } from "../services/cloudinary.js";

const servicesRespositoryMap = {
  "course":dataSource.getRepository("Course"),
  "workshop":dataSource.getRepository("Workshop"),
  "seminar":dataSource.getRepository("Seminar"),
  "diploma":dataSource.getRepository("Diploma"),
} 
export const createNewCourse = async (req, res) => {

  const type = req.body.type
  if(!type || !servicesRespositoryMap[req.body.type]){
    return res
    .status(400)
    .json({ isSuccess: false, message: "Please provide a valid type of course: 'course','seminar', 'workshop', 'diploma'" });
  }
  
  
  try {
    const serviceRepository = servicesRespositoryMap[req.body.type]
    let data = {
      name: req.body.name,
      general_info: req.body.general_info,
      syllabus: req.body.syllabus,
      hours: req.body.hours,
      exhibitor_name: req.body.exhibitor_name,
      organized_by: req.body.organized_by,
      supported_by_name: req.body.supported_by_name,
      cost: req.body.cost,
      discounts: req.body.discounts,
      inscription_url: req.body.inscription_url,
    };

    for (const imageField of Object.keys(req.files)) {
      let file = req.files[imageField][0];
      const res = await uploadFile(file.path);
      data[imageField] = res.secure_url;
    }

    await serviceRepository.save(data)

    return res.status(200).json({ isSuccess: true, message: "Created" });
  } catch (error) {
   
    return res
      .status(500)
      .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
};


export const getFormationServicesByPagination = async (req,res)=>{
  const a = Number(req.params.taking)
  try{
    if(!req.params.skip || !req.params.taking || isNaN(Number(req.params.skip)) || isNaN(Number(req.params.taking))){
      return res
      .status(400)
      .json({ isSuccess: false, message: "Please provide correct values for pagination. Example: /10/0. This will take 10 elements of each service, starting of id 1. You will get 40 total objects" });
    }
    const {skip, taking, type} = req.params
   
    const services = {}
    services[type] =  await servicesRespositoryMap[type].find({
      take:taking,
      skip
    })//.createQueryBuilder('courses').orderBy("courses.id").skip(Number(skip)).take(Number(taking)).execute()

    return res
    .status(200)
    .json({ isSuccess: true, message: "ok", data:services });
  }catch(error){
    return res
    .status(500)
    .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
}

export const updateFormationServices = async (req,res)=>{
  if(isNaN(Number(req.params.id))){
    return res
    .status(400)
    .json({ isSuccess: false, message: "Please provide correct values for id. Id must be a number" });
  }
  const type = req.params.type
  if(!type || !servicesRespositoryMap[type]){
    return res
    .status(400)
    .json({ isSuccess: false, message: "Please provide a valid type of course: 'course','seminar', 'workshop', 'diploma'" });
  }
  const serviceRepository = servicesRespositoryMap[type]
  try {
    const serviceRecord = await serviceRepository.findOne({where:{id:Number(req.params.id)}})
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
    await serviceRepository.save(serviceRecord)
    
    return res
    .status(200)
    .json({ isSuccess: true, message: "Service updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
}