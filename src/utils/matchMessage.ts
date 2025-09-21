import { staffData } from "../data/staffData";
import  departmentAppointment  from "../data/departmentAppointment"; // Import department info
import Fuse, { FuseResult } from "fuse.js"
// import { useEffect } from "react";

// Interface for bot replies

  
export interface BotReply {
  message: string;
  image?: string;
  file?: string;
  highlight?: string[];
  quickReplies?: string[];
}

export function getBotReply(userMessage: string): BotReply {
  // --- Preprocessing Utilities ---
const titleStripRegex = /\b(who is|tell me about|what does|who teaches|lecturer|where is|instructor|prof\.?|mr\.?|mrs\.?|ms\.?|dr\.?|engr\.?|engineer|professor|about|office of|does)\b/gi;

function extractPossibleName(msg: string): string {
  return msg
    .toLowerCase()
    .replace(titleStripRegex, "")
    .replace(/[^\w\s\-']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const lower = userMessage.toLowerCase();
const cleanedQueryresult = extractPossibleName(userMessage);

const fuseOptions = {
  includeScore: true,
  threshold: 0.3,
  keys: ["name", "specialization", "courses.name", "courses.code"],
};

const fuse = new Fuse(staffData, fuseOptions);
const results = fuse.search(userMessage);

// 🔎 Optional name-specific fuzzy search fallback
const nameFuses = new Fuse(staffData, { keys: ["name"], threshold: 0.4 });
const nameResults = nameFuses.search(cleanedQueryresult);




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
  if (
    bestMatch.name.toLowerCase() === lower ||
    bestMatch.name.toLowerCase().includes(cleanedQueryresult)
  ) {
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

// ✅ Final fallback: if only a name match exists
if (nameResults.length > 0) {
  const guessedStaff = nameResults[0].item;
  return {
    message: `
      👨‍🏫 <strong>${guessedStaff.name}</strong> specializes in <em>${guessedStaff.specialization}</em>.<br/>
      📘 Courses: ${guessedStaff.courses
        .map(
          (c) =>
            `<mark class="highlight-keyword">${c.name}</mark> (${c.code})`
        )
        .join(", ")}<br/>
      🏢 Office: ${guessedStaff.office}<br/>
      ${
        guessedStaff.file
          ? `📎 <a href="${guessedStaff.file}" download>Download file</a>`
          : ""
      }
    `,
    image: guessedStaff.image,
    file: guessedStaff.file,
    highlight: [guessedStaff.name, ...guessedStaff.courses.map((c) => c.name)],
  };
}




// --- Preprocessing Utilities ---

const synonymMap: Record<string, string> = {
  "hod": "Head of Department",
  "h.o.d": "Head of Department",
  "head of dept": "Head of Department",
  "head of the department": "Head of Department",
  "nd coordinator": "ND Coordinator",
  "nd coord": "ND Coordinator",
  "hnd coordinator": "HND Coordinator",
  "hnd coord": "HND Coordinator",
  "siwes coordinator": "SIWES Coordinator",
  "siwes": "SIWES Coordinator",
  "project convener": "Project Convener",
  "welfare": "Welfare Coordinator",
  "exam convener": "Exam Convener",
  "exam officer": "Exam Convener",
  "project secretary": "Project Committee Secretary",
  "secretary": "Project Committee Secretary",
  "p.a": "P.A. to the Head of Department",
  "personal assistant": "P.A. to the Head of Department",
  "assistant to hod": "P.A. to the Head of Department",
};

function normalizeQuery(input: string): string {
  let lower = input.toLowerCase();
  for (const key in synonymMap) {
    if (lower.includes(key)) {
      const pattern = new RegExp(key, "gi");
      lower = lower.replace(pattern, synonymMap[key].toLowerCase());
    }
  }
  return lower;
}

// --- Section Map for Categorization ---
const positionSectionMap: Record<string, string> = {
  "Head of Department": "Administration",
  "P.A. to the Head of Department": "Administration",
  "Welfare Coordinator": "Administration",
  "ND Coordinator": "Academics",
  "HND Coordinator": "Academics",
  "SIWES Coordinator": "Academics",
  "Exam Convener": "Examinations",
  "Project Convener": "Projects/Research",
  "Project Committee Secretary": "Projects/Research",
};

// --- Utilities ---
function getAllRolesByName(name: string) {
  return departmentAppointment.departmentAppointments
    .filter((entry) => entry.name.toLowerCase() === name.toLowerCase())
    .map((r) => r.position);
}

function groupAppointmentsBySection(appointments: typeof departmentAppointment.departmentAppointments) {
  const grouped: Record<string, { name: string; position: string }[]> = {};
  appointments.forEach((entry) => {
    const section = positionSectionMap[entry.position] || "Others";
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push({ name: entry.name, position: entry.position });
  });
  return grouped;
}

// --- Department Appointment Search ---

const cleanedQuery = normalizeQuery(userMessage);

// --- Detect "list all" queries ---
const listAllKeywords = [
  "list all", "all staff", "who are the staff", "everyone in the department",
  "staff list", "department appointments", "appointments list", "full list of staff"
];
const listAllFuse = new Fuse(listAllKeywords, { threshold: 0.4 });

if (listAllFuse.search(userMessage.toLowerCase()).length > 0) {
  const grouped = groupAppointmentsBySection(departmentAppointment.departmentAppointments);
  let message = `📋 <strong>Department Appointments:</strong><br/>`;

  for (const section in grouped) {
    message += `<br/><u>${section}</u><br/>`;
    grouped[section].forEach((item) => {
      message += `• <strong>${item.position}</strong>: <mark class="highlight-keyword" role="button">${item.name}</mark><br/>`;
    });
  }

  return {
    message,
    highlight: departmentAppointment.departmentAppointments.map((a) => a.name),
    quickReplies: [`Who is the Head of Department?`, `What does the Project Convener do?`],
  };
}

// --- Fuzzy Matching Setup ---

const appointmentFuse = new Fuse(departmentAppointment.departmentAppointments, {
  keys: ["position", "name"],
  includeScore: true,
  threshold: 0.4,
});

const nameFuse = new Fuse(departmentAppointment.departmentAppointments, {
  keys: ["name"],
  includeScore: true,
  threshold: 0.3,
});

const positionOnlyFuse = new Fuse(departmentAppointment.departmentAppointments, {
  keys: ["position"],
  includeScore: true,
  threshold: 0.4,
});

// --- Primary Match by name or position ---
const appointmentResults = appointmentFuse.search(cleanedQuery);
if (appointmentResults.length > 0) {
  const best = appointmentResults[0].item;
  const allPositions = getAllRolesByName(best.name);
  const matchingStaff = staffData.find(s => s.name.toLowerCase() === best.name.toLowerCase());

  return {
    message: `🧑‍💼 <mark class="highlight-keyword" role="button">${best.name}</mark> holds the following role(s): <strong>${allPositions.join(", ")}</strong>.`,
    image: matchingStaff?.image,
    highlight: [best.name, ...allPositions],
  };
}

// --- Secondary Match by name ---
const nameResult = nameFuse.search(userMessage);
if (nameResult.length > 0) {
  const best = nameResult[0].item;
  const allPositions = getAllRolesByName(best.name);
  const matchingStaff = staffData.find(s => s.name.toLowerCase() === best.name.toLowerCase());

  return {
    message: `👤 <mark class="highlight-keyword" role="button">${best.name}</mark> holds the following role(s): <strong>${allPositions.join(", ")}</strong>.`,
    image: matchingStaff?.image,
    highlight: [best.name, ...allPositions],
    quickReplies: [`Tell me more about ${best.name}`],
  };
}

// --- Fallback: Try original query if cleaned failed ---
if (cleanedQuery !== userMessage) {
  const fallbackResults = appointmentFuse.search(userMessage);
  if (fallbackResults.length > 0) {
    const bestMatch = fallbackResults[0].item;
    const allPositions = getAllRolesByName(bestMatch.name);

    return {
      message: `🔍 Did you mean <strong>${bestMatch.name}</strong> who holds: <strong>${allPositions.join(", ")}</strong>?`,
      highlight: [bestMatch.name, ...allPositions],
      quickReplies: [
        `Who is the ${bestMatch.position}?`,
        `Tell me about ${bestMatch.name}`,
      ],
    };
  }
}

// --- Final Attempt: Match by position only ---
const positionResults = positionOnlyFuse.search(cleanedQuery);
if (positionResults.length > 0) {
  const best = positionResults[0].item;
  const allPositions = getAllRolesByName(best.name);
  const matchedStaff = staffData.find(s => s.name.toLowerCase() === best.name.toLowerCase());

  return {
    message: `📌 <strong>${best.position}</strong> is held by <mark class="highlight-keyword" role="button">${best.name}</mark>, who also holds: <strong>${allPositions.join(", ")}</strong>.`,
    image: matchedStaff?.image,
    highlight: [best.name, ...allPositions],
    quickReplies: [
      `Tell me more about ${best.name}`,
      `Who else is in the department?`,
    ],
  };
}




// --- Department Appointment List Handling ---

if (
  lower.includes("department appointments") ||
  lower.includes("appointments in department") ||
  lower.includes("appointment with department") ||
  lower.includes("book appointment with department") ||
  lower.includes("department meeting") ||
  lower.includes("schedule department appointment") ||
  lower.includes("schedule an appointment in the department") ||
  lower.includes("how to book an appointment with department") ||
  lower.includes("department office hours") ||
  lower.includes("when can I meet with department") ||
  lower.includes("department consultation") ||
  lower.includes("meeting with department") ||
  lower.includes("appointment with faculty") ||
  lower.includes("schedule appointment with faculty") ||
  lower.includes("department availability") ||
  lower.includes("faculty appointment") ||
  lower.includes("appointment schedule department") ||
  lower.includes("lecturer executive") ||
  lower.includes("how can I book an appointment with department") ||
  lower.includes("is there any department appointment")
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
    quickReplies: [
      "Who is the Head of Department?",
      "Who coordinates SIWES?",
      "Who is the ND Coordinator?",
    ],
  };
}

// --- Student Executives Handling ---

if (departmentAppointment.studentExecutives) {
  // Step 1: Normalize and preprocess user input
  const normalizeText = (text: string) =>
    text.toLowerCase().replace(/[^\w\s]/gi, '').trim();

  const preprocessMessage = (message: string): string => {
    const synonymMap: Record<string, string> = {
      "rep": "representative",
      "sec": "secretary",
      "class rep": "class representative",
      "pres": "president",
      "leader": "president",
      "head of class": "class representative",
      "speaker": "secretary",
      "assistant": "vice president",
      "number two": "vice president",
    };

    let normalized = normalizeText(message);
    for (const [key, val] of Object.entries(synonymMap)) {
      normalized = normalized.replace(new RegExp(`\\b${key}\\b`, 'g'), val);
    }

    return normalized;
  };

  const cleanedMessage = preprocessMessage(userMessage);

  // Step 2: List all executives if user asks for it
  const wantsListAll = /list|show|who are.*executives|leaders|all student/i.test(userMessage);
  if (wantsListAll) {
    const execList = departmentAppointment.studentExecutives.map(exec => {
      return `👤 <strong>${exec.position}</strong>: <mark class="highlight-keyword">${exec.name}</mark>`;
    }).join('<br/>');

    return {
      message: `📋 <strong>Student Executives:</strong><br/>${execList}`,
      highlight: departmentAppointment.studentExecutives.map(e => e.name),
    };
  }

  // Step 3: Fuse.js fuzzy setup
  const studentExecFuse = new Fuse(departmentAppointment.studentExecutives, {
    keys: ["name", "position", "course"],
    includeScore: true,
    threshold: 0.4,
  });

  const studentExecResults = studentExecFuse.search(cleanedMessage);

  // Step 4: Detect user intent
  const isAskingForFunction = /function|role|duty|what does/i.test(userMessage);
  const isAskingForCourse = /course|program|department/i.test(userMessage);
  const isAskingForLevel = /level|year/i.test(userMessage);

  // Step 5: Use exact match if possible (avoids "president" → "vice president")
  const exactMatch = departmentAppointment.studentExecutives.find(exec => {
    const execPosition = normalizeText(exec.position);
    const execName = normalizeText(exec.name);
    return cleanedMessage.includes(execPosition) || cleanedMessage.includes(execName);
  });

  const bestExec = exactMatch || (studentExecResults.length > 0 ? studentExecResults[0].item : null);

  // Step 6: Return detailed result
  if (bestExec) {
    let message = `👤 <strong>${bestExec.position}</strong> is held by 
      <mark class="highlight-keyword" role="button">${bestExec.name}</mark>.`;

    if (isAskingForFunction && bestExec.functions) {
      message += `<br/>📜 Functions: ${bestExec.functions}`;
    } else if (isAskingForCourse && bestExec.course) {
      message += `<br/>📚 Course: ${bestExec.course}`;
    } else if (isAskingForLevel && bestExec.level) {
      message += `<br/>🎓 Level: ${bestExec.level}`;
    } else {
      // Default details
      message += `<br/>📚 Course: ${bestExec.course}<br/>🎓 Level: ${bestExec.level}`;
      if (bestExec.functions) {
        message += `<br/>📜 Functions: ${bestExec.functions}`;
      }
    }

    return {
      message,
      image: bestExec.picture,
      highlight: [bestExec.name, bestExec.position],
    };
  }

  // Step 7: Suggest closest match if nothing exact
  const bestExecMatch = studentExecResults.length > 0 ? studentExecResults[0].item : null;
  if (bestExecMatch) {
    return {
      message: `🔍 Did you mean: <mark class="highlight-keyword" role="button">${bestExecMatch.name}</mark>?<br/>Please confirm.`,
      highlight: [bestExecMatch.name],
      quickReplies: [
        `Who is ${bestExecMatch.name}?`,
        `What is the role of ${bestExecMatch.position}?`,
      ],
    };
  }
}




  // If user says "student executives", list all
  if (
    lower.includes("student executives") ||
    lower.includes("executives in department") ||
    lower.includes("how to identify student executive") ||
    lower.includes("executive") ||
    lower.includes("excos") ||
    lower.includes("how to identify student excos")
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
  
// --- Academic Timetable Handling ---

// Keywords to match against user input
const timetableKeywords = [
  "timetable",
  "time table",
  "class schedule",
  "departmental time table",
  "lecture schedule",
  "course schedule",
  "lesson plan",
  "schedule",
  "lecture time",
  "academic calendar",
  "weekly schedule",
  "when are classes",
  "when is my class",
  "show timetable",
  "download timetable",
  "give timetable",
  "what time is class"
];

// Normalize and simplify user message
const normalizeText = (text: string): string =>
  text.toLowerCase().replace(/[^\w\s]/g, '').trim();

const normalizedMessage = normalizeText(userMessage);

// Fuse.js for fuzzy matching
const fuseTimetable = new Fuse(timetableKeywords, {
  includeScore: true,
  threshold: 0.4, // Controls how lenient matching is
});

// Match if message includes or is similar to any timetable keyword
const matchesTimetable =
  normalizedMessage.includes("timetable") || // direct word check
  fuseTimetable.search(normalizedMessage).length > 0;

if (matchesTimetable) {
  return {
    message:
      `🗓️ Here is the departmental academic timetable:<br/>` +
      departmentAppointment.academicInfo.timetable.description +
      "<br/><br/>" +
      departmentAppointment.academicInfo.timetable.downloads
        .map(timetable => 
          `📥 <a href="${timetable.link}" download>Download ${timetable.level} timetable</a><br/>`)
        .join(""),
  };
}


// --- Past Questions Handling ---

// Extended keyword list for better matching
const pastQKeywords = [
  "past question",
  "past questions",
  "exam questions",
  "previous questions",
  "previous exam",
  "exam paper",
  "exam past questions",
  "old exam questions",
  "old questions",
  "revision questions",
  "past exams",
  "question bank",
  "test questions",
  "sample questions",
  "model questions",
  "question archive",
  "download exam questions",
  "give me past questions",
  "practice exam"
];

// Normalize user input
const normalizeTexts = (text: string): string =>
  text.toLowerCase().replace(/[^\w\s]/g, '').trim();

const normalizedMessages = normalizeTexts(userMessage);

// Fuse.js for fuzzy matching
const fusePastQ = new Fuse(pastQKeywords, {
  includeScore: true,
  threshold: 0.4,
});

// Check if message includes "past" or "question" related term OR fuzzy matches
const matchesPastQuestion =
  normalizedMessages.includes("past question") ||
  normalizedMessages.includes("exam question") ||
  fusePastQ.search(normalizedMessages).length > 0;

if (matchesPastQuestion) {
  return {
    message:
      `📚 Here are the past questions for exam preparation:<br/>` +
      departmentAppointment.academicInfo.pastQuestions.announcement +
      "<br/><br/>" +
      departmentAppointment.academicInfo.pastQuestions.benefits +
      "<br/><br/>" +
      departmentAppointment.academicInfo.pastQuestions.downloads
        .map(pastQ =>
          `📥 <a href="${pastQ.file}" download>Download ${pastQ.level} past questions</a><br/>`)
        .join(""),
  };
}


 // --- Grade Point Calculation ---
 const gpKeywords = [
  // Original keywords
  "grade point",
  "gp calculation",
  "gpa",
  "cgpa",
  "calculate gp",
  "grade calculation",

  // Common variations
  "how to calculate gp",
  "calculate my gpa",
  "what is my grade point",
  "gpa calculator",
  "how to get my gp",
  "compute grade point",
  "how is gpa calculated",
  "gpa calculation formula",
  "calculate grade point average",
  "find my gpa",
  "check my gp",
  "calculate semester gp",
  "university gp system",
  "how do you calculate gp",
  "gp grading system",
  "explain gpa",
  "gpa score",
  "college grade point calculation",
  "how to compute gpa",
  "step-by-step gp calculation",
  "cgpa vs gpa",
  "example of gpa calculation",
  "grade to gp conversion",
  "how do i know my grade point",
  "i want to know my gp",
  "my gp is low, how is it calculated",
  "gp calculator app",
  "what does gpa mean",
  "grade to point conversion",
  "how to convert grades to gp",
  "what is the grading scale",
  "credit unit and gp",
  "final grade point calculation",
  "can you calculate my gp",
  "calculate my grades",
  "show me how to compute gp",
  "how to calculate final gpa",
  "grade breakdown and gp",
  "university grading system"
];


const fuseGP = new Fuse(gpKeywords, {
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  isCaseSensitive: false,
});

// Ensure input is in lowercase

if (fuseGP.search(lower).length > 0) {
  const gpData = departmentAppointment?.academicInfo?.gradePointCalculation;

  if (!gpData) {
    return {
      message: "⚠️ Grade Point Calculation data is currently unavailable.",
    };
  }

  return {
    message: `
      📊 <strong>Grade Point (GP) Calculation :</strong><br/><br/>
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
            .map(
              (scale) =>
                `<tr><td>${scale.grade}</td><td>${scale.markRange}</td><td>${scale.gradePoint}</td></tr>`
            )
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
            .map(
              (row) => `<tr>
                         <td>${row.course}</td>
                         <td>${row.grade}</td>
                         <td>${row.creditUnit}</td>
                         <td>${row.gradePoint}</td>
                         <td>${row.totalGradePoints}</td>
                       </tr>`
            )
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
  "hi","information"
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




// const chatbotGreetingKeywords: string[] = [
//     "you", "how are u", "how are you", "who are u", "who are you", "who are",
//     "hay", "hi", "hello", "what's your name", "what are you", "tell me about yourself",
//     "what can you do", "hey", "yo", "sup", "what's up", "howdy", "greetings",
//     "how do you work", "what are you capable of", "what's your purpose", "are you a robot",
//     "are you human", "do you have a name", "introduce yourself", "can you help me",
//     "can you talk", "say something", "talk to me", "who made you", "where are you from",
//     "what is this", "explain yourself", "tell me something", "what do you do",
//     "describe yourself", "chatbot", "virtual assistant", "talking bot"
//   ];
  
//   const chatbotGreetingResponses: string[] = [
//     `🤖 hi I'm your friendly Computer Engineering chatbot! Would you like to know about <span class="clickable" data-msg="lecturer">our lecturers</span>?`,
//     `👋 hi Hello! I’m the Computer Engineering assistant bot. Curious about <span class="clickable" data-msg="how to calculate GP">how to calculate GP</span>?`,
//     `💬 hi Hi there! I'm here to help with Computer Engineering info. Ask me about <span class="clickable" data-msg="appointment with lecturers">an appointment with lecturers</span>.`,
//     `🧠 hi I'm a smart bot built to assist you with department matters. Click <span class="clickable" data-msg="lecturer info">lecturer info</span> to begin.`,
//     `💡 hi Computer Engineering chatbot at your service! Want to know about how to get <span class="clickable" data-msg="how to get past questions">past questions</span>?`,
//     `💡 hi Computer Engineering chatbot at your service! Want to know about <span class="clickable" data-msg="how to identify student executive">how to identify student executive</span>?`
//   ];
  
//   // Fuse search setup for matching user input
//   const fuseChatbotGreeting = new Fuse<string>(chatbotGreetingKeywords, { threshold: 0.4 });
  
//   // `lower` should be the user's message in lowercase
//   const greetingResults: FuseResult<string>[] = fuseChatbotGreeting.search(lower);
  
//   if (greetingResults.length > 0) {
//     // Randomly select a friendly greeting response
//     const response =
//       chatbotGreetingResponses[Math.floor(Math.random() * chatbotGreetingResponses.length)];
//     return {
//       message: response
//     };
//   }
  
//   // Function to handle click events on clickable elements
//   const handleHighlightClick = (e: Event) => {
//     const target = e.target as HTMLElement;
  
//     if (target && target.classList.contains('clickable')) {
//       const msg = target.getAttribute('data-msg'); // Get the data-msg attribute
//       if (msg) {
//         console.log(msg); // Log the clicked message
  
//         // Submit the clicked msg as user input and get bot response
//         const newMessage = msg;  // The message clicked is used as new input
//         getBotResponse(newMessage);  // Assuming you have this function to handle input
//       }
//     }
//   };
  
//   // Attach event listener for dynamically created clickable spans
//   document.body.addEventListener('click', handleHighlightClick);
  
//   // Function to simulate submitting new input to the bot
//   function getBotResponse(userInput: string) {
//     const lower = userInput.toLowerCase();
//     const fusebyuser = new Fuse<string>(chatbotGreetingKeywords, { threshold: 0.4 });
//     const Resultsuser = fusebyuser.search(lower);
  
//     if (Resultsuser.length > 0) {
//       const randomIndex = Math.floor(Math.random() * chatbotGreetingResponses.length);
//       console.log(chatbotGreetingResponses[randomIndex]); // Return the response
//     } else {
//       console.log("Sorry, I didn't understand that."); // Default message
//     }
//   }
  
//   // CSS to highlight the clickable elements (Optional)
//   const style = document.createElement('style');
//   style.innerHTML = `
//     .clickable {
//       color: #0066cc;
//       text-decoration: underline;
//       cursor: pointer;
//     }
//     .clickable:hover {
//       color: #ff9900;
//     }
//   `;
//   document.head.appendChild(style);
  

  
 // --- Default Fallback (optional) ---

const suggestions = {
  academics: [
    { label: "📊 How to calculate GP", msg: "How to calculate GP" },
    { label: "📚 Departmental Past Question", msg: "departmental past question" },
    { label: "🕒 Departmental Time Table", msg: "departmental time table" },
    { label: "🎓 Faculty Requirement", msg: "faculty requirement" },
    { label: "📑 Departmental Requirement", msg: "departmental requirement" }
  ],
  personnel: [
    { label: "👨‍🏫 Who is the Head of Department?", msg: "Who is the Head of Department?" },
    { label: "👥 Departmental Executives", msg: "departmental executives" },
    { label: "👤 Who is our president", msg: "who is our president" }
  ],
  general: [
    { label: "📋 Show all department appointments", msg: "Show all department appointments" },
    { label: "💻 About Computer Engineering", msg: "about computer engineering" }
  ]
};


// Flatten all suggestion arrays
const allSuggestions = [
  ...suggestions.academics,
  ...suggestions.personnel,
  ...suggestions.general
];

// Shuffle and pick 3 random suggestions
const shuffled = allSuggestions.sort(() => 0.5 - Math.random());
const randomThree = shuffled.slice(0, 3);

// Convert to HTML
const suggestionList = randomThree.map(s => `
  <li>
    <mark class='highlight-keyword' data-msg='${s.msg}'>${s.label}</mark>
  </li>
`).join("");


return {
  message: `
    ❓ <strong>I couldn't find anything relevant.</strong><br><br>
    Try one of these suggestions:<br><br>
    <ul style="padding-left: 1.2em; margin: 0;">
      ${suggestionList}
    </ul>
  `,

};

}

