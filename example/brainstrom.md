```js

const config = {
    dom:...,
    datasource: [
        {
            //Static collection
        }
    ]
    datasource : "https://....",
    dataTransofmrer : funciton(data) => {
        filter...config.
    }
    dataTransofmrer: "REMOVE_COMMENT"
    header: {
        'Name' : {
            'name' : 'key',
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
    }
    action: {
        surveaedit: true,
        surveadelete: true
    }


    globalconfig : {
        select: {
            active: true,
            multiple: true
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

```
