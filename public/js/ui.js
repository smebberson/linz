if (!linz) {
    var linz = {};
}

(function  () {

    function loadLibraries(path) {

        // resource loader for fallback support
        Modernizr.load({
            test: Modernizr.inputtypes.date,
            nope: [
                path + '/public/js/moment.min.js',
                path + '/public/js/bootstrap-datetimepicker.min.js',
                path + '/public/css/bootstrap-datetimepicker.min.css'
            ],
            complete : function () {
                loadDatepicker();
            }
        });

    }

    function loadDatepicker() {

        if (!Modernizr.inputtypes.date) {

            // remove all event listener
            $('[data-ui-datepicker]').parent().unbind();
            $('[data-ui-datepicker]').parent().datetimepicker({
                pickTime: false,
                format: 'YYYY-MM-DD'
            });

        }

    }

    function isTemplateSupported() {
        return 'content' in document.createElement('template');
    }

    function addDeleteConfirmation () {

        $('.control-delete').click(function () {

            if (confirm('Are you sure you want to this new record?')) {
                return true;
            }

            return false;

        });

    }

    linz.loadLibraries = loadLibraries;
    linz.loadDatepicker = loadDatepicker;
    linz.isTemplateSupported = isTemplateSupported;
    linz.addDeleteConfirmation = addDeleteConfirmation;

})();
