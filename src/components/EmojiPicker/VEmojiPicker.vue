<template>
  <div id="EmojiPicker">
    <Categories
        v-if="showCategory"
        @select="onChangeCategory($event)"
    />
    <EmojiList
        :data="emojis"
        :category="category"
        :filter="filterEmoji"
        :emojisByRow="emojisByRow"
        :continuousList="continuousList"
        @select="onSelectEmoji($event)"
    />
  </div>
</template>

<script>
import Categories from './Categories'
import EmojiList from './EmojiList'

export default {
  name: 'VEmojiPicker',
  props: {
    pack: {type: Array, required: false},
    labelSearch: {type: String},
    showCategory: {type: Boolean, default: false},
    emojisByRow: {type: Number, default: 10},
    showSearch: {type: Boolean, default: () => false},
    continuousList: {type: Boolean, default: () => true}
  },
  components: {
    Categories,
    EmojiList
  },
  data: () => ({
    mapEmojis: {},
    category: 'Peoples',
    filterEmoji: ''
  }),
  created() {
    this.mapperData(this.pack)
  },
  methods: {
    onChangeCategory(category) {
      this.category = category.name
      this.$emit('changeCategory', this.category)
    },
    onSelectEmoji(emoji) {
      // this.updateFrequenty(emoji)
      this.$emit('select', emoji)
    },
    updateFrequenty(emoji) {
      this.mapEmojis['Frequenty'] = [...new Set([...this.mapEmojis['Frequenty'], emoji])]
    },
    mapperData(dataEmojis) {
      this.$set(this.mapEmojis, 'Frequenty', [])

      dataEmojis.forEach(emoji => {
        const _category = emoji['category']

        if (!this.mapEmojis[_category]) {
          this.$set(this.mapEmojis, _category, [emoji])
        } else {
          this.mapEmojis[_category].push(emoji)
        }
      })
    }
  },
  beforeDestroy() {
    delete this.mapEmojis
  },
  computed: {
    emojis() {
      return this.mapEmojis
    }
  }
}
</script>

<style>
</style>
