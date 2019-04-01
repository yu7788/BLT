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
    <title>設置二級密碼</title>
    <link rel="stylesheet" href="/css/mail.css?v={{config('version.version')}}">
    <script type="text/javascript" src="/js/jquery-2.2.1.js"></script>
    <script type="text/javascript" src="/js/safes.js"></script>
    <script type="text/javascript" src="/js/sweetalert.min.js"></script>
    <link rel="stylesheet" href="/css/sweetalert.css">
</head>
<body>

<header>
    <a href="/homes/account"><div class="logo"></div></a>
    <p class="account">設置二級密碼</p>
</header>
<section>
    <div class="content">
        <div id="form" class="form-reset">
            <h2 class="form-reset-heading">請設置二級密碼</h2>
            <label for="name" class="sr-only">二級密碼</label>
            <input type="password" name="code" id="name" maxlength="6"  onkeyup="value=value.replace( /[^\d]/g,'')" class="form-control form-control-one" placeholder="請設置六位數字密碼" />
            <input type="password" name="code" id="name" maxlength="6"  onkeyup="value=value.replace( /[^\d]/g,'')" class="form-control form-control-two" placeholder="請再次輸入二級密碼" />

            <button class="btn" id="btn">確認設置</button>
        </div>

    </div>
</section>
</body>
</html>