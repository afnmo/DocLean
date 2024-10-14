import logo from './logo.png'
import doctors from './doctors.png'
import Cardiology from './Cardiology.png'
import Dermatology from './Dermatology.png'
import General_Physician from './General_Physician.png'
import Neurology from './Neurology.png'
import Orthopedics from './Orthopedics.png'
import Pediatrics from './Pediatrics.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'


export const assets = {
    logo,
    doctors

}


export const specialityData = [
    {
      speciality: 'General Physician',
      image: General_Physician,
    },
    {
      speciality: 'Cardiology',
      image: Cardiology, 
    },
    {
      speciality: 'Dermatology',
      image: Dermatology,
    },
    {
      speciality: 'Pediatrics',
      image: Pediatrics, 
    },
    {
      speciality: 'Orthopedics',
      image: Orthopedics, 
    },
    {
      speciality: 'Neurology',
      image: Neurology, 
    },
  
  ];
  

  export const doctorsData = [
    {
      _id: 'doc1',
      name: 'Dr. John Williams',
      image: doc1,
      speciality: 'General Physician',
      degree: 'MBBS, MD (General Medicine)',
      experience: '10 years',
      about: 'Dr. John Williams is a highly skilled General Physician with a decade of experience in treating common illnesses and preventive care.',
      fees: '$50',
      address: {
        line1: '123 Health St.',
        line2: 'Medical City, NY 10001',
      },
      slots: [
        {
          date: '2024-10-14',
          day: 'MON',
          times: ['10:00 AM', '10:30 AM', '11:00 AM'],
        },
        {
          date: '2024-10-16',
          day: 'WED',
          times: ['1:00 PM', '1:30 PM', '2:00 PM'],
        },
        {
          date: '2024-10-18',
          day: 'FRI',
          times: ['9:00 AM', '9:30 AM'],
        },
      ],
    },
    {
      _id: 'doc2',
      name: 'Dr. Hary Harris',
      image: doc2,
      speciality: 'Cardiology',
      degree: 'MBBS, MD (Cardiology), FACC',
      experience: '12 years',
      about: 'Dr. Harry Harris is a renowned Cardiologist, specializing in diagnosing and treating heart-related issues with advanced care.',
      fees: '$100',
      address: {
        line1: '456 Heart Avenue',
        line2: 'Cardio Center, CA 90210',
      },
      slots: [
        {
          date: '2024-10-12',
          day: 'SAT',
          times: ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM'],
        },
        {
          date: '2024-10-15',
          day: 'TUE',
          times: ['2:00 PM', '2:30 PM', '3:00 PM'],
        },
      ],
    },
    {
      _id: 'doc3',
      name: 'Dr. Michael Lee',
      image: doc3,
      speciality: 'Dermatology',
      degree: 'MBBS, MD (Dermatology)',
      experience: '8 years',
      about: 'Dr. Michael Lee is a Dermatologist focused on skin, hair, and nail treatments, with expertise in cosmetic and medical dermatology.',
      fees: '$75',
      address: {
        line1: '789 Skin Care Blvd.',
        line2: 'Dermatology Clinic, FL 33101',
      },
      slots: [
        {
          date: '2024-10-13',
          day: 'SUN',
          times: ['11:00 AM', '11:30 AM', '12:00 PM'],
        },
        {
          date: '2024-10-17',
          day: 'THU',
          times: ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM'],
        },
        {
          date: '2024-10-20',
          day: 'SUN',
          times: ['12:30 PM', '1:00 PM'],
        },
      ],
    },
    {
      _id: 'doc4',
      name: 'Dr. Emma Rodriguez',
      image: doc4,
      speciality: 'Pediatrics',
      degree: 'MBBS, MD (Pediatrics)',
      experience: '6 years',
      about: 'Dr. Emma Rodriguez is a Pediatrician with a strong passion for child health, from newborns to teenagers, ensuring comprehensive care.',
      fees: '$60',
      address: {
        line1: '321 Children’s St.',
        line2: 'Pediatrics Center, TX 75201',
      },
      slots: [
        {
          date: '2024-10-11',
          day: 'FRI',
          times: ['10:00 AM', '10:30 AM', '11:00 AM'],
        },
        {
          date: '2024-10-13',
          day: 'SUN',
          times: ['2:30 PM', '3:00 PM', '3:30 PM'],
        },
        {
          date: '2024-10-19',
          day: 'SAT',
          times: ['12:00 PM', '12:30 PM', '1:00 PM'],
        },
      ],
    },
    {
      _id: 'doc5',
      name: 'Dr. Josef Brown',
      image: doc5,
      speciality: 'Orthopedics',
      degree: 'MBBS, MS (Orthopedics)',
      experience: '9 years',
      about: 'Dr. Josef Brown is a leading Orthopedic Surgeon specializing in musculoskeletal conditions, sports injuries, and joint replacements.',
      fees: '$120',
      address: {
        line1: '987 Bone Care Road',
        line2: 'Ortho Clinic, IL 60616',
      },
      slots: [
        {
          date: '2024-10-14',
          day: 'MON',
          times: ['8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM'],
        },
        {
          date: '2024-10-16',
          day: 'WED',
          times: ['11:00 AM', '11:30 AM'],
        },
        {
          date: '2024-10-20',
          day: 'SUN',
          times: ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'],
        },
      ],
    },  
    {
        _id: 'doc6',
        name: 'Dr. John Williams',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS, MD (General Medicine)',
        experience: '10 years',
        about: 'Dr. John Williams is a highly skilled General Physician with a decade of experience in treating common illnesses and preventive care.',
        fees: '$50',
        address: {
          line1: '123 Health St.',
          line2: 'Medical City, NY 10001',
        },
        slots: [
          {
            date: '2024-10-13',
            day: 'SUN',
            times: ['11:00 AM', '11:30 AM', '12:00 PM'],
          },
          {
            date: '2024-10-17',
            day: 'THU',
            times: ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM'],
          },
          {
            date: '2024-10-20',
            day: 'SUN',
            times: ['12:30 PM', '1:00 PM'],
          },
        ],
      },
      {
        _id: 'doc7',
        name: 'Dr. Hary Harris',
        image: doc2,
        speciality: 'Cardiology',
        degree: 'MBBS, MD (Cardiology), FACC',
        experience: '12 years',
        about: 'Dr. Harry Harris is a renowned Cardiologist, specializing in diagnosing and treating heart-related issues with advanced care.',
        fees: '$100',
        address: {
          line1: '456 Heart Avenue',
          line2: 'Cardio Center, CA 90210',
        },
        slots: [
          {
            date: '2024-10-14',
            day: 'MON',
            times: ['8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM'],
          },
          {
            date: '2024-10-16',
            day: 'WED',
            times: ['11:00 AM', '11:30 AM'],
          },
          {
            date: '2024-10-20',
            day: 'SUN',
            times: ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'],
          },
        ],
      },
      {
        _id: 'doc8',
        name: 'Dr. Michael Lee',
        image: doc3,
        speciality: 'Dermatology',
        degree: 'MBBS, MD (Dermatology)',
        experience: '8 years',
        about: 'Dr. Michael Lee is a Dermatologist focused on skin, hair, and nail treatments, with expertise in cosmetic and medical dermatology.',
        fees: '$75',
        address: {
          line1: '789 Skin Care Blvd.',
          line2: 'Dermatology Clinic, FL 33101',
        },
        slots: [
          {
            date: '2024-10-12',
            day: 'SAT',
            times: ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM'],
          },
          {
            date: '2024-10-15',
            day: 'TUE',
            times: ['2:00 PM', '2:30 PM', '3:00 PM'],
          },
        ],
      },

  ];
  