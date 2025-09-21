// import adejumobiImage from "../assets/general_secretary1.jpeg";
// import afolayanImage from "../assets/engr_afolayan.jpeg";

// export interface Course {
//   name: string;
//   code: string;
// }

// export interface Staff {
//   name: string;
//   specialization: string;
//   office: string;
//   image: string;
//   courses: Course[];
//   file?: string; // Optional field for downloadable files
// }

// export const staffData: Staff[] = [
//     {
//         "department": "Computer Engineering",
//         "institution": "The Polytechnic, Ibadan",
//         "faculty": "Faculty of Engineering",
//         "location": "Engineering Building, 3rd and 4th floors",
//         "programmes_offered": [
//           "National Diploma (ND) in Computer Engineering Technology",
//           "Higher National Diploma (HND) in Computer Engineering Technology"
//         ],
//         "history": {
//           "start_date": "October 2009",
//           "milestones": [
//             "First batch of students admitted for ND programme in the 2009/2010 academic session",
//             "Introduction of HND programme in 2016/2017"
//           ]
//         },
//         "laboratories": [
//           "Computer Engineering Laboratory",
//           "Computer Technology Laboratory",
//           "Digital Systems and Microprocessor Laboratory",
//           "Computer Maintenance and Repair Workshop",
//           "Electronics and Telecommunication Laboratory",
//           "Measurements and Instrumentation Laboratory",
//           "Electronics Maintenance and Repairs Workshop"
//         ],
//         "staff": [
//           {
//             "name": "Engr. Adejumobi",
//             "role": "Lecturer",
//             "specialization": "Electronics and Computer Hardware Systems",
//             "courses": [
//               "Electronics I (EEC 124)",
//               "Computer Hardware System Design (CTE 321)",
//               "Introduction to Digital Signal Processing (CTE 444)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "engr_adejumobi.jpg"
//           },
//           {
//             "name": "Engr. Mrs. Afolayan",
//             "role": "Lecturer",
//             "specialization": "Electrical Engineering",
//             "courses": [
//               "Electrical Engineering Science II (EEC 125)",
//               "Electronics IV (EEC 325)",
//               "Entrepreneurship Development I (EED 326)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "engr_afolayan.jpeg"
//           },
//           {
//             "name": "Engr. Oni",
//             "role": "Lecturer",
//             "specialization": "Digital Computing and Reliability Testing",
//             "courses": [
//               "Digital Computer Fundamentals I (CTE 121)",
//               "Testing Methods and Reliability (EEC 328)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "engr_oni.jpeg"
//           },
//           {
//             "name": "Mr. Leye",
//             "role": "Lecturer",
//             "specialization": "Electrical Measurement and Telecommunications",
//             "courses": [
//               "Electrical Measurement and Instrumentation I (CTE 122)",
//               "Telecommunication Engineering (CTE 245)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "mr_leye.jpeg"
//           },
//           {
//             "name": "Miss Oyetoso",
//             "role": "Lecturer",
//             "specialization": "Entrepreneurship and Technical Writing",
//             "courses": [
//               "Introduction to Entrepreneurship (EED 126)",
//               "Technical Report Writing (CTE 124)",
//               "Operating Systems I (CTE 243)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "miss_oyetoso.jpg"
//           },
//           {
//             "name": "Engr. Omotoso",
//             "role": "Lecturer",
//             "specialization": "Maintenance, Microprocessors, and Entrepreneurship",
//             "courses": [
//               "Computer/Electronics Maintenance and Repair (CTE 123)",
//               "Introduction to Microprocessor and Assembly Language (CTE 241)",
//               "Entrepreneurship Development II (EED 426)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "engr_omotoso.jpeg"
//           },
//           {
//             "name": "Engr. O.A. Mowemi",
//             "role": "Lecturer",
//             "specialization": "Computer Programming and Project Management",
//             "courses": [
//               "Computer Programming (FORTRAN) (CTE 127)",
//               "Project Management (CTE 443)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "engr_mowemi.jpg"
//           },
//           {
//             "name": "Engr. O.A. Busari",
//             "role": "Head of Department (HOD)",
//             "specialization": "Computer Networking, Mobile and Wireless Communication, Artificial Intelligence",
//             "courses": [
//               "Computer Networking (CTE 244)",
//               "Mobile and Wireless Communication (CTE 322)",
//               "Artificial Intelligence (CTE 442)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "engr_ao_busari.jpeg"
//           },
//           {
//             "name": "Engr. Oladosu",
//             "role": "Lecturer",
//             "specialization": "Control Engineering and Digital Control",
//             "courses": [
//               "Computer Workshop Practice II (CTE 242)",
//               "Control Engineering I (EEC 324)",
//               "Digital Control (CTE 447)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "engr_oladosu.jpg"
//           },
//           {
//             "name": "Engr. (Mrs.) G.O. Fadiran",
//             "role": "Lecturer",
//             "specialization": "Python Programming and Microprocessors",
//             "courses": [
//               "Python Programming (CTE 323)",
//               "Microprocessor in Control and Instrumentation (CTE 441)"
//             ],
//             "office": "Faculty of Engineering, 3rd Floor",
//             "picture": "engr_fadiran.jpg"
//           },
//           {
//             "name": "Mr. Yusuf Afenifere",
//             "role": "PA to the HOD",
//             "specialization": "Programmer, Departmental Activities Coordinator",
//             "picture": "Mr_Yusuf_Afenifere.jpeg"
//           },
//           {
//             "name": "Mr. Akinsola Aliu Abiodun",
//             "role": "Technologist",
//             "specialization": "Laboratory Equipment Maintenance, Student Assistance",
//             "picture": "akinsola_aliu.jpg"
//           }
//         ],
//         "appointments": {
//           "HOD": "Engr. O.A. Busari",
//           "Project Coordinator": "Engr. D.A. Oladosu",
//           "Project Committee Secretary": "Engr. O.A. Mowemi",
//           "ND Coordinator": "Engr. D.D. Afolayan",
//           "HND Coordinator": "Mr. Oluleye Akanji",
//           "SIWES Coordinator": "Miss M.O. Oyetoso",
//           "PT Coordinator": "Engr. A.A. Oni",
//           "Welfare Coordinators": "Mrs. I.I. Adeaga / Engr. Omotoso",
//           "Exam Convener": "Engr. O.A. Busari",
//           "PA to the HOD": "Mr. Yusuf Afenifere"
//         },
//         "student_executives": [
//           {
//             "position": "President",
//             "name": "Com. Osuolale Mubaraq Adekunle",
//             "level": "HND 2",
//             "course": "Computer Engineering",
//             "picture": "president.jpeg"
//           },
//           {
//             "position": "Vice President",
//             "name": "Com. Yusuf Ibrahim Akorede",
//             "level": "ND 2",
//             "course": "Computer Engineering",
//             "picture": "vice_president.jpeg"
//           },
//           {
//             "position": "General Secretary 1",
//             "name": "Com. Adekunle Tobiloba Micheal",
//             "level": "HND 2",
//             "course": "Computer Engineering",
//             "picture": "general_secretary1.jpeg"
//           },
//           {
//             "position": "Assistant General Secretary",
//             "name": "Com. Damilare Temitayo Ogunwusi",
//             "level": "ND 2",
//             "course": "Computer Engineering",
//             "picture": "assistant_general_secretary.jpeg"
//           },
//           {
//             "position": "Financial Secretary 1",
//             "name": "Com. Mustapha Sofiyat Oyenike",
//             "level": "HND 2",
//             "course": "Computer Engineering",
//             "picture": "financial_secretary1.jpeg"
//           }
//         ]
//       },

//       {
//         "response": {
//           "greeting": "Welcome to the Department of Computer Engineering at The Polytechnic, Ibadan! How can I assist you today?",
//           "general_information": {
//             "department_name": "Computer Engineering",
//             "location": "4th Floor, Engineering Building",
//             "programmes": [
//               "National Diploma (ND) in Computer Engineering Technology",
//               "Higher National Diploma (HND) in Computer Engineering Technology"
//             ],
//             "history": "The department started offering ND in October 2009 and introduced the HND programme in 2016/2017."
//           },
//           "staff_information": {
//             "head_of_department": {
//               "name": "Engr. O.A. Busari",
//               "picture": "engr_ao_busari.jpeg",
//               "position": "Head of Department",
//               "specialization": "Computer Networking, Mobile and Wireless Communication, Artificial Intelligence"
//             },
//             "lecturers": [
//               {
//                 "name": "Engr. Adejumobi",
//                 "picture": "engr_adejumobi.jpg",
//                 "role": "Lecturer",
//                 "specialization": "Electronics and Computer Hardware Systems"
//               },
//               {
//                 "name": "Engr. Mrs. Afolayan",
//                 "picture": "engr_afolayan.jpeg",
//                 "role": "Lecturer",
//                 "specialization": "Electrical Engineering"
//               }
//             ]
//           },
//           "student_executives": {
//             "president": {
//               "name": "Com. Osuolale Mubaraq Adekunle",
//               "position": "President",
//               "level": "HND 2",
//               "course": "Computer Engineering",
//               "picture": "president.jpeg"
//             }
//           },
//           "laboratories": [
//             "Computer Engineering Laboratory",
//             "Digital Systems and Microprocessor Laboratory",
//             "Electronics and Telecommunication Laboratory"
//           ],
//           "appointments": {
//             "HOD": "Engr. O.A. Busari",
//             "Project Coordinator": "Engr. D.A. Oladosu"
//           }
//         }
//       },
//        {
//         "department_overview": {
//           "description": "Computer Engineering at The Polytechnic, Ibadan, is a discipline that combines principles of electrical engineering and computer science to develop, design, and maintain computer systems, hardware, and software applications. The Department of Computer Engineering offers both the National Diploma (ND) and Higher National Diploma (HND) in Computer Engineering Technology, equipping students with the technical and practical skills necessary for careers in computing and information technology.",
//           "location": {
//             "faculty": "Faculty of Engineering",
//             "faculty_floor": "Third Floor",
//             "department_floor": "Fourth (Final) Floor",
//             "image": "computer_engineering_department.jpeg"
//           },
//           "history": [
//             {
//               "event": "ND Programme Approval",
//               "details": "Received Resource Accreditation to commence ND programme in October 2009 after the 2009/2010 admission exercise."
//             },
//             {
//               "event": "First ND Admission",
//               "details": "First batch of ND students admitted for the 2009/2010 academic session."
//             },
//             {
//               "event": "ND Foundation Strengthened",
//               "details": "First set of ND students admitted for 2010/2011 session."
//             },
//             {
//               "event": "HND Programme Introduced",
//               "details": "HND programme commenced in the 2016/2017 academic session."
//             }
//           ],
//           "facilities": {
//             "general_labs": [
//               "Computer Engineering Laboratory",
//               "Computer Technology Laboratory",
//               "Digital Systems and Microprocessor Laboratory",
//               "Computer Maintenance and Repair Workshop"
//             ],
//             "specialized_labs": [
//               "Electronics and Telecommunication Laboratory",
//               "Measurements and Instrumentation Laboratory",
//               "Electronics Maintenance and Repairs Workshop"
//             ]
//           },
//           "education_approach": "The department blends theoretical instruction with practical training, preparing graduates to excel in the ever-evolving world of technology."
//         }
//       }, {
//         "academic_resources": {
//           "timetable": {
//             "session": "2024/2025",
//             "description": "The Computer Engineering Department has released the official timetable for the 2024/2025 academic session, covering ND1, ND2, HND1, and HND2 levels. Each level has specific days and times for lectures, practical sessions, and elective courses, structured to avoid timetable clashes.",
//             "student_guidelines": [
//               "Familiarize yourself with lecture hall and laboratory locations.",
//               "Maintain at least 75% attendance to be eligible for exams.",
//               "Practical classes are compulsory, some requiring group attendance.",
//               "Arrive at least 10 minutes before lectures begin.",
//               "Check notice boards or contact class reps for updates regularly.",
//               "Download or print your timetable and set reminders for classes."
//             ],
//             "downloads": {
//               "ND1": "📥 Download ND1 Timetable",
//               "ND2": "📥 Download ND2 Timetable",
//               "HND1": "📥 Download HND1 Timetable",
//               "HND2": "📥 Download HND2 Timetable"
//             }
//           },
//           "past_questions": {
//             "announcement": "Past questions for ND1, ND2, HND1, and HND2 are now available for download! These resources cover a wide range of courses and help students prepare effectively for upcoming exams.",
//             "benefits": [
//               "Understand exam formats and repeated questions.",
//               "Test knowledge and identify areas for improvement.",
//               "Strengthen revision and boost confidence.",
//               "Encourage early preparation for better academic performance."
//             ],
//             "downloads": {
//               "ND1": "📥 ND1_PASTQUESTION.JPEG",
//               "ND2": "📥 ND2_PASTQUESTION.JPEG",
//               "HND1": "📥 HND1_PASTQUESTION.JPEG",
//               "HND2": "📥 HND2_PASTQUESTION.JPEG"
//             },
//             "encouragement": "Take charge of your academic journey. Your future as a great Computer Engineer starts now—prepare smart and aim high!"
//           }
//         }
//       }
      
      
      
      
// ];




// import { staffData } from "../data/staffData";

// import Fuse from "fuse.js";


// export interface BotReply {
//   message: string;
//   image?: string;
//   file?: string;
//   highlight?: string[];
// }

// export function getBotReply(userMessage: string): BotReply {
//   const lower = userMessage.toLowerCase();

//   const fuseOptions = {
//     includeScore: true,
//     threshold: 0.3,
//     keys: ["name", "specialization", "courses.name", "courses.code"],
//   };

//   const fuse = new Fuse(staffData, fuseOptions);
//   const results = fuse.search(userMessage);

//   // ✅ Match all relevant courses by code or name
//   const matchedCourses: { title: string; code: string; staff: string }[] = [];
//   const highlightItems: string[] = [];

//   for (const staff of staffData) {
//     for (const course of staff.courses) {
//       if (
//         course.code.toLowerCase().includes(lower) ||
//         course.name.toLowerCase().includes(lower)
//       ) {
//         matchedCourses.push({
//           title: course.name,
//           code: course.code,
//           staff: staff.name,
//         });
//         highlightItems.push(course.name, staff.name);
//       }
//     }
//   }

//   if (matchedCourses.length > 0) {
//     return {
//       message:
//         `📘 Courses matching "<strong>${userMessage}</strong>":<br/><br/>` +
//         matchedCourses
//           .map(
//             (c) =>
//               `✅ <mark class="highlight-keyword" role="button">${c.title}</mark> (${c.code})<br/>
//                👨‍🏫 Taught by <mark class="highlight-keyword" role="button">${c.staff}</mark><br/><br/>`
//           )
//           .join(""),
//       highlight: [...new Set(highlightItems)],
//     };
//   }

//   // ✅ Fallback to best match (name or course)
//   if (results.length > 0) {
//     const bestMatch = results[0].item;

//     if (bestMatch.name.toLowerCase() === lower) {
//       return {
//         message: `
//           👨‍🏫 <strong>${bestMatch.name}</strong> specializes in <em>${bestMatch.specialization}</em>.<br/>
//           📘 Courses: ${bestMatch.courses
//             .map(
//               (c) =>
//                 `<mark class="highlight-keyword">${c.name}</mark> (${c.code})`
//             )
//             .join(", ")}<br/>
//           🏢 Office: ${bestMatch.office}<br/>
//           ${
//             bestMatch.file
//               ? `📎 <a href="${bestMatch.file}" download>Download file</a>`
//               : ""
//           }
//         `,
//         image: bestMatch.image,
//         file: bestMatch.file,
//         highlight: [bestMatch.name, ...bestMatch.courses.map((c) => c.name)],
//       };
//     }

//     for (let course of bestMatch.courses) {
//       if (
//         lower.includes(course.name.toLowerCase()) ||
//         lower.includes(course.code.toLowerCase())
//       ) {
//         return {
//           message: `
//             📘 <strong>${course.name}</strong> (${course.code})<br/>
//             👨‍🏫 Taught by <mark class="highlight-keyword">${bestMatch.name}</mark><br/>
//             🏢 Office: ${bestMatch.office}<br/>
//             ${
//               bestMatch.file
//                 ? `📎 <a href="${bestMatch.file}" download>Download file</a>`
//                 : ""
//             }
//           `,
//           image: bestMatch.image,
//           file: bestMatch.file,
//           highlight: [course.name, bestMatch.name],
//         };
//       }
//     }

//     return {
//       message: `🔍 Did you mean: <mark class="highlight-keyword" role="button">${bestMatch.name}</mark>?`,
//       highlight: [bestMatch.name],
//     };
//   }

//   return {
//     message: "❌ No matching results found.",
//   };
// }
