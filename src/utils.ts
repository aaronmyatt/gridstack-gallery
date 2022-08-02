export default {
  first<T>(array: T[], fallback?: T) {
    return array.reduce(function (_curr, _prev, _index, arr) {
      return arr[0];
    }, fallback);
  },
};