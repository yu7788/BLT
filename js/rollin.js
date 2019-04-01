$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });
    setInterval(function () {
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"/homes/rest",
            success:function (data) {
                 $(".account_num").html("基金總池余額:&nbsp;<span>"+data.rest+"&nbsp;USDT</span>")
            }
        })
    },10000);
    $('.rollin_num').bind("input propertychange",function () {
        let rollin_nums = $(this).val();
        let rollin_nums_arr = rollin_nums.split("");
        for (let i = 0;i < rollin_nums_arr.length;i++){
            if ("." == rollin_nums_arr[i]) {
                let rollin_nums_str_nums = rollin_nums.substring(i);
                if (rollin_nums_str_nums.length >5){
                    swal({
                        title: "",
                        text: "最多只能輸入小數點後四位小數，請重新輸入。",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#e60000",
                        confirmButtonText: "确定",
                        closeOnConfirm: false
                    },function () {
                        location.href="/orders/add";
                    });
                }
            }
        }
    });
    $(".btn-block").click(function () {
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
                            location.href="/orders/add";
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
                                            location.href="/orders/add";
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
                                                        let amount = $(".rollin_num").val();
                                                        $.ajax({
                                                            method:"POST",
                                                            dataType:"json",
                                                            url:"/orders/addStore",
                                                            data:{
                                                                "amount":amount,
                                                            },
                                                            success:function (data) {
                                                                console.log(data);
                                                                $(".pay-part_b").css({"display":"none"});  //弹框消失
                                                                let num_a = data.errno;
                                                                switch (num_a){
                                                                    case 0:
                                                                        swal({
                                                                            title: "",
                                                                            text: "申請成功!",
                                                                            type: "success",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function(){
                                                                            location.href="/counts";
                                                                        });
                                                                        break;
                                                                    case 2005:
                                                                        swal({
                                                                            title: "",
                                                                            text: "您有尚未處理的充值操作，請稍後重試!",
                                                                            type: "warning",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function () {
                                                                            location.href="/orders/add";
                                                                        });
                                                                        break;
                                                                    case 2004:
                                                                        swal({
                                                                            title: "",
                                                                            text: "申請充值失敗，請稍後重試!",
                                                                            type: "warning",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function () {
                                                                            location.href="/orders/add";
                                                                        });
                                                                        break;
                                                                    case 2009:
                                                                        swal({
                                                                            title: "",
                                                                            text: "基金總池剩余額度不足，請重新填寫。",
                                                                            type: "warning",
                                                                            showCancelButton: false,
                                                                            confirmButtonColor: "#e60000",
                                                                            confirmButtonText: "确定",
                                                                            closeOnConfirm: false
                                                                        },function () {
                                                                            location.href="/orders/add";
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
                                                                            location.href="/orders/add";
                                                                        });
                                                                        break;
                                                                }
                                                            },
                                                            error:function (data) {
                                                                console.log(data)
                                                                swal({
                                                                    title: "",
                                                                    text: "操作失敗，請重新申請。",
                                                                    type: "warning",
                                                                    showCancelButton: false,
                                                                    confirmButtonColor: "#e60000",
                                                                    confirmButtonText: "确定",
                                                                    closeOnConfirm: false
                                                                },function () {
                                                                    location.href="/orders/add";
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
                                    $("#wrap input").val("");
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
                            location.href="/orders/add";
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
                            location.href="/orders/add";
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
                            location.href="/orders/add";
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
                    location.href="/orders/add";
                });
            }
        });


    })
});

