require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc) {

	var tokens = mvc.Components.get('submitted');
	
	/* --- Search Reference --- */
	var updateSearch = mvc.Components.get('updateSearch');
	var createSearch = mvc.Components.get('createSearch');
	var deleteSearch = mvc.Components.get('deleteSearch');
	var taskCollectionSearch = mvc.Components.get('taskCollectionSearch');

	/* --- Table Reference --- */
	var taskCollectionTable = mvc.Components.get('taskCollectionTable');
	/* --- Define the form inputs --- */
	var username_Input = $('[name="username"]');
	var networkid_Input = $('[name="networkid"]');
	var hospital_Input = $('[name="hospital"]');
	var _key_Input = $('[name="_key"]');

	/* --- Reference to the input values --- */
	var username_Val, networkid_Val, hospital_Val, _key_Val;

    	taskCollectionTable.on('click', function(e) {
	
		 e.preventDefault();
      	
	 	if(e['field'] === 'Update') { 
		/* --- Pull values from the current table row --- */
	        username_Val = e.data['row.username'];
		networkid_Val = e.data['row.networkid'];
	        hospital_Val = e.data['row.hospital'];
		_key_Val = e.data['row._key'];

		/* --- Insert values from rows into input fields --- */
		username_Input.val(username_Val);
		networkid_Input.val(networkid_Val);
		hospital_Input.val(hospital_Val);
		_key_Input.val(_key_Val);
		} else if(e['field'] === 'Delete') {
		 tokens.set('delete_key_tok', e.data['row._key']);
		}

	 });	
	
	$(document).on('click', '#submitButton', function(e) {
		
		e.preventDefault();	
	      
		if(_key_Input.val()!='') {
			tokens.set('update_key_tok', _key_Input.val());
			tokens.set('update_username_tok', username_Input.val());
			tokens.set('update_networkid_tok', networkid_Input.val());
			tokens.set('update_hospital_tok', hospital_Input.val());
	 	} else {
    	 	 /* --- this is new so create --- */
       		 	tokens.set('create_tok', 'true');
        		tokens.set('create_username_tok', username_Input.val());
       	 		tokens.set('create_networkid_tok', networkid_Input.val());
        		tokens.set('create_hospital_tok', hospital_Input.val());
    			}
	 	});

		updateSearch.on('search:done', function() {
			taskCollectionSearch.startSearch();
			$('form *').filter(':input').each(function(){
			$(this).val('');
			});
		});

		createSearch.on('search:done', function() {
        		taskCollectionSearch.startSearch();
       			 $('form *').filter(':input').each(function(){
           		 $(this).val('');
       		 	});
   		 });

		deleteSearch.on('search:done', function() {
			taskCollectionSearch.startSearch();
                        tokens.unset('delete_key_tok');
			});
		});