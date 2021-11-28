<template>
  <article :class="$style.root">
    <header :class="$style.header">
      <div :class="$style.titlesCtn">
        <LeetTitle tag="h3">
          {{ name }}
        </LeetTitle>
        <!-- for semantic reasons title comes first. We visually reorder the elements via CSS -->
        <LeetTitle size="s" :class="$style.eyebrow">
          {{ office }}
        </LeetTitle>
      </div>

      <!-- for semantic reasons title comes first. We visually reorder the elements via CSS -->
      <img :src="imageUrlComputed" :alt="name" :class="$style.img">
    </header>

    <footer v-if="socials.length" :class="$style.socials">
      <a
        v-for="social in socials"
        :key="social.name"
        :class="[ $style.social, $style[social.name] ]"
        :href="social.url"
        :title="social.label"
        :aria-label="social.label" />
    </footer>
  </article>
</template>

<script>
import LeetTitle from '../LeetTitle';

export default {
  components: { LeetTitle },

  props: {
    name: {
      type: String,
      required: true,
    },
    office: {
      type: String,
      required: true,
    },
    imageUrl: { type: String },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    twitterUrl: { type: String },
  },

  computed: {
    /* In case that no image is available, show placeholder instead */
    imageUrlComputed() {
      return (
        this.imageUrl || 'https://avatars.githubusercontent.com/u/583231?v=4'
      );
    },
    socials() {
      return [
        {
          name: 'linkedin',
          url: this.linkedinUrl,
          logoUrl: 'test',
        },
        {
          name: 'github',
          url: this.githubUrl,
          logoUrl: 'test',
        },
        {
          name: 'twitter',
          url: this.twitterUrl,
          logoUrl: 'test',
        },
      ]
        .filter((social) => social.url)
        .map((social) => ({
          ...social,
          label: `${social.name} profile of ${this.name}`,
        }));
    },
  },
};
</script>

<style module lang="scss">
%stack {
  display: grid;
  grid-template-columns: 1fr;
}

%sortToFirst {
  grid-row-start: 1;
}

.root {
  @extend %stack;
  grid-gap: var(--space-m);
  // bottom align footer to ensure alignment if name spans different amount of lines
  align-content: space-between;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: var(--space-s);
}

.header {
  @extend %stack;
  grid-gap: var(--space-m);
}

.titlesCtn {
  @extend %stack;
  grid-gap: var(--space-xs);
}

.eyebrow {
  /* move eyebrow above title */
  @extend %sortToFirst;
}

.img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center top;
  border-radius: 9999px;
  border: 4px solid var(--color-brand-accent);
  /* move image above title */
  @extend %sortToFirst;
}

.socials {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.social {
  display: block;
  width: var(--space-m);
  border-radius: 2px;
  background-size: contain;
  background-position: center center;
  transition: transform 0.1s ease-out;

  &:after {
    // preserve square aspect ratio
    content: '';
    display: block;
    padding-top: 100%;
  }
  &:hover {
    transform: translateY(-2px);
  }
  &.linkedin {
    background-image: url('/images/icon-linkedin.svg');
  }
  &.github {
    background-image: url('/images/icon-github.svg');
  }
  &.twitter {
    background-image: url('/images/icon-twitter.svg');
  }
}
</style>
