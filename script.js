$(() => {
    const key = "GhHfFlGzDiJbGrFlHhGjDsTvEe";
    if (localStorage.getItem(key) !== null){
        var prevlist = JSON.parse(localStorage.getItem(key));
        $("#main").html(prevlist);
        $(".rem").on("click", function() {
            $(this).parent().remove();
            reload();
        });
        $(".comp").on("click", function() {
            $(this).attr("disabled", true);
            $(this).parent().parent().next().next().append($(this).parent());
            reload();
        });
        rep();
    }
    $(".add").on("click", function() {
        var val = $(this).prev().val();
        if(val !== '') {
            var nval = "-".repeat((50 - val.length)/2.5) + val + "-".repeat((50 - val.length)/2.5);
            var d = new Date();
            var elem = $("<li></li>").text(nval);
            var date = $("<i class='date'></i>").text(d);
            $(elem).append(date);
            $(elem).append("<button class='comp'>✓</button>");
            $(elem).append("<button class='rem'>X</button>");
            $(this).next().append(elem);
            $(this).prev().val("");
            $(".rem").on("click", function() {
                $(this).parent().remove();
                reload();
            });
            $(".comp").on("click", function() {
                $(this).attr("disabled", true);
                $(this).parent().parent().next().next().append($(this).parent());
                reload();
            });
            reload();
        }
    });
    $("button.last").on("click", function() {
        var val = $("#nn").val();
        if(val !== '') {
            var elem = $("<div id='" + val + "' class='list'></div>");
            $(elem).append("<h3>" + val + " <button class='remd'>X</button></h3>");
            $(elem).append("<input class='inp' type='text' placeholder='New item'/>");
            $(elem).append("<img src='plus.png' class='img-circle add' alt='Add'>");
            $(elem).append("<ol class='mylist'></ol>");
            $(elem).append("<h4>Completed:</h4>");
            $(elem).append("<ol class='compl'></ol>")
            $(".intro").append(elem);
            $(".list").each(function() {
                if(this.id !== val) {
                    $(this).css("display", "none");
                }
            });
            var e = $("<li></li>");
            $(e).append("<button class='item' name='" + val + "' disabled='true'>" + val + "</button>");
            $(e).insertBefore("#l");
            $("#nn").val("");
            $(".item").each(function() {
                if($(this).attr("name") !== val) {
                    $(this).attr("disabled", false);
                }
            });
            rep();
            $(".add").on("click", function() {
                var val = $(this).prev().val();
                if(val !== '') {
                    var nval = "-".repeat((50 - val.length)/2.5) + val + "-".repeat((50 - val.length)/2.5);
                    var d = new Date();
                    var elem = $("<li></li>").text(nval);
                    var date = $("<i class='date'></i>").text(d);
                    $(elem).append(date);
                    $(elem).append("<button class='comp'>✓</button>");
                    $(elem).append("<button class='rem'>X</button>");
                    $(this).next().append(elem);
                    $(this).prev().val("");
                    $(".rem").on("click", function() {
                        $(this).parent().remove();
                        reload();
                    });
                    $(".comp").on("click", function() {
                        $(this).attr("disabled", true);
                        $(this).parent().parent().next().next().append($(this).parent());
                        reload();
                    });
                    reload();
                }
            });
            reload();
        }
    });
    rep();
    function rep() {
        $(".remd").on("click", function() {
            var n = $(this).parent().parent().attr("id");

            $(".item[name='" + n + "']").parent().remove();
            $(this).parent().parent().remove();

            if($(".list").length){
                var x = 1;
                $(".list").each(function() {
                    if(x === 1){
                        $(this).css("display", "block");
                        var val = this.id
                        $(".item").each(function() {
                            if($(this).attr("name") === val){
                                $(this).attr("disabled", true);
                            }
                        });
                        x++;
                    }
                });
            }
            else{
                $("#nn").val("home");
                $("button.last").click();
            }
            reload();
        });
        $(".item").on("click", function() {
            var val = $(this).attr("name");
            $(this).attr("disabled", true);
            $(".list").each(function() {
                if(this.id !== val) {
                    $(this).css("display", "none");
                }
                else {
                    $(this).css("display", "block");
                }
            });
            $(".item").each(function() {
                if($(this).attr("name") !== val) {
                    $(this).attr("disabled", false);
                }
            });
            reload();
        });
    }
    function reload() {
        var curlist = $("#main").html();
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(curlist));
    }
});