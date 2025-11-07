import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faUser} from '@fortawesome/free-solid-svg-icons';

const subjects = [
  {
    name: 'DATA STRUCTURES',
    code: '23MCA1CC1',
    total: 60,
    present: 40,
    absent: 20,
    semester: 'Sem 1',
    color: 'bg-violet-600',
  },
  {
    name: 'OPERATING SYSTEM',
    code: '23MCA1CC2',
    total: 70,
    present: 48,
    absent: 22,
    semester: 'Sem 1',
    color: 'bg-blue-500',
  },
  {
    name: 'R PROGRAMMING',
    code: '23MCA1CC3',
    total: 65,
    present: 50,
    absent: 15,
    semester: 'Sem 1',
    color: 'bg-violet-600',
  },
  {
    name: 'R PROGRAMMING',
    code: '23MCA1CC3',
    total: 65,
    present: 50,
    absent: 15,
    semester: 'Sem 1',
    color: 'bg-violet-600',
  },
  {
    name: 'R PROGRAMMING',
    code: '23MCA1CC3',
    total: 65,
    present: 50,
    absent: 15,
    semester: 'Sem 1',
    color: 'bg-violet-600',
  },
];

function Home() {
  return (
    <div className="p-4  bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow mb-4">
        <FontAwesomeIcon icon={faUser} className="text-blue-500 text-xl" />
        <span className="text-blue-600 font-semibold">
          Hello Abdul Rasak
        </span>
      </div>
      <div className='lg:flex  lg:flex-row lg:justify-between'>
      {subjects.map((subject, index) => (
        <div
          key={index}
          className={`rounded-xl p-3 mb-5 text-white shadow-lg ${subject.color}`}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBook} className="text-white" />
              <span className="font-bold">{subject.name}</span>
            </div>
            <span className="bg-white text-blue-500 text-xs px-2 py-1 rounded-full font-semibold">
              {subject.semester}
            </span>
          </div>

          <div className="bg-white text-black rounded-xl p-3">
            <p className="text-sm mb-2">
              SUBJECT CODE : <span className="font-semibold">{subject.code}</span>
            </p>
            <div className="flex justify-around text-center font-semibold text-sm">
              <div>
                <p className="text-gray-700">TOTAL</p>
                <p className="text-red-500">{subject.total}</p>
              </div>
              <div>
                <p className="text-gray-700">PRESENT</p>
                <p className="text-green-500">{subject.present}</p>
              </div>
              <div>
                <p className="text-gray-700">ABSENT</p>
                <p className="text-purple-600">{subject.absent}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      </div>
    </div>
  );
}

export default Home;
