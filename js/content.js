$(function(){
    let tasks = $('.TaskList').find('div.TaskRow');
    $.each(tasks, function(index, task){
        $(task).find('.ItemRowTwoColumnStructure-right').append(
            '<div class="Button Button--small PotGridHeader-button PotGridHeader-availabilityTaskButton" tabindex="0" role="button" aria-disabled="false" aria-pressed="false">' +
            'Availability' +
            '</div>'
            );
        $(task).find('.ItemRowTwoColumnStructure-right').append('<div class="Button Button--small PotGridHeader-button PotGridHeader-unassignTaskButton" tabindex="0" role="button" aria-disabled="false" aria-pressed="false">UnAssign</div>');
    });
});