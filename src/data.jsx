export default function generateCVData() {
  return {
    general: {
      name: "John Doe",
      jobTitle: "Frontend developer",
      email: "john@mail.com",
      portfolio: "https://example.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    education: {
      "School of Life": {
        school: "School of Life",
        degree: "Bachelor of Being",
        startDate: "2011-09-01",
        endDate: "2021-06-01",
      },
      "IT University": {
        school: "IT University",
        degree: "Bachelor of Computer Science",
        startDate: "2021-09-01",
        endDate: "2023-06-01",
      },
      "The Odin Project": {
        school: "The Odin Project",
        experience: "Web Development",
        startDate: "2024-05-01",
      },
    },
    experience: {
      "Some corporation": {
        company: "Some corporation",
        role: "Frontend developer",
        startDate: "2024-09-01",
        description: "Writing most of the website",
      },
    },
  };
}
