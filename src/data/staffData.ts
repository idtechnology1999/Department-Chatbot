// --- IMAGE IMPORTS ---
import adejumobiImage from "../assets/user.png";
import afolayanImage from "../assets/engr_afolayan.jpeg";
import oniImage from "../assets/engr_oni.jpeg";
import leyeImage from "../assets/mr_leye.jpeg";
import oyetosoImage from "../assets/miss_oyetoso.jpeg";
import omotosoImage from "../assets/engr_omotoso.jpeg";
import mowemiImage from "../assets/Engr_ O.A_Mowemi_office.jpeg";
import busariImage from "../assets/engr_ao_busari.jpeg";
import oladosuImage from "../assets/oladosuImage.jpeg"; // UPDATE
import fadiranImage from "../assets/Fadiran.jpg"; // UPDATE
import yusufImage from "../assets/Mr_Yusuf_Afenifere.jpeg";
import akinsolaImage from "../assets/akinsola_aliu.jpeg";
import mrsAdeaga from "../assets/mrs.Adeaga.jpeg"

// import computeEngrImage from "../assets/computer_engineering_department.jpeg"



// --- INTERFACES ---
export interface Course {
  name: string;
  code: string;
}

export interface Staff {
  name: string;
  specialization: string;
  office: string;
  image: string;
  courses: Course[];
  file?: string;
  MoreInform? : string
}

export interface StaffData {
  departmentAppointments: {
    name: string;
    position: string;
  }[];

  studentExecutives: {
    name: string;
    position: string;
    level: string;
    course: string;
    picture: string;
    functions: string;
  }[];

  academicInfo: {
    timetable: {
      description: string;
      downloads: {
        level: string;
        link: string;
      }[];
    };
    pastQuestions: {
      announcement: string;
      benefits: string;
      downloads: {
        level: string;
        file: string;
      }[];
    };
  };
}



  // --- SIMPLE TEXT RESPONSE FUNCTION ---
// export const getDefaultResponse = (userInput: string): string | null => {
//     const lowerInput = userInput.toLowerCase().trim();
  
//     const greetings = ["hi", "hello", "how are you", "how are u", "who are you", "who are u"];
  
//     if (greetings.includes(lowerInput)) {
//       return "This is the Computer Engineering platform where all about Computer Engineering at The Polytechnic, Ibadan is shared.";
//     }
  
//     return null; // fallback if input doesn't match
//   };
  




// --- STAFF DATA ---
export const staffData: Staff[] = [

  {
    name: "Engr. O.K Adejumobi",
    specialization: "Electronics and Computer Hardware Systems",
    office: "Faculty of Engineering, 3rd Floor",
    image: adejumobiImage,
    courses: [
      { name: "Electronics I", code: "EEC 124" },
      { name: "Computer Hardware System Design", code: "CTE 321" },
      { name: "Introduction to Digital Signal Processing", code: "CTE 444" }
    ]
  },

  {
    name: "Engr. Mrs. Afolayan",
    specialization: "Electrical Engineering",
    office: "Faculty of Engineering, 3rd Floor",
    image: afolayanImage,
    courses: [
      { name: "Electrical Engineering Science II", code: "EEC 125" },
      { name: "Electronics IV", code: "EEC 325" },
      { name: "Entrepreneurship Development I", code: "EED 326" }
    ]
  },
  {
    name: "Engr.O.A Oni ",
    specialization: "Digital Computing and Reliability Testing",
    office: "Faculty of Engineering, 3rd Floor",
    image: oniImage,
    courses: [
      { name: "Digital Computer Fundamentals I", code: "CTE 121" },
      { name: "Testing and Reliability", code: "EEC 328" }
    ]
  },
  {
    name: "Engr. O.O Akanji",
    specialization: "Electrical Measurement and Telecommunications",
    office: "Faculty of Engineering, 3rd Floor",
    image: leyeImage,
    courses: [
      { name: "Electrical Measurement and Instrumentation I", code: "CTE 122" },
      { name: "Telecommunication Engineering", code: "CTE 245" }
    ]
  },
  {
    name: "Miss Oyetoso",
    specialization: "Entrepreneurship and Technical Writing",
    office: "Faculty of Engineering, 3rd Floor",
    image: oyetosoImage,
    courses: [
      { name: "Introduction to Entrepreneurship", code: "EED 126" },
      { name: "Technical Report Writing", code: "CTE 124" },
      { name: "Operating Systems I", code: "CTE 243" }
    ]
  },
  {
    name: "Engr.Mrs. Omotoso",
    specialization: "Maintenance, Microprocessors, and Entrepreneurship",
    office: "Faculty of Engineering, 3rd Floor",
    image: omotosoImage,
    courses: [
      { name: "Computer/Electronics Maintenance and Repair", code: "CTE 123" },
      { name: "Introduction to Microprocessor and Assembly Language", code: "CTE 241" },
      { name: "Entrepreneurship Development II", code: "EED 426" }
    ]
  },
  {
    name: "Engr. O.A. Mowemi",
    specialization: "Computer Programming and Project Management",
    office: "Faculty of Engineering, 3rd Floor",
    image: mowemiImage,
    courses: [
      { name: "Computer Programming (FORTRAN)", code: "CTE 127" },
      { name: "Project Management", code: "CTE 443" }
    ]
  },
  {
    name: "Engr. O.A. Busari",
    specialization: "Computer Networking, Mobile and Wireless Communication, Artificial Intelligence",
    office: "Faculty of Engineering, 3rd Floor",
    image: busariImage,
    courses: [
      { name: "Computer Networking", code: "CTE 244" },
      { name: "Mobile and Wireless Communication", code: "CTE 322" },
      { name: "Artificial Intelligence", code: "CTE 442" }
    ]
  },
  {
    name: "Engr. Oladosu",
    specialization: "Control Engineering and Digital Control",
    office: "Faculty of Engineering, 3rd Floor",
    image: oladosuImage,
    courses: [
      { name: "Computer Workshop Practice II", code: "CTE 242" },
      { name: "Control Engineering I", code: "EEC 324" },
      { name: "Digital Control", code: "CTE 447" }
    ]
  },
  {
    name: "Engr. (Mrs.) G.O. Fadiran",
    specialization: "Python Programming and Microprocessors",
    office: "Faculty of Engineering, 3rd Floor",
    image: fadiranImage,
    courses: [
      { name: "Python Programming", code: "CTE 323" },
      { name: "Microprocessor in Control and Instrumentation", code: "CTE 441" },
      { name: "Computer Embedded System", code: "CTE 442" }
    ]
  },
  {
    name: "Mr. Yusuf Afenifere",
    specialization: "Programmer, Departmental Activities Coordinator",
    office: "Faculty of Engineering, 3rd Floor",
    image: yusufImage,
    courses: [
      { name: "Departmental Seminar Coordination", code: "CTE 451" }
    ]
  },
    {
    name: "Mrs. I.I. Adeaga",
    specialization: "Departmental Activities Coordinator, She is non-teaching staff",
    office: "Faculty of Engineering, 3rd Floor",
    image: mrsAdeaga,
    courses: [
      { name: "Departmental Seminar Coordination", code: "CTE 451" }
    ]
  },
  {
    name: "Mr. Akinsola Aliu Abiodun",
    specialization: "Laboratory Equipment Maintenance, Student Assistance",
    office: "Faculty of Engineering, 3rd Floor",
    image: akinsolaImage,
    courses: [
      { name: "Electronics Lab Practicals", code: "EEC 131" }
    ]
  }
];

// User greetings or introductory messages
