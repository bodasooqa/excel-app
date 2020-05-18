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
      const cells = this.$root.getAll(`[data-col="${$parent.data.col}"]`);

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta + 'px';
          $parent.css({ width: value });
          cells.forEach(item => {
            $(item).css({ width: value });
          })
        } else {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta + 'px';
          $parent.css({ height: value });
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      }
    }
  }
}
