$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });
    $(".btn-block").click(function () {
        let rollout_num = Number($(".rollout_num").val());
        let account_num = Number($("#account_num").attr("value"));
        if (rollout_num <= account_num) {
            $.ajax({
                type:"GET",
                dataType:"json",
                url:"/isExist",
                success:function (data) {
                    switch (data.errno) {
                        case 0:
                            /*二级密码*/
                            $(".pay-part_a").css({"display":"block"});  //弹框出现
                            $(".pay-part_a").find(".cancel-btn").click(function () {     //取消键取消弹框
                                location.href="/orders/minus";
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
                                                location.href="/orders/minus ";
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
                                                            let amount = $(".rollout_num").val();
                                                            $.ajax({
                                                                type:"POST",
                                                                dataType:"json",
                                                                url:"/orders/minusStore",
                                                                data:{
                                                                    "amount":amount,
                                                                },
                                                                success:function (data) {
                                                                    $(".pay-part_b").css({"display":"none"});  //弹框消失
                                                                    let num_b = data.errno;
                                                                    switch (num_b) {
                                                                        case 0:
                                                                            swal({
                                                                                title: "",
                                                                                text: "申請成功! ",
                                                                                type: "success",
                                                                                showCancelButton: false,
                                                                                confirmButtonColor: "#e60000",
                                                                                confirmButtonText: "确定",
                                                                                closeOnConfirm: false
                                                                            },function(){
                                                                                location.href="/counts";
                                                                            });
                                                                            break;
                                                                        case 2006:
                                                                            swal({
                                                                                title: "",
                                                                                text: "您有尚未處理的提現操作，請稍後重試!",
                                                                                type: "warning",
                                                                                showCancelButton: false,
                                                                                confirmButtonColor: "#e60000",
                                                                                confirmButtonText: "确定",
                                                                                closeOnConfirm: false
                                                                            });
                                                                            break;
                                                                        case 2004:
                                                                            swal({
                                                                                title: "",
                                                                                text: "申請提現失敗，請稍後重試!",
                                                                                type: "warning",
                                                                                showCancelButton: false,
                                                                                confirmButtonColor: "#e60000",
                                                                                confirmButtonText: "确定",
                                                                                closeOnConfirm: false
                                                                            },function () {
                                                                                location.href="/orders/minus";
                                                                            });
                                                                            break;
                                                                        case 2008:
                                                                            swal({
                                                                                title: "",
                                                                                text: "賬戶剩余額度不足，請重新填寫。",
                                                                                type: "warning",
                                                                                showCancelButton: false,
                                                                                confirmButtonColor: "#e60000",
                                                                                confirmButtonText: "确定",
                                                                                closeOnConfirm: false
                                                                            },function () {
                                                                                location.href="/orders/minus";
                                                                            });
                                                                            break;
                                                                        default:
                                                                            swal({
                                                                                title: "",
                                                                                text: "操作失敗，請重新操作!",
                                                                                type: "warning",
                                                                                showCancelButton: false,
                                                                                confirmButtonColor: "#e60000",
                                                                                confirmButtonText: "确定",
                                                                                closeOnConfirm: false
                                                                            },function () {
                                                                                location.href="/orders/minus";
                                                                            });
                                                                            break;
                                                                    }
                                                                },
                                                                error:function (data) {
                                                                    swal({
                                                                        title: "",
                                                                        text: "帳護余額不足，請重新輸入。",
                                                                        type: "warning",
                                                                        showCancelButton: false,
                                                                        confirmButtonColor: "#e60000",
                                                                        confirmButtonText: "确定",
                                                                        closeOnConfirm: false
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
                                                            text: "google驗證碼不正確，請重新輸入。",
                                                            type: "warning",
                                                            showCancelButton: false,
                                                            confirmButtonColor: "#e60000",
                                                            confirmButtonText: "确定",
                                                            closeOnConfirm: false
                                                        });
                                                        $("#wrap_b input").val("");
                                                    }
                                                })
                                            })
                                        }else{
                                            $("#wrap input").val("");
                                            $("#m_a").focus();
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
                                location.href="/orders/minus";
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
                                location.href="/orders/minus";
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
                                location.href="/orders/minus";
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
                        location.href="/orders/minus";
                    });
                }
            });
        }else{
            swal({
                title: "",
                text: "賬戶剩余額度不足，請重新填寫。",
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#e60000",
                confirmButtonText: "确定",
                closeOnConfirm: false
            },function () {
                location.href="/orders/minus";
            });
        }
    })
});







