import { observable, flow } from 'mobx';

import CandidatesApi from '../api/candidates.api';
import { Candidate } from '../types';

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
}

export default new CandidatesStore();
