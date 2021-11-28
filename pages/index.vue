<template>
  <div>
    <LeetTitle>Hello world</LeetTitle>

    <br>

    <div :class="$style.tempCard">
      <LeetEmployeeCard v-bind="test" />
    </div>
  </div>
</template>

<script>
import LeetEmployeeCard from '@/components/LeetEmployeeCard';
import LeetTitle from '@/components/LeetTitle';

export default {
  components: { LeetTitle, LeetEmployeeCard },

  data() {
    return {
      test: {
        name: 'Octocat',
        office: 'Stockholm',
        imageUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
        linkedinUrl: 'https://www.linkedin.com',
        githubUrl: 'https://github.com',
        twitterUrl: 'https://twitter.com',
      },
    };
  },
};
</script>

<style module>
.tempCard {
  max-width: 20rem;
}
</style>
