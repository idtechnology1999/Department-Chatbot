
import adejumobiImage from "../assets/general_secretary1.jpeg";
// import afolayanImage from "../assets/engr_afolayan.jpeg";
import vicepresident from "../assets/vice_president.jpeg"
import prsident from "../assets/president.jpeg";
import assistantGenSecImage from "../assets/assistant_general_secretary.jpeg";
import financialSec1Image from "../assets/financial_secretary1.jpeg";
import financialSec2Image from "../assets/financial_secretary2.jpeg";
import treasurerImage from "../assets/treasurer.jpeg";
import welfareImage from "../assets/welfare_director.jpeg";
import social1Image from "../assets/social_director1.jpeg";
import social2Image from "../assets/social_director2.jpeg";
import sport1Image from "../assets/sport_director1.jpeg";
import sport2Image from "../assets/sport_director2.jpeg";
import pro1Image from "../assets/pro1.jpeg";
import pro2Image from "../assets/pro2.jpeg";
import auditorImage from "../assets/auditor.jpeg";
import welfare2Image from "../assets/welfare2Image.jpeg"
import computerEngineeringImage from "../assets/computer_engineering_department.jpeg"
// import docu from "../"






export interface ChatbotGreetings {
  byuser: string[];
  responses: string[];
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
      gradePointCalculation: GradePointCalculation; // ✅ Now correctly inside academicInfo
    };
    
computerEngineeringInfo: {
  department: string;
  institution: string;
  description: string;
  facultyDetails: {
    name: string;
    building: string;
    departmentLocation: string;
  };
  history: string[];
  facilities: { name: string; type: string }[];
  practicalTraining: string;
  image: string;
};

chatbotGreetings: {
  byuser: string[];
  responses: string[];
};
  }
  
  interface GradePointCalculation {
    description: string;
    steps: string[];
    gradingScale: GradingScale[];
    example: Example;
  }
  
  interface GradingScale {
    grade: string;
    markRange: string;
    gradePoint: string;
  }
  
  interface Example {
    description: string;
    table: ExampleTableRow[];
    calculationSteps: string[];
    finalGP: string;
  }
  
  interface ExampleTableRow {
    course: string;
    grade: string;
    creditUnit: number;
    gradePoint: number;
    totalGradePoints: number;
  }
  


  
  const departmentAppointment: StaffData = {
    departmentAppointments: [
      { name: "Engr. O.A. Busari", position: "HOD" },
      { name: "Engr. O.A. Busari", position: "H.O.D" },
      { name: "Engr. O.A. Busari", position: "Head of Department (HOD)" },
      { name: "Engr. D.A. Oladosu", position: "Project Coordinator" },
      { name: "Engr. O.A. Mowemi", position: "Project Committee Secretary" },
      { name: "Engr. D.D. Afolayan", position: "ND Coordinator" },
      { name: "Engr. O.O Akanji", position: "HND Coordinator" },
      { name: "Miss M.O. Oyetoso", position: "SIWES Coordinator" },
      { name: "Engr. A.A. Oni", position: "PT Coordinator" },
      { name: "Mrs. I.I. Adeaga", position: "Welfare Coordinator1" },
      { name: "Engr. Omotosho", position: "Welfare Coordinator 2" },
      { name: "Engr. O.A. Busari", position: "Exam Convener" },
      { name: "Mr. Yusuf Afenifere", position: "P.A. to Engr. O.A. Busari" }
    ],
  
    studentExecutives: [
      {
        name: "Com. Osuolale Mubaraq Adekunle",
        position: "President",
        level: "HND 2",
        course: "Computer Engineering",
        picture: prsident,
        functions: "The President serves as the chief executive officer of the student body, representing the interests of all members..."
      },
      {
        name: "Com. Yusuf Ibrahim Akorede",
        position: "Vice President",
        level: "ND 2",
        course: "Computer Engineering",
        picture: vicepresident,
        functions: "The Vice President assists the President in carrying out their duties and assumes leadership in their absence..."
      },
      {
        name: "Com. Adekunle Tobiloba Micheal",
        position: "General Secretary 1",
        level: "HND 2",
        course: "Computer Engineering",
        picture: adejumobiImage,
        functions: "The General Secretary is responsible for documentation and record-keeping of all official matters..."
      },
      {
        name: "Com. Damilare Temitayo Ogunwusi",
        position: "Assistant General Secretary",
        level: "ND 2",
        course: "Computer Engineering",
        picture: assistantGenSecImage,
        functions: "Supports the General Secretary in maintaining records and handling correspondence..."
      },
      {
        name: "Com. Mustapha Sofiyat Oyenike",
        position: "NACOMES Financial Secretary 1",
        level: "HND 2",
        course: "Computer Engineering",
        picture: financialSec1Image,
        functions: "Oversees financial transactions, maintains records, ensures transparency in budgeting..."
      },
      {
        name: "Com. Adebayo Elijah Bolaji",
        position: "Financial Secretary 2",
        level: "ND 2",
        course: "Computer Engineering",
        picture: financialSec2Image,
        functions: "Assists Financial Secretary 1, helps manage records and ensure accountability..."
      },
      {
        name: "Com. Okunade Kudirat Omolara",
        position: "Treasurer",
        level: "HND 2",
        course: "Computer Engineering",
        picture: treasurerImage,
        functions: "Manages funds, processes payments, and ensures proper financial documentation..."
      },
      {
        name: "Com. Adeyemo Temitayo Joseph",
        position: "Welfare 1",
        level: "HND 2",
        course: "Computer Engineering",
        picture: welfareImage,
        functions: "Ensures student welfare, addresses concerns, and promotes well-being initiatives..."
      },
      {
        name: "Com. Adepoju Habeeb",
        position: "Social Director 1",
        level: "HND 2",
        course: "Computer Engineering",
        picture: social1Image,
        functions: "Plans social events and fosters student engagement..."
      },
      {
        name: "Com. Abdulrosheed Awal Kehinde",
        position: "Social Director 2",
        level: "ND 2",
        course: "Computer Engineering",
        picture: social2Image,
        functions: "Assists Social Director 1 and enhances student participation..."
      },
      {
        name: "Com. Alabi Roqib Adetunji",
        position: "Sport Director 1",
        level: "HND 2",
        course: "Computer Engineering",
        picture: sport1Image,
        functions: "Promotes sports activities and organizes competitions..."
      },
      {
        name: "Com. Mustapha Boluwatife Basit",
        position: "Sport Director 2",
        level: "ND 2",
        course: "Computer Engineering",
        picture: sport2Image,
        functions: "Supports sporting events and ensures student participation..."
      },
      {
        name: "Com. Adeniyi Feranmi",
        position: "PRO 1",
        level: "HND 2",
        course: "Computer Engineering",
        picture: pro1Image,
        functions: "Manages communication and promotes student activities..."
      },
      {
        name: "Com. Isaleye Peter Adekunle",
        position: "PRO 2",
        level: "ND 2",
        course: "Computer Engineering",
        picture: pro2Image,
        functions: "Assists in dissemination of information and media activities..."
      },
      {
        name: "Com. Olatunji Oladele David",
        position: "Auditor",
        level: "HND 2",
        course: "Computer Engineering",
        picture: auditorImage,
        functions: "Ensures financial accountability and checks procedures..."
      },{
        name: "Com. Alonigbeja Haleemah Abidemi",
        position: "Welfare Director 2",
        level: "ND 2",
        course: "Computer Engineering",
        picture: welfare2Image,
        functions: "Ensures student welfare, addresses concerns, and promotes a supportive academic environment."
      }
      
    ],
    
  
    academicInfo: {
      timetable: {
        description: "Official timetable for 2024/2025 session for ND1, ND2, HND1, and HND2. Maintain 75% attendance to be eligible for exams.",
        downloads: [
          { level: "ND1", link: "/ND1_TIMETABLE.docx" },
          { level: "ND2", link: "/ND2_TIMETABLE.docx" },
          { level: "HND1", link: "/HND1_TIMETABLE.docx" },
          { level: "HND2", link: "/HND2_TIMETABLE.docx" }
        ]
      },
      pastQuestions: {
        announcement: "Past questions are now available for ND1, ND2, HND1, and HND2.",
        benefits: "Help with exam preparation, deepen understanding, identify patterns.",
        downloads: [
          { level: "ND1", file: "/ND1_PAST_QUESTION.pdf" },
          { level: "ND2", file: "📥 ND2_PASTQUESTION.JPEG" },
          { level: "HND1", file: "/HND1_PAST_QUESTION.pdf" },
          { level: "HND2", file: "/HND2_PAST_QUESTION2.pdf" }
        ]
      },
      gradePointCalculation: {
        description: "Here's how to calculate your Grade Point (GP) at Poly Ibadan:",
        steps: [
          "1. Identify the Grade for each course and the corresponding Grade Point.",
          "2. Multiply the Grade Point for each course by its Credit Unit.",
          "3. Add up all the grade points for the semester.",
          "4. Add up all the credit units for the semester.",
          "5. Calculate your GP using the formula: GP = Total Grade Points / Total Credit Units."
        ],
        gradingScale: [
            { grade: "A", markRange: "75 and above", gradePoint: "4.0" },
            { grade: "AB", markRange: "70 - 74", gradePoint: "3.50" },
            { grade: "B", markRange: "65 - 69", gradePoint: "3.25" },
            { grade: "BC", markRange: "60 - 64", gradePoint: "3.0" },
            { grade: "C", markRange: "55 - 59", gradePoint: "2.75" },
            { grade: "D", markRange: "50 - 54", gradePoint: "2.50" },
            { grade: "E", markRange: "40 - 44", gradePoint: "2.0" },
            { grade: "F", markRange: "35 - 39", gradePoint: "0.0" }
          ],
          example: {
            description: "Here’s an example to help you calculate your GP:",
            table: [
              { course: "Math", grade: "A", creditUnit: 3, gradePoint: 4.0, totalGradePoints: 12.0 },
              { course: "Physics", grade: "AB", creditUnit: 2, gradePoint: 3.50, totalGradePoints: 7.0 },
              { course: "Computer", grade: "B", creditUnit: 4, gradePoint: 3.25, totalGradePoints: 13.0 },
              { course: "Chemistry", grade: "C", creditUnit: 3, gradePoint: 2.75, totalGradePoints: 8.25 }
            ],
            calculationSteps: [
                "Total Grade Points = 12.0 + 7.0 + 13.0 + 8.25 = 40.25",
                "Total Credit Units = 3 + 2 + 4 + 3 = 12",
                "GP = Total Grade Points / Total Credit Units = 40.25 / 12 = 3.35"
              ],
          finalGP: "Your GP for the semester is 3.35."
        }
      },
    
    },
    chatbotGreetings:{
      byuser: [
        "you", "how are u", "how are you", "who are u", "who are you", "who are",
        "hay", "hi", "hello", "what's your name", "what are you", "tell me about yourself",
        "what can you do", "hey", "yo", "sup", "what's up", "howdy", "greetings",
        "how do you work", "what are you capable of", "what's your purpose", "are you a robot",
        "are you human", "do you have a name", "introduce yourself", "can you help me",
        "can you talk", "say something", "talk to me", "who made you", "where are you from",
        "what is this", "explain yourself", "tell me something", "what do you do",
        "describe yourself", "chatbot", "virtual assistant", "talking bot"
      ],
      responses: [
        `🤖 I'm your friendly Computer Engineering chatbot! Would you like to know about <span class="clickable" data-msg="lecturer">our lecturers</span>?`,
        `👋 Hello! I’m the Computer Engineering assistant bot. Curious about <span class="clickable" data-msg="how to calculate GP">how to calculate GP</span>?`,
        `💬 Hi there! I'm here to help with Computer Engineering info. Ask me about <span class="clickable" data-msg="appointment with lecturers">an appointment with lecturers</span>.`,
        `🧠 I'm a smart bot built to assist you with department matters. Click <span class="clickable" data-msg="lecturer info">lecturer info</span> to begin.`,
        `💡 Computer Engineering chatbot at your service! Want to know about how to get <span class="clickable" data-msg="how to get past questions">past questions</span>?`,
        `💡 Computer Engineering chatbot at your service! Want to know about <span class="clickable" data-msg="how to identify student executive">how to identify student executive</span>?`
      ]
    },


    computerEngineeringInfo: {
      image: computerEngineeringImage,
      department: "Computer Engineering",
      institution: "The Polytechnic, Ibadan",
      description: "Computer Engineering at The Polytechnic, Ibadan, combines electrical engineering and computer science to design, develop, and maintain computer systems, hardware, and software. The department offers both National Diploma (ND) and Higher National Diploma (HND) in Computer Engineering Technology.",
      facultyDetails: {
        name: "Faculty of Engineering",
        building: "Engineering Building",
        departmentLocation: "Fourth floor (final floor)"
      },
      history: [
        "Received Resource Accreditation to commence ND in October 2009 after the 2009/2010 admission exercise.",
        "First batch of ND students admitted in 2009/2010 academic session.",
        "Further admissions for ND began in 2010/2011 academic session.",
        "HND programme launched in 2016/2017 academic session."
      ],
      facilities: [
        { name: "Computer Engineering Laboratory", type: "General" },
        { name: "Computer Technology Laboratory", type: "General" },
        { name: "Digital Systems and Microprocessor Laboratory", type: "General" },
        { name: "Computer Maintenance and Repair Workshop", type: "General" },
        { name: "Electronics and Telecommunication Laboratory", type: "Specialized" },
        { name: "Measurements and Instrumentation Laboratory", type: "Specialized" },
        { name: "Electronics Maintenance and Repairs Workshop", type: "Specialized" }
      ],
      practicalTraining: "Equipped with modern laboratories and workshops, the department ensures students receive hands-on training and practical experience in both general and specialized areas. Experienced professionals guide students through real-world applications, preparing them for success in the tech industry."
      
    }
  };
  

  
  export default departmentAppointment;
  