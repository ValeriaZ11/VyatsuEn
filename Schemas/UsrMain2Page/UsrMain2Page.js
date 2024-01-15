define("UsrMain2Page", [], function() {
	return {
		entitySchemaName: "UsrMain",
		attributes: {
      "IsNew": {
        dataValueType: BPMSoft.DataValueType.BOOLEAN,
        type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
        value: false
      },
	   "IsVisible": {
        dataValueType: BPMSoft.DataValueType.BOOLEAN,
        type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
        value: false
      },
		"NumberOfRecords": {
        dataValueType: BPMSoft.DataValueType.INTEGER,
        type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
        value: 0
        }
    },
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrMainFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrMain"
				}
			},
			"UsrSchema13c7c380Detailecb089b5": {
				"schemaName": "UsrSchema13c7c380Detail",
				"entitySchemaName": "UsrMa",
				"filter": {
					"detailColumn": "UsrUsrMain",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrInteger1": {
				"fd8f497d-023b-4a70-b67b-81c6c2bcf7e6": {
					"uId": "fd8f497d-023b-4a70-b67b-81c6c2bcf7e6",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrBoolean1"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrDatetime1": {
				"2d9c7f52-6215-42e7-8551-a9742d918f03": {
					"uId": "2d9c7f52-6215-42e7-8551-a9742d918f03",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrString1"
							}
						}
					]
				}
			},
			"UsrLookup1": {
				"7e23faa1-c63e-47b8-99af-f554dbe94dbe": {
					"uId": "7e23faa1-c63e-47b8-99af-f554dbe94dbe",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrName"
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			save: function(){
      //this.isNew - new card
      this.set("IsNew",this.isNew);
      this.callParent(arguments);
    },
			
			visible: function(){
      this.set("IsVisible", true);
     
	  console.log('метод visible');
    },
				hide: function(){
      this.set("IsVisible",false);
     
	  console.log('метод hide');
    },
    
			 onSaved: function() {
        this.callParent(arguments);

        console.log('метод onSaved');

        if (this.get("IsNew")){
        console.log('Сохранили новую карточку: ' + this.get('Id'));
        this.addDetail(this, 0);
        }else{
         this.compldexAddDetail(this);
        //  this.showNumberOfRecords(this)
        }
      },
      showNumberOfRecords:function(thisObject) {
        thisObject.set("NumberOfRecords", 0);
        var esq = this.Ext.create(BPMSoft.EntitySchemaQuery, {
          rootSchemaName: "UsrMa"
        });
        esq.addColumn("UsrUsrMain");
        var filters = this.Ext.create("BPMSoft.FilterGroup");
            filters.addItem(esq.createColumnFilterWithParameter(BPMSoft.ComparisonType.NOT_EQUAL, "UsrUsrMain",
              thisObject.get("Id")));
               esq.filters = filters;
        esq.execute(function(response) {
          if (response.success) {
            if (response.collection.collection) {
              
                          var total = 0
                          var list  = []
                          var mega =  response.collection.collection.items
						  for (let i = 0; i< mega.length; i++){
                             if(!list.includes(mega[i].get("UsrUsrMain").value)){
                                 list.push(mega[i].get("UsrUsrMain").value)
                             }
                              
                          }
                          console.log(list)
                           debugger
                          for(var i = 0; i< list.length; i++){
                              var count = 0
                for(var j = 0; j < mega.length; j++){
                                
                                if(list[i] === mega[j].get("UsrUsrMain").value){
                                    count++
                                }
                              }
                              if(count === 3){
                                  total++
                              }
                          }

              
               BPMSoft.showInformation(
                Ext.String.format(
                thisObject.get("Resources.Strings.SuperMessage"),
                total.toLocaleString())

              );   
                          
                          
                          console.log(total)
                          console.log(response.collection.collection.items);
                      }}})
        
        
      },
      compldexAddDetail: function(thisObject) {
        var esq = this.Ext.create(BPMSoft.EntitySchemaQuery, {
          rootSchemaName: "UsrMa"
        });
        esq.addColumn("UsrUsrMain");
            var filters = this.Ext.create("BPMSoft.FilterGroup");
            filters.addItem(esq.createColumnFilterWithParameter(BPMSoft.ComparisonType.EQUAL, "UsrUsrMain",
              thisObject.get("Id")));
               esq.filters = filters;
              thisObject.set("Count", 0);
        esq.execute(function(response) {
          debugger
        
          if (response.success) {
            if (response.collection.collection) {
              var count = response.collection.collection.items.length;
              thisObject.set("Count", count);
              console.log(count);
              console.log(response.collection.collection.items);
              
              
              if(thisObject.get("Count") > 3){
                thisObject.deleteAllDetails(thisObject);  
                  count = 1;
              }else{
                thisObject.addDetail(thisObject, thisObject.get("Count"));      
                   count++;
              }   
              
              if(count === 3){
                thisObject.showNumberOfRecords(thisObject)
              }
            }
          }
        }, this);
        
      },
      
      
      addDetail: function(thisObject, count) {
        var insert = Ext.create('BPMSoft.InsertQuery', {
                  rootSchemaName: 'UsrMa'
                });
                insert.setParameterValue('Id', "",
                  BPMSoft.DataValueType.GUID);
insert.setParameterValue('UsrName', "AutoGenerated " + count,
                  BPMSoft.DataValueType.TEXT);

insert.setParameterValue('UsrUsrMain', thisObject.get("Id"),
                  BPMSoft.DataValueType.GUID);
                insert.execute();
        console.log("addDetail");
        
      },
      deleteAllDetails: function(thisObject) {
        console.log("deleteAllDetails")
        var query1 = Ext.create("BPMSoft.DeleteQuery", {
          rootSchemaName: 'UsrMa'
        });

      var filter = BPMSoft.createColumnFilterWithParameter(BPMSoft.ComparisonType.EQUAL, "UsrUsrMain", thisObject.get("Id"));
      query1.filters.addItem(filter);

      query1.execute( function(response){
        thisObject.addDetail(thisObject, thisObject.get("Count"));
      });
	  },
    
    /*onSaved: function() {
      this.callParent(arguments);
      
      console.log('метод onSaved');
      
      if (this.get("IsNew")){
        console.log('Сохранили новую карточку: ' + this.get('Id'));
        
      }*/
    },
			getActions: function() {
				/* Вызов базовой реализации метода для получения проиниализированных действий страницы. */
				var actions = this.callParent(arguments);
				/* Добавление линии-разделителя между вкладками действий. */
				actions.addItem(this.getButtonMenuItem({
					Type: "BPMSoft.MenuSeparator",
					Caption: ""
				}));
			/* Добавление кастомного пункта в список действий. */
				actions.addItem(this.getButtonMenuItem({
					/* Привязка обработчика. */
					"Tag" : "myActionClick",
					/* Привязка заголовка действия к локализуемой строке. */
					"Caption": {"bindTo": "Resources.Strings.MyActionCaption"},
					/* Привязка свойства доступности действия. */
					"Enabled": {"bindTo": "getMyButtonEnabled"},
					"Click": {"bindTo": "visible"},
					"Visible": {"bindTo": "getMyButtonVisible"}
				}));
				/* Возвращение коллекции действий страницы. */
				return actions;
			},
			getMyButtonEnabled: function(){
        		return true;
      },
			getMyButtonVisible: function(){
        		return true;
      },
			
      
      myActionClick: function(){
        /*BPMSoft.showInformation(
          Ext.String.format(
            this.get("Resources.Strings.MyActionMessage"),
            new Date().toLocaleString())
        ); */
		  return true;
      },
		
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
                         /* Выполняется операция добавления элемента на страницу. */
                         "operation": "insert",
                         /* Наименование родительского контейнера, в который добавляется кнопка. */
                         "parentName": "LeftContainer",
                         /* Кнопка добавляется в коллекцию элементов родительского элемента. */
                         "propertyName": "items",
                         /* Наименование кнопки. */
                         "name": "Visible",
                         "values": {
                               /* Тип добавляемого элемента — кнопка. */
                               "itemType": BPMSoft.ViewItemType.BUTTON,
                               /* Привязка заголовка кнопки к локализуемой строке схемы. */
                               "caption": { bindTo: "Resources.Strings.BPMVisibleButton" },
                               /* Привязка обработчика события нажатия кнопки. */
                               "click": { bindTo: "hide"},
							   "visible": { bindTo: "IsVisible"} ,
                               /* Привязка свойства доступности кнопки. */
                               /*"enabled": { bindTo: "isEventNotCanceled" },*/
                               /* Стиль отображения кнопки. */
                               "style": BPMSoft.controls.ButtonEnums.style.DEFAULT
                         },
			},

			{
				"operation": "insert",
				"name": "UsrNameb2ff2031-61c3-4eed-9437-4580effdd8e7",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DATETIME49ebf783-f33f-4bd6-90b1-0dba85d1e280",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrDatetime1",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRINGc9a62080-b746-4529-8fd4-ad942441d2df",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrString1",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "LOOKUP2acf580e-397e-4a4f-b51e-7f6952fa4cd6",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrLookup1",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "INTEGERdf2e2f4b-e785-4011-8ce6-f7bf8d7dd9ef",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "UsrInteger1",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "BOOLEAN29febca3-852d-4541-809b-14c06c858e2e",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "UsrBoolean1",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrType62f0f7c8-f15d-433b-b259-b9b03f446c27",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "Header"
					},
					"bindTo": "UsrType"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchema13c7c380Detailecb089b5",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 1
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
