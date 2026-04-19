

import bellowTitle from "@/assets/images/SolutionDropDownImages/Bellow/bellowTitleImg.svg"
import bellow2nd from "@/assets/images/SolutionDropDownImages/Bellow/bellow2nd.svg"
import bellowFeature from "@/assets/images/SolutionDropDownImages/Bellow/bellowFeature.svg"

import workzenTitle from "@/assets/images/SolutionDropDownImages/Workzen/workZenTitleImg.svg"
import workzen2nd from "@/assets/images/SolutionDropDownImages/Workzen/workZen2nd.svg"
import workzenFeature from "@/assets/images/SolutionDropDownImages/Workzen/workZenFeature.svg"

import crmTitle from "@/assets/images/SolutionDropDownImages/CRM/crmTitleImg.svg"
import crm2nd from "@/assets/images/SolutionDropDownImages/CRM/crm2ndImg.svg"
import crmFeature from "@/assets/images/SolutionDropDownImages/CRM/crmFeature.svg"

import hillTitle from "@/assets/images/SolutionDropDownImages/Hilloby/hillobyTitleImg.svg"
import hillow2nd from "@/assets/images/SolutionDropDownImages/Hilloby/hilloby2ndImg.svg"
import hillowFeature from "@/assets/images/SolutionDropDownImages/Hilloby/hillobyFeature.svg"

import yarantyTitle from "@/assets/images/ServicesSolutionsImgs/yaranty1.svg"
import yaranty2nd from "@/assets/images/ServicesSolutionsImgs/yaranty2.svg"
import yarantyFeature from "@/assets/images/ServicesSolutionsImgs/yaranty3.svg"

export const solutionDataArray = [
  {
    name: "Bello",
    websiteLink: "https://bellofos.com/",

    section1: {
      title: "Bello Is Your Personal Wellness Assistant",
      description:
        "Bello is here to help you maintain a balanced and healthy lifestyle. Track your meals, workouts, sleep patterns, and more, all with the touch of a button. Say goodbye to the hassle of remembering everything, and let Bello handle your wellness journey.",
      image: bellowTitle
    },

    section2: {
      title: "Stay Healthy, Stay Happy with Bello",
      description:
        "From diet management to fitness tracking, Bello makes it easy to take care of your mind and body. Receive personalized recommendations, set goals, and stay motivated with real-time updates.",
      sectionPoints : ["Personalized health and fitness recommendations", "Goal setting to track your progress effectively", "Real-time updates to keep you motivated", "Holistic care for both mind and body"],
      image: bellow2nd
    },

    keyFeatures: {
      keyFeatureTitle: "Key Features of Bello",
      image: bellowFeature,
      features: [
        { title: "Meal Tracking", description: "Track your meals and calories to maintain a balanced diet." },
        { title: "Workout Planner", description: "Create custom workout routines and track your progress." },
        { title: "Sleep Tracker", description: "Monitor your sleep patterns to ensure you’re getting quality rest." },
      ]
    },


  },

  {
  name: "WorkzenPro",
  websiteLink: "https://workzenpro.com/",

  section1: {
    title: "Workzen Is Your Smarter Workforce Management",
    description:
      "Workzen Pro is the go-to tool for keeping track of your team’s shifts, timetables, attendance, and more, all in one user-friendly platform. Developed by NextGen360 (TSP), it helps you stay organised, save time, and ensure everything runs smoothly. By using our Workzen Pro product, it doesn't matter if you're managing a small team or overseeing a growing business, no matter how busy things get, Workzen Pro keeps everything under control, so you can focus on what really matters.",
    image: workzenTitle
  },

  section2: {
    title: "One Platform to Manage Shifts, Attendance, and Time – Effortlessly",
    description:
      "Workzen Pro simplifies managing shifts, attendance, and schedules, removing the hassle of spreadsheets. It keeps everything organised with real-time updates and automatic alerts, so you’re always in the loop. No more last-minute confusion or missed shifts, just an easy-to-use platform that helps keep things running smoothly. This tool supports your team’s efficiency while saving time and reducing errors, making your day-to-day operations more manageable. It's all about streamlining your workforce management without the stress.",
    sectionPoints: [
      "Reduce Errors in attendance tracking",
      "Boost Accountability across your team",
      "Stress-Free Scheduling with zero headaches",
      "Scalable as your business grows"
    ],
    image: workzen2nd
  },

  keyFeatures: {
    keyFeatureTitle: "Key Features of Workzen Pro",
    image: workzenFeature,
    features: [
      { title: "Shift Planning Made Simple", description: "Create, tweak, and assign shifts easily based on your team's availability, in a simple way." },
      { title: "Accurate Attendance Tracking", description: "No more guesswork. Our system tracks every check-in, check-out, and completed shift automatically." },
      { title: "Real-Time Updates", description: "Instant alerts when shifts change, swap, or wrap up. No more chasing people for updates!" },
      { title: "Complete Employee Records", description: "Everything you need in one place: hours worked, shift patterns, holiday requests, overtime, all tracked seamlessly." },
      { title: "User-Friendly Dashboard", description: "A clean, simple dashboard that’s intuitive for both managers and staff. No tech jargon, just results." }
    ]
  }
},

{
  name: "EchoCRM",
  websiteLink: "https://tech-solutionspro.com/",

  section1: {
    title: "EchoCRM – The Best CRM for Your Business",
    description:
      "Manage leads, customers, and sales all in one platform. EchoCRM helps you stay connected with your customers, providing detailed analytics and tools to close more deals.",
    image: crmTitle
  },

  section2: {
    title: "CRM Made Easy with EchoCRM",
    description:
      "EchoCRM offers everything you need to manage your customer relationships. Automate your sales pipeline, track customer interactions, and measure performance, all from one platform.",
    sectionPoints: [
      "Simplifies warranty and claim management",
      "Real-time updates for full transparency",
      "In-depth performance analysis",
      "Easy-to-use dashboards for both businesses and customers"
    ],
    image: crm2nd
  },

  keyFeatures: {
    keyFeatureTitle: "Key Features of EchoCRM",
    image: crmFeature,
    features: [
      {
        title: "Sales Pipeline Management",
        description: "Easily track your leads and sales, from initial contact to closing the deal."
      },
      {
        title: "Customer Interaction Tracking",
        description: "Keep detailed notes on all customer interactions for better relationship management."
      },
      {
        title: "Performance Analytics",
        description: "Gain insights into your sales team's performance and optimize your strategy."
      }
    ]
  }
},
{
  name: "Yaranty",
  websiteLink: "https://tech-solutionspro.com/",

  section1: {
    title: "Yaranty: Your Go-To Solution for Warranty and Claim Management",
    description:
      "At NextGen360, we've developed Yaranty, a simple yet powerful tool designed to help businesses in the automobile industry easily manage warranties and claims. Are you a service provider or a vehicle owner and need a tool that manages it for you? Our platform streamlines the whole process. With Yaranty, you can store and access warranty info for various vehicle brands, track claims in real time, and get valuable performance insights through detailed reports, all through an intuitive dashboard.",
    image: yarantyTitle
  },

  section2: {
    title: "Optimising Warranty Management for the Automobile Industry",
    description:
      "Yaranty, developed by NextGen360, is the tool you've been looking for to optimise warranty and claim management in the automobile industry. We've created a platform that simplifies the whole process, making it easier for service providers and vehicle owners to track, manage, and access warranty information. With Yaranty, you get real-time insights, so you can stay on top of everything, ensuring smoother service and greater customer satisfaction. It's all about making your warranty management seamless and more efficient. Sign up now and experience the difference.",
    sectionPoints: [
      "Simplifies warranty and claim management",
      "Real-time updates for full transparency",
      "In-depth performance analysis",
      "Easy-to-use dashboards for both businesses and customers"
    ],
    image: yaranty2nd
  },

  keyFeatures: {
    keyFeatureTitle: "Key Features of Yaranty",
    image: yarantyFeature,
    features: [
      {
        title: "Store warranty details for multiple vehicle models",
        description:
          "With Yaranty, you can easily store warranty details for multiple vehicle models, keeping everything organised in one place. No more sifting through piles of paperwork or losing track of essential details, it's all just a few clicks away."
      },
      {
        title: "Track and manage claims in real time",
        description:
          "You can also track and manage claims in real time, ensuring you stay ahead of any issues. As soon as a claim is made, you'll know exactly where it stands and what actions need to be taken."
      },
      {
        title: "Access detailed reports for improved service and performance",
        description:
          "Plus, access detailed reports that give you valuable insights into service performance and claims trends. This helps you fine-tune your operations and improve customer satisfaction."
      }
    ]
  }
},

{
  name: "NowSafar",
  websiteLink: "https://tech-solutionspro.com/",

  section1: {
    title: "Now Safar: The Smarter Way to Manage Visitors, Staff, and Contractors",
    description:
      "At NextGen360, we’re introducing our visitor and contractor management tool, simple yet powerful, designed to make managing visitors, staff, and contractors easier and more organised. It doesn’t matter whether you're running a busy office, a school, or a construction site; our platform streamlines the whole process for you. With Hilobby, you can easily manage check-ins and check-outs, track visitor activity, monitor staff attendance, and access detailed reports, all through an intuitive dashboard.",
    image: hillTitle
  },

  section2: {
    title: "Why Choose Hilobby?",
    description:
      "Hilobby, developed by NextGen360, is the solution you need to bring ease and clarity to managing visitors, staff, and contractors. We’ve built a platform that takes away the hassle of paper logs and messy attendance sheets. With Hilobby, you get real-time updates, clear records, and better oversight, helping you keep everything running smoothly and securely. It’s all about making your workplace more organised, welcoming, and efficient. Try Hilobby now and see the difference for yourself.",
    sectionPoints: [
      "Makes visitor and staff management simple",
      "Real-time updates for better oversight",
      "Clear reporting for improved security and planning",
      "Easy-to-use dashboards for admin teams and staff"
    ],
    image: hillow2nd
  },

  keyFeatures: {
    keyFeatureTitle: "Key Features of Hilobby",
    image: hillowFeature,
    features: [
      {
        title: "Effortless Check-In and Check-Out Tracking",
        description:
          "With Hilobby, you can easily keep track of every visitor, staff member, and contractor entering and leaving your premises. No more manual logbooks or missed records, everything’s securely stored and easily accessible."
      },
      {
        title: "Staff Attendance Management",
        description:
          "Our platform also lets you monitor your staff’s attendance in real time. It’s simple to see who’s in, who’s out, and keep a reliable record for HR and management purposes."
      },
      {
        title: "Comprehensive Reports for Clear Insights",
        description:
          "Hilobby provides detailed reports that offer clear insights into visitor trends, staff attendance, and contractor activity. These reports help you spot patterns, improve security, and boost operational efficiency."
      },
      {
        title: "Complete Employee Records",
        description:
          "Everything you need in one place: hours worked, shift patterns, holiday requests, overtime, all tracked seamlessly."
      },
      {
        title: "User-Friendly Dashboard",
        description:
          "A clean, simple dashboard that’s intuitive for both managers and staff. No tech jargon, just results."
      }
    ]
  }
},


{
  name: "Plannza",
  websiteLink: "https://plannza.com/",

  section1: {
    title: "Plannza: The Smarter Way to Manage Visitors, Staff, and Contractors",
    description:
      "At NextGen360, we’re introducing our visitor and contractor management tool, simple yet powerful, designed to make managing visitors, staff, and contractors easier and more organised. It doesn’t matter whether you're running a busy office, a school, or a construction site; our platform streamlines the whole process for you. With Hilobby, you can easily manage check-ins and check-outs, track visitor activity, monitor staff attendance, and access detailed reports, all through an intuitive dashboard.",
    image: hillTitle
  },

  section2: {
    title: "Why Choose Hilobby?",
    description:
      "Hilobby, developed by NextGen360, is the solution you need to bring ease and clarity to managing visitors, staff, and contractors. We’ve built a platform that takes away the hassle of paper logs and messy attendance sheets. With Hilobby, you get real-time updates, clear records, and better oversight, helping you keep everything running smoothly and securely. It’s all about making your workplace more organised, welcoming, and efficient. Try Hilobby now and see the difference for yourself.",
    sectionPoints: [
      "Makes visitor and staff management simple",
      "Real-time updates for better oversight",
      "Clear reporting for improved security and planning",
      "Easy-to-use dashboards for admin teams and staff"
    ],
    image: hillow2nd
  },

  keyFeatures: {
    keyFeatureTitle: "Key Features of Hilobby",
    image: hillowFeature,
    features: [
      {
        title: "Effortless Check-In and Check-Out Tracking",
        description:
          "With Hilobby, you can easily keep track of every visitor, staff member, and contractor entering and leaving your premises. No more manual logbooks or missed records, everything’s securely stored and easily accessible."
      },
      {
        title: "Staff Attendance Management",
        description:
          "Our platform also lets you monitor your staff’s attendance in real time. It’s simple to see who’s in, who’s out, and keep a reliable record for HR and management purposes."
      },
      {
        title: "Comprehensive Reports for Clear Insights",
        description:
          "Hilobby provides detailed reports that offer clear insights into visitor trends, staff attendance, and contractor activity. These reports help you spot patterns, improve security, and boost operational efficiency."
      },
      {
        title: "Complete Employee Records",
        description:
          "Everything you need in one place: hours worked, shift patterns, holiday requests, overtime, all tracked seamlessly."
      },
      {
        title: "User-Friendly Dashboard",
        description:
          "A clean, simple dashboard that’s intuitive for both managers and staff. No tech jargon, just results."
      }
    ]
  }
}


];
