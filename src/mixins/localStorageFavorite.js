import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      favorite: JSON.parse(localStorage.getItem('myFavorite')) || [],
    };
  },
  methods: {
    toggleFavorite(id) {
      // indexOf, findIndex 都可以
      const index = this.favorite.findIndex((item) => item === id);
      if (index === -1) {
        this.favorite.push(id);
        emitter.emit('push-message', {
          style: 'success',
          title: '加入最愛',
        });
      } else {
        this.favorite.splice(index, 1);
        emitter.emit('push-message', {
          style: 'danger',
          title: '移除最愛',
        });
      }
    },
  },
  watch: {
    favorite: {
      deep: true,
      handler() {
        localStorage.setItem('myFavorite', JSON.stringify(this.favorite));
      },
    },
  },
};
