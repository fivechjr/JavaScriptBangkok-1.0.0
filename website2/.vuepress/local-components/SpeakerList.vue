<template>
  <ul>
    <li
      v-for="(speaker, index) of speakers"
      tabindex="0"
      :key="index"
      @click="$emit('clickSpeaker', speaker)"
      @keypress="$event.keyCode === 13 && $emit('clickSpeaker', speaker)">
      <div class="image-wrapper">
        <img :src="speaker.image || 'https://picsum.photos/120/120'">
      </div>
      <div class="talk-info">
        <h3 class="speaker-name text-center">{{ speaker.name }}</h3>
        <p class="text-center line-clamp-3">{{ speaker.title }}</p>
        <h3 class="see-more text-right">see more...</h3>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.image-wrapper > img {
  border-radius: 50%;
  height: 96px;
  width: 96px;
}
@media (min-width: 1100px) {
  .image-wrapper > img {
    height: 120px;
    width: 120px;
  }
}
ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: -10px;
}
li {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  position: relative;
  cursor: pointer;
  transition: opacity ease-out 0.3s;
  margin: 10px;
  width: 100%;
}
li:hover {
  opacity: 0.7;
}
@media (min-width: 640px) {
  li {
    width: 168px;
  }
}
.talk-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}
h3 {
  color: #eaba06;
}
h3.see-more {
  margin-top: auto;
}
@media (min-width: 640px) {
  h3.speaker-name {
    min-height: 41.82px;
  }
}
p {
  color: #767676;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>

<script>
export default {
  name: "SpeakerList",
  props: {
    speakers: {
      type: Array,
      default: () => []
    }
  }
};
</script>
