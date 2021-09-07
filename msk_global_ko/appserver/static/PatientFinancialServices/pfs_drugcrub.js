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
        var drugCollectionSearch = mvc.Components.get('drugCollectionSearch');

        /* --- Table Reference --- */
        var drugCollectionTable = mvc.Components.get('drugCollectionTable');
        /* --- Define the form inputs --- */
        var drugtype_Input = $('[name="DrugType"]');
        var drugname_Input = $('[name="DrugName"]');
        var _key_Input = $('[name="_key"]');

        /* --- Reference to the input values --- */
        var drugtype_Val, drugname_Val,  _key_Val;

        drugCollectionTable.on('click', function(e) {

                 e.preventDefault();

                if(e['field'] === 'Update') {
                /* --- Pull values from the current table row --- */
                drugtype_Val = e.data['row.DrugType'];
                drugname_Val = e.data['row.DrugName'];
                _key_Val = e.data['row._key'];

                /* --- Insert values from rows into input fields --- */
                drugtype_Input.val(drugtype_Val);
                drugname_Input.val(drugname_Val);
                _key_Input.val(_key_Val);
                } else if(e['field'] === 'Delete') {
                 tokens.set('delete_key_tok', e.data['row._key']);
                }

         });

        $(document).on('click', '#submitButton', function(e) {

                e.preventDefault();

                if(_key_Input.val()!='') {
                        tokens.set('update_key_tok', _key_Input.val());
                        tokens.set('update_drugtype_tok', drugtype_Input.val());
                        tokens.set('update_drugname_tok', drugname_Input.val());
                } else {
                 /* --- this is new so create --- */
                        tokens.set('create_tok', 'true');
                        tokens.set('create_drugtype_tok', drugtype_Input.val());
                        tokens.set('create_drugname_tok', drugname_Input.val());
                        }
                });

                updateSearch.on('search:done', function() {
                        drugCollectionSearch.startSearch();
                        $('form *').filter(':input').each(function(){
                        $(this).val('');
                        });
                });

                createSearch.on('search:done', function() {
                        drugCollectionSearch.startSearch();
                         $('form *').filter(':input').each(function(){
                         $(this).val('');
                        });
                 });

                deleteSearch.on('search:done', function() {
                        drugCollectionSearch.startSearch();
                        tokens.unset('delete_key_tok');
                        });
                });
