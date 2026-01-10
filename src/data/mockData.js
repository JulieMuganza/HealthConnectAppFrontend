export const USERS = {
    patient: {
        id: 'p1',
        name: 'Amanda Smith',
        role: 'patient',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmandaSmith',
        email: 'amanda@example.com',
        phone: '+1 (555) 123-4567',
        dob: '1985-04-12',
        emergencyContact: 'Michael Smith - Husband (+1 555-987-6543)',
        medicalHistory: [
            'Hypertension (diagnosed 2020)',
            'Type 2 Diabetes (managed)',
            'Penicillin Allergy'
        ]
    },
    doctor: {
        id: 'd1',
        name: 'Dr. Leonard McCoy',
        role: 'doctor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=McCoy',
        occupation: 'Cardiologist',
        email: 'mccoy@clinic.com'
    }
};

export const MEDICATIONS = [
    {
        id: 'm1',
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily',
        time: '8:00 PM',
        timeLeft: '10 days left',
        nextDose: '20:00',
        status: 'pending',
        progress: 70,
        instructions: 'Take with food. Avoid grapefruit juice.',
        duration: 'Ongoing'
    },
    {
        id: 'm2',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        time: '8:00 AM',
        timeLeft: 'Ongoing',
        nextDose: '08:00',
        status: 'taken',
        progress: 100,
        instructions: 'Take in the morning on an empty stomach.',
        duration: 'For 30 days'
    }
];

export const MEDICATION_HISTORY = [
    { id: 'h1', name: 'Atorvastatin', date: 'Yesterday', time: '20:05', status: 'Taken' },
    { id: 'h2', name: 'Lisinopril', date: 'Yesterday', time: '08:00', status: 'Taken' }
];

export const APPOINTMENTS = [
    {
        id: 'a1',
        doctorName: 'Dr. Leonard McCoy',
        doctorRole: 'Cardiologist',
        date: 'Today',
        time: '14:30',
        type: 'Follow-up Checkup',
        avatar: USERS.doctor.avatar,
        status: 'upcoming',
        location: 'Heart Clinic, Room 304',
        duration: '30 min',
        instructions: 'Please bring your blood pressure log.'
    },
    {
        id: 'a2',
        doctorName: 'Dr. Sarah Smith',
        doctorRole: 'General Practitioner',
        date: '15 Oct',
        time: '09:00',
        type: 'Annual Physical',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        status: 'upcoming',
        location: 'Main Hospital, Wing B',
        duration: '60 min',
        instructions: 'Fast for 12 hours prior to appointment.'
    }
];

export const MESSAGES = [
    {
        id: 'msg1',
        sender: 'Dr. Leonard McCoy',
        content: 'Please remember to bring your latest blood pressure logs to the next visit.',
        timestamp: '09:15 AM',
        unread: true,
        avatar: USERS.doctor.avatar
    },
    {
        id: 'msg2',
        sender: 'Clinic Reception',
        content: 'Your appointment for October 15th has been confirmed.',
        timestamp: 'Yesterday',
        unread: false,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Clinic'
    }
];

export const HEALTH_STATS = {
    progress: 120,
    progressChange: '-5 pts',
    progressLabel: 'Avg. Blood Pressure (Sys)',
    sessions: 72,
    sessionsChange: 'Normal',
    sessionsLabel: 'Resting Heart Rate'
};
