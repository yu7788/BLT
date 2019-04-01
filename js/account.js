$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
        }
    });
    $(".list_x ").click(function () {
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
    })
});





