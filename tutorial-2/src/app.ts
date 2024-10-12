import express, { Request, Response } from "express";
import connectDB from "./db.connect";
import { StudentEntity } from "./entities/student.entity";
import { AddressEntity } from "./entities/address.entity";

async function init() {
    const app = express();
    const dbSource = await connectDB();

    // Middlewares
    app.use(express.json());

    // Routes Student - Address (one to one)
    app.get("/", function (req: Request, res: Response) { res.send("Hello from express"); });
    app.get("/student", async (req: Request, res: Response): Promise<any> => {
        const studentRepo = dbSource.getRepository(StudentEntity);
        // const students = await studentRepo.find({ relations: ["address"], order: { id: "ASC" } });  // Eager loading false
        const students = await studentRepo.find({ order: { id: "ASC" } });
        return res.json(students);
    });
    app.get("/student/:id?", async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;
        const studentRepo = dbSource.getRepository(StudentEntity);
        const student = await studentRepo.findOne({ where: { id: parseInt(id) } });
        return res.json(student);
    });
    app.post("/student", async (req: Request, res: Response): Promise<any> => {
        const payload = req.body;
        const studentRepo = dbSource.getRepository(StudentEntity);

        const newAddress = new AddressEntity();
        newAddress.city = payload.address.city;
        newAddress.state = payload.address.state;
        newAddress.street = payload.address.street;
        newAddress.country = payload.address.country;
        newAddress.pincode = payload.address.pincode;

        const newStudent = new StudentEntity();
        newStudent.name = payload.name;
        newStudent.email = payload.email;
        newStudent.address = newAddress;

        const savedStudent = await studentRepo.save(newStudent);
        return res.json(savedStudent);
    });
    app.delete("/student/:id?", async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;
        const studentRepo = dbSource.getRepository(StudentEntity);
        const deletedStudent = await studentRepo.delete(id);
        return res.json(deletedStudent);
    });
    app.put("/student/:id?", async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;
        const payload = req.body;
        const studentRepo = dbSource.getRepository(StudentEntity);
        const updateStudent = await studentRepo.update(id, payload);
        return res.json(updateStudent);
    });

    // Routes Student Enrollment (one to many)
    



    // Port
    const port = 8000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
init();
