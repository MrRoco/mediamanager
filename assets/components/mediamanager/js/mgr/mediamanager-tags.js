+function ($) {

    var MediaManagerTags = {

        $panelFit       : 'div[data-panel-fit]',
        $fitTo          : 'div[data-fit-to]',

        $createForm     : 'form[data-create-form]',
        $createFeedback : 'div[data-create-feedback]',
        $listing        : 'div[data-listing]',

        $delete         : 'a[data-delete-tag]',
        $deleteConfirm  : '[data-delete-confirm]',

        $navigationItem : '[data-scroll-to]',

        fit : function() {
            var self   = this,
                panels = $(self.$panelFit),
                height = $(window).height();

            $(self.$panelFit).css({'overflow-y': 'scroll', 'height': height - 150});
        },

        scrollTo : function(e) {
            var self = this,
                element = '#' + e.target.dataset.scrollTo;

            $(self.$panelFit).animate({
                scrollTop:  $(self.$panelFit).scrollTop() - $(self.$panelFit).offset().top + $(element).offset().top
            }, 1000);
        },

        create : function(e) {
            e.preventDefault();

            var self      = this,
                feedback  = $(self.$createFeedback),
                className = 'alert-success',
                values    = $(self.$createForm).serializeArray();

            feedback.html('');

            $.ajax ({
                type: 'POST',
                url: $(self.$createForm).attr('action'),
                data: values,
                success: function(data) {
                    if(data.results.error) {
                        className = 'alert-danger';
                    }

                    $('<div/>', {
                        class: 'alert ' + className,
                        text: data.results.message
                    }).appendTo(feedback).delay(3000).fadeOut(300);

                    $('input[type="text"]', self.$createForm).val('');
                    $(self.$listing).html(data.results.html);
                }
            });

            return false;
        },

        delete : function(e) {
            var self = this;

            $('<div />').text(e.target.dataset.deleteMessage).dialog({
                draggable: false,
                resizable: false,
                modal: true,
                title: e.target.dataset.deleteTitle,
                buttons : [{
                    text: e.target.dataset.deleteConfirm,
                    class: 'btn btn-danger',
                    click: function () {
                        $.ajax ({
                            type: 'POST',
                            url: $(self.$createForm).attr('action'),
                            data: {
                                action       : $('input[name="action"]', self.$createForm).val(),
                                HTTP_MODAUTH : $('input[name="HTTP_MODAUTH"]', self.$createForm).val(),
                                method       : 'delete',
                                tag_id       : e.target.dataset.deleteTag
                            },
                            success: function(data) {
                                $(self.$listing).html(data.results.html);
                            }
                        });

                        $(this).dialog('close');
                    }
                }, {
                    text: e.target.dataset.deleteCancel,
                    class: 'btn btn-default',
                    click: function () {
                        $(this).dialog('close');
                    }
                }],
                open: function(event, ui) {
                    $('.ui-dialog-titlebar-close', ui.dialog | ui).hide();
                },
                close : function() {
                    $(this).dialog('destroy').remove();
                }
            });
        }
    }

    $(document).ready(function() {
        MediaManagerTags.fit();

        $(window).resize(function() {
            MediaManagerTags.fit();
        });
    });

    $(document).on({
        submit : $.proxy(MediaManagerTags, 'create')
    }, MediaManagerTags.$createForm);

    $(document).on({
        click : $.proxy(MediaManagerTags, 'delete')
    }, MediaManagerTags.$delete);

    $(document).on({
        click : $.proxy(MediaManagerTags, 'scrollTo')
    }, MediaManagerTags.$navigationItem);
}(jQuery);