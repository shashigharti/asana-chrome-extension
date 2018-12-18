$(function () {
    let text_areas = $('.TaskList').find('div.TaskRow');
    let api_key = '';
    $.each(text_areas, function (index, taskRow) {

        //get the value of custom fields
        let custom_fields = $(taskRow).find('.CustomPropertyEditablePreviewContainer .textInput');
        let estimated_value = $(custom_fields[0]).val();
        let actual_hours = $(custom_fields[1]).val();
        let hours_left = custom_fields[2].value = (estimated_value - actual_hours);
        let percentage = actual_hours / estimated_value;
        let hours_exceeded =  actual_hours - estimated_value;


        //get the id of the task
        let id = $(taskRow).find('textarea').attr('id');
        let index_of_ = id.indexOf("_");
        let task_id = id.substring(index_of_ + 1);
        let itemRow = $(taskRow).find('.ItemRow')[index];
        let tags = $(itemRow).find(".Pill--clickable");
        let tagExists = false;

        if (percentage > 0.75) {
            $.each(tags, function (index, tag) {
                if ($(tag).html() == ">75%") {
                    tagExists = true;
                }
            });

            if (!tagExists) {
                $.ajax({
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + api_key
                    },
                    url: "https://app.asana.com/api/1.0/tasks/" + task_id + "/addTag",
                    processData: true,
                    dataType: "json",
                    data: {"tag": "948933675411782"},
                    error: function (jqXHR, textStatus, error) {
                        console.log(JSON.stringify(error));
                    }
                });
            }

        } else if (hours_exceeded > 0) {
            custom_fields[2].value = 0;
            $.each(tags, function (index, tag) {
                if ($(tag).html() == "Exceeding") {
                    tagExists = true;
                }
            });
            if (!tagExists) {
                $.ajax({
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + api_key
                    },
                    url: "https://app.asana.com/api/1.0/tasks/" + task_id + "/removeTag",
                    processData: true,
                    dataType: "json",
                    data: {"tag": "948933675411782"},
                    error: function (jqXHR, textStatus, error) {
                        console.log(JSON.stringify(error));

                    }
                });
                $.ajax({
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + api_key
                    },
                    url: "https://app.asana.com/api/1.0/tasks/" + task_id + "/addTag",
                    processData: true,
                    dataType: "json",
                    data: {"tag": "948930465637954"},
                    error: function (jqXHR, textStatus, error) {
                        console.log(JSON.stringify(error));
                    }
                });
            }
        } else {
            $.ajax({
                type: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + api_key
                },
                url: "https://app.asana.com/api/1.0/tasks/" + task_id + "/removeTag",
                processData: true,
                dataType: "json",
                data: {"tag": "948930465637954"},
                error: function (jqXHR, textStatus, error) {
                    console.log(JSON.stringify(error));
                }
            });
            $.ajax({
                type: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + api_key
                },
                url: "https://app.asana.com/api/1.0/tasks/" + task_id + "/removeTag",
                processData: true,
                dataType: "json",
                data: {"tag": "948933675411782"},
                error: function (jqXHR, textStatus, error) {
                    console.log(JSON.stringify(error));
                }
            });
        }
        $.ajax({
            type: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + api_key
            },
            url: "https://app.asana.com/api/1.0/tasks/" + task_id,
            dataType: "json",
            data: JSON.stringify({
                "data": {
                    "custom_fields": {
                        "948339405882033": custom_fields[2].value
                    }
                }

            }),
            error: function (xhr, textStatus, error) {
                console.log(JSON.stringify(error));
            }
        });
    });
})
;