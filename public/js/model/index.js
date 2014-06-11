(function () {

    linz.addDeleteConfirmation();

    if ($('.selectedFilters').val().length > 0) {
        toggleFilterBox('show');
    }

    $('[data-sort-field]').click(function () {

        var sort = $('.selectedSort').val(),
            sortField = $(this).attr('data-sort-field');

        if (sort === sortField) {
            sortField = '-' + sortField;
        }

        // update hidden sort field in the filter form
        $('.selectedSort').val(sortField);

        // trigger validation and post form if there are no validation errors
        $('.filters').find(':submit').click();

        return true;

    });

    $('.control-checkAll').click(function () {

        var isChecked = $(this).is(':checked');
        $('.checked-record').prop('checked',isChecked);

    });

    $('.control-addFilter').click(function () {

        var filter = $(this),
            filterText = filter.html(),
            filterVal = filter.attr('data-filter-field'),
            filterFormControl = filter.siblings('.controlField').html(),
            aFilters;

        if (linz.isTemplateSupported()) {

            var content = document.querySelector('#filter').content.cloneNode(true);

            // update template with filter content
            content.querySelector('.filter-name').textContent = filterText;
            content.querySelector('.filter-control').innerHTML = content.querySelector('.filter-control').innerHTML + filterFormControl;
            content.querySelector('.glyphicon-remove').setAttribute('data-filter-field', $(this).attr('data-filter-field'));
            document.querySelector('.filter-list').appendChild(document.importNode(content, true));

        } else {

            // fallback support for browsers that don't support html5 template tag
            var filterOption = $('#filter').clone();
            filterOption.find('.filter-name').html(filterText);
            filterOption.find('.filter-control').append(filterFormControl);
            filterOption.find('.glyphicon-remove').attr('data-filter-field',$(this).attr('data-filter-field'));
            $('.filter-list').append(filterOption.html());

        }

        // hide dropdown for 'Add filter'
        $(this).parents('li.dropdown').removeClass('open');

        var selectedFilters = $('.selectedFilters').val();

        if (selectedFilters) {
            aFilters = $('.selectedFilters').val().split();
        } else {
            aFilters = [];
        }

        // only add the filter once
        if (aFilters.indexOf(filterVal) < 0) {
            aFilters.push(filterVal);
        }

        $('.selectedFilters').val(aFilters.join());

        toggleFilterBox('show');

        assignRemoveButton();
        linz.loadDatepicker();

        return false;

    });

    assignRemoveButton();


    function removeFomList (list, value, separator) {
        separator = separator || ",";
        var values = list.split(separator);

        for(var i = 0 ; i < values.length ; i++) {
            if(values[i] === value) {
                values.splice(i, 1);
                return values.join(separator);
            }
        }

        return list;

    }

    function assignRemoveButton (queryObj) {

        // remove all event listener
        $('.glyphicon-remove').unbind();

        // re-assign listeners including any new ones added to DOM after page load
        $('.glyphicon-remove').click(function () {

            var filteredField = $(this).attr('data-filter-field');
            var selectedFilters = $('.selectedFilters').val();
            selectedFilters = removeFomList(selectedFilters, filteredField)

            $('.selectedFilters').val(selectedFilters);

            if (selectedFilters.length <= 0) {
                // since there are no filters, let's post the form to clear all filters except the sorting
                $('.filters')[0].submit();
            }

            $(this).parents('.form-group').remove();
        });
    }

    function toggleFilterBox(showOrHide) {
        if (showOrHide) {
            $('.filters').show();
        } else {
            $('.filters').hide();
        }
    }

})();
