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
          var SessionIdCell = _(rowData.cells).find(function (cell) {
             return cell.field === 'sourcetype';
          //var EventTimeCell = _(rowData.cells).find(function (cell){
          //   return cell.field === 'EventTime';
          });
          //update the search with the sourcetype that we are interested in
      console.log(SessionIdCell.value);
          this._searchManager.set({ search: '| makeresults| eval data="<h1>HTML Ipsum Presents</h1><p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href=\"#\">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>"'});

          // $container is the jquery object where we can put out content.
          // In this case we will render our chart and add it to the $container
          $container.append(this._TableView.render().el);
      }
  });
  var tableElement = mvc.Components.getInstance("expand_with_events");
  tableElement.getVisualization(function(tableView) {
      // Add custom cell renderer, the table will re-render automatically.
      tableView.addRowExpansionRenderer(new EventSearchBasedRowExpansionRenderer());
  });
  var myResults = _searchManager.data("results");
  myResults.on("data"), function(){
    resultArray = myResults.data().rows;
    alert("Result Value:" + resultArray[0][1]);
  }
});
