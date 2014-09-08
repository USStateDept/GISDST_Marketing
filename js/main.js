var windowHeight = $(window).height();
var sectorButtons;
var visibleSectors = [];
var sectorTags = [];
var thumbnails;
var mapData;





function callModal (item) {
    var modalDescription = $(item).find('.modalDescription').html();    
    var mapJpg = $(item).find('img').attr("data-original").slice(0,-10) + '.jpg';
    var pdfSrc = 'pdf/' + $(item).find('img').attr("data-original").slice(9,-10) + '.pdf'
    var img_maxHeight = (windowHeight*0.60).toString() + "px";
    $(".modal-detailedDescription").empty();    
    $(".modal-detailedDescription").html(modalDescription); 
    $(".modal-img").css('max-height', img_maxHeight);
    $(".modal-img").attr('src', mapJpg);
    $('#downloadPDF').attr('href', pdfSrc);
    $('#myModal').modal();       
}

function toggleSearchType (item) {
    var option = $(item).attr("id");
    switch (option) {
        case "filterSearchBtn":
            $(".filterinput").val('');
            toggleFilter("REFRESH");
            $("#filterSearchBtn").removeClass("inactiveSearchType").addClass("activeSearchType");
            $("#textSearchBtn").addClass("inactiveSearchType").removeClass("activeSearchType");
            $("#filterSearch").show();
            $("#textSearch").hide();
            break;
        case "textSearchBtn":
            toggleFilter("REFRESH");
            $("#textSearchBtn").removeClass("inactiveSearchType").addClass("activeSearchType");
            $("#filterSearchBtn").addClass("inactiveSearchType").removeClass("activeSearchType");
            $("#textSearch").show();
            $("#filterSearch").hide();
            break;
    }
}



$.ajax({
    type: 'GET',
    url: 'data/mapLog.json',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 10000,
    success: function(data) {
        mapData = data;
        generatepreviewhtml();
        $(".filterinput").trigger("change");
    },
    error: function(e) {
        console.log(e);
    }
});


//generates html for preview boxes using data from centroid.json
function generatepreviewhtml(){
    var html = "";
    function formatDate(date){
        var formattedDate = new Date(date).toString().substring(4,15);
        return formattedDate;
    }
    var itemhtmlDict = {"past":"", "present": "", "future":""}
    $.each(mapData, function(index, item){ 
        
        var itemhtml = '<div id="'+item.map_id+'" style="display:none," class="thumbnailWrap col-sm-3 ALL-EXTENT ALL-SECTOR mapped '+item.extent+' '+item.sector+'">'+
                '<div onclick="callModal(this);" class="thumbnail">'+
                    '<img class="lazy" data-original="img/maps/'+item.fileName+'_thumb.jpg'+'" width="300" height="200" alt="" >'+
                    '<div class="caption">'+            
                        '<h5 style="font-weight:bold;">'+item.title+'</h5>'+
                        '<p style="font-size:small; margin:6px 0 0 0;">' + formatDate(item.productionDate) +'</p>'+        
                    '</div>'+
                    '<div class="modalDescription" style="display:none;">'+                        
                        '<h4 style="font-weight:bold;">'+item.title+' <small>('+formatDate(item.productionDate)+')</small></h4>'+                        
                        '<p style="font-size:small; margin:6px 0 0 10px;">'+item.narrative+'</p>'+
                        '<p style="font-size:small; margin:6px 0 0 10px;"><b>Extent tags:</b> '+item.extent.replace(/\s/g, ', ')+'</p>'+                         
                        '<p style="font-size:small; margin:6px 0 0 10px;"><b>Type tags:</b> '+item.sector.replace(/\s/g, ', ')+'</p>'+                         
                    '</div>'+   
               '</div>'+
            '</div>'; 
        if (item.progress != null){
            itemhtmlDict[item.progress] += itemhtml;
        }
     
        var itemSectors = item.sector.match(/\S+/g);
        $.each(itemSectors, function(index, sector){
            if (sectorTags.indexOf(sector) === -1){
                sectorTags.push(sector);
            }
        });
    });
    var html = "";
    $.each(itemhtmlDict, function(index, htmlvalue){
        if (index == "past"){
            html += "<h4>Past</h3><div class='results_section'>"
        }
        else if (index == "present"){
            html += "<br/><h4>Present</h3><div class='results_section'>"
        }
        else{
            html += "<br/><h4>Future</h3><div class='results_section'>"
        }
        html += htmlvalue + "</div>";
    });
    $('#gallery').html(html);
    thumbnails = $("#gallery").children();
    generateFilterButtons();
}







function generateFilterButtons(){

    sectorTags.sort();
    var sectorFilterHtml = '<button id="ALL-SECTOR" class="btn btn-sma btn-sector filtering all" type="button" onclick="toggleFilter('+"'ALL-SECTOR'"+', this);"'+ 
        'style="margin-right:10px;">All <span class="glyphicon glyphicon-check" style="margin-left:4px;"></span></button>';
    $.each(sectorTags, function(index, tag){
        var itemHtml = '<button id="'+tag+'" class="btn btn-sm btn-sector" type="button" onclick="toggleFilter('+"'"+tag+"'"+', this);">'+tag+
            '<span class="glyphicon glyphicon-unchecked" style="margin-left:4px;"></span></button>';
        sectorFilterHtml += itemHtml;
    });
    $('#sectorButtons').html(sectorFilterHtml);
    sectorButtons = $("#sectorButtons").children();
    formatCentroids();
}

function formatCentroids(){
    toggleFilter("REFRESH");
}



function toggleFilter (filter, element) {
    console.log(filter);
    console.log(element);
    // set both extent and sector to All, when no thumbnails are showing and refresh filters option is clicked
    $.each(thumbnails, function(i, thumbnail){
        $(thumbnail).removeClass("noSearchMatch").removeClass("mapped");
    });
    if(filter === "REFRESH"){
        $.each(sectorButtons, function(i, button){
            $(button).children().removeClass("glyphicon-check");
            $(button).children().addClass("glyphicon-unchecked");
            $(button).removeClass("filtering");
        })
        $("#ALL-SECTOR").children().removeClass("glyphicon-unchecked"); 
        $("#ALL-SECTOR").children().addClass("glyphicon-check");
        $("#ALL-SECTOR").addClass("filtering");        
    } else {
    // if a filter button is clicked
        var containerId = '#' + $(element).parent().attr('id');
        var sameFilterButtons = $(containerId).children();
        // check if filter is for all
        if($(element).hasClass('all')){
            $.each(sameFilterButtons, function(i, button){
                $(button).children().removeClass("glyphicon-check");
                $(button).children().addClass("glyphicon-unchecked");
                $(button).removeClass("filtering");
            })
            $(element).children().removeClass("glyphicon-unchecked"); 
            $(element).children().addClass("glyphicon-check");
            $(element).addClass("filtering");         
        } else {
            // clear the ALL filter for the filter category
            var sameCategoryAll = $(containerId).find('.all');
            $(sameCategoryAll).children().addClass("glyphicon-unchecked");
            $(sameCategoryAll).children().removeClass("glyphicon-check");
            $(sameCategoryAll).removeClass("filtering");
            
            // if clicked sector filter is on, then turn it off
            if($(element).hasClass("filtering") === true){
                $(element).removeClass("filtering");
                $(element).children().removeClass("glyphicon-check");
                $(element).children().addClass("glyphicon-unchecked");
                // if no sector filters are turned on, toggle 'All' back on
                var noSectorFiltering = true;
                $.each(sameFilterButtons, function(i, button){
                    if ($(button).hasClass("filtering")){
                        noSectorFiltering = false;
                    }
                });
                if (noSectorFiltering === true){
                    $(sameCategoryAll).children().removeClass("glyphicon-unchecked"); 
                    $(sameCategoryAll).children().addClass("glyphicon-check");
                    $(sameCategoryAll).addClass("filtering");     
                }
            // if clicked sector filter is off, then turn it on
            } else {
                $(element).addClass("filtering");
                $(element).children().removeClass("glyphicon-unchecked");
                $(element).children().addClass("glyphicon-check");                
            }
        }
    }
    // check to see what sectors are active
    visibleSectors = [];
    $.each(sectorButtons, function(i, button){        
        if($(button).hasClass("filtering")){
            var buttonid = $(button).attr("id");
            visibleSectors.push(buttonid);
        }
    });
    toggleThumbnails();    
}

function toggleThumbnails (){
    $(thumbnails).hide();
    $.each(thumbnails, function(iT, thumbnail){       
        var hasSectors = true;
        $.each(visibleSectors, function(iS, sector){
            if($(thumbnail).hasClass(sector) === false ){
                hasSectors = false;
            } 
        });
        if(hasSectors === true){
            $(thumbnail).show();            
            $(thumbnail).addClass("mapped");
        }         
    });   
    thumbnailCount = $(thumbnails).filter(function(){return $(this).css('display') === 'block';}).length;
    if (thumbnailCount != 0){ 
        markersToMap();
    }
}

function markersToMap(){
    $(function() {
        $("img.lazy").lazyload({
            effect: "fadeIn"
        });
    }); 
}


$(window).resize(function(){    
    windowHeight = $(window).height();
});






jQuery.expr[':'].Contains = function(a,i,m){
  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

function filterList(header, list) {
    var form = $("<form>").attr({"class":"filterform","action":"#"}),
        input = $("<input>").attr({"class":"filterinput","type":"text"});
    $(form).append(input).appendTo(header);

    $(input)
      .change( function () {
            var filters = $(this).val().match(/\S+/g);
            $.each(thumbnails, function(index, thumbnail){
                $(thumbnail).removeClass("noSearchMatch").removeClass("mapped");
            });
            if(filters) {
                $.each(filters, function(index, filter){
                    $matches = $(list).find('.thumbnailWrap:Contains(' + filter + ')');
                    $('.thumbnailWrap', list).not($matches).addClass("noSearchMatch");
                });  
            } else {
                $(thumbnails).find(".thumbnailWrap").show();
            }
            $.each(thumbnails, function(index, thumbnail){
                if($(thumbnail).hasClass("noSearchMatch")){
                    $(thumbnail).hide();
                } else {
                    $(thumbnail).addClass("mapped").show();
                }
            });
            markersToMap();
            return false;                   
        }) 
      .keyup( function () {            
            $(this).change();
        });
}  

filterList($("#form"), $("#gallery"));




