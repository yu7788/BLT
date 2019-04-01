$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });

    //去除所有文本框输入值的前后空格
    $('input[type=text]:not(:disabled)').each(function(){
        $(this).val($.trim($(this).val()));
    });

    $("#p_select").change(function () {
        let p_area_id = $("#p_select").val();
        $("#select").find("option").remove();
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"/register/area",
            data:{
                "p_area_id":p_area_id
            },
            success:function (data) {
                for (let i = 0; i<data.length; i++){
                    $("#select").append("<option value="+data[i].id+">"+data[i].name+"</option>");
                }
                if (data.length == 0) {
                    swal({
                        title: "",
                        text: "請選擇已經開放的國家和地區。",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#e60000",
                        confirmButtonText: "确定",
                        closeOnConfirm: false
                    });
                }
            }
        })
    });
    $(".btn").click(function () {
        let _token = $("*[name='_token']").val();
        let name = $(".account_num").val();
        let email = $(".email_num").val();
        let referee = $(".referrer_num").val();
        let password = $(".password_num").val();
        let wallet = $(".wallet_num").val();
        let password_confirmation = $(".password_two_num").val();
        let area_id = $("#select").val();
        $.ajax({
            method:"POST",
            url:"/register",
            dataType:"json",
            data:{
                "_token":_token,
                "name":name,
                "email":email,
                "wallet":wallet,
                "referee":referee,
                "password":password,
                "password_confirmation":password_confirmation,
                "area_id":area_id,
            },
            success:function (data) {
                swal({
                    title: "",
                    text: "註冊成功",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#e60000",
                    confirmButtonText: "确定",
                    closeOnConfirm: false
                },function(){
                    location.href="/login";
                });
            },
            error:function (data) {
                if (data.status == 422){
                    var err = '';
                    err += data.responseJSON['name']?data.responseJSON['name']:'';
                    err += data.responseJSON['email']?data.responseJSON['email']:'';
                    err += data.responseJSON['wallet']?"充提地址不能為空。":'';
                    err += data.responseJSON['referee']?"推薦人帳號不正確或者不存在。":'';
                    err += data.responseJSON['password']?data.responseJSON['password']:'';
                    err += data.responseJSON['area_id']?"請選擇社區。":'';

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