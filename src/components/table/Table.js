import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      event.preventDefault();

      const type = event.target.dataset.resize;
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const id = $parent.data.col;
      const cells = this.$root.getAll(`[data-col="${id}"]`);

      document.onmousemove = e => {
        $resizer.$el.focus();
        const delta = e[type === 'col' ? 'pageX' : 'pageY'] -
          coords[type === 'col' ? 'right' : 'bottom'];
        const value = coords[type === 'col' ? 'width' : 'height'] + delta;
        $parent.$el.style[type === 'col' ? 'width' : 'height'] = value + 'px';

        if (type === 'col') {
          cells.forEach(item => {
            item.style.width = value + 'px';
          })
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      }
    }
  }
}
