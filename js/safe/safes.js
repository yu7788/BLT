$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });
    $("#btn").click(function () {
        let code_one = $(".form-control-one").val();
        let code_two = $(".form-control-two").val();
        if (code_one == code_two) {
            $.ajax({
                type:"POST",
                dataType:"json",
                url:"/safes/add",
                data:{"code":code_one},
                success:function (data) {
                    if(data.errno == 0){
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
                    }else{
                        swal({
                            title: "",
                            text: "設置失敗，請重新設置！",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        });
                    }

                },
                error:function (data) {
                    swal({
                        title: "",
                        text: "設置失敗，請重新設置。",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#e60000",
                        confirmButtonText: "确定",
                        closeOnConfirm: false
                    });
                }
            })
        }else{
            swal({
                title: "",
                text: "兩次密碼輸入不壹致，請重新設置。",
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#e60000",
                confirmButtonText: "确定",
                closeOnConfirm: false
            });
        }

    })
});