import { phxApp_ } from './phx_app.js';

export class phoenixModel {
  constructor(options) {
    var default_options = {
      moduleName: "User",
      link: "users",
      tableSelector: "#users",
      data: {},
      allData: [],
      buttons: [],
      tableButtons: [],
      table: null,
      columns: [],
      customCols: null,
      aliasName: null,
      onDrawFn: null,
      makeid: {},
      xcard: null
    }

    var keys = Object.keys(default_options)
    keys.forEach((v, i) => {
      this[v] = default_options[v]
    })
    keys.forEach((v, i) => {
      if (options[v] != null) {
        this[v] = options[v]
      }
    })

    var phxData = this.data, currentPhxModel = this;

    function loadDefaultGrid(object) {
      $(object.tableSelector).closest(".dataTables_wrapper").find(".grid_view .xc").each((ti, tv) => {
        var data = tv.data
        console.log("xcard..")
        if (object.xcard != null) {
          var res = object.xcard(data);
          $(tv).prepend(res)
        } else {
          var cols = []
          object.columns.forEach((v, i) => {
            var col = `
              <div class="d-flex flex-column pb-2" role="grid_data" aria-label="` + v.label + `">
                <label class="fw-light font-sm text-secondary">` + v.label + `</label>
                <div>` + this.dataFormatter(data, v) + `</div>
              </div>`
            cols.push(col)
          })

          var div = document.createElement("div")
          div.className = " card p-2"
          div.innerHTML = cols.join("")
          $(tv).prepend(div)
        }
      })
    }

    this.load = function(makeid, dom) {
      if (makeid != null) {
        this.tableSelector = "#" + makeid
        this.makeid = { id: makeid, dom: dom }
        phxApp_.Page.createTable(makeid, dom)
      } else {
        phxApp_.Page.createTable(this.makeid.id, this.makeid.dom)
      }

      phxApp_.populateTable(this)

      this.table.on('draw', () => {
        var toggleView = `
          <li>
            <a class="dropdown-item" href="javascript:void(0);" onclick="toggleView('` + this.tableSelector + `')">
              <i class="me-3 fa fa-th-large"></i>Grid View
            </a>
          </li>
        `
        var dfault_btns = `
          <div class="d-flex align-items-center">
            <div class="btn btn-sm btn-outline-primary me-3" href="javascript:void(0);" data-href="" data-module="add_new" data-ref="">
              <i class="me-3 fa fa-plus"></i>New
            </div>
            <div class="dropdown morphing scale-left ">
              <a href="#" class="more-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-ellipsis-h"></i>
              </a>
              <ul class="dropdown-menu dropdown-animation dropdown-menu-end shadow border-0">
                ${toggleView}
              </ul>
            </div>
          </div>
        `
        // Add default buttons to table
        $(this.tableSelector + "_wrapper .dataTables_filter").before(dfault_btns)
        phxApp_.populateGridView(currentPhxModel)
        loadDefaultGrid(currentPhxModel)
      });




    }

    this.dataFormatter = function(data, column) {
      const value = data[column.data];
      if (!value) return '-';
      
      switch (column.type) {
        case 'date':
          return new Date(value).toLocaleDateString();
        case 'datetime':
          return new Date(value).toLocaleString();
        case 'currency':
          return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD' 
          }).format(value);
        case 'boolean':
          return value ? 'Yes' : 'No';
        case 'image':
          return `<img src="${value}" alt="" style="max-width: 50px; max-height: 50px;">`;
        default:
          return value;
      }
    }

    this.refresh = function() {
      if (this.table) {
        this.table.ajax.reload();
      }
    }

    this.addRow = function(rowData) {
      this.allData.push(rowData);
      if (this.table) {
        this.table.row.add(rowData).draw();
      }
    }

    this.updateRow = function(index, rowData) {
      this.allData[index] = rowData;
      if (this.table) {
        this.table.row(index).data(rowData).draw();
      }
    }

    this.deleteRow = function(index) {
      this.allData.splice(index, 1);
      if (this.table) {
        this.table.row(index).remove().draw();
      }
    }
  }
}
