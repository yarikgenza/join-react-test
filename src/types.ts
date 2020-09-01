export enum CandidateStates {
    SUBMITTED = "submitted",
    IN_REVIEW = "in review",
    NOT_A_FIT = "not a fit",
    HIRED = "hired",
}

export type Candidate = {
    id?: string,
    fullName?: string,
    email?: string,
    password?: string,
    phone?: string,
    applied_on?: string,
    state?: keyof typeof CandidateStates
};