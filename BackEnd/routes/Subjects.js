const express =require("express");
const router = express.Router();
const {Subject,SubjectCategory,SubjectResults,Student, users} =require("../models");


router.post("/", async (req, res) => {
    const subject = req.body;
    const createSubject = await Subject.create(subject);
    res.json(createSubject);
  });

  router.post("/subjectCategory", async (req, res) => {
    const subjectCategory = req.body;
    const createSubjectCategory = await SubjectCategory.create(subjectCategory);
    res.json(createSubjectCategory);
  });


  router.get("/subjectLists", async (req,res) =>{
    const grd6_9subjectList = await Subject.findAll({
      attributes:['subject'],
      include:{
        attributes:[],
        model:SubjectCategory,
        where:{
          name:'grade 6-9'
        }
      }
    });
    const OLsubjectList = await Subject.findAll({
      attributes:['subject'],
      include:{
        attributes:[],
        model:SubjectCategory,
        where:{
          name:'O/L'
        }
      }
    });
    const ALsubjectList = await Subject.findAll({
      attributes:['subject'],
      include:{
        attributes:[],
        model:SubjectCategory,
        where:{
          name:'A/L'
        }
      }
    });
    res.json({grd6_9subjectList,OLsubjectList,ALsubjectList});
  })


  // router.post("/SubjectResults", async (req, res) =>{
  //   const subjectResults = req.body;
  //   const createSubjectResults = await SubjectResults.create(subjectResults);
  //   res.json(createSubjectResults);
  // })

  // router.put("/SubjectResults", async (req, res) => {
  //   const subjectResults = req.body;
  //   const updateSubjectResults = await SubjectResults.update(subjectResults, {
  //     where: { 
  //       student_ID: subjectResults.student_ID,
  //       subject_ID: subjectResults.subject_ID,
  //       year: subjectResults.year,
  //       term: subjectResults.term,
  //     },
  //   });
  //   res.json(updateSubjectResults);
  // });


  router.post("/SubjectResults", async (req, res) =>{
    try{
      const subjectResults = req.body;

    const existingRecord = await SubjectResults.findOne({
      where: {
        student_ID: subjectResults.student_ID,
        subject_ID: subjectResults.subject_ID,
        year: subjectResults.year,
        term: subjectResults.term,
      },
    });

    if (existingRecord) {
      // Update the marks for the existing record
     const updatedResults= await SubjectResults.update(
        
          {marks:subjectResults.marks}
        ,
        {
          where: {
            student_ID: subjectResults.student_ID,
            subject_ID: subjectResults.subject_ID,
            year: subjectResults.year,
            term: subjectResults.term,
          },
        }
      );
      res.json(updatedResults);
      } else{
        const createSubjectResults = await SubjectResults.create(subjectResults);
        res.json(createSubjectResults);
      }
    }catch(error){
      console.error(error);
      res.status(500).json(error.message);
    }
  })


 //used for the manage the subject results page


 // Function to get the subject results of each student for each subject
 const getSubjectResults = async (studentID, subjectName, year, term) => {
   const subjectResults = await SubjectResults.findAll({
     attributes: ['marks'],
     include: [
       {
         model: Student,
         where: {
           student_ID: studentID,
         },
       },
       {
         model: Subject,
         where: {
           subject: subjectName,
         },
       },
     ],
     where: {
       year: year,
       term: term,
       student_ID: studentID,
     },
   });
 
   return subjectResults.map((result) => result.marks);
 };
 
 router.get("/SubjectDetails/:year/:className/:userName/:selectedSubject/:term", async (req, res) => {
   try {
     const user = await users.findOne({
       where: {
         username: req.params.userName,
       },
     });
 
     const listOfStudents = await Student.findAll({
       attributes: ['student_ID', 'index_number', 'student_name'],
       where: {
         class_name: req.params.className,
         school_ID: user.school_ID,
         year: req.params.year,
       },
     });
 
     let studentData = [];
 
     if (listOfStudents.length === 0) {
       studentData = [];
     } else {
       studentData = listOfStudents.map((student) => ({
         student_ID: student.student_ID,
         index_number: student.index_number,
         student_name: student.student_name,
       }));
     }
 
     const subjectResults = {};
 
     for (const student of studentData) {
       subjectResults[student.student_ID] = await getSubjectResults(
         student.student_ID,
         req.params.selectedSubject,
         req.params.year,
         req.params.term
       );
     }
 
     const grade = parseInt(req.params.className.match(/\d+/)[0]);
 
     let category;
     if (grade >= 6 && grade <= 9) {
       category = "grade 6-9";
     } else if (grade >= 10 && grade <= 11) {
       category = "O/L";
     } else {
       category = "A/L";
     }
 
     const listOfSubjects = await Subject.findAll({
       attributes: ['subject_ID','subject'],
       include: [
         {
           model: SubjectCategory,
           where: {
             name: category,
           },
         },
       ],
     });
 
    
 
     const listOfClasses = await Student.findAll({
       attributes: ['class_name'],
       where: {
         school_ID: user.school_ID,
       },
     });
 
     res.json({
       studentNames: listOfStudents,
       subjectNames: listOfSubjects.map((subject) => ({ subject: subject.subject, subject_ID: subject.subject_ID })),
       classes: listOfClasses,
       subjectResults: subjectResults,
     
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Failed to fetch the data" });
   }
 });
 





module.exports = router;