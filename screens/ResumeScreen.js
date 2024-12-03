import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Badge } from 'react-native';

// Sample data for experience
const experienceData = [
  {
    company: "Southwest Research Institute",
    logo: "logos/swri_logo.jpeg",
    positions: [
      {
        title: "Senior Computer Scientist",
        duration: "Oct 2024 - Present",
        description: [
            "Developed an algorithm using object detection and advanced data analytics to efficiently detect specific events from the Juno Mission data.",
            "Managed a project to investigate the effects of Electromagnetic Interference (EMI) on electric vehicles for National Highway Traffic Safety Administration (NHTSA).",
            "Continually developing business relationships with costumers to provide cutting edge solutions for their needs.",
            "Leading efforts to obtain funding for new projects and technologies.",
            "Managed a team of engineers to propose a new Large Language Model (LLM) to improve the efficiency of cybersecurity testing."
        ],
        keywords: ["Python", "Azure","LLM", "Data Analytics", "Pytorch"]
      },
      {
        title: "Research Computer Scientist",
        duration: "Jan 2023 - Oct 2023",
        description: [
            "Implemented a micropatching algorithm between space systems that was susccessfully tested between an Amazon Web Services (AWS) Snowcone within the International Space Station (ISS) and a ground terminal.",
            "Contributed to the development of a cutting-edge technology in the DARPA CRASH program. Due to NDA, details cannot be disclosed.",
            "Developed a web application create cybersecurity test plans for automotive systems using React and Redux.",
            "Led the creation of a API using python to reverse engineer CAN bus messages from vehicles directly from the OBDII port.",
            "Created a Neural Network to determine the future location of a vehicle based on Basic Safety messages and compared it to a physics based predictor.",
            "Consulted on a project to create an anomaly detection system for space systems."
        ],
        keywords: ["Python", "Javascript", "C","C++","AWS", "React", "Redux", "Pytorch", "Tensorflow", "Pandas", "Numpy", "Scikit-learn"],
      }
    ]
  },
  {
    company: "Tower Semiconductor",
    logo: "logos/tower_logo.jpeg",
    positions: [
      {
        title: "Senior Failure Analysis Engineer",
        duration: "May 2019 - Jan 2023",
        description: [
            "Established the new area of Failure Analysis within the fab to streamline requests between the Engineering and Integration departments.",
            "Created a working database web system with SQL, Javascript, PHP and Python that ticketed requests, determined priorities and collected data from analysis.",
            "Developed a Convolutional Neural Network using Pytorch to classify semiconductor device structures from electron microscopy images.",
            "Determined root failure analysis of a large family of micro electronic devices in a large scale manufacturing environment.",
            "Correlated failure mechanisms of technologies between electrical measurements, process development and physical analysis using Python and KLA Data Analysis Enviroment.",
            "Increased the capabilities of the area by collaborating with the University of Texas at San Antonio and Texas State University.",
            "Introduced document control of processes within the new area.",
            "Involved in quality audits for costumers to determine specific requirements of the production process.",
            "Negotiated and obtained capital, $600k, for new state of the art instruments and upgrades.",
            "Responsibilities include lab and tool maintenance, management of team technicians, advice engineering department in process improvement solutions."
        ],
      },
      {
        title: "Senior Process Engineer",
        duration: "Jan 2017 - May 2019",
        description: [
        "Supported production processes of 12 different technologies for large scale production of 8 inch wafer semiconductors.",
        "Utilized high level data analysis such as linear and multivariate regression algorithms to determine the contribution of process changes for chemical, physical and enviromental factors in products for yield improvement and technology transfers.",
        "Presented data of process changes and improvement projects to costumers from a wide range of industries.",
        "Introduced process improvement projects to help maintain critical processes with Cpk above 1.67.",
        "Developed new processes for technology transfers with SIPOC documentation.",
        "Improved process control of critical toolsets by introducing continuous VPD ICP-MS measurements to accurately detect impurities in chemical concentrations.",
        "Familiar with 8D procedures for problem solving dedicated for the automotive industry.",
        "Led and managed a team of engineers that established control methodologies of test wafer materials which reduced annual cost by $1.4 Million.",
        "Identified a cost saving measure using classification algorithms which led to the introduction of a new tool to improve lifetime of testing materials which saved $750k within a year"        
        ],
      }
    ]
  },
  {
    company: "University of Texas at San Antonio",
    logo: "logos/utsa_logo.jpeg",
    positions: [
      {
        title: "Research Fellow",
        duration: "Sep 2016 - Dec 2016",
        description: ["Assisted in backend and frontend development tasks."],
      },
      {
        title: "Graduate Research Assistant",
        duration: "Jan 2013 - Sep 2016",
        description: ["Assisted in backend and frontend development tasks."],
      }
    ]
  }
];

const educationData = [
    {
        school: "University of Texas at San Antonio",
        logo: "logos/utsa_logo.jpeg",
        degrees: [
            {
                title: "Master of Science in Computer Science",
                duration: "2024",
                description: [
                    "Final Project: 'PINNs for Quantum Control'",
                    "Coursework: Data Science, Artificial Intelligence, Machine Learning, Software Engineering"
                ],
            },
            {
                title: "Doctor of Philosophy in Physics",
                duration: "2016",
                description: [
                    "Thesis: In sity TEM experimentation of nanostructured materials",
                    "Coursework: Quantum Mechanics, Solid State Physics, Nanotechnology, Holography, Semiconductor Physics, Diffraction Physics, Instrumentation (LabView, Python)"
                ],
            },
            {
                title: "Bachelor of Science in Physics",
                duration: "2012",
                description: [],
            }
            ]
        }
    ]

export default function ResumeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Resume</Text>

      <Text style={styles.title}>Education</Text>
      {educationData.map((education, index) => (
        <View key={index} style={styles.companyContainer}>
          <View style={styles.logoColumn}>
            <Image source={{ uri: education.logo }} style={styles.logo} />
            <View style={styles.line} />
          </View>
          <View style={styles.positionColumn}>
            <Text style={styles.companyName}>{education.school}</Text>
            {education.degrees.map((degree, posIndex) => (
              <View key={posIndex} style={styles.positionContainer}>
                <Text style={styles.positionTitle}>{degree.title}</Text>
                <Text style={styles.positionDuration}>{degree.duration}</Text>
                {degree.description.map((desc, descIndex) => (
                  <Text key={descIndex} style={styles.positionDescription}>{'\u2022  '}{desc}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      ))}
      
      <Text style={styles.title}>Experience</Text>   
      {experienceData.map((experience, index) => (
        <View key={index} style={styles.companyContainer}>
          <View style={styles.logoColumn}>
            <Image source={{ uri: experience.logo }} style={styles.logo} />
            <View style={styles.line} />
          </View>
          <View style={styles.positionColumn}>
            <Text style={styles.companyName}>{experience.company}</Text>
            {experience.positions.map((position, posIndex) => (
              <View key={posIndex} style={styles.positionContainer}>
                <Text style={styles.positionTitle}>{position.title}</Text>
                <Text style={styles.positionDuration}>{position.duration}</Text>
                {position.description.map((desc, descIndex) => (
                  <Text key={descIndex} style={styles.positionDescription}>{'\u2022  '}{desc}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },

  companyContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  logoColumn: {
    alignItems: 'center',
    width: 80,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#cccccc',
    marginTop: 5,
  },

  positionColumn: {
    flex: 1,
    paddingLeft: 15,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  positionContainer: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#aaa',
  },
  positionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  positionDuration: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  positionDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
