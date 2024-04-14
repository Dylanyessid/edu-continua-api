import { dataSource } from "../../db.js";
import { uploadFile } from "../services/cloudinary.js";

export const createNewCourse = async (req, res) => {
  console.log(req.body);
  const courseRepository = dataSource.getRepository("Course");
  try {
    let data = {
      name: req.body.name,
      general_info: req.body.general_info,
      syllabus: "",
      hours: 20,
      exhibitor_name: "Juan Carlos Montes",
      organized_by: "sadsad",
      supported_by_name: "PYGLO",
      supported_by_photo: "www",
      cost: 2500000,
      discounts: "30% Egresados",
      inscription_url: "www",
    };

    for (const imageField of Object.keys(req.files)) {
      let file = req.files[imageField][0];
      const res = await uploadFile(file.path);
      data[imageField] = res.secure_url;
    }

    //await courseRepository.save(data)

    return res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
};
