import './style.css';
import { GridStackGallery } from './gallery';

(function (fns = [GridStackGallery]) {
  for (const func of fns) {
    if (document.readyState != 'loading') {
      func();
    } else {
      document.addEventListener('DOMContentLoaded', () => func());
    }
  }
})();
