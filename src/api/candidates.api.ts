import Api from './index';

import { Candidate } from '../types';

interface ICandidatesApi {
  getList: () => Promise<any>,
  apply: (body: Candidate) => Promise<any>,
  patch: (id: string, body: Candidate) => Promise<any>,
  delete: (id: string) => Promise<any>, 
};

class CandidatesApi extends Api implements ICandidatesApi{
  getList = () => this.request('candidates');

  apply = (body: Candidate) => this.request('candidates/apply', {
      method: 'post',
      body: JSON.stringify(body),
  });

  patch = (id: string, body: Candidate) => this.request(`candidates/${id}`, {
    method: 'patch',
    body: JSON.stringify(body)
  });

  delete = (id: string) => this.request(`candidates/${id}`, {
      method: 'delete',
      body: null,
  });
}

export default new CandidatesApi();
