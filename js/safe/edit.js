$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });
    $("#btn").click(function () {
        let old_code = $(".password_old_num").val();
        let code = $(".password_num").val();
        let code_confirm = $(".password_two_num").val();
        $.ajax({
            type:"POST",
            dataType:"json",
            url:"/safes/upt",
            data:{
                "code":code,
                "old_code":old_code,
                "code_confirm":code_confirm
            },
            success:function (data) {
                console.log(data);
                let num = data.errno;
                switch (num){
                    case 0:
                        swal({
                            title: "",
                            text: "設置成功",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        }, function(){
                            location.href="/homes/account";
                        });
                        break;
                    case 7006:
                        swal({
                            title: "",
                            text: "新舊密碼壹致，無需修改。",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        }, function(){
                            location.href="/safes/edit";
                        });
                        break;
                    case 7003:
                        swal({
                            title: "",
                            text: "兩次輸入密碼不壹致。",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        }, function(){
                            location.href="/safes/edit";
                        });
                        break;
                    case 7004:
                        swal({
                            title: "",
                            text: "旧二級密碼輸入錯誤。",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        }, function(){
                            location.href="/safes/edit";
                        });
                        break;
                    case 7005:
                        swal({
                            title: "",
                            text: "修改失敗，請重新設置。",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        }, function(){
                            location.href="/safes/edit";
                        });
                        break;
                }
            },
            error:function (data) {
                swal({
                    title: "",
                    text: "修改失敗，請重新設置。",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#e60000",
                    confirmButtonText: "确定",
                    closeOnConfirm: false
                }, function(){
                    location.href="/safes/edit";
                } );
            }
        })
    })
});