import Fuse from "fuse.js";
import departmentAppointment from "../data/departmentAppointment";
import type { StaffData } from "../data/departmentAppointment";

export interface BotReply {
  message: string;
  image?: string;
  file?: string;
  highlight?: string[];
}

export function getStaffInfoReply(userMessage: string): BotReply {
  const lower = userMessage.toLowerCase();
  const highlights: string[] = [];

  // 1. Check department appointments
  const appointmentMatch = departmentAppointment.departmentAppointments.find(app =>
    lower.includes(app.name.toLowerCase()) || lower.includes(app.position.toLowerCase())
  );

  if (appointmentMatch) {
    highlights.push(appointmentMatch.name, appointmentMatch.position);
    return {
      message: `${appointmentMatch.name} is the <strong>${appointmentMatch.position}</strong> in the department.`,
      highlight: highlights,
    };
  }

  // 2. Fuzzy search for student executives
  const fuseExec = new Fuse(departmentAppointment.studentExecutives, {
    keys: ["name", "position", "level", "course"],
    includeScore: true,
    threshold: 0.3,
  });

  const result = fuseExec.search(userMessage);
  if (result.length > 0) {
    const bestMatch = result[0].item;
    highlights.push(bestMatch.name, bestMatch.position);
    return {
      message: `<strong>${bestMatch.name}</strong> is the ${bestMatch.position} (${bestMatch.level}) of ${bestMatch.course}.<br/>
      <em>Function:</em> ${bestMatch.functions}`,
      image: bestMatch.picture,
      highlight: highlights,
    };
  }

  // 3. Academic timetable query
  if (lower.includes("timetable")) {
    const timetable = departmentAppointment.academicInfo.timetable;
    return {
      message: `<strong>${timetable.description}</strong><br/><br/>` +
        timetable.downloads
          .map(d => `📚 ${d.level}: <a href="#">${d.link}</a>`)
          .join("<br/>"),
      highlight: ["timetable", ...timetable.downloads.map(d => d.level)],
    };
  }

  // 4. Past question query
  if (lower.includes("past question") || lower.includes("pastquestions") || lower.includes("exam preparation")) {
    const past = departmentAppointment.academicInfo.pastQuestions;
    return {
      message: `<strong>${past.announcement}</strong><br/>${past.benefits}<br/><br/>` +
        past.downloads
          .map(d => `📘 ${d.level}: <a href="#">${d.file}</a>`)
          .join("<br/>"),
      highlight: ["past questions", ...past.downloads.map(d => d.level)],
    };
  }

  return {
    message: "No relevant staff or academic information found.",
  };
}
