/**
 * Created by robert.zimmer on 09.05.2017.
 */

function addTask(e) {
    if (e.which == 13) {
        var taskName = $(this).val();
        if (taskName.trim() != "") {
            $(this).val("");
            var task = $('<li><div class="view">' +
                '<input class="toggle" type="checkbox">' +
                '<label>' + taskName + '</label><button class="destroy"></button></div></li>');
            $('.todo-list').append(task);
        }
        updateTaskCount();
    }
}

function toggleAction(e) {
    var li = $(this).closest('li');
    if (this.checked) {
        li.addClass('completed');
    } else {
        li.removeClass('completed');
    }
    updateTaskCount();
}

function  updateTaskCount() {
    $('strong').text($('.todo-list').find('li').length - $('.todo-list').find('li').filter('.completed').length);
}


$(document).ready(function () {
    updateTaskCount();



    /*Add new Task*/
    $(".new-todo").keyup(addTask);


    /*Remove Buttons*/
    $('.todo-list').on('click', 'button', function () {
        $(this).closest('li').remove();

    });
    /*Remove All completed tasks*/
    $('.footer').on('click', '.clear-completed', function () {
        $('.todo-list').find('li').filter('.completed').remove();
    });



    $('.todo-list').on('change', '.toggle', toggleAction);


    /* Filter optins 'all' */
    $('.filters').on('click', '#filterAll', function () {
        $('.filters').find('a').filter('.selected').removeClass('selected');
        $(this).find('a').addClass('selected');

        $('.todo-list').find('li').slideDown();
    });
    /* Filter optins 'completed' */
    $('.filters').on('click', '#filterActiv', function () {
        $('.filters').find('a').filter('.selected').removeClass('selected');
        $(this).find('a').addClass('selected');
        $('.todo-list').find('li').slideDown();
        $('.todo-list').find('li').filter('.completed').slideUp();
    });
    /* Filter optins 'not completed' */
    $('.filters').on('click', '#filterCompleted', function () {
        $('.filters').find('a').filter('.selected').removeClass('selected');
        $(this).find('a').addClass('selected');
        $('.todo-list').find('li').filter('.completed').slideUp();
        $('.todo-list').find('li').slideToggle();
    });

});