$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });
    $(".revamp").click(function () {
        $(".form-signin").css({"display":"block"});
        $(".revamp").css({"display":"none"});
        $(".cancel").css({"visibility":"visible"});
        $(".submit").click(function () {
            let wallet = $("#wallet").val();
            $.ajax({
                method:"POST",
                dataType:"json",
                url:"/wallets/upt",
                data:{
                    "wallet":wallet,
                },
                success:function (data){
                    if (data.errno == 0) {
                        swal({
                            title: "",
                            text: "修改成功。",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        },function () {
                            $(".p_num").html(wallet);
                            location.href="/wallets";
                        });
                    }else{
                        swal({
                            title: "",
                            text: "請輸入正確的錢包地址格式。",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#e60000",
                            confirmButtonText: "确定",
                            closeOnConfirm: false
                        },function () {
                            location.href="/wallets";
                        });
                    }


                },
                error:function (data) {
                    swal({
                        title: "",
                        text: "修改失敗，請重新操作！",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#e60000",
                        confirmButtonText: "确定",
                        closeOnConfirm: false
                    },function () {
                        location.href="/wallets";
                    });
                }
            })
        })
    });
    $(".cancel").click(function () {
        $(".form-signin").css({"display":"none"});
        $(".cancel").css({"visibility":"hidden"});
        $(".revamp").css({"display":"block"});
    });



});