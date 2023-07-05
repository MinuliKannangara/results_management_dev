// router.get("/:year", async (req, res) => {
//     try {
//       const year = req.params.year.toString();
//       const locations = ["Minuwangoda", "Meerigama", "Divulapitiya"];
//       const subjects = [
//         "Sinhala",
//         "Religion",
//         "History",
//         "Science",
//         "English",
//         "Mathematics",
//         "Business & Accounting Studies",
//         "Geography",
//         "Civic Education",
//         "Enterpreneurship Studies",
//         "Second Language (Sinhala)",
//         "Second Language (Tamil)",
//       ];
  
//       const subjectCounts = {};
  
//       for (const location of locations) {
//         subjectCounts[location] = {};
  
//         for (const subject of subjects) {
//           const subjectCount = await getSubjectCount(location, subject, year);
//           const subjectPassCount = await getSubjectPassedCount(location, subject, year);
  
//           subjectCounts[location][subject] = {
//             satCount: subjectCount,
//             passCount: subjectPassCount,
//           };
//         }
//       }
  
//       res.json(subjectCounts);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to fetch the subject wise count." });
//     }
//   });

  

//   {
//     "Minuwangoda": {
//       "Sinhala": {
//         "satCount": 50,
//         "passCount": 40
//       },
//       "Religion": {
//         "satCount": 45,
//         "passCount": 35
//       },
//       "History": {
//         "satCount": 55,
//         "passCount": 45
//       },
//       ...
//     },
//     "Meerigama": {
//       "Sinhala": {
//         "satCount": 60,
//         "passCount": 50
//       },
//       "Religion": {
//         "satCount": 55,
//         "passCount": 45
//       },
//       "History": {
//         "satCount": 65,
//         "passCount": 55
//       },
//       ...
//     },
//     "Divulapitiya": {
//       "Sinhala": {
//         "satCount": 70,
//         "passCount": 60
//       },
//       "Religion": {
//         "satCount": 65,
//         "passCount": 55
//       },
//       "History": {
//         "satCount": 75,
//         "passCount": 65
//       },
//       ...
//     },
//     ...
//   }
  