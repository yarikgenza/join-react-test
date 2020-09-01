import { observable, flow, action } from 'mobx';

import { Candidate, CandidateStates } from '../types';
import CandidatesApi from '../api/candidates.api';

interface ICandidateStore {
    candidates: Array<Candidate>,
    isLoading:  boolean,
}

class CandidatesStore implements ICandidateStore {
  @observable candidates: Array<Candidate> = [];
  @observable isLoading: boolean = false;

  fetchList = flow(function* (this: any) {
    const list = yield CandidatesApi.getList();
    this.candidates = list;
  });

  apply = flow(function* (payload) {
    yield CandidatesApi.apply(payload);
  });

  @action removeCandidate = (candidateId?: string) => {
    this.candidates = this.candidates.filter(c => c.id !== candidateId);
  }

  @action updateState = (candidateId: string, state: keyof typeof CandidateStates) => {
    for (let candidate of this.candidates) {
      if (candidate.id === candidateId) {
        candidate.state = state;
        break;
      }
    }
  };
}

export default new CandidatesStore();
