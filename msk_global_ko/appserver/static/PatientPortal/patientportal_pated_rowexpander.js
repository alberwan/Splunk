require([
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/chartview',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc',
    'underscore',
    'splunkjs/mvc/simplexml/ready!'],function(
    TableView,
    ChartView,
    SearchManager,
    mvc,
    _
    ){
    var EventSearchBasedRowExpansionRenderer = TableView.BaseRowExpansionRenderer.extend({
        initialize: function(args) {
            // initialize will run once, so we will set up a search and a chart to be reused.
            this._searchManager = new SearchManager({
                id: 'details-search-manager',
                preview: false
            });
            this._TableView = new TableView({
                managerid: 'details-search-manager',
                count: 10,
                dataOverlayMode: "none",
                drilldown: "none",
                rowNumbers: "true",
                wrap: "true",
            });
        },
        canRender: function(rowData) {
            // Since more than one row expansion renderer can be registered we let each decide if they can handle that
            // data
            // Here we will always handle it.
            return true;
        },
        render: function($container, rowData) {
            // rowData contains information about the row that is expanded.  We can see the cells, fields, and values
            // We will find the sourcetype cell to use its value
            var KeyCell = _(rowData.cells).find(function (cell) {

                //return cell.field === 'PE_MessageText';
                return cell.field === 'PE_AutoId';

            //var EventTimeCell = _(rowData.cells).find(function (cell){
            //   return cell.field === 'EventTime';
            });
            //var SubApplicationCell = _(rowData.cells).find(function (cell) {
            //    return cell.field === 'SubApplication';
             //var EventTimeCell = _(rowData.cells).find(function (cell){
             //   return cell.field === 'EventTime';
            // });
            //update the search with the sourcetype that we are interested in
           // this._searchManager.set({ search: 'index=msk_app_auditlogs Session_Id="' + ApplicationCell.value + '" |sort - _time|table _time,Log_Message'});
           // this._searchManager.set({ search: '| inputlookup lkv_msk_datacatalog where AdminOnly=\"false\" DataCategory=\"External\" Application=\"$app_token$\"| eval SubApplication=if(isnull(SubApplication), Application, SubApplication) | search SubApplication=\"$subapp_token$\"| fillnull value=\"Steve Lazan\" DataOwner| fillnull value=\"lazans@mskcc.org\" DataOwnerEmail| rename LongDescription as Description, ShortDescription as Description| table InputType Key Description index sourcetype Interval HostName Application SubApplication OldestEvent| eval OldestEvent=strftime(strptime(OldestEvent, \"%Y-%m-%d %H:%M:%S\"), \"%m-%d-%Y\")'});
            //this._searchManager.set({ search: "| inputlookup lkv_msk_datacatalog where AdminOnly=\"false\" DataCategory=\"External\" Application=\"" + ApplicationCell.value + "\"| eval SubApplication=if(isnull(SubApplication), Application, SubApplication) | search SubApplication=\"" + SubApplicationCell.value + "\"| fillnull value=\"Steve Lazan\" DataOwner| fillnull value=\"lazans@mskcc.org\" DataOwnerEmail| rename LongDescription as Description, ShortDescription as Description| table InputType Key Description index sourcetype Interval HostName OldestEvent| eval OldestEvent=strftime(strptime(OldestEvent, \"%Y-%m-%d %H:%M:%S\"), \"%m-%d-%Y\")"});

            this._searchManager.set({ search: "index=msk_patientportal sourcetype=patientedmaterial PE_AutoId=\""+ KeyCell.value + "\"|table PE_MessageText"});
            
            //this._searchManager.set({ search: "| makeresults |eval PE_MessageText=\""+ KeyCell.value + "\"|table PE_MessageText"});

            // $container is the jquery object where we can put out content.
            // In this case we will render our chart and add it to the $container
            $container.append(this._TableView.render().el);

//$container.append("<H1>Hello World!</H1><br /> I AM BROKE!");
        }
    });
    var tableElement = mvc.Components.getInstance("expand_with_events");
    tableElement.getVisualization(function(tableView) {
        // Add custom cell renderer, the table will re-render automatically.
        tableView.addRowExpansionRenderer(new EventSearchBasedRowExpansionRenderer());
    });
});
