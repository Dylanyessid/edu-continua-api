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
