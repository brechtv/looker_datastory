// on document ready
$(function() {
    // extract the spreadsheet ID from the URL (if any, otherwise use the demo)
    var spreadsheet_id = (getParameterByName('spreadsheet_id') ? getParameterByName('spreadsheet_id') : '151wYbceiQIj8NEBiLCZNDFX1CEtirddu7tCOU4NR6AA')
        // update the menu
    $("#sheet_id").val(spreadsheet_id)
    $("#primary_color").val("#7e64e0")

    // create the URL to fetch from
    var spreadsheet_public_url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheet_id + '/od6/public/values?alt=json'
        // load the datastory
    loadDatastory(spreadsheet_public_url)

    // listener to update sheet ID
    $("#sheet_id").keypress(function(a) {
        // if enter
        if (a.keyCode == 13) {
            $("#sheet_id_label").html("Updating....")
            spreadsheet_public_url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheet_id + '/od6/public/values?alt=json'
            clearStory()
            loadDatastory(spreadsheet_public_url)
            setTimeout(function() {
                $("#sheet_id_label").html("Current Spreadsheet ID")
            }, 2000)
        }
    })

    // listener to primary color
    $("#primary_color").keypress(function(a) {
        // if enter
        if (a.keyCode == 13) {
            $("#primary_color_label").html("Updating....")
            var primary_color = $("#primary_color").val()
            try {
                $(".mdl-layout__drawer-button").css("color", primary_color)
                $(".card_title").css("color", primary_color)
                $(".mdl-tabs__tab-bar").css("background-color", primary_color)
                $(".story_title").css("color", primary_color)
            } catch (err) {}

            setTimeout(function() {
                $("#primary_color_label").html("Primary Color")
            }, 2000)
        }
    })

    // style change
    $('#dark_style').change(
        function() {
            if ($(this).is(':checked')) {
                $(".story_container").css("color", "#FFFFFF")
                $(".mdl-card").css("background-color", "#959595")
                $(".mdl-tabs__tab-bar").css("background-color", "#BBB")
                $(".story_container").css("background-color", "#353535")
            }
            $("#dark_style").attr("disabled", "disabled")
        });

    // remove download bar
    $('#remove_download').change(
        function() {
            if ($(this).is(':checked')) {
                $(".mdl-tabs__tab-bar").remove()
            }
            $("#remove_download").attr("disabled", "disabled")
        });
})



function loadDatastory(url) {
    var card_template = `<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp story_card"> <div class="mdl-card mdl-cell mdl-cell--12-col"> <div class="mdl-card__supporting-text"> <h4 class="card_title">{{card_title}}</h4> <p>{{card_description}}</p></div><div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect"> <div class="mdl-tabs__panel is-active" id="card_{{card_number}}_viz"> <div class="mdl-card__supporting-text"> <iframe src='{{instance_url}}/embed/public/{{look_public_id}}' height='400px' frameborder='0'></iframe> </div></div><div class="mdl-tabs__tab-bar"> <a href="#card_{{card_number}}_viz" class="mdl-tabs__tab is-active">Visualization</a> <a href="{{instance_url}}/looks/{{look_public_id}}.csv?apply_formatting=true&apply_vis=true&download=true" target="_blank" download class="mdl-tabs__tab">Data</a> </div></div></section>`
    $.getJSON(url, function(data) {
        var results = data.feed.entry
        var instance_url
        $.each(results, function(key, result) {
            if (key == 0) {
                instance_url = result.gsx$publicid.$t
                var title_data = {
                    "story_title": result.gsx$title.$t,
                    "story_description": result.gsx$description.$t
                }
                document.title = title_data.story_title
                var title_template = `<h1 class="story_title" style="text-align: center;">{{ story_title }}</h1><p>{{ story_description }}</p>`
                var title = Mustache.render(title_template, title_data)
                $(".story_title_container").append(title)
            } else {
                var card_data = {
                    "card_number": key,
                    "card_title": result.gsx$title.$t,
                    "card_description": result.gsx$description.$t,
                    "look_public_id": result.gsx$publicid.$t,
                    "instance_url": instance_url
                }
                var card = Mustache.render(card_template, card_data)
                $(".story_container").append(card)
            }
        })
    })
}

// extract spreadsheet ID from URL
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search)
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// clear the whole document
function clearStory() {
    $(".story_title_container").empty()
    $(".story_card").remove()
}
