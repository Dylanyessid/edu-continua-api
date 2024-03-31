import { dataSource } from "../../db.js"

export const createNewCourse = async(req,res)=>{
    console.log(req.body.type)
    
    const courseRepository = dataSource.getRepository("Course")
    let data = {
        name:"Hola",
        general_info:"Hola",
        syllabus:"",
        hours:20,
        exhibitor_name:"Juan Carlos Montes",
        exhibitor_photo:"www",
        organized_by:"sadsad",
        supported_by_name:"PYGLO",
        supported_by_photo:"www",
        cost:2500000,
        discounts:"30% Egresados",
        inscription_url:"www"

    }
    await courseRepository.save(data)

    return res.status(200).json("ok")
}