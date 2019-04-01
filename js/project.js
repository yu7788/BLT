$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type:"GET",
        dataType:"json",
        url:"/projects/join",
        success:function (data) {
            if (data.id != 0) {
                $(".detail_name").html(data.name);
                $(".detail_id").html("編號: <span>"+data.id+"</span>");
                $(".detail_sum").html(data.rest+"&nbsp;USDT");
                $("#total").html(data.total+"&nbsp;USDT");
                $("#allowed").html(data.allowed+"&nbsp;USDT");
                if (data.total == data.allowed){
                    $(".submit").html("資金已籌滿");
                }else{
                    $(".submit").html("立即參與");
                }
            }
            $('input[name="project_id"]').val(data.id);
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
        url:"/projects/join",
        success:function (data) {
            if (data.id != 0) {
                $(".detail_name").html(data.name);
                $(".detail_id").html("編號: <span>"+data.id+"</span>");
                $(".detail_sum").html(data.rest+"&nbsp;USDT");
                $("#total").html(data.total+"&nbsp;USDT");
                $("#allowed").html(data.allowed+"&nbsp;USDT");
                if (data.total == data.allowed){
                    $(".submit").html("資金已籌滿");
                }else{
                    $(".submit").html("立即參與");
                }
            }
            $('input[name="project_id"]').val(data.id);
        }
    })
    },1000);
    $(".submit").click(function () {
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"/isExist",
            success:function (data) {
                switch (data.errno) {
                    case 0:
                        /*二级密码*/
                        $(".pay-part_a").fadeIn("200");  //弹框出现
                        $(".pay-part_a").find(".cancel-btn").click(function () {     //取消键取消弹框
                            location.href="/projects";
                        });
                        //  获取焦点事件避免输入键盘挡住对话框
                        $('.pwd-input').on('focus', function () {
                            $('.pay-dialog').css('top','1rem')
                        });
                        $('.pwd-input').bind("input propertychange",function () {
                            let int_num = $(this).val();
                            if (int_num.length == 6){
                                $('.pwd-input').blur();
                            }
                        });
                        //点击确定获取input值进行ajax
                        $(".confirm-btn").click(function () {
                            let num = Number($("#pwd-input").val());
                            $.ajax({
                                type:"POST",
                                url:"/security",
                                dataType:"json",
                                data:{
                                    "code":num
                                },
                                success:function (data){
                                    if (data.errno == 0){
                                        $(".pay-part_a").css({"display":"none"});  //弹框消失
                                        $(".pay-part_b").css({"display":"block"});  //弹框出现
                                        $(".pay-part_b").find(".cancel-btn_b").click(function () {     //取消键取消弹框
                                            location.href="/projects";
                                        });
                                        //  获取焦点事件避免输入键盘挡住对话框
                                        $('.pwd-input_b').on('focus', function () {
                                            $('.pay-dialog_b').css('top','1rem')
                                        });
                                        $('.pwd-input_b').bind("input propertychange",function () {
                                            let int_num = $(this).val();
                                            if (int_num.length == 6){
                                                $('.pwd-input_b').blur();
                                            }
                                        });
                                        $(".confirm-btn_b").click(function () {
                                            let nums = Number($(".pwd-input_b").val());
                                            $.ajax({
                                                type:"POST",
                                                url:"/oneCode",
                                                dataType:"json",
                                                data:{
                                                    "onecode":nums
                                                },
                                                success:function (data) {
                                                    if (data.errno == 0) {
                                                        let number = $("#number").val();
                                                        let project_id = $('input[name="project_id"]').val();
                                                        $.ajax({
                                                            type:"POST",
                                                            dataType:"json",
                                                            url:"/projects/store",
                                                            data:{
                                                                "principal":number,
                                                                "project_id":project_id
                                                            },
                                                            success:function (data) {
                                                                $(".pay-part_b").css({"display":"none"});  //弹框出现
                                                                let num_a = data.errno;
                                                                switch(num_a){
                                                                    case 0:
                                                                        swal({
                                                                            title: "",
                                                                            text: "投註成功。",
                                                                            type: "success",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function () {
                                                                            location.href="/homes";
                                                                        });
                                                                        break;
                                                                    case 5001:
                                                                        let m = parseInt(data.wait/60);
                                                                        let s = data.wait%60;
                                                                        swal({
                                                                            title: "",
                                                                            text: "您已參與上次項目，請"+m+"分"+s+"秒以後再次參與。",
                                                                            type: "warning",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function () {
                                                                            location.href="/projects";
                                                                        });
                                                                        break;
                                                                    case 5002:
                                                                        swal({
                                                                            title: "",
                                                                            text: "項目已投註完畢。",
                                                                            type: "warning",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function () {
                                                                            location.href="/homes"
                                                                        });
                                                                        break;
                                                                    case 5003:
                                                                        swal({
                                                                            title: "",
                                                                            text: "項目已投滿，敬請期待下期。",
                                                                            type: "warning",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function () {
                                                                            location.href="/homes"
                                                                        });
                                                                        break;
                                                                    case 5008:
                                                                        swal({
                                                                            title: "",
                                                                            text: "余額不足，請重新參投!",
                                                                            type: "warning",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function () {
                                                                            location.href="/projects"
                                                                        });
                                                                        break;
                                                                    default:
                                                                        swal({
                                                                            title: "",
                                                                            text: "投註失敗,請重新投註。",
                                                                            type: "warning",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function () {
                                                                            location.href="/projects";
                                                                        });
                                                                        break;
                                                                }
                                                            },
                                                            error:function (data) {
                                                                let a = data.responseText.split('"');
                                                                let b = eval("'"+a[3]+"'");
                                                                swal({
                                                                    title: "",
                                                                    text: b,
                                                                    type: "warning",
                                                                    showCancelButton: false,
                                                                    confirmButtonColor: "#e60000",
                                                                    confirmButtonText: "确定",
                                                                    closeOnConfirm: false
                                                                },function () {
                                                                    location.href="/projects";
                                                                });
                                                            }
                                                        })
                                                    }else{
                                                        $("#wrap_b input").val("");
                                                        $(".dialog-title_b").html("google驗證失敗，請重新輸入。");
                                                        $(".dialog-title_b").css({"font-size":"0.36rem","color":"#e60000"});
                                                    }
                                                },
                                                error:function (data) {
                                                    swal({
                                                        title: "",
                                                        text: "操作失敗，請確認已綁定google驗證碼！",
                                                        type: "warning",
                                                        showCancelButton: false,
                                                        confirmButtonColor: "#e60000",
                                                        confirmButtonText: "确定",
                                                        closeOnConfirm: false
                                                    },function () {
                                                        location.href="/projects";
                                                    });
                                                }
                                            })
                                        })
                                    }else{
                                        $("#wrap input").val("");
                                        $(".dialog-title").html("二級密碼錯誤，請從新輸入。");
                                        $(".dialog-title").css({"font-size":"0.36rem","color":"#e60000"});
                                    }
                                },
                                error:function (data) {
                                    swal({
                                        title: "",
                                        text: "輸入密碼不正確，請重新輸入。",
                                        type: "warning",
                                        showCancelButton: false,
                                        confirmButtonColor: "#e60000",
                                        confirmButtonText: "确定",
                                        closeOnConfirm: false
                                    });
                                }
                            })
                        });
                        break;
                    case 9001:
                        swal({
                            title: "",
                            text: "請先設置二級密碼和綁定谷歌驗證碼。",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        },function () {
                            location.href="/projects";
                        });
                        break;
                    case 9002:
                        swal({
                            title: "",
                            text: "請先設置二級密碼。",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        },function () {
                            location.href="/projects";
                        });
                        break;
                    case 9003:
                        swal({
                            title: "",
                            text: "請先綁定谷歌驗證碼。",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        },function () {
                            location.href="/projects";
                        });
                        break;
                }
            },
            error:function (data) {
                swal({
                    title: "",
                    text: "您未設置二級密碼以及邦定谷歌驗證碼。",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#e60000",
                    confirmButtonText: "确定",
                    closeOnConfirm: false
                },function () {
                    location.href="/projects";
                });
            }
        });

    });

});

