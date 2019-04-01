<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>

        (function(){
            var currClientWidth,
                fontValue,
                originWidth;
            originWidth = 750;//ui设计稿的宽度，一般750或640
            __resize();

            window.addEventListener('resize', __resize, false);

            function __resize() {
                currClientWidth = document.documentElement.clientWidth;
                if (currClientWidth > 768){
                    currClientWidth = 768;
                }
                if (currClientWidth < 320){
                    currClientWidth = 320;
                }
                fontValue = ((625 * currClientWidth) / originWidth).toFixed(2);
                document.documentElement.style.fontSize = fontValue + '%';
            }
        })();
    </script>
    <title>重置二級密碼</title>
    <link rel="stylesheet" href="/css/mail.css?v={{config('version.version')}}">
    <script type="text/javascript" src="/js/jquery-2.2.1.js"></script>
    <script type="text/javascript" src="/js/edit.js"></script>
    <script type="text/javascript" src="/js/sweetalert.min.js"></script>
    <link rel="stylesheet" href="/css/sweetalert.css">
</head>
<body>
<header>
    <a href="/homes/account"><div class="logo"></div></a>
    <p class="account">重置二級密碼</p>
</header>
<section>
    <div class="content">
        <div id="form" class="form-reset">
            <h2 class="form-reset-heading">請設置新的二級密碼</h2>
            <label for="name" class="sr-only">原始二級密碼</label>
            <input type="password" name="old_code" id="name" maxlength="6" class="form-control password_old_num" placeholder="請輸入原始二級密碼" />


            <label for="inputPassword" class="sr-only password">重置二級密碼</label>
            <input type="password" name="code" id="inputPassword" maxlength="6"  onkeyup="value=value.replace( /[^\d]/g,'')" class="form-control password_num" placeholder="請輸入新的六位數字密碼" required>

            <label class="sr-only password_two">重復密碼</label>
            <input type="password" name="code_confirm" maxlength="6"  onkeyup="value=value.replace( /[^\d]/g,'')" class="form-control password_two_num" placeholder="請再次輸入新的二級密碼" required>

            <button class="btn" id="btn">確認修改</button>
        </div>

    </div>
</section>
</body>
</html>