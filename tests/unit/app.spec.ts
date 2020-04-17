import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import App from '@/App.vue';
import reposResponses from '../__fixtures__/reposResponses';
import axios from 'axios';


jest.mock('axios');

(axios.get as jest.Mock).mockImplementation((url) => {
  switch (url) {
    case `${process.env.VUE_APP_BACKEND_ENDPOINT}/getmyrepos?page=1`:
      return Promise.resolve({data : reposResponses.page1});
    case `${process.env.VUE_APP_BACKEND_ENDPOINT}/getmyrepos?page=2`:
      return Promise.resolve({data : reposResponses.page2});
  }
});

describe('App.vue component', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallowMount(App);
  });
  it('renders repositories on mount', async () => {
    await Vue.nextTick();
    expect(wrapper.findAll('repository-stub').length).toEqual(30);
  });
  it('fetches other repositories on load more', async () => {
    await Vue.nextTick();
    wrapper.vm.fetchRepositories();
    await Vue.nextTick();
    expect(wrapper.findAll('repository-stub').length).toEqual(60);
  });
});
