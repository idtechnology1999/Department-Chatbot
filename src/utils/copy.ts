import { staffData } from "../data/staffData";
import  departmentAppointment  from "../data/departmentAppointment"; // Import department info
import { DepartmentInfo } from "../data/departmentInfo";

import Fuse, { FuseResult } from "fuse.js";


export interface BotReply {
  message: string;
  image?: string;
  file?: string;
  highlight?: string[];
}

export function getBotReply(userMessage: string): BotReply {
  const lower = userMessage.toLowerCase();

  const fuseOptions = {
    includeScore: true,
    threshold: 0.3,
    keys: ["name", "specialization", "courses.name", "courses.code"],
  };

  const fuse = new Fuse(staffData, fuseOptions);
  const results = fuse.search(userMessage);

  // ✅ Match all relevant courses by code or name
  const matchedCourses: {
    title: string;
    code: string;
    staff: string;
    office?: string;
    file?: string;
    image?: string;
  }[] = [];
  const highlightItems: string[] = [];

  for (const staff of staffData) {
    for (const course of staff.courses) {
      if (
        course.code.toLowerCase().includes(lower) ||
        course.name.toLowerCase().includes(lower)
      ) {
        matchedCourses.push({
          title: course.name,
          code: course.code,
          staff: staff.name,
          office: staff.office,
          file: staff.file,
          image: staff.image,
        });
        highlightItems.push(course.name, staff.name);
      }
    }
  }

  // ✅ If multiple matches found (by course name/code)
  if (matchedCourses.length > 0) {
    return {
      message:
        `📘 Courses matching "<strong>${userMessage}</strong>":<br/><br/>` +
        matchedCourses
          .map(
            (c) =>
              `✅ <mark class="highlight-keyword" role="button">${c.title}</mark> (${c.code})<br/>
               👨‍🏫 Taught by <mark class="highlight-keyword" role="button">${c.staff}</mark><br/>
               🏢 Office: ${c.office ?? "N/A"}<br/>
               ${
                 c.file
                   ? `📎 <a href="${c.file}" download>Download file</a><br/>`
                   : ""
               }<br/>`
          )
          .join(""),
      highlight: [...new Set(highlightItems)],
    };
  }

  // ✅ Fallback to best match (name or course via Fuse.js)
  if (results.length > 0) {
    const bestMatch = results[0].item;

    // Direct staff name match
    if (bestMatch.name.toLowerCase() === lower) {
      return {
        message: `
          👨‍🏫 <strong>${bestMatch.name}</strong> specializes in <em>${bestMatch.specialization}</em>.<br/>
          📘 Courses: ${bestMatch.courses
            .map(
              (c) =>
                `<mark class="highlight-keyword">${c.name}</mark> (${c.code})`
            )
            .join(", ")}<br/>
          🏢 Office: ${bestMatch.office}<br/>
          ${
            bestMatch.file
              ? `📎 <a href="${bestMatch.file}" download>Download file</a>`
              : ""
          }
        `,
        image: bestMatch.image,
        file: bestMatch.file,
        highlight: [bestMatch.name, ...bestMatch.courses.map((c) => c.name)],
      };
    }

    // Course name/code match from best match
    for (let course of bestMatch.courses) {
      if (
        lower.includes(course.name.toLowerCase()) ||
        lower.includes(course.code.toLowerCase())
      ) {
        return {
          message: `📘 <strong>${course.name}</strong> (${course.code})<br/>
            👨‍🏫 Taught by <mark class="highlight-keyword">${bestMatch.name}</mark><br/>
            🏢 Office: ${bestMatch.office}<br/>
            ${
              bestMatch.file
                ? `📎 <a href="${bestMatch.file}" download>Download file</a>`
                : ""
            }
          `,
          image: bestMatch.image,
          file: bestMatch.file,
          highlight: [course.name, bestMatch.name],
        };
      }
    }

    // Fuzzy name fallback
    return {
      message: `🔍 Did you mean: <mark class="highlight-keyword" role="button">${bestMatch.name}</mark>?`,
      highlight: [bestMatch.name],
    };
  }






// --- Department Info Handling ---
const appointmentFuse = new Fuse(departmentAppointment.departmentAppointments, {
    keys: ["position", "name"],
    includeScore: true,
    threshold: 0.4,
  });
  
  // Match department appointment queries
  const appointmentResults = appointmentFuse.search(userMessage);
  
  if (appointmentResults.length > 0) {
    const best = appointmentResults[0].item;
  
    // Try to find picture from staffData
    const matchingStaff = staffData.find(
      (s) => s.name.toLowerCase() === best.name.toLowerCase()
    );
  
    return {
      message: `🧑‍💼 <strong>${best.position}</strong> is held by 
        <mark class="highlight-keyword" role="button">${best.name}</mark>.`,
      image: matchingStaff?.image,
      highlight: [best.name, best.position],
    };
  }
  
  // Fuzzy name fallback (if no exact match)
  const bestMatch = appointmentResults.length > 0 ? appointmentResults[0].item : null;
  if (bestMatch) {
    return {
      message: `🔍 Did you mean: <mark class="highlight-keyword" role="button">${bestMatch.name}</mark>?<br/>Please confirm.`,
      highlight: [bestMatch.name],
    };
  }
  
  // If user says "department appointments", list all
  if (
    lower.includes("department appointments") ||
    lower.includes("appointments in department")
  ) {
    return {
      message:
        `📅 Here are the department appointments:<br/>` +
        departmentAppointment.departmentAppointments
          .map(
            (appointment) =>
              `👨‍🏫 <mark class="highlight-keyword" role="button">${appointment.name}</mark> - ${appointment.position}<br/>`
          )
          .join(""),
      highlight: departmentAppointment.departmentAppointments.map((a) => a.name),
    };
  }
  

  
  // --- Student Executives Handling ---
  const studentExecFuse = new Fuse(departmentAppointment.studentExecutives, {
    keys: ["name", "position", "course"],
    includeScore: true,
    threshold: 0.4,
  });
  
  // Match student executive queries
  const studentExecResults = studentExecFuse.search(userMessage);
  
  if (studentExecResults.length > 0) {
    const bestExec = studentExecResults[0].item;
  
    return {
      message: `👤 <strong>${bestExec.position}</strong> is held by 
        <mark class="highlight-keyword" role="button">${bestExec.name}</mark>.<br/>
        📚 Course: ${bestExec.course}<br/>
        🎓 Level: ${bestExec.level}<br/>
        📜 Functions: ${bestExec.functions}`,
      image: bestExec.picture,
      highlight: [bestExec.name, bestExec.position],
    };
  }
  
  // Fuzzy name fallback (if no exact match)
  const bestExecMatch = studentExecResults.length > 0 ? studentExecResults[0].item : null;
  if (bestExecMatch) {
    return {
      message: `🔍 Did you mean: <mark class="highlight-keyword" role="button">${bestExecMatch.name}</mark>?<br/>Please confirm.`,
      highlight: [bestExecMatch.name],
    };
  }
  
  // If user says "student executives", list all
  if (
    lower.includes("student executives") ||
    lower.includes("executives in department")
  ) {
    return {
      message:
        `👥 Here are the student executives:<br/>` +
        departmentAppointment.studentExecutives
          .map(
            (exec) =>
              `👤 <mark class="highlight-keyword" role="button">${exec.name}</mark> - ${exec.position}<br/>`
          )
          .join(""),
      highlight: departmentAppointment.studentExecutives.map((e) => e.name),
    };
  }
  
 // --- Academic Timetable ---
 const timetableKeywords = ["academic timetable", "class timetable", "lecture timetable", "timetable"];
 const fuseTimetable = new Fuse(timetableKeywords, { threshold: 0.4 });

 if (fuseTimetable.search(lower).length > 0) {
   return {
     message: `🗓️ Here is the departmental academic timetable:<br/>` +
       departmentAppointment.academicInfo.timetable.description +
       "<br/><br/>" +
       departmentAppointment.academicInfo.timetable.downloads
         .map(timetable => `📥 <a href="${timetable.link}" download>Download ${timetable.level} timetable</a><br/>`)
         .join(""),
   };
 }

 // --- Past Questions ---
 const pastQKeywords = ["past questions", "exam questions", "previous questions", "past exams"];
 const fusePastQ = new Fuse(pastQKeywords, { threshold: 0.4 });

 if (fusePastQ.search(lower).length > 0) {
   return {
     message: `📚 Here are the past questions for exam preparation:<br/>` +
       departmentAppointment.academicInfo.pastQuestions.announcement +
       "<br/><br/>" +
       departmentAppointment.academicInfo.pastQuestions.benefits +
       "<br/><br/>" +
       departmentAppointment.academicInfo.pastQuestions.downloads
         .map(pastQ => `📥 <a href="${pastQ.file}" download>Download ${pastQ.level} past questions</a><br/>`)
         .join(""),
   };
 }

 // --- Grade Point Calculation ---
 const gpKeywords = ["grade point", "gp calculation", "gpa", "calculate gp", "grade calculation"];
 const fuseGP = new Fuse(gpKeywords, { threshold: 0.4 });

 if (fuseGP.search(lower).length > 0) {
   const gpData = departmentAppointment.academicInfo.gradePointCalculation;
   return {
     message: `
       📊 <strong>Grade Point (GP) Calculation:</strong><br/><br/>
       ${gpData.description}<br/><br/>
       <strong>Steps:</strong><br/>
       ${gpData.steps.map((step) => `🔹 ${step}<br/>`).join("")}<br/>
       
       <strong>Grading Scale:</strong><br/>
       <table border="1" cellpadding="5" cellspacing="0">
         <thead>
           <tr><th>Grade</th><th>Mark Range</th><th>Grade Point</th></tr>
         </thead>
         <tbody>
           ${gpData.gradingScale
             .map(scale => `<tr><td>${scale.grade}</td><td>${scale.markRange}</td><td>${scale.gradePoint}</td></tr>`)
             .join("")}
         </tbody>
       </table><br/>
       <strong>Example Calculation:</strong><br/>
       ${gpData.example.description}<br/><br/>
       <table border="1" cellpadding="5" cellspacing="0">
         <thead>
           <tr><th>Course</th><th>Grade</th><th>Credit Unit</th><th>Grade Point</th><th>Total Grade Points</th></tr>
         </thead>
         <tbody>
           ${gpData.example.table
             .map(row => `<tr>
                           <td>${row.course}</td>
                           <td>${row.grade}</td>
                           <td>${row.creditUnit}</td>
                           <td>${row.gradePoint}</td>
                           <td>${row.totalGradePoints}</td>
                         </tr>`)
             .join("")}
         </tbody>
       </table><br/>
       <strong>Calculation Steps:</strong>
       <ol>
         ${gpData.example.calculationSteps.map((step) => `<li>${step}</li>`).join("")}
       </ol>
       <strong>Final GP:</strong> ${gpData.example.finalGP}
     `,
   };
 }


 
// --- Computer Engineering Department Info ---


const computerEngKeywords: string[] = [
  "computer engineering",
  "computer engineering department",
  "computer engineering info",
  "poly ibadan computer engineering",
  "engineering faculty",
  "computer department",
  "department",
  "computer",
  "history",
  "hi"
];

const fuseComputerEng = new Fuse<string>(computerEngKeywords, { threshold: 0.4 });

// Assume `lower` is the user query, lowercased
const searchResults: FuseResult<string>[] = fuseComputerEng.search(lower);

if (searchResults.length > 0) {
  const compEng = departmentAppointment.computerEngineeringInfo;

  const highlightedTerms = searchResults.map(res => res.item);

  // ✅ Add a type for the parameter `text`
  function highlightClickableWords(text: string): string {
    highlightedTerms.forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, "gi");
      text = text.replace(
        regex,
        `<span style="color:blue; text-decoration:underline; cursor:pointer;" onclick="handleSearchClick('$1')">$1</span>`
      );
    });
    return text;
  }

  const description = highlightClickableWords(compEng.description);
  const practicalTraining = highlightClickableWords(compEng.practicalTraining);

  return {
    message: `
         <img src="${compEng.image}" alt="Computer Engineering Department" class="img-fluid mt-3 rounded shadow-sm" />
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 1rem; text-align: justify; line-height: 1.6;">
        <h5><i class="bi bi-building"></i> <strong>Department of ${compEng.department}</strong></h5>
        <p><i class="bi bi-mortarboard"></i> <strong>Institution:</strong> ${compEng.institution}</p>
        <p><i class="bi bi-diagram-3"></i> <strong>Faculty:</strong> ${compEng.facultyDetails.name}</p>
        <p><i class="bi bi-geo-alt"></i> <strong>Building:</strong> ${compEng.facultyDetails.building}</p>
        <p><i class="bi bi-map"></i> <strong>Department Location:</strong> ${compEng.facultyDetails.departmentLocation}</p>
  
        <h5 class="mt-4"><i class="bi bi-info-circle"></i> <strong>About the Department:</strong></h5>
        <p>${description}</p>
  
        <h5 class="mt-4"><i class="bi bi-clock-history"></i> <strong>History:</strong></h5>
        <ul>
          ${compEng.history.map((item: string) => `<li>${highlightClickableWords(item)}</li>`).join("")}
        </ul>
  
        <h5 class="mt-4"><i class="bi bi-cpu"></i> <strong>Laboratories & Facilities:</strong></h5>
        <ul>
          ${compEng.facilities.map((facility: any) => 
            `<li><strong>${highlightClickableWords(facility.name)}</strong> (${facility.type})</li>`).join("")}
        </ul>
  
        <h5 class="mt-4"><i class="bi bi-tools"></i> <strong>Practical Training:</strong></h5>
        <p>${practicalTraining}</p>
  
      </div>
    `
  };
  
}



const byuser: string[] = [
  "you",
  "how are u",
  "how are you",
  "who are u",
  "who are you",
  "who are",
  "hay",
  "hi",
  "hello",
  "what's your name",
  "what are you",
  "tell me about yourself",
  "what can you do",
  "hey",
  "yo",
  "sup",
  "what's up",
  "howdy",
  "greetings",
];

const responses: string[] = [
  `🤖 I'm your friendly Computer Engineering chatbot! Would you like to know about our <span class="clickable" data-msg="lecturer">lecturer</span>?`,
  `👋 Hello! I’m the Computer Engineering assistant bot. Curious about any <span class="clickable" data-msg="lecturer">lecturer</span>?`,
  `💬 Hi there! I'm here to help with Computer Engineering info. Ask me about a <span class="clickable" data-msg="lecturer">lecturer</span>.`,
  `🧠 I'm a smart bot built to assist you with department stuff. Click <span class="clickable" data-msg="lecturer">lecturer</span> to learn more.`,
  `💡 Computer Engineering chatbot at your service! Want to know about a <span class="clickable" data-msg="lecturer">lecturer</span>?`
];

const fusebyuser = new Fuse<string>(byuser, { threshold: 0.4 });
const Resultsuser = fusebyuser.search(lower);

if (Resultsuser.length > 0) {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return {
    message: responses[randomIndex]
  };
}



  // No matches at all
  return {
    message: "❌ No matching results found.",
  };
}


