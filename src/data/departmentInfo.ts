// Step 1: Define interfaces
export interface FacultyDetails {
    name: string;
    building: string;
    departmentLocation: string;
  }
  
  export interface Laboratory {
    name: string;
    type: "General" | "Specialized";
  }
  
  export interface DepartmentInfo {
    department: string;
    institution: string;
    description: string;
    facultyDetails: FacultyDetails;
    history: string[];
    facilities: Laboratory[];
    practicalTraining: string;
    image: string;
  }
  
  // Step 2: Create your object using the interface
  export const computerEngineeringInfo: DepartmentInfo = {
    department: "Computer Engineering",
    institution: "The Polytechnic, Ibadan",
    description:
      "Computer Engineering at The Polytechnic, Ibadan, combines electrical engineering and computer science to design, develop, and maintain computer systems, hardware, and software. The department offers both National Diploma (ND) and Higher National Diploma (HND) in Computer Engineering Technology.",
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
    practicalTraining:
      "Equipped with modern laboratories and workshops, the department ensures students receive hands-on training and practical experience in both general and specialized areas. Experienced professionals guide students through real-world applications, preparing them for success in the tech industry.",
    image: "computer_engineering_department.jpeg"
  };
  