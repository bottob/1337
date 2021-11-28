import LeetEmployeeCard from './LeetEmployeeCard';
import { mount } from '@vue/test-utils';

const factory = (propsData) => mount(LeetEmployeeCard, { propsData });

const standardProps = {
  name: 'Andre Brdoch',
  office: 'Stockholm',
  imageUrl: 'https://avatars.githubusercontent.com/u/31482129?v=4',
  linkedinUrl: 'https://www.linkedin.com/in/andre-brdoch/',
  githubUrl: 'https://github.com/andre-brdoch',
  twitterUrl: 'https://twitter.com/ABrdoch',
};
const noLinkedinProps = {
  ...standardProps,
  linkedinUrl: undefined,
};
const noGithubProps = {
  ...standardProps,
  githubUrl: undefined,
};
const noTwitterProps = {
  ...standardProps,
  twitterUrl: undefined,
};
const noSocialsProps = {
  ...standardProps,
  linkedinUrl: undefined,
  githubUrl: undefined,
  twitterUrl: undefined,
};

describe('LeetEmployeeCard', () => {
  test('exists', () => {
    const wrapper = factory(standardProps);
    expect(wrapper.exists()).toBe(true);
  });
  test('has socials footer', () => {
    const wrapper = factory(standardProps);
    const el = wrapper.find('footer');
    expect(el.exists()).toBe(true);
  });
  describe('without linkedin url', () => {
    test('has no linkedin link', () => {
      const wrapper = factory(noLinkedinProps);
      const el = wrapper.find('.linkedin');
      expect(el.exists()).toBe(false);
    });
  });
  describe('without github url', () => {
    test('has no github link', () => {
      const wrapper = factory(noGithubProps);
      const el = wrapper.find('.github');
      expect(el.exists()).toBe(false);
    });
  });
  describe('without twitter url', () => {
    test('has no twitter link', () => {
      const wrapper = factory(noTwitterProps);
      const el = wrapper.find('.twitter');
      expect(el.exists()).toBe(false);
    });
  });
  describe('without any social url', () => {
    test('has no socials footer', () => {
      const wrapper = factory(noSocialsProps);
      const el = wrapper.find('footer');
      expect(el.exists()).toBe(false);
    });
  });
});
