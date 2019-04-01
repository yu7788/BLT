$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });
    $(".btn").click(function () {
        let _token = $("*[name='_token']").val();
        let name = $(".account_num").val();
        let password = $(".password_num").val();
        $.ajax({
            type:"POST",
            url:"/login",
            dataType:"json",
            data:{
                "_token":_token,
                "name":name,
                "password":password,
            },
            success:function (data) {
                let err = data.errmsg;
                if (data.errno == 0){
                    swal({
                        title: "",
                        text: "登陸成功",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#e60000",
                        confirmButtonText: "确定",
                        closeOnConfirm: false
                    }, function(){
                        location.href="/homes";
                    });
                }else{
                    swal({
                        title: "",
                        text: err,
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#e60000",
                        confirmButtonText: "确定",
                        closeOnConfirm: false
                    });
                }
            }
        });
    });
});