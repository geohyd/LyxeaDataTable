```ts

const config = {
    dom:...,
    datasource: [
        {
            //Static collection
        }
    ],
    datasource : "https://....",
    dataTransofmrer : (data) => {
        filter...config.
    },
    dataTransofmrer: "REMOVE_COMMENT",
    header: {
        'Name' : {
            'name' : 'key',
            editable : false,
            visible: true,
            render: '...',
            columnsSearchFormat: "text"
        },
        'Categorie' : {
            'name' : 'key',
            visible: true,
            render: '...',
            columnSearch: false
        },
        'action' : {

        }
    },

    edit: {
        active : true,,
        mode: 'POPUP_LINE',
        EDIT_URL: "https://sdfdsf",
        custom: () => {

        },
    },
    remove: {
        active: true,
        mode:'REMOVE',
    },
    customAction: [
        moveUp : {
            ui:
            tooltip:
            action: (currentRow: T): void => {
                console.log("Move up baby, :" , currentRow) // {id: 3, x: 35, y:56, label: "baby"}
            }
        },
        moveDown : {
            button: "edit",
            tooltip: "modifier",
            action: (currentRow: T): void => {
                console.log("Move down baby, :" , currentRow) // {id: 3, x: 35, y:56, label: "baby"}
            },
        }
    ],

    globalconfig : {
        select: {
            active: true,
            multiple: true,
        },
        fullSearch : true,
        columnSearch: true,
        order: true,
        columnsSearchFormat: "list" ,// "list" // defautl value : text
        exporter: {
            copy: true,
            excel: function(){
                return {
                    text: 'ecg',
                    action: function ( e, dt, button, config ) {
                        var data = dt.buttons.exportData({orthogonal: "export_json"});
                        $.fn.dataTable.fileSave(
                            new Blob( [ JSON.stringify( data ) ] ),
                            'Exported_data.json'
                        );
                    }
                }
            },
            exportersurvea: true
        }
    }

}

var config = fromPHP
config.edit.custom = () => {

}

var lx_t = ....

lx_t.on('edit:end', <E, T>(initialValues: E, newValues: T): void | T => {

})

```
