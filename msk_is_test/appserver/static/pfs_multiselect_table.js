require([

		'underscore',

		'jquery',

		'splunkjs/mvc',

		'splunkjs/mvc/tableview',

		'splunkjs/mvc/simplexml/ready!'

	], function (_, $, mvc, TableView) {

	// Access the "default" token model

	var tokens = mvc.Components.get("default");

	var selected_values_array = [];

	var submittedTokens = mvc.Components.get('submitted');

	console.log("This is Multi-select table JS");

	// Custom renderers for applying checkbox.

	var CustomRenderer = TableView.BaseCellRenderer.extend({

			canRender: function (cell) {

				return _(['Select_Deselect']).contains(cell.field);

			},

			render: function ($td, cell) {

				var a = $('<div>').attr({

						"id": "chk-sourcetype" + cell.value,

						"value": cell.value

					}).addClass('checkbox').click(function () {

						if ($(this).attr('class') === "checkbox") {

							selected_values_array.push($(this).attr('value'));

							$(this).removeClass();

							$(this).addClass("checkbox checked");

						} else {

							$(this).removeClass();

							$(this).addClass("checkbox");

							var i = selected_values_array.indexOf($(this).attr('value'));

							if (i != -1) {

								selected_values_array.splice(i, 1);

							}

						}

						console.log(selected_values_array);

					}).appendTo($td);

			}

		});



	//List of table ID

	var sh = mvc.Components.get("myTable");

	if (typeof(sh) != "undefined") {

		sh.getVisualization(function (tableView) {

			// Add custom cell renderer and force re-render

			tableView.table.addCellRenderer(new CustomRenderer());

			tableView.table.render();

		});

	}



	// Disabling button while search is running
	var srchReview = null;
	if(mvc.Components.get('mysearch')!=null)
	{
		srchReview = mvc.Components.get('mysearch')
	}
	if(mvc.Components.get('srchReview')!=null)
	{
		srchReview = mvc.Components.get('srchReview');
	}


	srchReview.on('search:start', function (properties) {

		$("#mybutton").attr('disabled', true);
		$("#btnReviewed").attr('disabled', true);

	});



	srchReview.on('search:done', function (properties) {

		$("#mybutton").attr('disabled', false);
		$("#btnReviewed").attr('disabled', false);
		//Purge array
		selected_values_array = [];

	});



	$(document).ready(function () {

		

		//setting up tokens with selected value.

		$("#btnReviewed").on("click", function (e) {

			e.preventDefault();

			tokens.set("mytoken", selected_values_array.join());
			console.log(tokens.toJSON());
			submittedTokens.set(tokens.toJSON());
		});

		$("#mybutton").on("click", function (e) {

			e.preventDefault();

			tokens.set("mytoken", selected_values_array.join());
			console.log(tokens.toJSON());
			submittedTokens.set(tokens.toJSON());
		});

	});



	// Disabling button1 while search is running

	var srchNotReview = null;
	if(mvc.Components.get('mysearch1')!=null)
	{
		srchNotReview = mvc.Components.get('mysearch1')
	}
	if(mvc.Components.get('srchNotReview')!=null)
	{
		srchNotReview = mvc.Components.get('srchNotReview');
	}
	srchNotReview.on('search:start', function (properties) {

		$("#mybutton1").attr('disabled', true);
		$("#btnNotReviewed").attr('disabled', true);

	});



	srchNotReview.on('search:done', function (properties) {

		$("#mybutton1").attr('disabled', false);
		$("#btnNotReviewed").attr('disabled', false);
		
		//Purge Array
		selected_values_array = [];

	});



	$(document).ready(function () {

		$("#btnNotReviewed").on("click", function (e) {
			
			e.preventDefault();

			tokens.set("mytoken1", selected_values_array.join());

			submittedTokens.set(tokens.toJSON());
		});
		//setting up tokens with selected value.

		$("#mybutton1").on("click", function (e) {
			
			e.preventDefault();

			tokens.set("mytoken1", selected_values_array.join());

			submittedTokens.set(tokens.toJSON());
		});

	});

});

