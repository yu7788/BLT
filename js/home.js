$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type:"GET",
        dataType:"json",
        url:"/homes/rest",
        success:function(data){
            $(".total_num").find("span").html(data.total);
            $(".residue_num").find("span").html(data.rest);
        }
    });


    $.ajax({
        type:"GET",
        dataType:"json",
        url:"/notices",
        success:function(data){
            $(".token_title").html("[點擊查看詳情]-"+data.title);
            $(".token").click(function () {
                $(".common-part").fadeIn("200");
                $(".dialog-title").html(data.title);
                $(".pay-content").html(data.content);
                console.log($(".pay-content").scrollTop());
                $(".know").click(function () {
                    $(".common-part").fadeOut();
                    location.reload();
                });
            })
        }
    });
    setInterval(function () {
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"/homes/rest",
            success:function(data){
                $(".total_num").find("span").html(data.total);
                $(".residue_num").find("span").html(data.rest);
            }
        });
    },60000);



    $.ajax({
        type:"GET",
        dataType:"json",
        url:"/homes/project",
        success:function (data) {
            if(data.id != 0 ){
                $(".name").html(data.name);
                $(".pro_id").html("編號:<span>"+data.id+"</span>");
                $(".beted_num").html(data.allowed+"&nbsp;USDT");
                $(".aim_num").html(data.total+"&nbsp;USDT");
                if(data.status == 0){
                    $(".abort_time").html("籌集中");
                    $(".btn").css({"display":"block"});
                }else if(data.status == 1){
                    $(".btn").css({"display":"none"});
                    $(".abort_time").html("運營中");
                }else if(data.status == 2){
                    $(".btn").css({"display":"none"});
                    $(".abort_time").html("分紅中");
                }else{
                    $(".btn").css({"display":"none"});
                    $(".abort_time").html("已結束");
                }
            }
        }
    });
    setInterval(function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"/homes/rest",
            success:function(data){
                $(".total_num").find("span").html(data.total);
                $(".residue_num").find("span").html(data.rest);
            }
        });
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"/homes/project",
            success:function (data) {
                if(data.id != 0 ){
                    $(".name").html(data.name);
                    $(".pro_id").html("編號:<span>"+data.id+"</span>");
                    $(".beted_num").html(data.allowed+"&nbsp;USDT");
                    $(".aim_num").html(data.total+"&nbsp;USDT");
                    if(data.status == 0){
                        $(".abort_time").html("籌集中");
                        $(".btn").css({"display":"block"});
                    }else if(data.status == 1){
                        $(".btn").css({"display":"none"});
                        $(".abort_time").html("運營中");
                    }else if(data.status == 2){
                        $(".btn").css({"display":"none"});
                        $(".abort_time").html("分紅中");
                    }else{
                        $(".btn").css({"display":"none"});
                        $(".abort_time").html("已結束");
                    }
                }
            }
        })
    },1000);
    $(".logout").click(function () {
        $(".common-part_b").css({"display":"block"});
        $("#n").click(function () {
            $(".common-part_b").css({"display":"none"});
        });
        $("#y").click(function () {
            $.ajax({
                type:"GET",
                dataType:"json",
                url:"/logout",
                success:function (data) {
                    let err = data.errmsg;
                    if (data.errno == 0){
                        swal({
                            title: "",
                            text: err,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        }, function(){
                            location.href="/";
                        });
                    }
                }
            });
            $(".common-part_b").css({"display":"none"});
        });

    });
});




