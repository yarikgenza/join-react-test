import { Candidate } from '../types';

const calculateApplicationScore = (candidateProfile: Candidate): number => {
    let totalScore = 0;

    if (candidateProfile.fullName) totalScore += 20;
    if (candidateProfile.email) totalScore += 20;
    if (candidateProfile.password) totalScore += 20;
    if (candidateProfile.phone) totalScore += 40

    return totalScore;
};

export default calculateApplicationScore;
